import client from "../client";

export const processHashtags = (caption: string) => {
  const hashtags = caption.match(/#\w+/g);
  return (
    hashtags?.map((hashtag) => ({
      where: {
        hashtag,
      },
      create: {
        hashtag,
      },
    })) || []
  );
};

export const processTags = async (caption: string) => {
  const tags = caption.match(/@\w+/g);
  const candidates = tags ? tags.map((match) => match.slice(1)) : [];

  const usernames = [];

  candidates.map(async (candidate) => {
    const foundUser = await client.user.findUnique({
      where: {
        username: candidate,
      },
      select: {
        username: true,
      },
    });
    if (foundUser) {
      usernames.push(candidate);
    }
  });

  return usernames;
};
