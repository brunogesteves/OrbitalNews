import { writeFile } from 'fs/promises';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const file: File | null = data.get('file') as unknown as File;
  const fileName: string = data.get('name') as string;
  console.log(fileName);

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = `public/${fileName}.jpg`;
  await writeFile(path, buffer);

  return NextResponse.json({ success: true });
}
