import { NextRequest, NextResponse } from 'next/server';
import { 
  validateSession, 
  getClientIP,
  getSecurityHeaders,
  logSecurityEvent
} from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    
    // Get session token from cookie or header
    const sessionToken = request.cookies.get('admin-session')?.value || 
                        request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!sessionToken) {
      logSecurityEvent('MISSING_SESSION_TOKEN', { ip }, ip);
      return NextResponse.json(
        { error: 'No session token provided' },
        { 
          status: 401,
          headers: getSecurityHeaders()
        }
      );
    }
    
    // Validate session
    const sessionValidation = validateSession(sessionToken);
    
    if (!sessionValidation.valid) {
      logSecurityEvent('INVALID_SESSION', { ip, sessionToken: sessionToken.substring(0, 8) + '...' }, ip);
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { 
          status: 401,
          headers: getSecurityHeaders()
        }
      );
    }
    
    logSecurityEvent('SESSION_VALIDATED', { ip, userId: sessionValidation.userId }, ip);
    
    return NextResponse.json(
      { 
        valid: true, 
        userId: sessionValidation.userId 
      },
      { 
        status: 200,
        headers: getSecurityHeaders()
      }
    );
    
  } catch (error) {
    const ip = getClientIP(request);
    logSecurityEvent('SESSION_VALIDATION_ERROR', { error: error instanceof Error ? error.message : 'Unknown error' }, ip);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { 
        status: 500,
        headers: getSecurityHeaders()
      }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { 
      status: 405,
      headers: getSecurityHeaders()
    }
  );
}
