const deletePhotoTypeDefs = `#graphql

    type Mutation{
        deletePhoto(id: Int!): MutationResponse!
    }

`;

export default deletePhotoTypeDefs;
