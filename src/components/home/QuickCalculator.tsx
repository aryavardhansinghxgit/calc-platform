"use client";

import React, { useState } from "react";
import { Calculator as CalcIcon } from "lucide-react";

export function QuickCalculator() {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState<number | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operator, setOperator] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState<number | null>(null);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearAll = () => {
    setDisplay("0");
    setMemory(null);
    setWaitingForOperand(false);
    setOperator(null);
    setPrevValue(null);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
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
      setDisplay(String(Number(newValue.toFixed(6))));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEqual = () => {
    if (!operator || prevValue === null) return;
    performOperation(operator);
    setOperator(null);
    setPrevValue(null);
  };

  const handleFunction = (fn: string) => {
    const val = parseFloat(display);
    let res = val;
    switch (fn) {
      case "sin":
        res = Math.sin(val);
        break;
      case "cos":
        res = Math.cos(val);
        break;
      case "tan":
        res = Math.tan(val);
        break;
      case "sqrt":
        res = Math.sqrt(val);
        break;
      case "sq":
        res = val * val;
        break;
      case "log":
        res = Math.log10(val);
        break;
      case "ln":
        res = Math.log(val);
        break;
      case "+/-":
        res = -val;
        break;
      case "%":
        res = val / 100;
        break;
      default:
        break;
    }
    setDisplay(String(Number(res.toFixed(6))));
    setWaitingForOperand(true);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-lg max-w-[320px] mx-auto text-slate-100 space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between px-1 text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1 font-semibold text-sky-400">
          <CalcIcon className="h-3 w-3" /> Quick Math Calc
        </span>
        <span>Rad</span>
      </div>

      {/* Display Screen */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-right">
        <div className="text-xl font-mono font-bold text-sky-400 tracking-wider truncate">
          {display}
        </div>
      </div>

      {/* Calculator Buttons Grid */}
      <div className="grid grid-cols-5 gap-1 text-xs font-mono">
        {/* Row 1 */}
        <button onClick={() => handleFunction("sin")} className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">sin</button>
        <button onClick={() => handleFunction("cos")} className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">cos</button>
        <button onClick={() => handleFunction("tan")} className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">tan</button>
        <button onClick={() => inputDigit("7")} className="p-1.5 rounded bg-slate-800/90 hover:bg-slate-700 font-bold text-white">7</button>
        <button onClick={() => inputDigit("8")} className="p-1.5 rounded bg-slate-800/90 hover:bg-slate-700 font-bold text-white">8</button>

        {/* Row 2 */}
        <button onClick={() => handleFunction("sqrt")} className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">√</button>
        <button onClick={() => handleFunction("sq")} className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">x²</button>
        <button onClick={() => handleFunction("%")} className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">%</button>
        <button onClick={() => inputDigit("9")} className="p-1.5 rounded bg-slate-800/90 hover:bg-slate-700 font-bold text-white">9</button>
        <button onClick={() => performOperation("÷")} className="p-1.5 rounded bg-sky-600/80 hover:bg-sky-600 font-bold text-white">÷</button>

        {/* Row 3 */}
        <button onClick={() => handleFunction("log")} className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">log</button>
        <button onClick={() => handleFunction("ln")} className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">ln</button>
        <button onClick={() => handleFunction("+/-")} className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">±</button>
        <button onClick={() => inputDigit("4")} className="p-1.5 rounded bg-slate-800/90 hover:bg-slate-700 font-bold text-white">4</button>
        <button onClick={() => inputDigit("5")} className="p-1.5 rounded bg-slate-800/90 hover:bg-slate-700 font-bold text-white">5</button>

        {/* Row 4 */}
        <button onClick={() => inputDigit("6")} className="p-1.5 rounded bg-slate-800/90 hover:bg-slate-700 font-bold text-white">6</button>
        <button onClick={() => performOperation("×")} className="p-1.5 rounded bg-sky-600/80 hover:bg-sky-600 font-bold text-white">×</button>
        <button onClick={() => inputDigit("1")} className="p-1.5 rounded bg-slate-800/90 hover:bg-slate-700 font-bold text-white">1</button>
        <button onClick={() => inputDigit("2")} className="p-1.5 rounded bg-slate-800/90 hover:bg-slate-700 font-bold text-white">2</button>
        <button onClick={() => inputDigit("3")} className="p-1.5 rounded bg-slate-800/90 hover:bg-slate-700 font-bold text-white">3</button>

        {/* Row 5 */}
        <button onClick={() => performOperation("-")} className="p-1.5 rounded bg-sky-600/80 hover:bg-sky-600 font-bold text-white">-</button>
        <button onClick={() => inputDigit("0")} className="p-1.5 rounded bg-slate-800/90 hover:bg-slate-700 font-bold text-white">0</button>
        <button onClick={inputDot} className="p-1.5 rounded bg-slate-800/90 hover:bg-slate-700 font-bold text-white">.</button>
        <button onClick={clearAll} className="p-1.5 rounded bg-rose-600/80 hover:bg-rose-600 font-bold text-white">AC</button>
        <button onClick={handleEqual} className="p-1.5 rounded bg-emerald-600/80 hover:bg-emerald-600 font-bold text-white">=</button>
      </div>
    </div>
  );
}

export default QuickCalculator;
