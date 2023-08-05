import { Resolvers } from "../../types";

interface SeePhotoCommentsProps {
  photoId: number;
  lastId: number;
}

const seePhotoCommentsResolver: Resolvers = {
  Query: {
    seePhotoComments: async (
      _,
      { photoId, lastId }: SeePhotoCommentsProps,
      { client }
    ) => {
      const offset = 5;
      const comments = await client.comment.findMany({
        where: {
          photoId,
        },
        orderBy: {
          createdAt: "asc",
        },
        take: offset,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
      return {
        ok: true,
        comments,
      };
    },
  },
};

export default seePhotoCommentsResolver;
