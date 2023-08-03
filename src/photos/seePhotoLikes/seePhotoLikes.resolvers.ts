import { Resolvers } from "../../types";

interface SeePhotoLikesProps {
  id: number; //photo Id
  lastId: number;
}

const SeePhotoLikesResolver: Resolvers = {
  Query: {
    seePhotoLikes: async (
      _,
      { id, lastId }: SeePhotoLikesProps,
      { client }
    ) => {
      const offset = 5;

      const likes = await client.like.findMany({
        where: {
          photoId: id,
        },
        select: {
          user: true,
        },
        take: offset,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });

      return {
        ok: true,
        users: likes.map((like) => like.user),
      };
    },
  },
};

export default SeePhotoLikesResolver;
