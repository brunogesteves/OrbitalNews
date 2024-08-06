import prisma from './prismaClient';

const { user: db } = prisma;

export const getLogin = async (email: string) => {
  const userEmail = await db.findFirst({ where: { name: email } });
  return userEmail;
};
