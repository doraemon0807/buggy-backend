const messages = `#graphql

    type Message{
        id: Int!
        createdAt: String!
        updatedAt: String!
        payload: String!
        user: User!
        room: Room!
        read: Boolean!
        unreaders: [User]
        isMine: Boolean!
    }

    type Room{
        id: Int!
        createdAt: String!
        updatedAt: String!
        users: [User]
        messages: [Message]
        unreadTotal: Int!
    }
`;

export default messages;
