// FormatFlow - Contact Us

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <main className="max-w-2xl mx-auto">
          <div className="rounded-2xl border border-[#E5E7EB] shadow-sm p-6 md:p-8 bg-white">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#111827] mb-6" style={{ fontFamily: 'Merienda, cursive' }}>
              Contact Us
            </h1>
            
            <div className="space-y-6">
              <p className="text-[#6B7280] leading-relaxed text-lg" style={{ fontFamily: 'Lexend, sans-serif' }}>
                Reach us anytime at{' '}
                <a 
                  href="mailto:hello@amber-field.com" 
                  className="text-[#6E56CF] hover:text-[#6E56CF]/80 underline font-medium"
                >
                  hello@amber-field.com
                </a>
                .
              </p>
              
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-[#111827] mb-3" style={{ fontFamily: 'Merienda, cursive' }}>
                  We&apos;re here to help with:
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-[#6B7280]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6E56CF]"></span>
                    Bug reports
                  </li>
                  <li className="flex items-center gap-2 text-[#6B7280]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6E56CF]"></span>
                    Feature requests
                  </li>
                  <li className="flex items-center gap-2 text-[#6B7280]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6E56CF]"></span>
                    Privacy questions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
