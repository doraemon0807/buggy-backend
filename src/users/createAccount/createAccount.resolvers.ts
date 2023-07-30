import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";
import client from "../../client";
import { User } from "@prisma/client";

export const resolver: Resolvers = {
  Query: {
    seeProfile: async (_, { username }: User) => {
      const foundUser = await client.user.findUnique({
        where: {
          username,
        },
      });
      if (!foundUser) {
        throw new Error("The user doesn't exist.");
      }
      return foundUser;
    },
  },
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }: User
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
        throw new Error("This username/email is already taken.");
      }

      // hash password
      const hashPassword = await bcrypt.hash(password, 10);

      // save and return the user
      return await client.user.create({
        data: {
          firstName,
          lastName,
          username,
          email,
          password: hashPassword,
        },
      });
    },
  },
};

export default resolver;
