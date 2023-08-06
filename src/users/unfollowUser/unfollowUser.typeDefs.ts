const unfollowUserTypeDefs = `#graphql

    type Mutation {
        unfollowUser(username: String!): MutationResponse!
    }
`;

export default unfollowUserTypeDefs;
