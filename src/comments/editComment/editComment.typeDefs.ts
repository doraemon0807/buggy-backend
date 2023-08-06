const editCommentTypeDefs = `#graphql

    type Mutation{
        editComment(id:Int!, payload: String!):MutationResponse!
    }
`;

export default editCommentTypeDefs;
