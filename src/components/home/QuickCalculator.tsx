"use client";

import React, { useState } from "react";
import { Calculator as CalcIcon } from "lucide-react";

export function QuickCalculator() {
  const [display, setDisplay] = useState("0");
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
    <div className="bg-card text-card-foreground border border-border rounded-xl p-3 shadow-xs max-w-[310px] w-full mx-auto space-y-2 font-sans transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between px-1 text-[11px] font-mono text-muted-foreground">
        <span className="flex items-center gap-1 font-semibold text-primary">
          <CalcIcon className="h-3 w-3" /> Quick Math Calc
        </span>
        <span className="text-[10px] uppercase font-medium text-muted-foreground/80">Rad</span>
      </div>

      {/* Display Screen */}
      <div className="bg-background border border-border rounded-lg p-2.5 text-right shadow-inner">
        <div className="text-xl font-mono font-bold text-primary tracking-wider truncate">
          {display}
        </div>
      </div>

      {/* Calculator Buttons Grid */}
      <div className="grid grid-cols-5 gap-1.5 text-xs font-mono">
        {/* Row 1 */}
        <button onClick={() => handleFunction("sin")} className="p-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-muted font-medium transition-colors">sin</button>
        <button onClick={() => handleFunction("cos")} className="p-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-muted font-medium transition-colors">cos</button>
        <button onClick={() => handleFunction("tan")} className="p-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-muted font-medium transition-colors">tan</button>
        <button onClick={() => inputDigit("7")} className="p-1.5 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors">7</button>
        <button onClick={() => inputDigit("8")} className="p-1.5 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors">8</button>

        {/* Row 2 */}
        <button onClick={() => handleFunction("sqrt")} className="p-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-muted font-medium transition-colors">√</button>
        <button onClick={() => handleFunction("sq")} className="p-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-muted font-medium transition-colors">x²</button>
        <button onClick={() => handleFunction("%")} className="p-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-muted font-medium transition-colors">%</button>
        <button onClick={() => inputDigit("9")} className="p-1.5 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors">9</button>
        <button onClick={() => performOperation("÷")} className="p-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-colors">÷</button>

        {/* Row 3 */}
        <button onClick={() => handleFunction("log")} className="p-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-muted font-medium transition-colors">log</button>
        <button onClick={() => handleFunction("ln")} className="p-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-muted font-medium transition-colors">ln</button>
        <button onClick={() => handleFunction("+/-")} className="p-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-muted font-medium transition-colors">±</button>
        <button onClick={() => inputDigit("4")} className="p-1.5 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors">4</button>
        <button onClick={() => inputDigit("5")} className="p-1.5 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors">5</button>

        {/* Row 4 */}
        <button onClick={() => inputDigit("6")} className="p-1.5 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors">6</button>
        <button onClick={() => performOperation("×")} className="p-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-colors">×</button>
        <button onClick={() => inputDigit("1")} className="p-1.5 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors">1</button>
        <button onClick={() => inputDigit("2")} className="p-1.5 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors">2</button>
        <button onClick={() => inputDigit("3")} className="p-1.5 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors">3</button>

        {/* Row 5 */}
        <button onClick={() => performOperation("-")} className="p-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-colors">-</button>
        <button onClick={() => inputDigit("0")} className="p-1.5 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors">0</button>
        <button onClick={inputDot} className="p-1.5 rounded-md bg-muted text-foreground hover:bg-secondary font-bold transition-colors">.</button>
        <button onClick={clearAll} className="p-1.5 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold transition-colors">AC</button>
        <button onClick={handleEqual} className="p-1.5 rounded-md bg-emerald-600 dark:bg-emerald-500 text-white hover:opacity-90 font-bold transition-colors">=</button>
      </div>
    </div>
  );
}

export default QuickCalculator;
