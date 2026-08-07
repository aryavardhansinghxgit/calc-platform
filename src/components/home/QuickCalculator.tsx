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
    <div className="bg-card text-card-foreground border border-border rounded-xl p-3 shadow-md max-w-[320px] w-full mx-auto space-y-2 font-sans transition-all">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-1 text-xs">
        <span className="flex items-center gap-1.5 font-bold text-primary tracking-wide">
          <CalcIcon className="h-3.5 w-3.5 text-primary" /> Quick Scientific Calc
        </span>
        <button
          onClick={() => setIsRad(!isRad)}
          className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground hover:text-foreground border border-border transition-colors uppercase cursor-pointer"
          title="Click to toggle RAD/DEG"
        >
          {isRad ? "RAD" : "DEG"}
        </button>
      </div>

      {/* Screen Display */}
      <div className="bg-slate-950 text-slate-5 border border-slate-800 rounded-lg p-2.5 text-right shadow-inner flex flex-col justify-between min-h-[64px]">
        <div className="text-[11px] font-mono text-slate-400 h-4 truncate">
          {expression || "\u00A0"}
        </div>
        <div className="text-2xl font-mono font-bold text-emerald-400 tracking-wider truncate">
          {display}
        </div>
      </div>

      {/* Calculator 5x5 Keypad Grid */}
      <div className="grid grid-cols-5 gap-1.5 text-xs font-mono select-none">
        {/* Row 1: sin, cos, tan, AC, Backspace */}
        <button onClick={() => handleFunction("sin")} className="p-2 rounded-md bg-secondary text-secondary-foreground hover:bg-muted font-semibold transition-colors active:scale-95">sin</button>
        <button onClick={() => handleFunction("cos")} className="p-2 rounded-md bg-secondary text-secondary-foreground hover:bg-muted font-semibold transition-colors active:scale-95">cos</button>
        <button onClick={() => handleFunction("tan")} className="p-2 rounded-md bg-secondary text-secondary-foreground hover:bg-muted font-semibold transition-colors active:scale-95">tan</button>
        <button onClick={clearAll} className="p-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold transition-colors active:scale-95">AC</button>
        <button onClick={backspace} className="p-2 flex items-center justify-center rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 font-bold transition-colors active:scale-95" title="Backspace"><Delete className="h-3.5 w-3.5" /></button>

        {/* Row 2: √, 7, 8, 9, ÷ */}
        <button onClick={() => handleFunction("sqrt")} className="p-2 rounded-md bg-secondary text-secondary-foreground hover:bg-muted font-semibold transition-colors active:scale-95">√</button>
        <button onClick={() => inputDigit("7")} className="p-2 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors active:scale-95">7</button>
        <button onClick={() => inputDigit("8")} className="p-2 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors active:scale-95">8</button>
        <button onClick={() => inputDigit("9")} className="p-2 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors active:scale-95">9</button>
        <button onClick={() => performOperation("÷")} className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-colors active:scale-95">÷</button>

        {/* Row 3: x², 4, 5, 6, × */}
        <button onClick={() => handleFunction("sq")} className="p-2 rounded-md bg-secondary text-secondary-foreground hover:bg-muted font-semibold transition-colors active:scale-95">x²</button>
        <button onClick={() => inputDigit("4")} className="p-2 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors active:scale-95">4</button>
        <button onClick={() => inputDigit("5")} className="p-2 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors active:scale-95">5</button>
        <button onClick={() => inputDigit("6")} className="p-2 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors active:scale-95">6</button>
        <button onClick={() => performOperation("×")} className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-colors active:scale-95">×</button>

        {/* Row 4: %, 1, 2, 3, - */}
        <button onClick={() => handleFunction("%")} className="p-2 rounded-md bg-secondary text-secondary-foreground hover:bg-muted font-semibold transition-colors active:scale-95">%</button>
        <button onClick={() => inputDigit("1")} className="p-2 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors active:scale-95">1</button>
        <button onClick={() => inputDigit("2")} className="p-2 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors active:scale-95">2</button>
        <button onClick={() => inputDigit("3")} className="p-2 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors active:scale-95">3</button>
        <button onClick={() => performOperation("-")} className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-colors active:scale-95">-</button>

        {/* Row 5: ±, 0, ., =, + */}
        <button onClick={() => handleFunction("+/-")} className="p-2 rounded-md bg-secondary text-secondary-foreground hover:bg-muted font-semibold transition-colors active:scale-95">±</button>
        <button onClick={() => inputDigit("0")} className="p-2 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors active:scale-95">0</button>
        <button onClick={inputDot} className="p-2 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors active:scale-95">.</button>
        <button onClick={handleEqual} className="p-2 rounded-md bg-emerald-600 dark:bg-emerald-500 text-white hover:opacity-90 font-bold transition-colors active:scale-95 shadow-xs">=</button>
        <button onClick={() => performOperation("+")} className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-colors active:scale-95">+</button>
      </div>
    </div>
  );
}

export default QuickCalculator;
