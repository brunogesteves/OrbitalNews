import { Category } from '@prisma/client';

import prisma from './prismaClient';

const { category: db } = prisma;

export const createCategory = async (data: Category): Promise<Category> => {
  const isCreated = await db.create({ data });
  return isCreated;
};

export const getCategories = (): Promise<Category[]> => db.findMany({});

export const deleteCategory = async (id: number) => {
  const isdeleted = await db.delete({ where: { id: id } });
  return isdeleted;
};

export const contentUniqueCategory = async (name: string): Promise<any> => {
  const content = await db.findMany({
    where: { name },
    include: { post: true },
  });

  return content;
};
