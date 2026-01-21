// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { checkRedisConnection, getAllSessionKeys } from '@/app/lib/session-manager';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check Redis connection
    const redisHealthy = await checkRedisConnection();
    
    if (!redisHealthy) {
      return NextResponse.json(
        {
          status: 'unhealthy',
          redis: 'disconnected',
          message: 'Redis connection failed',
        },
        { status: 503 }
      );
    }

    // Get session stats
    const sessionKeys = await getAllSessionKeys();
    
    return NextResponse.json({
      status: 'healthy',
      redis: 'connected',
      active_sessions: sessionKeys.length,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      api_endpoints: {
        start: '/api/exam/start',
        chat: '/api/exam/chat',
        end: '/api/exam/end',
        cases: '/api/cases',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message,
      },
      { status: 500 }
    );
  }
}