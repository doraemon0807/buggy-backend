const commentsTypeDefs = `#graphql
    type Comment {
        id: Int!
        createdAt: String!
        updatedAt: String!
        user: User!
        photo: Photo!
        payload: String!
        isMine: Boolean!    
    }

`;

export default commentsTypeDefs;
