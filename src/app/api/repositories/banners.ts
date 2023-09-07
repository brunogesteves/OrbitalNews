import { Ads } from '@prisma/client';

import prisma from './prismaClient';

const { ads: db } = prisma;

export const createBanner = async (data: Ads) => {
  const isCreated = await db.create({ data });
  return isCreated;
};

export const getAllAds = async () => {
  const topAds = await db.findMany({
    where: {
      position: 'top',
    },
  });

  const newsAds = await db.findMany({
    where: {
      position: 'news',
    },
  });
  const slideAds = await db.findMany({
    where: {
      position: 'slide',
    },
  });

  return { topAds, slideAds, newsAds };
};

export const deleteAd = async (id: number) => {
  return await db.delete({ where: { id } });
};
