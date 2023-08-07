import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

interface SeeRoomProps {
  id: number;
}

const seeRoomResolver: Resolvers = {
  Query: {
    seeRoom: protectedResolver(
      async (_, { id }: SeeRoomProps, { loggedInUser, client }) => {
        const rooms = await client.chatRoom.findFirst({
          where: {
            id,
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        });

        return {
          ok: true,
          rooms,
        };
      }
    ),
  },
};

export default seeRoomResolver;
