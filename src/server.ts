import { ApolloServer } from "apollo-server";
import schema from "./schema";
import "dotenv/config";

const server = new ApolloServer({
  schema,
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(({ url }) => console.log(`Server is running on ${url}`));
