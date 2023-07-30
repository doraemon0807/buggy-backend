import { Resolvers } from "../../types";
import client from "../../client";
import { User } from "@prisma/client";

export const resolver: Resolvers = {
  Query: {
    seeProfile: async (_, { username }: User) => {
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
