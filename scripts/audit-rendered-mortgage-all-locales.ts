import http from "http";

function fetchPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(data);
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
}

interface LocaleAuditConfig {
  locale: string;
  url: string;
  expectedH1: string;
  expectedH2: string;
  expectedInputs: string[];
  expectedButton: string;
}

const LOCALES_CONFIG: LocaleAuditConfig[] = [
  {
    locale: "en",
    url: "http://localhost:3000/calculators/mortgage-calculator",
    expectedH1: "Mortgage Calculator",
    expectedH2: "Mortgage Inputs",
    expectedInputs: ["Home Price", "Down Payment", "Loan Term", "Interest Rate"],
    expectedButton: "Clear",
  },
  {
    locale: "es",
    url: "http://localhost:3000/es/calculators/mortgage-calculator",
    expectedH1: "Calculadora de Hipoteca",
    expectedH2: "Datos de la Hipoteca",
    expectedInputs: ["Precio de la Vivienda", "Pago Inicial", "Plazo del Préstamo", "Tasa de Interés"],
    expectedButton: "Borrar",
  },
  {
    locale: "fr",
    url: "http://localhost:3000/fr/calculators/mortgage-calculator",
    expectedH1: "Calculateur de Prêt Hypothécaire",
    expectedH2: "Données du Prêt Hypothécaire",
    expectedInputs: ["Prix du Bien", "Apport Personnel", "Durée du Prêt", "Taux d&#x27;Intérêt"],
    expectedButton: "Effacer",
  },
  {
    locale: "de",
    url: "http://localhost:3000/de/calculators/mortgage-calculator",
    expectedH1: "Baufinanzierungsrechner",
    expectedH2: "Kreditparameter",
    expectedInputs: ["Kaufpreis der Immobilie", "Eigenkapital", "Darlehenslaufzeit", "Sollzinssatz"],
    expectedButton: "Löschen",
  },
  {
    locale: "hi",
    url: "http://localhost:3000/hi/calculators/mortgage-calculator",
    expectedH1: "मॉर्गेज कैलकुलेटर",
    expectedH2: "ऋण इनपुट डेटा",
    expectedInputs: ["घर का मूल्य", "डाउन पेमेंट", "ऋण अवधि", "ब्याज दर"],
    expectedButton: "साफ़ करें",
  },
  {
    locale: "pt",
    url: "http://localhost:3000/pt/calculators/mortgage-calculator",
    expectedH1: "Calculadora de Hipoteca",
    expectedH2: "Dados da Hipoteca",
    expectedInputs: ["Preço do Imóvel", "Entrada Inicial", "Prazo do Empréstimo", "Taxa de Juro"],
    expectedButton: "Limpar",
  },
];

async function runDeepAudit() {
  console.log("==================================================");
  console.log("CALCI - DEEP RENDERED DOM AUDIT (ALL 6 LOCALES)");
  console.log("==================================================\n");

  let total = 0;
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string, detail?: string) {
    total++;
    if (condition) {
      passed++;
      console.log(`  ✅ PASS: ${msg}`);
    } else {
      failed++;
      console.error(`  ❌ FAIL: ${msg}${detail ? ` -> ${detail}` : ""}`);
    }
  }

  for (const cfg of LOCALES_CONFIG) {
    console.log(`\n--- Auditing Locale: ${cfg.locale.toUpperCase()} (${cfg.url}) ---`);
    const html = await fetchPage(cfg.url);
    const domOnly = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

    // 1. HTTP and Size
    assert(html.length > 50000, `${cfg.locale}: HTML body size is robust (${html.length} bytes)`);

    // 2. Headings
    assert(domOnly.includes(cfg.expectedH1), `${cfg.locale}: Exact localized H1 rendered`);
    assert(domOnly.includes(cfg.expectedH2), `${cfg.locale}: Exact localized H2 rendered`);

    // 3. Inputs
    for (const input of cfg.expectedInputs) {
      assert(domOnly.includes(input), `${cfg.locale}: Input label '${input}' present in rendered DOM`);
    }

    // 4. Action Button
    assert(domOnly.includes(cfg.expectedButton), `${cfg.locale}: Button text '${cfg.expectedButton}' present in rendered DOM`);

    // 5. Language Selector
    assert(html.toLowerCase().includes("selector de idioma") || html.toLowerCase().includes("select language") || html.toLowerCase().includes("language selector") || html.toLowerCase().includes("sélectionner la langue") || html.toLowerCase().includes("sprachauswahl") || html.toLowerCase().includes("भाषा") || html.toLowerCase().includes("selecionar idioma"), `${cfg.locale}: Language selector rendered`);

    // 6. Theme classes
    assert(domOnly.includes("dark:bg-slate-900") || domOnly.includes("dark:bg-zinc-900") || domOnly.includes("dark:bg-zinc-950"), `${cfg.locale}: Dark mode background surface classes present`);
    assert(domOnly.includes("dark:text-slate-100") || domOnly.includes("dark:text-zinc-100") || domOnly.includes("dark:text-slate-200"), `${cfg.locale}: Dark mode text classes present`);

    // 7. Structured Data (JSON-LD)
    assert(html.includes("application/ld+json"), `${cfg.locale}: JSON-LD structured data included`);

    // 8. Hreflang Graph (Case-insensitive check for hrefLang / hreflang)
    assert(/hrefLang="en"/i.test(html), `${cfg.locale}: Reciprocal hreflang en present`);
    assert(/hrefLang="es"/i.test(html), `${cfg.locale}: Reciprocal hreflang es present`);
    assert(/hrefLang="fr"/i.test(html), `${cfg.locale}: Reciprocal hreflang fr present`);
    assert(/hrefLang="de"/i.test(html), `${cfg.locale}: Reciprocal hreflang de present`);
    assert(/hrefLang="hi"/i.test(html), `${cfg.locale}: Reciprocal hreflang hi present`);
    assert(/hrefLang="pt"/i.test(html), `${cfg.locale}: Reciprocal hreflang pt present`);
    assert(/hrefLang="x-default"/i.test(html), `${cfg.locale}: Reciprocal hreflang x-default present`);
  }

  console.log("\n==================================================");
  console.log(`TOTAL AUDIT CHECKS: ${total} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log("==================================================\n");
}

runDeepAudit().catch((err) => {
  console.error("Deep audit failed:", err);
});
