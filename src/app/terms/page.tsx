// FormatFlow - Terms of Service

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <main className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-[#E5E7EB] shadow-sm p-6 md:p-8 bg-white">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#111827] mb-8" style={{ fontFamily: 'Merienda, cursive' }}>
              Terms of Service
            </h1>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-[#111827] mb-3" style={{ fontFamily: 'Merienda, cursive' }}>
                  Service Description
                </h2>
                <p className="text-[#6B7280] leading-relaxed" style={{ fontFamily: 'Lexend, sans-serif' }}>
                  FormatFlow is a free in-browser image converter provided as-is. We offer tools to convert image files between different formats without requiring any downloads or account creation.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827] mb-3" style={{ fontFamily: 'Merienda, cursive' }}>
                  Acceptable Use
                </h2>
                <p className="text-[#6B7280] leading-relaxed" style={{ fontFamily: 'Lexend, sans-serif' }}>
                  You may only use FormatFlow to convert files that you own or have permission to modify. You agree not to use our service for any unlawful purpose or to process content that violates any applicable laws or regulations.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827] mb-3" style={{ fontFamily: 'Merienda, cursive' }}>
                  Limitations and Disclaimers
                </h2>
                <p className="text-[#6B7280] leading-relaxed" style={{ fontFamily: 'Lexend, sans-serif' }}>
                  FormatFlow is provided without any warranties, express or implied. We are not responsible for any loss of data, damages, or other issues that may arise from using our service. You use our tools at your own risk.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827] mb-3" style={{ fontFamily: 'Merienda, cursive' }}>
                  Changes to Terms
                </h2>
                <p className="text-[#6B7280] leading-relaxed" style={{ fontFamily: 'Lexend, sans-serif' }}>
                  We may update these terms of service at any time. Continued use of FormatFlow after changes are made constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827] mb-3" style={{ fontFamily: 'Merienda, cursive' }}>
                  Contact
                </h2>
                <p className="text-[#6B7280] leading-relaxed" style={{ fontFamily: 'Lexend, sans-serif' }}>
                  If you have questions about these terms or need to report any issues, please contact us at{' '}
                  <a 
                    href="mailto:legal@formatflow.app" 
                    className="text-[#6E56CF] hover:text-[#6E56CF]/80 underline"
                  >
                    legal@formatflow.app
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
