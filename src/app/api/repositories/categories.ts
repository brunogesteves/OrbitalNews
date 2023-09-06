import { Category } from '@prisma/client';

import prisma from './prismaClient';

const { category: db } = prisma;

export const createCategory = async (data: Category) => {
  const isCreated = await db.create({ data });
  return isCreated;
};

export const getCategories = (): Promise<Category[]> => db.findMany({});

export const deleteCategory = async (id: number) => {
  const isdeleted = await db.delete({ where: { id: id } });
  return isdeleted;
};

// export const n1Posts = (): Promise<category[]> =>
//   db.create({
//     data,
//   });

// export const n2Posts = (): Promise<category[]> =>
//   db.findMany({
//     where: {
//       section: 'n2',
//     },
//     take: 2,
//   });

// export const n3Posts = (): Promise<posts[]> =>
//   db.findMany({
//     where: {
//       section: 'n3',
//     },
//     take: 4,
//   });

// export const n4Posts = (): Promise<posts[]> =>
//   db.findMany({
//     where: {
//       section: 'n4',
//     },
//     take: 7,
//   });

// export const deletebranch = (id: number): Promise<posts> => {
//   return db.delete({ where: { id } });
// };

// export const getUniquebranch = (id: number): Promise<posts | null> => {
//   return db.findUnique({ where: { id } });
// };

// export const updateBranch = (id: number, data: posts): Promise<posts> => {
//   return db.update({ where: { id }, data });
// };
