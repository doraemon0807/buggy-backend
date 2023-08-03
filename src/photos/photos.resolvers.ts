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
    likes: async ({ id }, _, { client }) => {
      const likes = await client.like.count({
        where: {
          photoId: id,
        },
      });
      return likes;
    },
  },
  Hashtag: {
    photos: async ({ id }, { page }, { client }) => {
      const photos = await client.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .photos();
      return photos;
    },
    totalPhotos: async ({ id }, _, { client }) => {
      const totalPhotos = await client.photo.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      });

      return totalPhotos;
    },
  },
};

export default photosResolver;
