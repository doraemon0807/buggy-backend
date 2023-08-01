import bcrypt from "bcrypt";
import { Resolvers } from "../../types";
import { User } from "@prisma/client";

interface CreateAccountProps {
  username: string;
}

const createAccountresolver: Resolvers = {
  Query: {
    seeProfile: async (_, { username }: CreateAccountProps, { client }) => {
      const foundUser = await client.user.findUnique({
        where: {
          username,
        },
      });
      if (!foundUser) {
        throw new Error("The user doesn't exist.");
      }
      return {
        ok: true,
      };
    },
  },
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }: User,
      { client }
    ) => {
      // check if username or email are already on DB
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });
      if (existingUser) {
        return {
          ok: false,
          error: "This username/email is already taken.",
        };
      }

      // hash password
      const hashPassword = await bcrypt.hash(password, 10);

      // save and return the user
      await client.user.create({
        data: {
          firstName,
          lastName,
          username,
          email,
          password: hashPassword,
        },
      });
      return {
        ok: true,
      };
    },
  },
};

export default createAccountresolver;
