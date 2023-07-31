const editProfileTypeDefs = `#graphql
  type EditProfileResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
      bio: String
    ): EditProfileResult!
  }
`;

export default editProfileTypeDefs;
