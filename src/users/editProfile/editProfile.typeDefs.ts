const editProfileTypeDefs = `#graphql

  scalar Upload

  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      oldPassword: String
      newPassword: String
      bio: String
      avatar: Upload
    ): MutationResponse!
  }
`;

export default editProfileTypeDefs;
