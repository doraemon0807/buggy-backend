const seeProfileTypeDefs = `#graphql

  type SeeProfileResult {
    ok: Boolean!
    error: String
    profile: User
  }

  type Query {
    seeProfile(username: String!): SeeProfileResult!
  }
`;

export default seeProfileTypeDefs;
