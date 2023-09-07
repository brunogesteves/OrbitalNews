import { NextResponse } from 'next/server';

import { createPost } from '../repositories/posts';

export async function POST(request: Request) {
  const contentPost = await request.json();

  delete contentPost.file;
  const isPostCreated = await createPost(contentPost);

  return NextResponse.json({ success: isPostCreated });
}
