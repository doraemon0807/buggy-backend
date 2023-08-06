const createCommentTypeDefs = `#graphql

    type Mutation {
        createComment(photoId: Int!, payload: String!): MutationResponse!
    }

`;

export default createCommentTypeDefs;
