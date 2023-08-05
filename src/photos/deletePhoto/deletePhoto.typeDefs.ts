const deletePhotoTypeDefs = `#graphql
    type DeletePhotoResult{
        ok: Boolean!
        error: String
    }

    type Mutation{
        deletePhoto(id: Int!): DeletePhotoResult!
    }

`;

export default deletePhotoTypeDefs;
