import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

interface SeeFeedProps {
  offset: number;
}

const seeFeedResolver: Resolvers = {
  Query: {
    seeFeed: protectedResolver(
      async (_, { offset }: SeeFeedProps, { loggedInUser, client }) => {
        // const offset = 1;

        // find photos of people who have me in their followers list OR my photos
        const photos = await client.photo.findMany({
          where: {
            OR: [
              {
                user: {
                  followers: {
                    some: {
                      id: loggedInUser.id,
                    },
                  },
                },
              },
              { userId: loggedInUser.id },
            ],
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 2,
          skip: offset,
          // ...(lastId && { cursor: { id: lastId } }),
        });
        return photos;
      }
    ),
  },
};

export default seeFeedResolver;
