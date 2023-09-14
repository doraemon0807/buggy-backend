import { ChatMessage, ChatRoom } from "@prisma/client";
import { Resolvers } from "../types";

const messagesResolver: Resolvers = {
  Room: {
    users: async ({ id }: ChatRoom, _, { client }) => {
      const users = await client.chatRoom
        .findUnique({
          where: {
            id,
          },
        })
        .users();
      return users;
    },
    messages: async ({ id }: ChatRoom, _, { client }) => {
      const messages = await client.chatMessage.findMany({
        where: {
          roomId: id,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          unreaders: true,
        },
      });
      return messages;
    },
    unreadTotal: async ({ id }: ChatRoom, _, { loggedInUser, client }) => {
      if (!loggedInUser) {
        return 0;
      }
      const unreadTotal = await client.chatMessage.count({
        where: {
          // from a room with specific id
          roomId: id,
          // not my message
          user: {
            id: {
              not: loggedInUser.id,
            },
          },
          // listed as unreaders
          unreaders: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      });
      return unreadTotal;
    },
  },

  Message: {
    user: async ({ id }: ChatMessage, _, { client }) => {
      const user = await client.chatMessage
        .findUnique({
          where: {
            id,
          },
        })
        .user();
      return user;
    },

    readByMe: async ({ id }: ChatMessage, _, { client, loggedInUser }) => {
      return !Boolean(
        await client.chatMessage.findFirst({
          where: {
            id,
            unreaders: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
          select: {
            id: true,
          },
        })
      );
    },

    isMine: async ({ userId }: ChatMessage, _, { loggedInUser }) => {
      return userId === loggedInUser?.id;
    },
  },
};

export default messagesResolver;
