import { NextResponse } from 'next/server';

import { createBanner, getAllAds } from '../repositories/banners';

export async function POST(request: Request) {
  const newBanner = await request.json();
  delete newBanner.file;
  newBanner.status = newBanner.status == 'true' ? true : false;

  const createNewBanner = createBanner(newBanner);

  return NextResponse.json({ status: createNewBanner });
}

export async function GET() {
  const getAds = await getAllAds();

  return NextResponse.json({ results: getAds });
}
