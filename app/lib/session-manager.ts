
// import { Redis } from '@upstash/redis';

// // Initialize with fallback values
// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL || 'https://good-collie-36668.upstash.io',
//   token: process.env.UPSTASH_REDIS_REST_TOKEN || 'AY88AAIncDJlMjFlNDMxZTU2ZDA0NDZlYjQ5OTlhMjNjOWJmYTg5MnAyMzY2Njg',
// });

// // Session expiry time (2 hours in seconds)
// const SESSION_TTL = 7200;

// export async function createSession(sessionId: string, sessionData: any): Promise<void> {
//   try {
//     await redis.set(
//       `exam_session:${sessionId}`,
//       JSON.stringify(sessionData),
//       { ex: SESSION_TTL }
//     );
    
//     console.log('✅ Session created in Redis:', sessionId);
//     console.log('⏰ Session expires in:', SESSION_TTL / 60, 'minutes');
//   } catch (error) {
//     console.error('❌ Failed to create session in Redis:', error);
//     throw new Error('Failed to create session');
//   }
// }

// export async function getSession(sessionId: string): Promise<any | null> {
//   try {
//     console.log('🔍 Looking for session in Redis:', sessionId);
    
//     const data = await redis.get(`exam_session:${sessionId}`);
    
//     if (!data) {
//       console.log('❌ Session not found in Redis');
//       return null;
//     }
    
//     const session = typeof data === 'string' ? JSON.parse(data) : data;
    
//     console.log('✅ Session found:', session.case_id);
//     return session;
//   } catch (error) {
//     console.error('❌ Failed to get session from Redis:', error);
//     return null;
//   }
// }

// export async function updateSession(sessionId: string, sessionData: any): Promise<boolean> {
//   try {
//     const exists = await redis.exists(`exam_session:${sessionId}`);
    
//     if (!exists) {
//       console.log('❌ Cannot update - session not found:', sessionId);
//       return false;
//     }
    
//     await redis.set(
//       `exam_session:${sessionId}`,
//       JSON.stringify(sessionData),
//       { ex: SESSION_TTL }
//     );
    
//     console.log('✅ Session updated in Redis:', sessionId);
//     return true;
//   } catch (error) {
//     console.error('❌ Failed to update session in Redis:', error);
//     return false;
//   }
// }

// export async function deleteSession(sessionId: string): Promise<boolean> {
//   try {
//     const deleted = await redis.del(`exam_session:${sessionId}`);
    
//     if (deleted > 0) {
//       console.log('✅ Session deleted from Redis:', sessionId);
//       return true;
//     } else {
//       console.log('❌ Session not found for deletion:', sessionId);
//       return false;
//     }
//   } catch (error) {
//     console.error('❌ Failed to delete session from Redis:', error);
//     return false;
//   }
// }

// export async function checkRedisConnection(): Promise<boolean> {
//   try {
//     await redis.ping();
//     console.log(' Redis connection healthy');
//     return true;
//   } catch (error) {
//     console.error(' Redis connection failed:', error);
//     return false;
//   }
// }

// export async function getAllSessionKeys(): Promise<string[]> {
//   try {
//     const keys = await redis.keys('exam_session:*');
//     return keys;
//   } catch (error) {
//     console.error('❌ Failed to get session keys:', error);
//     return [];
//   }
// }
import { Redis } from '@upstash/redis';
import type { CASCProgress, StationResult } from './types';

// Initialize Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || 'https://good-collie-36668.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || 'AY88AAIncDJlMjFlNDMxZTU2ZDA0NDZlYjQ5OTlhMjNjOWJmYTg5MnAyMzY2Njg',
});

const SESSION_TTL = 7200; // 2 hours
const PROGRESS_TTL = 30 * 24 * 60 * 60; // 30 days

// ============ EXISTING SESSION FUNCTIONS ============

export async function createSession(sessionId: string, sessionData: any): Promise<void> {
  try {
    await redis.set(
      `exam_session:${sessionId}`,
      JSON.stringify(sessionData),
      { ex: SESSION_TTL }
    );
    console.log('✅ Session created:', sessionId);
  } catch (error) {
    console.error('❌ Failed to create session:', error);
    throw new Error('Failed to create session');
  }
}

export async function getSession(sessionId: string): Promise<any | null> {
  try {
    const data = await redis.get(`exam_session:${sessionId}`);
    if (!data) return null;
    return typeof data === 'string' ? JSON.parse(data) : data;
  } catch (error) {
    console.error('❌ Failed to get session:', error);
    return null;
  }
}

