"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Calculator as CalcIcon, Delete } from "lucide-react";

export function QuickCalculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operator, setOperator] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [isRad, setIsRad] = useState(true);

  const inputDigit = useCallback((digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  }, [display, waitingForOperand]);

  const inputDot = useCallback(() => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }, [display, waitingForOperand]);

  const clearAll = useCallback(() => {
    setDisplay("0");
    setExpression("");
    setWaitingForOperand(false);
    setOperator(null);
    setPrevValue(null);
  }, []);

  const backspace = useCallback(() => {
    if (waitingForOperand) return;
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  }, [display, waitingForOperand]);

  const performOperation = useCallback((nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
      setExpression(`${inputValue} ${nextOperator}`);
    } else if (operator) {
      const currentValue = prevValue || 0;
      let newValue = 0;

      switch (operator) {
        case "+":
          newValue = currentValue + inputValue;
          break;
        case "-":
          newValue = currentValue - inputValue;
          break;
        case "×":
        case "*":
          newValue = currentValue * inputValue;
          break;
        case "÷":
        case "/":
          newValue = inputValue !== 0 ? currentValue / inputValue : 0;
          break;
        default:
          newValue = inputValue;
      }

      setPrevValue(newValue);
      const formatted = String(Number(newValue.toFixed(8)));
      setDisplay(formatted);
      setExpression(`${formatted} ${nextOperator}`);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  }, [display, operator, prevValue]);

  const handleEqual = useCallback(() => {
    if (!operator || prevValue === null) return;
    const inputValue = parseFloat(display);
    let newValue = 0;

    switch (operator) {
      case "+":
        newValue = prevValue + inputValue;
        break;
      case "-":
        newValue = prevValue - inputValue;
        break;
      case "×":
      case "*":
        newValue = prevValue * inputValue;
        break;
      case "÷":
      case "/":
        newValue = inputValue !== 0 ? prevValue / inputValue : 0;
        break;
      default:
        newValue = inputValue;
    }

    const formatted = String(Number(newValue.toFixed(8)));
    setExpression(`${prevValue} ${operator} ${inputValue} =`);
    setDisplay(formatted);
    setOperator(null);
    setPrevValue(null);
    setWaitingForOperand(true);
  }, [display, operator, prevValue]);

  const handleFunction = useCallback((fn: string) => {
    const val = parseFloat(display);
    let res = val;
    let expLabel = "";

    const angle = isRad ? val : (val * Math.PI) / 180;

    switch (fn) {
      case "sin":
        res = Math.sin(angle);
        expLabel = `sin(${val})`;
        break;
      case "cos":
        res = Math.cos(angle);
        expLabel = `cos(${val})`;
        break;
      case "tan":
        res = Math.tan(angle);
        expLabel = `tan(${val})`;
        break;
      case "sqrt":
        res = val >= 0 ? Math.sqrt(val) : NaN;
        expLabel = `√(${val})`;
        break;
      case "sq":
        res = val * val;
        expLabel = `${val}²`;
        break;
      case "+/-":
        res = -val;
        expLabel = `negate(${val})`;
        break;
      case "%":
        res = val / 100;
        expLabel = `${val}%`;
        break;
      default:
        break;
    }

    const formatted = isNaN(res) ? "Error" : String(Number(res.toFixed(8)));
    setExpression(expLabel ? `${expLabel} =` : "");
    setDisplay(formatted);
    setWaitingForOperand(true);
  }, [display, isRad]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key >= "0" && e.key <= "9") inputDigit(e.key);
      else if (e.key === ".") inputDot();
      else if (e.key === "+") performOperation("+");
      else if (e.key === "-") performOperation("-");
      else if (e.key === "*") performOperation("×");
      else if (e.key === "/") {
        e.preventDefault();
        performOperation("÷");
      } else if (e.key === "Enter" || e.key === "=") handleEqual();
      else if (e.key === "Backspace") backspace();
      else if (e.key === "Escape") clearAll();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputDigit, inputDot, performOperation, handleEqual, backspace, clearAll]);

  return (
    <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.08),0_4px_10px_rgba(0,0,0,0.04)] max-w-[320px] w-full mx-auto space-y-2.5 font-sans transition-all">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-1 text-xs">
        <span className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 tracking-wide">
          <CalcIcon className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> Quick Scientific Calc
        </span>
        <button
          onClick={() => setIsRad(!isRad)}
          className="text-[10px] font-sans tabular-nums font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 border border-zinc-200 dark:border-zinc-700 transition-colors uppercase cursor-pointer"
          title="Click to toggle RAD/DEG"
        >
          {isRad ? "RAD" : "DEG"}
        </button>
      </div>

      {/* Screen Display */}
      <div className="bg-slate-950 text-slate-50 border border-slate-800 rounded-xl p-2.5 text-right shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] flex flex-col justify-between min-h-[64px]">
        <div className="text-[11px] font-sans tabular-nums text-slate-400 h-4 truncate">
          {expression || "\u00A0"}
        </div>
        <div className="text-2xl font-sans tabular-nums font-bold text-emerald-400 tracking-wider truncate">
          {display}
        </div>
      </div>

      {/* Calculator 5x5 Keypad Grid */}
      <div className="grid grid-cols-5 gap-1.5 text-xs font-sans tabular-nums select-none">
        {/* Row 1: sin, cos, tan, AC, Backspace */}
        <button onClick={() => handleFunction("sin")} className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 font-semibold shadow-[0_2px_0_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-0.5 transition-all">sin</button>
        <button onClick={() => handleFunction("cos")} className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 font-semibold shadow-[0_2px_0_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-0.5 transition-all">cos</button>
        <button onClick={() => handleFunction("tan")} className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 font-semibold shadow-[0_2px_0_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-0.5 transition-all">tan</button>
        <button onClick={clearAll} className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-bold shadow-[0_2px_0_rgba(185,28,28,0.4)] active:shadow-none active:translate-y-0.5 transition-all">AC</button>
        <button onClick={backspace} className="p-2 flex items-center justify-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/25 font-bold shadow-[0_2px_0_rgba(217,119,6,0.2)] active:shadow-none active:translate-y-0.5 transition-all" title="Backspace"><Delete className="h-3.5 w-3.5" /></button>

        {/* Row 2: √, 7, 8, 9, ÷ */}
        <button onClick={() => handleFunction("sqrt")} className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 font-semibold shadow-[0_2px_0_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-0.5 transition-all">√</button>
        <button onClick={() => inputDigit("7")} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-bold border border-zinc-200/80 dark:border-zinc-700 shadow-[0_2px_0_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-0.5 transition-all">7</button>
        <button onClick={() => inputDigit("8")} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-bold border border-zinc-200/80 dark:border-zinc-700 shadow-[0_2px_0_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-0.5 transition-all">8</button>
        <button onClick={() => inputDigit("9")} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-bold border border-zinc-200/80 dark:border-zinc-700 shadow-[0_2px_0_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-0.5 transition-all">9</button>
        <button onClick={() => performOperation("÷")} className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold shadow-[0_2px_0_rgba(29,78,216,0.4)] active:shadow-none active:translate-y-0.5 transition-all">÷</button>

        {/* Row 3: x², 4, 5, 6, × */}
        <button onClick={() => handleFunction("sq")} className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 font-semibold shadow-[0_2px_0_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-0.5 transition-all">x²</button>
        <button onClick={() => inputDigit("4")} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-bold border border-zinc-200/80 dark:border-zinc-700 shadow-[0_2px_0_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-0.5 transition-all">4</button>
        <button onClick={() => inputDigit("5")} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-bold border border-zinc-200/80 dark:border-zinc-700 shadow-[0_2px_0_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-0.5 transition-all">5</button>
        <button onClick={() => inputDigit("6")} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-bold border border-zinc-200/80 dark:border-zinc-700 shadow-[0_2px_0_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-0.5 transition-all">6</button>
        <button onClick={() => performOperation("×")} className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold shadow-[0_2px_0_rgba(29,78,216,0.4)] active:shadow-none active:translate-y-0.5 transition-all">×</button>

        {/* Row 4: %, 1, 2, 3, - */}
        <button onClick={() => handleFunction("%")} className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 font-semibold shadow-[0_2px_0_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-0.5 transition-all">%</button>
        <button onClick={() => inputDigit("1")} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-bold border border-zinc-200/80 dark:border-zinc-700 shadow-[0_2px_0_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-0.5 transition-all">1</button>
        <button onClick={() => inputDigit("2")} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-bold border border-zinc-200/80 dark:border-zinc-700 shadow-[0_2px_0_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-0.5 transition-all">2</button>
        <button onClick={() => inputDigit("3")} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-bold border border-zinc-200/80 dark:border-zinc-700 shadow-[0_2px_0_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-0.5 transition-all">3</button>
        <button onClick={() => performOperation("-")} className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold shadow-[0_2px_0_rgba(29,78,216,0.4)] active:shadow-none active:translate-y-0.5 transition-all">-</button>

        {/* Row 5: ±, 0, ., =, + */}
        <button onClick={() => handleFunction("+/-")} className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 font-semibold shadow-[0_2px_0_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-0.5 transition-all">±</button>
        <button onClick={() => inputDigit("0")} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-bold border border-zinc-200/80 dark:border-zinc-700 shadow-[0_2px_0_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-0.5 transition-all">0</button>
        <button onClick={inputDot} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-bold border border-zinc-200/80 dark:border-zinc-700 shadow-[0_2px_0_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-0.5 transition-all">.</button>
        <button onClick={handleEqual} className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-bold shadow-[0_2px_0_rgba(5,150,105,0.4)] active:shadow-none active:translate-y-0.5 transition-all">=</button>
        <button onClick={() => performOperation("+")} className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold shadow-[0_2px_0_rgba(29,78,216,0.4)] active:shadow-none active:translate-y-0.5 transition-all">+</button>
      </div>
    </div>
  );
}

export default QuickCalculator;
