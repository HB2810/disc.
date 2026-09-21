import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function GET(request) {
  try {
    const users = await prisma.hospitalUser.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newUser = await prisma.hospitalUser.create({
      data,
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
