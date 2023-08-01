import { Resolvers } from "../../types";

interface SeeFollowersProps {
  username: string;
  page: number;
}

const seeFollowersResolvers: Resolvers = {
  Query: {
    seeFollowers: async (
      _,
      { username, page }: SeeFollowersProps,
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
      const followers = await client.user
        .findUnique({
          where: {
            username,
          },
        })
        .followers({
          take: offset,
          skip: (page - 1) * offset,
        });

      const totalFollowers = await client.user.count({
        where: {
          following: {
            some: {
              username,
            },
          },
        },
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / offset),
      };
    },
  },
};

export default seeFollowersResolvers;
