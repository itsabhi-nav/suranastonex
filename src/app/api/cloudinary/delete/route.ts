import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json({ error: 'Public ID is required' }, { status: 400 });
    }

    // Check if Cloudinary is configured
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.log('Cloudinary not configured for deletion, skipping deletion');
      return NextResponse.json({ 
        success: true, 
        message: 'Cloudinary not configured for deletion' 
      });
    }

    // Generate signature for authenticated deletion
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = crypto
      .createHash('sha1')
      .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
      .digest('hex');

    // Delete from Cloudinary
    const deleteResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_id: publicId,
          signature: signature,
          api_key: apiKey,
          timestamp: timestamp,
        }),
      }
    );

    if (!deleteResponse.ok) {
      const errorText = await deleteResponse.text();
      console.error('Cloudinary deletion error:', errorText);
      return NextResponse.json({ 
        error: 'Failed to delete image from Cloudinary',
        details: errorText
      }, { status: 400 });
    }

    const deleteData = await deleteResponse.json();
    console.log(`Successfully deleted image: ${publicId}`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Image deleted successfully',
      result: deleteData
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ 
      error: 'Internal server error during deletion',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
