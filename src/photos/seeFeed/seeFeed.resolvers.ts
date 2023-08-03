import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

interface SeeFeedProps {
  lastId: number;
}

const seeFeedResolver: Resolvers = {
  Query: {
    seeFeed: protectedResolver(
      async (_, { lastId }: SeeFeedProps, { loggedInUser, client }) => {
        const offset = 5;

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
          take: offset,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
        return {
          ok: true,
          photos,
        };
      }
    ),
  },
};

export default seeFeedResolver;
