import { NextRequest, NextResponse } from 'next/server';
import { 
  validatePassword, 
  checkRateLimit, 
  recordFailedAttempt, 
  clearFailedAttempts,
  createSession,
  getClientIP,
  getSecurityHeaders,
  logSecurityEvent,
  sanitizeInput
} from '@/lib/auth';
// import { SECURITY_CONFIG } from '@/lib/security-config';

// Admin password from environment variable (required for security)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  throw new Error('ADMIN_PASSWORD environment variable is required but not set');
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    
    // Check rate limiting
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      logSecurityEvent('RATE_LIMIT_EXCEEDED', { ip }, ip);
      return NextResponse.json(
        { 
          error: 'Too many login attempts. Please try again later.',
          lockoutTime: rateLimit.lockoutTime 
        },
        { 
          status: 429,
          headers: getSecurityHeaders()
        }
      );
    }
    
    const body = await request.json();
    const { password } = body;
    
    // Sanitize input
    const sanitizedPassword = sanitizeInput(password);
    
    // Validate password format
    const passwordValidation = validatePassword(sanitizedPassword);
    if (!passwordValidation.valid) {
      recordFailedAttempt(ip);
      logSecurityEvent('INVALID_PASSWORD_FORMAT', { errors: passwordValidation.errors }, ip);
      return NextResponse.json(
        { 
          error: 'Invalid password format',
          details: passwordValidation.errors 
        },
        { 
          status: 400,
          headers: getSecurityHeaders()
        }
      );
    }
    
    // Check password
    console.log('DEBUG: sanitizedPassword:', JSON.stringify(sanitizedPassword));
    console.log('DEBUG: ADMIN_PASSWORD:', JSON.stringify(ADMIN_PASSWORD));
    console.log('DEBUG: passwords match:', sanitizedPassword === ADMIN_PASSWORD);
    
    if (sanitizedPassword !== ADMIN_PASSWORD) {
      recordFailedAttempt(ip);
      logSecurityEvent('INVALID_PASSWORD', { ip }, ip);
      return NextResponse.json(
        { 
          error: 'Invalid password',
          remainingAttempts: rateLimit.remainingAttempts - 1
        },
        { 
          status: 401,
          headers: getSecurityHeaders()
        }
      );
    }
    
    // Successful login
    clearFailedAttempts(ip);
    const sessionToken = createSession('admin');
    
    logSecurityEvent('SUCCESSFUL_LOGIN', { ip }, ip);
    
    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Login successful',
        sessionToken 
      },
      { 
        status: 200,
        headers: getSecurityHeaders()
      }
    );
    
    // Set secure session cookie
    response.cookies.set('admin-session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 60 * 60, // 2 hours
      path: '/'
    });
    
    return response;
    
  } catch (error) {
    const ip = getClientIP(request);
    logSecurityEvent('LOGIN_ERROR', { error: error instanceof Error ? error.message : 'Unknown error' }, ip);
    
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
