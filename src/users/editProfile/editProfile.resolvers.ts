import { Resolvers } from "../../types";

export const resolver: Resolvers = {
  Mutation: {
    editProfile: (_, { firstName, lastName, username, email, password }) => {
      console.log(firstName, lastName, username, email, password);
    },
  },
};

export default resolver;
