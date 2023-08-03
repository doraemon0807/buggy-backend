const searchUsersTypeDefs = `#graphql

    type SearchUsersResult{
        ok: Boolean!
        error: String
        users: [User]
    }

    type Query{
        searchUsers(keyword: String!, lastId: Int): SearchUsersResult!
    }

`;

export default searchUsersTypeDefs;
