import { NextRequest, NextResponse } from 'next/server';
import { updateAd } from '../../repositories/banners';

export async function PUT(request: NextRequest, { params }: any) {
  const updateInfo = await request.json();
  updateInfo.id = Number(params.id);
  updateInfo.status == true ? true : false;

  const isUpdated = await updateAd(updateInfo);

  return NextResponse.json({ success: isUpdated });
}
