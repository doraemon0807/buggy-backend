import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./schema";
import "dotenv/config";
import { getUser } from "./users/users.utils";
import client from "./client";

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

const PORT = process.env.PORT;

const server = new ApolloServer({ schema });
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token as string),
      client,
    };
  },
  listen: { port: Number(PORT) },
});

console.log(`Server ready at ${url}`);
