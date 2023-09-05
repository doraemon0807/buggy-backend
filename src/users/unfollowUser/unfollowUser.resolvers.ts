import { User } from "@prisma/client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const unfollowUserResolver: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }: User, { loggedInUser, client }) => {
        const foundUser = await client.user.findUnique({
          where: {
            username,
          },
        });
        if (!foundUser) {
          return {
            ok: false,
            error: "This user doesn't exist.",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
                username,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default unfollowUserResolver;
