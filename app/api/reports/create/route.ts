import { NextRequest, NextResponse } from 'next/server';
import { createReportInDb } from '@/lib/db';

export const runtime = 'edge';

const ADMIN_TOKEN = 'bichae2026'; // Simple admin access password protection

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { adminToken, ...payload } = body;

    if (adminToken !== ADMIN_TOKEN) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid Admin Token.' },
        { status: 401 }
      );
    }

    if (!payload.reportId || !payload.product || !payload.product.name) {
      return NextResponse.json(
        { success: false, error: 'Missing required report fields.' },
        { status: 400 }
      );
    }

    const result = await createReportInDb(payload);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to insert report data.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
