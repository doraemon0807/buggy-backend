import { Resolvers } from "../../types";

interface SearchPhotosProps {
  keyword: string;
  offset: number;
}

const searchPhotosResolver: Resolvers = {
  Query: {
    searchPhotos: async (
      _,
      { keyword, offset }: SearchPhotosProps,
      { client }
    ) => {
      if (keyword.length < 3) {
        return {
          ok: false,
          error: "Keyword must be longer than 2 letters.",
        };
      }

      const photos = await client.photo.findMany({
        where: {
          caption: {
            mode: "insensitive",
            contains: keyword,
          },
        },
        take: 18,
        skip: offset,
        // ...(lastId && { cursor: { id: lastId } }),
      });
      return photos;
    },
  },
};

export default searchPhotosResolver;
