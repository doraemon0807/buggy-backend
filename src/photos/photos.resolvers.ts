import { Resolvers } from "../types";

const photosResolver: Resolvers = {
  Photo: {
    user: async ({ userId }, _, { client }) => {
      const user = await client.user.findFirst({
        where: {
          id: userId,
        },
      });
      return user;
    },
    hashtags: async ({ id }, _, { client }) => {
      const hashtags = await client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      });
      return hashtags;
    },
  },
};

export default photosResolver;
