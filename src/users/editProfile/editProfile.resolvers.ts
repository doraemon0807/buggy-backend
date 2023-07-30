import { User } from "@prisma/client";
import client from "../../client";
import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";

export const resolver: Resolvers = {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password: newPassword }: User,
      { loggedInUser }
    ) => {
      console.log(loggedInUser);
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
    },
  },
};

export default resolver;
