import { NextResponse } from 'next/server';
import { getLogin } from '../repositories/login';

export async function POST(request: Request) {
  const loginData = await request.json();

  const loginResponse = await getLogin(loginData.email);
  if (loginResponse.password == loginData.password) {
    return NextResponse.json({ status: true });
  } else {
    return NextResponse.json({ status: false });
  }
}
