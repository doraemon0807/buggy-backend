import { Resolvers } from "../../types";

interface searchUsersProps {
  keyword: string;
  lastId: number;
}

const searchUsersResolver: Resolvers = {
  Query: {
    searchUsers: async (
      _,
      { keyword, lastId }: searchUsersProps,
      { client }
    ) => {
      if (keyword.length < 3) {
        return {
          ok: false,
          error: "Keyword must be longer than 2 letters.",
        };
      }

      const offset = 5;
      const users = await client.user.findMany({
        where: {
          username: {
            mode: "insensitive",
            contains: keyword,
          },
        },
        take: offset,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
      return {
        ok: true,
        users,
      };
    },
  },
};

export default searchUsersResolver;
