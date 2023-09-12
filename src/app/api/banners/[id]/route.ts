import { NextRequest, NextResponse } from 'next/server';
import { uniqueAd, updateAd } from '../../repositories/banners';

export async function GET(request: any, { params }: any) {
  const uniqueAdContent = await uniqueAd(Number(params.id));
  return NextResponse.json({ results: uniqueAdContent });
}

export async function PUT(request: NextRequest, { params }: any) {
  const updateInfo = await request.json();
  updateInfo.id = Number(params.id);
  updateInfo.status == true ? true : false;

  const isUpdated = await updateAd(updateInfo.values);

  return NextResponse.json({ success: isUpdated });
}
