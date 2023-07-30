import { Resolvers } from "../../types";
import { User } from "@prisma/client";
import { protectedResolver } from "../users.utils";

export const resolver: Resolvers = {
  Query: {
    seeProfile: protectedResolver(async (_, { username }: User, { client }) => {
      const foundUser = await client.user.findUnique({
        where: {
          username,
        },
      });
      if (!foundUser) {
        throw new Error("The user doesn't exist.");
      }
      return foundUser;
    }),
  },
};

export default resolver;
