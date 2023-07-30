import * as jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }

    const verifiedToken: any = jwt.verify(token, process.env.PRIVATE_KEY);

    if ("id" in verifiedToken) {
      const loggedInUser = await client.user.findUnique({
        where: {
          id: verifiedToken.id,
        },
      });

      if (loggedInUser) {
        return loggedInUser;
      } else {
        return null;
      }
    }
  } catch {
    return null;
  }
};
