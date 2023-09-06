import { NextResponse } from 'next/server';
import { deleteCategory } from '../../repositories/categories';

export async function DELETE(
  request: Request,
  content: { params: { id: number } }
) {
  const id = content?.params?.id;

  const isdeletedCategory = await deleteCategory(Number(id));

  if (isdeletedCategory) {
    return NextResponse.json({ status: true });
  } else {
    return NextResponse.json({ status: true });
  }
}
