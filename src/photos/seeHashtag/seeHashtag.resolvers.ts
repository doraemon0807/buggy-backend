import { Hashtag } from "@prisma/client";
import { Resolvers } from "../../types";

const seeHashtagResolver: Resolvers = {
  Query: {
    seeHashtag: async (_, { hashtag }: Hashtag, { client }) => {
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
