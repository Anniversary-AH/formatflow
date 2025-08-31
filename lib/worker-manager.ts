import { ConvertOptions, ConvertResult } from './convert';

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
  payload?: ConvertResult;
  message?: string;
}

interface QueuedFile {
  id: string;
  file: File;
  options: ConvertOptions;
  resolve: (result: ConvertResult) => void;
  reject: (error: string) => void;
  onProgress?: (percent: number) => void;
}

export class ConversionWorkerManager {
  private worker: Worker | null = null;
  private queue: QueuedFile[] = [];
  private isProcessing = false;
  private currentFile: QueuedFile | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.worker = new Worker(new URL('../workers/convert.worker.ts', import.meta.url));
        this.worker.onmessage = this.handleWorkerMessage.bind(this);
        console.log('Worker initialized successfully');
      } catch (error) {
        console.error('Failed to initialize worker:', error);
      }
    }
  }

  private handleWorkerMessage(event: MessageEvent<WorkerResponse>) {
    const { type, id, percent, payload, message } = event.data;
    
    console.log('Worker message received:', { type, id, percent, message });

    if (!this.currentFile || this.currentFile.id !== id) {
      console.log('No current file or ID mismatch:', { currentId: this.currentFile?.id, messageId: id });
      return;
    }

    switch (type) {
      case 'progress':
        if (percent !== undefined && this.currentFile.onProgress) {
          console.log('Sending progress update:', percent);
          this.currentFile.onProgress(percent);
        }
        break;

      case 'done':
        if (payload) {
          console.log('Conversion completed successfully');
          this.currentFile.resolve(payload);
        }
        this.processNextFile();
        break;

      case 'error':
        console.error('Conversion error:', message);
        this.currentFile.reject(message || 'Conversion failed');
        this.processNextFile();
        break;
    }
  }

  private async processNextFile() {
    this.currentFile = null;
    this.isProcessing = false;

    if (this.queue.length > 0) {
      await this.processQueue();
    }
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0 || !this.worker) {
      console.log('Cannot process queue:', { isProcessing: this.isProcessing, queueLength: this.queue.length, hasWorker: !!this.worker });
      return;
    }

    this.isProcessing = true;
    this.currentFile = this.queue.shift()!;

    const message: WorkerMessage = {
      type: 'convert',
      id: this.currentFile.id,
      file: this.currentFile.file,
      options: this.currentFile.options
    };

    console.log('Sending message to worker:', { id: message.id, fileName: message.file.name });
    this.worker.postMessage(message);
  }

  async convertFile(
    file: File, 
    options: ConvertOptions, 
    onProgress?: (percent: number) => void
  ): Promise<ConvertResult> {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substr(2, 9);
      
      this.queue.push({
        id,
        file,
        options,
        resolve,
        reject,
        onProgress
      });

      this.processQueue();
    });
  }

  destroy() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.queue = [];
    this.currentFile = null;
    this.isProcessing = false;
  }
}
