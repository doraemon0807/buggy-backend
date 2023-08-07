import { Photo } from "@prisma/client";
import { Resolvers } from "../types";

const photosResolver: Resolvers = {
  Photo: {
    user: async ({ userId }: Photo, _, { client }) => {
      const user = await client.user.findFirst({
        where: {
          id: userId,
        },
      });
      return user;
    },
    hashtags: async ({ id }: Photo, _, { client }) => {
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
    likes: async ({ id }: Photo, _, { client }) => {
      const likes = await client.like.count({
        where: {
          photoId: id,
        },
      });
      return likes;
    },
    comments: async ({ id }: Photo, _, { client }) => {
      const comments = await client.comment.count({
        where: {
          photoId: id,
        },
      });
      return comments;
    },
    isMine: async ({ userId }: Photo, _, { loggedInUser }) => {
      return userId === loggedInUser?.id;
    },
  },
  Hashtag: {
    photos: async ({ id }: Photo, { page }, { client }) => {
      // const photos = await client.hashtag
      //   .findUnique({
      //     where: {
      //       id,
      //     },
      //   })
      //   .photos();

      const photos = await client.photo.findMany({
        where: {
          hashtagId: id,
        },
      });
      return photos;
    },
    totalPhotos: async ({ id }: Photo, _, { client }) => {
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
