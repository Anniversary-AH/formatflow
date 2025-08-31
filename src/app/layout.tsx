import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { colors } from "../../lib/theme";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "FormatFlow – In-browser Image Converter",
  description: "Fast, secure image converter in your browser. Convert HEIC, WebP, PNG, and JPG files instantly. No downloads, no signups, no limits. All processing happens in your browser for complete privacy.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  },
  openGraph: {
    title: "FormatFlow – In-browser Image Converter",
    description: "Fast, secure image converter in your browser. Convert HEIC, WebP, PNG, and JPG files instantly. No downloads, no signups, no limits. All processing happens in your browser for complete privacy.",
    url: "https://formatflow.app",
    siteName: "FormatFlow",
    images: ["/favicon-512x512.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FormatFlow – In-browser Image Converter",
    description: "Fast, secure image converter in your browser. Convert HEIC, WebP, PNG, and JPG files instantly. No downloads, no signups, no limits. All processing happens in your browser for complete privacy.",
    images: ["/favicon-512x512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon-512x512.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Merienda:wght@300..900&family=Neuton:ital,wght@0,200;0,300;0,400;0,700;0,800;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className={`font-sans bg-[#F9FAFB] text-[#111827] antialiased ${inter.variable}`}>
        <div 
          className="mx-auto max-w-screen-lg px-4 md:px-6"
          style={{
            '--primary': colors.primary,
            '--accent': colors.accent,
            '--card': colors.card,
            '--bg': colors.bg,
            '--muted': colors.muted,
          } as React.CSSProperties}
        >
          {children}
          <footer className="py-8 mt-16 border-t border-[#E5E7EB]">
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-wrap justify-center gap-4 text-xs text-neutral-500">
                <a href="https://www.amber-field.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
                <a href="https://www.amber-field.com/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms of Service</a>
                <a href="/contact" className="hover:underline">Contact</a>
              </div>
              <div className="text-xs text-neutral-500">
                © Amber-Field 2025
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
