import { Post, Section } from '@prisma/client';

import prisma from './prismaClient';

const { post: db } = prisma;

export const createPost = async (data: Post) => {
  const isCreated = await db.create({ data });
  return isCreated;
};

export const getPost = async (data: string): Promise<Post> => {
  const contentNews = await db.findFirstOrThrow({
    where: {
      slug: data,
    },
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
  return await db.delete({ where: { id: Number(id) } });
};

export const getSectionContent = async (
  section: Section,
  quantity: string | null
) => {
  return await db.findMany({
    where: { section },
    take: Number(quantity),
    orderBy: { posted_at: 'asc' },
  });
};

export const MorePosts = async (slugException: string) => {
  const postsCount = await db.count();
  const randomNumbers = (min: number, max: number): number[] => {
    const numbers: number[] = [];
    while (numbers.length < 3) {
      let difference = max - min;

      let rand = Math.random();

      rand = Math.floor(rand * difference);

      rand = rand + min;
      numbers.push(rand);
    }
    return numbers;
  };

  const posts = await db.findMany({
    where: {
      id: { in: randomNumbers(0, postsCount) },
      slug: {
        not: slugException,
      },
    },
  });

  return posts;
};
