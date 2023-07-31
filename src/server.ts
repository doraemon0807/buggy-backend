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

// const server = new ApolloServer({
//   schema,
//   context: async ({ req }) => {
//     return {
//       loggedInUser: await getUser(req.headers.token),
//       client,
//     };
//   },
// });

// server
//   .listen(PORT)
//   .then(({ url }) => console.log(`Server is running on ${url}`));

// const PORT = process.env.PORT;

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });
// const { url } = await startStandaloneServer(server, {
//   context: async ({ req }) => {
//     return {
//       loggedInUser: await getUser(req.headers.token as string),
//       client,
//     };
//   },
//   listen: { port: Number(PORT) },
// });

// console.log(`Server ready at ${url}`);

const PORT = process.env.PORT;

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
  "/graphql",
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
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
