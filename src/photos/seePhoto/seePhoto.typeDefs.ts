const seePhotoTypeDefs = `#graphql

    type SeePhotoResult{
        ok: Boolean!
        error: String
        photo: Photo
    }
    
    type Query{
        seePhoto(id:Int!): SeePhotoResult!
    }
`;

export default seePhotoTypeDefs;
