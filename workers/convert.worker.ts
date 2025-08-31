import { convertImage, ConvertOptions } from '../lib/convert';

interface WorkerMessage {
  type: 'convert';
  id: string;
  file: File;
  options: ConvertOptions;
}

interface WorkerResponse {
  type: 'progress' | 'done' | 'error';
  id: string;
  percent?: number;
  payload?: any;
  message?: string;
}

self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const { type, id, file, options } = event.data;

  if (type === 'convert') {
    try {
      // Send initial progress
      self.postMessage({ type: 'progress', id, percent: 5 } as WorkerResponse);
      
      // Simulate progress during HEIC conversion if needed
      if (file.type === 'image/heic' || file.type === 'image/heif' || 
          file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
        self.postMessage({ type: 'progress', id, percent: 15 } as WorkerResponse);
      }
      
      // Simulate progress during image loading
      self.postMessage({ type: 'progress', id, percent: 30 } as WorkerResponse);
      
      // Simulate progress during canvas processing
      self.postMessage({ type: 'progress', id, percent: 60 } as WorkerResponse);
      
      const result = await convertImage(file, options);
      
      // Send completion progress
      self.postMessage({ type: 'progress', id, percent: 100 } as WorkerResponse);
      self.postMessage({ type: 'done', id, payload: result } as WorkerResponse);
      
    } catch (error) {
      console.error('Worker conversion error:', error);
      self.postMessage({ 
        type: 'error', 
        id, 
        message: error instanceof Error ? error.message : 'Conversion failed' 
      } as WorkerResponse);
    }
  }
};
