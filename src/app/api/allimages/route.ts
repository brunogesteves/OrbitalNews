import { NextResponse } from 'next/server';

import { getCategories } from '../repositories/categories';

export async function GET() {
  const getAllCategories = await getCategories();

  const allImages = [
    {
      src: 'http://suneditor.com/docs/cat.jpg',
      name: 'Tabby',
      alt: 'Tabby',
      tag: 'Cat',
    },
  ];

  return NextResponse.json({ statusCode: 200, result: allImages });
}
