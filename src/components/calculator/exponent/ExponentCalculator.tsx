"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Copy,
  Check,
  Sparkles,
  HelpCircle,
  Layers,
  ArrowRight,
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Share2,
  RotateCcw,
  FileSpreadsheet,
  Printer
} from "lucide-react";
import { ExponentReportModal } from "./ExponentReportModal";

export interface SavedExponentItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

type SolveTarget = "result" | "base" | "exponent";
type OperationType =
  | "product"
  | "quotient"
  | "power"
  | "product_power"
  | "quotient_power"
  | "zero"
  | "negative"
  | "fractional";

// Unicode superscript mapper for clean radical and exponent typography
const superscriptMap: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "-": "⁻",
  "+": "⁺"
};

export const toSuperscript = (num: number | string): string => {
  return String(num)
    .split("")
    .map((c) => superscriptMap[c] || c)
    .join("");
};

export function ExponentCalculator() {
  // Card 1: General Power Solver State
  const [solveTarget, setSolveTarget] = useState<SolveTarget>("result");
  const [baseVal, setBaseVal] = useState<string>("2");
  const [expVal, setExpVal] = useState<string>("10");
  const [targetYVal, setTargetYVal] = useState<string>("1024");
  const [useParentheses, setUseParentheses] = useState<boolean>(true);

  // Card 2: Fractional & Radical Converter State
  const [fracBase, setFracBase] = useState<string>("27");
  const [fracNum, setFracNum] = useState<string>("2");
  const [fracDen, setFracDen] = useState<string>("3");

  // Card 3: Exponent Operations State (All 8 Fundamental Laws)
  const [opType, setOpType] = useState<OperationType>("product");
  const [opA, setOpA] = useState<string>("2");
  const [opB, setOpB] = useState<string>("3");
  const [opM, setOpM] = useState<string>("3");
  const [opN, setOpN] = useState<string>("4");

  // Card 4: Scientific & Engineering State
  const [sciBase, setSciBase] = useState<string>("5.4");
  const [sciExp, setSciExp] = useState<string>("6");

  // Master Toolbar & UI State
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // Saved calculations states for 4 independent cards
  const [savedPowerItems, setSavedPowerItems] = useState<SavedExponentItem[]>([]);
  const [justSavedPower, setJustSavedPower] = useState<boolean>(false);

  const [savedFracItems, setSavedFracItems] = useState<SavedExponentItem[]>([]);
  const [justSavedFrac, setJustSavedFrac] = useState<boolean>(false);

  const [savedOpItems, setSavedOpItems] = useState<SavedExponentItem[]>([]);
  const [justSavedOp, setJustSavedOp] = useState<boolean>(false);

  const [savedSciItems, setSavedSciItems] = useState<SavedExponentItem[]>([]);
  const [justSavedSci, setJustSavedSci] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Restore saved calculations and parse shared URL search params on mount
  useEffect(() => {
    try {
      const storedPower = localStorage.getItem("saved_exponent_power");
      if (storedPower) setSavedPowerItems(JSON.parse(storedPower));

      const storedFrac = localStorage.getItem("saved_exponent_fractional");
      if (storedFrac) setSavedFracItems(JSON.parse(storedFrac));

      const storedOp = localStorage.getItem("saved_exponent_operations");
      if (storedOp) setSavedOpItems(JSON.parse(storedOp));

      const storedSci = localStorage.getItem("saved_exponent_scientific");
      if (storedSci) setSavedSciItems(JSON.parse(storedSci));

      // URL search params sync
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const urlBase = params.get("base");
        const urlExp = params.get("exp");
        const urlTarget = params.get("target") as SolveTarget;
        const urlFracBase = params.get("fbase");
        const urlP = params.get("p");
        const urlQ = params.get("q");

        if (urlBase !== null) setBaseVal(urlBase);
        if (urlExp !== null) setExpVal(urlExp);
        if (urlTarget && ["result", "base", "exponent"].includes(urlTarget)) setSolveTarget(urlTarget);
        if (urlFracBase !== null) setFracBase(urlFracBase);
        if (urlP !== null) setFracNum(urlP);
        if (urlQ !== null) setFracDen(urlQ);
      }
    } catch (e) {}
  }, []);

  // --- CARD 1 COMPUTATION: General Power Solver ---
  const generalResult = useMemo(() => {
    const b = parseFloat(baseVal);
    const n = parseFloat(expVal);
    const y = parseFloat(targetYVal);

    if (solveTarget === "result") {
      if (isNaN(b) || isNaN(n)) return { error: "Please enter valid numeric inputs." };

      let evaluated: number = 0;
      let isComplex = false;
      let complexStr = "";

      if (b === 0) {
        if (n > 0) {
          evaluated = 0;
        } else if (n < 0) {
          return { error: "0⁻ⁿ is undefined (division by zero: 1/0)." };
        } else {
          // 0^0 convention in algebra
          evaluated = 1;
        }
      } else if (b < 0) {
        if (!useParentheses) {
          // -b^n: unary negation takes precedence after exponentiation: -( |b|^n )
          evaluated = -Math.pow(Math.abs(b), n);
        } else if (Number.isInteger(n)) {
          evaluated = Math.pow(b, n);
        } else {
          // Non-integer exponent on negative base: produces complex number
          isComplex = true;
          const mag = Math.pow(Math.abs(b), n);
          const realPart = mag * Math.cos(n * Math.PI);
          const imagPart = mag * Math.sin(n * Math.PI);
          evaluated = realPart;
          complexStr = `${realPart.toFixed(4)} ${imagPart >= 0 ? "+" : "-"} ${Math.abs(imagPart).toFixed(4)}i`;
        }
      } else {
        evaluated = Math.pow(b, n);
      }

      const formatted = isComplex
        ? complexStr
        : Number.isInteger(evaluated) && Math.abs(evaluated) < 1e15
        ? evaluated.toString()
        : evaluated.toPrecision(8);

      const baseDisplay = b < 0 && useParentheses ? `(${b})` : b < 0 && !useParentheses ? `-${Math.abs(b)}` : b.toString();
      const latex = `${baseDisplay}^{${n}} = ${formatted}`;

      const stepLines = [
        `Base (b) = ${b}, Exponent (n) = ${n}`,
        b === 0 && n === 0
          ? `0⁰ is evaluated as 1 under standard combinatorial / algebraic empty product convention.`
          : b < 0 && !useParentheses
          ? `Unary Negation Precedence: -|b|ⁿ = -(${Math.abs(b)}^${n}) = ${formatted}`
          : n < 0
          ? `Negative exponent rule: b⁻ⁿ = 1 / bⁿ &rarr; 1 / (${b}^${Math.abs(n)}) = ${formatted}`
          : `Multiply base (${b}) by itself ${n} times.`,
        `Evaluated result: ${formatted}`
      ];

      return { evaluated, formatted, isComplex, latex, steps: stepLines, error: null };
    } else if (solveTarget === "base") {
      if (isNaN(n) || isNaN(y)) return { error: "Please enter valid Exponent (n) and Result (y)." };
      if (n === 0) return { error: "Exponent cannot be zero when solving for base." };

      if (y === 0) {
        if (n > 0) {
          return {
            evaluated: 0,
            formatted: "0",
            isComplex: false,
            latex: `b = \\sqrt[${n}]{0} = 0`,
            steps: [`Equation: b^${n} = 0`, `For any positive exponent, the only base is 0.`, `Solved Base (b): 0`],
            error: null
          };
        } else {
          return { error: "0 raised to a negative exponent is undefined." };
        }
      }

      if (y < 0) {
        // If n is an odd integer, real root exists: b = -|y|^(1/n)
        if (Number.isInteger(n) && Math.abs(n) % 2 === 1) {
          const bSol = -Math.pow(Math.abs(y), 1 / n);
          const formatted = Number.isInteger(bSol) ? bSol.toString() : bSol.toPrecision(8);
          const latex = `b = \\sqrt[${n}]{${y}} = ${formatted}`;
          const stepLines = [
            `Equation: b^${n} = ${y}`,
            `Since n = ${n} is an odd integer, the real ${n}-th root of ${y} is negative: b = -|${y}|^(1/${n})`,
            `Solved Base (b): ${formatted}`
          ];
          return { evaluated: bSol, formatted, isComplex: false, latex, steps: stepLines, error: null };
        } else {
          return { error: `Even power of a real base cannot produce a negative result (${y}).` };
        }
      }

      // Positive y:
      const bSol = Math.pow(y, 1 / n);
      const formatted = Number.isInteger(bSol) ? bSol.toString() : bSol.toPrecision(8);
      const latex = `b = \\sqrt[${n}]{${y}} = ${formatted}`;
      const stepLines = [
        `Equation: b^${n} = ${y}`,
        `Take the ${n}-th root of both sides: b = ${y}^(1/${n})`,
        Number.isInteger(n) && n % 2 === 0
          ? `Note: For even exponent n = ${n}, both +${formatted} and -${formatted} satisfy the equation. Principal real root: ${formatted}`
          : `Solved Base (b): ${formatted}`
      ];
      return { evaluated: bSol, formatted, isComplex: false, latex, steps: stepLines, error: null };
    } else {
      // solveTarget === "exponent": b^n = y
      if (isNaN(b) || isNaN(y)) return { error: "Please enter valid Base (b) and Result (y)." };

      if (b === 1) {
        if (y === 1) {
          return {
            evaluated: 0,
            formatted: "Infinitely many solutions",
            isComplex: false,
            latex: `1^n = 1 \\implies n \\in \\mathbb{R}`,
            steps: [
              `Equation: 1^n = 1`,
              `1 raised to any real power equals 1.`,
              `Infinitely many real solutions for n.`
            ],
            error: null
          };
        } else {
          return { error: "No solution: 1 raised to any power always equals 1, never " + y };
        }
      }

      if (b === 0) {
        if (y === 0) {
          return {
            evaluated: 1,
            formatted: "Satisfied for any n > 0",
            isComplex: false,
            latex: `0^n = 0 \\implies n > 0`,
            steps: [`Equation: 0^n = 0`, `0 raised to any positive exponent equals 0.`, `Satisfied for any n > 0.`],
            error: null
          };
        } else {
          return { error: "No solution: 0 raised to any power cannot equal " + y };
        }
      }

      if (b < 0) {
        // Test if an integer exponent solves it
        if (b === 0 || y === 0) return { error: "No valid logarithm for non-positive inputs." };
        const k = Math.log(Math.abs(y)) / Math.log(Math.abs(b));
        const roundedK = Math.round(k);
        if (Math.abs(k - roundedK) < 1e-9) {
          // Check parity
          const actualPower = Math.pow(b, roundedK);
          if (Math.abs(actualPower - y) < 1e-7) {
            const formatted = roundedK.toString();
            const latex = `(${b})^n = ${y} \\implies n = ${formatted}`;
            const stepLines = [
              `Equation: (${b})^n = ${y}`,
              `Test integer powers: (${b})^${formatted} = ${y}`,
              `Solved Exponent (n): ${formatted}`
            ];
            return { evaluated: roundedK, formatted, isComplex: false, latex, steps: stepLines, error: null };
          }
        }
        return { error: `No real exponent n satisfies (${b})^n = ${y}.` };
      }

      if (y <= 0) return { error: "Result (y) must be positive when base (b) is positive." };

      const nSol = Math.log(y) / Math.log(b);
      const formatted = Number.isInteger(nSol) ? nSol.toString() : nSol.toPrecision(8);
      const latex = `n = \\log_{${b}}(${y}) = \\frac{\\ln(${y})}{\\ln(${b})} = ${formatted}`;
      const stepLines = [
        `Equation: ${b}^n = ${y}`,
        `Apply natural logarithm to both sides: ln(${b}^n) = ln(${y})`,
        `Power rule of logarithms: n × ln(${b}) = ln(${y}) &rarr; n = ln(${y}) / ln(${b})`,
        `Solved Exponent (n): ${formatted}`
      ];
      return { evaluated: nSol, formatted, isComplex: false, latex, steps: stepLines, error: null };
    }
  }, [solveTarget, baseVal, expVal, targetYVal, useParentheses]);

  // --- CARD 2 COMPUTATION: Fractional & Radical Exponents ---
  const fractionalResult = useMemo(() => {
    const b = parseFloat(fracBase);
    const p = parseFloat(fracNum);
    const q = parseFloat(fracDen);

    if (isNaN(b) || isNaN(p) || isNaN(q)) return { error: "Please enter valid numeric inputs." };
    if (q === 0) return { error: "Denominator (root index q) cannot be zero." };

    const decExp = p / q;
    let evaluated: number = 0;
    let isComplex = false;

    if (b < 0) {
      // Check if denominator q is odd (when fraction is simplified)
      const gcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : gcd(y, x % y));
      const g = gcd(Math.round(p), Math.round(q)) || 1;
      const simpQ = Math.round(q) / g;
      const simpP = Math.round(p) / g;

      if (Math.abs(simpQ) % 2 === 1) {
        // Odd root of negative base is real
        const mag = Math.pow(Math.abs(b), decExp);
        evaluated = simpP % 2 === 0 ? mag : -mag;
      } else {
        // Even root of negative base is not real
        isComplex = true;
        const mag = Math.pow(Math.abs(b), decExp);
        evaluated = mag;
      }
    } else {
      evaluated = Math.pow(b, decExp);
    }

    const formatted = isComplex
      ? `Non-real complex root (even root of negative base)`
      : Number.isInteger(evaluated) && Math.abs(evaluated) < 1e15
      ? evaluated.toString()
      : evaluated.toPrecision(8);

    // Clean mathematical radical notation using Unicode superscripts (NO raw <sup> tags!)
    const rootIndexStr = q > 1 ? toSuperscript(Math.round(q)) : "";
    const powerExpStr = p !== 1 ? toSuperscript(Math.round(p)) : "";
    const baseStr = b < 0 ? `(${b})` : `${b}`;
    const radicalNotation = `${rootIndexStr}√(${baseStr}${powerExpStr})`;
    const latex = `${baseStr}^{\\frac{${p}}{${q}}} = \\sqrt[${q}]{${baseStr}^{${p}}} = ${isComplex ? "i" : formatted}`;

    const stepLines = [
      `Fractional Exponent Definition: b^(p/q) = ⁿ√(bᵖ) = (ⁿ√b)ᵖ where root index = ${q}, power = ${p}`,
      `Convert fraction ${p}/${q} to decimal power: ${decExp.toFixed(6)}`,
      b < 0 && Math.abs(Math.round(q)) % 2 === 1
        ? `Odd root of negative base: ${q}-th root of negative number yields real value.`
        : b < 0
        ? `Even root of negative base: ${q}-th root of negative number yields no real solution.`
        : `Evaluate intermediate power: ${baseStr}^${p} = ${b < 0 && p % 2 !== 0 ? -Math.pow(Math.abs(b), p) : Math.pow(Math.abs(b), p)}`,
      `Final extracted value: ${radicalNotation} = ${formatted}`
    ];

    return { evaluated, formatted, decExp: decExp.toFixed(4), radicalNotation, latex, steps: stepLines, isComplex, error: null };
  }, [fracBase, fracNum, fracDen]);

  // --- CARD 3 COMPUTATION: Exponent Laws & Operations (All 8 Fundamental Laws) ---
  const operationsResult = useMemo(() => {
    const a = parseFloat(opA);
    const b = parseFloat(opB);
    const m = parseFloat(opM);
    const n = parseFloat(opN);

    if (isNaN(a)) return { error: "Please enter a valid base (a)." };

    if (opType === "product") {
      if (isNaN(m) || isNaN(n)) return { error: "Please enter exponents m and n." };
      const sumExp = m + n;
      const res = Math.pow(a, sumExp);
      return {
        latex: `${a}^{${m}} \\cdot ${a}^{${n}} = ${a}^{${m} + ${n}} = ${a}^{${sumExp}} = ${res}`,
        formulaName: "Product of Powers Rule",
        rule: `aᵐ · aⁿ = aᵐ⁺ⁿ`,
        res,
        steps: [
          `Rule: Keep the same base (${a}) and add exponents (${m} + ${n}).`,
          `Sum Exponent: ${m} + ${n} = ${sumExp}`,
          `Evaluated Power: ${a}^${sumExp} = ${res}`
        ],
        error: null
      };
    } else if (opType === "quotient") {
      if (isNaN(m) || isNaN(n)) return { error: "Please enter exponents m and n." };
      if (a === 0) return { error: "Base a cannot be zero in quotient denominator." };
      const diffExp = m - n;
      const res = Math.pow(a, diffExp);
      return {
        latex: `\\frac{${a}^{${m}}}{${a}^{${n}}} = ${a}^{${m} - ${n}} = ${a}^{${diffExp}} = ${res}`,
        formulaName: "Quotient of Powers Rule",
        rule: `aᵐ / aⁿ = aᵐ⁻ⁿ (a ≠ 0)`,
        res,
        steps: [
          `Rule: Keep the same base (${a}) and subtract exponents (${m} - ${n}).`,
          `Difference Exponent: ${m} - ${n} = ${diffExp}`,
          `Evaluated Power: ${a}^${diffExp} = ${res}`
        ],
        error: null
      };
    } else if (opType === "power") {
      if (isNaN(m) || isNaN(n)) return { error: "Please enter exponents m and n." };
      const prodExp = m * n;
      const res = Math.pow(a, prodExp);
      return {
        latex: `(${a}^{${m}})^{${n}} = ${a}^{${m} \\cdot ${n}} = ${a}^{${prodExp}} = ${res}`,
        formulaName: "Power of a Power Rule",
        rule: `(aᵐ)ⁿ = aᵐ·ⁿ`,
        res,
        steps: [
          `Rule: Keep the base (${a}) and multiply exponents (${m} × ${n}).`,
          `Product Exponent: ${m} × ${n} = ${prodExp}`,
          `Evaluated Power: ${a}^${prodExp} = ${res}`
        ],
        error: null
      };
    } else if (opType === "product_power") {
      if (isNaN(b) || isNaN(n)) return { error: "Please enter second base (b) and exponent (n)." };
      const aN = Math.pow(a, n);
      const bN = Math.pow(b, n);
      const res = aN * bN;
      return {
        latex: `(${a} \\cdot ${b})^{${n}} = ${a}^{${n}} \\cdot ${b}^{${n}} = ${aN} \\cdot ${bN} = ${res}`,
        formulaName: "Power of a Product Rule",
        rule: `(a · b)ⁿ = aⁿ · bⁿ`,
        res,
        steps: [
          `Rule: Distribute exponent (${n}) to both bases (${a} and ${b}).`,
          `Term 1: ${a}^${n} = ${aN}`,
          `Term 2: ${b}^${n} = ${bN}`,
          `Product: ${aN} × ${bN} = ${res}`
        ],
        error: null
      };
    } else if (opType === "quotient_power") {
      if (isNaN(b) || isNaN(n)) return { error: "Please enter second base (b) and exponent (n)." };
      if (b === 0) return { error: "Denominator base b cannot be zero." };
      const aN = Math.pow(a, n);
      const bN = Math.pow(b, n);
      const res = aN / bN;
      return {
        latex: `\\left(\\frac{${a}}{${b}}\\right)^{${n}} = \\frac{${a}^{${n}}}{${b}^{${n}}} = \\frac{${aN}}{${bN}} = ${res}`,
        formulaName: "Power of a Quotient Rule",
        rule: `(a/b)ⁿ = aⁿ / bⁿ (b ≠ 0)`,
        res,
        steps: [
          `Rule: Distribute exponent (${n}) to numerator (${a}) and denominator (${b}).`,
          `Numerator: ${a}^${n} = ${aN}`,
          `Denominator: ${b}^${n} = ${bN}`,
          `Quotient: ${aN} / ${bN} = ${res}`
        ],
        error: null
      };
    } else if (opType === "zero") {
      if (a === 0) return { error: "0⁰ is an indeterminate form in calculus (evaluated as 1 in discrete algebra)." };
      return {
        latex: `${a}^0 = 1`,
        formulaName: "Zero Exponent Rule",
        rule: `a⁰ = 1 (a ≠ 0)`,
        res: 1,
        steps: [
          `Rule: Any non-zero number raised to the zero power equals 1.`,
          `Proof by Quotient Rule: ${a}^1 / ${a}^1 = ${a}^(1-1) = ${a}^0 = 1`,
          `Evaluated Result: 1`
        ],
        error: null
      };
    } else if (opType === "negative") {
      if (isNaN(n)) return { error: "Please enter exponent (n)." };
      if (a === 0) return { error: "0 raised to a negative power is division by zero (undefined)." };
      const res = Math.pow(a, -n);
      return {
        latex: `${a}^{-${n}} = \\frac{1}{${a}^{${n}}} = ${res}`,
        formulaName: "Negative Exponent Rule",
        rule: `a⁻ⁿ = 1 / aⁿ (a ≠ 0)`,
        res,
        steps: [
          `Rule: A negative exponent represents the reciprocal of the base raised to the positive power.`,
          `Reciprocal transformation: 1 / (${a}^${n})`,
          `Denominator evaluated: ${a}^${n} = ${Math.pow(a, n)}`,
          `Evaluated Result: 1 / ${Math.pow(a, n)} = ${res}`
        ],
        error: null
      };
    } else {
      // opType === "fractional"
      if (isNaN(m) || isNaN(n)) return { error: "Please enter numerator (m) and root denominator (n)." };
      if (n === 0) return { error: "Root denominator (n) cannot be zero." };
      const decExp = m / n;
      const res = Math.pow(a, decExp);
      return {
        latex: `${a}^{\\frac{${m}}{${n}}} = \\sqrt[${n}]{${a}^{${m}}} = ${res}`,
        formulaName: "Fractional / Rational Exponent Rule",
        rule: `aᵐ/ⁿ = ⁿ√(aᵐ)`,
        res,
        steps: [
          `Rule: In a fractional exponent m/n, denominator n is the root index and numerator m is the power.`,
          `Decimal exponent: ${m} / ${n} = ${decExp.toFixed(6)}`,
          `Root notation: ${n > 1 ? toSuperscript(Math.round(n)) : ""}√(${a}${m !== 1 ? toSuperscript(Math.round(m)) : ""})`,
          `Evaluated Result: ${res}`
        ],
        error: null
      };
    }
  }, [opType, opA, opB, opM, opN]);

  // --- CARD 4 COMPUTATION: Scientific & Engineering ---
  const sciResult = useMemo(() => {
    const b = parseFloat(sciBase);
    const n = parseFloat(sciExp);

    if (isNaN(b) || isNaN(n)) return { error: "Please enter valid numbers." };

    const evaluated = b * Math.pow(10, n);
    const scientific = `${b} × 10^${n}`;
    const eNotation = `${b}e${n >= 0 ? "+" : ""}${n}`;

    const engExp = Math.floor(n / 3) * 3;
    const engRem = n - engExp;
    const engMantissa = b * Math.pow(10, engRem);
    const engineering = `${engMantissa} × 10^${engExp}`;

    return {
      evaluated,
      decimal: evaluated.toLocaleString("en-US", { maximumFractionDigits: 10 }),
      scientific,
      engineering,
      eNotation,
      latex: `${b} \\times 10^{${n}} = ${evaluated}`,
      steps: [
        `Expression: ${b} × 10^${n}`,
        `Shift decimal point ${n} places to the ${n >= 0 ? "right" : "left"}.`,
        `Decimal Output: ${evaluated}`,
        `Engineering Format: ${engineering}`
      ],
      error: null
    };
  }, [sciBase, sciExp]);

  // --- ACTIONS: COPY, SHARE, CSV, RESET, PRINT ---
  const handleCopyText = (text: string, key: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {}
  };

  const handleCopySummary = () => {
    const summary = [
      `=== EXPONENT CALCULATOR ANALYSIS ===`,
      `[1] General Power Solver (bⁿ = y):`,
      `    Target: ${solveTarget} | Base: ${baseVal} | Exponent: ${expVal}`,
      `    Result = ${generalResult.formatted} (LaTeX: ${generalResult.latex})`,
      ``,
      `[2] Fractional Exponents (bᵖ/ᑫ):`,
      `    Base: ${fracBase} | Fraction: ${fracNum}/${fracDen} (Decimal: ${fractionalResult.decExp})`,
      `    Radical Form = ${fractionalResult.radicalNotation} | Evaluated = ${fractionalResult.formatted}`,
      ``,
      `[3] Exponent Law (${operationsResult.formulaName}):`,
      `    Formula: ${operationsResult.rule}`,
      `    Evaluated Result = ${operationsResult.res}`,
      ``,
      `[4] Scientific Notation Converter:`,
      `    Input: ${sciBase} × 10^${sciExp} = ${sciResult.decimal}`,
      `    Scientific: ${sciResult.scientific} | Engineering: ${sciResult.engineering} | E-Notation: ${sciResult.eNotation}`,
      `Generated by CalcPlatform Exponent Calculator`
    ].join("\n");

    handleCopyText(summary, "summary");
  };

  const handleShareLink = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("base", baseVal);
      url.searchParams.set("exp", expVal);
      url.searchParams.set("target", solveTarget);
      url.searchParams.set("fbase", fracBase);
      url.searchParams.set("p", fracNum);
      url.searchParams.set("q", fracDen);
      navigator.clipboard.writeText(url.toString());
      setCopiedKey("share");
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {}
  };

  const handleExportCSV = () => {
    const rows = [
      ["Module", "Input 1", "Input 2", "Input 3", "Evaluated Result", "LaTeX Formula"],
      [
        "General Power Solver",
        `Base: ${baseVal}`,
        `Exponent: ${expVal}`,
        `Target: ${solveTarget}`,
        `"${generalResult.formatted}"`,
        `"${generalResult.latex}"`
      ],
      [
        "Fractional Exponents",
        `Base: ${fracBase}`,
        `Numerator: ${fracNum}`,
        `Denominator: ${fracDen}`,
        `"${fractionalResult.formatted}"`,
        `"${fractionalResult.latex}"`
      ],
      [
        `Exponent Law (${operationsResult.formulaName})`,
        `Base a: ${opA}`,
        `Exp m: ${opM}`,
        `Exp n: ${opN}`,
        `"${operationsResult.res}"`,
        `"${operationsResult.latex}"`
      ],
      [
        "Scientific Notation",
        `Mantissa: ${sciBase}`,
        `Power 10: ${sciExp}`,
        `Decimal: ${sciResult.decimal}`,
        `"${sciResult.scientific}"`,
        `"${sciResult.latex}"`
      ]
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `exponent_calculator_${baseVal}_pow_${expVal}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetDefaults = () => {
    setSolveTarget("result");
    setBaseVal("2");
    setExpVal("10");
    setTargetYVal("1024");
    setUseParentheses(true);

    setFracBase("27");
    setFracNum("2");
    setFracDen("3");

    setOpType("product");
    setOpA("2");
    setOpB("3");
    setOpM("3");
    setOpN("4");

    setSciBase("5.4");
    setSciExp("6");

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, "", url.toString());
    }
  };

  // --- SAVE HANDLERS ---
  const handleSavePower = () => {
    if (generalResult.error || !generalResult.formatted) return;

    const inputsStr = `Target: ${solveTarget}, Base: ${baseVal}, Exponent: ${expVal}`;
    const opStr = `Power Solver (${baseVal}^${expVal})`;
    const resList = [
      `Evaluated Power = ${generalResult.formatted}`,
      `LaTeX = ${generalResult.latex}`,
      generalResult.isComplex ? "Complex Number Output (i)" : "Real Number Output"
    ];

    const newItem: SavedExponentItem = {
      id: Date.now().toString(),
      title: "Power Solver Calculation",
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${baseVal}^${expVal}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedPowerItems.filter((item) => item.inputs !== inputsStr)].slice(0, 15);
    setSavedPowerItems(updated);
    try {
      localStorage.setItem("saved_exponent_power", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedPower(true);
    setTimeout(() => setJustSavedPower(false), 2000);
  };

  const handleSaveFrac = () => {
    if (fractionalResult.error || !fractionalResult.formatted) return;

    const inputsStr = `Base: ${fracBase}, Power: ${fracNum}, Root: ${fracDen}`;
    const opStr = `Fractional Exponent (${fracBase}^${fracNum}/${fracDen})`;
    const resList = [
      `Evaluated Value = ${fractionalResult.formatted}`,
      `Radical Form = ${fractionalResult.radicalNotation}`,
      `Decimal Power = ${fractionalResult.decExp}`
    ];

    const newItem: SavedExponentItem = {
      id: Date.now().toString(),
      title: "Fractional & Radical Exponent",
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${fracBase}^(${fracNum}/${fracDen})`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedFracItems.filter((item) => item.inputs !== inputsStr)].slice(0, 15);
    setSavedFracItems(updated);
    try {
      localStorage.setItem("saved_exponent_fractional", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedFrac(true);
    setTimeout(() => setJustSavedFrac(false), 2000);
  };

  const handleSaveOp = () => {
    if (operationsResult.error || operationsResult.res === undefined) return;

    const inputsStr = `Base a: ${opA}, Base b: ${opB}, Exp m: ${opM}, Exp n: ${opN}`;
    const opStr = `Applied Law: ${operationsResult.formulaName}`;
    const resList = [
      `Evaluated Result = ${operationsResult.res}`,
      `Rule Formula = ${operationsResult.rule}`,
      `LaTeX = ${operationsResult.latex}`
    ];

    const newItem: SavedExponentItem = {
      id: Date.now().toString(),
      title: "Exponent Law Operation",
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: operationsResult.formulaName,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedOpItems.filter((item) => item.inputs !== inputsStr || item.operation !== opStr)].slice(0, 15);
    setSavedOpItems(updated);
    try {
      localStorage.setItem("saved_exponent_operations", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedOp(true);
    setTimeout(() => setJustSavedOp(false), 2000);
  };

  const handleSaveSci = () => {
    if (sciResult.error || !sciResult.decimal) return;

    const inputsStr = `Mantissa (a): ${sciBase}, Power of 10 (k): ${sciExp}`;
    const opStr = `Scientific Notation (${sciBase} × 10^${sciExp})`;
    const resList = [
      `Decimal Value = ${sciResult.decimal}`,
      `Scientific Notation = ${sciResult.scientific}`,
      `Engineering Format = ${sciResult.engineering}`,
      `E-Notation = ${sciResult.eNotation}`
    ];

    const newItem: SavedExponentItem = {
      id: Date.now().toString(),
      title: "Scientific Notation Conversion",
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${sciBase} × 10^${sciExp}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedSciItems.filter((item) => item.inputs !== inputsStr)].slice(0, 15);
    setSavedSciItems(updated);
    try {
      localStorage.setItem("saved_exponent_scientific", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedSci(true);
    setTimeout(() => setJustSavedSci(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* MASTER ACTION TOOLBAR */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copiedKey === "summary" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === "summary" ? "Summary Copied!" : "Copy Summary"}</span>
          </button>

          <button
            type="button"
            onClick={() => handleCopyText(generalResult.latex || "", "latex_m")}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copiedKey === "latex_m" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
            <span>{copiedKey === "latex_m" ? "LaTeX Copied!" : "Copy LaTeX"}</span>
          </button>

          <button
            type="button"
            onClick={handleShareLink}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copiedKey === "share" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-blue-600" />}
            <span>{copiedKey === "share" ? "Link Copied!" : "Share Calculation"}</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 1: GENERAL POWER SOLVER (bⁿ = y) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>General Power Solver (bⁿ = y)</span>
          <button
            type="button"
            onClick={handleSavePower}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedPower ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT CONTROLS */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Power Solver Inputs
                </h2>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Select Target Variable to Solve
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                    <button
                      onClick={() => setSolveTarget("result")}
                      className={`py-1.5 rounded-lg cursor-pointer transition-all ${
                        solveTarget === "result" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs" : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      Result (y)
                    </button>
                    <button
                      onClick={() => setSolveTarget("base")}
                      className={`py-1.5 rounded-lg cursor-pointer transition-all ${
                        solveTarget === "base" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs" : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      Base (b)
                    </button>
                    <button
                      onClick={() => setSolveTarget("exponent")}
                      className={`py-1.5 rounded-lg cursor-pointer transition-all ${
                        solveTarget === "exponent" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs" : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      Exponent (n)
                    </button>
                  </div>
                </div>

                {/* DYNAMIC EQUATION PREVIEW */}
                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Visual Mathematical Expression
                  </span>
                  <div className="text-lg sm:text-xl font-bold font-sans tabular-nums text-blue-600 dark:text-blue-400">
                    {solveTarget === "result" ? (
                      <span>
                        {baseVal < "0" && useParentheses ? `(${baseVal})` : baseVal}
                        <sup>{expVal}</sup> = <span className="text-emerald-600">{generalResult.formatted || "?"}</span>
                      </span>
                    ) : solveTarget === "base" ? (
                      <span>
                        <span className="text-emerald-600 font-extrabold">{generalResult.formatted || "b"}</span>
                        <sup>{expVal}</sup> = {targetYVal}
                      </span>
                    ) : (
                      <span>
                        {baseVal}
                        <sup>
                          <span className="text-emerald-600 font-extrabold">{generalResult.formatted || "n"}</span>
                        </sup>{" "}
                        = {targetYVal}
                      </span>
                    )}
                  </div>
                </div>

                {/* CONDITIONAL INPUT FIELDS */}
                {solveTarget !== "base" && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Base (b)
                    </label>
                    <input
                      type="number"
                      value={baseVal}
                      onChange={(e) => setBaseVal(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>
                )}

                {solveTarget !== "exponent" && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Exponent / Power (n)
                    </label>
                    <input
                      type="number"
                      value={expVal}
                      onChange={(e) => setExpVal(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>
                )}

                {solveTarget !== "result" && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Evaluated Result (y)
                    </label>
                    <input
                      type="number"
                      value={targetYVal}
                      onChange={(e) => setTargetYVal(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>
                )}

                {/* PARENTHESES TOGGLE FOR NEGATIVE BASES */}
                {solveTarget === "result" && parseFloat(baseVal) < 0 && (
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">Enclose Negative Base in Parentheses</span>
                      <span className="text-[11px] text-slate-500">
                        {useParentheses ? `(-${Math.abs(parseFloat(baseVal))})ⁿ (Base is negative)` : `-${Math.abs(parseFloat(baseVal))}ⁿ (Negation after exponent)`}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUseParentheses(!useParentheses)}
                      className={`px-3 py-1 rounded-lg font-bold text-xs cursor-pointer transition-colors ${
                        useParentheses ? "bg-blue-600 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {useParentheses ? "(-b)ⁿ" : "-bⁿ"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: EVALUATED HERO & STEPS */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Evaluated Power Result
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyText(generalResult.latex || "", "latex_p")}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                    >
                      {copiedKey === "latex_p" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-blue-600" />}
                      <span>{copiedKey === "latex_p" ? "LaTeX Copied!" : "Copy LaTeX"}</span>
                    </button>
                  </div>

                  {generalResult.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">{generalResult.error}</div>
                  ) : (
                    <div className="space-y-1">
                      <div className="text-3xl sm:text-4xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                        {generalResult.formatted}
                      </div>
                      {generalResult.isComplex && (
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md inline-block">
                          Complex Number (Imaginary Unit i)
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* STEP-BY-STEP SOLUTION BREAKDOWN */}
                <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" /> Step-by-Step Solution Breakdown
                  </h4>
                  <div className="space-y-2 text-xs font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                    {generalResult.steps &&
                      generalResult.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                          <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">{idx + 1}.</span>
                          <span className="font-sans tabular-nums">{step}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED POWER CALCULATIONS INSIDE CARD 1 */}
          {savedPowerItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Power Calculations ({savedPowerItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedPowerItems([]);
                    try {
                      localStorage.removeItem("saved_exponent_power");
                    } catch (e) {}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedPowerItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedPowerItems.filter((i) => i.id !== item.id);
                            setSavedPowerItems(updated);
                            try {
                              localStorage.setItem("saved_exponent_power", JSON.stringify(updated));
                            } catch (e) {}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Operation: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Calculated Answers:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div
                                  key={idx}
                                  className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug"
                                >
                                  {resLine}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: FRACTIONAL & RADICAL EXPONENTS (bᵖ/ᑫ) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Fractional &amp; Radical Exponents (bᵖ/ᑫ)</span>
          <button
            type="button"
            onClick={handleSaveFrac}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedFrac ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Fractional Inputs
                </h2>

                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Radical Notation Format
                  </span>
                  <div className="text-lg sm:text-xl font-bold font-sans tabular-nums text-blue-600 dark:text-blue-400">
                    <span>
                      {fracBase}
                      <sup>{`${fracNum}/${fracDen}`}</sup> ={" "}
                      <span className="text-emerald-600">{fractionalResult.radicalNotation}</span>
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Base (b)
                  </label>
                  <input
                    type="number"
                    value={fracBase}
                    onChange={(e) => setFracBase(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Power Numerator (p)
                    </label>
                    <input
                      type="number"
                      value={fracNum}
                      onChange={(e) => setFracNum(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Root Denominator (q)
                    </label>
                    <input
                      type="number"
                      value={fracDen}
                      onChange={(e) => setFracDen(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Fractional Result
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyText(fractionalResult.latex || "", "latex_f")}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                    >
                      {copiedKey === "latex_f" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-blue-600" />}
                      <span>{copiedKey === "latex_f" ? "LaTeX Copied!" : "Copy LaTeX"}</span>
                    </button>
                  </div>

                  {fractionalResult.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">{fractionalResult.error}</div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-3xl sm:text-4xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                        {fractionalResult.formatted}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                        <span className="p-1 px-2 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded border border-blue-200 dark:border-blue-900/50">
                          Radical Form: {fractionalResult.radicalNotation}
                        </span>
                        <span className="p-1 px-2 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                          Decimal Power: {fractionalResult.decExp}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" /> Step-by-Step Educational Solution
                  </h4>
                  <div className="space-y-2 text-xs font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                    {fractionalResult.steps &&
                      fractionalResult.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                          <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">{idx + 1}.</span>
                          <span className="font-sans tabular-nums">{step}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED FRACTIONAL CALCULATIONS */}
          {savedFracItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Fractional Calculations ({savedFracItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedFracItems([]);
                    try {
                      localStorage.removeItem("saved_exponent_fractional");
                    } catch (e) {}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedFracItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedFracItems.filter((i) => i.id !== item.id);
                            setSavedFracItems(updated);
                            try {
                              localStorage.setItem("saved_exponent_fractional", JSON.stringify(updated));
                            } catch (e) {}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Operation: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div
                                  key={idx}
                                  className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug"
                                >
                                  {resLine}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: EXPONENT LAWS & OPERATIONS (ALL 8 FUNDAMENTAL LAWS) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Exponent Laws &amp; Operations</span>
          <button
            type="button"
            onClick={handleSaveOp}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedOp ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Operation Inputs
                </h2>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Select Exponent Law / Operation
                  </label>
                  <select
                    value={opType}
                    onChange={(e) => setOpType(e.target.value as OperationType)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="product">1. Product Rule: aᵐ · aⁿ = aᵐ⁺ⁿ</option>
                    <option value="quotient">2. Quotient Rule: aᵐ / aⁿ = aᵐ⁻ⁿ</option>
                    <option value="power">3. Power of a Power: (aᵐ)ⁿ = aᵐ·ⁿ</option>
                    <option value="product_power">4. Power of a Product: (a·b)ⁿ = aⁿ·bⁿ</option>
                    <option value="quotient_power">5. Power of a Quotient: (a/b)ⁿ = aⁿ/bⁿ</option>
                    <option value="zero">6. Zero Exponent Rule: a⁰ = 1</option>
                    <option value="negative">7. Negative Exponent Rule: a⁻ⁿ = 1/aⁿ</option>
                    <option value="fractional">8. Fractional Exponent Rule: aᵐ/ⁿ = ⁿ√(aᵐ)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Base (a)
                    </label>
                    <input
                      type="number"
                      value={opA}
                      onChange={(e) => setOpA(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>

                  {(opType === "product_power" || opType === "quotient_power") && (
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Second Base (b)
                      </label>
                      <input
                        type="number"
                        value={opB}
                        onChange={(e) => setOpB(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                      />
                    </div>
                  )}

                  {opType !== "zero" && (
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        {opType === "fractional" ? "Power Numerator (m)" : "First Exponent (m)"}
                      </label>
                      <input
                        type="number"
                        value={opM}
                        onChange={(e) => setOpM(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                      />
                    </div>
                  )}

                  {opType !== "zero" && (
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        {opType === "fractional"
                          ? "Root Index (n)"
                          : opType === "negative"
                          ? "Exponent Magnitude (n)"
                          : opType === "product" || opType === "quotient"
                          ? "Second Exponent (n)"
                          : "Outer Exponent (n)"}
                      </label>
                      <input
                        type="number"
                        value={opN}
                        onChange={(e) => setOpN(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Evaluated Operation Result
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyText(operationsResult.latex || "", "latex_o")}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                    >
                      {copiedKey === "latex_o" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-blue-600" />}
                      <span>{copiedKey === "latex_o" ? "LaTeX Copied!" : "Copy LaTeX"}</span>
                    </button>
                  </div>

                  {operationsResult.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">{operationsResult.error}</div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-2xl sm:text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                        {operationsResult.res}
                      </div>
                      <div className="text-xs font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 p-2.5 rounded-xl border border-blue-200 dark:border-blue-900/50">
                        Applied Law: {operationsResult.formulaName} ({operationsResult.rule})
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" /> Step-by-Step Educational Solution
                  </h4>
                  <div className="space-y-2 text-xs font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                    {operationsResult.steps &&
                      operationsResult.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                          <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">{idx + 1}.</span>
                          <span className="font-sans tabular-nums">{step}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED EXPONENT OPERATIONS INSIDE CARD 3 */}
          {savedOpItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Exponent Operations ({savedOpItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedOpItems([]);
                    try {
                      localStorage.removeItem("saved_exponent_operations");
                    } catch (e) {}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedOpItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedOpItems.filter((i) => i.id !== item.id);
                            setSavedOpItems(updated);
                            try {
                              localStorage.setItem("saved_exponent_operations", JSON.stringify(updated));
                            } catch (e) {}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Operation: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Operation Answers:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div
                                  key={idx}
                                  className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug"
                                >
                                  {resLine}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: SCIENTIFIC NOTATION & ENGINEERING CONVERTER (a × 10ᵏ) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Scientific Notation &amp; Engineering Converter (a × 10ᵏ)</span>
          <button
            type="button"
            onClick={handleSaveSci}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedSci ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Scientific Inputs
                </h2>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Mantissa / Coefficient (a)
                  </label>
                  <input
                    type="number"
                    value={sciBase}
                    onChange={(e) => setSciBase(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Power of 10 Exponent (k)
                  </label>
                  <input
                    type="number"
                    value={sciExp}
                    onChange={(e) => setSciExp(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Scientific Notation Outputs
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyText(sciResult.latex || "", "latex_s")}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                    >
                      {copiedKey === "latex_s" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-blue-600" />}
                      <span>{copiedKey === "latex_s" ? "LaTeX Copied!" : "Copy LaTeX"}</span>
                    </button>
                  </div>

                  {sciResult.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">{sciResult.error}</div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-2xl sm:text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                        {sciResult.decimal}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold">
                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">Scientific</span>
                          {sciResult.scientific}
                        </div>
                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">Engineering</span>
                          {sciResult.engineering}
                        </div>
                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl col-span-2 sm:col-span-1">
                          <span className="text-[10px] text-slate-400 block uppercase">E-Notation</span>
                          {sciResult.eNotation}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" /> Step-by-Step Educational Solution
                  </h4>
                  <div className="space-y-2 text-xs font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                    {sciResult.steps &&
                      sciResult.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                          <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">{idx + 1}.</span>
                          <span className="font-sans tabular-nums">{step}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED SCIENTIFIC CONVERSIONS INSIDE CARD 4 */}
          {savedSciItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Scientific Conversions ({savedSciItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedSciItems([]);
                    try {
                      localStorage.removeItem("saved_exponent_scientific");
                    } catch (e) {}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedSciItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedSciItems.filter((i) => i.id !== item.id);
                            setSavedSciItems(updated);
                            try {
                              localStorage.setItem("saved_exponent_scientific", JSON.stringify(updated));
                            } catch (e) {}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Conversion: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div
                                  key={idx}
                                  className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug"
                                >
                                  {resLine}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* EXECUTIVE PRINT REPORT MODAL */}
      <ExponentReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        solveTarget={solveTarget}
        baseVal={baseVal}
        expVal={expVal}
        targetYVal={targetYVal}
        generalResult={generalResult}
        fracBase={fracBase}
        fracNum={fracNum}
        fracDen={fracDen}
        fractionalResult={fractionalResult}
        opType={opType}
        opA={opA}
        opB={opB}
        opM={opM}
        opN={opN}
        operationsResult={operationsResult}
        sciBase={sciBase}
        sciExp={sciExp}
        sciResult={sciResult}
      />
    </div>
  );
}

export default ExponentCalculator;
