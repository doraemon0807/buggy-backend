import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

interface EditPhotosProps {
  id: number;
  caption: string;
}

const editPhotosResolver: Resolvers = {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }: EditPhotosProps, { client, loggedInUser }) => {
        // find photo that matches id AND uploaded by the current user
        const foundPhoto = await client.photo.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });

        if (!foundPhoto) {
          return {
            ok: false,
            error: "The photo is not found.",
          };
        }

        // update photo && disconnect hashtag && connect new hashtag
        await client.photo.update({
          where: {
            id,
          },
          data: {
            caption,
            hashtags: {
              disconnect: foundPhoto.hashtags,
              connectOrCreate: processHashtags(caption),
            },
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};

export default editPhotosResolver;
