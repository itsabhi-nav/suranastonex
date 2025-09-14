import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Marble } from '@/data/marbles';
import { 
  // validateSession, 
  getClientIP,
  getSecurityHeaders,
  logSecurityEvent,
  sanitizeInput
} from '@/lib/auth';

const MARBLES_JSON_PATH = path.join(process.cwd(), 'src', 'data', 'marbles.json');

// Security validation function
const validateAdminAccess = (request: NextRequest): { valid: boolean; error?: string } => {
  const ip = getClientIP(request);
  const sessionToken = request.cookies.get('admin-session')?.value;
  
  if (!sessionToken) {
    logSecurityEvent('UNAUTHORIZED_MARBLES_API_ACCESS', { ip }, ip);
    return { valid: false, error: 'No session token provided' };
  }
  
  // For now, just check if session token exists (simplified for demo)
  // In production, implement proper session validation
  if (sessionToken && sessionToken.length > 10) {
    return { valid: true };
  }
  
  logSecurityEvent('INVALID_SESSION_MARBLES_API_ACCESS', { ip }, ip);
  return { valid: false, error: 'Invalid session token' };
};

// Helper function to read marbles from JSON file
const readMarblesFromFile = (): Marble[] => {
  try {
    if (fs.existsSync(MARBLES_JSON_PATH)) {
      const fileContent = fs.readFileSync(MARBLES_JSON_PATH, 'utf8');
      if (!fileContent.trim()) {
        console.warn('Marbles file is empty, returning default data');
        return [];
      }
      const parsed = JSON.parse(fileContent);
      if (!Array.isArray(parsed)) {
        console.error('Marbles file does not contain an array');
        return [];
      }
      return parsed;
    }
    console.warn('Marbles file does not exist, returning empty array');
    return [];
  } catch (error) {
    console.error('Error reading marbles file:', error);
    return [];
  }
};

// Helper function to write marbles to JSON file
const writeMarblesToFile = (marbles: Marble[]): boolean => {
  try {
    const marblesJson = JSON.stringify(marbles, null, 2);
    fs.writeFileSync(MARBLES_JSON_PATH, marblesJson, 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing marbles file:', error);
    return false;
  }
};

// GET - Read all marbles (public access)
export async function GET(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    logSecurityEvent('MARBLES_API_ACCESS', { ip, method: 'GET' }, ip);
    
    const marbles = readMarblesFromFile();
    return NextResponse.json({ marbles }, {
      headers: getSecurityHeaders()
    });
  } catch (error) {
    const ip = getClientIP(request);
    logSecurityEvent('MARBLES_API_ERROR', { error: error instanceof Error ? error.message : 'Unknown error' }, ip);
    
    return NextResponse.json(
      { error: 'Failed to read marbles' }, 
      { 
        status: 500,
        headers: getSecurityHeaders()
      }
    );
  }
}

// POST - Create new marble
export async function POST(request: NextRequest) {
  try {
    // Validate admin access
    const accessValidation = validateAdminAccess(request);
    if (!accessValidation.valid) {
      return NextResponse.json(
        { error: accessValidation.error },
        { 
          status: 401,
          headers: getSecurityHeaders()
        }
      );
    }
    
    const ip = getClientIP(request);
    const newMarble: Marble = await request.json();
    
    // Sanitize input data
    const sanitizedMarble: Marble = {
      ...newMarble,
      name: sanitizeInput(newMarble.name),
      color: sanitizeInput(newMarble.color),
      origin: sanitizeInput(newMarble.origin),
      category: sanitizeInput(newMarble.category),
      rarity: sanitizeInput(newMarble.rarity) as "common" | "uncommon" | "rare" | "epic" | "legendary",
      sellingStatus: sanitizeInput(newMarble.sellingStatus) as "Selling Fast" | "Best Seller" | "Out of Stock" | "New Arrival",
      description: sanitizeInput(newMarble.description)
    };
    
    logSecurityEvent('MARBLE_CREATE_ATTEMPT', { ip, marbleName: sanitizedMarble.name }, ip);
    
    // Validate required fields
    if (!sanitizedMarble.name || !sanitizedMarble.color || !sanitizedMarble.origin) {
      logSecurityEvent('MARBLE_CREATE_VALIDATION_FAILED', { ip, reason: 'Missing required fields' }, ip);
      return NextResponse.json(
        { error: 'Missing required fields: name, color, origin' }, 
        { 
          status: 400,
          headers: getSecurityHeaders()
        }
      );
    }
    
    // Add timestamp
    sanitizedMarble.createdAt = new Date().toISOString();
    sanitizedMarble.updatedAt = new Date().toISOString();
    
    const marbles = readMarblesFromFile();
    marbles.push(sanitizedMarble);
    
    const success = writeMarblesToFile(marbles);
    if (!success) {
      logSecurityEvent('MARBLE_CREATE_SAVE_FAILED', { ip, marbleName: sanitizedMarble.name }, ip);
      return NextResponse.json(
        { error: 'Failed to save marble' }, 
        { 
          status: 500,
          headers: getSecurityHeaders()
        }
      );
    }
    
    logSecurityEvent('MARBLE_CREATED', { ip, marbleName: sanitizedMarble.name, marbleId: sanitizedMarble.id }, ip);
    
    return NextResponse.json(
      { marble: sanitizedMarble, message: 'Marble created successfully' },
      { headers: getSecurityHeaders() }
    );
  } catch (error) {
    const ip = getClientIP(request);
    logSecurityEvent('MARBLE_CREATE_ERROR', { error: error instanceof Error ? error.message : 'Unknown error' }, ip);
    
    return NextResponse.json(
      { error: 'Failed to create marble' }, 
      { 
        status: 500,
        headers: getSecurityHeaders()
      }
    );
  }
}

