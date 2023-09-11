import { ChatMessage } from "@prisma/client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const readMessageResolver: Resolvers = {
  Mutation: {
    readMessage: protectedResolver(
      async (_, { id }: ChatMessage, { loggedInUser, client }) => {
        const message = await client.chatMessage.findFirst({
          where: {
            id, // id of the message
            userId: {
              // not my message
              not: loggedInUser.id,
            },
            chatRoom: {
              //from a chatRoom where I am one of the participants
              users: {
                some: {
                  id: loggedInUser.id,
                },
              },
            },
          },
          select: {
            id: true,
          },
        });

        if (!message) {
          return {
            ok: false,
            error: "Message not found.",
          };
        }

        const updatedMessage = await client.chatMessage.update({
          where: {
            id,
          },
          data: {
            // remove the current user to the unreaders list
            unreaders: {
              disconnect: {
                id: loggedInUser.id,
              },
            },
          },
          select: {
            id: true,
            chatRoomId: true,
            unreaders: {
              select: {
                id: true,
              },
            },
          },
        });

        // check if message is read by everyone
        if (updatedMessage.unreaders.length === 0) {
          await client.chatMessage.update({
            where: {
              id,
            },
            data: {
              read: true,
            },
          });
        }

        return {
          ok: true,
          id: updatedMessage.id,
        };
      }
    ),
  },
};

export default readMessageResolver;
