import { NextResponse } from 'next/server';
import { getLogin } from '../repositories/login';
import { User } from '@prisma/client';

export async function POST(request: Request) {
  const loginData = await request.json();

  const loginResponse: User | null = await getLogin(loginData.email);
  if (loginResponse) {
    if (loginResponse.password == loginData.password) {
      return NextResponse.json({ status: true });
    } else {
      return NextResponse.json({ status: false });
    }
  }
}
