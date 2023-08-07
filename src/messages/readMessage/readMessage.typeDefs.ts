const readMessageTypeDefs = `#graphql

    type Mutation{
        readMessage(id: Int!):MutationResponse!
    }
`;

export default readMessageTypeDefs;
