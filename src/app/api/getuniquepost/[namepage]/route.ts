import { NextResponse } from 'next/server';
import { getPost } from '../../repositories/posts';

export async function GET(request: any, { params }: any) {
  const gotContent = await getPost(params.namepageid);

  return NextResponse.json({ success: gotContent });
}
