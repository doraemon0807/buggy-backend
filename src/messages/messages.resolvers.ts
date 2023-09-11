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
          chatRoomId: id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return messages;
    },
    unreadTotal: async ({ id }: ChatRoom, _, { loggedInUser, client }) => {
      if (!loggedInUser) {
        return 0;
      }
      const unreadTotal = client.chatMessage.count({
        where: {
          // from a room with specific id
          chatRoomId: id,
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
      const user = client.chatMessage
        .findUnique({
          where: {
            id,
          },
        })
        .user();
      return user;
    },

    isMine: async ({ userId }: ChatMessage, _, { loggedInUser }) => {
      return userId === loggedInUser?.id;
    },
  },
};

export default messagesResolver;
