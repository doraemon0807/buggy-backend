const messages = `#graphql

    type Message{
        id: Int!
        createdAt: String!
        updatedAt: String!
        user: User!
        room: Room!
    }

    type Room{
        id: Int!
        createdAt: String!
        updatedAt: String!
        users: [User]
        messages: [Message]
    }
`;

export default messages;
