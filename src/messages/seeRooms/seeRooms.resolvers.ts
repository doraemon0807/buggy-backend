import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

interface SeeRoomsProps {
  lastId: number;
}

const seeRoomsResolvers: Resolvers = {
  Query: {
    seeRooms: protectedResolver(
      async (_, { lastId }: SeeRoomsProps, { loggedInUser, client }) => {
        const offset = 5;

        const rooms = await client.chatRoom.findMany({
          where: {
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
          take: offset,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });

        return rooms;
      }
    ),
  },
};

export default seeRoomsResolvers;
