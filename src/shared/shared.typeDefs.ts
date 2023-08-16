const sharedTypeDefs = `#graphql

    scalar Upload

    type MutationResponse{
        ok: Boolean!
        error: String
        id: Int
    }
`;

export default sharedTypeDefs;