// PUT - Update marble
export async function PUT(request: NextRequest) {
  try {
    // Validate admin access
    const accessValidation = validateAdminAccess(request);
    if (!accessValidation.valid) {
      return NextResponse.json(
        { error: accessValidation.error },
        { 
          status: 401,
          headers: getSecurityHeaders()
        }
      );
    }
    
    const ip = getClientIP(request);
    const updatedMarble: Marble = await request.json();
    
    // Sanitize input data
    const sanitizedMarble: Marble = {
      ...updatedMarble,
      name: sanitizeInput(updatedMarble.name),
      color: sanitizeInput(updatedMarble.color),
      origin: sanitizeInput(updatedMarble.origin),
      category: sanitizeInput(updatedMarble.category),
      rarity: sanitizeInput(updatedMarble.rarity) as "common" | "uncommon" | "rare" | "epic" | "legendary",
      sellingStatus: sanitizeInput(updatedMarble.sellingStatus) as "Selling Fast" | "Best Seller" | "Out of Stock" | "New Arrival",
      description: sanitizeInput(updatedMarble.description)
    };
    
    logSecurityEvent('MARBLE_UPDATE_ATTEMPT', { ip, marbleId: sanitizedMarble.id, marbleName: sanitizedMarble.name }, ip);
    
    // Update timestamp
    sanitizedMarble.updatedAt = new Date().toISOString();
    
    const marbles = readMarblesFromFile();
    const index = marbles.findIndex(m => m.id === sanitizedMarble.id);
    
    if (index === -1) {
      logSecurityEvent('MARBLE_UPDATE_NOT_FOUND', { ip, marbleId: sanitizedMarble.id }, ip);
      return NextResponse.json(
        { error: 'Marble not found' }, 
        { 
          status: 404,
          headers: getSecurityHeaders()
        }
      );
    }
    
    marbles[index] = sanitizedMarble;
    
    const success = writeMarblesToFile(marbles);
    if (!success) {
      logSecurityEvent('MARBLE_UPDATE_SAVE_FAILED', { ip, marbleId: sanitizedMarble.id }, ip);
      return NextResponse.json(
        { error: 'Failed to update marble' }, 
        { 
          status: 500,
          headers: getSecurityHeaders()
        }
      );
    }
    
    logSecurityEvent('MARBLE_UPDATED', { ip, marbleId: sanitizedMarble.id, marbleName: sanitizedMarble.name }, ip);
    
    return NextResponse.json(
      { marble: sanitizedMarble, message: 'Marble updated successfully' },
      { headers: getSecurityHeaders() }
    );
  } catch (error) {
    const ip = getClientIP(request);
    logSecurityEvent('MARBLE_UPDATE_ERROR', { error: error instanceof Error ? error.message : 'Unknown error' }, ip);
    
    return NextResponse.json(
      { error: 'Failed to update marble' }, 
      { 
        status: 500,
        headers: getSecurityHeaders()
      }
    );
  }
}

// DELETE - Delete marble
export async function DELETE(request: NextRequest) {
  try {
    // Validate admin access
    const accessValidation = validateAdminAccess(request);
    if (!accessValidation.valid) {
      return NextResponse.json(
        { error: accessValidation.error },
        { 
          status: 401,
          headers: getSecurityHeaders()
        }
      );
    }
    
    const ip = getClientIP(request);
    const { id } = await request.json();
    
    if (!id) {
      logSecurityEvent('MARBLE_DELETE_VALIDATION_FAILED', { ip, reason: 'Missing ID' }, ip);
      return NextResponse.json(
        { error: 'Marble ID is required' }, 
        { 
          status: 400,
          headers: getSecurityHeaders()
        }
      );
    }
    
    const marbles = readMarblesFromFile();
    const marbleToDelete = marbles.find(m => m.id === id);
    
    if (!marbleToDelete) {
      logSecurityEvent('MARBLE_DELETE_NOT_FOUND', { ip, marbleId: id }, ip);
      return NextResponse.json(
        { error: 'Marble not found' }, 
        { 
          status: 404,
          headers: getSecurityHeaders()
        }
      );
    }
    
    logSecurityEvent('MARBLE_DELETE_ATTEMPT', { ip, marbleId: id, marbleName: marbleToDelete.name }, ip);
    
    const updatedMarbles = marbles.filter(m => m.id !== id);
    
    const success = writeMarblesToFile(updatedMarbles);
    if (!success) {
      logSecurityEvent('MARBLE_DELETE_SAVE_FAILED', { ip, marbleId: id }, ip);
      return NextResponse.json(
        { error: 'Failed to delete marble' }, 
        { 
          status: 500,
          headers: getSecurityHeaders()
        }
      );
    }
    
    logSecurityEvent('MARBLE_DELETED', { ip, marbleId: id, marbleName: marbleToDelete.name }, ip);
    
    return NextResponse.json(
      { 
        message: 'Marble deleted successfully',
        deletedMarble: marbleToDelete
      },
      { headers: getSecurityHeaders() }
    );
  } catch (error) {
    const ip = getClientIP(request);
    logSecurityEvent('MARBLE_DELETE_ERROR', { error: error instanceof Error ? error.message : 'Unknown error' }, ip);
    
    return NextResponse.json(
      { error: 'Failed to delete marble' }, 
      { 
        status: 500,
        headers: getSecurityHeaders()
      }
    );
  }
}
