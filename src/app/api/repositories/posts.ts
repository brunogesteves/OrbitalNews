import { Post, Section } from '@prisma/client';

import prisma from './prismaClient';

const { post: db } = prisma;

export const createPost = async (data: Post) => {
  const isCreated = await db.create({ data });
  return isCreated;
};

export const getPost = async (data: string) => {
  const contentNews = await db.findFirst({
    where: { title: data },
    include: { category: { select: { name: true } } },
  });
  return contentNews;
};

export const getEditPost = async (data: number) => {
  const contentNews = await db.findFirst({
    where: { id: data },
    include: { category: { select: { name: true } } },
  });
  return contentNews;
};

export const editPost = async (id: number, data: Post) => {
  console.log('rep: ', data);

  const contentNews = await db.update({
    where: { id: Number(id) },
    data,
  });
  return contentNews;
};

export const allnews = async () => {
  const allContent = await db.findMany({
    include: {
      category: { select: { name: true } },
    },
  });
  return allContent;
};

export const deleteNews = async (id: number) => {
  return await db.delete({ where: { id } });
};

export const getSectionContent = async (
  section: Section | undefined,
  limit: string | null
) => {
  return await db.findMany({
    where: { section },
    take: Number(limit),
    orderBy: { posted_at: 'asc' },
  });
};
