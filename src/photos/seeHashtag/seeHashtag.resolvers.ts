import { Resolvers } from "../../types";

interface SeeHashtagProps {
  hashtag: string;
}

const seeHashtagResolver: Resolvers = {
  Query: {
    seeHashtag: async (_, { hashtag }: SeeHashtagProps, { client }) => {
      const hashtagFound = await client.hashtag.findUnique({
        where: {
          hashtag,
        },
      });

      return {
        ok: true,
        hashtag: hashtagFound,
      };
    },
  },
};

export default seeHashtagResolver;
