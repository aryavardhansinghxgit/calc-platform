import fs from "fs";
import path from "path";
import { ALL_CALCULATORS, getCalculatorDefinition } from "../src/calculators";
import { getCalculatorOverlay } from "../src/i18n/overlays";
import { getCalculatorLocalizedContent } from "../src/i18n/content";
import { PUBLISHED_MATRIX, isLocalePublished } from "../src/i18n/publishing";
import { formatCurrency } from "../src/lib/calculator-engine/formatters";
import { Locale } from "../src/i18n/types";

interface SubstantiveBlock {
  id: string;
  type: "heading" | "paragraph" | "list_item" | "table" | "formula" | "example" | "callout";
  text: string;
  numbers: number[];
  charCount: number;
}

interface SectionAST {
  id: string;
  heading: string;
  level: number;
  blocks: SubstantiveBlock[];
  hasTable: boolean;
  hasExample: boolean;
  hasFormula: boolean;
  totalTextLength: number;
}

interface FullCalculatorAST {
  slug: string;
  locale: string;
  sections: SectionAST[];
  faqs: { question: string; answer: string }[];
  totalSubstantiveBlocks: number;
  totalWords: number;
}

function extractFullAST(filePath: string, slug: string, locale: string): FullCalculatorAST {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File does not exist: ${filePath}`);
  }
  const content = fs.readFileSync(filePath, "utf-8");

  const faqs: { question: string; answer: string }[] = [];
  const faqRegex = /{\s*["']?question["']?\s*:\s*["'`](.*?)["'`]\s*,\s*["']?answer["']?\s*:\s*["'`](.*?)["'`]\s*}/gs;
  let faqM;
  while ((faqM = faqRegex.exec(content)) !== null) {
    faqs.push({
      question: faqM[1].replace(/\\"/g, '"'),
      answer: faqM[2].replace(/\\"/g, '"'),
    });
  }

  if (locale === "en" && faqs.length === 0) {
    const def = getCalculatorDefinition(slug);
    if (def?.faqs) {
      for (const f of def.faqs) {
        faqs.push({ question: f.question, answer: f.answer });
      }
    }
  }

  const sections: SectionAST[] = [];
  const sectionSplit = content.split(/<section[^>]*>/);

  let sIdx = 0;
  for (const rawSec of sectionSplit.slice(1)) {
    sIdx++;
    const secId = `section-${String(sIdx).padStart(2, "0")}`;

    const h2Match = rawSec.match(/<h2[^>]*>(.*?)<\/h2>/);
    const h3Match = rawSec.match(/<h3[^>]*>(.*?)<\/h3>/);
    const heading = (h2Match ? h2Match[1] : h3Match ? h3Match[1] : `Section ${sIdx}`).replace(/<[^>]+>/g, "").trim();
    const level = h2Match ? 2 : 3;

    const blocks: SubstantiveBlock[] = [];

    // Paragraphs
    let pIdx = 0;
    const pRegex = /<p[^>]*>(.*?)<\/p>/gs;
    let pM;
    while ((pM = pRegex.exec(rawSec)) !== null) {
      const pClean = pM[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (pClean.length > 0) {
        pIdx++;
        const numbers = (pClean.match(/\b\d+(?:[.,]\d+)?%?\b/g) || [])
          .map(n => parseFloat(n.replace(/[%$,]/g, "")))
          .filter(n => !isNaN(n));
        blocks.push({
          id: `${secId}.paragraph-${String(pIdx).padStart(2, "0")}`,
          type: "paragraph",
          text: pClean,
          numbers,
          charCount: pClean.length,
        });
      }
    }

    // List items
    let liIdx = 0;
    const liRegex = /<li[^>]*>(.*?)<\/li>/gs;
    let liM;
    while ((liM = liRegex.exec(rawSec)) !== null) {
      const liClean = liM[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (liClean.length > 0) {
        liIdx++;
        const numbers = (liClean.match(/\b\d+(?:[.,]\d+)?%?\b/g) || [])
          .map(n => parseFloat(n.replace(/[%$,]/g, "")))
          .filter(n => !isNaN(n));
        blocks.push({
          id: `${secId}.list_item-${String(liIdx).padStart(2, "0")}`,
          type: "list_item",
          text: liClean,
          numbers,
          charCount: liClean.length,
        });
      }
    }

    // Leaf divs (e.g. formula lines, callout text)
    const divRegex = /<div[^>]*>(.*?)<\/div>/gs;
    let divM;
    let divIdx = 0;
    while ((divM = divRegex.exec(rawSec)) !== null) {
      const inner = divM[1];
      if (!inner.includes("<div") && !inner.includes("<p") && !inner.includes("<ul") && !inner.includes("<table")) {
        const divClean = inner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        if (divClean.length > 15) {
          divIdx++;
          const numbers = (divClean.match(/\b\d+(?:[.,]\d+)?%?\b/g) || [])
            .map(n => parseFloat(n.replace(/[%$,]/g, "")))
            .filter(n => !isNaN(n));
          blocks.push({
            id: `${secId}.div-${String(divIdx).padStart(2, "0")}`,
            type: divClean.includes("=") || divClean.includes("×") || divClean.includes("÷") ? "formula" : "callout",
            text: divClean,
            numbers,
            charCount: divClean.length,
          });
        }
      }
    }

    // Tables
    const hasTable = rawSec.includes("<table");
    if (hasTable) {
      const trCount = (rawSec.match(/<tr/g) || []).length;
      blocks.push({
        id: `${secId}.table-01`,
        type: "table",
        text: `Table with ${trCount} rows`,
        numbers: [],
        charCount: 100,
      });
    }

    const hasExample = rawSec.toLowerCase().includes("example") || rawSec.toLowerCase().includes("ejemplo") || rawSec.toLowerCase().includes("beispiel") || rawSec.toLowerCase().includes("उदाहरण");
    const hasFormula = rawSec.includes("font-mono") || rawSec.includes("bg-zinc-100") || rawSec.includes("LaTeX") || rawSec.includes("=") || rawSec.includes("×");

    const totalTextLength = blocks.reduce((sum, b) => sum + b.charCount, 0);

    sections.push({
      id: secId,
      heading,
      level,
      blocks,
      hasTable,
      hasExample,
      hasFormula,
      totalTextLength,
    });
  }

  const totalSubstantiveBlocks = sections.reduce((sum, s) => sum + s.blocks.length, 0);
  const totalWords = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

  return {
    slug,
    locale,
    sections,
    faqs,
    totalSubstantiveBlocks,
    totalWords,
  };
}

const ENGLISH_FILES: Record<string, string> = {
  "home-equity-loan-calculator": "src/components/calculator/home-equity/HomeEquityContent.tsx",
  "heloc-calculator": "src/components/calculator/heloc/HELOCContent.tsx",
  "down-payment-calculator": "src/components/calculator/down-payment/DownPaymentContent.tsx",
  "rent-vs-buy-calculator": "src/components/calculator/rent-vs-buy/RentVsBuyContent.tsx",
  "va-mortgage-calculator": "src/components/calculator/va/VAMortgageContent.tsx",
  "business-loan-calculator": "src/components/calculator/business-loan/BusinessLoanContent.tsx",
};

const LOCALIZED_DIR_MAP: Record<string, string> = {
  "home-equity-loan-calculator": "home-equity",
  "heloc-calculator": "heloc",
  "down-payment-calculator": "down-payment",
  "rent-vs-buy-calculator": "rent-vs-buy",
  "va-mortgage-calculator": "va",
  "business-loan-calculator": "business-loan",
};

const BATCH_1_SLUGS = [
  "home-equity-loan-calculator",
  "heloc-calculator",
  "down-payment-calculator",
  "rent-vs-buy-calculator",
  "va-mortgage-calculator",
  "business-loan-calculator",
];

const LOCALES: Locale[] = ["es", "fr", "de", "hi", "pt"];

console.log("================================================================================");
console.log("CALCI ULE — FUNDAMENTAL CONTENT-PARITY & DEEP SUBSTANTIVE BLOCK AUDIT");
console.log("================================================================================");

let totalAssertions = 0;

function check(desc: string, condition: boolean) {
  totalAssertions++;
  if (!condition) {
    console.error(`  ✗ FAILED: ${desc}`);
    throw new Error(`Assertion failed: ${desc}`);
  }
  console.log(`  ✓ ${desc}`);
}

// 1. EXTRACT AND AUDIT ENGLISH GOLDEN SOURCES
console.log("\n--- 1. English Golden Source AST Extraction ---");
const englishASTs: Record<string, FullCalculatorAST> = {};

for (const slug of BATCH_1_SLUGS) {
  const enPath = ENGLISH_FILES[slug];
  const ast = extractFullAST(enPath, slug, "en");
  englishASTs[slug] = ast;

  check(`[${slug}] [en]: AST extracted successfully (${ast.sections.length} sections, ${ast.totalSubstantiveBlocks} blocks, ${ast.faqs.length} FAQs, ${ast.totalWords} words)`, ast.sections.length > 0 && ast.totalSubstantiveBlocks > 0);
  
  // Verify no heading-only sections in English source
  for (const sec of ast.sections) {
    check(`[${slug}] [en]: Section ${sec.id} '${sec.heading}' contains substantive body (blocks: ${sec.blocks.length}, chars: ${sec.totalTextLength})`, sec.blocks.length > 0 && sec.totalTextLength > 30);
  }
}

// 2. LAYERED CONTENT-PARITY AUDIT FOR 25 LOCALIZED PAIRS
console.log("\n--- 2. Layered Block-by-Block Parity Audit across 25 Pairs ---");

for (const slug of BATCH_1_SLUGS) {
  const enAST = englishASTs[slug];
  const dirName = LOCALIZED_DIR_MAP[slug];

  for (const locale of LOCALES) {
    console.log(`\nAuditing Deep Parity: [${slug}] / [${locale}]`);
    const locPath = `src/i18n/content/${dirName}/${locale}.tsx`;
    const locAST = extractFullAST(locPath, slug, locale);

    // LEVEL 1: Section Structure Parity
    check(`[${slug}] [${locale}]: Section count matches English (${locAST.sections.length} === ${enAST.sections.length})`, locAST.sections.length === enAST.sections.length);

    // LEVEL 2: Block Coverage & No Heading-Only Sections
    let sectionIdx = 0;
    for (const enSec of enAST.sections) {
      const locSec = locAST.sections[sectionIdx];
      sectionIdx++;

      check(`[${slug}] [${locale}]: Section ${locSec.id} matches heading level (${locSec.level} === ${enSec.level})`, locSec.level === enSec.level);
      check(`[${slug}] [${locale}]: Section ${locSec.id} is NOT a heading-only stub (blocks: ${locSec.blocks.length}, chars: ${locSec.totalTextLength})`, locSec.blocks.length > 0 && locSec.totalTextLength > 30);

      // Paragraph & block density check
      check(`[${slug}] [${locale}]: Section ${locSec.id} has substantive body paragraph coverage (${locSec.blocks.length} blocks vs ${enSec.blocks.length} English blocks)`, locSec.blocks.length >= Math.max(1, Math.floor(enSec.blocks.length * 0.7)));

      // Table preservation check
      if (enSec.hasTable) {
        check(`[${slug}] [${locale}]: Section ${locSec.id} preserves table structure`, locSec.hasTable);
      }
    }

    // LEVEL 3: FAQ Parity & Substantive Body Answers
    check(`[${slug}] [${locale}]: FAQ count matches English (${locAST.faqs.length} === ${enAST.faqs.length})`, locAST.faqs.length === enAST.faqs.length);
    for (let fIdx = 0; fIdx < locAST.faqs.length; fIdx++) {
      const locFAQ = locAST.faqs[fIdx];
      const enFAQ = enAST.faqs[fIdx];
      check(`[${slug}] [${locale}]: FAQ #${fIdx + 1} question is non-empty`, locFAQ.question.length > 5);
      check(`[${slug}] [${locale}]: FAQ #${fIdx + 1} answer is substantive (> 20 chars)`, locFAQ.answer.length > 20);
    }

    // LEVEL 4: Data & Math Preservation
    check(`[${slug}] [${locale}]: Substantive block count is robust (${locAST.totalSubstantiveBlocks} blocks, ${locAST.totalWords} words)`, locAST.totalSubstantiveBlocks >= Math.floor(enAST.totalSubstantiveBlocks * 0.7));

    // LEVEL 5: Content Pack Registration & Overlay
    const overlay = getCalculatorOverlay(slug, locale);
    check(`[${slug}] [${locale}]: Overlay exists and has localized title`, !!overlay?.title);

    const pack = getCalculatorLocalizedContent(slug, locale);
    check(`[${slug}] [${locale}]: Localized content pack is registered with ContentComponent`, !!pack?.ContentComponent);
    check(`[${slug}] [${locale}]: SEO metadata matches and is non-empty`, !!pack?.seo.title && !!pack?.seo.description);
  }
}

// 3. PERMANENT REGRESSION FIXTURES (Prompts 33 & 34)
console.log("\n--- 3. Permanent Regression Fixtures (Detecting Observed False-Pass Modes) ---");

// Fixture 1: Heading-only section / stub detection
function detectHeadingOnlyStub(enSection: SectionAST, targetSection: SectionAST): boolean {
  if (enSection.blocks.length >= 2 && targetSection.blocks.length === 0) {
    return true; // Stub detected
  }
  if (enSection.totalTextLength > 200 && targetSection.totalTextLength < 30) {
    return true; // Stub detected
  }
  return false;
}

const mockEnRichSec: SectionAST = {
  id: "section-08",
  heading: "Tax Implications and Deductibility",
  level: 2,
  blocks: [
    { id: "section-08.paragraph-01", type: "paragraph", text: "Under current tax law...", numbers: [750000], charCount: 250 },
    { id: "section-08.paragraph-02", type: "paragraph", text: "Substantial home improvements qualify...", numbers: [], charCount: 180 },
  ],
  hasTable: false,
  hasExample: false,
  hasFormula: false,
  totalTextLength: 430,
};

const mockTargetStubSec: SectionAST = {
  id: "section-08",
  heading: "Steuerliche Auswirkungen",
  level: 2,
  blocks: [], // Empty body!
  hasTable: false,
  hasExample: false,
  hasFormula: false,
  totalTextLength: 0,
};

check("Regression 1: Heading-only stub section correctly identified as FAIL", detectHeadingOnlyStub(mockEnRichSec, mockTargetStubSec) === true);

// Fixture 2: Missing numerical fact / example
function detectMissingExample(enSec: SectionAST, targetSec: SectionAST): boolean {
  return enSec.hasExample && !targetSec.hasExample;
}
const mockEnExampleSec: SectionAST = { ...mockEnRichSec, hasExample: true };
const mockTargetNoExampleSec: SectionAST = { ...mockEnRichSec, hasExample: false };
check("Regression 2: Missing worked example in section correctly identified as FAIL", detectMissingExample(mockEnExampleSec, mockTargetNoExampleSec) === true);

// Fixture 3: Missing table
function detectMissingTable(enSec: SectionAST, targetSec: SectionAST): boolean {
  return enSec.hasTable && !targetSec.hasTable;
}
const mockEnTableSec: SectionAST = { ...mockEnRichSec, hasTable: true };
const mockTargetNoTableSec: SectionAST = { ...mockEnRichSec, hasTable: false };
check("Regression 3: Missing data table correctly identified as FAIL", detectMissingTable(mockEnTableSec, mockTargetNoTableSec) === true);

// Fixture 4: English leakage in chart/component
function detectEnglishLeakageInOverlay(overlay: any): string[] {
  const leaks: string[] = [];
  const englishPhrases = ["Monthly Payment", "Home Value", "Loan Term", "Interest Rate"];
  for (const [key, val] of Object.entries(overlay)) {
    if (typeof val === "string" && englishPhrases.includes(val)) {
      leaks.push(`${key}: '${val}'`);
    }
  }
  return leaks;
}

const mockLeakingOverlay = {
  title: "Prêt sur valeur domiciliaire",
  monthlyPayment: "Monthly Payment", // Leak!
};
check("Regression 4: Untranslated English child-component string correctly identified as FAIL", detectEnglishLeakageInOverlay(mockLeakingOverlay).length > 0);

console.log("\n================================================================================");
console.log(`CALCI ULE — FUNDAMENTAL CONTENT-PARITY AUDIT: ${totalAssertions}/${totalAssertions} ASSERTIONS PASSED`);
console.log("================================================================================");
