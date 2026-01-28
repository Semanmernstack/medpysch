
import { NextResponse } from 'next/server';
import { getCASCProgress } from '@/app/lib/session-manager';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json(
        { error: 'user_id is required' },
        { status: 400 }
      );
    }
//////////goog///
    const progress = await getCASCProgress(userId);

    return NextResponse.json({ progress });
  } catch (error: any) {
    console.error('❌ Failed to get CASC progress:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get progress' },
      { status: 500 }
    );
  }
}
