import { Resolvers } from "../../types";

interface SearchPhotosProps {
  keyword: string;
  lastId: number;
}

const searchPhotosResolver: Resolvers = {
  Query: {
    searchPhotos: async (
      _,
      { keyword, lastId }: SearchPhotosProps,
      { client }
    ) => {
      if (keyword.length < 3) {
        return {
          ok: false,
          error: "Keyword must be longer than 2 letters.",
        };
      }

      const offset = 5;
      const photos = await client.photo.findMany({
        where: {
          caption: {
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
        photos,
      };
    },
  },
};

export default searchPhotosResolver;
