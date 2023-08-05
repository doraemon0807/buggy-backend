import { Resolvers } from "../types";

const commentsResolver: Resolvers = {
  Comment: {
    isMine: async ({ userId }, _, { loggedInUser }) => {
      return userId === loggedInUser?.id;
    },
  },
};

export default commentsResolver;
