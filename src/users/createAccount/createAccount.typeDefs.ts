const createAccountTypeDefs = `#graphql
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createAccount(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
    ): User
  }
`;

export default createAccountTypeDefs;
