const editPhotoTypeDefs = `#graphql

    type Mutation{
        editPhoto(id: Int!, caption: String!): MutationResponse!
    }

`;

export default editPhotoTypeDefs;
