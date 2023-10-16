import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
// import { createWriteStream } from "fs";
import { uploadToS3 } from "../../shared/shared.utils";

interface UserWithPasswords extends User {
  oldPassword?: string;
  newPassword?: string;
}

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
          bio,
          avatar,
          oldPassword,
          newPassword,
        }: UserWithPasswords,
        { loggedInUser, client }
      ) => {
        const foundUser = await client.user.findUnique({
          where: {
            id: loggedInUser.id,
          },
        });

        if (!foundUser) {
          return {
            ok: false,
            error: "User does not exist.",
          };
        }

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

        let newHashPassword = null;

        if (oldPassword && newPassword) {
          newHashPassword = await bcrypt.hash(newPassword, 10);

          const passwordCheck = await bcrypt.compare(
            oldPassword,
            foundUser.password
          );

          if (!passwordCheck) {
            return {
              ok: false,
              error: "Incorrect password.",
            };
          }
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
            ...(newHashPassword && { password: newHashPassword }),
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
