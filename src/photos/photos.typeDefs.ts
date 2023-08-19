const photosTypeDefs = `#graphql
    type Photo{
        id: Int!
        createdAt: String!
        updatedAt: String!
        user: User!
        file: String!
        caption: String
        hashtags: [Hashtag]
        likes: Int!
        isMine: Boolean!
        isLiked: Boolean!
        commentCount: Int!
        comments: [Comment]
    }

    type Hashtag {
        id: Int!
        createdAt: String!
        updatedAt: String!
        hashtag: String!
        photos(page: Int!): [Photo]
        totalPhotos: Int!
    }

    type Like {
        id: Int!
        createdAt: String!
        updatedAt: String!
        photo: Photo!
    }

    type Saved {
        id: Int!
        createdAt: String!
        updatedAt: String!
        photo: Photo!
    }

`;

export default photosTypeDefs;
