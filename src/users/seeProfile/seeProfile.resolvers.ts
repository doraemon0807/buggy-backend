import { Resolvers } from "../../types";
import { User } from "@prisma/client";
import { protectedResolver } from "../users.utils";

const seeProfileResolver: Resolvers = {
  Query: {
    seeProfile: protectedResolver(async (_, { username }: User, { client }) => {
      const foundUser = await client.user.findUnique({
        where: {
          username,
        },
      });
      if (!foundUser) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      return {
        ok: true,
        profile: foundUser,
      };
    }),
  },
};

export default seeProfileResolver;
