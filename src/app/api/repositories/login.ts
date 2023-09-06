import { User } from '@prisma/client';

import prisma from './prismaClient';

const { user: db } = prisma;

export const getLogin = async (email: string) => {
  const userEmail = await db.findFirstOrThrow({ where: { name: email } });
  return userEmail;
};
