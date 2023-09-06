import { NextResponse } from 'next/server';

import { createCategory } from '../repositories/categories';

export async function POST(request: Request) {
  const newCategory = await request.json();

  const createNewCategory = createCategory(newCategory);

  return NextResponse.json({ status: createNewCategory });
}
