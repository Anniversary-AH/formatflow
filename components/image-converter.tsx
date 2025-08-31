// FormatFlow - Image Converter (client-side only)

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { UploadCloud, ArrowRightLeft, Archive } from 'lucide-react';
import { ConversionFile, ConversionOptions } from '../lib/types';

const ACCEPTED_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'image/heic': ['.heic'],
  'image/heif': ['.heif']
};

export default function ImageConverter() {
  const [files, setFiles] = useState<ConversionFile[]>([]);
  const [options, setOptions] = useState<ConversionOptions>({
    format: 'jpg',
    quality: 0.85
  });
  const [isConverting, setIsConverting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const objectUrlsRef = useRef<string[]>([]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: ConversionFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      file,
      status: 'queued',
      originalKB: Math.round(file.size / 1024)
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    multiple: true
  });

  const handleConvertAll = async () => {
    if (files.length === 0) return;
    
    setIsConverting(true);
    
    // Get all queued files
    const queuedFiles = files.filter(f => f.status === 'queued');
    
    // Start conversion for each queued file
    for (let i = 0; i < queuedFiles.length; i++) {
      const file = queuedFiles[i];
      
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, status: 'processing' } : f
      ));
      
      try {
        // Simulate progress updates
        const updateProgress = (percent: number) => {
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, percent } : f
          ));
        };
        
        updateProgress(10);
        
        // Import and use convertImage directly (bypassing worker for now)
        const { convertImage } = await import('../lib/convert');
        
        updateProgress(30);
        
        const result = await convertImage(file.file, { 
          out: options.format, 
          quality: options.quality 
        });
        
        updateProgress(100);
        
        const convertedUrl = URL.createObjectURL(result.blob);
        objectUrlsRef.current.push(convertedUrl);
        
        setFiles(prev => prev.map(f => 
          f.id === file.id ? {
            ...f,
            status: 'done',
            percent: 100,
            convertedKB: Math.round(result.convertedBytes / 1024),
            outURL: convertedUrl
          } : f
        ));
      } catch {
        setFiles(prev => prev.map(f => 
          f.id === file.id ? {
            ...f,
            status: 'error',
            error: 'Conversion failed'
          } : f
        ));
      }
    }
    
    setIsConverting(false);
  };

  const handleDownloadAll = async () => {
    if (files.filter(f => f.status === 'done').length === 0) return;
    
    setIsDownloading(true);
    
    try {
      const zip = new JSZip();
      const doneFiles = files.filter(f => f.status === 'done' && f.outURL);
      
      // Fetch all blobs first
      const blobPromises = doneFiles.map(async (file) => {
        const response = await fetch(file.outURL!);
        const blob = await response.blob();
        const extension = options.format;
        const fileName = file.name.replace(/\.[^/.]+$/, `.${extension}`);
        return { fileName, blob };
      });
      
      const blobs = await Promise.all(blobPromises);
      
      // Add all blobs to zip
      blobs.forEach(({ fileName, blob }) => {
        zip.file(fileName, blob);
      });
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, 'converted-images.zip');
    } catch {
      // Download failed silently
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.outURL) {
        URL.revokeObjectURL(file.outURL);
        objectUrlsRef.current = objectUrlsRef.current.filter(url => url !== file.outURL);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const completedFiles = files.filter(f => f.status === 'done');
  const hasFiles = files.length > 0;
  const canDownload = completedFiles.length > 0;
  const isProcessing = files.some(f => f.status === 'processing');

  return (
    <>
      <div className="rounded-2xl border border-[#E5E7EB] shadow-sm p-4 md:p-6 space-y-4 mt-4" style={{ backgroundColor: 'var(--color-card)' }}>
        <div 
          {...getRootProps()} 
          className={`border border-dashed rounded-xl p-6 md:p-8 text-center transition ${
            isDragActive ? 'border-[#6E56CF]/50' : 'border-[#E5E7EB]'
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-[#111827]/70 mb-4">
            <UploadCloud className="w-12 h-12 mx-auto text-[#6B7280]" />
          </div>
          <h3 className="text-lg font-medium text-[#111827] mb-2" style={{ fontFamily: 'Merienda, cursive' }}>
            {isDragActive ? 'Drop files here' : 'Drop your images here'}
          </h3>
          <p className="text-sm text-[#111827]/70 mb-4" style={{ fontFamily: 'Lexend, sans-serif' }}>
            or click to browse files
          </p>
          <button 
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-medium border border-[#E5E7EB] bg-[#F9FAFB] hover:bg-[#F3F4F6] text-[#111827] transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#6E56CF]/50"
            aria-label="Browse and select image files to convert"
          >
            Browse files
          </button>
        </div>
        
        {/* Desktop Controls */}
        <div className="hidden md:flex items-center justify-between gap-4 border-t border-[#E5E7EB] pt-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-[#111827]/80">Output format:</label>
            <select 
              className="bg-white border border-[#E5E7EB] rounded px-3 py-1 text-[#111827] text-sm focus:outline-none focus:ring-2 focus:ring-[#6E56CF]/50"
              value={options.format}
              onChange={(e) => setOptions(prev => ({ ...prev, format: e.target.value as 'jpg' | 'png' | 'webp' }))}
            >
              <option value="jpg">JPG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-[#111827]/80">Quality:</label>
            <input 
              type="range" 
              min="0.4" 
              max="1.0" 
              step="0.05" 
              value={options.quality}
              onChange={(e) => setOptions(prev => ({ ...prev, quality: parseFloat(e.target.value) }))}
              className="w-24 focus:outline-none focus:ring-2 focus:ring-[#6E56CF]/50"
              aria-label={`Image quality: ${Math.round(options.quality * 100)}%`}
            />
            <span className="text-sm text-[#111827]/70 w-8">{Math.round(options.quality * 100)}%</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleConvertAll}
            disabled={!hasFiles || isConverting || isProcessing}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-medium bg-[#6E56CF] text-white hover:bg-[#6E56CF]/90 focus:outline-none focus:ring-2 focus:ring-[#6E56CF]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
            aria-label={isConverting ? 'Converting images...' : `Convert ${files.length} image${files.length !== 1 ? 's' : ''} to ${options.format.toUpperCase()} format`}
          >
            <ArrowRightLeft className="w-4 h-4" />
            {isConverting ? 'Converting...' : 'Convert All'}
          </button>
          {canDownload && (
            <button
              onClick={handleDownloadAll}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-medium bg-[#6E56CF] text-white hover:bg-[#6E56CF]/90 focus:outline-none focus:ring-2 focus:ring-[#6E56CF]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
              aria-label={isDownloading ? 'Creating ZIP file...' : `Download ${completedFiles.length} converted image${completedFiles.length !== 1 ? 's' : ''} as ZIP file`}
            >
              <Archive className="w-4 h-4" />
              {isDownloading ? 'Creating ZIP...' : 'Download All (.zip)'}
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile Controls - Not fixed, inline with content */}
      <div className="md:hidden mt-4 rounded-2xl border border-[#E5E7EB] shadow-sm p-4 bg-white">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm text-[#111827]/80">Output format:</label>
            <select 
              className="bg-white border border-[#E5E7EB] rounded px-3 py-2 text-[#111827] text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#6E56CF]/50"
              value={options.format}
              onChange={(e) => setOptions(prev => ({ ...prev, format: e.target.value as 'jpg' | 'png' | 'webp' }))}
            >
              <option value="jpg">JPG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
            </select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-[#111827]/80">Quality:</label>
              <span className="text-sm text-[#111827]/70">{Math.round(options.quality * 100)}%</span>
            </div>
            <input 
              type="range" 
              min="0.4" 
              max="1.0" 
              step="0.05" 
              value={options.quality}
              onChange={(e) => setOptions(prev => ({ ...prev, quality: parseFloat(e.target.value) }))}
              className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6E56CF]/50"
              aria-label={`Image quality: ${Math.round(options.quality * 100)}%`}
            />
          </div>
        </div>
      </div>
      
      {/* Results Grid */}
      {files.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 mt-4 pb-4 md:pb-0">
          {files.map((file) => (
            <div key={file.id} className="rounded-xl border border-[#E5E7EB] shadow-sm p-3 space-y-2" style={{ backgroundColor: 'var(--color-card)' }}>
              <div className="flex justify-between items-start">
                <div className="text-sm flex items-center gap-2 flex-1 min-w-0" style={{ color: 'var(--color-muted)' }}>
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${file.status === 'done' ? 'bg-green-400' : file.status === 'processing' ? 'bg-amber-400 animate-pulse' : file.status === 'error' ? 'bg-red-400' : 'bg-gray-400'}`}></div>
                  <span className="truncate">{file.name}</span>
                </div>
                <button
                  onClick={() => handleRemoveFile(file.id)}
                  className="text-[#111827]/70 hover:text-[#111827]/90 text-sm ml-2 min-w-[24px] min-h-[24px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#6E56CF]/50"
                  aria-label={`Remove ${file.name} from conversion list`}
                >
                  ×
                </button>
              </div>
              
              {file.status === 'queued' && (
                <div className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  {file.originalKB} KB
                </div>
              )}
              
              {file.status === 'processing' && (
                <div className="space-y-1">
                  <div className="text-sm" style={{ color: 'var(--color-muted)', fontFamily: 'Lexend, sans-serif' }}>
                    Converting... {Math.round(file.percent || 0)}%
                  </div>
                  <div className="h-1 w-full rounded bg-[#E5E7EB] overflow-hidden">
                    <div 
                      className="h-1 bg-[#6E56CF] transition-[width] duration-200 bg-[linear-gradient(90deg,transparent,#6E56CF/40,transparent)] bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]"
                      style={{ width: `${file.percent || 0}%` }}
                    />
                  </div>
                </div>
              )}
              
              {file.status === 'done' && file.convertedKB && (
                <div className="flex items-center justify-between">
                  <div className="text-sm" style={{ color: 'var(--color-muted)' }}>
                    {file.originalKB} KB → {file.convertedKB} KB
                  </div>
                  <div className="inline-flex items-center gap-1 rounded-full bg-[#22C55E]/15 text-[#22C55E] px-2 py-0.5 text-[10px] font-semibold">
                    −{Math.round(((file.originalKB - file.convertedKB) / file.originalKB) * 100)}% size
                  </div>
                </div>
              )}
              
              {file.status === 'error' && (
                <div className="text-sm text-red-400">
                  {file.error}
                </div>
              )}
              
              <div className="h-40 rounded-lg bg-[#F9FAFB] flex items-center justify-center">
                {file.status === 'done' && file.outURL && (
                  <img 
                    src={file.outURL} 
                    alt={`Converted preview of ${file.name}`}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain rounded"
                  />
                )}
                {file.status !== 'done' && (
                  <div className="text-[#111827]/70 text-sm" style={{ fontFamily: 'Lexend, sans-serif' }}>Preview</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
