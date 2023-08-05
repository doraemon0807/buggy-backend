import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

interface DeleteCommentProps {
  id: number;
}

const deleteCommentResolver: Resolvers = {
  Mutation: {
    deleteComment: protectedResolver(
      async (_, { id }: DeleteCommentProps, { loggedInUser, client }) => {
        const foundComment = await client.comment.findUnique({
          where: {
            id,
          },
          select: {
            userId: true,
          },
        });

        if (!foundComment) {
          return {
            ok: false,
            error: "Comment not found.",
          };
        }

        if (foundComment.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Not authorized.",
          };
        }

        await client.comment.delete({
          where: {
            id,
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};

export default deleteCommentResolver;
