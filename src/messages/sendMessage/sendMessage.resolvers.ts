import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

interface SendMessageProps {
  payload: string;
  roomId?: number;
  userId?: number;
}

const sendMessageResolver: Resolvers = {
  Mutation: {
    sendMessage: protectedResolver(
      async (
        _,
        { payload, roomId, userId }: SendMessageProps,
        { loggedInUser, client }
      ) => {
        let room = null;

        // If room with the user doesn't exist already => create a new room
        if (userId && !roomId) {
          const user = await client.user.findUnique({
            where: {
              id: userId,
            },
            select: {
              id: true,
            },
          });
          if (!user) {
            return {
              ok: false,
              error: "This user doesn't exist.",
            };
          }
          room = await client.chatRoom.create({
            data: {
              users: {
                connect: [
                  {
                    id: userId,
                  },
                  {
                    id: loggedInUser.id,
                  },
                ],
              },
            },
          });
          // If room with the user already exists => load the existing room
        } else if (roomId && !userId) {
          room = await client.chatRoom.findUnique({
            where: {
              id: roomId,
            },
            select: {
              id: true,
            },
          });
          if (!room) {
            return {
              ok: false,
              error: "This room doesn't exist.",
            };
          }
        } else {
          return {
            ok: false,
            error: "Incorrect approach.",
          };
        }

        // Create new message and connect to room and user
        await client.chatMessage.create({
          data: {
            payload,
            room: {
              connect: {
                id: room.id,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};

export default sendMessageResolver;
