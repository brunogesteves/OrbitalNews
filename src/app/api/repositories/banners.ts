import { Ads, Position } from '@prisma/client';

import prisma from './prismaClient';

const { ads: db } = prisma;

interface updateInfoProps {
  limitDate: Date;
  status: boolean;
  id: number;
}

export const createBanner = async (data: Ads): Promise<Ads> => {
  const isCreated = await db.create({ data });
  return isCreated;
};

export const getAllAds = async (
  section: Position,
  limit: number
): Promise<Ads[]> => {
  const ads = await db.findMany({
    where: {
      position: section,
      status: true,
    },
    orderBy: { limitDate: 'asc' },
    take: limit,
  });

  return ads;
};

export const deleteAd = async (id: number): Promise<boolean> => {
  const isDeleted = await db.delete({ where: { id } });
  return isDeleted ? true : false;
};

export const updateAd = async (data: updateInfoProps): Promise<boolean> => {
  const isUpdated = await db.update({ where: { id: data.id }, data });

  return isUpdated ? true : false;
};
