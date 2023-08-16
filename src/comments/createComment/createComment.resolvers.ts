import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

interface CreateComment {
  photoId: number;
  payload: string;
}

const createCommentResolver: Resolvers = {
  Mutation: {
    createComment: protectedResolver(
      async (
        _,
        { photoId, payload }: CreateComment,
        { loggedInUser, client }
      ) => {
        const foundPhoto = await client.photo.findUnique({
          where: {
            id: photoId,
          },
          select: {
            id: true,
          },
        });
        if (!foundPhoto) {
          return {
            ok: false,
            error: "Photo not found.",
          };
        }
        const newComment = await client.comment.create({
          data: {
            payload,
            photo: {
              connect: {
                id: photoId,
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
          id: newComment.id,
        };
      }
    ),
  },
};

export default createCommentResolver;
