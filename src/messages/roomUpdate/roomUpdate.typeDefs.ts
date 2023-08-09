const roomUpdateTypeDefs = `#graphql

    type Subscription {
        roomUpdate(id: Int!): Message
    }
`;

export default roomUpdateTypeDefs;
