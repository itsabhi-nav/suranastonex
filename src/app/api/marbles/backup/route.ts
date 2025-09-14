import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MARBLES_JSON_PATH = path.join(process.cwd(), 'src', 'data', 'marbles.json');
const BACKUP_DIR = path.join(process.cwd(), 'src', 'data', 'backups');

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// GET - Create backup
export async function GET() {
  try {
    if (!fs.existsSync(MARBLES_JSON_PATH)) {
      return NextResponse.json({ error: 'Marbles file not found' }, { status: 404 });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `marbles-backup-${timestamp}.json`;
    const backupPath = path.join(BACKUP_DIR, backupFileName);

    // Copy current marbles.json to backup
    fs.copyFileSync(MARBLES_JSON_PATH, backupPath);

    // Clean up old backups (keep only last 10)
    const backupFiles = fs.readdirSync(BACKUP_DIR)
      .filter(file => file.startsWith('marbles-backup-') && file.endsWith('.json'))
      .sort()
      .reverse();

    if (backupFiles.length > 10) {
      const filesToDelete = backupFiles.slice(10);
      filesToDelete.forEach(file => {
        fs.unlinkSync(path.join(BACKUP_DIR, file));
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Backup created successfully',
      backupFile: backupFileName,
      totalBackups: backupFiles.length
    });
  } catch (error) {
    console.error('Error creating backup:', error);
    return NextResponse.json({ error: 'Failed to create backup' }, { status: 500 });
  }
}

// POST - Restore from backup
export async function POST(request: NextRequest) {
  try {
    const { backupFile } = await request.json();

    if (!backupFile) {
      return NextResponse.json({ error: 'Backup file name is required' }, { status: 400 });
    }

    const backupPath = path.join(BACKUP_DIR, backupFile);

    if (!fs.existsSync(backupPath)) {
      return NextResponse.json({ error: 'Backup file not found' }, { status: 404 });
    }

    // Create backup of current file before restore
    const currentBackup = `marbles-pre-restore-${Date.now()}.json`;
    fs.copyFileSync(MARBLES_JSON_PATH, path.join(BACKUP_DIR, currentBackup));

    // Restore from backup
    fs.copyFileSync(backupPath, MARBLES_JSON_PATH);

    return NextResponse.json({ 
      success: true, 
      message: 'Data restored successfully',
      restoredFrom: backupFile,
      currentBackup: currentBackup
    });
  } catch (error) {
    console.error('Error restoring backup:', error);
    return NextResponse.json({ error: 'Failed to restore backup' }, { status: 500 });
  }
}
