"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  History as HistoryIcon,
  Trash2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Keyboard,
  Clock,
  Database,
  Compass,
  Zap,
} from "lucide-react";

// ==========================================
// ADVANCED MATHEMATICAL ENGINE
// Tokenizer + Multi-Arg Shunting Yard + RPN Evaluator
// ==========================================

function toRad(val: number, mode: "deg" | "rad" | "grad"): number {
  if (mode === "deg") return (val * Math.PI) / 180;
  if (mode === "grad") return (val * Math.PI) / 200;
  return val;
}

function fromRad(rad: number, mode: "deg" | "rad" | "grad"): number {
  if (mode === "deg") return (rad * 180) / Math.PI;
  if (mode === "grad") return (rad * 200) / Math.PI;
  return rad;
}

function gamma(z: number): number {
  if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  z -= 1;
  const p = [
    0.99999999999980993, 676.5203681218851, -1259.139216722289,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  let x = p[0];
  for (let i = 1; i < p.length; i++) {
    x += p[i] / (z + i);
  }
  const t = z + p.length - 1.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

function factorial(n: number): number {
  if (n < 0) return NaN;
  if (Number.isInteger(n) && n <= 170) {
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }
  return gamma(n + 1);
}

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(Math.round(a) * Math.round(b)) / gcd(a, b);
}

function nPr(n: number, r: number): number {
  if (n < 0 || r < 0 || r > n) return 0;
  return factorial(n) / factorial(n - r);
}

function nCr(n: number, r: number): number {
  if (n < 0 || r < 0 || r > n) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
}

function toFractionStr(val: number): string {
  if (isNaN(val) || !isFinite(val)) return String(val);
  if (Number.isInteger(val)) return String(val);
  const sign = val < 0 ? "-" : "";
  const absVal = Math.abs(val);
  const tolerance = 1.0e-6;
  let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
  let b = absVal;
  do {
    const a = Math.floor(b);
    let aux = h1;
    h1 = a * h1 + h2;
    h2 = aux;
    aux = k1;
    k1 = a * k1 + k2;
    k2 = aux;
    b = 1 / (b - a);
  } while (Math.abs(absVal - h1 / k1) > absVal * tolerance && k1 < 10000);
  return `${sign}${h1}/${k1}`;
}

function toDmsStr(val: number): string {
  if (isNaN(val) || !isFinite(val)) return String(val);
  const deg = Math.floor(Math.abs(val));
  const minFull = (Math.abs(val) - deg) * 60;
  const min = Math.floor(minFull);
  const sec = Math.round((minFull - min) * 60);
  const sign = val < 0 ? "-" : "";
  return `${sign}${deg}° ${min}' ${sec}"`;
}

function primeFactors(n: number): string {
  n = Math.abs(Math.round(n));
  if (isNaN(n) || n <= 1) return String(n);
  const factors: number[] = [];
  let d = 2;
  while (n >= 2) {
    if (n % d === 0) {
      factors.push(d);
      n /= d;
    } else {
      d++;
      if (d * d > n) {
        if (n > 1) factors.push(n);
        break;
      }
    }
  }
  return factors.join(" × ");
}

// Statistical Functions
function calcMean(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function calcMedian(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function calcMode(arr: number[]): number {
  if (arr.length === 0) return 0;
  const counts: Record<number, number> = {};
  let maxCount = 0;
  let modeVal = arr[0];
  for (const n of arr) {
    counts[n] = (counts[n] || 0) + 1;
    if (counts[n] > maxCount) {
      maxCount = counts[n];
      modeVal = n;
    }
  }
  return modeVal;
}

function calcVariance(arr: number[]): number {
  if (arr.length <= 1) return 0;
  const mean = calcMean(arr);
  return arr.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / (arr.length - 1);
}

function calcStdDev(arr: number[]): number {
  return Math.sqrt(calcVariance(arr));
}

// Token Types
type TokenType =
  | "NUMBER"
  | "OPERATOR"
  | "FUNCTION"
  | "CONST"
  | "LPAREN"
  | "RPAREN"
  | "COMMA"
  | "POSTFIX"
  | "UNARY_MINUS";

interface Token {
  type: TokenType;
  value: string;
  num?: number;
  argCount?: number;
}

const FUNCTIONS = new Set([
  "sin", "cos", "tan", "asin", "acos", "atan",
  "sinh", "cosh", "tanh", "csc", "sec", "cot",
  "ln", "log", "log10", "log2", "sqrt", "cbrt", "yroot",
  "abs", "floor", "ceil", "round", "trunc", "frac",
  "sgn", "gamma", "npr", "ncr", "gcd", "lcm", "hypot",
  "sum", "prod", "sumsq", "sumcube", "mean", "median", "mode", "stddev", "variance"
]);

const CONSTANTS: Record<string, number> = {
  "π": Math.PI,
  "pi": Math.PI,
  "e": Math.E,
  "ϕ": 1.618033988749895,
  "phi": 1.618033988749895,
  "i": 1,
};

function tokenize(input: string, ansVal: number): Token[] {
  let s = input
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/sin⁻¹/g, "asin")
    .replace(/cos⁻¹/g, "acos")
    .replace(/tan⁻¹/g, "atan")
    .replace(/log₁₀/g, "log10")
    .replace(/log₂/g, "log2")
    .replace(/log_y/g, "log")
    .replace(/Γ/g, "gamma")
    .replace(/y_√x/g, "yroot")
    .replace(/ⁿ√x/g, "yroot")
    .replace(/ʸ√x/g, "yroot")
    .replace(/³√x/g, "cbrt")
    .replace(/√/g, "sqrt");

  const tokens: Token[] = [];
  let i = 0;

  while (i < s.length) {
    const ch = s[i];

    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    // Numbers
    if (/\d|\./.test(ch)) {
      let numStr = "";
      while (i < s.length && /[\d.]/.test(s[i])) {
        numStr += s[i];
        i++;
      }
      tokens.push({ type: "NUMBER", value: numStr, num: parseFloat(numStr) });
      continue;
    }

    // Word identifiers & functions
    if (/[a-zA-Zπϕ]/.test(ch)) {
      let id = "";
      while (i < s.length && /[a-zA-Z0-9_πϕ]/.test(s[i])) {
        id += s[i];
        i++;
      }

      const lowerId = id.toLowerCase();
      if (id === "Ans") {
        tokens.push({ type: "NUMBER", value: "Ans", num: ansVal });
      } else if (CONSTANTS[id] !== undefined) {
        tokens.push({ type: "CONST", value: id, num: CONSTANTS[id] });
      } else if (lowerId === "npr") {
        tokens.push({ type: "OPERATOR", value: "npr" });
      } else if (lowerId === "ncr") {
        tokens.push({ type: "OPERATOR", value: "ncr" });
      } else if (lowerId === "yroot") {
        tokens.push({ type: "OPERATOR", value: "yroot" });
      } else if (lowerId === "mod") {
        tokens.push({ type: "OPERATOR", value: "%" });
      } else if (FUNCTIONS.has(lowerId)) {
        tokens.push({ type: "FUNCTION", value: lowerId, argCount: 1 });
      } else {
        tokens.push({ type: "FUNCTION", value: lowerId, argCount: 1 });
      }
      continue;
    }

    // Postfix !
    if (ch === "!") {
      tokens.push({ type: "POSTFIX", value: "!" });
      i++;
      continue;
    }

    // Percentage %+ or %- or %
    if (ch === "%") {
      if (s[i + 1] === "+") {
        tokens.push({ type: "OPERATOR", value: "%+" });
        i += 2;
      } else if (s[i + 1] === "-") {
        tokens.push({ type: "OPERATOR", value: "%-" });
        i += 2;
      } else {
        tokens.push({ type: "POSTFIX", value: "%" });
        i++;
      }
      continue;
    }

    // Parentheses
    if (ch === "(") {
      tokens.push({ type: "LPAREN", value: "(" });
      i++;
      continue;
    }
    if (ch === ")") {
      tokens.push({ type: "RPAREN", value: ")" });
      i++;
      continue;
    }

    // Comma
    if (ch === ",") {
      tokens.push({ type: "COMMA", value: "," });
      i++;
      continue;
    }

    // Operators
    if (["+", "-", "*", "/", "^"].includes(ch)) {
      if (ch === "-") {
        const prevToken = tokens[tokens.length - 1];
        if (
          !prevToken ||
          prevToken.type === "OPERATOR" ||
          prevToken.type === "LPAREN" ||
          prevToken.type === "COMMA"
        ) {
          tokens.push({ type: "UNARY_MINUS", value: "neg" });
          i++;
          continue;
        }
      }
      tokens.push({ type: "OPERATOR", value: ch });
      i++;
      continue;
    }

    i++;
  }

  // Implicit Multiplication Insertion: 2(3) -> 2*(3), 3sin(30) -> 3*sin(30), 2π -> 2*π
  const resultTokens: Token[] = [];
  for (let j = 0; j < tokens.length; j++) {
    const curr = tokens[j];
    const next = tokens[j + 1];
    resultTokens.push(curr);

    if (next) {
      const isCurrVal =
        curr.type === "NUMBER" ||
        curr.type === "CONST" ||
        curr.type === "RPAREN" ||
        curr.type === "POSTFIX";
      const isNextVal =
        next.type === "NUMBER" ||
        next.type === "CONST" ||
        next.type === "FUNCTION" ||
        next.type === "LPAREN";

      if (isCurrVal && isNextVal) {
        resultTokens.push({ type: "OPERATOR", value: "*" });
      }
    }
  }

  return resultTokens;
}

const PRECEDENCE: Record<string, number> = {
  ",": 0,
  "+": 1,
  "-": 1,
  "%+": 1,
  "%-": 1,
  "*": 2,
  "/": 2,
  "%": 2,
  "npr": 3,
  "ncr": 3,
  "yroot": 3,
  "^": 4,
  "neg": 5,
  "!": 6,
};

function shuntingYard(tokens: Token[]): Token[] {
  const outputQueue: Token[] = [];
  const operatorStack: Token[] = [];
  const argCountStack: number[] = [];

  for (const token of tokens) {
    if (token.type === "NUMBER" || token.type === "CONST") {
      outputQueue.push(token);
    } else if (token.type === "FUNCTION") {
      operatorStack.push(token);
      argCountStack.push(1);
    } else if (token.type === "OPERATOR" || token.type === "UNARY_MINUS") {
      while (operatorStack.length > 0) {
        const top = operatorStack[operatorStack.length - 1];
        if (
          top.type === "OPERATOR" ||
          top.type === "UNARY_MINUS" ||
          top.type === "FUNCTION"
        ) {
          const pTop = PRECEDENCE[top.value] || (top.type === "FUNCTION" ? 7 : 0);
          const pCurr = PRECEDENCE[token.value] || 0;

          if (top.type === "FUNCTION" || pTop > pCurr || (pTop === pCurr && token.value !== "^")) {
            outputQueue.push(operatorStack.pop()!);
            if (top.type === "FUNCTION") argCountStack.pop();
          } else {
            break;
          }
        } else {
          break;
        }
      }
      operatorStack.push(token);
    } else if (token.type === "POSTFIX") {
      outputQueue.push(token);
    } else if (token.type === "COMMA") {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1].type !== "LPAREN"
      ) {
        outputQueue.push(operatorStack.pop()!);
      }
      if (argCountStack.length > 0) {
        argCountStack[argCountStack.length - 1] += 1;
      }
    } else if (token.type === "LPAREN") {
      operatorStack.push(token);
    } else if (token.type === "RPAREN") {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1].type !== "LPAREN"
      ) {
        outputQueue.push(operatorStack.pop()!);
      }
      if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1].type === "LPAREN") {
        operatorStack.pop(); // Pop LPAREN
      }
      if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1].type === "FUNCTION") {
        const fnToken = operatorStack.pop()!;
        const argsCount = argCountStack.pop() || 1;
        fnToken.argCount = argsCount;
        outputQueue.push(fnToken);
      }
    }
  }

  while (operatorStack.length > 0) {
    const top = operatorStack.pop()!;
    if (top.type !== "LPAREN") {
      if (top.type === "FUNCTION") {
        top.argCount = argCountStack.pop() || 1;
      }
      outputQueue.push(top);
    }
  }

  return outputQueue;
}

