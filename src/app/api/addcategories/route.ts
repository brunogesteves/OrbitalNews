import { NextResponse } from 'next/server';

import { createCategory } from '../repositories/categories';

export async function POST(request: Request) {
  const newCategory = await request.json();

  const idNewCategory = createCategory(newCategory);

  return NextResponse.json({ id: idNewCategory });
}
