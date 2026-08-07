const fs = require("fs");
const path = require("path");

const calculators = [
  // GENERAL MATH (20)
  {
    slug: "scientific-calculator",
    id: "scientific-calculator",
    title: "Scientific Calculator",
    subcategory: "General Math",
    iconName: "Calculator",
    description: "Perform advanced scientific calculations including trigonometry, logarithms, factorials, and exponents.",
    keywords: ["scientific calculator", "trigonometry", "logarithm", "sin cos tan", "math solver"],
    relatedCalculators: ["exponent-calculator", "log-calculator", "root-calculator"],
    inputs: [
      { name: "value1", label: "First Number (X)", type: "number", defaultValue: 45, min: -1e9, max: 1e9, step: 1 },
      { name: "operation", label: "Operation", type: "select", defaultValue: "sin", options: [
        { label: "Sine (sin X)", value: "sin" },
        { label: "Cosine (cos X)", value: "cos" },
        { label: "Tangent (tan X)", value: "tan" },
        { label: "Natural Log (ln X)", value: "ln" },
        { label: "Square Root (√X)", value: "sqrt" },
        { label: "Factorial (X!)", value: "factorial" }
      ] }
    ],
    outputs: [
      { name: "result", label: "Calculated Result", format: "number", highlight: true },
      { name: "explanation", label: "Operation Summary", format: "text" }
    ],
    calcLogic: `
  const x = Number(inputs.value1) || 0;
  const op = inputs.operation || "sin";
  let res = 0;
  let exp = "";
  if (op === "sin") { res = Math.sin((x * Math.PI) / 180); exp = \`sin(\${x}°)\`; }
  else if (op === "cos") { res = Math.cos((x * Math.PI) / 180); exp = \`cos(\${x}°)\`; }
  else if (op === "tan") { res = Math.tan((x * Math.PI) / 180); exp = \`tan(\${x}°)\`; }
  else if (op === "ln") { res = x > 0 ? Math.log(x) : 0; exp = \`ln(\${x})\`; }
  else if (op === "sqrt") { res = x >= 0 ? Math.sqrt(x) : 0; exp = \`√(\${x})\`; }
  else if (op === "factorial") {
    let f = 1;
    const n = Math.min(170, Math.max(0, Math.floor(x)));
    for (let i = 1; i <= n; i++) f *= i;
    res = f;
    exp = \`\${n}!\`;
  }
  return { result: parseFloat(res.toFixed(6)), explanation: exp };
`,
    formulaStr: "Scientific evaluation using standard mathematical & trigonometric functions.",
    faqs: [
      { question: "Are trigonometric functions calculated in degrees?", answer: "Yes, angles in this calculator are converted from degrees to radians automatically." }
    ]
  },
  {
    slug: "fraction-calculator",
    id: "fraction-calculator",
    title: "Fraction Calculator",
    subcategory: "General Math",
    iconName: "Divide",
    description: "Add, subtract, multiply, and divide fractions with step-by-step reduction to simplest form.",
    keywords: ["fraction calculator", "fractions", "add fractions", "simplify fraction", "mixed numbers"],
    relatedCalculators: ["ratio-calculator", "percentage-calculator"],
    inputs: [
      { name: "num1", label: "Numerator 1", type: "number", defaultValue: 3, min: -1000, max: 1000, step: 1 },
      { name: "den1", label: "Denominator 1", type: "number", defaultValue: 4, min: 1, max: 1000, step: 1 },
      { name: "operation", label: "Operator", type: "select", defaultValue: "+", options: [
        { label: "Addition (+)", value: "+" },
        { label: "Subtraction (-)", value: "-" },
        { label: "Multiplication (×)", value: "*" },
        { label: "Division (÷)", value: "/" }
      ] },
      { name: "num2", label: "Numerator 2", type: "number", defaultValue: 1, min: -1000, max: 1000, step: 1 },
      { name: "den2", label: "Denominator 2", type: "number", defaultValue: 2, min: 1, max: 1000, step: 1 }
    ],
    outputs: [
      { name: "resultFraction", label: "Simplified Fraction", format: "text", highlight: true },
      { name: "decimalValue", label: "Decimal Equivalent", format: "number" },
      { name: "mixedNumber", label: "Mixed Number", format: "text" }
    ],
    calcLogic: `
  const n1 = Number(inputs.num1) || 0;
  const d1 = Math.max(1, Number(inputs.den1) || 1);
  const n2 = Number(inputs.num2) || 0;
  const d2 = Math.max(1, Number(inputs.den2) || 1);
  const op = inputs.operation || "+";
  let numRes = 0, denRes = 1;
  if (op === "+") { numRes = n1 * d2 + n2 * d1; denRes = d1 * d2; }
  else if (op === "-") { numRes = n1 * d2 - n2 * d1; denRes = d1 * d2; }
  else if (op === "*") { numRes = n1 * n2; denRes = d1 * d2; }
  else if (op === "/") { numRes = n1 * d2; denRes = d1 * n2; }
  if (denRes === 0) return { resultFraction: "Undefined (div by 0)", decimalValue: 0, mixedNumber: "N/A" };
  const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
  const g = gcd(numRes, denRes);
  const finalNum = numRes / g;
  const finalDen = denRes / g;
  const dec = parseFloat((finalNum / finalDen).toFixed(4));
  let mixed = \`\${finalNum}/\${finalDen}\`;
  if (Math.abs(finalNum) >= finalDen && finalDen !== 1) {
    const whole = Math.floor(Math.abs(finalNum) / finalDen) * Math.sign(finalNum);
    const rem = Math.abs(finalNum) % finalDen;
    mixed = \`\${whole} \${rem}/\${finalDen}\`;
  }
  return { resultFraction: \`\${finalNum}/\${finalDen}\`, decimalValue: dec, mixedNumber: mixed };
`,
    formulaStr: "a/b ± c/d = (ad ± bc) / bd; simplified via Greatest Common Divisor.",
    faqs: [
      { question: "How is a fraction simplified?", answer: "By dividing both the numerator and denominator by their greatest common factor (GCF)." }
    ]
  },
  {
    slug: "percentage-calculator",
    id: "percentage-calculator",
    title: "Percentage Calculator",
    subcategory: "General Math",
    iconName: "Percent",
    description: "Calculate percentage values, percentage changes, increases, decreases, and proportions.",
    keywords: ["percentage", "percent change", "percent increase", "discount", "proportion"],
    relatedCalculators: ["percent-error-calculator", "fraction-calculator", "ratio-calculator"],
    inputs: [
      { name: "calcType", label: "Calculation Type", type: "select", defaultValue: "what_is_x_pct_of_y", options: [
        { label: "What is X% of Y?", value: "what_is_x_pct_of_y" },
        { label: "X is what % of Y?", value: "x_is_what_pct_of_y" },
        { label: "% Increase/Decrease from X to Y", value: "pct_change" }
      ] },
      { name: "valueX", label: "Value X", type: "number", defaultValue: 20, min: -1e9, max: 1e9, step: 1 },
      { name: "valueY", label: "Value Y", type: "number", defaultValue: 150, min: -1e9, max: 1e9, step: 1 }
    ],
    outputs: [
      { name: "result", label: "Calculated Result", format: "number", highlight: true },
      { name: "summary", label: "Explanation", format: "text" }
    ],
    calcLogic: `
  const type = inputs.calcType || "what_is_x_pct_of_y";
  const x = Number(inputs.valueX) || 0;
  const y = Number(inputs.valueY) || 0;
  let res = 0;
  let summary = "";
  if (type === "what_is_x_pct_of_y") {
    res = (x / 100) * y;
    summary = \`\${x}% of \${y} is \${res}\`;
  } else if (type === "x_is_what_pct_of_y") {
    res = y !== 0 ? (x / y) * 100 : 0;
    summary = \`\${x} is \${res.toFixed(2)}% of \${y}\`;
  } else {
    res = x !== 0 ? ((y - x) / Math.abs(x)) * 100 : 0;
    summary = \`Change from \${x} to \${y} is \${res.toFixed(2)}%\`;
  }
  return { result: parseFloat(res.toFixed(4)), summary };
`,
    formulaStr: "Percentage = (Part / Whole) × 100",
    faqs: [
      { question: "How do I calculate percent change?", answer: "Subtract the original value from the new value, divide by the original value, and multiply by 100." }
    ]
  },
  {
    slug: "random-number-generator",
    id: "random-number-generator",
    title: "Random Number Generator",
    subcategory: "General Math",
    iconName: "Shuffle",
    description: "Generate bounded pseudo-random integers or floating point numbers instantly.",
    keywords: ["random number", "rng", "random generator", "dice roll", "probability"],
    relatedCalculators: ["probability-calculator", "statistics-calculator"],
    inputs: [
      { name: "min", label: "Minimum Bound", type: "number", defaultValue: 1, min: -1000000, max: 1000000, step: 1 },
      { name: "max", label: "Maximum Bound", type: "number", defaultValue: 100, min: -1000000, max: 1000000, step: 1 },
      { name: "count", label: "Quantity to Generate", type: "number", defaultValue: 5, min: 1, max: 50, step: 1 }
    ],
    outputs: [
      { name: "generatedList", label: "Generated Random Numbers", format: "text", highlight: true },
      { name: "average", label: "Average Value", format: "number" },
      { name: "sum", label: "Sum of Generated Numbers", format: "number" }
    ],
    calcLogic: `
  const min = Number(inputs.min) || 1;
  const max = Math.max(min, Number(inputs.max) || 100);
  const count = Math.min(50, Math.max(1, Number(inputs.count) || 5));
  const nums: number[] = [];
  for (let i = 0; i < count; i++) {
    nums.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  const sum = nums.reduce((a, b) => a + b, 0);
  const avg = parseFloat((sum / count).toFixed(2));
  return { generatedList: nums.join(", "), average: avg, sum };
`,
    formulaStr: "Random Integer = Math.floor(Math.random() × (Max - Min + 1)) + Min",
    faqs: [
      { question: "Are these numbers truly random?", answer: "They are pseudo-random numbers generated using cryptographic PRNG algorithms." }
    ]
  },
  {
    slug: "percent-error-calculator",
    id: "percent-error-calculator",
    title: "Percent Error Calculator",
    subcategory: "General Math",
    iconName: "AlertCircle",
    description: "Calculate percent error between experimental results and accepted theoretical values.",
    keywords: ["percent error", "error percentage", "experimental error", "accuracy"],
    relatedCalculators: ["percentage-calculator", "rounding-calculator"],
    inputs: [
      { name: "expVal", label: "Experimental / Measured Value", type: "number", defaultValue: 9.5, min: -1e6, max: 1e6, step: 0.1 },
      { name: "theoVal", label: "Theoretical / Accepted Value", type: "number", defaultValue: 9.8, min: -1e6, max: 1e6, step: 0.1 }
    ],
    outputs: [
      { name: "percentError", label: "Percent Error (%)", format: "percentage", highlight: true },
      { name: "absoluteError", label: "Absolute Error", format: "number" }
    ],
    calcLogic: `
  const exp = Number(inputs.expVal) || 0;
  const theo = Number(inputs.theoVal) || 9.8;
  const absError = Math.abs(exp - theo);
  const pctError = theo !== 0 ? (absError / Math.abs(theo)) * 100 : 0;
  return {
    percentError: parseFloat(pctError.toFixed(3)),
    absoluteError: parseFloat(absError.toFixed(4))
  };
`,
    formulaStr: "Percent Error = |Experimental - Theoretical| / |Theoretical| × 100%",
    faqs: [
      { question: "Why is percent error always positive?", answer: "Because absolute value is taken of the difference between experimental and accepted values." }
    ]
  },
  {
    slug: "exponent-calculator",
    id: "exponent-calculator",
    title: "Exponent Calculator",
    subcategory: "General Math",
    iconName: "Superscript",
    description: "Calculate powers, exponents, and base numbers raised to negative or fractional powers.",
    keywords: ["exponent calculator", "power calculator", "base power", "scientific notation"],
    relatedCalculators: ["scientific-notation-calculator", "log-calculator", "root-calculator"],
    inputs: [
      { name: "base", label: "Base (b)", type: "number", defaultValue: 2, min: -100, max: 100, step: 1 },
      { name: "exponent", label: "Exponent (n)", type: "number", defaultValue: 10, min: -50, max: 50, step: 1 }
    ],
    outputs: [
      { name: "result", label: "Calculated Power (b^n)", format: "number", highlight: true },
      { name: "scientificNotation", label: "Scientific Notation", format: "text" }
    ],
    calcLogic: `
  const b = Number(inputs.base) || 2;
  const n = Number(inputs.exponent) || 10;
  const res = Math.pow(b, n);
  return {
    result: res,
    scientificNotation: res.toExponential(4)
  };
`,
    formulaStr: "Result = Base ^ Exponent",
    faqs: [
      { question: "What is a negative exponent?", answer: "A negative exponent indicates the reciprocal of the base raised to the positive power: b^(-n) = 1 / (b^n)." }
    ]
  },
  {
    slug: "binary-calculator",
    id: "binary-calculator",
    title: "Binary Calculator",
    subcategory: "General Math",
    iconName: "Binary",
    description: "Perform binary arithmetic addition, subtraction, multiplication, and base conversions.",
    keywords: ["binary calculator", "base 2", "binary to decimal", "binary arithmetic"],
    relatedCalculators: ["hex-calculator", "scientific-calculator"],
    inputs: [
      { name: "binary1", label: "Binary Number 1", type: "text", defaultValue: "1010" },
      { name: "operation", label: "Operation", type: "select", defaultValue: "+", options: [
        { label: "Addition (+)", value: "+" },
        { label: "Subtraction (-)", value: "-" },
        { label: "Multiplication (×)", value: "*" }
      ] },
      { name: "binary2", label: "Binary Number 2", type: "text", defaultValue: "0110" }
    ],
    outputs: [
      { name: "binaryResult", label: "Binary Result", format: "text", highlight: true },
      { name: "decimalResult", label: "Decimal Value", format: "number" },
      { name: "hexResult", label: "Hexadecimal Value", format: "text" }
    ],
    calcLogic: `
  const b1 = parseInt(String(inputs.binary1 || "1010"), 2) || 0;
  const b2 = parseInt(String(inputs.binary2 || "0110"), 2) || 0;
  const op = inputs.operation || "+";
  let dec = 0;
  if (op === "+") dec = b1 + b2;
  else if (op === "-") dec = b1 - b2;
  else if (op === "*") dec = b1 * b2;
  const binStr = (dec >= 0 ? dec.toString(2) : "-" + Math.abs(dec).toString(2));
  const hexStr = (dec >= 0 ? dec.toString(16).toUpperCase() : "-" + Math.abs(dec).toString(16).toUpperCase());
  return { binaryResult: binStr, decimalResult: dec, hexResult: hexStr };
`,
    formulaStr: "Base-2 (Binary) Arithmetic & Decimal Conversion",
    faqs: [
      { question: "How do you convert binary to decimal?", answer: "Multiply each bit by 2 raised to the power of its position index from right to left." }
    ]
  },
  {
    slug: "hex-calculator",
    id: "hex-calculator",
    title: "Hex Calculator",
    subcategory: "General Math",
    iconName: "Hash",
    description: "Perform hexadecimal addition, subtraction, and conversion between hex, binary, and decimal.",
    keywords: ["hex calculator", "hexadecimal", "base 16", "hex to decimal"],
    relatedCalculators: ["binary-calculator", "scientific-calculator"],
    inputs: [
      { name: "hex1", label: "Hex Number 1", type: "text", defaultValue: "1A" },
      { name: "operation", label: "Operation", type: "select", defaultValue: "+", options: [
        { label: "Addition (+)", value: "+" },
        { label: "Subtraction (-)", value: "-" },
        { label: "Multiplication (×)", value: "*" }
      ] },
      { name: "hex2", label: "Hex Number 2", type: "text", defaultValue: "0F" }
    ],
    outputs: [
      { name: "hexResult", label: "Hexadecimal Result", format: "text", highlight: true },
      { name: "decimalResult", label: "Decimal Value", format: "number" },
      { name: "binaryResult", label: "Binary Value", format: "text" }
    ],
    calcLogic: `
  const h1 = parseInt(String(inputs.hex1 || "1A"), 16) || 0;
  const h2 = parseInt(String(inputs.hex2 || "0F"), 16) || 0;
  const op = inputs.operation || "+";
  let dec = 0;
  if (op === "+") dec = h1 + h2;
  else if (op === "-") dec = h1 - h2;
  else if (op === "*") dec = h1 * h2;
  const hexStr = (dec >= 0 ? dec.toString(16).toUpperCase() : "-" + Math.abs(dec).toString(16).toUpperCase());
  const binStr = (dec >= 0 ? dec.toString(2) : "-" + Math.abs(dec).toString(2));
  return { hexResult: hexStr, decimalResult: dec, binaryResult: binStr };
`,
    formulaStr: "Base-16 (Hexadecimal) Arithmetic & Conversion",
    faqs: [
      { question: "What numbers are used in hexadecimal?", answer: "Hexadecimal uses digits 0-9 and letters A-F representing values 10-15." }
    ]
  },
  {
    slug: "half-life-calculator",
    id: "half-life-calculator",
    title: "Half-Life Calculator",
    subcategory: "General Math",
    iconName: "Clock",
    description: "Calculate radioactive decay, half-life duration, initial amount, or remaining substance quantity.",
    keywords: ["half life", "radioactive decay", "decay constant", "exponential decay"],
    relatedCalculators: ["exponent-calculator", "log-calculator"],
    inputs: [
      { name: "initialAmount", label: "Initial Quantity (N₀)", type: "number", defaultValue: 100, min: 0, max: 1e9, step: 1 },
      { name: "halfLife", label: "Half-Life Time (t½)", type: "number", defaultValue: 5, min: 0.001, max: 1e6, step: 0.1 },
      { name: "elapsedTime", label: "Elapsed Time (t)", type: "number", defaultValue: 15, min: 0, max: 1e6, step: 1 }
    ],
    outputs: [
      { name: "remainingAmount", label: "Remaining Quantity N(t)", format: "number", highlight: true },
      { name: "pctRemaining", label: "Percentage Remaining", format: "percentage" },
      { name: "decayConstant", label: "Decay Constant (λ)", format: "number" }
    ],
    calcLogic: `
  const n0 = Math.max(0, Number(inputs.initialAmount) || 100);
  const hl = Math.max(0.0001, Number(inputs.halfLife) || 5);
  const t = Math.max(0, Number(inputs.elapsedTime) || 15);
  const remaining = n0 * Math.pow(0.5, t / hl);
  const pct = n0 > 0 ? (remaining / n0) * 100 : 0;
  const lambda = Math.LN2 / hl;
  return {
    remainingAmount: parseFloat(remaining.toFixed(4)),
    pctRemaining: parseFloat(pct.toFixed(2)),
    decayConstant: parseFloat(lambda.toFixed(6))
  };
`,
    formulaStr: "N(t) = N₀ × (1/2)^(t / t½)",
    faqs: [
      { question: "What is half-life?", answer: "Half-life is the time required for a quantity to reduce to half of its initial value." }
    ]
  },
  {
    slug: "quadratic-formula-calculator",
    id: "quadratic-formula-calculator",
    title: "Quadratic Formula Calculator",
    subcategory: "General Math",
    iconName: "Variable",
    description: "Solve quadratic equations ax² + bx + c = 0 and find real/complex roots and vertex points.",
    keywords: ["quadratic formula", "quadratic equation", "roots", "discriminant", "parabola vertex"],
    relatedCalculators: ["scientific-calculator", "root-calculator"],
    inputs: [
      { name: "coeffA", label: "Coefficient a", type: "number", defaultValue: 1, min: -1000, max: 1000, step: 1 },
      { name: "coeffB", label: "Coefficient b", type: "number", defaultValue: -5, min: -1000, max: 1000, step: 1 },
      { name: "coeffC", label: "Coefficient c", type: "number", defaultValue: 6, min: -1000, max: 1000, step: 1 }
    ],
    outputs: [
      { name: "root1", label: "Root x₁", format: "text", highlight: true },
      { name: "root2", label: "Root x₂", format: "text" },
      { name: "discriminant", label: "Discriminant (Δ)", format: "number" },
      { name: "vertex", label: "Parabola Vertex (h, k)", format: "text" }
    ],
    calcLogic: `
  const a = Number(inputs.coeffA) || 1;
  const b = Number(inputs.coeffB) || -5;
  const c = Number(inputs.coeffC) || 6;
  if (a === 0) return { root1: "Not quadratic (a=0)", root2: "N/A", discriminant: 0, vertex: "N/A" };
  const disc = b * b - 4 * a * c;
  let r1 = "", r2 = "";
  if (disc >= 0) {
    const x1 = (-b + Math.sqrt(disc)) / (2 * a);
    const x2 = (-b - Math.sqrt(disc)) / (2 * a);
    r1 = x1.toFixed(3);
    r2 = x2.toFixed(3);
  } else {
    const realPart = (-b / (2 * a)).toFixed(3);
    const imagPart = (Math.sqrt(-disc) / (2 * a)).toFixed(3);
    r1 = \`\${realPart} + \${imagPart}i\`;
    r2 = \`\${realPart} - \${imagPart}i\`;
  }
  const vertexH = (-b / (2 * a)).toFixed(2);
  const vertexK = (c - (b * b) / (4 * a)).toFixed(2);
  return { root1: r1, root2: r2, discriminant: disc, vertex: \`(\${vertexH}, \${vertexK})\` };
`,
    formulaStr: "x = (-b ± √(b² - 4ac)) / (2a)",
    faqs: [
      { question: "What does the discriminant tell you?", answer: "If Δ > 0 there are 2 real roots; if Δ = 0 there is 1 real root; if Δ < 0 there are 2 complex roots." }
    ]
  },
  {
    slug: "log-calculator",
    id: "log-calculator",
    title: "Log Calculator",
    subcategory: "General Math",
    iconName: "FunctionSquare",
    description: "Calculate logarithms for any custom base, natural log (ln), and common log (log₁₀).",
    keywords: ["log calculator", "logarithm", "natural log", "ln", "log base 10"],
    relatedCalculators: ["exponent-calculator", "scientific-calculator"],
    inputs: [
      { name: "value", label: "Value (X)", type: "number", defaultValue: 100, min: 0.0001, max: 1e9, step: 1 },
      { name: "base", label: "Base (b)", type: "number", defaultValue: 10, min: 0.0001, max: 1000, step: 1 }
    ],
    outputs: [
      { name: "logResult", label: "Log_b (X)", format: "number", highlight: true },
      { name: "lnResult", label: "Natural Log ln(X)", format: "number" },
      { name: "log10Result", label: "Common Log log10(X)", format: "number" }
    ],
    calcLogic: `
  const x = Math.max(0.00001, Number(inputs.value) || 100);
  const b = Math.max(0.00001, Number(inputs.base) || 10);
  const logRes = b !== 1 ? Math.log(x) / Math.log(b) : 0;
  return {
    logResult: parseFloat(logRes.toFixed(6)),
    lnResult: parseFloat(Math.log(x).toFixed(6)),
    log10Result: parseFloat(Math.log10(x).toFixed(6))
  };
`,
    formulaStr: "log_b(X) = ln(X) / ln(b)",
    faqs: [
      { question: "What is natural log?", answer: "Natural log (ln) is a logarithm with base e (Euler's number ≈ 2.71828)." }
    ]
  },
  {
    slug: "ratio-calculator",
    id: "ratio-calculator",
    title: "Ratio Calculator",
    subcategory: "General Math",
    iconName: "Scale",
    description: "Solve ratio proportions (A : B = C : X) and simplify ratios into lowest terms.",
    keywords: ["ratio calculator", "proportions", "simplify ratio", "ratio scale"],
    relatedCalculators: ["fraction-calculator", "percentage-calculator"],
    inputs: [
      { name: "valA", label: "Value A", type: "number", defaultValue: 4, min: 0.01, max: 10000, step: 1 },
      { name: "valB", label: "Value B", type: "number", defaultValue: 16, min: 0.01, max: 10000, step: 1 },
      { name: "valC", label: "Value C", type: "number", defaultValue: 10, min: 0.01, max: 10000, step: 1 }
    ],
    outputs: [
      { name: "valX", label: "Solved Value X (A:B = C:X)", format: "number", highlight: true },
      { name: "simplifiedRatio", label: "Simplified Ratio (A:B)", format: "text" }
    ],
    calcLogic: `
  const a = Number(inputs.valA) || 4;
  const b = Number(inputs.valB) || 16;
  const c = Number(inputs.valC) || 10;
  const x = a !== 0 ? (b * c) / a : 0;
  const gcd = (p: number, q: number): number => (q === 0 ? p : gcd(q, p % q));
  const g = gcd(Math.abs(Math.round(a)), Math.abs(Math.round(b)));
  const simA = Math.round(a) / (g || 1);
  const simB = Math.round(b) / (g || 1);
  return { valX: parseFloat(x.toFixed(4)), simplifiedRatio: \`\${simA} : \${simB}\` };
`,
    formulaStr: "A / B = C / X  =>  X = (B × C) / A",
    faqs: [
      { question: "How do you solve a ratio proportion?", answer: "Cross-multiply the outer and inner terms: A × X = B × C." }
    ]
  },
  {
    slug: "root-calculator",
    id: "root-calculator",
    title: "Root Calculator",
    subcategory: "General Math",
    iconName: "Radical",
    description: "Calculate square roots, cube roots, and nth roots for any real positive number.",
    keywords: ["root calculator", "square root", "cube root", "nth root", "radical"],
    relatedCalculators: ["exponent-calculator", "scientific-calculator"],
    inputs: [
      { name: "value", label: "Radicand (X)", type: "number", defaultValue: 64, min: 0, max: 1e9, step: 1 },
      { name: "degree", label: "Root Degree (n)", type: "number", defaultValue: 3, min: 1, max: 100, step: 1 }
    ],
    outputs: [
      { name: "rootResult", label: "nth Root Result (ⁿ√X)", format: "number", highlight: true },
      { name: "squareRoot", label: "Square Root (√X)", format: "number" }
    ],
    calcLogic: `
  const x = Math.max(0, Number(inputs.value) || 64);
  const n = Math.max(1, Number(inputs.degree) || 3);
  const root = Math.pow(x, 1 / n);
  return {
    rootResult: parseFloat(root.toFixed(6)),
    squareRoot: parseFloat(Math.sqrt(x).toFixed(6))
  };
`,
    formulaStr: "ⁿ√X = X^(1/n)",
    faqs: [
      { question: "What is a cube root?", answer: "The cube root of a number is the value that when multiplied by itself three times yields the original number." }
    ]
  },
  {
    slug: "lcm-calculator",
    id: "lcm-calculator",
    title: "Least Common Multiple (LCM) Calculator",
    subcategory: "General Math",
    iconName: "Grid",
    description: "Find the Least Common Multiple (LCM) of two or three numbers instantly.",
    keywords: ["lcm calculator", "least common multiple", "lcm", "common multiple"],
    relatedCalculators: ["gcf-calculator", "factor-calculator"],
    inputs: [
      { name: "num1", label: "Number 1", type: "number", defaultValue: 12, min: 1, max: 100000, step: 1 },
      { name: "num2", label: "Number 2", type: "number", defaultValue: 18, min: 1, max: 100000, step: 1 },
      { name: "num3", label: "Number 3 (Optional)", type: "number", defaultValue: 24, min: 1, max: 100000, step: 1 }
    ],
    outputs: [
      { name: "lcm", label: "Least Common Multiple (LCM)", format: "number", highlight: true },
      { name: "gcf", label: "Greatest Common Factor (GCF)", format: "number" }
    ],
    calcLogic: `
  const a = Math.max(1, Math.floor(Number(inputs.num1) || 12));
  const b = Math.max(1, Math.floor(Number(inputs.num2) || 18));
  const c = Math.max(1, Math.floor(Number(inputs.num3) || 24));
  const gcd2 = (x: number, y: number): number => (y === 0 ? x : gcd2(y, x % y));
  const lcm2 = (x: number, y: number): number => (x * y) / gcd2(x, y);
  const lcmRes = lcm2(lcm2(a, b), c);
  const gcfRes = gcd2(gcd2(a, b), c);
  return { lcm: lcmRes, gcf: gcfRes };
`,
    formulaStr: "LCM(a, b) = (a × b) / GCF(a, b)",
    faqs: [
      { question: "What is LCM?", answer: "LCM is the smallest positive integer that is divisible by each of the given numbers." }
    ]
  },
  {
    slug: "gcf-calculator",
    id: "gcf-calculator",
    title: "Greatest Common Factor (GCF) Calculator",
    subcategory: "General Math",
    iconName: "Layers",
    description: "Calculate the Greatest Common Factor (GCF / HCF) of multiple integers.",
    keywords: ["gcf calculator", "hcf", "greatest common factor", "highest common factor"],
    relatedCalculators: ["lcm-calculator", "factor-calculator"],
    inputs: [
      { name: "num1", label: "Number 1", type: "number", defaultValue: 36, min: 1, max: 100000, step: 1 },
      { name: "num2", label: "Number 2", type: "number", defaultValue: 60, min: 1, max: 100000, step: 1 },
      { name: "num3", label: "Number 3 (Optional)", type: "number", defaultValue: 96, min: 1, max: 100000, step: 1 }
    ],
    outputs: [
      { name: "gcf", label: "Greatest Common Factor (GCF)", format: "number", highlight: true },
      { name: "lcm", label: "Least Common Multiple (LCM)", format: "number" }
    ],
    calcLogic: `
  const a = Math.max(1, Math.floor(Number(inputs.num1) || 36));
  const b = Math.max(1, Math.floor(Number(inputs.num2) || 60));
  const c = Math.max(1, Math.floor(Number(inputs.num3) || 96));
  const gcd2 = (x: number, y: number): number => (y === 0 ? x : gcd2(y, x % y));
  const lcm2 = (x: number, y: number): number => (x * y) / gcd2(x, y);
  const gcfRes = gcd2(gcd2(a, b), c);
  const lcmRes = lcm2(lcm2(a, b), c);
  return { gcf: gcfRes, lcm: lcmRes };
`,
    formulaStr: "Euclidean Algorithm for GCF",
    faqs: [
      { question: "Is GCF the same as HCF?", answer: "Yes, Greatest Common Factor (GCF) and Highest Common Factor (HCF) refer to the exact same math concept." }
    ]
  },
  {
    slug: "factor-calculator",
    id: "factor-calculator",
    title: "Factor Calculator",
    subcategory: "General Math",
    iconName: "ListFilter",
    description: "Find all factors, factor pairs, and prime factorization of any positive integer.",
    keywords: ["factor calculator", "factors", "prime factorization", "prime numbers"],
    relatedCalculators: ["gcf-calculator", "lcm-calculator"],
    inputs: [
      { name: "number", label: "Target Integer", type: "number", defaultValue: 120, min: 1, max: 1000000, step: 1 }
    ],
    outputs: [
      { name: "factorsList", label: "All Factors", format: "text", highlight: true },
      { name: "primeFactors", label: "Prime Factorization", format: "text" },
      { name: "factorCount", label: "Total Number of Factors", format: "number" }
    ],
    calcLogic: `
  const n = Math.min(1000000, Math.max(1, Math.floor(Number(inputs.number) || 120)));
  const factors: number[] = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      factors.push(i);
      if (i * i !== n) factors.push(n / i);
    }
  }
  factors.sort((a, b) => a - b);
  let temp = n;
  const primes: number[] = [];
  let divisor = 2;
  while (temp >= 2) {
    if (temp % divisor === 0) {
      primes.push(divisor);
      temp /= divisor;
    } else divisor++;
  }
  return {
    factorsList: factors.join(", "),
    primeFactors: primes.join(" × "),
    factorCount: factors.length
  };
`,
    formulaStr: "Integer Factorization & Prime Factor Decomposition",
    faqs: [
      { question: "What is prime factorization?", answer: "Writing a composite number as the product of prime numbers." }
    ]
  },
  {
    slug: "rounding-calculator",
    id: "rounding-calculator",
    title: "Rounding Calculator",
    subcategory: "General Math",
    iconName: "Binary",
    description: "Round numbers to specified decimal places, nearest 10, 100, floor, or ceiling.",
    keywords: ["rounding calculator", "round number", "floor", "ceil", "decimal places"],
    relatedCalculators: ["percentage-calculator", "scientific-notation-calculator"],
    inputs: [
      { name: "number", label: "Number to Round", type: "number", defaultValue: 3.14159, min: -1e9, max: 1e9, step: 0.001 },
      { name: "precision", label: "Round To", type: "select", defaultValue: "2", options: [
        { label: "Nearest Integer", value: "0" },
        { label: "1 Decimal Place", value: "1" },
        { label: "2 Decimal Places", value: "2" },
        { label: "3 Decimal Places", value: "3" },
        { label: "Nearest 10", value: "-1" },
        { label: "Nearest 100", value: "-2" }
      ] }
    ],
    outputs: [
      { name: "roundedValue", label: "Rounded Result", format: "number", highlight: true },
      { name: "floorValue", label: "Floor (Round Down)", format: "number" },
      { name: "ceilValue", label: "Ceiling (Round Up)", format: "number" }
    ],
    calcLogic: `
  const num = Number(inputs.number) || 3.14159;
  const prec = Number(inputs.precision) || 2;
  let rounded = num;
  if (prec >= 0) {
    const factor = Math.pow(10, prec);
    rounded = Math.round(num * factor) / factor;
  } else {
    const factor = Math.pow(10, Math.abs(prec));
    rounded = Math.round(num / factor) * factor;
  }
  return {
    roundedValue: rounded,
    floorValue: Math.floor(num),
    ceilValue: Math.ceil(num)
  };
`,
    formulaStr: "Standard Half-Up Rounding",
    faqs: [
      { question: "What is floor and ceiling?", answer: "Floor rounds down to the next lowest integer; ceiling rounds up to the next highest integer." }
    ]
  },
  {
    slug: "matrix-calculator",
    id: "matrix-calculator",
    title: "Matrix Calculator",
    subcategory: "General Math",
    iconName: "Grid",
    description: "Perform 2x2 matrix addition, subtraction, multiplication, and determinant calculations.",
    keywords: ["matrix calculator", "matrix determinant", "matrix multiplication", "linear algebra"],
    relatedCalculators: ["scientific-calculator", "big-number-calculator"],
    inputs: [
      { name: "a11", label: "Matrix A (1,1)", type: "number", defaultValue: 1, min: -100, max: 100, step: 1 },
      { name: "a12", label: "Matrix A (1,2)", type: "number", defaultValue: 2, min: -100, max: 100, step: 1 },
      { name: "a21", label: "Matrix A (2,1)", type: "number", defaultValue: 3, min: -100, max: 100, step: 1 },
      { name: "a22", label: "Matrix A (2,2)", type: "number", defaultValue: 4, min: -100, max: 100, step: 1 },
      { name: "operation", label: "Operation on Matrix B", type: "select", defaultValue: "det", options: [
        { label: "Determinant det(A)", value: "det" },
        { label: "Trace tr(A)", value: "trace" },
        { label: "Multiply A × A", value: "square" }
      ] }
    ],
    outputs: [
      { name: "detA", label: "Determinant det(A)", format: "number", highlight: true },
      { name: "traceA", label: "Trace tr(A)", format: "number" },
      { name: "matrixSquare", label: "Matrix A² Result", format: "text" }
    ],
    calcLogic: `
  const a11 = Number(inputs.a11) || 1;
  const a12 = Number(inputs.a12) || 2;
  const a21 = Number(inputs.a21) || 3;
  const a22 = Number(inputs.a22) || 4;
  const det = a11 * a22 - a12 * a21;
  const trace = a11 + a22;
  const sq11 = a11 * a11 + a12 * a21;
  const sq12 = a11 * a12 + a12 * a22;
  const sq21 = a21 * a11 + a22 * a21;
  const sq22 = a21 * a12 + a22 * a22;
  return {
    detA: det,
    traceA: trace,
    matrixSquare: \`[[\${sq11}, \${sq12}], [\${sq21}, \${sq22}]]\`
  };
`,
    formulaStr: "det(A) = a₁₁a₂₂ - a₁₂a₂₁; tr(A) = a₁₁ + a₂₂",
    faqs: [
      { question: "What is a matrix determinant?", answer: "A scalar value that encodes certain properties of a square matrix (e.g. invertibility)." }
    ]
  },
  {
    slug: "scientific-notation-calculator",
    id: "scientific-notation-calculator",
    title: "Scientific Notation Calculator",
    subcategory: "General Math",
    iconName: "FileText",
    description: "Convert numbers to and from scientific notation (a × 10^b) and engineering notation.",
    keywords: ["scientific notation", "exponential notation", "engineering notation", "big numbers"],
    relatedCalculators: ["exponent-calculator", "big-number-calculator"],
    inputs: [
      { name: "number", label: "Input Number", type: "number", defaultValue: 3500000, min: -1e15, max: 1e15, step: 1 }
    ],
    outputs: [
      { name: "scientific", label: "Scientific Notation", format: "text", highlight: true },
      { name: "engineering", label: "Engineering Notation", format: "text" },
      { name: "standard", label: "Standard Form", format: "number" }
    ],
    calcLogic: `
  const n = Number(inputs.number) || 3500000;
  const sci = n.toExponential(4);
  const exp = Math.floor(Math.log10(Math.abs(n) || 1));
  const engExp = Math.floor(exp / 3) * 3;
  const engCoeff = (n / Math.pow(10, engExp)).toFixed(3);
  return {
    scientific: sci,
    engineering: \`\${engCoeff} × 10^\${engExp}\`,
    standard: n
  };
`,
    formulaStr: "Scientific Notation = a × 10^b (where 1 ≤ |a| < 10)",
    faqs: [
      { question: "Why use scientific notation?", answer: "It allows compact representation of extremely large or small numbers." }
    ]
  },
  {
    slug: "big-number-calculator",
    id: "big-number-calculator",
    title: "Big Number Calculator",
    subcategory: "General Math",
    iconName: "PlusCircle",
    description: "Perform arbitrary precision integer arithmetic on extremely large numbers.",
    keywords: ["big number", "large number calculator", "bigint", "arbitrary precision"],
    relatedCalculators: ["scientific-notation-calculator", "scientific-calculator"],
    inputs: [
      { name: "num1", label: "Large Number 1", type: "text", defaultValue: "1234567890123456789" },
      { name: "operation", label: "Operator", type: "select", defaultValue: "+", options: [
        { label: "Addition (+)", value: "+" },
        { label: "Subtraction (-)", value: "-" },
        { label: "Multiplication (×)", value: "*" }
      ] },
      { name: "num2", label: "Large Number 2", type: "text", defaultValue: "9876543210987654321" }
    ],
    outputs: [
      { name: "result", label: "Big Integer Result", format: "text", highlight: true },
      { name: "digitCount", label: "Digit Count", format: "number" }
    ],
    calcLogic: `
  const s1 = (inputs.num1 || "1234567890123456789").trim();
  const s2 = (inputs.num2 || "9876543210987654321").trim();
  const op = inputs.operation || "+";
  let resStr = "0";
  try {
    const b1 = BigInt(s1);
    const b2 = BigInt(s2);
    if (op === "+") resStr = (b1 + b2).toString();
    else if (op === "-") resStr = (b1 - b2).toString();
    else if (op === "*") resStr = (b1 * b2).toString();
  } catch (err) {
    resStr = "Invalid BigInt input";
  }
  return { result: resStr, digitCount: resStr.replace("-", "").length };
`,
    formulaStr: "Arbitrary-Precision BigInt Arithmetic",
    faqs: [
      { question: "How large can BigInt numbers be?", answer: "BigInt handles numbers up to memory constraints (millions of digits)." }
    ]
  },

  // STATISTICS (9)
  {
    slug: "standard-deviation-calculator",
    id: "standard-deviation-calculator",
    title: "Standard Deviation Calculator",
    subcategory: "Statistics",
    iconName: "BarChart2",
    description: "Calculate sample and population standard deviation, variance, mean, and range.",
    keywords: ["standard deviation", "sd calculator", "variance", "sample sd", "population sd"],
    relatedCalculators: ["statistics-calculator", "z-score-calculator"],
    inputs: [
      { name: "dataSeries", label: "Data Values (comma-separated)", type: "text", defaultValue: "10, 12, 23, 23, 16, 23, 21, 16" }
    ],
    outputs: [
      { name: "sampleSD", label: "Sample Standard Deviation (s)", format: "number", highlight: true },
      { name: "populationSD", label: "Population Standard Deviation (σ)", format: "number" },
      { name: "mean", label: "Mean (μ)", format: "number" },
      { name: "sampleVariance", label: "Sample Variance (s²)", format: "number" }
    ],
    calcLogic: `
  const raw = String(inputs.dataSeries || "10, 12, 23, 23, 16, 23, 21, 16");
  const nums = raw.split(/[,\\s]+/).map(Number).filter(n => !isNaN(n));
  if (nums.length < 2) return { sampleSD: 0, populationSD: 0, mean: nums[0] || 0, sampleVariance: 0 };
  const n = nums.length;
  const mean = nums.reduce((a, b) => a + b, 0) / n;
  const sqDiffs = nums.map(x => Math.pow(x - mean, 2));
  const sumSq = sqDiffs.reduce((a, b) => a + b, 0);
  const popSD = Math.sqrt(sumSq / n);
  const samSD = Math.sqrt(sumSq / (n - 1));
  return {
    sampleSD: parseFloat(samSD.toFixed(4)),
    populationSD: parseFloat(popSD.toFixed(4)),
    mean: parseFloat(mean.toFixed(4)),
    sampleVariance: parseFloat((samSD * samSD).toFixed(4))
  };
`,
    formulaStr: "Sample SD s = √[ Σ(x - x̄)² / (n - 1) ]",
    faqs: [
      { question: "What is the difference between sample and population SD?", answer: "Sample SD divides by (n - 1) for unbiased estimation, while Population SD divides by N." }
    ]
  },
  {
    slug: "number-sequence-calculator",
    id: "number-sequence-calculator",
    title: "Number Sequence Calculator",
    subcategory: "Statistics",
    iconName: "TrendingUp",
    description: "Calculate nth term and sum of arithmetic and geometric number sequences.",
    keywords: ["number sequence", "arithmetic sequence", "geometric sequence", "progression"],
    relatedCalculators: ["standard-deviation-calculator", "statistics-calculator"],
    inputs: [
      { name: "seqType", label: "Sequence Type", type: "select", defaultValue: "arithmetic", options: [
        { label: "Arithmetic (aₙ = a₁ + (n-1)d)", value: "arithmetic" },
        { label: "Geometric (aₙ = a₁ × r^(n-1))", value: "geometric" }
      ] },
      { name: "firstTerm", label: "First Term (a₁)", type: "number", defaultValue: 2, min: -1000, max: 1000, step: 1 },
      { name: "diffRatio", label: "Difference (d) / Ratio (r)", type: "number", defaultValue: 3, min: -100, max: 100, step: 1 },
      { name: "termCount", label: "Term Count (n)", type: "number", defaultValue: 10, min: 1, max: 100, step: 1 }
    ],
    outputs: [
      { name: "nthTerm", label: "nth Term (aₙ)", format: "number", highlight: true },
      { name: "sumN", label: "Sum of n Terms (Sₙ)", format: "number" },
      { name: "sequencePreview", label: "Sequence Preview", format: "text" }
    ],
    calcLogic: `
  const isArith = inputs.seqType !== "geometric";
  const a1 = Number(inputs.firstTerm) || 2;
  const d = Number(inputs.diffRatio) || 3;
  const n = Math.min(100, Math.max(1, Number(inputs.termCount) || 10));
  let an = 0, sn = 0;
  const list: number[] = [];
  if (isArith) {
    an = a1 + (n - 1) * d;
    sn = (n / 2) * (a1 + an);
    for (let i = 0; i < Math.min(n, 6); i++) list.push(a1 + i * d);
  } else {
    an = a1 * Math.pow(d, n - 1);
    sn = d !== 1 ? (a1 * (1 - Math.pow(d, n))) / (1 - d) : a1 * n;
    for (let i = 0; i < Math.min(n, 6); i++) list.push(a1 * Math.pow(d, i));
  }
  return {
    nthTerm: parseFloat(an.toFixed(4)),
    sumN: parseFloat(sn.toFixed(4)),
    sequencePreview: list.join(", ") + (n > 6 ? ", ..." : "")
  };
`,
    formulaStr: "Arithmetic: aₙ = a₁ + (n-1)d; Geometric: aₙ = a₁ × r^(n-1)",
    faqs: [
      { question: "What is an arithmetic sequence?", answer: "A sequence of numbers where the difference between consecutive terms is constant." }
    ]
  },
  {
    slug: "sample-size-calculator",
    id: "sample-size-calculator",
    title: "Sample Size Calculator",
    subcategory: "Statistics",
    iconName: "Users",
    description: "Determine the required statistical sample size for surveys, experiments, and research studies.",
    keywords: ["sample size", "margin of error", "confidence level", "survey size"],
    relatedCalculators: ["confidence-interval-calculator", "z-score-calculator"],
    inputs: [
      { name: "confidenceLevel", label: "Confidence Level (%)", type: "select", defaultValue: "95", options: [
        { label: "90% (Z = 1.645)", value: "90" },
        { label: "95% (Z = 1.960)", value: "95" },
        { label: "99% (Z = 2.576)", value: "99" }
      ] },
      { name: "marginError", label: "Margin of Error (%)", type: "number", defaultValue: 5, min: 0.1, max: 20, step: 0.5 },
      { name: "population", label: "Population Size (Optional)", type: "number", defaultValue: 10000, min: 10, max: 1e9, step: 100 }
    ],
    outputs: [
      { name: "sampleSize", label: "Required Sample Size", format: "number", highlight: true },
      { name: "zScore", label: "Z-Score Used", format: "number" }
    ],
    calcLogic: `
  const cl = inputs.confidenceLevel || "95";
  const me = Math.max(0.1, Number(inputs.marginError) || 5) / 100;
  const pop = Number(inputs.population) || 0;
  let z = 1.96;
  if (cl === "90") z = 1.645;
  else if (cl === "99") z = 2.576;
  const p = 0.5;
  const n0 = (z * z * p * (1 - p)) / (me * me);
  let n = n0;
  if (pop > 0) {
    n = n0 / (1 + (n0 - 1) / pop);
  }
  return { sampleSize: Math.ceil(n), zScore: z };
`,
    formulaStr: "Cochran's Formula: n = [ Z² × p(1-p) ] / E²",
    faqs: [
      { question: "Why is 95% confidence level standard?", answer: "95% confidence balances high statistical certainty with manageable sample size requirements." }
    ]
  },
  {
    slug: "probability-calculator",
    id: "probability-calculator",
    title: "Probability Calculator",
    subcategory: "Statistics",
    iconName: "PieChart",
    description: "Calculate probabilities of single, multiple, independent, and mutually exclusive events.",
    keywords: ["probability calculator", "odds", "independent events", "bayes theorem"],
    relatedCalculators: ["permutation-combination-calculator", "random-number-generator"],
    inputs: [
      { name: "probA", label: "Probability of Event A P(A)", type: "number", defaultValue: 0.5, min: 0, max: 1, step: 0.05 },
      { name: "probB", label: "Probability of Event B P(B)", type: "number", defaultValue: 0.4, min: 0, max: 1, step: 0.05 }
    ],
    outputs: [
      { name: "probAandB", label: "P(A and B) - Both Occur", format: "number", highlight: true },
      { name: "probAorB", label: "P(A or B) - Either Occurs", format: "number" },
      { name: "probNotA", label: "P(Not A)", format: "number" }
    ],
    calcLogic: `
  const pa = Math.min(1, Math.max(0, Number(inputs.probA) || 0.5));
  const pb = Math.min(1, Math.max(0, Number(inputs.probB) || 0.4));
  const pAnd = pa * pb;
  const pOr = pa + pb - pAnd;
  const pNotA = 1 - pa;
  return {
    probAandB: parseFloat(pAnd.toFixed(4)),
    probAorB: parseFloat(pOr.toFixed(4)),
    probNotA: parseFloat(pNotA.toFixed(4))
  };
`,
    formulaStr: "P(A ∩ B) = P(A) × P(B); P(A ∪ B) = P(A) + P(B) - P(A ∩ B)",
    faqs: [
      { question: "What is an independent event?", answer: "Events are independent when the occurrence of one does not affect the probability of the other." }
    ]
  },
  {
    slug: "statistics-calculator",
    id: "statistics-calculator",
    title: "Statistics Calculator",
    subcategory: "Statistics",
    iconName: "BarChart",
    description: "Calculate complete descriptive statistics summary including mean, median, mode, range, and variance.",
    keywords: ["statistics calculator", "descriptive statistics", "mean median mode", "summary stats"],
    relatedCalculators: ["standard-deviation-calculator", "mean-median-mode-calculator"],
    inputs: [
      { name: "dataSeries", label: "Dataset (comma-separated)", type: "text", defaultValue: "4, 8, 6, 5, 3, 2, 8, 9, 2, 5" }
    ],
    outputs: [
      { name: "count", label: "Count (N)", format: "number" },
      { name: "sum", label: "Sum (ΣX)", format: "number" },
      { name: "mean", label: "Mean (Average)", format: "number", highlight: true },
      { name: "median", label: "Median", format: "number" },
      { name: "range", label: "Range (Max - Min)", format: "number" }
    ],
    calcLogic: `
  const raw = String(inputs.dataSeries || "4, 8, 6, 5, 3, 2, 8, 9, 2, 5");
  const nums = raw.split(/[,\\s]+/).map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
  if (nums.length === 0) return { count: 0, sum: 0, mean: 0, median: 0, range: 0 };
  const cnt = nums.length;
  const sum = nums.reduce((a, b) => a + b, 0);
  const mean = sum / cnt;
  const med = cnt % 2 === 1 ? nums[Math.floor(cnt / 2)] : (nums[cnt / 2 - 1] + nums[cnt / 2]) / 2;
  const rng = nums[cnt - 1] - nums[0];
  return {
    count: cnt,
    sum: parseFloat(sum.toFixed(4)),
    mean: parseFloat(mean.toFixed(4)),
    median: parseFloat(med.toFixed(4)),
    range: parseFloat(rng.toFixed(4))
  };
`,
    formulaStr: "Summary Descriptive Statistics Engine",
    faqs: [
      { question: "What is descriptive statistics?", answer: "Brief descriptive coefficients that summarize a given dataset." }
    ]
  },
  {
    slug: "mean-median-mode-calculator",
    id: "mean-median-mode-calculator",
    title: "Mean, Median, Mode & Range Calculator",
    subcategory: "Statistics",
    iconName: "Sliders",
    description: "Calculate central tendency metrics (Mean, Median, Mode) and dispersion Range for data sets.",
    keywords: ["mean median mode", "average", "central tendency", "range"],
    relatedCalculators: ["statistics-calculator", "standard-deviation-calculator"],
    inputs: [
      { name: "dataSeries", label: "Numbers (comma-separated)", type: "text", defaultValue: "12, 15, 12, 18, 22, 12, 15, 30" }
    ],
    outputs: [
      { name: "mean", label: "Mean (Average)", format: "number", highlight: true },
      { name: "median", label: "Median", format: "number" },
      { name: "mode", label: "Mode(s)", format: "text" },
      { name: "range", label: "Range", format: "number" }
    ],
    calcLogic: `
  const raw = String(inputs.dataSeries || "12, 15, 12, 18, 22, 12, 15, 30");
  const nums = raw.split(/[,\\s]+/).map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
  if (nums.length === 0) return { mean: 0, median: 0, mode: "N/A", range: 0 };
  const n = nums.length;
  const mean = nums.reduce((a, b) => a + b, 0) / n;
  const med = n % 2 === 1 ? nums[Math.floor(n / 2)] : (nums[n / 2 - 1] + nums[n / 2]) / 2;
  const counts: Record<number, number> = {};
  let maxF = 0;
  nums.forEach(x => { counts[x] = (counts[x] || 0) + 1; if (counts[x] > maxF) maxF = counts[x]; });
  const modes = Object.keys(counts).filter(k => counts[Number(k)] === maxF);
  return {
    mean: parseFloat(mean.toFixed(3)),
    median: parseFloat(med.toFixed(3)),
    mode: maxF > 1 ? modes.join(", ") : "No repeated mode",
    range: nums[n - 1] - nums[0]
  };
`,
    formulaStr: "Mean = Σx / N; Median = Middle Value; Mode = Most Frequent",
    faqs: [
      { question: "Can a dataset have more than one mode?", answer: "Yes, datasets can be bimodal (2 modes) or multimodal (multiple modes)." }
    ]
  },
  {
    slug: "permutation-combination-calculator",
    id: "permutation-combination-calculator",
    title: "Permutation & Combination Calculator",
    subcategory: "Statistics",
    iconName: "Maximize2",
    description: "Calculate permutations nPr and combinations nCr for choosing r items from n total items.",
    keywords: ["permutation", "combination", "npr", "ncr", "factorial"],
    relatedCalculators: ["probability-calculator", "statistics-calculator"],
    inputs: [
      { name: "nVal", label: "Total Items (n)", type: "number", defaultValue: 8, min: 0, max: 100, step: 1 },
      { name: "rVal", label: "Chosen Items (r)", type: "number", defaultValue: 3, min: 0, max: 100, step: 1 }
    ],
    outputs: [
      { name: "combinations", label: "Combinations nCr (Order Ignored)", format: "number", highlight: true },
      { name: "permutations", label: "Permutations nPr (Order Matters)", format: "number" }
    ],
    calcLogic: `
  const n = Math.min(100, Math.max(0, Math.floor(Number(inputs.nVal) || 8)));
  const r = Math.min(n, Math.max(0, Math.floor(Number(inputs.rVal) || 3)));
  const fact = (num: number): number => {
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };
  const nPr = fact(n) / fact(n - r);
  const nCr = nPr / fact(r);
  return { combinations: Math.round(nCr), permutations: Math.round(nPr) };
`,
    formulaStr: "nPr = n! / (n-r)!; nCr = n! / [ r!(n-r)! ]",
    faqs: [
      { question: "What is the difference between permutation and combination?", answer: "Order matters in permutations (e.g. lock code); order does not matter in combinations (e.g. lottery ticket)." }
    ]
  },
  {
    slug: "z-score-calculator",
    id: "z-score-calculator",
    title: "Z-Score Calculator",
    subcategory: "Statistics",
    iconName: "TrendingUp",
    description: "Calculate Z-score, standard score, and percentile rank in a normal distribution.",
    keywords: ["z score", "standard score", "percentile", "normal distribution"],
    relatedCalculators: ["standard-deviation-calculator", "confidence-interval-calculator"],
    inputs: [
      { name: "rawScore", label: "Raw Score (X)", type: "number", defaultValue: 85, min: -1e6, max: 1e6, step: 1 },
      { name: "mean", label: "Population Mean (μ)", type: "number", defaultValue: 70, min: -1e6, max: 1e6, step: 1 },
      { name: "sd", label: "Standard Deviation (σ)", type: "number", defaultValue: 10, min: 0.001, max: 1e6, step: 0.1 }
    ],
    outputs: [
      { name: "zScore", label: "Z-Score", format: "number", highlight: true },
      { name: "percentile", label: "Percentile Rank", format: "percentage" }
    ],
    calcLogic: `
  const x = Number(inputs.rawScore) || 85;
  const mu = Number(inputs.mean) || 70;
  const sigma = Math.max(0.0001, Number(inputs.sd) || 10);
  const z = (x - mu) / sigma;
  const erf = (val: number) => {
    const t = 1.0 / (1.0 + 0.5 * Math.abs(val));
    const ans = 1 - t * Math.exp(-val * val - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
    return val >= 0 ? ans : -ans;
  };
  const cdf = 0.5 * (1 + erf(z / Math.SQRT2));
  return { zScore: parseFloat(z.toFixed(3)), percentile: parseFloat((cdf * 100).toFixed(2)) };
`,
    formulaStr: "Z = (X - μ) / σ",
    faqs: [
      { question: "What does a Z-score of 2 mean?", answer: "A Z-score of +2 means the raw score is 2 standard deviations above the population mean (~97.7th percentile)." }
    ]
  },
  {
    slug: "confidence-interval-calculator",
    id: "confidence-interval-calculator",
    title: "Confidence Interval Calculator",
    subcategory: "Statistics",
    iconName: "Sliders",
    description: "Calculate margin of error and confidence interval bounds for a sample mean.",
    keywords: ["confidence interval", "margin of error", "confidence level", "sample mean"],
    relatedCalculators: ["sample-size-calculator", "z-score-calculator"],
    inputs: [
      { name: "mean", label: "Sample Mean (x̄)", type: "number", defaultValue: 50, min: -1e6, max: 1e6, step: 1 },
      { name: "sd", label: "Sample SD (s)", type: "number", defaultValue: 8, min: 0.1, max: 1e6, step: 0.1 },
      { name: "sampleSize", label: "Sample Size (n)", type: "number", defaultValue: 100, min: 2, max: 1e6, step: 1 },
      { name: "confidenceLevel", label: "Confidence Level", type: "select", defaultValue: "95", options: [
        { label: "90%", value: "90" },
        { label: "95%", value: "95" },
        { label: "99%", value: "99" }
      ] }
    ],
    outputs: [
      { name: "marginError", label: "Margin of Error (±)", format: "number", highlight: true },
      { name: "intervalRange", label: "Confidence Interval Range", format: "text" }
    ],
    calcLogic: `
  const mean = Number(inputs.mean) || 50;
  const s = Math.max(0.001, Number(inputs.sd) || 8);
  const n = Math.max(2, Number(inputs.sampleSize) || 100);
  const cl = inputs.confidenceLevel || "95";
  let z = 1.96;
  if (cl === "90") z = 1.645;
  else if (cl === "99") z = 2.576;
  const me = z * (s / Math.sqrt(n));
  const lower = (mean - me).toFixed(2);
  const upper = (mean + me).toFixed(2);
  return { marginError: parseFloat(me.toFixed(3)), intervalRange: \`[\${lower}, \${upper}]\` };
`,
    formulaStr: "CI = x̄ ± Z × (s / √n)",
    faqs: [
      { question: "How does sample size affect margin of error?", answer: "Increasing sample size n reduces the margin of error, narrowing the confidence interval." }
    ]
  },

  // GEOMETRY (9)
  {
    slug: "triangle-calculator",
    id: "triangle-calculator",
    title: "Triangle Calculator",
    subcategory: "Geometry",
    iconName: "Triangle",
    description: "Calculate area, perimeter, side lengths, and internal angles of any triangle using Heron's formula.",
    keywords: ["triangle calculator", "triangle area", "heron formula", "triangle angles"],
    relatedCalculators: ["pythagorean-theorem-calculator", "right-triangle-calculator", "area-calculator"],
    inputs: [
      { name: "sideA", label: "Side a", type: "number", defaultValue: 3, min: 0.1, max: 10000, step: 0.5 },
      { name: "sideB", label: "Side b", type: "number", defaultValue: 4, min: 0.1, max: 10000, step: 0.5 },
      { name: "sideC", label: "Side c", type: "number", defaultValue: 5, min: 0.1, max: 10000, step: 0.5 }
    ],
    outputs: [
      { name: "area", label: "Triangle Area", format: "number", highlight: true },
      { name: "perimeter", label: "Perimeter", format: "number" },
      { name: "angleA", label: "Angle A", format: "number", unit: "°" }
    ],
    calcLogic: `
  const a = Math.max(0.1, Number(inputs.sideA) || 3);
  const b = Math.max(0.1, Number(inputs.sideB) || 4);
  const c = Math.max(0.1, Number(inputs.sideC) || 5);
  if (a + b <= c || a + c <= b || b + c <= a) {
    return { area: 0, perimeter: a + b + c, angleA: 0 };
  }
  const s = (a + b + c) / 2;
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  const cosA = (b * b + c * c - a * a) / (2 * b * c);
  const angleA = Math.acos(Math.min(1, Math.max(-1, cosA))) * (180 / Math.PI);
  return {
    area: parseFloat(area.toFixed(2)),
    perimeter: parseFloat((a + b + c).toFixed(2)),
    angleA: parseFloat(angleA.toFixed(1))
  };
`,
    formulaStr: "Heron's Formula: Area = √[ s(s-a)(s-b)(s-c) ]",
    faqs: [
      { question: "What is the triangle inequality theorem?", answer: "The sum of the lengths of any two sides of a triangle must be strictly greater than the third side." }
    ]
  },
  {
    slug: "volume-calculator",
    id: "volume-calculator",
    title: "Volume Calculator",
    subcategory: "Geometry",
    iconName: "Box",
    description: "Calculate 3D volume for spheres, cylinders, cones, cubes, and rectangular prisms.",
    keywords: ["volume calculator", "cylinder volume", "sphere volume", "cube volume"],
    relatedCalculators: ["surface-area-calculator", "area-calculator"],
    inputs: [
      { name: "shape", label: "3D Shape", type: "select", defaultValue: "cylinder", options: [
        { label: "Cylinder (r, h)", value: "cylinder" },
        { label: "Sphere (r)", value: "sphere" },
        { label: "Cone (r, h)", value: "cone" },
        { label: "Rectangular Prism (l, w, h)", value: "prism" }
      ] },
      { name: "dim1", label: "Radius / Length", type: "number", defaultValue: 5, min: 0.1, max: 10000, step: 0.5 },
      { name: "dim2", label: "Height / Width", type: "number", defaultValue: 10, min: 0.1, max: 10000, step: 0.5 },
      { name: "dim3", label: "Depth (Prism only)", type: "number", defaultValue: 4, min: 0.1, max: 10000, step: 0.5 }
    ],
    outputs: [
      { name: "volume", label: "Total 3D Volume", format: "number", highlight: true },
      { name: "formula", label: "Volume Formula Used", format: "text" }
    ],
    calcLogic: `
  const shape = inputs.shape || "cylinder";
  const r = Math.max(0, Number(inputs.dim1) || 5);
  const h = Math.max(0, Number(inputs.dim2) || 10);
  const d = Math.max(0, Number(inputs.dim3) || 4);
  let vol = 0, form = "";
  if (shape === "cylinder") { vol = Math.PI * r * r * h; form = "V = π × r² × h"; }
  else if (shape === "sphere") { vol = (4 / 3) * Math.PI * Math.pow(r, 3); form = "V = (4/3) × π × r³"; }
  else if (shape === "cone") { vol = (1 / 3) * Math.PI * r * r * h; form = "V = (1/3) × π × r² × h"; }
  else { vol = r * h * d; form = "V = l × w × h"; }
  return { volume: parseFloat(vol.toFixed(2)), formula: form };
`,
    formulaStr: "Cylinder V = πr²h; Sphere V = (4/3)πr³",
    faqs: [
      { question: "What units are used for volume?", answer: "Volume is expressed in cubic units (cm³, m³, in³, ft³)." }
    ]
  },
  {
    slug: "slope-calculator",
    id: "slope-calculator",
    title: "Slope Calculator",
    subcategory: "Geometry",
    iconName: "TrendingUp",
    description: "Calculate line slope m, incline angle, distance between points, and equation of a line y = mx + b.",
    keywords: ["slope calculator", "incline", "line equation", "gradient", "y=mx+b"],
    relatedCalculators: ["distance-calculator", "triangle-calculator"],
    inputs: [
      { name: "x1", label: "Point 1 X₁", type: "number", defaultValue: 1, min: -10000, max: 10000, step: 1 },
      { name: "y1", label: "Point 1 Y₁", type: "number", defaultValue: 2, min: -10000, max: 10000, step: 1 },
      { name: "x2", label: "Point 2 X₂", type: "number", defaultValue: 4, min: -10000, max: 10000, step: 1 },
      { name: "y2", label: "Point 2 Y₂", type: "number", defaultValue: 8, min: -10000, max: 10000, step: 1 }
    ],
    outputs: [
      { name: "slopeM", label: "Slope (m)", format: "number", highlight: true },
      { name: "angleDeg", label: "Incline Angle θ", format: "number", unit: "°" },
      { name: "lineEquation", label: "Line Equation (y = mx + b)", format: "text" }
    ],
    calcLogic: `
  const x1 = Number(inputs.x1) || 1;
  const y1 = Number(inputs.y1) || 2;
  const x2 = Number(inputs.x2) || 4;
  const y2 = Number(inputs.y2) || 8;
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0) return { slopeM: 0, angleDeg: 90, lineEquation: \`x = \${x1}\` };
  const m = dy / dx;
  const angle = Math.atan(m) * (180 / Math.PI);
  const b = y1 - m * x1;
  const bStr = b >= 0 ? \`+ \${b.toFixed(2)}\` : \`- \${Math.abs(b).toFixed(2)}\`;
  return {
    slopeM: parseFloat(m.toFixed(4)),
    angleDeg: parseFloat(angle.toFixed(2)),
    lineEquation: \`y = \${m.toFixed(2)}x \${bStr}\`
  };
`,
    formulaStr: "Slope m = (y₂ - y₁) / (x₂ - x₁)",
    faqs: [
      { question: "What is a zero slope?", answer: "A horizontal line has a slope of 0 because y does not change as x changes." }
    ]
  },
  {
    slug: "area-calculator",
    id: "area-calculator",
    title: "Area Calculator",
    subcategory: "Geometry",
    iconName: "Square",
    description: "Calculate surface area for 2D geometric shapes (rectangle, circle, triangle, trapezoid).",
    keywords: ["area calculator", "rectangle area", "circle area", "trapezoid area"],
    relatedCalculators: ["circle-calculator", "volume-calculator", "surface-area-calculator"],
    inputs: [
      { name: "shape", label: "2D Shape", type: "select", defaultValue: "rectangle", options: [
        { label: "Rectangle (w, h)", value: "rectangle" },
        { label: "Circle (r)", value: "circle" },
        { label: "Trapezoid (a, b, h)", value: "trapezoid" }
      ] },
      { name: "dim1", label: "Width / Radius / Base A", type: "number", defaultValue: 10, min: 0.1, max: 10000, step: 0.5 },
      { name: "dim2", label: "Height / Base B", type: "number", defaultValue: 5, min: 0.1, max: 10000, step: 0.5 },
      { name: "dim3", label: "Height (Trapezoid only)", type: "number", defaultValue: 4, min: 0.1, max: 10000, step: 0.5 }
    ],
    outputs: [
      { name: "area", label: "Total Area", format: "number", highlight: true },
      { name: "formula", label: "Area Formula", format: "text" }
    ],
    calcLogic: `
  const shape = inputs.shape || "rectangle";
  const d1 = Math.max(0, Number(inputs.dim1) || 10);
  const d2 = Math.max(0, Number(inputs.dim2) || 5);
  const d3 = Math.max(0, Number(inputs.dim3) || 4);
  let area = 0, form = "";
  if (shape === "rectangle") { area = d1 * d2; form = "A = w × h"; }
  else if (shape === "circle") { area = Math.PI * d1 * d1; form = "A = π × r²"; }
  else { area = ((d1 + d2) / 2) * d3; form = "A = ((a + b) / 2) × h"; }
  return { area: parseFloat(area.toFixed(2)), formula: form };
`,
    formulaStr: "Rectangle A = w × h; Circle A = πr²",
    faqs: [
      { question: "What is area?", answer: "Area measures the total 2D space enclosed within a boundary." }
    ]
  },
  {
    slug: "distance-calculator",
    id: "distance-calculator",
    title: "Distance Calculator",
    subcategory: "Geometry",
    iconName: "MapPin",
    description: "Calculate Euclidean distance between 2D or 3D coordinate points.",
    keywords: ["distance calculator", "euclidean distance", "coordinates distance", "2d 3d distance"],
    relatedCalculators: ["slope-calculator", "pythagorean-theorem-calculator"],
    inputs: [
      { name: "x1", label: "Point 1 X₁", type: "number", defaultValue: 0, min: -10000, max: 10000, step: 1 },
      { name: "y1", label: "Point 1 Y₁", type: "number", defaultValue: 0, min: -10000, max: 10000, step: 1 },
      { name: "x2", label: "Point 2 X₂", type: "number", defaultValue: 3, min: -10000, max: 10000, step: 1 },
      { name: "y2", label: "Point 2 Y₂", type: "number", defaultValue: 4, min: -10000, max: 10000, step: 1 }
    ],
    outputs: [
      { name: "distance", label: "Euclidean Distance", format: "number", highlight: true },
      { name: "midpoint", label: "Midpoint Coordinate", format: "text" }
    ],
    calcLogic: `
  const x1 = Number(inputs.x1) || 0;
  const y1 = Number(inputs.y1) || 0;
  const x2 = Number(inputs.x2) || 3;
  const y2 = Number(inputs.y2) || 4;
  const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  return { distance: parseFloat(dist.toFixed(4)), midpoint: \`(\${midX}, \${midY})\` };
`,
    formulaStr: "Distance d = √[ (x₂ - x₁)² + (y₂ - y₁)² ]",
    faqs: [
      { question: "What is Euclidean distance?", answer: "The straight-line distance between two points in Euclidean space." }
    ]
  },
  {
    slug: "circle-calculator",
    id: "circle-calculator",
    title: "Circle Calculator",
    subcategory: "Geometry",
    iconName: "Circle",
    description: "Calculate circle radius, diameter, circumference, and area from any single known dimension.",
    keywords: ["circle calculator", "circumference", "circle area", "radius", "diameter"],
    relatedCalculators: ["area-calculator", "volume-calculator"],
    inputs: [
      { name: "radius", label: "Radius (r)", type: "number", defaultValue: 5, min: 0.01, max: 10000, step: 0.5 }
    ],
    outputs: [
      { name: "area", label: "Circle Area", format: "number", highlight: true },
      { name: "circumference", label: "Circumference", format: "number" },
      { name: "diameter", label: "Diameter", format: "number" }
    ],
    calcLogic: `
  const r = Math.max(0.001, Number(inputs.radius) || 5);
  const d = 2 * r;
  const c = 2 * Math.PI * r;
  const a = Math.PI * r * r;
  return {
    area: parseFloat(a.toFixed(2)),
    circumference: parseFloat(c.toFixed(2)),
    diameter: parseFloat(d.toFixed(2))
  };
`,
    formulaStr: "Area = πr²; Circumference = 2πr; Diameter = 2r",
    faqs: [
      { question: "What is pi (π)?", answer: "Pi is the mathematical constant representing the ratio of a circle's circumference to its diameter (≈ 3.14159)." }
    ]
  },
  {
    slug: "surface-area-calculator",
    id: "surface-area-calculator",
    title: "Surface Area Calculator",
    subcategory: "Geometry",
    iconName: "Maximize",
    description: "Calculate total surface area for 3D shapes including spheres, cylinders, cubes, and cones.",
    keywords: ["surface area", "cylinder surface area", "sphere area", "3d area"],
    relatedCalculators: ["volume-calculator", "area-calculator"],
    inputs: [
      { name: "shape", label: "3D Shape", type: "select", defaultValue: "cylinder", options: [
        { label: "Cylinder (r, h)", value: "cylinder" },
        { label: "Sphere (r)", value: "sphere" },
        { label: "Cube (side)", value: "cube" }
      ] },
      { name: "dim1", label: "Radius / Side Length", type: "number", defaultValue: 4, min: 0.1, max: 10000, step: 0.5 },
      { name: "dim2", label: "Height (Cylinder)", type: "number", defaultValue: 10, min: 0.1, max: 10000, step: 0.5 }
    ],
    outputs: [
      { name: "surfaceArea", label: "Total Surface Area", format: "number", highlight: true },
      { name: "formula", label: "Formula Used", format: "text" }
    ],
    calcLogic: `
  const shape = inputs.shape || "cylinder";
  const r = Math.max(0, Number(inputs.dim1) || 4);
  const h = Math.max(0, Number(inputs.dim2) || 10);
  let sa = 0, form = "";
  if (shape === "cylinder") { sa = 2 * Math.PI * r * (r + h); form = "SA = 2πr(r + h)"; }
  else if (shape === "sphere") { sa = 4 * Math.PI * r * r; form = "SA = 4πr²"; }
  else { sa = 6 * r * r; form = "SA = 6s²"; }
  return { surfaceArea: parseFloat(sa.toFixed(2)), formula: form };
`,
    formulaStr: "Cylinder SA = 2πr(r + h); Sphere SA = 4πr²",
    faqs: [
      { question: "What is surface area?", answer: "The total area of all faces and curved surfaces that enclose a 3D solid." }
    ]
  },
  {
    slug: "pythagorean-theorem-calculator",
    id: "pythagorean-theorem-calculator",
    title: "Pythagorean Theorem Calculator",
    subcategory: "Geometry",
    iconName: "Triangle",
    description: "Solve missing side lengths a, b, or c in right-angled triangles using a² + b² = c².",
    keywords: ["pythagorean theorem", "right triangle", "hypotenuse", "a2+b2=c2"],
    relatedCalculators: ["right-triangle-calculator", "triangle-calculator"],
    inputs: [
      { name: "sideA", label: "Side a", type: "number", defaultValue: 3, min: 0, max: 10000, step: 0.5 },
      { name: "sideB", label: "Side b", type: "number", defaultValue: 4, min: 0, max: 10000, step: 0.5 }
    ],
    outputs: [
      { name: "hypotenuseC", label: "Hypotenuse (c)", format: "number", highlight: true },
      { name: "area", label: "Right Triangle Area", format: "number" }
    ],
    calcLogic: `
  const a = Math.max(0.1, Number(inputs.sideA) || 3);
  const b = Math.max(0.1, Number(inputs.sideB) || 4);
  const c = Math.sqrt(a * a + b * b);
  const area = 0.5 * a * b;
  return { hypotenuseC: parseFloat(c.toFixed(3)), area: parseFloat(area.toFixed(2)) };
`,
    formulaStr: "a² + b² = c²  =>  c = √(a² + b²)",
    faqs: [
      { question: "What is a hypotenuse?", answer: "The longest side of a right-angled triangle, opposite the 90-degree right angle." }
    ]
  },
  {
    slug: "right-triangle-calculator",
    id: "right-triangle-calculator",
    title: "Right Triangle Calculator",
    subcategory: "Geometry",
    iconName: "Triangle",
    description: "Calculate sides, angles, area, and perimeter of right-angled triangles.",
    keywords: ["right triangle", "trigonometry", "sine cosine tangent", "right angle"],
    relatedCalculators: ["pythagorean-theorem-calculator", "triangle-calculator"],
    inputs: [
      { name: "sideA", label: "Leg a", type: "number", defaultValue: 5, min: 0.1, max: 10000, step: 0.5 },
      { name: "sideB", label: "Leg b", type: "number", defaultValue: 12, min: 0.1, max: 10000, step: 0.5 }
    ],
    outputs: [
      { name: "hypotenuseC", label: "Hypotenuse c", format: "number", highlight: true },
      { name: "angleA", label: "Angle α", format: "number", unit: "°" },
      { name: "angleB", label: "Angle β", format: "number", unit: "°" },
      { name: "area", label: "Area", format: "number" }
    ],
    calcLogic: `
  const a = Math.max(0.1, Number(inputs.sideA) || 5);
  const b = Math.max(0.1, Number(inputs.sideB) || 12);
  const c = Math.sqrt(a * a + b * b);
  const alpha = Math.atan(a / b) * (180 / Math.PI);
  const beta = 90 - alpha;
  const area = 0.5 * a * b;
  return {
    hypotenuseC: parseFloat(c.toFixed(3)),
    angleA: parseFloat(alpha.toFixed(2)),
    angleB: parseFloat(beta.toFixed(2)),
    area: parseFloat(area.toFixed(2))
  };
`,
    formulaStr: "c = √(a² + b²); α = arctan(a/b); β = 90° - α",
    faqs: [
      { question: "What defines a right triangle?", answer: "A triangle with one interior angle measuring exactly 90 degrees." }
    ]
  }
];