function evaluateRPN(
  rpnTokens: Token[],
  angleMode: "deg" | "rad" | "grad"
): number {
  const stack: number[] = [];

  for (const token of rpnTokens) {
    if (token.type === "NUMBER" || token.type === "CONST") {
      stack.push(token.num ?? parseFloat(token.value));
    } else if (token.type === "UNARY_MINUS") {
      const a = stack.pop() ?? 0;
      stack.push(-a);
    } else if (token.type === "POSTFIX") {
      const a = stack.pop() ?? 0;
      if (token.value === "!") stack.push(factorial(a));
      else if (token.value === "%") stack.push(a / 100);
    } else if (token.type === "OPERATOR") {
      const b = stack.pop() ?? 0;
      const a = stack.pop() ?? 0;
      switch (token.value) {
        case "+": stack.push(a + b); break;
        case "-": stack.push(a - b); break;
        case "*": stack.push(a * b); break;
        case "/":
          if (b === 0) throw new Error("Division by zero");
          stack.push(a / b);
          break;
        case "%": stack.push(a % b); break;
        case "%+": stack.push(a * (1 + b / 100)); break;
        case "%-": stack.push(a * (1 - b / 100)); break;
        case "^": stack.push(Math.pow(a, b)); break;
        case "npr": stack.push(nPr(a, b)); break;
        case "ncr": stack.push(nCr(a, b)); break;
        case "yroot":
          if (b === 0) throw new Error("Root index cannot be zero");
          stack.push(Math.pow(a, 1 / b));
          break;
      }
    } else if (token.type === "FUNCTION") {
      const fn = token.value;
      const k = token.argCount || 1;
      const args: number[] = [];
      for (let i = 0; i < k; i++) {
        args.unshift(stack.pop() ?? 0);
      }

      const a = args[0] ?? 0;
      const b = args[1] ?? 0;

      switch (fn) {
        // Trigonometry
        case "sin": stack.push(Math.sin(toRad(a, angleMode))); break;
        case "cos": stack.push(Math.cos(toRad(a, angleMode))); break;
        case "tan": stack.push(Math.tan(toRad(a, angleMode))); break;
        case "asin": stack.push(fromRad(Math.asin(a), angleMode)); break;
        case "acos": stack.push(fromRad(Math.acos(a), angleMode)); break;
        case "atan": stack.push(fromRad(Math.atan(a), angleMode)); break;
        case "sinh": stack.push(Math.sinh(a)); break;
        case "cosh": stack.push(Math.cosh(a)); break;
        case "tanh": stack.push(Math.tanh(a)); break;
        case "csc": stack.push(1 / Math.sin(toRad(a, angleMode))); break;
        case "sec": stack.push(1 / Math.cos(toRad(a, angleMode))); break;
        case "cot": stack.push(1 / Math.tan(toRad(a, angleMode))); break;

        // Logarithms & Exponents
        case "ln":
          if (a <= 0) throw new Error("Domain Error: ln(x) for x <= 0");
          stack.push(Math.log(a));
          break;
        case "log":
        case "log10":
          if (k === 2) {
            if (a <= 0 || b <= 0 || b === 1) throw new Error("Domain Error in log(x, base)");
            stack.push(Math.log(a) / Math.log(b));
          } else {
            if (a <= 0) throw new Error("Domain Error: log10(x) for x <= 0");
            stack.push(Math.log10(a));
          }
          break;
        case "log2":
          if (a <= 0) throw new Error("Domain Error: log2(x) for x <= 0");
          stack.push(Math.log2(a));
          break;

        // Roots & Powers
        case "sqrt":
          if (a < 0) throw new Error("Domain Error: sqrt(x) for x < 0");
          stack.push(Math.sqrt(a));
          break;
        case "cbrt": stack.push(Math.cbrt(a)); break;
        case "yroot":
          if (b === 0) throw new Error("Root index cannot be zero");
          stack.push(Math.pow(a, 1 / b));
          break;

        // Combinatorics
        case "npr": stack.push(nPr(a, b)); break;
        case "ncr": stack.push(nCr(a, b)); break;
        case "gcd": stack.push(gcd(a, b)); break;
        case "lcm": stack.push(lcm(a, b)); break;
        case "hypot": stack.push(Math.hypot(a, b)); break;

        // Utility
        case "abs": stack.push(Math.abs(a)); break;
        case "floor": stack.push(Math.floor(a)); break;
        case "ceil": stack.push(Math.ceil(a)); break;
        case "round": stack.push(Math.round(a)); break;
        case "trunc": stack.push(Math.trunc(a)); break;
        case "frac": stack.push(a - Math.trunc(a)); break;
        case "sgn": stack.push(Math.sign(a)); break;
        case "gamma": stack.push(gamma(a)); break;

        // Dataset / Statistical
        case "sum": stack.push(args.reduce((x, y) => x + y, 0)); break;
        case "prod": stack.push(args.reduce((x, y) => x * y, 1)); break;
        case "sumsq": stack.push(args.reduce((x, y) => x + y * y, 0)); break;
        case "sumcube": stack.push(args.reduce((x, y) => x + Math.pow(y, 3), 0)); break;
        case "mean": stack.push(calcMean(args)); break;
        case "median": stack.push(calcMedian(args)); break;
        case "mode": stack.push(calcMode(args)); break;
        case "stddev": stack.push(calcStdDev(args)); break;
        case "variance": stack.push(calcVariance(args)); break;

        default:
          stack.push(a);
          break;
      }
    }
  }

  if (stack.length === 0) return 0;
  return stack[stack.length - 1];
}

