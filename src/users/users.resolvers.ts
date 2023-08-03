import { Resolvers } from "../types";

interface UsersResolverProps {
  id: number;
}

const usersResolver: Resolvers = {
  User: {
    totalFollowing: async ({ id }: UsersResolverProps, _, { client }) => {
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
    totalFollowers: async ({ id }: UsersResolverProps, _, { client }) => {
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
    isMe: async ({ id }: UsersResolverProps, _, { loggedInUser }) => {
      return id === loggedInUser?.id;
    },
    isFollowing: async (
      { id }: UsersResolverProps,
      _,
      { loggedInUser, client }
    ) => {
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
    photos: async ({ id }: UsersResolverProps, _, { client }) => {
      const photos = client.user
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
