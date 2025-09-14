import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    // Check if Cloudinary is configured
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      return NextResponse.json({ 
        error: 'Cloudinary not configured. Please set up environment variables.' 
      }, { status: 500 });
    }

    const uploadPromises = files.map(async (file) => {
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('file', file);
      cloudinaryFormData.append('upload_preset', uploadPreset);

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: cloudinaryFormData,
        }
      );

      if (!cloudinaryResponse.ok) {
        const errorText = await cloudinaryResponse.text();
        throw new Error(`Upload failed for ${file.name}: ${errorText}`);
      }

      return await cloudinaryResponse.json();
    });

    const results = await Promise.all(uploadPromises);

    return NextResponse.json({
      images: results.map(result => ({
        secure_url: result.secure_url,
        public_id: result.public_id
      }))
    });
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    return NextResponse.json({ 
      error: 'Failed to upload images',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
