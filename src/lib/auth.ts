import crypto from 'crypto';
import { NextRequest } from 'next/server';

// Security configuration
const SECURITY_CONFIG = {
  // Strong password requirements
  MIN_PASSWORD_LENGTH: 12,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBERS: true,
  REQUIRE_SYMBOLS: true,
  
  // Rate limiting
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  
  // Session security
  SESSION_DURATION: 2 * 60 * 60 * 1000, // 2 hours
  SESSION_REFRESH_THRESHOLD: 30 * 60 * 1000, // 30 minutes
  
  // CSRF protection
  CSRF_TOKEN_LENGTH: 32,
  
  // Input validation
  MAX_INPUT_LENGTH: 1000,
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
};

// In-memory storage for demo (use Redis/database in production)
const loginAttempts = new Map<string, { count: number; lastAttempt: number; lockedUntil?: number }>();
const sessions = new Map<string, { userId: string; expiresAt: number; lastActivity: number }>();
const csrfTokens = new Map<string, { token: string; expiresAt: number }>();

// Export session functions for shared use
export { sessions };

// Password validation
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < SECURITY_CONFIG.MIN_PASSWORD_LENGTH) {
    errors.push(`Password must be at least ${SECURITY_CONFIG.MIN_PASSWORD_LENGTH} characters long`);
  }
  
  if (SECURITY_CONFIG.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (SECURITY_CONFIG.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (SECURITY_CONFIG.REQUIRE_NUMBERS && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (SECURITY_CONFIG.REQUIRE_SYMBOLS && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return { valid: errors.length === 0, errors };
}

// Rate limiting
export function checkRateLimit(ip: string): { allowed: boolean; remainingAttempts: number; lockoutTime?: number } {
  const now = Date.now();
  const attempts = loginAttempts.get(ip);
  
  if (!attempts) {
    return { allowed: true, remainingAttempts: SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS };
  }
  
  // Check if account is locked
  if (attempts.lockedUntil && now < attempts.lockedUntil) {
    return { 
      allowed: false, 
      remainingAttempts: 0, 
      lockoutTime: attempts.lockedUntil 
    };
  }
  
  // Reset attempts if lockout period has passed
  if (attempts.lockedUntil && now >= attempts.lockedUntil) {
    loginAttempts.delete(ip);
    return { allowed: true, remainingAttempts: SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS };
  }
  
  // Check if max attempts reached
  if (attempts.count >= SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS) {
    const lockoutUntil = now + SECURITY_CONFIG.LOCKOUT_DURATION;
    attempts.lockedUntil = lockoutUntil;
    return { 
      allowed: false, 
      remainingAttempts: 0, 
      lockoutTime: lockoutUntil 
    };
  }
  
  return { 
    allowed: true, 
    remainingAttempts: SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS - attempts.count 
  };
}

// Record failed login attempt
export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const attempts = loginAttempts.get(ip) || { count: 0, lastAttempt: now };
  
  attempts.count += 1;
  attempts.lastAttempt = now;
  
  loginAttempts.set(ip, attempts);
}

// Clear failed attempts on successful login
export function clearFailedAttempts(ip: string): void {
  loginAttempts.delete(ip);
}

// Generate secure session token
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Create session
export function createSession(userId: string): string {
  const token = generateSessionToken();
  const now = Date.now();
  
  sessions.set(token, {
    userId,
    expiresAt: now + SECURITY_CONFIG.SESSION_DURATION,
    lastActivity: now
  });
  
  return token;
}

// Validate session
export function validateSession(token: string): { valid: boolean; userId?: string } {
  const session = sessions.get(token);
  
  if (!session) {
    return { valid: false };
  }
  
  const now = Date.now();
  
  // Check if session expired
  if (now > session.expiresAt) {
    sessions.delete(token);
    return { valid: false };
  }
  
  // Update last activity
  session.lastActivity = now;
  
  // Auto-refresh session if needed
  if (now > session.expiresAt - SECURITY_CONFIG.SESSION_REFRESH_THRESHOLD) {
    session.expiresAt = now + SECURITY_CONFIG.SESSION_DURATION;
  }
  
  return { valid: true, userId: session.userId };
}

// Destroy session
export function destroySession(token: string): void {
  sessions.delete(token);
}

// Generate CSRF token
export function generateCSRFToken(sessionToken: string): string {
  const token = crypto.randomBytes(SECURITY_CONFIG.CSRF_TOKEN_LENGTH).toString('hex');
  const now = Date.now();
  
  csrfTokens.set(sessionToken, {
    token,
    expiresAt: now + SECURITY_CONFIG.SESSION_DURATION
  });
  
  return token;
}

// Validate CSRF token
export function validateCSRFToken(sessionToken: string, csrfToken: string): boolean {
  const stored = csrfTokens.get(sessionToken);
  
  if (!stored) {
    return false;
  }
  
  const now = Date.now();
  
  // Check if token expired
  if (now > stored.expiresAt) {
    csrfTokens.delete(sessionToken);
    return false;
  }
  
  return stored.token === csrfToken;
}

// Input sanitization
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Remove null bytes
  let sanitized = input.replace(/\0/g, '');
  
  // Limit length
  if (sanitized.length > SECURITY_CONFIG.MAX_INPUT_LENGTH) {
    sanitized = sanitized.substring(0, SECURITY_CONFIG.MAX_INPUT_LENGTH);
  }
  
  // Remove potentially dangerous characters
  sanitized = sanitized.replace(/[<>]/g, '');
  
  return sanitized.trim();
}

// Validate file upload
export function validateFileUpload(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!SECURITY_CONFIG.ALLOWED_FILE_TYPES.includes(file.type)) {
    return { 
      valid: false, 
      error: `Invalid file type. Allowed types: ${SECURITY_CONFIG.ALLOWED_FILE_TYPES.join(', ')}` 
    };
  }
  
  // Check file size
  if (file.size > SECURITY_CONFIG.MAX_FILE_SIZE) {
    return { 
      valid: false, 
      error: `File too large. Maximum size: ${SECURITY_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB` 
    };
  }
  
  return { valid: true };
}

// Get client IP
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return (request as { ip?: string }).ip || 'unknown';
}

// Security headers
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
  };
}

// Log security events
export function logSecurityEvent(event: string, details: unknown, ip: string): void {
  const timestamp = new Date().toISOString();
  console.log(`[SECURITY] ${timestamp} - ${event}`, { details, ip });
  
  // In production, send to security monitoring service
  // Example: sendToSecurityService(event, details, ip);
}

export { SECURITY_CONFIG };
