import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
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

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CalcPlatform - Professional Free Online Calculators",
  description: "Fast, precise, interactive calculators for finance, mortgage, loan EMI, SIP wealth, BMI health, and mathematics.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
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
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-QXJ65PHPXJ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-QXJ65PHPXJ');
            `,
          }}
        />
        <Script
          id="extension-guard"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Filter out false-positive hydration errors caused by browser extensions (e.g. Bitwarden, etc.)
                  if (typeof console !== 'undefined' && console.error) {
                    var origError = console.error;
                    console.error = function() {
                      var args = Array.prototype.slice.call(arguments);
                      var msg = args.map(function(a) {
                        return typeof a === 'string' ? a : (a && a.message ? a.message : '');
                      }).join(' ');
                      if (
                        msg.indexOf('bis_skin_checked') !== -1 ||
                        msg.indexOf('bis_register') !== -1 ||
                        msg.indexOf('__processed_') !== -1 ||
                        msg.indexOf('eppiocemhmnlbjplcgkofci') !== -1
                      ) {
                        return;
                      }
                      return origError.apply(console, arguments);
                    };
                  }

                  // Strip extension-injected attributes from DOM before & during React hydration
                  var cleanNode = function(node) {
                    if (!node || node.nodeType !== 1) return;
                    if (node.hasAttribute('bis_skin_checked')) node.removeAttribute('bis_skin_checked');
                    if (node.hasAttribute('bis_register')) node.removeAttribute('bis_register');
                  };

                  if (typeof MutationObserver !== 'undefined' && document.documentElement) {
                    var observer = new MutationObserver(function(mutations) {
                      for (var i = 0; i < mutations.length; i++) {
                        var m = mutations[i];
                        if (m.type === 'attributes') {
                          var name = m.attributeName;
                          if (name === 'bis_skin_checked' || name === 'bis_register' || (name && name.indexOf('__processed_') === 0)) {
                            m.target.removeAttribute(name);
                          }
                        } else if (m.type === 'childList') {
                          for (var j = 0; j < m.addedNodes.length; j++) {
                            cleanNode(m.addedNodes[j]);
                          }
                        }
                      }
                    });

                    observer.observe(document.documentElement, {
                      attributes: true,
                      subtree: true,
                      childList: true,
                      attributeFilter: ['bis_skin_checked', 'bis_register']
                    });

                    window.addEventListener('load', function() {
                      setTimeout(function() {
                        observer.disconnect();
                      }, 5000);
                    });
                  }

                  // Web3 extension noise handler
                  window.addEventListener('error', function(event) {
                    if (event && event.message && (event.message.indexOf('ethereum') !== -1 || event.message.indexOf('evmAsk') !== -1)) {
                      event.preventDefault();
                      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                    }
                  }, true);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-150"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div id="main-web-app" className="no-print-main-app flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-150">
              <Navbar />
              <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex-1 w-full space-y-6">
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
