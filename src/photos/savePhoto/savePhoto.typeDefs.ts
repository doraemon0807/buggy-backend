const savePhotoTypeDefs = `#graphql

    type Mutation{
        savePhoto(id: Int!):MutationResponse!
    }
`;

export default savePhotoTypeDefs;
