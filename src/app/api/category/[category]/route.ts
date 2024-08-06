import { NextResponse } from 'next/server';
import { contentUniqueCategory } from '../../repositories/categories';

export async function GET(
  request: Request,
  content: { params: { category: string } }
) {
  const category = content?.params?.category;

  const contentCategory = await contentUniqueCategory(category);

  if (contentCategory) {
    return NextResponse.json({ success: contentCategory });
  } else {
    return NextResponse.json({ status: true });
  }
}
