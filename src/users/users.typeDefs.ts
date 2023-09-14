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
    fullName: String!
    totalFollowing: Int!
    totalFollowers: Int!
    isFollowing: Boolean!
    isMe: Boolean!
    photos: [Photo]
    photoCount: Int!
    savedPhotos: [Photo]
    taggedPhotos: [Photo]
    unreadMessage: [Message]
  }
`;

export default usersTypeDefs;
