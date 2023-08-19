import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

interface SavePhotoProps {
  id: number;
}

const savePhotoResolver: Resolvers = {
  Mutation: {
    savePhoto: protectedResolver(
      async (_, { id }: SavePhotoProps, { loggedInUser, client }) => {
        const foundPhoto = await client.photo.findUnique({
          where: {
            id,
          },
        });
        if (!foundPhoto) {
          return {
            ok: false,
            error: "This photo doesn't exist.",
          };
        }
        await client.user.update({
          where: { id: loggedInUser.id },
          data: { saved: { connect: { id } } },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default savePhotoResolver;
