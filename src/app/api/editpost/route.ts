import { NextResponse } from 'next/server';

import { editPost } from '../repositories/posts';

export async function POST(request: Request) {
  const contentEditPost = await request.json();
  console.log('pi: ', contentEditPost);

  delete contentEditPost.values.file;

  const isPostUpdated = await editPost(
    contentEditPost.id,
    contentEditPost.values
  );

  return NextResponse.json({ success: isPostUpdated });
}
