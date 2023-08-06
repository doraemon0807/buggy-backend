const uploadPhotoTypeDefs = `#graphql

    scalar Upload

    type UploadPhotoResult{
        ok: Boolean!
        error: String
        photo: Photo
    }

    type Mutation {
        uploadPhoto(file:Upload!, caption:String): UploadPhotoResult!
    }

`;

export default uploadPhotoTypeDefs;
