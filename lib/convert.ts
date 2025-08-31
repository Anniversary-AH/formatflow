// FormatFlow - Image Converter (client-side only)

import heic2any from 'heic2any';

export interface ConvertOptions {
  out: 'jpg' | 'png' | 'webp';
  quality: number;
  maxW?: number;
  maxH?: number;
}

export interface ConvertResult {
  blob: Blob;
  outName: string;
  originalBytes: number;
  convertedBytes: number;
}

export function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    try {
      if (canvas.toBlob) {
        canvas.toBlob(b => b ? resolve(b) : reject(new Error("toBlob null")), type, quality);
      } else {
        const dataURL = canvas.toDataURL(type, quality);
        fetch(dataURL)
          .then(response => response.blob())
          .then(resolve)
          .catch(reject);
      }
    } catch (e) {
      reject(e as Error);
    }
  });
}

function isHeicFile(file: File): boolean {
  return file.type === 'image/heic' || file.type === 'image/heif' || 
         file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
}

function getOutputFileName(fileName: string, outputFormat: string): string {
  const baseName = fileName.replace(/\.[^/.]+$/, '');
  return `${baseName}.${outputFormat}`;
}

function getMimeType(format: string): string {
  switch (format) {
    case 'jpg': return 'image/jpeg';
    case 'png': return 'image/png';
    case 'webp': return 'image/webp';
    default: return 'image/jpeg';
  }
}

export async function convertImage(file: File, options: ConvertOptions): Promise<ConvertResult> {
  const originalBytes = file.size;
  let imageBlob: File | Blob = file;
  let objectUrl: string | null = null;

  try {
    // Step 1: Convert HEIC/HEIF to JPEG if needed
    if (isHeicFile(file)) {
      const heicResult = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.8
      });
      imageBlob = heicResult as Blob;
    }

    // Step 2: Create image bitmap or HTML image element
    let image: ImageBitmap | HTMLImageElement;
    
    if (typeof createImageBitmap !== 'undefined') {
      image = await createImageBitmap(imageBlob);
    } else {
      // Fallback to HTMLImageElement
      const img = new Image();
      objectUrl = URL.createObjectURL(imageBlob);
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = objectUrl!;
      });
      
      image = img;
    }

    // Step 3: Calculate dimensions
    let { width, height } = image;
    
    if (options.maxW && width > options.maxW) {
      height = (height * options.maxW) / width;
      width = options.maxW;
    }
    
    if (options.maxH && height > options.maxH) {
      width = (width * options.maxH) / height;
      height = options.maxH;
    }

    // Step 4: Create canvas and draw image
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(width);
    canvas.height = Math.round(height);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }

    // Enable image smoothing for better quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Step 5: Convert to blob
    const mimeType = getMimeType(options.out);
    const quality = options.out === 'png' ? undefined : options.quality;
    
    const blob = await canvasToBlob(canvas, mimeType, quality);
    
    // Step 6: Clean up
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }

    return {
      blob,
      outName: getOutputFileName(file.name, options.out),
      originalBytes,
      convertedBytes: blob.size
    };

  } catch (error) {
    // Clean up on error
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
    throw error;
  }
}
