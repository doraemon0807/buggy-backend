const seeFollowingTypeDefs = `#graphql

    type SeeFollowingResult{
        ok: Boolean!
        error: String
        following: [User]
        totalPages:Int
    }

    type Query {
        seeFollowing(username: String!, lastId: Int): SeeFollowingResult!
    }
`;

export default seeFollowingTypeDefs;
