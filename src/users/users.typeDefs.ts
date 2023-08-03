const usersTypeDefs = `#graphql
  type User {
    id: Int!
    createdAt: String!
    updatedAt: String!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    bio: String
    avatar: String
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isFollowing: Boolean!
    isMe: Boolean!
    photos: [Photo]
  }
`;

export default usersTypeDefs;
