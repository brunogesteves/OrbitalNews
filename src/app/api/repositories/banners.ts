import { Ads, Position } from '@prisma/client';

import prisma from './prismaClient';

const { ads: db } = prisma;

export const createBanner = async (data: Ads): Promise<Ads> => {
  const isCreated = await db.create({ data });
  return isCreated;
};

export const getAllAds = async (
  section: Position,
  quantity: number,
  isAdmin: boolean
): Promise<Ads[]> => {
  const ads = await db.findMany({
    where: {
      position: section,
      status: true,
    },
    orderBy: { expirationDate: 'asc' },
    take: quantity,
  });

  const positionAds = await db.findMany({
    where: {
      position: section,
    },
  });

  return isAdmin ? positionAds : ads;
};

export const deleteAd = async (id: number): Promise<boolean> => {
  const isDeleted = await db.delete({ where: { id } });
  return isDeleted ? true : false;
};

export const updateAd = async (data: Ads): Promise<boolean> => {
  const status = (e: string | boolean) => {
    if (e == 'true') {
      return true;
    } else {
      return false;
    }
  };

  const isUpdated = await db.update({
    where: { id: data.id },
    data: {
      image: data.image,
      position: data.position,
      expirationDate: data.expirationDate,
      link: data.link,
      status: status(data.status),
      title: data.title,
    },
  });

  return isUpdated ? true : false;
};

export const uniqueAd = async (id: number): Promise<Ads | null> => {
  const uniqueAdContent = await db.findFirst({ where: { id: id } });

  return uniqueAdContent;
};
