import { Resolvers } from "../../types";

interface SeePhoto {
  id: number;
}

const seePhotoResolver: Resolvers = {
  Query: {
    seePhoto: async (_, { id }: SeePhoto, { client }) => {
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
      });
      return {
        ok: true,
        photo,
      };
    },
  },
};

export default seePhotoResolver;
