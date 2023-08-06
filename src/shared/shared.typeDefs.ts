const sharedTypeDefs = `#graphql

    scalar Upload

    type MutationResponse{
        ok: Boolean!
        error: String
    }
`;

export default sharedTypeDefs;
