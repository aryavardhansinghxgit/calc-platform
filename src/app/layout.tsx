import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CalcPlatform - Professional Free Online Calculators",
  description: "Fast, precise, interactive calculators for finance, mortgage, loan EMI, SIP wealth, BMI health, and mathematics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var ethVal = window.ethereum;
                  Object.defineProperty(window, 'ethereum', {
                    configurable: true,
                    enumerable: true,
                    get: function() { return ethVal; },
                    set: function(v) { ethVal = v; }
                  });
                } catch(e) {}
                window.addEventListener('error', function(event) {
                  if (event && event.message && (event.message.indexOf('ethereum') !== -1 || event.message.indexOf('evmAsk') !== -1)) {
                    event.preventDefault();
                    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                  }
                }, true);
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 font-sans selection:bg-blue-600 selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div id="main-web-app" className="no-print-main-app flex flex-col min-h-screen">
              <Navbar />
              <main className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 py-4 flex-1 w-full space-y-4">
                {children}
              </main>
              <Footer />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
