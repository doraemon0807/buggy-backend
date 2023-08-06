const toggleLikeTypeDefs = `#graphql

    type Mutation{
        toggleLike(id:Int!):MutationResponse!
    }

`;

export default toggleLikeTypeDefs;
