const seeRoomTypeDefs = `#graphql

    type Query{
        seeRoom(id: Int!): Room
    }
`;

export default seeRoomTypeDefs;
