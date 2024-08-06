import { NextResponse } from 'next/server';
import { deleteNews } from '../../repositories/posts';

export async function DELETE(
  request: Request,
  content: { params: { id: number } }
) {
  const id = content.params.id;
  const isDelete = await deleteNews(id);

  return NextResponse.json({ success: isDelete });
}
