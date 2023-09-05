import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
// import { createWriteStream } from "fs";
import { uploadToS3 } from "../../shared/shared.utils";

const editProfileResolver = {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          firstName,
          lastName,
          username,
          email,
          password: newPassword,
          bio,
          avatar,
        }: User,
        { loggedInUser, client }
      ) => {
        let avatarUrl = loggedInUser.avatar || null;
        if (avatar) {
          // uploading files to AWS
          avatarUrl = await uploadToS3(
            avatar,
            loggedInUser.id,
            "avatar",
            loggedInUser.avatar
          );

          // // saving files locally
          // const { filename, createReadStream } = await avatar;
          // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          // const readStream = createReadStream();
          // const writeStream = createWriteStream(
          //   process.cwd() + "/uploads/" + newFilename
          // );
          // readStream.pipe(writeStream);
          // avatarUrl = `http://localhost:4000/static/${newFilename}`;
        }

        let hashPassword = null;
        if (newPassword) {
          hashPassword = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            username,
            email,
            bio,
            ...(avatarUrl && { avatar: avatarUrl }),
            ...(hashPassword && { password: hashPassword }),
          },
        });

        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update profile.",
          };
        }
      }
    ),
  },
};

export default editProfileResolver;