function calculateMath(
  exprStr: string,
  angleMode: "deg" | "rad" | "grad",
  ansVal: number
): { num: number; str: string; error?: string } {
  if (!exprStr.trim()) return { num: 0, str: "0" };

  try {
    const tokens = tokenize(exprStr, ansVal);
    const rpn = shuntingYard(tokens);
    const result = evaluateRPN(rpn, angleMode);

    if (isNaN(result)) return { num: NaN, str: "Math Error", error: "Math Error" };
    if (!isFinite(result)) return { num: Infinity, str: "Infinity", error: "Overflow" };

    const cleanNum = parseFloat(result.toFixed(10));
    return { num: cleanNum, str: String(cleanNum) };
  } catch (err: any) {
    return { num: NaN, str: "Math Error", error: err.message || "Syntax Error" };
  }
}

// ==========================================
// MAIN SCIENTIFIC CALCULATOR COMPONENT
// ==========================================

export function ScientificCalculator() {
  const [expression, setExpression] = useState<string>("");
  const [cursorPos, setCursorPos] = useState<number>(0);
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [angleMode, setAngleMode] = useState<"deg" | "rad" | "grad">("deg");
  const [displayFormat, setDisplayFormat] = useState<"fix" | "sci">("fix");
  const [memory, setMemory] = useState<number>(0);
  const [lastAns, setLastAns] = useState<number>(0);
  const [history, setHistory] = useState<Array<{ expr: string; result: string; time: string }>>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [showAdditional, setShowAdditional] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const triggerStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Live real-time preview
  useEffect(() => {
    if (!expression.trim()) {
      setDisplayValue("0");
      return;
    }
    if (!hasEvaluated) {
      const res = calculateMath(expression, angleMode, lastAns);
      if (!res.error && !isNaN(res.num)) {
        if (displayFormat === "sci" && res.num !== 0) {
          setDisplayValue(res.num.toExponential(6));
        } else {
          setDisplayValue(res.str);
        }
      }
    }
  }, [expression, angleMode, lastAns, displayFormat, hasEvaluated]);

  // Insert text at current cursor position
  const handleInput = useCallback((text: string) => {
    setExpression((prev) => {
      let current = prev;
      let pos = cursorPos;
      if (hasEvaluated && !["+", "-", "×", "÷", "^", "%", "*", "/"].includes(text)) {
        current = "";
        pos = 0;
      }
      pos = Math.min(Math.max(0, pos), current.length);
      const newExpr = current.slice(0, pos) + text + current.slice(pos);
      setCursorPos(pos + text.length);
      setHasEvaluated(false);
      return newExpr;
    });
  }, [hasEvaluated, cursorPos]);

  const handleClear = () => {
    setExpression("");
    setDisplayValue("0");
    setCursorPos(0);
    setHasEvaluated(false);
  };

  // Backspace at current cursor position
  const handleBackspace = () => {
    setExpression((prev) => {
      const pos = Math.min(Math.max(0, cursorPos), prev.length);
      if (pos <= 0) return prev;
      const newExpr = prev.slice(0, pos - 1) + prev.slice(pos);
      setCursorPos(pos - 1);
      return newExpr;
    });
    setHasEvaluated(false);
  };

  // Navigation Handlers
  const moveCursorLeft = useCallback(() => {
    setCursorPos((prev) => Math.max(0, prev - 1));
  }, []);

  const moveCursorRight = useCallback(() => {
    setCursorPos((prev) => Math.min(expression.length, prev + 1));
  }, [expression.length]);

  const moveCursorUp = useCallback(() => {
    setCursorPos(0);
    triggerStatus("Cursor: Start of Equation");
  }, []);

  const moveCursorDown = useCallback(() => {
    setCursorPos(expression.length);
    triggerStatus("Cursor: End of Equation");
  }, [expression.length]);

  const handleCalculate = useCallback(() => {
    if (!expression.trim()) return;
    const res = calculateMath(expression, angleMode, lastAns);
    let finalStr = res.str;

    if (res.error) {
      setDisplayValue("Math Error");
      return;
    }

    if (displayFormat === "sci" && !isNaN(res.num) && res.num !== 0) {
      finalStr = res.num.toExponential(6);
    }

    setDisplayValue(finalStr);
    setLastAns(res.num);
    setHasEvaluated(true);
    setCursorPos(expression.length);

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setHistory((prev) => [{ expr: expression, result: finalStr, time }, ...prev.slice(0, 14)]);
  }, [expression, angleMode, lastAns, displayFormat]);

  // Memory Operations with Visual Feedback
  const handleMemoryAdd = () => {
    const val = parseFloat(displayValue) || 0;
    const nextMem = memory + val;
    setMemory(nextMem);
    triggerStatus(`M+ (${val}) → M = ${nextMem}`);
  };

  const handleMemorySub = () => {
    const val = parseFloat(displayValue) || 0;
    const nextMem = memory - val;
    setMemory(nextMem);
    triggerStatus(`M- (${val}) → M = ${nextMem}`);
  };

  const handleMemoryRecall = () => {
    handleInput(String(memory));
    triggerStatus(`Recalled M = ${memory}`);
  };

  const handleMemoryClear = () => {
    setMemory(0);
    triggerStatus("Memory Cleared (M = 0)");
  };

  const handleMemoryStore = () => {
    const val = parseFloat(displayValue) || 0;
    setMemory(val);
    triggerStatus(`Stored ${val} in Memory`);
  };

  // Physical Keyboard Listener (including Arrow Keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key >= "0" && e.key <= "9") handleInput(e.key);
      else if (e.key === ".") handleInput(".");
      else if (e.key === "+") handleInput("+");
      else if (e.key === "-") handleInput("-");
      else if (e.key === "*") handleInput("×");
      else if (e.key === "/") handleInput("÷");
      else if (e.key === "(" || e.key === ")") handleInput(e.key);
      else if (e.key === "^") handleInput("^");
      else if (e.key === "%") handleInput("%");
      else if (e.key === ",") handleInput(",");
      else if (e.key === "ArrowLeft") {
        e.preventDefault();
        moveCursorLeft();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        moveCursorRight();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        moveCursorUp();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        moveCursorDown();
      } else if (e.key === "Home") {
        e.preventDefault();
        setCursorPos(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setCursorPos(expression.length);
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleCalculate();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === "Escape") {
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleInput, handleCalculate, moveCursorLeft, moveCursorRight, moveCursorUp, moveCursorDown, expression.length]);

  const handleCopy = () => {
    navigator.clipboard.writeText(displayValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Button Action Dispatcher
  const onBtnClick = (action: string) => {
    switch (action) {
      case "AC":
        handleClear();
        break;
      case "Back":
      case "⌫":
      case "←":
        handleBackspace();
        break;
      case "◀":
      case "Left":
        moveCursorLeft();
        break;
      case "▶":
      case "Right":
        moveCursorRight();
        break;
      case "▲":
      case "Up":
        moveCursorUp();
        break;
      case "▼":
      case "Down":
        moveCursorDown();
        break;
      case "=":
        handleCalculate();
        break;
      case "M+":
        handleMemoryAdd();
        break;
      case "M-":
        handleMemorySub();
        break;
      case "MR":
        handleMemoryRecall();
        break;
      case "MC":
        handleMemoryClear();
        break;
      case "Store":
        handleMemoryStore();
        break;
      case "Recall":
        handleMemoryRecall();
        break;
      case "Ans":
        handleInput("Ans");
        break;
      case "DRG►":
        setAngleMode((prev) => (prev === "deg" ? "rad" : prev === "rad" ? "grad" : "deg"));
        break;
      case "±":
        setExpression((prev) => (prev.startsWith("-") ? prev.slice(1) : "-" + prev));
        break;
      case "History":
        setShowHistory((prev) => {
          const next = !prev;
          triggerStatus(next ? "History Drawer Opened" : "History Drawer Closed");
          return next;
        });
        break;
      case "Clear Hist":
        setHistory([]);
        setShowHistory(true);
        triggerStatus("Calculation History Cleared");
        break;

      // Function Triggers
      case "sin":
      case "cos":
      case "tan":
      case "sinh":
      case "cosh":
      case "tanh":
      case "csc":
      case "sec":
      case "cot":
      case "ln":
      case "log":
      case "log₂":
      case "log₁₀":
      case "abs":
      case "floor":
      case "ceil":
      case "round":
      case "trunc":
      case "frac":
      case "sgn":
      case "sqrt":
      case "cbrt":
      case "Γ(x)":
        if (action === "Γ(x)") handleInput("gamma(");
        else if (action === "log₂") handleInput("log2(");
        else if (action === "log₁₀") handleInput("log10(");
        else handleInput(`${action}(`);
        break;

      case "sin⁻¹": handleInput("asin("); break;
      case "cos⁻¹": handleInput("acos("); break;
      case "tan⁻¹": handleInput("atan("); break;
      case "xʸ": handleInput("^"); break;
      case "x³": handleInput("^3"); break;
      case "x²": handleInput("^2"); break;
      case "eˣ": handleInput("e^("); break;
      case "10ˣ": handleInput("10^("); break;
      case "2ˣ": handleInput("2^("); break;
      case "ʸ√x":
      case "ⁿ√x":
      case "y_√x":
        handleInput("yroot(");
        break;
      case "³√x": handleInput("cbrt("); break;
      case "1/x": handleInput("1/("); break;
      case "n!": handleInput("!"); break;
      case "P": case "nPr": handleInput("nPr("); break;
      case "C": case "nCr": handleInput("nCr("); break;
      case "Mod": handleInput(" mod "); break;
      case "GCD": handleInput("gcd("); break;
      case "LCM": handleInput("lcm("); break;
      case "Exp": case "EXP": case "EEX": handleInput("*10^("); break;
      case "Rnd": case "Rand": handleInput(String(parseFloat(Math.random().toFixed(4)))); break;

      // Dataset & Statistical Buttons
      case "Mean": handleInput("mean("); break;
      case "Median": handleInput("median("); break;
      case "Mode": handleInput("mode("); break;
      case "Std Dev": handleInput("stddev("); break;
      case "Var": handleInput("variance("); break;
      case "Σx": handleInput("sum("); break;
      case "Πx": handleInput("prod("); break;
      case "Σx²": handleInput("sumsq("); break;
      case "Σx³": handleInput("sumcube("); break;
      case "hyp": handleInput("hypot("); break;
      case "RandInt": handleInput(String(Math.floor(Math.random() * 100) + 1)); break;

      // Conversions
      case "HEX":
        try {
          const n = Math.round(parseFloat(displayValue));
          if (!isNaN(n)) setDisplayValue("0x" + n.toString(16).toUpperCase());
        } catch (e) {}
        break;
      case "BIN":
        try {
          const n = Math.round(parseFloat(displayValue));
          if (!isNaN(n)) setDisplayValue("0b" + n.toString(2));
        } catch (e) {}
        break;
      case "OCT":
        try {
          const n = Math.round(parseFloat(displayValue));
          if (!isNaN(n)) setDisplayValue("0o" + n.toString(8));
        } catch (e) {}
        break;
      case "DEC":
        try {
          const n = parseInt(displayValue, 16) || parseInt(displayValue, 2) || parseInt(displayValue, 8) || parseFloat(displayValue);
          if (!isNaN(n)) setDisplayValue(String(n));
        } catch (e) {}
        break;
      case "→Frac":
        try {
          const num = parseFloat(displayValue);
          if (!isNaN(num)) setDisplayValue(toFractionStr(num));
        } catch (e) {}
        break;
      case "→Dec":
        try {
          const res = calculateMath(displayValue, angleMode, lastAns);
          if (!isNaN(res.num)) setDisplayValue(String(res.num));
        } catch (e) {}
        break;
      case "DMS":
        try {
          const num = parseFloat(displayValue);
          if (!isNaN(num)) setDisplayValue(toDmsStr(num));
        } catch (e) {}
        break;
      case "Fact":
        try {
          const num = parseFloat(displayValue);
          if (!isNaN(num)) setDisplayValue(primeFactors(num));
        } catch (e) {}
        break;
      case "%+": handleInput("%+"); break;
      case "%-": handleInput("%-"); break;

      default:
        handleInput(action);
        break;
    }
  };

  // Main Pad Button Grid Definition (8 columns x 10 rows)
  const mainPadRows = [
    // Row 1
    [
      { label: "sin", action: "sin" },
      { label: "cos", action: "cos" },
      { label: "tan", action: "tan" },
      { label: "sin⁻¹", action: "sin⁻¹" },
      { label: "cos⁻¹", action: "cos⁻¹" },
      { label: "tan⁻¹", action: "tan⁻¹" },
      { label: "π", action: "π" },
      { label: "e", action: "e" },
    ],
    // Row 2
    [
      { label: "sinh", action: "sinh" },
      { label: "cosh", action: "cosh" },
      { label: "tanh", action: "tanh" },
      { label: "csc", action: "csc" },
      { label: "sec", action: "sec" },
      { label: "cot", action: "cot" },
      { label: "i", action: "i" },
      { label: "ϕ", action: "ϕ" },
    ],
    // Row 3
    [
      { label: "xʸ", action: "xʸ" },
      { label: "x³", action: "x³" },
      { label: "x²", action: "x²" },
      { label: "eˣ", action: "eˣ" },
      { label: "10ˣ", action: "10ˣ" },
      { label: "2ˣ", action: "2ˣ" },
      { label: "ʸ√x", action: "ʸ√x" },
      { label: "³√x", action: "³√x" },
    ],
    // Row 4
    [
      { label: "y_√x", action: "y_√x" },
      { label: "ⁿ√x", action: "ⁿ√x" },
      { label: "|x|", action: "abs" },
      { label: "ln", action: "ln" },
      { label: "log", action: "log" },
      { label: "log₂", action: "log₂" },
      { label: "log₁₀", action: "log₁₀" },
      { label: "log_y", action: "log" },
    ],
    // Row 5
    [
      { label: "(", action: "(" },
      { label: ")", action: ")" },
      { label: "1/x", action: "1/x" },
      { label: "%", action: "%" },
      { label: "n!", action: "n!" },
      { label: "Γ(x)", action: "Γ(x)" },
      { label: "P", action: "P" },
      { label: "C", action: "C" },
    ],
    // Row 6
    [
      { label: "Mod", action: "Mod" },
      { label: "GCD", action: "GCD" },
      { label: "LCM", action: "LCM" },
      { label: "Exp", action: "Exp" },
      { label: "Rnd", action: "Rnd" },
      { label: "±", action: "±" },
      { label: "⌫", action: "⌫", className: "font-bold text-zinc-700 dark:text-zinc-300" },
      { label: "AC", action: "AC", className: "font-black text-white bg-rose-600 border-rose-500 border-b-2 border-b-rose-800 hover:bg-rose-500 active:translate-y-0.5 active:border-b-0 shadow-xs" },
    ],
    // Row 7
    [
      { label: "7", action: "7", className: "font-black text-zinc-900 dark:text-zinc-100 text-base bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 border-b-2 border-b-zinc-350 dark:border-b-zinc-900 hover:bg-zinc-50 active:translate-y-0.5 active:border-b-0 shadow-xs" },
      { label: "8", action: "8", className: "font-black text-zinc-900 dark:text-zinc-100 text-base bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 border-b-2 border-b-zinc-350 dark:border-b-zinc-900 hover:bg-zinc-50 active:translate-y-0.5 active:border-b-0 shadow-xs" },
      { label: "9", action: "9", className: "font-black text-zinc-900 dark:text-zinc-100 text-base bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 border-b-2 border-b-zinc-350 dark:border-b-zinc-900 hover:bg-zinc-50 active:translate-y-0.5 active:border-b-0 shadow-xs" },
      { label: "÷", action: "÷", className: "font-black text-white text-base bg-blue-600 border-blue-500 border-b-2 border-b-blue-800 hover:bg-blue-500 active:translate-y-0.5 active:border-b-0 shadow-xs" },
      { label: "Back", action: "Back", className: "text-xs text-zinc-700 dark:text-zinc-300" },
      { label: "Ans", action: "Ans", className: "font-bold text-blue-600 dark:text-blue-400" },
      { label: "M+", action: "M+", className: "font-bold text-purple-600 dark:text-purple-400" },
      { label: "MR", action: "MR", className: "font-bold text-purple-600 dark:text-purple-400" },
    ],
    // Row 8
    [
      { label: "4", action: "4", className: "font-black text-zinc-900 dark:text-zinc-100 text-base bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 border-b-2 border-b-zinc-350 dark:border-b-zinc-900 hover:bg-zinc-50 active:translate-y-0.5 active:border-b-0 shadow-xs" },
      { label: "5", action: "5", className: "font-black text-zinc-900 dark:text-zinc-100 text-base bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 border-b-2 border-b-zinc-350 dark:border-b-zinc-900 hover:bg-zinc-50 active:translate-y-0.5 active:border-b-0 shadow-xs" },
      { label: "6", action: "6", className: "font-black text-zinc-900 dark:text-zinc-100 text-base bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 border-b-2 border-b-zinc-350 dark:border-b-zinc-900 hover:bg-zinc-50 active:translate-y-0.5 active:border-b-0 shadow-xs" },
      { label: "×", action: "×", className: "font-black text-white text-base bg-blue-600 border-blue-500 border-b-2 border-b-blue-800 hover:bg-blue-500 active:translate-y-0.5 active:border-b-0 shadow-xs" },
      { label: "(-)", action: "-", className: "font-bold text-zinc-700 dark:text-zinc-300" },
      { label: "EEX", action: "EEX", className: "font-bold text-emerald-600 dark:text-emerald-400" },
      { label: "M-", action: "M-", className: "font-bold text-purple-600 dark:text-purple-400" },
      { label: "MC", action: "MC", className: "font-bold text-purple-600 dark:text-purple-400" },
    ],
    // Row 9
    [
      { label: "1", action: "1", className: "font-black text-zinc-900 dark:text-zinc-100 text-base bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 border-b-2 border-b-zinc-350 dark:border-b-zinc-900 hover:bg-zinc-50 active:translate-y-0.5 active:border-b-0 shadow-xs" },
      { label: "2", action: "2", className: "font-black text-zinc-900 dark:text-zinc-100 text-base bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 border-b-2 border-b-zinc-350 dark:border-b-zinc-900 hover:bg-zinc-50 active:translate-y-0.5 active:border-b-0 shadow-xs" },
      { label: "3", action: "3", className: "font-black text-zinc-900 dark:text-zinc-100 text-base bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 border-b-2 border-b-zinc-350 dark:border-b-zinc-900 hover:bg-zinc-50 active:translate-y-0.5 active:border-b-0 shadow-xs" },
      { label: "-", action: "-", className: "font-black text-white text-base bg-blue-600 border-blue-500 border-b-2 border-b-blue-800 hover:bg-blue-500 active:translate-y-0.5 active:border-b-0 shadow-xs" },
      { label: "+", action: "+", className: "font-black text-white text-base bg-blue-600 border-blue-500 border-b-2 border-b-blue-800 hover:bg-blue-500 active:translate-y-0.5 active:border-b-0 shadow-xs" },
      { label: "=", action: "=", className: "font-black text-white text-base bg-blue-600 border-blue-500 border-b-2 border-b-blue-800 hover:bg-blue-500 active:translate-y-0.5 active:border-b-0 shadow-xs" },
      { label: "Store", action: "Store", className: "font-bold text-purple-600 dark:text-purple-400" },
      { label: "Recall", action: "Recall", className: "font-bold text-purple-600 dark:text-purple-400" },
    ],
    // Row 10
    [
      { label: "0", action: "0", className: "font-black text-zinc-900 dark:text-zinc-100 text-base bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 border-b-2 border-b-zinc-350 dark:border-b-zinc-900 hover:bg-zinc-50 active:translate-y-0.5 active:border-b-0 shadow-xs" },
      { label: ".", action: ".", className: "font-black text-zinc-900 dark:text-zinc-100 text-base bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 border-b-2 border-b-zinc-350 dark:border-b-zinc-900 hover:bg-zinc-50 active:translate-y-0.5 active:border-b-0 shadow-xs" },
      { label: "EXP", action: "EXP", className: "font-bold text-zinc-700 dark:text-zinc-300" },
      { label: "DRG►", action: "DRG►", className: "font-bold text-indigo-600 dark:text-indigo-400" },
      { label: ",", action: ",", className: "font-bold text-zinc-700 dark:text-zinc-300" },
      { label: "←", action: "←", className: "font-bold text-zinc-700 dark:text-zinc-300" },
      { label: "History", action: "History", className: showHistory ? "font-bold text-white bg-purple-600 border-purple-500 border-b-2 border-b-purple-700 shadow-xs" : "font-bold text-purple-600 dark:text-purple-400" },
      { label: "Clear Hist", action: "Clear Hist", className: "font-bold text-purple-600 dark:text-purple-400" },
    ],
  ];

  // Additional Functions Section Grid (8 columns x 4 rows)
  const additionalRows = [
    [
      { label: "floor", action: "floor" },
      { label: "ceil", action: "ceil" },
      { label: "round", action: "round" },
      { label: "trunc", action: "trunc" },
      { label: "frac", action: "frac" },
      { label: "abs", action: "abs" },
      { label: "sgn", action: "sgn" },
      { label: "hyp", action: "hyp" },
    ],
    [
      { label: "nPr", action: "nPr" },
      { label: "nCr", action: "nCr" },
      { label: "Σx", action: "Σx" },
      { label: "Πx", action: "Πx" },
      { label: "Σx²", action: "Σx²" },
      { label: "Σx³", action: "Σx³" },
      { label: "Mean", action: "Mean" },
      { label: "Median", action: "Median" },
    ],
    [
      { label: "Mode", action: "Mode" },
      { label: "Std Dev", action: "Std Dev" },
      { label: "Var", action: "Var" },
      { label: "Rand", action: "Rand" },
      { label: "RandInt", action: "RandInt" },
      { label: "Fact", action: "Fact" },
      { label: "DMS", action: "DMS" },
      { label: "DEG", action: "DEG" },
    ],
    [
      { label: "HEX", action: "HEX" },
      { label: "BIN", action: "BIN" },
      { label: "OCT", action: "OCT" },
      { label: "DEC", action: "DEC" },
      { label: "→Frac", action: "→Frac" },
      { label: "→Dec", action: "→Dec" },
      { label: "%+", action: "%+" },
      { label: "%-", action: "%-" },
    ],
  ];

  const sampleExamples = [
    "sin(30)",
    "log(100)",
    "2*10 + 5!",
    "sqrt(2^2 + 3^2)",
    "(5+3)*12/4 - 7",
    "ln(e) + log(10)",
  ];

  const safeCursorPos = Math.min(Math.max(0, cursorPos), expression.length);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* LEFT COLUMN: Main Calculator Frame (Col 8) */}
      <div className="lg:col-span-8 space-y-4">
        <Card className="bg-sky-50 dark:bg-sky-950/40 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 border-b-4 border-b-zinc-350 dark:border-b-zinc-800 shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-4 sm:p-5 space-y-3">
            {/* 1. LCD / DISPLAY BOX */}
            <div className="bg-emerald-950 border-2 border-emerald-800/80 rounded-xl p-3 sm:p-4 text-right font-mono space-y-1 shadow-inner relative">
              {/* LCD Top Status Bar */}
              <div className="flex items-center justify-between text-[11px] font-sans border-b border-emerald-800/50 pb-1 mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-600/40 px-1.5 py-0.2 rounded bg-emerald-900/40">
                    {angleMode.toUpperCase()}
                  </span>
                  {memory !== 0 && (
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 px-1.5 py-0.2 rounded flex items-center gap-1">
                      M = {memory}
                    </span>
                  )}
                </div>
                {statusMessage ? (
                  <span className="text-[10px] font-semibold text-purple-300 bg-purple-950/80 border border-purple-700 px-2 py-0.5 rounded-full animate-pulse">
                    {statusMessage}
                  </span>
                ) : (
                  <span className="text-[10px] text-emerald-400/80 font-mono">
                    {displayFormat.toUpperCase()}
                  </span>
                )}
              </div>

              {/* Top Expression Row with Blinking Cursor */}
              <div className="text-xs sm:text-sm text-emerald-300/80 min-h-[1.5rem] truncate font-mono flex items-center justify-end font-semibold select-none">
                {expression.length === 0 ? (
                  <span className="text-emerald-500/60 font-sans italic flex items-center gap-0.5">
                    0
                    <span className="inline-block w-0.5 h-4 bg-emerald-400 animate-pulse ml-0.5 rounded-full" />
                  </span>
                ) : (
                  <span className="font-mono tracking-wide flex items-center justify-end">
                    <span>{expression.slice(0, safeCursorPos)}</span>
                    <span className="inline-block w-0.5 h-4 bg-emerald-400 animate-pulse mx-[0.5px] rounded-full shadow-sm" />
                    <span>{expression.slice(safeCursorPos)}</span>
                  </span>
                )}
              </div>

              {/* Bottom Main Output Row */}
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 tracking-wider truncate flex items-center justify-end">
                <span>{displayValue}</span>
              </div>
            </div>

            {/* 2. MODE SWITCHER BAR */}
            <div className="flex flex-wrap items-center justify-between gap-2 py-1.5 px-3 bg-zinc-200/80 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl text-xs font-medium text-zinc-800 dark:text-zinc-300 shadow-xs">
              {/* Angle Mode Radio Group */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                  <input
                    type="radio"
                    name="angleMode"
                    checked={angleMode === "deg"}
                    onChange={() => setAngleMode("deg")}
                    className="accent-blue-600"
                  />
                  <span>Deg</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                  <input
                    type="radio"
                    name="angleMode"
                    checked={angleMode === "rad"}
                    onChange={() => setAngleMode("rad")}
                    className="accent-blue-600"
                  />
                  <span>Rad</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                  <input
                    type="radio"
                    name="angleMode"
                    checked={angleMode === "grad"}
                    onChange={() => setAngleMode("grad")}
                    className="accent-blue-600"
                  />
                  <span>Grad</span>
                </label>
              </div>

              <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-800 hidden sm:block" />

              {/* Display Format Radio Group */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                  <input
                    type="radio"
                    name="displayFormat"
                    checked={displayFormat === "fix"}
                    onChange={() => setDisplayFormat("fix")}
                    className="accent-blue-600"
                  />
                  <span>Fix</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                  <input
                    type="radio"
                    name="displayFormat"
                    checked={displayFormat === "sci"}
                    onChange={() => setDisplayFormat("sci")}
                    className="accent-blue-600"
                  />
                  <span>Sci</span>
                </label>
              </div>

              {/* History Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  setShowHistory((prev) => !prev);
                  triggerStatus(!showHistory ? "History Drawer Opened" : "History Drawer Closed");
                }}
                className={`text-[11px] px-2 py-0.5 rounded-md border font-semibold flex items-center gap-1 transition-all ${
                  showHistory
                    ? "bg-purple-600 text-white border-purple-500 border-b-2 border-b-purple-700"
                    : "bg-white dark:bg-zinc-800 text-purple-700 dark:text-purple-300 border-zinc-300 dark:border-zinc-700 border-b-2 border-b-zinc-400 dark:border-b-zinc-900 hover:bg-purple-50 active:translate-y-0.5 active:border-b-0"
                }`}
              >
                <HistoryIcon className="w-3 h-3" />
                History {history.length > 0 && `(${history.length})`}
              </button>

              {/* Copy Result Button */}
              <button
                onClick={handleCopy}
                className="ml-auto text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            {/* 3. CALCULATION HISTORY DRAWER */}
            {showHistory && (
              <div className="p-3 bg-white dark:bg-zinc-950 rounded-xl border border-purple-200 dark:border-purple-900/60 shadow-md space-y-2 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="flex items-center justify-between text-xs font-bold text-purple-950 dark:text-purple-200 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  <span className="flex items-center gap-1.5">
                    <HistoryIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    Calculation History ({history.length})
                  </span>
                  <div className="flex items-center gap-2">
                    {history.length > 0 && (
                      <button
                        onClick={() => {
                          setHistory([]);
                          triggerStatus("Calculation History Cleared");
                        }}
                        className="text-rose-600 dark:text-rose-400 hover:underline text-[11px] flex items-center gap-1 font-semibold"
                      >
                        <Trash2 className="w-3 h-3" /> Clear History
                      </button>
                    )}
                    <button
                      onClick={() => setShowHistory(false)}
                      className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-xs px-1"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {history.length === 0 ? (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center py-3">
                    No past calculations saved yet. Evaluate expressions with <strong className="font-mono text-blue-600">=</strong> or <strong className="font-mono text-blue-600">Enter</strong> to populate history.
                  </p>
                ) : (
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
                    {history.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setExpression(item.expr);
                          setDisplayValue(item.result);
                          setCursorPos(item.expr.length);
                          setHasEvaluated(true);
                          triggerStatus(`Loaded: ${item.expr} = ${item.result}`);
                        }}
                        className="p-2 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-between cursor-pointer hover:bg-purple-50 dark:hover:bg-zinc-800 transition-colors group"
                      >
                        <div className="flex flex-col">
                          <span className="font-mono text-zinc-700 dark:text-zinc-300">{item.expr}</span>
                          <span className="text-[10px] text-zinc-400">{item.time}</span>
                        </div>
                        <strong className="font-mono text-zinc-900 dark:text-zinc-100 text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400">
                          = {item.result}
                        </strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. DIRECTIONAL ARROW KEY CONTROLLER (3D Tactile Buttons) */}
            <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-zinc-200/70 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 shadow-xs my-1">
              <div className="flex flex-col items-center gap-1">
                {/* ROW 1: UP (▲) */}
                <button
                  type="button"
                  onClick={moveCursorUp}
                  title="Jump to Start of Equation (Up Arrow ▲)"
                  className="w-11 h-9 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 border-b-2 border-b-zinc-400 dark:border-b-zinc-900 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 active:translate-y-0.5 active:border-b-0 flex items-center justify-center text-sm font-black shadow-xs transition-all cursor-pointer"
                >
                  ▲
                </button>

                {/* ROW 2: LEFT (◀), CURSOR POSITION BADGE, RIGHT (▶) */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={moveCursorLeft}
                    title="Move Cursor Left 1 Character (Left Arrow ◀)"
                    className="w-11 h-9 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 border-b-2 border-b-zinc-400 dark:border-b-zinc-900 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 active:translate-y-0.5 active:border-b-0 flex items-center justify-center text-sm font-black shadow-xs transition-all cursor-pointer"
                  >
                    ◀
                  </button>

                  <div
                    onClick={() => triggerStatus(`Cursor Position: ${safeCursorPos} / ${expression.length}`)}
                    className="h-9 px-2 text-[9px] font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 rounded-lg flex items-center justify-center cursor-pointer select-none shadow-xs"
                    title="Current Cursor Position"
                  >
                    {safeCursorPos}/{expression.length}
                  </div>

                  <button
                    type="button"
                    onClick={moveCursorRight}
                    title="Move Cursor Right 1 Character (Right Arrow ▶)"
                    className="w-11 h-9 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 border-b-2 border-b-zinc-400 dark:border-b-zinc-900 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 active:translate-y-0.5 active:border-b-0 flex items-center justify-center text-sm font-black shadow-xs transition-all cursor-pointer"
                  >
                    ▶
                  </button>
                </div>

                {/* ROW 3: DOWN (▼) */}
                <button
                  type="button"
                  onClick={moveCursorDown}
                  title="Jump to End of Equation (Down Arrow ▼)"
                  className="w-11 h-9 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 border-b-2 border-b-zinc-400 dark:border-b-zinc-900 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 active:translate-y-0.5 active:border-b-0 flex items-center justify-center text-sm font-black shadow-xs transition-all cursor-pointer"
                >
                  ▼
                </button>
              </div>
            </div>

            {/* 5. MAIN BUTTON GRID (8 columns x 10 rows with 3D Keycaps) */}
            <div className="space-y-1.5 pt-1">
              {mainPadRows.map((row, rIdx) => (
                <div key={rIdx} className="grid grid-cols-8 gap-1 sm:gap-1.5">
                  {row.map((btn, cIdx) => (
                    <button
                      key={cIdx}
                      type="button"
                      onClick={() => onBtnClick(btn.action)}
                      className={`h-9 sm:h-10 rounded-lg text-xs font-semibold border transition-all duration-100 active:translate-y-0.5 active:border-b-0 flex items-center justify-center cursor-pointer select-none shadow-xs ${
                        btn.className ||
                        "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 border-b-2 border-b-zinc-300 dark:border-b-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-750"
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* 5. ADDITIONAL FUNCTIONS ACCORDION SECTION */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowAdditional((prev) => !prev)}
                className="w-full flex items-center justify-between py-2 px-3 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-900 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Additional Functions
                </span>
                {showAdditional ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showAdditional && (
                <div className="space-y-1.5 pt-2.5">
                  {additionalRows.map((row, rIdx) => (
                    <div key={rIdx} className="grid grid-cols-8 gap-1 sm:gap-1.5">
                      {row.map((btn, cIdx) => (
                        <button
                          key={cIdx}
                          type="button"
                          onClick={() => onBtnClick(btn.action)}
                          className="h-8.5 rounded-lg text-[11px] font-semibold border bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300 border-emerald-100 dark:border-emerald-900/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all duration-150 active:scale-95 flex items-center justify-center cursor-pointer select-none"
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT COLUMN: Sidebar (Features, Instructions & Quick Examples) (Col 4) */}
      <div className="lg:col-span-4 space-y-4">
        {/* Math Calculators Links */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Math Calculators
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <a href="/calculators/scientific-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Scientific
            </a>
            <a href="/calculators/fraction-calculator" className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 hover:underline">
              Fraction
            </a>
            <a href="/calculators/percentage-calculator" className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 hover:underline">
              Percentage
            </a>
            <a href="/calculators/triangle-calculator" className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 hover:underline">
              Triangle
            </a>
            <a href="/calculators/volume-calculator" className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 hover:underline">
              Volume
            </a>
            <a href="/calculators/standard-deviation-calculator" className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 hover:underline">
              Standard Deviation
            </a>
            <a href="/calculators/random-number-generator" className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 hover:underline">
              Random Generator
            </a>
            <a href="/category/math" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              More Math...
            </a>
          </div>
        </Card>

        {/* Calculator Features Guide */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Calculator Features
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2.5">
              <Keyboard className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-800 dark:text-zinc-200 block">Keyboard Support</strong>
                <span className="text-zinc-500 dark:text-zinc-400">Use your physical keyboard to type expressions directly.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-800 dark:text-zinc-200 block">Calculation History</strong>
                <span className="text-zinc-500 dark:text-zinc-400">View, click to restore, and clear calculation history.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Database className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-800 dark:text-zinc-200 block">Memory Functions</strong>
                <span className="text-zinc-500 dark:text-zinc-400">Store and recall values (M+, M-, MR, MC, Store, Recall).</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Compass className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-800 dark:text-zinc-200 block">Angle Unit Modes</strong>
                <span className="text-zinc-500 dark:text-zinc-400">Switch seamlessly between Degrees, Radians, and Gradians.</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Interactive Quick Examples */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Quick Math Examples
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Click any example to load it into the calculator:</p>

          <div className="space-y-1.5 font-mono text-xs">
            {sampleExamples.map((ex, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setExpression(ex);
                  const res = calculateMath(ex, angleMode, lastAns);
                  if (!res.error && !isNaN(res.num)) setDisplayValue(res.str);
                }}
                className="w-full text-left p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:bg-blue-50 dark:hover:bg-zinc-800 text-blue-700 dark:text-blue-400 transition-colors flex items-center justify-between"
              >
                <span>{ex}</span>
                <span className="text-[10px] text-zinc-400 font-sans font-semibold">Load →</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ScientificCalculator;
