const searchUsersTypeDefs = `#graphql

    type searchUsersResult{
        ok: Boolean!
        error: String
        users: [User]
    }

    type Query{
        searchUsers(keyword: String!, lastId: Int): searchUsersResult!
    }

`;

export default searchUsersTypeDefs;
