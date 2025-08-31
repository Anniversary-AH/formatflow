// FormatFlow - Privacy Policy

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <main className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-[#E5E7EB] shadow-sm p-6 md:p-8 bg-white">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#111827] mb-8" style={{ fontFamily: 'Merienda, cursive' }}>
              Privacy Policy
            </h1>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-[#111827] mb-3" style={{ fontFamily: 'Merienda, cursive' }}>
                  How We Handle Your Files
                </h2>
                <p className="text-[#6B7280] leading-relaxed" style={{ fontFamily: 'Lexend, sans-serif' }}>
                  All image conversions happen entirely in your browser. We never upload, store, or access your files on our servers. Your images stay on your device throughout the entire process, ensuring complete privacy and security.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827] mb-3" style={{ fontFamily: 'Merienda, cursive' }}>
                  Cookies and Tracking
                </h2>
                <p className="text-[#6B7280] leading-relaxed mb-4" style={{ fontFamily: 'Lexend, sans-serif' }}>
                  We use cookies only for essential website functionality. When enabled, Google AdSense may also use cookies to provide personalized advertisements.
                </p>
                <p className="text-[#6B7280] leading-relaxed" style={{ fontFamily: 'Lexend, sans-serif' }}>
                  You can control how Google uses cookies for ads by visiting{' '}
                  <a 
                    href="https://adssettings.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#6E56CF] hover:text-[#6E56CF]/80 underline"
                  >
                    Google&apos;s Ad Settings
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827] mb-3" style={{ fontFamily: 'Merienda, cursive' }}>
                  Data Collection
                </h2>
                <p className="text-[#6B7280] leading-relaxed" style={{ fontFamily: 'Lexend, sans-serif' }}>
                  We don&apos;t collect any personal data from your use of our image converter. The only personal information we might receive is what you choose to share if you contact us directly via email.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827] mb-3" style={{ fontFamily: 'Merienda, cursive' }}>
                  Contact Us
                </h2>
                <p className="text-[#6B7280] leading-relaxed" style={{ fontFamily: 'Lexend, sans-serif' }}>
                  If you have any privacy concerns or questions about how we handle your data, please contact us at{' '}
                  <a 
                    href="mailto:privacy@formatflow.app" 
                    className="text-[#6E56CF] hover:text-[#6E56CF]/80 underline"
                  >
                    privacy@formatflow.app
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
