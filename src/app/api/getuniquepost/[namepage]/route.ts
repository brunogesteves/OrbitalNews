import { NextResponse } from 'next/server';
import { getPost } from '../../repositories/posts';

export async function GET(request: any, { params }: any) {
  const gotContent = await getPost(params.namepage);

  if (gotContent) {
    console.log('ret api: ok');
    return NextResponse.json({ success: gotContent });
  } else {
    console.log('ret api: false');
    return NextResponse.json({ success: false });
  }
}
