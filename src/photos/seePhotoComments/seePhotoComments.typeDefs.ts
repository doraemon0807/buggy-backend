const seePhotoCommentsTypeDefs = `#graphql

    type SeePhotoCommentsResult{
        ok: Boolean!
        error: String
        comments: [Comment]
    }

    type Query {
        seePhotoComments(photoId: Int!): SeePhotoCommentsResult!
    }

`;

export default seePhotoCommentsTypeDefs;
