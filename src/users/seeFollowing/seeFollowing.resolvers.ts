import { Resolvers } from "../../types";

interface SeeFollowingProps {
  username: string;
  lastId: number;
}

const seeFollowingResolver: Resolvers = {
  Query: {
    seeFollowing: async (
      _,
      { username, lastId }: SeeFollowingProps,
      { client }
    ) => {
      const foundUser = await client.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
        },
      });

      if (!foundUser) {
        return {
          ok: false,
          error: "This user doesn't exist.",
        };
      }

      const offset = 5;
      const following = await client.user
        .findUnique({
          where: {
            username,
          },
        })
        .following({
          take: offset,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });

      return {
        ok: true,
        following,
      };
    },
  },
};

export default seeFollowingResolver;
