import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check if Cloudinary is configured
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      return NextResponse.json({ 
        error: 'Cloudinary not configured. Please set up environment variables.' 
      }, { status: 500 });
    }

    // Create a new FormData for Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('upload_preset', uploadPreset);

    // Upload to Cloudinary using their upload API
    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: cloudinaryFormData,
      }
    );

    if (!cloudinaryResponse.ok) {
      const errorText = await cloudinaryResponse.text();
      console.error('Cloudinary upload error:', errorText);
      
      // Parse the error and return specific messages
      let errorMessage = 'Failed to upload to Cloudinary';
      
      if (errorText.includes('whitelisted')) {
        errorMessage = 'Upload preset not whitelisted. Please configure the upload preset for unsigned uploads in Cloudinary dashboard.';
      } else if (errorText.includes('Invalid upload preset')) {
        errorMessage = 'Invalid upload preset. Please check the upload preset name in your environment variables.';
      } else if (errorText.includes('File size too large')) {
        errorMessage = 'File size too large. Please upload a smaller image.';
      } else if (errorText.includes('Invalid file type')) {
        errorMessage = 'Invalid file type. Please upload a valid image file (JPG, PNG, etc.).';
      }
      
      return NextResponse.json({ 
        error: errorMessage,
        details: errorText
      }, { status: 400 });
    }

    const cloudinaryData = await cloudinaryResponse.json();

    return NextResponse.json({
      secure_url: cloudinaryData.secure_url,
      public_id: cloudinaryData.public_id,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ 
      error: 'Internal server error during upload',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
