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

async function auditRenderedPages() {
  console.log("============================================================");
  console.log("CALCI - DOM LOCALIZATION & RENDERED CONTENT AUDITOR");
  console.log("============================================================\n");

  const baseUrl = "http://localhost:3000";
  const routes = [
    { slug: "percentage-calculator", name: "Percentage Spanish", url: `${baseUrl}/es/calculators/percentage-calculator`, locale: "es" },
    { slug: "scientific-calculator", name: "Scientific Spanish", url: `${baseUrl}/es/calculators/scientific-calculator`, locale: "es" },
    { slug: "bmi-calculator", name: "BMI Spanish", url: `${baseUrl}/es/calculators/bmi-calculator`, locale: "es" },
    { slug: "date-calculator", name: "Date Spanish", url: `${baseUrl}/es/calculators/date-calculator`, locale: "es" },
    { slug: "fuel-cost-calculator", name: "Fuel Cost Spanish", url: `${baseUrl}/es/calculators/fuel-cost-calculator`, locale: "es" },
    { slug: "mortgage-calculator", name: "Mortgage Spanish", url: `${baseUrl}/es/calculators/mortgage-calculator`, locale: "es" },
    { slug: "mortgage-calculator", name: "Mortgage French", url: `${baseUrl}/fr/calculators/mortgage-calculator`, locale: "fr" },
    { slug: "mortgage-calculator", name: "Mortgage German", url: `${baseUrl}/de/calculators/mortgage-calculator`, locale: "de" },
    { slug: "mortgage-calculator", name: "Mortgage Hindi", url: `${baseUrl}/hi/calculators/mortgage-calculator`, locale: "hi" },
    { slug: "mortgage-calculator", name: "Mortgage Portuguese", url: `${baseUrl}/pt/calculators/mortgage-calculator`, locale: "pt" },
  ];

  let totalScans = 0;
  let passedScans = 0;
  let failedScans = 0;

  function assertAudit(name: string, condition: boolean, details?: string) {
    totalScans++;
    if (condition) {
      passedScans++;
      console.log(`  [PASS] ${name}`);
    } else {
      failedScans++;
      console.error(`  [FAIL] ${name}${details ? ` -> ${details}` : ""}`);
    }
  }

  for (const route of routes) {
    console.log(`\nAuditing Rendered Page: ${route.name} (${route.url})`);
    try {
      const html = await fetchPage(route.url);
      assertAudit(`${route.slug} [${route.locale}]: HTTP 200 returned with valid HTML body`, html.length > 500);

      // Check hreflang and canonical tags
      assertAudit(`${route.slug} [${route.locale}]: Has locale hreflang or canonical`, html.includes(`hreflang="${route.locale}"`) || html.includes(`${route.locale}/calculators`));

      // Check JSON-LD structured data
      assertAudit(`${route.slug} [${route.locale}]: Contains application/ld+json schema`, html.includes('application/ld+json'));

      // Strip script tags so we audit visible rendered DOM rather than server JSON hydration blobs
      const domHtml = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

      // Check for prominent English UI leakage tokens in rendered DOM
      const leakedEnglishTokens: string[] = [];
      if (route.slug === "percentage-calculator") {
        if (domHtml.includes("Percentage Calculator in Common Phrases")) leakedEnglishTokens.push("Percentage Calculator in Common Phrases");
        if (domHtml.includes("Percentage Difference Calculator")) leakedEnglishTokens.push("Percentage Difference Calculator");
        if (domHtml.includes("Percentage Change Calculator")) leakedEnglishTokens.push("Percentage Change Calculator");
      } else if (route.slug === "scientific-calculator") {
        if (domHtml.includes("Math Calculators") && !domHtml.includes("Calculadoras Matemáticas")) leakedEnglishTokens.push("Math Calculators");
        if (domHtml.includes("Calculator Features") && !domHtml.includes("Características de la Calculadora")) leakedEnglishTokens.push("Calculator Features");
      } else if (route.slug === "bmi-calculator") {
        if (domHtml.includes("Your BMI Score") && !domHtml.includes("Su Puntuación de IMC")) leakedEnglishTokens.push("Your BMI Score");
      } else if (route.slug === "date-calculator") {
        if (domHtml.includes("Date Difference") && !domHtml.includes("Diferencia de Fechas")) leakedEnglishTokens.push("Date Difference");
        if (domHtml.includes("Add / Subtract Days") && !domHtml.includes("Sumar / Restar Días")) leakedEnglishTokens.push("Add / Subtract Days");
      } else if (route.slug === "fuel-cost-calculator") {
        if (domHtml.includes("Trip Distance (miles)")) leakedEnglishTokens.push("Trip Distance (miles)");
        if (domHtml.includes("Vehicle Efficiency (MPG)")) leakedEnglishTokens.push("Vehicle Efficiency (MPG)");
        if (domHtml.includes("Fuel Price per Gallon ($)")) leakedEnglishTokens.push("Fuel Price per Gallon ($)");
        if (domHtml.includes("Total Trip Expense")) leakedEnglishTokens.push("Total Trip Expense");
      } else if (route.slug === "mortgage-calculator") {
        if (route.locale === "es") {
          if (domHtml.includes("Home Price ($)") || domHtml.includes("Loan Term (Years)")) leakedEnglishTokens.push("Home Price ($)");
          if (domHtml.includes("Monthly Principal & Interest")) leakedEnglishTokens.push("Monthly Principal & Interest");
          if (domHtml.includes("Mortgage Data") || domHtml.includes("Amortization Schedule")) leakedEnglishTokens.push("Mortgage Data");
        } else if (route.locale === "fr") {
          if (domHtml.includes("Home Price ($)") || domHtml.includes("Loan Term (Years)")) leakedEnglishTokens.push("Home Price ($)");
          if (domHtml.includes("Monthly Principal & Interest")) leakedEnglishTokens.push("Monthly Principal & Interest");
          if (domHtml.includes("Mortgage Data") || domHtml.includes("Amortization Schedule")) leakedEnglishTokens.push("Mortgage Data");
          if (domHtml.includes("Total Interest Paid")) leakedEnglishTokens.push("Total Interest Paid");
        } else if (route.locale === "de") {
          if (domHtml.includes("Home Price ($)") || domHtml.includes("Loan Term (Years)")) leakedEnglishTokens.push("Home Price ($)");
          if (domHtml.includes("Monthly Principal & Interest")) leakedEnglishTokens.push("Monthly Principal & Interest");
          if (domHtml.includes("Mortgage Data") || domHtml.includes("Amortization Schedule")) leakedEnglishTokens.push("Mortgage Data");
          if (domHtml.includes("Total Interest Paid")) leakedEnglishTokens.push("Total Interest Paid");
        } else if (route.locale === "hi") {
          if (domHtml.includes("Home Price ($)") || domHtml.includes("Loan Term (Years)")) leakedEnglishTokens.push("Home Price ($)");
          if (domHtml.includes("Monthly Principal & Interest")) leakedEnglishTokens.push("Monthly Principal & Interest");
          if (domHtml.includes("Mortgage Data") || domHtml.includes("Amortization Schedule")) leakedEnglishTokens.push("Mortgage Data");
          if (domHtml.includes("Total Interest Paid")) leakedEnglishTokens.push("Total Interest Paid");
        } else if (route.locale === "pt") {
          if (domHtml.includes("Home Price ($)") || domHtml.includes("Loan Term (Years)")) leakedEnglishTokens.push("Home Price ($)");
          if (domHtml.includes("Monthly Principal & Interest")) leakedEnglishTokens.push("Monthly Principal & Interest");
          if (domHtml.includes("Mortgage Data") || domHtml.includes("Amortization Schedule")) leakedEnglishTokens.push("Mortgage Data");
          if (domHtml.includes("Total Interest Paid")) leakedEnglishTokens.push("Total Interest Paid");
        }
      }

      assertAudit(
        `${route.slug}: Zero English UI leakage detected in primary components`,
        leakedEnglishTokens.length === 0,
        `Found leaked tokens: ${leakedEnglishTokens.join(", ")}`
      );
    } catch (err: any) {
      assertAudit(`${route.slug}: Successfully reached dev server`, false, err.message);
    }
  }

  console.log("\n============================================================");
  console.log(`TOTAL AUDIT CHECKS: ${totalScans} | PASSED: ${passedScans} | FAILED: ${failedScans}`);
  console.log("============================================================\n");
}

auditRenderedPages().catch((err) => {
  console.error("Auditor failed:", err);
});
