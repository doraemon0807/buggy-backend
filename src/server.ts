import { ApolloServer } from "apollo-server";
import schema from "./schema";
import "dotenv/config";
import { getUser } from "./users/users.utils";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(({ url }) => console.log(`Server is running on ${url}`));
