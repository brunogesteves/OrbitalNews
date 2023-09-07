import { NextRequest, NextResponse } from 'next/server';

import { createBanner, deleteAd, getAllAds } from '../repositories/banners';

export async function GET(request: NextRequest) {
  const sectionBanner: any = request.nextUrl.searchParams.get('position');
  console.log(sectionBanner);

  if (
    sectionBanner == 'news' ||
    sectionBanner == 'top' ||
    sectionBanner == 'slide'
  ) {
    const contentBanner = await getAllAds(sectionBanner);

    return NextResponse.json({ results: contentBanner });
  }
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

  if (idAd !== null) {
    const isDeleted = await deleteAd(Number(idAd));
    return NextResponse.json({ success: isDeleted });
  }
}
