import fs from "fs";
import path from "path";

// Extract content blocks (headings, paragraphs, lists, tables, callouts, formulas, examples, faqs)
export interface ContentBlock {
  id: string; // e.g., "section-08.paragraph-01"
  type: "heading" | "paragraph" | "list_item" | "table" | "formula" | "example" | "callout" | "faq_question" | "faq_answer";
  text: string;
  numbers?: number[];
  variables?: string[];
  tableDimensions?: { rows: number; cols: number };
}

export interface SectionNode {
  id: string;
  heading: string;
  level: 2 | 3 | 4;
  blocks: ContentBlock[];
}

export interface CalculatorContentAST {
  calculatorSlug: string;
  locale: string;
  sections: SectionNode[];
  tables: ContentBlock[];
  formulas: ContentBlock[];
  examples: ContentBlock[];
  faqs: { question: string; answer: string }[];
  totalBlocks: number;
  totalWords: number;
}

// Extract AST from TSX file
export function extractASTFromTSX(filePath: string, slug: string, locale: string): CalculatorContentAST {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const content = fs.readFileSync(filePath, "utf-8");

  const sections: SectionNode[] = [];
  const tables: ContentBlock[] = [];
  const formulas: ContentBlock[] = [];
  const examples: ContentBlock[] = [];
  const faqs: { question: string; answer: string }[] = [];

  // Parse FAQs if present in file
  const faqRegex = /{\s*["']?question["']?\s*:\s*["'`](.*?)["'`]\s*,\s*["']?answer["']?\s*:\s*["'`](.*?)["'`]\s*}/gs;
  let faqMatch;
  while ((faqMatch = faqRegex.exec(content)) !== null) {
    faqs.push({
      question: faqMatch[1],
      answer: faqMatch[2],
    });
  }

  // Parse headings, paragraphs, tables, lists
  // Split into lines/tags or use regex scanning
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gs;
  const h3Regex = /<h3[^>]*>(.*?)<\/h3>/gs;
  const pRegex = /<p[^>]*>(.*?)<\/p>/gs;
  const liRegex = /<li[^>]*>(.*?)<\/li>/gs;
  const tableRegex = /<table[^>]*>(.*?)<\/table>/gs;

  // Let's also do a section-by-section extraction
  const sectionSplit = content.split(/<section[^>]*>/);
  let secIdx = 0;

  for (const rawSec of sectionSplit.slice(1)) {
    secIdx++;
    const secId = `section-${String(secIdx).padStart(2, "0")}`;
    
    // find heading
    const h2M = rawSec.match(/<h2[^>]*>(.*?)<\/h2>/);
    const h3M = rawSec.match(/<h3[^>]*>(.*?)<\/h3>/);
    const heading = (h2M ? h2M[1] : h3M ? h3M[1] : `Section ${secIdx}`).replace(/<[^>]+>/g, "").trim();
    const level: 2 | 3 = h2M ? 2 : 3;

    const blocks: ContentBlock[] = [];
    let pIdx = 0;
    let pM;
    const pLocalRegex = /<p[^>]*>(.*?)<\/p>/gs;
    while ((pM = pLocalRegex.exec(rawSec)) !== null) {
      pIdx++;
      const pText = pM[1].replace(/<[^>]+>/g, "").trim();
      if (pText.length > 0) {
        // extract numbers
        const numbers = (pText.match(/\d+(?:[.,]\d+)?%?/g) || []).map(n => parseFloat(n.replace(/[%$,]/g, ""))).filter(n => !isNaN(n));
        blocks.push({
          id: `${secId}.paragraph-${String(pIdx).padStart(2, "0")}`,
          type: "paragraph",
          text: pText,
          numbers
        });
      }
    }

    let liIdx = 0;
    let liM;
    const liLocalRegex = /<li[^>]*>(.*?)<\/li>/gs;
    while ((liM = liLocalRegex.exec(rawSec)) !== null) {
      liIdx++;
      const liText = liM[1].replace(/<[^>]+>/g, "").trim();
      if (liText.length > 0) {
        blocks.push({
          id: `${secId}.list_item-${String(liIdx).padStart(2, "0")}`,
          type: "list_item",
          text: liText
        });
      }
    }

    // Check table
    if (rawSec.includes("<table")) {
      const rows = (rawSec.match(/<tr/g) || []).length;
      const cols = (rawSec.match(/<th/g) || []).length || (rawSec.match(/<td/g) || []).length / (rows || 1);
      const tableBlock: ContentBlock = {
        id: `${secId}.table-01`,
        type: "table",
        text: "Data Table",
        tableDimensions: { rows, cols: Math.round(cols) }
      };
      blocks.push(tableBlock);
      tables.push(tableBlock);
    }

    sections.push({
      id: secId,
      heading,
      level,
      blocks
    });
  }

  const totalBlocks = sections.reduce((sum, s) => sum + s.blocks.length, 0);
  const totalWords = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

  return {
    calculatorSlug: slug,
    locale,
    sections,
    tables,
    formulas,
    examples,
    faqs,
    totalBlocks,
    totalWords
  };
}
