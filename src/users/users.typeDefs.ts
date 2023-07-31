const usersTypeDefs = `#graphql
  type User {
    id: String!
    createdAt: String!
    updatedAt: String!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    bio: String
    avatar: String
  }
`;

export default usersTypeDefs;