export async function updateSession(sessionId: string, sessionData: any): Promise<boolean> {
  try {
    const exists = await redis.exists(`exam_session:${sessionId}`);
    if (!exists) return false;
    
    await redis.set(
      `exam_session:${sessionId}`,
      JSON.stringify(sessionData),
      { ex: SESSION_TTL }
    );
    console.log('✅ Session updated:', sessionId);
    return true;
  } catch (error) {
    console.error('❌ Failed to update session:', error);
    return false;
  }
}

export async function deleteSession(sessionId: string): Promise<boolean> {
  try {
    const deleted = await redis.del(`exam_session:${sessionId}`);
    return deleted > 0;
  } catch (error) {
    console.error('❌ Failed to delete session:', error);
    return false;
  }
}

export async function checkRedisConnection(): Promise<boolean> {
  try {
    await redis.ping();
    return true;
  } catch (error) {
    console.error('❌ Redis connection failed:', error);
    return false;
  }
}

export async function getAllSessionKeys(): Promise<string[]> {
  try {
    return await redis.keys('exam_session:*');
  } catch (error) {
    console.error('❌ Failed to get session keys:', error);
    return [];
  }
}

// ============ NEW: CASC PROGRESS TRACKING ============

/**
 * Get or create CASC progress for a user
 */
export async function getCASCProgress(userId: string): Promise<CASCProgress> {
  try {
    const data = await redis.get(`casc_progress:${userId}`);
    
    if (data) {
      const parsed = typeof data === 'string' ? JSON.parse(data) : data;
      return parsed as CASCProgress; // ← TYPE ASSERTION FIX
    }
    
    // Initialize new progress
    const newProgress: CASCProgress = {
      user_id: userId,
      stations_completed: [],
      stations_passed: 0,
      stations_failed: 0,
      severe_fails: 0,
      specialties_covered: [],
      overall_status: 'in_progress',
      started_at: new Date().toISOString(),
      last_updated: new Date().toISOString(),
    };
    
    await saveCASCProgress(userId, newProgress);
    return newProgress;
  } catch (error) {
    console.error('❌ Failed to get CASC progress:', error);
    
    // Return default progress instead of throwing
    return {
      user_id: userId,
      stations_completed: [],
      stations_passed: 0,
      stations_failed: 0,
      severe_fails: 0,
      specialties_covered: [],
      overall_status: 'in_progress',
      started_at: new Date().toISOString(),
      last_updated: new Date().toISOString(),
    };
  }
}

/**
 * Save CASC progress
 */
export async function saveCASCProgress(userId: string, progress: CASCProgress): Promise<void> {
  try {
    await redis.set(
      `casc_progress:${userId}`,
      JSON.stringify(progress),
      { ex: PROGRESS_TTL }
    );
  } catch (error) {
    console.error('❌ Failed to save CASC progress:', error);
    throw error;
  }
}

/**
 * Add a completed station to progress
 */
export async function addStationResult(
  userId: string,
  stationResult: StationResult
): Promise<CASCProgress> {
  try {
    const progress = await getCASCProgress(userId);
    
    // Add station result
    progress.stations_completed.push(stationResult);
    
    // Update counters
    if (stationResult.pass_fail === 'PASS') {
      progress.stations_passed++;
    } else {
      progress.stations_failed++;
    }
    
    if (stationResult.global_judgement === 'Severe Fail') {
      progress.severe_fails++;
    }
    
    // Track specialty
    if (!progress.specialties_covered.includes(stationResult.specialty)) {
      progress.specialties_covered.push(stationResult.specialty);
    }
    
    // Determine overall status
    const totalCompleted = progress.stations_completed.length;
    
    if (totalCompleted >= 16) {
      if (progress.severe_fails >= 1) {
        progress.overall_status = 'review_required';
      } else if (progress.stations_passed >= 12) {
        progress.overall_status = 'passed';
      } else {
        progress.overall_status = 'failed';
      }
    } else {
      progress.overall_status = 'in_progress';
    }
    
    progress.last_updated = new Date().toISOString();
    
    await saveCASCProgress(userId, progress);
    
    console.log(`✅ Station ${totalCompleted}/16 added. Status: ${progress.overall_status}`);
    
    return progress;
  } catch (error) {
    console.error('❌ Failed to add station result:', error);
    throw error;
  }
}

/**
 * Reset CASC progress
 */
export async function resetCASCProgress(userId: string): Promise<void> {
  try {
    await redis.del(`casc_progress:${userId}`);
    console.log('✅ CASC progress reset for:', userId);
  } catch (error) {
    console.error('❌ Failed to reset CASC progress:', error);
    throw error;
  }
}