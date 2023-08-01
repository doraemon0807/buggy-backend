import { PrismaClient, User } from "@prisma/client";

type ContextType = {
  loggedInUser?: User;
  client?: PrismaClient;
};

export type Resolver = (
  root: any,
  args: any,
  context: ContextType,
  info: any
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
