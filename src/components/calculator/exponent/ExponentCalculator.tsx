"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Copy, Check, Sparkles, HelpCircle, Layers, ArrowRight, Bookmark, Trash2 } from "lucide-react";

export interface SavedExponentItem {
  id: string;
  title: string;
  expression: string;
  result: string;
  timestamp: string;
}

type CalcMode = "general" | "fractional" | "operations" | "scientific";
type SolveTarget = "result" | "base" | "exponent";
type OperationType = "product" | "quotient" | "power" | "product_power" | "quotient_power";

export function ExponentCalculator() {
  const [activeTab, setActiveTab] = useState<CalcMode>("general");

  // Mode 1: General Power Solver
  const [solveTarget, setSolveTarget] = useState<SolveTarget>("result");
  const [baseVal, setBaseVal] = useState<string>("2");
  const [expVal, setExpVal] = useState<string>("10");
  const [targetYVal, setTargetYVal] = useState<string>("1024");
  const [useParentheses, setUseParentheses] = useState<boolean>(true);

  // Mode 2: Fractional & Radical Converter
  const [fracBase, setFracBase] = useState<string>("27");
  const [fracNum, setFracNum] = useState<string>("2");
  const [fracDen, setFracDen] = useState<string>("3");

  // Mode 3: Exponent Operations
  const [opType, setOpType] = useState<OperationType>("product");
  const [opA, setOpA] = useState<string>("2");
  const [opB, setOpB] = useState<string>("3");
  const [opM, setOpM] = useState<string>("3");
  const [opN, setOpN] = useState<string>("4");

  // Mode 4: Scientific & Engineering
  const [sciBase, setSciBase] = useState<string>("5.4");
  const [sciExp, setSciExp] = useState<string>("6");

  // Copy state
  const [copiedResult, setCopiedResult] = useState<boolean>(false);
  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);

  // Saved calculations state
  const [savedItems, setSavedItems] = useState<SavedExponentItem[]>([]);
  const [justSaved, setJustSaved] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_exponent_calculations");
      if (stored) {
        setSavedItems(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const handleSaveResult = () => {
    let title = "Power Solver";
    let expr = `${baseVal}^${expVal}`;
    let resStr = generalResult.formatted || "";

    if (activeTab === "fractional") {
      title = "Fractional Exponent";
      expr = `${fracBase}^(${fracNum}/${fracDen})`;
      resStr = String(fractionalResult.formatted || "");
    } else if (activeTab === "operations") {
      title = "Exponent Operation";
      expr = `${operationsResult.formulaName || opType}`;
      resStr = String(operationsResult.res || "");
    } else if (activeTab === "scientific") {
      title = "Scientific Notation";
      expr = `${sciBase} × 10^${sciExp}`;
      resStr = String(sciResult.decimal || "");
    }

    if (!resStr) return;

    const newItem: SavedExponentItem = {
      id: Date.now().toString(),
      title,
      expression: expr,
      result: resStr,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedItems.filter(item => item.expression !== expr || item.title !== title)].slice(0, 15);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_exponent_calculations", JSON.stringify(updated));
    } catch (err) {}

    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedItems.filter(item => item.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_exponent_calculations", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSaved = () => {
    setSavedItems([]);
    try {
      localStorage.removeItem("saved_exponent_calculations");
    } catch (e) {}
  };

  // Quick Preset Helper
  const applyPreset = (type: "sq" | "cube" | "inv" | "sqrt" | "pow10" | "expE") => {
    setActiveTab("general");
    setSolveTarget("result");
    if (type === "sq") {
      setBaseVal("5");
      setExpVal("2");
    } else if (type === "cube") {
      setBaseVal("3");
      setExpVal("3");
    } else if (type === "inv") {
      setBaseVal("2");
      setExpVal("-3");
    } else if (type === "sqrt") {
      setActiveTab("fractional");
      setFracBase("16");
      setFracNum("1");
      setFracDen("2");
    } else if (type === "pow10") {
      setBaseVal("10");
      setExpVal("6");
    } else if (type === "expE") {
      setBaseVal("2.718281828459");
      setExpVal("3");
    }
  };

  // --- MODE 1 COMPUTATION ---
  const generalResult = useMemo(() => {
    const b = parseFloat(baseVal);
    const n = parseFloat(expVal);
    const y = parseFloat(targetYVal);

    if (solveTarget === "result") {
      if (isNaN(b) || isNaN(n)) return { error: "Please enter valid numeric inputs." };

      // Parentheses handling for negative base
      const isNegBaseNoParen = !useParentheses && b < 0;
      const absBase = Math.abs(b);

      // Large Number / BigInt handling check
      if (Number.isInteger(b) && Number.isInteger(n) && n > 0 && n <= 3000 && absBase >= 2) {
        try {
          const bigB = BigInt(Math.trunc(b));
          const bigN = BigInt(Math.trunc(n));
          const bigRes = bigB ** bigN;
          const bigStr = bigRes.toString();

          if (bigStr.length > 20) {
            const expPart = bigStr.length - 1;
            const mantissa = `${bigStr[0]}.${bigStr.slice(1, 6)}`;
            return {
              numeric: Number(b ** n),
              formatted: `${mantissa} × 10^${expPart}`,
              exactString: bigStr,
              isBigInt: true,
              isComplex: false,
              latex: `${b < 0 && useParentheses ? `(${b})` : b}^{${n}} = ${bigStr}`,
              steps: [
                `Base b = ${b}, Exponent n = ${n}`,
                `Evaluated using arbitrary-precision integer exponentiation (${bigStr.length} digits)`,
                `Result: ${bigStr}`
              ]
            };
          }
        } catch (e) {
          // Fallback to standard double precision
        }
      }

      // Negative base with fractional power -> Complex Number ($i$)
      if (b < 0 && useParentheses && !Number.isInteger(n)) {
        // e.g. (-4)^(1/2) = 2i
        const absRes = Math.pow(absBase, n);
        // Check for 0.5 root
        if (Math.abs(n - 0.5) < 0.000001 || Math.abs(n - 1/2) < 0.000001) {
          const sqrtAbs = Math.sqrt(absBase);
          return {
            numeric: NaN,
            formatted: `${sqrtAbs % 1 === 0 ? sqrtAbs : sqrtAbs.toFixed(4)}i`,
            isComplex: true,
            latex: `(${b})^{${n}} = ${sqrtAbs % 1 === 0 ? sqrtAbs : sqrtAbs.toFixed(4)}i`,
            steps: [
              `Base b = ${b} is negative, Exponent n = ${n} is fractional.`,
              `Extract imaginary unit i = √(-1): √(${b}) = √(${absBase}) × √(-1) = ${sqrtAbs % 1 === 0 ? sqrtAbs : sqrtAbs.toFixed(4)}i`,
              `Complex Result: ${sqrtAbs % 1 === 0 ? sqrtAbs : sqrtAbs.toFixed(4)}i`
            ]
          };
        }

        const rad = (n * Math.PI);
        const realPart = absRes * Math.cos(rad);
        const imagPart = absRes * Math.sin(rad);
        const formattedComplex = `${realPart.toFixed(4)} ${imagPart >= 0 ? "+" : "-"} ${Math.abs(imagPart).toFixed(4)}i`;
        return {
          numeric: NaN,
          formatted: formattedComplex,
          isComplex: true,
          latex: `(${b})^{${n}} = ${formattedComplex}`,
          steps: [
            `Evaluated using Euler's formula: (${b})^${n} = |${b}|^${n} (cos(${n}π) + i sin(${n}π))`,
            `Result: ${formattedComplex}`
          ]
        };
      }

      // Standard exponentiation
      const rawRes = Math.pow(isNegBaseNoParen ? absBase : b, n);
      const finalRes = isNegBaseNoParen ? -rawRes : rawRes;

      let formatted = finalRes.toString();
      if (Math.abs(finalRes) > 1e12 || (Math.abs(finalRes) < 1e-6 && finalRes !== 0)) {
        formatted = finalRes.toExponential(6);
      }

      // Generate Step-by-Step explanation
      const steps: string[] = [];
      const baseLabel = b < 0 && useParentheses ? `(${b})` : `${b}`;

      if (n === 0) {
        steps.push(`Zero Exponent Rule: Any non-zero base raised to power 0 equals 1.`);
        steps.push(`Proof via Quotient Rule: ${baseLabel}^n / ${baseLabel}^n = ${baseLabel}^(n-n) = ${baseLabel}^0 = 1.`);
        steps.push(`Result = 1`);
      } else if (n < 0) {
        const posN = Math.abs(n);
        const posPower = Math.pow(isNegBaseNoParen ? absBase : b, posN);
        steps.push(`Negative Exponent Rule: b^(-n) = 1 / (b^n)`);
        steps.push(`${baseLabel}^(${n}) = 1 / (${baseLabel}^${posN})`);
        steps.push(`1 / ${posPower} = ${finalRes}`);
      } else if (Number.isInteger(n) && n > 0 && n <= 10) {
        const factors = Array(n).fill(baseLabel).join(" × ");
        steps.push(`Repeated Multiplication Expansion (${n} times):`);
        steps.push(`${baseLabel}^${n} = ${factors}`);
        steps.push(`= ${finalRes}`);
      } else {
        steps.push(`Calculate ${baseLabel}^${n}:`);
        steps.push(`Applied Exponential Formula: b^n = ${finalRes}`);
      }

      if (!useParentheses && b < 0) {
        steps.unshift(`Order of Operations (PEMDAS): Negation is applied AFTER exponentiation. -|${b}|^${n} = -(${absBase}^${n}) = ${finalRes}.`);
      }

      return {
        numeric: finalRes,
        formatted,
        isComplex: false,
        latex: `${!useParentheses && b < 0 ? `-${absBase}^{${n}}` : `${baseLabel}^{${n}}`} = ${formatted}`,
        steps
      };
    } else if (solveTarget === "base") {
      if (isNaN(y) || isNaN(n) || n === 0) return { error: "Please enter valid y and non-zero n." };
      // b = y^(1/n)
      const bCalc = Math.pow(y, 1 / n);
      const formatted = bCalc.toString();
      return {
        numeric: bCalc,
        formatted,
        isComplex: false,
        latex: `b = \\sqrt[${n}]{${y}} = ${bCalc.toFixed(6)}`,
        steps: [
          `Equation: b^${n} = ${y}`,
          `Take the ${n}-th root of both sides: b = (${y})^(1/${n})`,
          `b = ${bCalc}`
        ]
      };
    } else {
      // solve for exponent n = log_b(y)
      if (isNaN(b) || isNaN(y) || b <= 0 || b === 1 || y <= 0) {
        return { error: "Base b must be > 0 (b ≠ 1) and result y > 0 for real logarithm." };
      }
      const nCalc = Math.log(y) / Math.log(b);
      const formatted = nCalc.toString();
      return {
        numeric: nCalc,
        formatted,
        isComplex: false,
        latex: `n = \\log_{${b}}(${y}) = ${nCalc.toFixed(6)}`,
        steps: [
          `Equation: ${b}^n = ${y}`,
          `Take the natural log of both sides: ln(${b}^n) = ln(${y})`,
          `n × ln(${b}) = ln(${y}) => n = ln(${y}) / ln(${b})`,
          `n = ${nCalc}`
        ]
      };
    }
  }, [solveTarget, baseVal, expVal, targetYVal, useParentheses]);

  // --- MODE 2 COMPUTATION: Fractional & Radical ---
  const fractionalResult = useMemo(() => {
    const b = parseFloat(fracBase);
    const p = parseFloat(fracNum);
    const q = parseFloat(fracDen);

    if (isNaN(b) || isNaN(p) || isNaN(q) || q === 0) {
      return { error: "Please enter valid numbers (denominator q ≠ 0)." };
    }

    const decimalExp = p / q;
    const evaluated = Math.pow(b, decimalExp);

    const steps: string[] = [
      `Fractional Exponent Rule: b^(p/q) = (q-th root of b)^p = q-th root of (b^p)`,
      `Expression: ${b}^(${p}/${q}) = (√[${q}](${b}))^${p}`
    ];

    // Check if integer root exists
    const rootVal = Math.pow(b, 1 / q);
    if (Number.isInteger(rootVal)) {
      steps.push(`1. Calculate ${q}-th root: √[${q}](${b}) = ${rootVal}`);
      steps.push(`2. Raise to power ${p}: ${rootVal}^${p} = ${evaluated}`);
    } else {
      const bPowP = Math.pow(b, p);
      steps.push(`1. Raise base to power p: ${b}^${p} = ${bPowP}`);
      steps.push(`2. Take ${q}-th root: √[${q}](${bPowP}) = ${evaluated}`);
    }

    return {
      evaluated,
      formatted: evaluated.toString(),
      latex: `${b}^{\\frac{${p}}{${q}}} = \\sqrt[${q}]{${b}^{${p}}} = ${evaluated}`,
      radicalNotation: `√[${q}](${b}^${p})`,
      decimalExp,
      steps
    };
  }, [fracBase, fracNum, fracDen]);

  // --- MODE 3 COMPUTATION: Exponent Operations ---
  const operationsResult = useMemo(() => {
    const a = parseFloat(opA);
    const b = parseFloat(opB);
    const m = parseFloat(opM);
    const n = parseFloat(opN);

    if (isNaN(a) || isNaN(m) || isNaN(n)) {
      return { error: "Please enter valid numerical terms." };
    }

    if (opType === "product") {
      // a^m * a^n = a^(m+n)
      const sumExp = m + n;
      const res = Math.pow(a, sumExp);
      return {
        latex: `${a}^{${m}} \\cdot ${a}^{${n}} = ${a}^{${m} + ${n}} = ${a}^{${sumExp}} = ${res}`,
        formulaName: "Product of Powers Rule",
        rule: `a^m · a^n = a^(m+n)`,
        res,
        steps: [
          `Rule: Keep the same base (${a}) and add the exponents (${m} + ${n}).`,
          `Sum Exponent: ${m} + ${n} = ${sumExp}`,
          `Evaluated Power: ${a}^${sumExp} = ${res}`
        ]
      };
    } else if (opType === "quotient") {
      // a^m / a^n = a^(m-n)
      const diffExp = m - n;
      const res = Math.pow(a, diffExp);
      return {
        latex: `\\frac{${a}^{${m}}}{${a}^{${n}}} = ${a}^{${m} - ${n}} = ${a}^{${diffExp}} = ${res}`,
        formulaName: "Quotient of Powers Rule",
        rule: `a^m / a^n = a^(m-n)`,
        res,
        steps: [
          `Rule: Keep the same base (${a}) and subtract exponents (${m} - ${n}).`,
          `Difference Exponent: ${m} - ${n} = ${diffExp}`,
          `Evaluated Power: ${a}^${diffExp} = ${res}`
        ]
      };
    } else if (opType === "power") {
      // (a^m)^n = a^(m*n)
      const prodExp = m * n;
      const res = Math.pow(a, prodExp);
      return {
        latex: `(${a}^{${m}})^{${n}} = ${a}^{${m} \\cdot ${n}} = ${a}^{${prodExp}} = ${res}`,
        formulaName: "Power of a Power Rule",
        rule: `(a^m)^n = a^(m·n)`,
        res,
        steps: [
          `Rule: Keep the base (${a}) and multiply the exponents (${m} × ${n}).`,
          `Product Exponent: ${m} × ${n} = ${prodExp}`,
          `Evaluated Power: ${a}^${prodExp} = ${res}`
        ]
      };
    } else if (opType === "product_power") {
      // (a * b)^n = a^n * b^n
      const aN = Math.pow(a, n);
      const bN = Math.pow(b, n);
      const res = aN * bN;
      return {
        latex: `(${a} \\cdot ${b})^{${n}} = ${a}^{${n}} \\cdot ${b}^{${n}} = ${aN} \\cdot ${bN} = ${res}`,
        formulaName: "Power of a Product Rule",
        rule: `(a·b)^n = a^n · b^n`,
        res,
        steps: [
          `Rule: Distribute exponent (${n}) to both bases (${a} and ${b}).`,
          `Term 1: ${a}^${n} = ${aN}`,
          `Term 2: ${b}^${n} = ${bN}`,
          `Product: ${aN} × ${bN} = ${res}`
        ]
      };
    } else {
      // (a / b)^n = a^n / b^n
      if (b === 0) return { error: "Denominator base b cannot be zero." };
      const aN = Math.pow(a, n);
      const bN = Math.pow(b, n);
      const res = aN / bN;
      return {
        latex: `\\left(\\frac{${a}}{${b}}\\right)^{${n}} = \\frac{${a}^{${n}}}{${b}^{${n}}} = \\frac{${aN}}{${bN}} = ${res}`,
        formulaName: "Power of a Quotient Rule",
        rule: `(a/b)^n = a^n / b^n`,
        res,
        steps: [
          `Rule: Distribute exponent (${n}) to numerator (${a}) and denominator (${b}).`,
          `Numerator: ${a}^${n} = ${aN}`,
          `Denominator: ${b}^${n} = ${bN}`,
          `Quotient: ${aN} / ${bN} = ${res}`
        ]
      };
    }
  }, [opType, opA, opB, opM, opN]);

  // --- MODE 4 COMPUTATION: Scientific & Engineering ---
  const sciResult = useMemo(() => {
    const b = parseFloat(sciBase);
    const n = parseFloat(sciExp);

    if (isNaN(b) || isNaN(n)) return { error: "Please enter valid numbers." };

    const evaluated = b * Math.pow(10, n);
    const scientific = `${b} × 10^${n}`;
    const eNotation = `${b}e${n >= 0 ? "+" : ""}${n}`;

    // Engineering notation (exponent multiple of 3)
    const engExp = Math.floor(n / 3) * 3;
    const engRem = n - engExp;
    const engMantissa = b * Math.pow(10, engRem);
    const engineering = `${engMantissa} × 10^${engExp}`;

    return {
      evaluated,
      decimal: evaluated.toLocaleString('en-US', { maximumFractionDigits: 10 }),
      scientific,
      engineering,
      eNotation,
      latex: `${b} \\times 10^{${n}} = ${evaluated}`,
      steps: [
        `Expression: ${b} × 10^${n}`,
        `Shift decimal point ${n} places to the ${n >= 0 ? "right" : "left"}.`,
        `Decimal Output: ${evaluated}`,
        `Engineering Format: ${engineering}`
      ]
    };
  }, [sciBase, sciExp]);

  // Copy handlers
  const handleCopyText = (text: string, type: "result" | "latex") => {
    try {
      navigator.clipboard.writeText(text);
      if (type === "result") {
        setCopiedResult(true);
        setTimeout(() => setCopiedResult(false), 2000);
      } else {
        setCopiedLatex(true);
        setTimeout(() => setCopiedLatex(false), 2000);
      }
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. TABS SUITE NAVIGATION */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none text-xs">
        {[
          { id: "general", label: "Power Solver (bⁿ)" },
          { id: "fractional", label: "Fractional & Radical (bᵖ/𐞥)" },
          { id: "operations", label: "Exponent Laws & Operations" },
          { id: "scientific", label: "Scientific Notation (× 10ᵏ)" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as CalcMode)}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 2. QUICK PRESETS BAR */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs text-xs">
        <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Presets:
        </span>
        <button
          onClick={() => applyPreset("sq")}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 cursor-pointer transition-colors"
        >
          x² (Square)
        </button>
        <button
          onClick={() => applyPreset("cube")}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 cursor-pointer transition-colors"
        >
          x³ (Cube)
        </button>
        <button
          onClick={() => applyPreset("inv")}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 cursor-pointer transition-colors"
        >
          x⁻¹ (Reciprocal)
        </button>
        <button
          onClick={() => applyPreset("sqrt")}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 cursor-pointer transition-colors"
        >
          √x (Square Root)
        </button>
        <button
          onClick={() => applyPreset("pow10")}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 cursor-pointer transition-colors"
        >
          10ⁿ (Power of 10)
        </button>
        <button
          onClick={() => applyPreset("expE")}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 cursor-pointer transition-colors"
        >
          eˣ (Natural Exp)
        </button>
      </div>

      {/* 3. MAIN SPLIT-PANE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: INPUT CONTROLS */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            {/* MODE 1: GENERAL POWER SOLVER */}
            {activeTab === "general" && (
              <>
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

                {/* VISUAL EXPONENT INPUT DISPLAY */}
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
                    Visual Mathematical Expression
                  </span>
                  <div className="inline-flex items-baseline font-sans tabular-nums font-extrabold text-2xl text-blue-600 dark:text-blue-400">
                    {solveTarget === "result" ? (
                      <>
                        <span>{parseFloat(baseVal) < 0 && useParentheses ? `(${baseVal})` : baseVal || "b"}</span>
                        <sup className="text-sm font-bold text-slate-800 dark:text-slate-200 ml-0.5">{expVal || "n"}</sup>
                        <span className="mx-2 text-slate-400">=</span>
                        <span className="text-emerald-600 dark:text-emerald-400">{generalResult.formatted || "?"}</span>
                      </>
                    ) : solveTarget === "base" ? (
                      <>
                        <span className="text-emerald-600 dark:text-emerald-400">b</span>
                        <sup className="text-sm font-bold text-slate-800 dark:text-slate-200 ml-0.5">{expVal || "n"}</sup>
                        <span className="mx-2 text-slate-400">=</span>
                        <span>{targetYVal || "y"}</span>
                      </>
                    ) : (
                      <>
                        <span>{baseVal || "b"}</span>
                        <sup className="text-sm font-bold text-emerald-600 dark:text-emerald-400 ml-0.5">n</sup>
                        <span className="mx-2 text-slate-400">=</span>
                        <span>{targetYVal || "y"}</span>
                      </>
                    )}
                  </div>
                </div>

                {solveTarget !== "base" && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Base (b)
                    </label>
                    <input
                      type="number"
                      value={baseVal}
                      onChange={(e) => setBaseVal(e.target.value)}
                      placeholder="e.g. 2, -3, 0.5"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                      placeholder="e.g. 4, -2, 0.5"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                )}

                {solveTarget !== "result" && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Target Evaluated Result (y)
                    </label>
                    <input
                      type="number"
                      value={targetYVal}
                      onChange={(e) => setTargetYVal(e.target.value)}
                      placeholder="e.g. 1024, 16"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                )}

                {/* Parentheses Toggle for Negative Base */}
                {parseFloat(baseVal) < 0 && solveTarget === "result" && (
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={useParentheses}
                      onChange={(e) => setUseParentheses(e.target.checked)}
                      className="rounded text-blue-600 accent-blue-600 h-4 w-4 cursor-pointer"
                    />
                    Use Parentheses: ({baseVal})ⁿ vs -{Math.abs(parseFloat(baseVal))}ⁿ
                  </label>
                )}
              </>
            )}

            {/* MODE 2: FRACTIONAL & RADICAL */}
            {activeTab === "fractional" && (
              <>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
                    Radical Notation Format
                  </span>
                  <div className="font-sans tabular-nums font-extrabold text-2xl text-blue-600 dark:text-blue-400">
                    {fracBase}
                    <sup className="text-sm text-slate-800 dark:text-slate-200 ml-0.5">{fracNum}/{fracDen}</sup>
                    <span className="mx-2 text-slate-400">=</span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      <sup>{fracDen}</sup>√({fracBase}<sup>{fracNum}</sup>)
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
                    placeholder="e.g. 27"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                      placeholder="e.g. 2"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                      placeholder="e.g. 3"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </>
            )}

            {/* MODE 3: EXPONENT OPERATIONS */}
            {activeTab === "operations" && (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Select Exponent Law / Operation
                  </label>
                  <select
                    value={opType}
                    onChange={(e) => setOpType(e.target.value as OperationType)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="product">Product Rule: aᵐ · aⁿ = aᵐ⁺ⁿ</option>
                    <option value="quotient">Quotient Rule: aᵐ / aⁿ = aᵐ⁻ⁿ</option>
                    <option value="power">Power of a Power: (aᵐ)ⁿ = aᵐ·ⁿ</option>
                    <option value="product_power">Power of a Product: (a·b)ⁿ = aⁿ·bⁿ</option>
                    <option value="quotient_power">Power of a Quotient: (a/b)ⁿ = aⁿ/bⁿ</option>
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

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      First Exponent (m)
                    </label>
                    <input
                      type="number"
                      value={opM}
                      onChange={(e) => setOpM(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      {opType === "product" || opType === "quotient" ? "Second Exponent (n)" : "Outer Exponent (n)"}
                    </label>
                    <input
                      type="number"
                      value={opN}
                      onChange={(e) => setOpN(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>
                </div>
              </>
            )}

            {/* MODE 4: SCIENTIFIC NOTATION */}
            {activeTab === "scientific" && (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Mantissa / Coefficient (a)
                  </label>
                  <input
                    type="number"
                    value={sciBase}
                    onChange={(e) => setSciBase(e.target.value)}
                    placeholder="e.g. 5.4"
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
                    placeholder="e.g. 6"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: RESULTS HERO CARD & STEP-BY-STEP BREAKDOWN */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
            {/* HERO RESULT CARD */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Evaluated Result
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveResult}
                    className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <Bookmark className="w-3 h-3" />
                    <span>{justSaved ? "Saved!" : "Save"}</span>
                  </button>
                  {/* LaTeX Code Copy Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const ltx = activeTab === "general" ? generalResult.latex : activeTab === "fractional" ? fractionalResult.latex : activeTab === "operations" ? operationsResult.latex : sciResult.latex;
                      if (ltx) handleCopyText(ltx, "latex");
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                  >
                    {copiedLatex ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-blue-600" />}
                    <span>{copiedLatex ? "LaTeX Copied!" : "Copy LaTeX"}</span>
                  </button>
                </div>
              </div>

              {activeTab === "general" && (
                <div>
                  {generalResult.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">{generalResult.error}</div>
                  ) : (
                    <div className="space-y-1">
                      <div className="text-3xl sm:text-4xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100">
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
              )}

              {activeTab === "fractional" && (
                <div>
                  {fractionalResult.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">{fractionalResult.error}</div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-3xl sm:text-4xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100">
                        {fractionalResult.formatted}
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs font-bold">
                        <span className="bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-900/50">
                          Radical Form: {fractionalResult.radicalNotation}
                        </span>
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg">
                          Decimal Power: {fractionalResult.decimalExp}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "operations" && (
                <div>
                  {operationsResult.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">{operationsResult.error}</div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-2xl sm:text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100">
                        {operationsResult.res}
                      </div>
                      <div className="text-xs font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 p-2.5 rounded-xl border border-blue-200 dark:border-blue-900/50">
                        Applied Law: {operationsResult.formulaName} ({operationsResult.rule})
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "scientific" && (
                <div>
                  {sciResult.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">{sciResult.error}</div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-2xl sm:text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100">
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
              )}
            </div>

            {/* STEP-BY-STEP SOLUTION BREAKDOWN */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" /> Step-by-Step Educational Solution
              </h4>
              <div className="space-y-2 text-xs font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                {activeTab === "general" && generalResult.steps && generalResult.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">{idx + 1}.</span>
                    <span className="font-sans tabular-nums">{step}</span>
                  </div>
                ))}

                {activeTab === "fractional" && fractionalResult.steps && fractionalResult.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">{idx + 1}.</span>
                    <span className="font-sans tabular-nums">{step}</span>
                  </div>
                ))}

                {activeTab === "operations" && operationsResult.steps && operationsResult.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">{idx + 1}.</span>
                    <span className="font-sans tabular-nums">{step}</span>
                  </div>
                ))}

                {activeTab === "scientific" && sciResult.steps && sciResult.steps.map((step, idx) => (
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

      {/* SAVED CALCULATIONS HISTORY */}
      {savedItems.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-blue-600" />
              <span>Saved Calculations ({savedItems.length})</span>
            </h3>
            <button
              type="button"
              onClick={handleClearAllSaved}
              className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {savedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs"
              >
                <div className="space-y-0.5 min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{item.title}</span>
                    <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 truncate font-sans tabular-nums">
                    {item.expression} &rarr; <strong className="text-blue-600 dark:text-blue-400">{item.result}</strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteSaved(item.id)}
                  className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer shrink-0"
                  title="Delete saved calculation"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExponentCalculator;
