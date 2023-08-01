import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { createWriteStream } from "fs";

interface EditProfileProps {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  avatar: any;
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
          password: newPassword,
          bio,
          avatar,
        }: EditProfileProps,
        { loggedInUser, client }
      ) => {
        let avatarUrl = null;
        if (avatar) {
          const { filename, createReadStream } = await avatar;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            process.cwd() + "/uploads/" + newFilename
          );
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:4000/static/${newFilename}`;
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
