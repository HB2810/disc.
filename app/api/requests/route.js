import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    
    // Basic logic based on role could be added here
    const requests = await prisma.discountRequest.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newRequest = await prisma.discountRequest.create({
      data,
    });
    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
