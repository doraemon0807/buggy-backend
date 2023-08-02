const photosTypeDefs = `#graphql
    type Photo{
        id: Int!
        createdAt: String!
        updatedAt: String!
        user: User!
        file: String!
        caption: String
        hashtags: [Hashtag]
    }

    type Hashtag {
        id: Int!
        createdAt: String!
        updatedAt: String!
        hashtag: String!
        photos(page: Int!): [Photo]
        totalPhotos: Int!
    }

`;

export default photosTypeDefs;
