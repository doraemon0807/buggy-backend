const seeRoomTypeDefs = `#graphql

    type SeeRoomResult{
        ok: Boolean!
        error: String
        room: Room
    }

    type Query{
        seeRoom(id: Int!): SeeRoomResult!
    }

`;

export default seeRoomTypeDefs;
