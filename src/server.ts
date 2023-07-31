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

const PORT = process.env.PORT || 4000;

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  csrfPrevention: false,
});

await server.start();

app.use(
  logger("tiny"),
  cors<cors.CorsRequest>(),
  pkg.json(),
  graphqlUploadExpress(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token as string),
        client,
      };
    },
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: Number(PORT) }, resolve)
);
console.log(`🚀 Server ready at http://localhost:${PORT}`);
