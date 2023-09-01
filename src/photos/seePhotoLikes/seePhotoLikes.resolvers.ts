import { Resolvers } from "../../types";

interface SeePhotoLikesProps {
  id: number; //photo Id
  offset: number;
}

const SeePhotoLikesResolver: Resolvers = {
  Query: {
    seePhotoLikes: async (
      _,
      { id, offset }: SeePhotoLikesProps,
      { client }
    ) => {
      const likes = await client.like.findMany({
        where: {
          photoId: id,
        },
        select: {
          user: true,
        },
        take: 2,
        skip: offset,
      });

      return likes.map((like) => like.user);
    },
  },
};

export default SeePhotoLikesResolver;