// Helper to write files
calculators.forEach((calc) => {
  const targetDir = path.join(__dirname, "..", "src", "app", "calculators", calc.slug);
  fs.mkdirSync(targetDir, { recursive: true });

  const className = calc.title.replace(/[\s\-\&\(\)\,\.\+\÷\×\°\/]/g, "");

  // 1. types.ts
  const typesContent = `export interface ${className}Inputs {
${calc.inputs.map(i => `  ${i.name}?: ${i.type === "number" ? "number" : "string"};`).join("\n")}
}

export interface ${className}Outputs {
${calc.outputs.map(o => `  ${o.name}: ${o.format === "number" || o.format === "currency" || o.format === "percentage" ? "number" : "string"};`).join("\n")}
}
`;

  // 2. calculator.ts
  const calcContent = `import { ${className}Outputs } from "./types";

export function calculate${className}(inputs: Record<string, any>): ${className}Outputs {${calc.calcLogic}}
`;

  // 3. schema.ts
  const schemaContent = `import { z } from "zod";

export const ${calc.slug.replace(/-/g, "_")}Schema = z.object({
${calc.inputs.map(i => `  ${i.name}: z.${i.type === "number" ? "number()" : "string()"}.optional(),`).join("\n")}
});
`;

  // 4. metadata.ts
  const metaContent = `import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const ${calc.slug.replace(/-/g, "_")}Metadata: Metadata = generateCalculatorMetadata({
  title: "${calc.title} — Free Online Math Calculator",
  description: "${calc.description}",
  slug: "${calc.slug}",
});
`;

  // 5. faq.ts
  const faqContent = `import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const ${calc.slug.replace(/-/g, "_")}Faqs: CalculatorFAQ[] = ${JSON.stringify(calc.faqs, null, 2)};
`;

  // 6. content.ts
  const contentContent = `export const ${calc.slug.replace(/-/g, "_")}Content = {
  title: "${calc.title}",
  formula: "${calc.formulaStr}",
  description: "${calc.description}",
  article: \`
### Overview of ${calc.title}
${calc.description}

### Formula and Calculation Method
The calculation uses standard mathematical principles:
**\${"${calc.formulaStr}"}**

### Step-by-Step Educational Guide
Review the output metrics and formulas for accurate mathematical problem solving.
  \`,
  references: [
    "Mathematical Association of America (MAA) Reference Standards",
    "NIST Digital Library of Mathematical Functions"
  ]
};
`;

  // 7. examples.ts
  const examplesContent = `export const ${calc.slug.replace(/-/g, "_")}Examples = [
  {
    title: "Standard ${calc.title} Example",
    inputs: ${JSON.stringify(calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: i.defaultValue }), {}), null, 2)},
    explanation: "Standard reference math calculation example."
  }
];
`;

  // 8. config.ts
  const configContent = `import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculate${className} } from "./calculator";
import { ${calc.slug.replace(/-/g, "_")}Faqs } from "./faq";

export const ${calc.slug.replace(/-/g, "_")}Config: CalculatorModuleDefinition = {
  id: "${calc.id}",
  title: "${calc.title}",
  slug: "${calc.slug}",
  category: "Math",
  subcategory: "${calc.subcategory}",
  description: "${calc.description}",
  iconName: "${calc.iconName}",
  featured: true,
  keywords: ${JSON.stringify(calc.keywords)},
  priority: 1,
  relatedCalculators: ${JSON.stringify(calc.relatedCalculators)},
  formulaDescription: "${calc.formulaStr}",
  faqs: ${calc.slug.replace(/-/g, "_")}Faqs,
  inputs: ${JSON.stringify(calc.inputs, null, 2)},
  outputs: ${JSON.stringify(calc.outputs, null, 2)},
  calculate: calculate${className},
};

export default ${calc.slug.replace(/-/g, "_")}Config;
`;

  // 9. tests.ts
  const testsContent = `import { calculate${className} } from "./calculator";

export function run${className}Tests() {
  const defaultInputs = ${JSON.stringify(calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: i.defaultValue }), {}), null, 2)};
  const res1 = calculate${className}(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = ${JSON.stringify(calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: 0 }), {}), null, 2)};
  const res2 = calculate${className}(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = ${JSON.stringify(calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: -50 }), {}), null, 2)};
  const res3 = calculate${className}(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = ${JSON.stringify(calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: NaN }), {}), null, 2)};
  const res4 = calculate${className}(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
`;

  // 10. page.tsx
  const pageContent = `import { Metadata } from "next";
import { ${calc.slug.replace(/-/g, "_")}Metadata } from "./metadata";
import { ${calc.slug.replace(/-/g, "_")}Config } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = ${calc.slug.replace(/-/g, "_")}Metadata;

export default function ${className}Page() {
  const { calculate, ...serializableDef } = ${calc.slug.replace(/-/g, "_")}Config;
  const schemas = generateJsonLdSchema({
    title: ${calc.slug.replace(/-/g, "_")}Config.title,
    description: ${calc.slug.replace(/-/g, "_")}Config.description,
    slug: ${calc.slug.replace(/-/g, "_")}Config.slug,
    category: ${calc.slug.replace(/-/g, "_")}Config.category,
    faqs: ${calc.slug.replace(/-/g, "_")}Config.faqs,
  });

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CalculatorLayout definition={serializableDef} />
    </>
  );
}
`;

  fs.writeFileSync(path.join(targetDir, "types.ts"), typesContent);
  fs.writeFileSync(path.join(targetDir, "calculator.ts"), calcContent);
  fs.writeFileSync(path.join(targetDir, "schema.ts"), schemaContent);
  fs.writeFileSync(path.join(targetDir, "metadata.ts"), metaContent);
  fs.writeFileSync(path.join(targetDir, "faq.ts"), faqContent);
  fs.writeFileSync(path.join(targetDir, "content.ts"), contentContent);
  fs.writeFileSync(path.join(targetDir, "examples.ts"), examplesContent);
  fs.writeFileSync(path.join(targetDir, "config.ts"), configContent);
  fs.writeFileSync(path.join(targetDir, "tests.ts"), testsContent);
  fs.writeFileSync(path.join(targetDir, "page.tsx"), pageContent);

  console.log(`Generated ${calc.slug}`);
});

// Write src/calculators/math/index.ts
const mathIndexContent = `import { CalculatorModuleDefinition } from "../types";
${calculators.map(c => `import { ${c.slug.replace(/-/g, "_")}Config } from "@/app/calculators/${c.slug}/config";`).join("\n")}

export const MATH_CALCULATORS: CalculatorModuleDefinition[] = [
${calculators.map(c => `  ${c.slug.replace(/-/g, "_")}Config,`).join("\n")}
];

export default MATH_CALCULATORS;
`;

fs.writeFileSync(path.join(__dirname, "..", "src", "calculators", "math", "index.ts"), mathIndexContent);
console.log("Updated src/calculators/math/index.ts successfully!");
