import { User } from "@prisma/client";
import { Resolvers } from "../types";

const usersResolver: Resolvers = {
  User: {
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
    photos: async ({ id }: User, _, { client }) => {
      const photos = await client.user
        .findUnique({
          where: {
            id,
          },
        })
        .photos();
      return photos;
    },
  },
};

export default usersResolver;
