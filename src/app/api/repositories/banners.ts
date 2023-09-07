import { Ads, Position } from '@prisma/client';

import prisma from './prismaClient';

const { ads: db } = prisma;

export const createBanner = async (data: Ads) => {
  const isCreated = await db.create({ data });
  return isCreated;
};

export const getAllAds = async (section: Position) => {
  const ads = await db.findMany({
    where: {
      position: section,
    },
  });

  return ads;
};

export const deleteAd = async (id: number) => {
  return await db.delete({ where: { id } });
};
