const seeProfileTypeDefs = `#graphql

  type SeeProfileResult {
    ok: Boolean!
    profile: User
    error: String
  }

  type Query {
    seeProfile(username: String!): SeeProfileResult!
  }
`;

export default seeProfileTypeDefs;
