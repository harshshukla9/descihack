import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Save the uploaded file temporarily
    const filePath = path.join(process.cwd(), 'uploads', file.name);
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    await writeFile(filePath, fileBuffer);

    console.log('File saved:', filePath);

    // Simulate processing and returning a download link
    const resultFileUrl = '/example-result.xlsx';

    return NextResponse.json({ message: 'File processed successfully', resultFileUrl });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
