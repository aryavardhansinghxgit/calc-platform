import { ScientificCalculatorOutputs } from "./types";

export function calculateScientificCalculator(inputs: Record<string, any>): ScientificCalculatorOutputs {
  const x = Number(inputs.value1) || 0;
  const op = inputs.operation || "sin";
  let res = 0;
  let exp = "";
  if (op === "sin") { res = Math.sin((x * Math.PI) / 180); exp = `sin(${x}°)`; }
  else if (op === "cos") { res = Math.cos((x * Math.PI) / 180); exp = `cos(${x}°)`; }
  else if (op === "tan") { res = Math.tan((x * Math.PI) / 180); exp = `tan(${x}°)`; }
  else if (op === "ln") { res = x > 0 ? Math.log(x) : 0; exp = `ln(${x})`; }
  else if (op === "sqrt") { res = x >= 0 ? Math.sqrt(x) : 0; exp = `√(${x})`; }
  else if (op === "factorial") {
    let f = 1;
    const n = Math.min(170, Math.max(0, Math.floor(x)));
    for (let i = 1; i <= n; i++) f *= i;
    res = f;
    exp = `${n}!`;
  }
  return { result: parseFloat(res.toFixed(6)), explanation: exp };
}
