const deleteCommentTypeDefs = `#graphql

    type Mutation{
        deleteComment(id: Int!): MutationResponse!
    }

`;

export default deleteCommentTypeDefs;
