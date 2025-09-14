// Security Configuration
// In production, these should be environment variables

export const SECURITY_CONFIG = {
  // Admin password must be set in .env file as ADMIN_PASSWORD
  // No hardcoded fallback for security
  
  // Rate limiting
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  
  // Session security
  SESSION_DURATION: 2 * 60 * 60 * 1000, // 2 hours
  SESSION_REFRESH_THRESHOLD: 30 * 60 * 1000, // 30 minutes
  
  // Password requirements
  MIN_PASSWORD_LENGTH: 12,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBERS: true,
  REQUIRE_SYMBOLS: true,
  
  // Input validation
  MAX_INPUT_LENGTH: 1000,
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
};

// Security warnings for production
export const SECURITY_WARNINGS = {
  PRODUCTION_CHECKLIST: [
    'Change the default admin password',
    'Use environment variables for sensitive data',
    'Enable HTTPS in production',
    'Set up proper database with encryption',
    'Implement proper logging and monitoring',
    'Set up rate limiting at the server level',
    'Use a proper session store (Redis)',
    'Enable CSRF protection',
    'Set up security headers at the server level',
    'Regular security audits and updates'
  ]
};
