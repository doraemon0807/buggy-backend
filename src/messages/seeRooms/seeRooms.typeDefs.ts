const seeRoomsTypeDefs = `#graphql

    type SeeRoomsResult{
        ok: Boolean!
        error: String
        rooms: [Room]
    }

    type Query{
        seeRooms: SeeRoomsResult!
    }

`;

export default seeRoomsTypeDefs;
