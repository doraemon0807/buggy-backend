const deleteCommentTypeDefs = `#graphql
    type DeleteCommentResult{
        ok: Boolean!
        error: String
    }

    type Mutation{
        deleteComment(id: Int!): DeleteCommentResult!
    }

`;

export default deleteCommentTypeDefs;
