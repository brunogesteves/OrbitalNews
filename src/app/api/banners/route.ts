import { NextRequest, NextResponse } from 'next/server';

import { createBanner, deleteAd, getAllAds } from '../repositories/banners';

export async function GET(request: NextRequest) {
  const sectionBanner: string | null =
    request.nextUrl.searchParams.get('position');

  try {
    if (sectionBanner == 'news') {
      const contentBanner = await getAllAds(sectionBanner, 1);
      return NextResponse.json({ results: contentBanner });
    } else if (sectionBanner == 'top') {
      const contentBanner = await getAllAds(sectionBanner, 3);
      return NextResponse.json({ results: contentBanner });
    } else if (sectionBanner == 'slide') {
      const contentBanner = await getAllAds(sectionBanner, 2);

      return NextResponse.json({ results: contentBanner });
    }
  } catch (error) {}
}

export async function POST(request: Request) {
  const newBanner = await request.json();
  delete newBanner.file;
  newBanner.status = newBanner.status == 'true' ? true : false;

  const createNewBanner = createBanner(newBanner);

  return NextResponse.json({ status: createNewBanner });
}

export async function DELETE(request: NextRequest) {
  const idAd: string | null = request.nextUrl.searchParams.get('id');

  if (idAd !== null || idAd !== Number(0)) {
    const isDeleted = await deleteAd(Number(idAd));
    return NextResponse.json({ success: isDeleted });
  }
}
