import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.toString();

  const locale = req.nextUrl.searchParams.get('language') || 'en';

  try {
    console.log('sendsend', query)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SOCKET_URL}/paxcall/ws${query}`
    );

    console.log('find')

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();

    return NextResponse.json({ data: data, meta: data.meta });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
