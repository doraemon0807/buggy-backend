import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { withFilter } from "graphql-subscriptions";
import { ChatRoom } from "@prisma/client";
import { ContextType } from "../../types";
import { GraphQLResolveInfo } from "graphql";

const roomUpdateResolver = {
  Subscription: {
    roomUpdate: {
      subscribe: async (
        root: ChatRoom,
        args: { id: number },
        context: ContextType,
        info: GraphQLResolveInfo
      ) => {
        // protection before user starts to listen
        const room = await context.client.chatRoom.findFirst({
          where: {
            id: args.id,
            users: {
              some: {
                id: context.loggedInUser.id,
              },
            },
          },
          select: {
            id: true,
          },
        });
        if (!room) {
          throw new Error("The room doesn't exist.");
        }

        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),

          //protection after user starts to listen
          async ({ roomUpdate }, { id }, { loggedInUser }) => {
            // if updatedroom ID is identical to the room ID the user is listening
            if (roomUpdate.chatRoomId === id) {
              // if user is inside the room
              const room = await context.client.chatRoom.findFirst({
                where: {
                  id,
                  users: {
                    some: {
                      id: loggedInUser.id,
                    },
                  },
                },
                select: {
                  id: true,
                },
              });
              if (!room) {
                return false;
              }
              return true;
            }
          }
        )(root, args, context, info);
      },
    },
  },
};

export default roomUpdateResolver;
