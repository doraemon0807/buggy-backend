import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

interface DeletePhotoProps {
  id: number;
}

const deletePhotoResolver: Resolvers = {
  Mutation: {
    deletePhoto: protectedResolver(
      async (_, { id }: DeletePhotoProps, { loggedInUser, client }) => {
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

        if (foundPhoto.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Not authorized.",
          };
        }

        await client.photo.delete({
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

export default deletePhotoResolver;
