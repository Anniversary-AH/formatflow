// FormatFlow - Image Converter (client-side only)

export interface ConversionFile {
  id: string;
  name: string;
  file: File;
  status: 'queued' | 'processing' | 'done' | 'error';
  originalKB: number;
  convertedKB?: number;
  outURL?: string;
  error?: string;
  percent?: number;
}

export type OutputFormat = 'jpg' | 'png' | 'webp';

export interface ConversionOptions {
  format: OutputFormat;
  quality: number;
  maxW?: number;
  maxH?: number;
}
