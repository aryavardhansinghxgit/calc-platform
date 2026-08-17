"use client";

import React, { useState, useEffect } from "react";

export interface SavedFractionItem {
  id: string;
  title: string;
  expression: string;
  result: string;
  timestamp: string;
}

// Math helpers
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

function gcdBigInt(a: bigint, b: bigint): bigint {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b > 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a === 0n ? 1n : a;
}

function lcmBigInt(a: bigint, b: bigint): bigint {
  if (a === 0n || b === 0n) return 0n;
  const g = gcdBigInt(a, b);
  return (a < 0n ? -a : a) / g * (b < 0n ? -b : b);
}

export function FractionCalculator() {
  const [savedItems, setSavedItems] = useState<SavedFractionItem[]>([]);
  const [savedSection, setSavedSection] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_fraction_calculations");
      if (stored) {
        setSavedItems(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const handleSaveResult = (e: React.MouseEvent, sectionId: string, sectionTitle: string, expression: string, resultStr: string) => {
    e.preventDefault();
    e.stopPropagation();

    const newItem: SavedFractionItem = {
      id: Date.now().toString(),
      title: sectionTitle,
      expression,
      result: resultStr,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedItems.filter(item => item.expression !== expression)].slice(0, 15);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_fraction_calculations", JSON.stringify(updated));
    } catch (err) {}

    setSavedSection(sectionId);
    setTimeout(() => setSavedSection(null), 2000);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedItems.filter(item => item.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_fraction_calculations", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSaved = () => {
    setSavedItems([]);
    try {
      localStorage.removeItem("saved_fraction_calculations");
    } catch (e) {}
  };

  // =========================================================================
  // MODULE 1: FRACTION CALCULATOR (+, -, *, /)
  // Default: 2/7 + 3/8 = 37/56
  // =========================================================================
  const [m1N1, setM1N1] = useState<string>("2");
  const [m1D1, setM1D1] = useState<string>("7");
  const [m1Op, setM1Op] = useState<"+" | "-" | "*" | "/">("+");
  const [m1N2, setM1N2] = useState<string>("3");
  const [m1D2, setM1D2] = useState<string>("8");
  const [m1ShowFurther, setM1ShowFurther] = useState<boolean>(true);

  const [m1Result, setM1Result] = useState<{
    resN: number;
    resD: number;
    simplifiedStr: string;
    decimalStr: string;
    rawExpr: string;
    lcmVal: number;
    step1Str: string;
    step2Str: string;
    step3Str: string;
    step4Str: string;
  } | null>(() => computeM1("2", "7", "+", "3", "8"));

  function computeM1(n1Str: string, d1Str: string, op: "+" | "-" | "*" | "/", n2Str: string, d2Str: string) {
    const n1 = parseInt(n1Str, 10);
    const d1 = parseInt(d1Str, 10);
    const n2 = parseInt(n2Str, 10);
    const d2 = parseInt(d2Str, 10);

    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) return null;

    let resN = 0;
    let resD = 1;
    const lcmVal = lcm(d1, d2);

    const mult1 = lcmVal / d1;
    const mult2 = lcmVal / d2;
    const term1N = n1 * mult1;
    const term2N = n2 * mult2;

    if (op === "+") {
      resN = term1N + term2N;
      resD = lcmVal;
    } else if (op === "-") {
      resN = term1N - term2N;
      resD = lcmVal;
    } else if (op === "*") {
      resN = n1 * n2;
      resD = d1 * d2;
    } else {
      if (n2 === 0) return null;
      resN = n1 * d2;
      resD = d1 * n2;
    }

    const g = gcd(resN, resD);
    const simpN = resN / g;
    const simpD = resD / g;

    const opChar = op === "*" ? "×" : op === "/" ? "÷" : op;
    const simplifiedStr = simpD === 1 ? `${simpN}` : `${simpN}/${simpD}`;
    const decimalVal = resN / resD;
    const decimalStr = parseFloat(decimalVal.toFixed(14)).toString();
    const rawExpr = `${n1}/${d1} ${opChar} ${n2}/${d2}`;

    let step1Str = "";
    let step2Str = "";
    let step3Str = "";
    let step4Str = "";

    if (op === "+" || op === "-") {
      step1Str = `= (${n1} × ${mult2})/(${d1} × ${mult2}) ${opChar} (${n2} × ${mult1})/(${d2} × ${mult1})`;
      step2Str = `= ${term1N}/${lcmVal} ${opChar} ${term2N}/${lcmVal}`;
      step3Str = `= (${term1N} ${opChar} ${term2N})/${lcmVal}`;
      step4Str = `= ${resN}/${resD}` + (g > 1 ? ` = ${simpN}/${simpD}` : "");
    } else if (op === "*") {
      step1Str = `= (${n1} × ${n2})/(${d1} × ${d2})`;
      step2Str = `= ${resN}/${resD}`;
      step3Str = g > 1 ? `= ${simpN}/${simpD}` : "";
    } else {
      step1Str = `= (${n1}/${d1}) × (${d2}/${n2})`;
      step2Str = `= (${n1} × ${d2})/(${d1} × ${n2})`;
      step3Str = `= ${resN}/${resD}` + (g > 1 ? ` = ${simpN}/${simpD}` : "");
    }

    return {
      resN: simpN,
      resD: simpD,
      simplifiedStr,
      decimalStr,
      rawExpr,
      lcmVal,
      step1Str,
      step2Str,
      step3Str,
      step4Str
    };
  }

  const handleM1Calculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setM1Result(computeM1(m1N1, m1D1, m1Op, m1N2, m1D2));
  };

  const handleM1Clear = () => {
    setM1N1("");
    setM1D1("");
    setM1Op("+");
    setM1N2("");
    setM1D2("");
    setM1Result(null);
  };

  // =========================================================================
  // MODULE 2: MIXED NUMBERS CALCULATOR
  // Default: -2 3/4 + 3 5/7 = 27/28
  // =========================================================================
  const [m2Input1, setM2Input1] = useState<string>("-2 3/4");
  const [m2Op, setM2Op] = useState<"+" | "-" | "*" | "/">("+");
  const [m2Input2, setM2Input2] = useState<string>("3 5/7");
  const [m2ShowFurther, setM2ShowFurther] = useState<boolean>(false);

  const [m2Result, setM2Result] = useState<{
    w1: number;
    n1: number;
    d1: number;
    w2: number;
    n2: number;
    d2: number;
    impN1: number;
    impN2: number;
    resN: number;
    resD: number;
    simplifiedStr: string;
    decimalStr: string;
    rawExpr: string;
    step1Str: string;
    step2Str: string;
    step3Str: string;
    step4Str: string;
    step5Str: string;
  } | null>(() => computeM2("-2 3/4", "+", "3 5/7"));

  function parseMixedStr(str: string): { w: number; n: number; d: number } | null {
    const trimmed = str.trim();
    if (!trimmed) return null;

    // Check if format is "w n/d" or "n/d" or "w"
    const spaceIdx = trimmed.indexOf(" ");
    if (spaceIdx !== -1) {
      const wPart = parseInt(trimmed.slice(0, spaceIdx), 10);
      const fracPart = trimmed.slice(spaceIdx + 1).split("/");
      if (fracPart.length === 2) {
        const nPart = parseInt(fracPart[0], 10);
        const dPart = parseInt(fracPart[1], 10);
        if (!isNaN(wPart) && !isNaN(nPart) && !isNaN(dPart) && dPart !== 0) {
          return { w: wPart, n: Math.abs(nPart), d: Math.abs(dPart) };
        }
      }
    } else if (trimmed.includes("/")) {
      const parts = trimmed.split("/");
      if (parts.length === 2) {
        const nPart = parseInt(parts[0], 10);
        const dPart = parseInt(parts[1], 10);
        if (!isNaN(nPart) && !isNaN(dPart) && dPart !== 0) {
          return { w: 0, n: nPart, d: dPart };
        }
      }
    } else {
      const wPart = parseInt(trimmed, 10);
      if (!isNaN(wPart)) {
        return { w: wPart, n: 0, d: 1 };
      }
    }
    return null;
  }

  function computeM2(in1Str: string, op: "+" | "-" | "*" | "/", in2Str: string) {
    const m1 = parseMixedStr(in1Str);
    const m2 = parseMixedStr(in2Str);
    if (!m1 || !m2) return null;

    const sign1 = m1.w < 0 ? -1 : 1;
    const absW1 = Math.abs(m1.w);
    const impN1 = sign1 * (absW1 * m1.d + m1.n);

    const sign2 = m2.w < 0 ? -1 : 1;
    const absW2 = Math.abs(m2.w);
    const impN2 = sign2 * (absW2 * m2.d + m2.n);

    let resN = 0;
    let resD = 1;
    const lcmVal = lcm(m1.d, m2.d);
    const mult1 = lcmVal / m1.d;
    const mult2 = lcmVal / m2.d;
    const opChar = op === "*" ? "×" : op === "/" ? "÷" : op;

    if (op === "+") {
      resN = impN1 * mult2 + impN2 * mult1;
      resD = lcmVal;
    } else if (op === "-") {
      resN = impN1 * mult2 - impN2 * mult1;
      resD = lcmVal;
    } else if (op === "*") {
      resN = impN1 * impN2;
      resD = m1.d * m2.d;
    } else {
      if (impN2 === 0) return null;
      resN = impN1 * m2.d;
      resD = m1.d * impN2;
    }

    const g = gcd(resN, resD);
    const simpN = resN / g;
    const simpD = resD / g;

    const decimalVal = simpN / simpD;
    const decimalStr = parseFloat(decimalVal.toFixed(14)).toString();
    const simplifiedStr = simpD === 1 ? `${simpN}` : `${simpN}/${simpD}`;
    const rawExpr = `${in1Str} ${opChar} ${in2Str}`;

    const step1Str = `= (${m1.w} + ${m2.w}) + (${sign1 * m1.n}/${m1.d} + ${sign2 * m2.n}/${m2.d})`;
    const step2Str = `= ${m1.w + m2.w} + (${sign1 * m1.n} × ${m2.d})/(${m1.d} × ${m2.d}) + (${sign2 * m2.n} × ${m1.d})/(${m2.d} × ${m1.d})`;
    const step3Str = `= ${m1.w + m2.w} + ${sign1 * m1.n * m2.d}/${lcmVal} + ${sign2 * m2.n * m1.d}/${lcmVal}`;
    const step4Str = `= ${m1.w + m2.w} + (${sign1 * m1.n * m2.d} + ${sign2 * m2.n * m1.d})/${lcmVal}`;
    const step5Str = `= ${simplifiedStr}`;

    return {
      w1: m1.w, n1: m1.n, d1: m1.d,
      w2: m2.w, n2: m2.n, d2: m2.d,
      impN1, impN2,
      resN: simpN, resD: simpD,
      simplifiedStr, decimalStr, rawExpr,
      step1Str, step2Str, step3Str, step4Str, step5Str
    };
  }

  const handleM2Calculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setM2Result(computeM2(m2Input1, m2Op, m2Input2));
  };

  const handleM2Clear = () => {
    setM2Input1("");
    setM2Op("+");
    setM2Input2("");
    setM2Result(null);
  };

  // =========================================================================
  // MODULE 3: SIMPLIFY FRACTIONS CALCULATOR
  // Default: 2 21/98 = 217/98 = 2 3/14
  // =========================================================================
  const [m3W, setM3W] = useState<string>("2");
  const [m3N, setM3N] = useState<string>("21");
  const [m3D, setM3D] = useState<string>("98");

  const [m3Result, setM3Result] = useState<{
    w: number;
    n: number;
    d: number;
    impN: number;
    gcdVal: number;
    simpImpN: number;
    simpD: number;
    simpW: number;
    simpN: number;
    mixedStr: string;
    decimalStr: string;
    step1Str: string;
    step2Str: string;
  } | null>(() => computeM3("2", "21", "98"));

  function computeM3(wStr: string, nStr: string, dStr: string) {
    const w = parseInt(wStr || "0", 10);
    const n = parseInt(nStr, 10);
    const d = parseInt(dStr, 10);
    if (isNaN(n) || isNaN(d) || d === 0) return null;

    const impN = (w >= 0 ? 1 : -1) * (Math.abs(w) * d + n);
    const g = gcd(impN, d);
    const simpImpN = impN / g;
    const simpD = d / g;

    const simpW = Math.trunc(simpImpN / simpD);
    const simpN = Math.abs(simpImpN % simpD);

    const mixedStr = simpW !== 0 ? `${simpW} ${simpN}/${simpD}` : `${simpImpN}/${simpD}`;
    const decimalVal = impN / d;
    const decimalStr = parseFloat(decimalVal.toFixed(14)).toString();

    const step1Str = w !== 0 ? `${w} ${n}/${d} = ${impN}/${d}` : `${n}/${d}`;
    const step2Str = `= (${impN} ÷ ${g})/(${d} ÷ ${g}) = ${simpImpN}/${simpD}` + (simpW !== 0 && simpN !== 0 ? ` = ${simpW} ${simpN}/${simpD}` : "");

    return {
      w, n, d, impN, gcdVal: g,
      simpImpN, simpD, simpW, simpN,
      mixedStr, decimalStr,
      step1Str, step2Str
    };
  }

  const handleM3Calculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setM3Result(computeM3(m3W, m3N, m3D));
  };

  const handleM3Clear = () => {
    setM3W("");
    setM3N("");
    setM3D("");
    setM3Result(null);
  };

  // =========================================================================
  // MODULE 4: DECIMAL TO FRACTION CALCULATOR
  // Default: 1.375 = 11/8 = 1 3/8
  // =========================================================================
  const [m4Dec, setM4Dec] = useState<string>("1.375");

  const [m4Result, setM4Result] = useState<{
    decVal: number;
    power: number;
    rawN: number;
    rawD: number;
    gcdVal: number;
    simpN: number;
    simpD: number;
    mixW: number;
    mixN: number;
    resStr: string;
    step1Str: string;
    step2Str: string;
    step3Str: string;
    step4Str: string;
  } | null>(() => computeM4("1.375"));

  function computeM4(decStr: string) {
    const num = parseFloat(decStr);
    if (isNaN(num)) return null;

    const parts = decStr.split(".");
    const decimalPlaces = parts.length > 1 ? parts[1].length : 0;
    const power = Math.pow(10, decimalPlaces);

    const rawN = Math.round(num * power);
    const rawD = power;

    const g = gcd(rawN, rawD);
    const simpN = rawN / g;
    const simpD = rawD / g;

    const mixW = Math.trunc(simpN / simpD);
    const mixN = Math.abs(simpN % simpD);

    const resStr = mixW !== 0 && mixN !== 0 ? `${num} = ${simpN}/${simpD} = ${mixW} ${mixN}/${simpD}` : `${num} = ${simpN}/${simpD}`;

    const step1Str = `${num}`;
    const step2Str = `= (${num} × ${power})/(1 × ${power})`;
    const step3Str = `= ${rawN}/${rawD}`;
    const step4Str = `= (${rawN} ÷ ${g})/(${rawD} ÷ ${g}) = ${simpN}/${simpD}` + (mixW !== 0 && mixN !== 0 ? ` = ${mixW} ${mixN}/${simpD}` : "");

    return {
      decVal: num, power, rawN, rawD, gcdVal: g,
      simpN, simpD, mixW, mixN, resStr,
      step1Str, step2Str, step3Str, step4Str
    };
  }

  const handleM4Calculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setM4Result(computeM4(m4Dec));
  };

  const handleM4Clear = () => {
    setM4Dec("");
    setM4Result(null);
  };

  // =========================================================================
  // MODULE 5: FRACTION TO DECIMAL CALCULATOR
  // Default: 2/7 = 0.28571428571429
  // =========================================================================
  const [m5N, setM5N] = useState<string>("2");
  const [m5D, setM5D] = useState<string>("7");

  const [m5Result, setM5Result] = useState<{
    n: number;
    d: number;
    decimalStr: string;
    stepStr: string;
  } | null>(() => computeM5("2", "7"));

  function computeM5(nStr: string, dStr: string) {
    const n = parseInt(nStr, 10);
    const d = parseInt(dStr, 10);
    if (isNaN(n) || isNaN(d) || d === 0) return null;

    const val = n / d;
    const decimalStr = parseFloat(val.toFixed(14)).toString();
    const stepStr = `${n}/${d} = ${n} ÷ ${d} = ${decimalStr}`;

    return { n, d, decimalStr, stepStr };
  }

  const handleM5Calculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setM5Result(computeM5(m5N, m5D));
  };

  const handleM5Clear = () => {
    setM5N("");
    setM5D("");
    setM5Result(null);
  };

  // =========================================================================
  // MODULE 6: BIG NUMBER FRACTION CALCULATOR
  // Default: 1234 / 748892928829 + 3343442113223234333 / 88772773882888288288
  // =========================================================================
  const [m6N1, setM6N1] = useState<string>("1234");
  const [m6D1, setM6D1] = useState<string>("748892928829");
  const [m6Op, setM6Op] = useState<"+" | "-" | "*" | "/">("+");
  const [m6N2, setM6N2] = useState<string>("3343442113223234333");
  const [m6D2, setM6D2] = useState<string>("88772773882888288288");

  const [m6Result, setM6Result] = useState<{
    simpNStr: string;
    simpDStr: string;
    decimalStr: string;
    rawExpr: string;
    step1Str: string;
  } | null>(() => computeM6("1234", "748892928829", "+", "3343442113223234333", "88772773882888288288"));

  function computeM6(n1Str: string, d1Str: string, op: "+" | "-" | "*" | "/", n2Str: string, d2Str: string) {
    try {
      const n1 = BigInt(n1Str || "0");
      const d1 = BigInt(d1Str || "1");
      const n2 = BigInt(n2Str || "0");
      const d2 = BigInt(d2Str || "1");

      if (d1 === 0n || d2 === 0n) return null;

      let resN = 0n;
      let resD = 1n;
      const opChar = op === "*" ? "×" : op === "/" ? "÷" : op;

      if (op === "+") {
        resN = n1 * d2 + n2 * d1;
        resD = d1 * d2;
      } else if (op === "-") {
        resN = n1 * d2 - n2 * d1;
        resD = d1 * d2;
      } else if (op === "*") {
        resN = n1 * n2;
        resD = d1 * d2;
      } else {
        if (n2 === 0n) return null;
        resN = n1 * d2;
        resD = d1 * n2;
      }

      const g = gcdBigInt(resN, resD);
      const simpN = resN / g;
      const simpD = resD / g;

      const simpNStr = simpN.toString();
      const simpDStr = simpD.toString();

      let decimalStr = "~ 0";
      try {
        const decVal = Number(simpN) / Number(simpD);
        if (!isNaN(decVal) && isFinite(decVal)) {
          decimalStr = parseFloat(decVal.toFixed(14)).toString();
        }
      } catch (e) {}

      const rawExpr = `${n1Str}/${d1Str} ${opChar} ${n2Str}/${d2Str}`;
      const step1Str = `${rawExpr} = ${simpNStr}/${simpDStr}`;

      return {
        simpNStr, simpDStr, decimalStr, rawExpr, step1Str
      };
    } catch (err) {
      return null;
    }
  }

  const handleM6Calculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setM6Result(computeM6(m6N1, m6D1, m6Op, m6N2, m6D2));
  };

  const handleM6Clear = () => {
    setM6N1("");
    setM6D1("");
    setM6Op("+");
    setM6N2("");
    setM6D2("");
    setM6Result(null);
  };

  return (
    <div className="space-y-8 font-sans text-slate-800 dark:text-slate-200">

      {/* ========================================================================= */}
      {/* MODULE 1: FRACTION CALCULATOR (+, -, *, /) */}
      {/* ========================================================================= */}
      <section id="fraction-calculator" className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Fraction Calculator
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Below are multiple fraction calculators capable of addition, subtraction, multiplication, division, simplification, and conversion between fractions and decimals. Fields above the solid black line represent the numerator, while fields below represent the denominator.
        </p>

        {/* Form Inputs */}
        <form onSubmit={handleM1Calculate} className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 max-w-xl">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            {/* Fraction 1 */}
            <div className="flex flex-col items-center gap-1">
              <input
                type="text"
                value={m1N1}
                onChange={(e) => setM1N1(e.target.value)}
                placeholder="2"
                aria-label="Numerator 1"
                className="w-20 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
              />
              <div className="w-20 h-0.5 bg-slate-900 dark:bg-slate-100" />
              <input
                type="text"
                value={m1D1}
                onChange={(e) => setM1D1(e.target.value)}
                placeholder="7"
                aria-label="Denominator 1"
                className="w-20 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* Operator */}
            <select
              value={m1Op}
              onChange={(e) => setM1Op(e.target.value as "+" | "-" | "*" | "/")}
              aria-label="Operator"
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm font-black outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
            >
              <option value="+">+</option>
              <option value="-">−</option>
              <option value="*">×</option>
              <option value="/">÷</option>
            </select>

            {/* Fraction 2 */}
            <div className="flex flex-col items-center gap-1">
              <input
                type="text"
                value={m1N2}
                onChange={(e) => setM1N2(e.target.value)}
                placeholder="3"
                aria-label="Numerator 2"
                className="w-20 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
              />
              <div className="w-20 h-0.5 bg-slate-900 dark:bg-slate-100" />
              <input
                type="text"
                value={m1D2}
                onChange={(e) => setM1D2(e.target.value)}
                placeholder="8"
                aria-label="Denominator 2"
                className="w-20 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <span className="font-bold text-sm ml-1">= ?</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={handleM1Clear}
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Results Banner & Steps Layout */}
        {m1Result && (
          <div className="space-y-3 max-w-xl">
            <div className="border border-blue-600 rounded overflow-hidden">
              <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 flex items-center justify-between">
                <span>Result</span>
                <button
                  type="button"
                  onClick={(e) => handleSaveResult(e, "m1", "Fraction Calculator", m1Result.rawExpr, m1Result.simplifiedStr)}
                  className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {savedSection === "m1" ? "Saved!" : "Save"}
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 text-xs font-sans space-y-3">
                <div className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 font-sans tabular-nums">
                  <span>{m1N1}/{m1D1} {m1Op === "*" ? "×" : m1Op === "/" ? "÷" : m1Op} {m1N2}/{m1D2} =</span>
                  <strong className="text-blue-600 dark:text-blue-400 font-extrabold text-lg">{m1Result.simplifiedStr}</strong>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 font-sans tabular-nums">
                  Result in decimals: <strong className="text-slate-800 dark:text-slate-200">{m1Result.decimalStr}</strong>
                </div>

                {/* SVG Visual Pie Chart */}
                <div className="py-2 flex items-center justify-center gap-3 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700">
                  <svg width="60" height="60" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="16" fill="#e2e8f0" />
                    <path d="M16 16 L16 0 A16 16 0 0 1 31.6 12.3 Z" fill="#2563eb" />
                  </svg>
                  <span className="font-bold text-sm">{m1Op === "*" ? "×" : m1Op === "/" ? "÷" : m1Op}</span>
                  <svg width="60" height="60" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="16" fill="#e2e8f0" />
                    <path d="M16 16 L16 0 A16 16 0 0 1 29.8 8.1 Z" fill="#2563eb" />
                  </svg>
                  <span className="font-bold text-sm">=</span>
                  <svg width="60" height="60" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="16" fill="#e2e8f0" />
                    <path d="M16 16 L16 0 A16 16 0 1 1 5.4 4.1 Z" fill="#2563eb" />
                  </svg>
                </div>

                {/* Calculation Steps Section */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">Calculation steps:</div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded border border-slate-200 dark:border-slate-700 font-sans tabular-nums text-xs leading-relaxed space-y-1 overflow-x-auto">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      <span className="inline-flex items-center align-middle mx-1"><sup>{m1N1}</sup>&frasl;<sub>{m1D1}</sub></span> {m1Op === "*" ? "×" : m1Op === "/" ? "÷" : m1Op} <span className="inline-flex items-center align-middle mx-1"><sup>{m1N2}</sup>&frasl;<sub>{m1D2}</sub></span>
                    </p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{m1Result.step1Str}</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{m1Result.step2Str}</p>
                    {m1Result.step3Str && <p className="font-semibold text-slate-800 dark:text-slate-200">{m1Result.step3Str}</p>}
                    {m1Result.step4Str && <p className="font-semibold text-slate-800 dark:text-slate-200">{m1Result.step4Str}</p>}
                  </div>
                </div>

                {/* Further Explanation Accordion */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setM1ShowFurther(!m1ShowFurther)}
                    className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
                  >
                    {m1ShowFurther ? "- Hide further explanation" : "+ Show further explanation"}
                  </button>

                  {m1ShowFurther && (
                    <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                      <div className="font-bold text-slate-900 dark:text-slate-100">Further explanation</div>
                      <p>For the problem:</p>
                      <div className="text-center font-bold font-sans tabular-nums py-1">
                        <span className="inline-flex items-center align-middle mx-1"><sup>{m1N1}</sup>&frasl;<sub>{m1D1}</sub></span> {m1Op === "*" ? "×" : m1Op === "/" ? "÷" : m1Op} <span className="inline-flex items-center align-middle mx-1"><sup>{m1N2}</sup>&frasl;<sub>{m1D2}</sub></span> = ?
                      </div>
                      <p>
                        The Least Common Multiple (LCM) of {m1D1} and {m1D2} is <strong>{m1Result.lcmVal}</strong>. Multiply the numerator and denominator of each fraction by whatever value will result in the denominator of each fraction being equal to the LCM:
                      </p>
                      <div className="text-center font-semibold font-sans tabular-nums py-1">
                        <span className="inline-flex items-center align-middle mx-1"><sup>{m1N1}</sup>&frasl;<sub>{m1D1}</sub></span> + <span className="inline-flex items-center align-middle mx-1"><sup>{m1N2}</sup>&frasl;<sub>{m1D2}</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>{m1N1} × {m1Result.lcmVal / parseInt(m1D1, 10)}</sup>&frasl;<sub>{m1D1} × {m1Result.lcmVal / parseInt(m1D1, 10)}</sub></span> + <span className="inline-flex items-center align-middle mx-1"><sup>{m1N2} × {m1Result.lcmVal / parseInt(m1D2, 10)}</sup>&frasl;<sub>{m1D2} × {m1Result.lcmVal / parseInt(m1D2, 10)}</sub></span> = {m1Result.step2Str.replace("= ", "")}
                      </div>
                      <p>Now that the fractions have like denominators, add the numerators:</p>
                      <div className="text-center font-semibold font-sans tabular-nums py-1">
                        {m1Result.step2Str.replace("= ", "")} = {m1Result.step3Str.replace("= ", "")} = {m1Result.simplifiedStr}
                      </div>
                      <p>The result is: <strong>{m1Result.rawExpr} = {m1Result.simplifiedStr}</strong></p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}
      </section>


      {/* ========================================================================= */}
      {/* MODULE 2: MIXED NUMBERS CALCULATOR */}
      {/* ========================================================================= */}
      <section id="mixed-numbers-calculator" className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Mixed Numbers Calculator
        </h2>

        {/* Form Inputs */}
        <form onSubmit={handleM2Calculate} className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 max-w-xl">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <input
              type="text"
              value={m2Input1}
              onChange={(e) => setM2Input1(e.target.value)}
              placeholder="-2 3/4"
              aria-label="Mixed fraction 1"
              className="w-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600 text-center"
            />

            <select
              value={m2Op}
              onChange={(e) => setM2Op(e.target.value as "+" | "-" | "*" | "/")}
              aria-label="Operator"
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm font-black outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
            >
              <option value="+">+</option>
              <option value="-">−</option>
              <option value="*">×</option>
              <option value="/">÷</option>
            </select>

            <input
              type="text"
              value={m2Input2}
              onChange={(e) => setM2Input2(e.target.value)}
              placeholder="3 5/7"
              aria-label="Mixed fraction 2"
              className="w-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600 text-center"
            />

            <span className="font-bold text-sm ml-1">= ?</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={handleM2Clear}
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Results Banner & Steps Layout */}
        {m2Result && (
          <div className="space-y-3 max-w-xl">
            <div className="border border-blue-600 rounded overflow-hidden">
              <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 flex items-center justify-between">
                <span>Result</span>
                <button
                  type="button"
                  onClick={(e) => handleSaveResult(e, "m2", "Mixed Numbers Calculator", m2Result.rawExpr, m2Result.simplifiedStr)}
                  className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {savedSection === "m2" ? "Saved!" : "Save"}
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 text-xs font-sans space-y-3">
                <div className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 font-sans tabular-nums">
                  <span>{m2Result.rawExpr} =</span>
                  <strong className="text-blue-600 dark:text-blue-400 font-extrabold text-lg">{m2Result.simplifiedStr}</strong>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 font-sans tabular-nums">
                  Result in decimals: <strong className="text-slate-800 dark:text-slate-200">{m2Result.decimalStr}</strong>
                </div>

                {/* Calculation Steps Section */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">Calculation steps:</div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded border border-slate-200 dark:border-slate-700 font-sans tabular-nums text-xs leading-relaxed space-y-1 overflow-x-auto">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{m2Result.w1}<sup>{m2Result.n1}</sup>&frasl;<sub>{m2Result.d1}</sub> + {m2Result.w2}<sup>{m2Result.n2}</sup>&frasl;<sub>{m2Result.d2}</sub></p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{m2Result.step1Str}</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{m2Result.step2Str}</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{m2Result.step3Str}</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{m2Result.step4Str}</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{m2Result.step5Str}</p>
                  </div>
                </div>

                {/* Further Explanation Accordion */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setM2ShowFurther(!m2ShowFurther)}
                    className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
                  >
                    {m2ShowFurther ? "- Hide further explanation" : "+ Show further explanation"}
                  </button>

                  {m2ShowFurther && (
                    <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                      <div className="font-bold text-slate-900 dark:text-slate-100">Further explanation</div>
                      <p>Converting mixed numbers into improper fractions first:</p>
                      <p>First fraction: {m2Result.w1}<sup>{m2Result.n1}</sup>&frasl;<sub>{m2Result.d1}</sub> = {m2Result.impN1}/{m2Result.d1}</p>
                      <p>Second fraction: {m2Result.w2}<sup>{m2Result.n2}</sup>&frasl;<sub>{m2Result.d2}</sub> = {m2Result.impN2}/{m2Result.d2}</p>
                      <p>Result: <strong>{m2Result.simplifiedStr}</strong></p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}
      </section>


      {/* ========================================================================= */}
      {/* MODULE 3: SIMPLIFY FRACTIONS CALCULATOR */}
      {/* ========================================================================= */}
      <section id="simplify-fractions-calculator" className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Simplify Fractions Calculator
        </h2>

        {/* Form Inputs */}
        <form onSubmit={handleM3Calculate} className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 max-w-xl">
          <div className="flex items-center gap-3 text-xs font-semibold">
            {/* Optional Whole Input */}
            <input
              type="text"
              value={m3W}
              onChange={(e) => setM3W(e.target.value)}
              placeholder="2"
              aria-label="Whole part"
              className="w-20 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-3 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />

            {/* Numerator / Denominator Stack */}
            <div className="flex flex-col items-center gap-1">
              <input
                type="text"
                value={m3N}
                onChange={(e) => setM3N(e.target.value)}
                placeholder="21"
                aria-label="Numerator"
                className="w-24 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
              />
              <div className="w-24 h-0.5 bg-slate-900 dark:bg-slate-100" />
              <input
                type="text"
                value={m3D}
                onChange={(e) => setM3D(e.target.value)}
                placeholder="98"
                aria-label="Denominator"
                className="w-24 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <span className="font-bold text-sm ml-1">= ?</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={handleM3Clear}
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Results Banner & Steps Layout */}
        {m3Result && (
          <div className="space-y-3 max-w-xl">
            <div className="border border-blue-600 rounded overflow-hidden">
              <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 flex items-center justify-between">
                <span>Result</span>
                <button
                  type="button"
                  onClick={(e) => handleSaveResult(e, "m3", "Simplify Fractions", `${m3Result.w ? m3Result.w + " " : ""}${m3Result.n}/${m3Result.d}`, m3Result.mixedStr)}
                  className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {savedSection === "m3" ? "Saved!" : "Save"}
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 text-xs font-sans space-y-3">
                <div className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 font-sans tabular-nums">
                  <span>{m3Result.w ? `${m3Result.w} ` : ""}{m3Result.n}/{m3Result.d} =</span>
                  <strong className="text-blue-600 dark:text-blue-400 font-extrabold text-lg">{m3Result.mixedStr}</strong>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 font-sans tabular-nums">
                  Result in decimals: <strong className="text-slate-800 dark:text-slate-200">{m3Result.decimalStr}</strong>
                </div>

                {/* Calculation Steps Section */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">Calculation steps:</div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded border border-slate-200 dark:border-slate-700 font-sans tabular-nums text-xs leading-relaxed space-y-1 overflow-x-auto">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{m3Result.step1Str}</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{m3Result.step2Str}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </section>


      {/* ========================================================================= */}
      {/* MODULE 4: DECIMAL TO FRACTION CALCULATOR */}
      {/* ========================================================================= */}
      <section id="decimal-to-fraction-calculator" className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Decimal to Fraction Calculator
        </h2>

        {/* Form Inputs */}
        <form onSubmit={handleM4Calculate} className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 max-w-xl">
          <div className="flex items-center gap-3 text-xs font-semibold">
            <input
              type="text"
              value={m4Dec}
              onChange={(e) => setM4Dec(e.target.value)}
              placeholder="1.375"
              aria-label="Decimal value"
              className="w-40 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />
            <span className="font-bold text-sm">= ? / ?</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={handleM4Clear}
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Results Banner & Steps Layout */}
        {m4Result && (
          <div className="space-y-3 max-w-xl">
            <div className="border border-blue-600 rounded overflow-hidden">
              <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 flex items-center justify-between">
                <span>Result</span>
                <button
                  type="button"
                  onClick={(e) => handleSaveResult(e, "m4", "Decimal to Fraction", m4Dec, m4Result.resStr)}
                  className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {savedSection === "m4" ? "Saved!" : "Save"}
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 text-xs font-sans space-y-3">
                <div className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 font-sans tabular-nums">
                  <strong className="text-blue-600 dark:text-blue-400 font-extrabold text-lg">{m4Result.resStr}</strong>
                </div>

                {/* Calculation Steps Section */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">Calculation steps:</div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded border border-slate-200 dark:border-slate-700 font-sans tabular-nums text-xs leading-relaxed space-y-1 overflow-x-auto">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{m4Result.step1Str}</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{m4Result.step2Str}</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{m4Result.step3Str}</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{m4Result.step4Str}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </section>


      {/* ========================================================================= */}
      {/* MODULE 5: FRACTION TO DECIMAL CALCULATOR */}
      {/* ========================================================================= */}
      <section id="fraction-to-decimal-calculator" className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Fraction to Decimal Calculator
        </h2>

        {/* Form Inputs */}
        <form onSubmit={handleM5Calculate} className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 max-w-xl">
          <div className="flex items-center gap-3 text-xs font-semibold">
            <div className="flex flex-col items-center gap-1">
              <input
                type="text"
                value={m5N}
                onChange={(e) => setM5N(e.target.value)}
                placeholder="2"
                aria-label="Numerator"
                className="w-24 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
              />
              <div className="w-24 h-0.5 bg-slate-900 dark:bg-slate-100" />
              <input
                type="text"
                value={m5D}
                onChange={(e) => setM5D(e.target.value)}
                placeholder="7"
                aria-label="Denominator"
                className="w-24 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <span className="font-bold text-sm ml-1">= ?</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={handleM5Clear}
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Results Banner & Steps Layout */}
        {m5Result && (
          <div className="space-y-3 max-w-xl">
            <div className="border border-blue-600 rounded overflow-hidden">
              <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 flex items-center justify-between">
                <span>Result</span>
                <button
                  type="button"
                  onClick={(e) => handleSaveResult(e, "m5", "Fraction to Decimal", `${m5N}/${m5D}`, m5Result.decimalStr)}
                  className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {savedSection === "m5" ? "Saved!" : "Save"}
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 text-xs font-sans space-y-3">
                <div className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 font-sans tabular-nums">
                  <span>{m5N}/{m5D} =</span>
                  <strong className="text-blue-600 dark:text-blue-400 font-extrabold text-lg">{m5Result.decimalStr}</strong>
                </div>

                {/* Calculation Steps Section */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">Calculation steps:</div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded border border-slate-200 dark:border-slate-700 font-sans tabular-nums text-xs leading-relaxed space-y-1 overflow-x-auto">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{m5Result.stepStr}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </section>


      {/* ========================================================================= */}
      {/* MODULE 6: BIG NUMBER FRACTION CALCULATOR */}
      {/* ========================================================================= */}
      <section id="big-number-fraction-calculator" className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Big Number Fraction Calculator
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Use this calculator if the numerators or denominators are very big integers.
        </p>

        {/* Form Inputs */}
        <form onSubmit={handleM6Calculate} className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 max-w-xl">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            {/* Big Fraction 1 */}
            <div className="flex flex-col items-center gap-1">
              <input
                type="text"
                value={m6N1}
                onChange={(e) => setM6N1(e.target.value)}
                placeholder="1234"
                aria-label="Big Numerator 1"
                className="w-48 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
              />
              <div className="w-48 h-0.5 bg-slate-900 dark:bg-slate-100" />
              <input
                type="text"
                value={m6D1}
                onChange={(e) => setM6D1(e.target.value)}
                placeholder="748892928829"
                aria-label="Big Denominator 1"
                className="w-48 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* Operator */}
            <select
              value={m6Op}
              onChange={(e) => setM6Op(e.target.value as "+" | "-" | "*" | "/")}
              aria-label="Operator"
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm font-black outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
            >
              <option value="+">+</option>
              <option value="-">−</option>
              <option value="*">×</option>
              <option value="/">÷</option>
            </select>

            {/* Big Fraction 2 */}
            <div className="flex flex-col items-center gap-1">
              <input
                type="text"
                value={m6N2}
                onChange={(e) => setM6N2(e.target.value)}
                placeholder="3343442113223234333"
                aria-label="Big Numerator 2"
                className="w-48 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
              />
              <div className="w-48 h-0.5 bg-slate-900 dark:bg-slate-100" />
              <input
                type="text"
                value={m6D2}
                onChange={(e) => setM6D2(e.target.value)}
                placeholder="88772773882888288288"
                aria-label="Big Denominator 2"
                className="w-48 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <span className="font-bold text-sm ml-1">= ?</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={handleM6Clear}
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Results Banner & Steps Layout */}
        {m6Result && (
          <div className="space-y-3 max-w-xl">
            <div className="border border-blue-600 rounded overflow-hidden">
              <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 flex items-center justify-between">
                <span>Result</span>
                <button
                  type="button"
                  onClick={(e) => handleSaveResult(e, "m6", "Big Number Fraction", m6Result.rawExpr, `${m6Result.simpNStr}/${m6Result.simpDStr}`)}
                  className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {savedSection === "m6" ? "Saved!" : "Save"}
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 text-xs font-sans space-y-3">
                <div className="text-base font-bold text-slate-900 dark:text-slate-100 space-y-1 font-sans tabular-nums break-all">
                  <div>Simplified Fraction:</div>
                  <strong className="text-blue-600 dark:text-blue-400 font-extrabold text-sm block">{m6Result.simpNStr} / {m6Result.simpDStr}</strong>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 font-sans tabular-nums">
                  Decimal approximation: <strong className="text-slate-800 dark:text-slate-200">{m6Result.decimalStr}</strong>
                </div>

                {/* Calculation Steps Section */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">Calculation steps:</div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded border border-slate-200 dark:border-slate-700 font-sans tabular-nums text-xs leading-relaxed space-y-1 overflow-x-auto break-all">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{m6Result.step1Str}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </section>


      {/* ========================================================================= */}
      {/* SAVED CALCULATIONS HISTORY */}
      {/* ========================================================================= */}
      {savedItems.length > 0 && (
        <section className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
              <span>Saved Calculations ({savedItems.length})</span>
            </h3>
            <button
              type="button"
              onClick={handleClearAllSaved}
              className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2">
            {savedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-3 rounded border border-slate-200 dark:border-slate-700 text-xs font-sans"
              >
                <div className="space-y-0.5 min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{item.title}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.timestamp}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 truncate font-sans tabular-nums">
                    {item.expression} = <strong className="text-blue-600 dark:text-blue-400">{item.result}</strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteSaved(item.id)}
                  className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer shrink-0"
                  title="Delete calculation"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
