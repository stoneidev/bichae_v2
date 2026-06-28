import { NextResponse } from 'next/server';
import { getDailyReportFromDb } from '@/lib/db';

export const runtime = 'edge';

export async function GET() {
  try {
    const data = await getDailyReportFromDb();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
