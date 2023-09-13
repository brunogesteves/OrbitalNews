import { NextResponse } from 'next/server';

import { getCategories } from '../repositories/categories';

export async function GET() {
  const getAllCategories = await getCategories();

  // getAllCategories.sort((a, b) => a.name.localeCompare(b.name));

  return NextResponse.json({ allCategories: getAllCategories });
}
