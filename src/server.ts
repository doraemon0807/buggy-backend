import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import pkg from "body-parser";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import client from "./client";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import logger from "morgan";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";

const PORT = process.env.PORT || 4000;

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

interface OnConnectProps {
  connectionParams?: {
    token: string;
  };
}

const serverCleanup = useServer(
  {
    schema,
    context: async ({ connectionParams: { token } }: OnConnectProps) => {
      if (token) {
        const loggedInUser = await getUser(token);
        return { loggedInUser, client };
      }
    },
  },
  wsServer
);

const apolloConfig = {
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],

  csrfPrevention: false,
};

const apollo = new ApolloServer(apolloConfig);

await apollo.start();

app.use(
  "/graphql",
  logger("tiny"),
  cors<cors.CorsRequest>(),
  pkg.json(),
  graphqlUploadExpress(),
  expressMiddleware(apollo, {
    context: async (ctx) => {
      if (ctx.req) {
        return {
          loggedInUser: await getUser(ctx.req.headers.token as string),
          client,
        };
      }
    },
  })
);

httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});
