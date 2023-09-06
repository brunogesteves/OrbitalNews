import { NextResponse } from 'next/server';

import { getCategories } from '../repositories/categories';

export async function GET() {
  const getAllCategories = await getCategories();

  return NextResponse.json({ allCategories: getAllCategories });
}
