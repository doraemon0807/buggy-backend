const meTypeDefs = `#graphql
    type MeResult {
        ok: Boolean!
        error: String
        profile: User
    }

    type Query{
        me: MeResult!
    }
`;

export default meTypeDefs;
