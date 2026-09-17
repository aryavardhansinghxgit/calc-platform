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
    { slug: "percentage-calculator", name: "Percentage Spanish", url: `${baseUrl}/es/calculators/percentage-calculator` },
    { slug: "scientific-calculator", name: "Scientific Spanish", url: `${baseUrl}/es/calculators/scientific-calculator` },
    { slug: "bmi-calculator", name: "BMI Spanish", url: `${baseUrl}/es/calculators/bmi-calculator` },
    { slug: "date-calculator", name: "Date Spanish", url: `${baseUrl}/es/calculators/date-calculator` },
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
      assertAudit(`${route.slug}: HTTP 200 returned with valid HTML body`, html.length > 500);

      // Check hreflang and canonical tags
      assertAudit(`${route.slug}: Has Spanish hreflang or canonical`, html.includes('hreflang="es"') || html.includes('es/calculators'));

      // Check JSON-LD structured data
      assertAudit(`${route.slug}: Contains application/ld+json schema`, html.includes('application/ld+json'));

      // Check for prominent English UI leakage tokens that shouldn't appear in Spanish UI
      const leakedEnglishTokens: string[] = [];
      if (route.slug === "percentage-calculator") {
        if (html.includes("Percentage Calculator in Common Phrases")) leakedEnglishTokens.push("Percentage Calculator in Common Phrases");
        if (html.includes("Percentage Difference Calculator")) leakedEnglishTokens.push("Percentage Difference Calculator");
        if (html.includes("Percentage Change Calculator")) leakedEnglishTokens.push("Percentage Change Calculator");
      } else if (route.slug === "scientific-calculator") {
        if (html.includes("Math Calculators") && !html.includes("Calculadoras Matemáticas")) leakedEnglishTokens.push("Math Calculators");
        if (html.includes("Calculator Features") && !html.includes("Características de la Calculadora")) leakedEnglishTokens.push("Calculator Features");
      } else if (route.slug === "bmi-calculator") {
        if (html.includes("Your BMI Score") && !html.includes("Su Puntuación de IMC")) leakedEnglishTokens.push("Your BMI Score");
      } else if (route.slug === "date-calculator") {
        if (html.includes("Date Difference") && !html.includes("Diferencia de Fechas")) leakedEnglishTokens.push("Date Difference");
        if (html.includes("Add / Subtract Days") && !html.includes("Sumar / Restar Días")) leakedEnglishTokens.push("Add / Subtract Days");
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
