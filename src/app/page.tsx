// FormatFlow - Image Converter (client-side only)

'use client';

import dynamic from 'next/dynamic';
import { Zap, Sliders, Download, Lightbulb, UploadCloud, Wand2, BadgeDollarSign, ShieldCheck } from 'lucide-react';

// Dynamic imports to prevent SSR issues
const ImageConverter = dynamic(() => import('../../components/image-converter'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-[#F9FAFB]">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <main className="max-w-4xl mx-auto text-center">
            <div className="rounded-2xl border border-[#E5E7EB] shadow-sm p-4 md:p-8 space-y-2 mt-4 bg-white">
              <h1 className="text-xl md:text-3xl font-semibold tracking-tight text-[#111827]" style={{ fontFamily: 'Merienda, cursive' }}>
              FormatFlow: Your Image Conversion Suite
              </h1>
              <p className="text-sm md:text-base text-[#6B7280]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                Convert your images between popular formats with ease and speed. No downloads, no signups, no limits.
              </p>
              <p className="text-sm flex items-center justify-center gap-2 text-[#6B7280]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                <ShieldCheck className="w-4 h-4 text-[#6E56CF]" />
                All conversions happen in your browser. Files never leave your device.
              </p>
            </div>
            
            <ImageConverter />
            
            {/* Format Pills */}
            <div className="mt-6 flex flex-wrap gap-2 text-sm text-[#6B7280] justify-center">
              <span className="rounded-full border border-[#E5E7EB] bg-white px-2.5 py-1">HEIC</span>
              <span className="rounded-full border border-[#E5E7EB] bg-white px-2.5 py-1">WebP</span>
              <span className="rounded-full border border-[#E5E7EB] bg-white px-2.5 py-1">PNG</span>
              <span className="rounded-full border border-[#E5E7EB] bg-white px-2.5 py-1">JPG</span>
              <span className="text-[#6B7280]">→</span>
              <span className="rounded-full border border-[#E5E7EB] bg-white px-2.5 py-1">JPG</span>
              <span className="rounded-full border border-[#E5E7EB] bg-white px-2.5 py-1">PNG</span>
              <span className="rounded-full border border-[#E5E7EB] bg-white px-2.5 py-1">WebP</span>
            </div>

            {/* How to convert images */}
            <section className="mt-8 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm p-0 overflow-hidden" aria-labelledby="how-to-title">
              <div className="bg-gradient-to-r from-[#6E56CF] via-[#7C3AED] to-[#6E56CF] px-4 md:px-5 py-4 flex items-center gap-3">
                <div className="size-8 rounded-full bg-white/20 grid place-items-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h2 id="how-to-title" className="text-base md:text-lg font-semibold text-white" style={{ fontFamily: 'Merienda, cursive' }}>How to convert images</h2>
                  <p className="text-sm text-white/90" style={{ fontFamily: 'Lexend, sans-serif' }}>Quick 4-step guide</p>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <div className="grid grid-cols-1 gap-4 md:gap-5">
                  {/* Step 1 */}
                  <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 flex gap-3 items-start transition-transform hover:-translate-y-0.5 hover:shadow-lg" aria-label="Step 1: Upload images by dragging and dropping or browsing files">
                    <UploadCloud className="shrink-0 w-8 h-8 text-indigo-500" />
                    <div>
                      <h3 className="text-sm font-medium text-[#111827]" style={{ fontFamily: 'Merienda, cursive' }}>Drop or browse images</h3>
                      <p className="text-sm text-[#6B7280]" style={{ fontFamily: 'Lexend, sans-serif' }}>Upload your images by dragging and dropping or clicking to browse files</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 flex gap-3 items-start transition-transform hover:-translate-y-0.5 hover:shadow-lg" aria-label="Step 2: Select JPG, PNG, or WebP format for your converted images">
                    <Sliders className="shrink-0 w-8 h-8 text-amber-500" />
                    <div>
                      <h3 className="text-sm font-medium text-[#111827]" style={{ fontFamily: 'Merienda, cursive' }}>Choose output format</h3>
                      <p className="text-sm text-[#6B7280]" style={{ fontFamily: 'Lexend, sans-serif' }}>Select JPG, PNG, or WebP format for your converted images</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 flex gap-3 items-start transition-transform hover:-translate-y-0.5 hover:shadow-lg" aria-label="Step 3: Fine-tune quality and compression to balance size and image quality">
                    <Wand2 className="shrink-0 w-8 h-8 text-[#6E56CF]" />
                    <div>
                      <h3 className="text-sm font-medium text-[#111827]" style={{ fontFamily: 'Merienda, cursive' }}>Adjust quality settings</h3>
                      <p className="text-sm text-[#6B7280]" style={{ fontFamily: 'Lexend, sans-serif' }}>Fine-tune quality and compression to balance size and image quality</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 flex gap-3 items-start transition-transform hover:-translate-y-0.5 hover:shadow-lg" aria-label="Step 4: Process all images and download as individual files or a ZIP archive">
                    <Download className="shrink-0 w-8 h-8 text-emerald-500" />
                    <div>
                      <h3 className="text-sm font-medium text-[#111827]" style={{ fontFamily: 'Merienda, cursive' }}>Convert and download</h3>
                      <p className="text-sm text-[#6B7280]" style={{ fontFamily: 'Lexend, sans-serif' }}>Process all images and download as individual files or a ZIP archive</p>
                    </div>
                  </div>
                </div>
                
                {/* Tips Callout */}
                <div className="mt-3 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] p-4 flex gap-3 items-center justify-center text-center">
                  <div className="size-7 rounded-full bg-[#22C55E]/10 grid place-items-center">
                    <Lightbulb className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#111827]" style={{ fontFamily: 'Merienda, cursive' }}>Faster batch converts</h3>
                    <p className="text-sm text-[#6B7280]" style={{ fontFamily: 'Lexend, sans-serif' }}>Keep the tab focused while converting large HEIC files. We&apos;ll add a background worker automatically.</p>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="mt-4 md:mt-5">
                  <p className="text-sm text-[#6B7280]" style={{ fontFamily: 'Lexend, sans-serif' }}>Pro tip: Lower the quality or set a max width for the smallest file size.</p>
                </div>
              </div>
            </section>
            
            {/* Advertisement */}
            <section aria-label="Advertisement" className="mt-6 rounded-xl border border-[#E5E7EB] bg-white p-3 text-center text-xs text-[#6B7280]">
              <span className="mr-2 inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-700 px-2 py-0.5">
                <BadgeDollarSign className="w-3 h-3" />
              </span>
              Advertisement
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
