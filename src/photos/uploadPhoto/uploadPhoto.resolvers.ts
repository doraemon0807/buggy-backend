import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

interface UploadPhotoProps {
  file: string;
  caption: string;
}

const uploadPhotoResolver = {
  Upload: GraphQLUpload,
  Mutation: {
    uploadPhoto: protectedResolver(
      async (
        _,
        { file, caption }: UploadPhotoProps,
        { loggedInUser, client }
      ) => {
        let hashtagObj = [];
        if (caption) {
          // parse caption
          hashtagObj = processHashtags(caption);
          // get or create hashtags
        }
        const photo = await client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
          include: {
            user: true,
            hashtags: true,
          },
        });
        // save photo with parsed hashtags
        // add photo to the hashtags
        return {
          ok: true,
          photo,
        };
      }
    ),
  },
};

export default uploadPhotoResolver;
