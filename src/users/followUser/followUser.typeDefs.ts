const followUserTypeDefs = `#graphql

    type Mutation{
        followUser(username: String):MutationResponse!
    }
`;

export default followUserTypeDefs;
