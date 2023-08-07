import { User } from "@prisma/client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processParticipants } from "../messages.utils";

interface SendMessageProps {
  payload: string;
  roomId?: number;
  userIds?: number[];
}

const sendMessageResolver: Resolvers = {
  Mutation: {
    sendMessage: protectedResolver(
      async (
        _,
        { payload, roomId, userIds }: SendMessageProps,
        { loggedInUser, client }
      ) => {
        let room = null;

        // If room with the user doesn't exist already => create a new room
        if (!roomId) {
          userIds.map(async (userId) => {
            const foundUser = await client.user.findUnique({
              where: {
                id: userId,
              },
              select: {
                id: true,
              },
            });
            if (!foundUser) {
              return {
                ok: false,
                error: "User doesn't exist.",
              };
            }
          });
          const allParticipantsIds = [...userIds];
          allParticipantsIds.push(loggedInUser.id);

          const existingRoom = await client.chatRoom.findFirst({
            where: {
              users: {
                every: {
                  id: {
                    in: allParticipantsIds,
                  },
                },
              },
            },
          });

          if (!existingRoom) {
            room = await client.chatRoom.create({
              data: {
                users: {
                  connect: [...processParticipants(allParticipantsIds)],
                },
              },
            });
          } else {
            room = existingRoom;
          }
          // If room with the user already exists => load the existing room
        } else if (roomId) {
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
            chatRoom: {
              connect: {
                id: room.id,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            unreaders: {
              connect: processParticipants(userIds),
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
