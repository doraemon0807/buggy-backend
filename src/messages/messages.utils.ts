export const processParticipants = (userIds: number[]) => {
  return (
    userIds?.map((userId) => ({
      id: userId,
    })) || []
  );
};
