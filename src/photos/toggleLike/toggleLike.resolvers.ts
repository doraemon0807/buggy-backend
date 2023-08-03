import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

interface ToggleLikeProps {
  id: number; // photo Id
}

const likePhotoResolver: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(
      async (_, { id }: ToggleLikeProps, { loggedInUser, client }) => {
        const foundPhoto = await client.photo.findUnique({
          where: {
            id,
          },
        });

        if (!foundPhoto) {
          return {
            ok: false,
            error: "Photo not found.",
          };
        }

        // find if like with photoID and userID matches exists
        const like = await client.like.findUnique({
          where: {
            photoId_userId: {
              userId: loggedInUser.id,
              photoId: id,
            },
          },
        });

        if (like) {
          await client.like.delete({
            where: {
              id: like.id,
            },
          });
        } else {
          await client.like.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              photo: {
                connect: {
                  id: foundPhoto.id,
                },
              },
            },
          });
        }

        return {
          ok: true,
        };
      }
    ),
  },
};

export default likePhotoResolver;
