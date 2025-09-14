import { NextRequest, NextResponse } from 'next/server';
import { 
  destroySession, 
  getClientIP,
  getSecurityHeaders,
  logSecurityEvent
} from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    
    // Get session token from cookie
    const sessionToken = request.cookies.get('admin-session')?.value;
    
    if (sessionToken) {
      // Destroy session
      destroySession(sessionToken);
      logSecurityEvent('LOGOUT', { ip, sessionToken: sessionToken.substring(0, 8) + '...' }, ip);
    }
    
    const response = NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { 
        status: 200,
        headers: getSecurityHeaders()
      }
    );
    
    // Clear session cookie
    response.cookies.set('admin-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });
    
    return response;
    
  } catch (error) {
    const ip = getClientIP(request);
    logSecurityEvent('LOGOUT_ERROR', { error: error instanceof Error ? error.message : 'Unknown error' }, ip);
    
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
