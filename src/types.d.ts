import { PrismaClient, User } from "@prisma/client";
import { GraphQLResolveInfo } from "graphql";

export type ContextType = {
  loggedInUser?: User;
  client?: PrismaClient;
};

export type Resolver = (
  root: any,
  args: any,
  context: ContextType,
  info: GraphQLResolveInfo
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
