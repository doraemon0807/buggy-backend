const seePhotoLikesTypeDefs = `#graphql
    type SeePhotoLikesResult{
        ok: Boolean!
        error: String
        users: [User]
    }

    type Query{
        seePhotoLikes(id:Int!, lastId: Int):SeePhotoLikesResult!
    }

`;

export default seePhotoLikesTypeDefs;
