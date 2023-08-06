import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

interface EditCommentProps {
  id: number;
  payload: string;
}

const editCommentResolvers: Resolvers = {
  Mutation: {
    editComment: protectedResolver(
      async (
        _,
        { id, payload }: EditCommentProps,
        { client, loggedInUser }
      ) => {
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

        await client.comment.update({
          where: {
            id,
          },
          data: {
            payload,
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};

export default editCommentResolvers;
