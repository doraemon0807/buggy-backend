import { Resolvers } from "../../types";
import client from "../../client";

export const resolver: Resolvers = {
  Query: {
    seeProfile: async (_, { username }) => {
      const foundUser = await client.user.findUnique({
        where: {
          username,
        },
      });
      if (!foundUser) {
        throw new Error("The user doesn't exist.");
      }
      return foundUser;
    },
  },
};

export default resolver;
