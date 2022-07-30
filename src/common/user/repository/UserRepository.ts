import Prisma from "../../../system/database/prisma";

export const findUserByEmail = async (email: string) => {
  const found  = await Prisma.user.findFirst({
    where: {
      email: email
    }
  });

  return found;
}

export const removeUserByEmail = async (email: string) => {
  await Prisma.user.deleteMany({
    where: {
      email: email
    }
  });
}