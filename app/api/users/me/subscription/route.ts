import authOptions from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { level } = await req.json();

  if (level === undefined) {
    return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
  }

  try {
    const res = await fetch(`${process.env.API_URL}/api/users/setvip`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        Amount: '100',
      },
      method: 'POST',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
