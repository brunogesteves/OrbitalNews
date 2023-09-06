import { NextResponse } from 'next/server';
import { allnews } from '../repositories/posts';

export async function GET() {
  const getAllContent = await allnews();

  return NextResponse.json({ content: getAllContent });
}
