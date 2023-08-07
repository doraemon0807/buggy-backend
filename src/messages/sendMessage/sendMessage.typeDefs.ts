const sendMessageTypeDefs = `#graphql

    type Mutation {
        sendMessage(payload: String!, roomId: Int, userIds: [Int]): MutationResponse!
    }

`;

export default sendMessageTypeDefs;
