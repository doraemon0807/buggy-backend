import { Comment } from "@prisma/client";
import { Resolvers } from "../types";

const commentsResolver: Resolvers = {
  Comment: {
    isMine: async ({ userId }: Comment, _, { loggedInUser }) => {
      return userId === loggedInUser?.id;
    },
  },
};

export default commentsResolver;
