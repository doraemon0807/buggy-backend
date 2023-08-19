import { User } from "@prisma/client";
import { Resolvers } from "../types";

const usersResolver: Resolvers = {
  User: {
    fullName: async ({ firstName, lastName }: User) => {
      return `${firstName} ${lastName}`;
    },
    totalFollowing: async ({ id }: User, _, { client }) => {
      const followingCount = await client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      });
      return followingCount;
    },
    totalFollowers: async ({ id }: User, _, { client }) => {
      const followerCount = await client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      });
      return followerCount;
    },
    isMe: async ({ id }: User, _, { loggedInUser }) => {
      return id === loggedInUser?.id;
    },
    isFollowing: async ({ id }: User, _, { loggedInUser, client }) => {
      if (!loggedInUser) {
        return false;
      }

      const isFollowing = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(isFollowing);
    },
    photos: async ({ id }: User, { page }, { client }) => {
      const photos = await client.photo.findMany({
        where: {
          userId: id,
        },
      });
      return photos;
    },
    photoCount: async ({ id }: User, _, { client }) => {
      const photoCount = await client.photo.count({
        where: {
          userId: id,
        },
      });
      return photoCount;
    },
    savedPhotos: async ({ id }: User, { page }, { client }) => {
      const savedPhotos = await client.saved.findMany({
        where: {
          userId: id,
        },
      });
      return savedPhotos;
    },
    taggedPhotos: async ({ id }: User, { page }, { client }) => {
      const taggedPhotos = await client.photo.findMany({
        where: {
          tagged: {
            some: {
              id,
            },
          },
        },
      });
      return taggedPhotos;
    },
  },
};

export default usersResolver;
