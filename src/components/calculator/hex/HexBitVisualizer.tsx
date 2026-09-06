"use client";

import React from "react";
import { BitWidth, HexOperator } from "@/app/calculators/hex-calculator/hex-logic";

interface HexBitVisualizerProps {
  valA: bigint;
  valB: bigint;
  resVal: bigint;
  operator: HexOperator;
  width: BitWidth;
  isSigned: boolean;
  carryOut?: 0 | 1;
  borrowOut?: 0 | 1;
}

export function HexBitVisualizer({
  valA,
  valB,
  resVal,
  operator,
  width,
  isSigned,
  carryOut = 0,
  borrowOut = 0
}: HexBitVisualizerProps) {
  const mask = (1n << BigInt(width)) - 1n;
  const uA = valA & mask;
  const uB = valB & mask;
  const uRes = resVal & mask;

  const binA = uA.toString(2).padStart(width, "0");
  const binB = uB.toString(2).padStart(width, "0");
  const binRes = uRes.toString(2).padStart(width, "0");

  // Invert B for two's complement visualization when subtracting
  const onesCompB = (~uB & mask).toString(2).padStart(width, "0");
  const twosCompBVal = ((~uB + 1n) & mask);
  const twosCompB = twosCompBVal.toString(2).padStart(width, "0");

  // Compute carry ripple chain for addition
  const carries: number[] = new Array(width).fill(0);
  let c = 0;
  for (let i = width - 1; i >= 0; i--) {
    const bitA = parseInt(binA[i], 10);
    const bitB = parseInt(binB[i], 10);
    const sum = bitA + bitB + c;
    c = sum >= 2 ? 1 : 0;
    if (i > 0) carries[i - 1] = c;
  }

  const isShift = operator === "<<" || operator === ">>" || operator === ">>>";
  const isSub = operator === "-";
  const isAdd = operator === "+";

  // Shift amount
  const shiftAmt = Number(uB > BigInt(width) ? BigInt(width) : uB);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="space-y-0.5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
            Interactive Bit &amp; Register Visualizer ({width}-Bit Word)
          </span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {width}-bit register alignment with 4-bit nibble groupings and propagation states.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold">
          <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
            {isSigned ? "Signed (Two's Comp)" : "Unsigned"}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            MSB: Bit {width - 1} | LSB: Bit 0
          </span>
        </div>
      </div>

      {/* HORIZONTALLY SCROLLABLE BIT GRID */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-max space-y-3 font-sans tabular-nums text-xs">
          {/* BIT INDEX HEADER */}
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
            <span className="w-28 text-right pr-2 shrink-0">Bit Position:</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: width }, (_, idx) => width - 1 - idx).map((bitPos) => {
                const isNibbleEnd = bitPos % 4 === 0;
                return (
                  <span
                    key={bitPos}
                    className={`w-6 text-center ${isNibbleEnd ? "border-r-2 border-slate-300 dark:border-slate-700 pr-0.5 mr-1 font-extrabold text-blue-600 dark:text-blue-400" : ""}`}
                  >
                    {bitPos}
                  </span>
                );
              })}
            </div>
          </div>

          {/* CARRY BITS ROW (FOR ADDITION) */}
          {isAdd && (
            <div className="flex items-center gap-1.5">
              <span className="w-28 text-right pr-2 shrink-0 font-bold text-amber-600 dark:text-amber-400 text-[11px]">
                Carry Chain:
              </span>
              <div className="flex items-center gap-1">
                {carries.map((bitCarry, idx) => {
                  const bitPos = width - 1 - idx;
                  const isNibbleEnd = bitPos % 4 === 0;
                  return (
                    <span
                      key={idx}
                      className={`w-6 h-6 flex items-center justify-center rounded text-[11px] font-bold ${
                        bitCarry === 1
                          ? "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                          : "text-slate-300 dark:text-slate-700"
                      } ${isNibbleEnd ? "border-r-2 border-slate-300 dark:border-slate-700 mr-1" : ""}`}
                    >
                      {bitCarry}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* OPERAND A ROW */}
          <div className="flex items-center gap-1.5">
            <span className="w-28 text-right pr-2 shrink-0 font-bold text-slate-700 dark:text-slate-300 text-[11px]">
              Operand A:
            </span>
            <div className="flex items-center gap-1">
              {binA.split("").map((bit, idx) => {
                const bitPos = width - 1 - idx;
                const isNibbleEnd = bitPos % 4 === 0;
                const isSignBit = idx === 0 && isSigned;
                return (
                  <span
                    key={idx}
                    className={`w-6 h-6 flex items-center justify-center rounded text-[11px] font-bold ${
                      bit === "1"
                        ? isSignBit
                          ? "bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700"
                          : "bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700"
                    } ${isNibbleEnd ? "border-r-2 border-slate-300 dark:border-slate-700 mr-1" : ""}`}
                    title={`Bit ${bitPos}: ${bit}${isSignBit ? " (Sign Bit)" : ""}`}
                  >
                    {bit}
                  </span>
                );
              })}
            </div>
          </div>

          {/* OPERAND B ROW (IF NOT UNARY) */}
          {operator !== "NOT" && (
            <div className="flex items-center gap-1.5">
              <span className="w-28 text-right pr-2 shrink-0 font-bold text-slate-700 dark:text-slate-300 text-[11px]">
                Operand B:
              </span>
              <div className="flex items-center gap-1">
                {binB.split("").map((bit, idx) => {
                  const bitPos = width - 1 - idx;
                  const isNibbleEnd = bitPos % 4 === 0;
                  const isSignBit = idx === 0 && isSigned;
                  return (
                    <span
                      key={idx}
                      className={`w-6 h-6 flex items-center justify-center rounded text-[11px] font-bold ${
                        bit === "1"
                          ? isSignBit
                            ? "bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700"
                            : "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700"
                      } ${isNibbleEnd ? "border-r-2 border-slate-300 dark:border-slate-700 mr-1" : ""}`}
                      title={`Bit ${bitPos}: ${bit}`}
                    >
                      {bit}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* TWO'S COMPLEMENT STAGES FOR SUBTRACTION */}
          {isSub && (
            <>
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <span className="w-28 text-right pr-2 shrink-0 font-bold text-[10px]">
                  ~B (1&apos;s Comp):
                </span>
                <div className="flex items-center gap-1">
                  {onesCompB.split("").map((bit, idx) => {
                    const bitPos = width - 1 - idx;
                    const isNibbleEnd = bitPos % 4 === 0;
                    return (
                      <span
                        key={idx}
                        className={`w-6 h-5 flex items-center justify-center rounded text-[10px] font-mono bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 ${isNibbleEnd ? "border-r-2 border-slate-300 dark:border-slate-700 mr-1" : ""}`}
                      >
                        {bit}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                <span className="w-28 text-right pr-2 shrink-0 font-bold text-[10px]">
                  +1 (2&apos;s Comp):
                </span>
                <div className="flex items-center gap-1">
                  {twosCompB.split("").map((bit, idx) => {
                    const bitPos = width - 1 - idx;
                    const isNibbleEnd = bitPos % 4 === 0;
                    return (
                      <span
                        key={idx}
                        className={`w-6 h-5 flex items-center justify-center rounded text-[10px] font-mono font-bold bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 ${isNibbleEnd ? "border-r-2 border-slate-300 dark:border-slate-700 mr-1" : ""}`}
                      >
                        {bit}
                      </span>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* DIVIDER */}
          <div className="flex items-center gap-1.5 border-t border-slate-200 dark:border-slate-700 pt-1">
            <span className="w-28 text-right pr-2 shrink-0 font-bold text-[10px] uppercase text-slate-400">
              {operator === "+" ? "Sum" : operator === "-" ? "Diff" : operator} Result:
            </span>
            <div className="h-0.5 flex-1 bg-slate-200 dark:border-slate-700" />
          </div>

          {/* FINAL RESULT ROW */}
          <div className="flex items-center gap-1.5">
            <span className="w-28 text-right pr-2 shrink-0 font-extrabold text-blue-600 dark:text-blue-400 text-[11px]">
              Register Output:
            </span>
            <div className="flex items-center gap-1">
              {binRes.split("").map((bit, idx) => {
                const bitPos = width - 1 - idx;
                const isNibbleEnd = bitPos % 4 === 0;
                const isSignBit = idx === 0 && isSigned;
                return (
                  <span
                    key={idx}
                    className={`w-6 h-6 flex items-center justify-center rounded text-[11px] font-extrabold ${
                      bit === "1"
                        ? isSignBit
                          ? "bg-purple-600 text-white shadow-xs"
                          : "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold"
                    } ${isNibbleEnd ? "border-r-2 border-blue-400 dark:border-blue-600 mr-1" : ""}`}
                    title={`Result Bit ${bitPos}: ${bit}${isSignBit ? " (Sign Bit)" : ""}`}
                  >
                    {bit}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* SHIFT ANNOTATIONS */}
      {isShift && (
        <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs font-sans tabular-nums space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300">
            Shift Dynamics ({operator} by {shiftAmt} positions):
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
            {operator === "<<"
              ? `Bits shifted left by ${shiftAmt}. Discarded from MSB: ${shiftAmt} bits. Filled from LSB with 0s.`
              : operator === ">>>"
              ? `Logical right shift by ${shiftAmt}. Discarded from LSB: ${shiftAmt} bits. Filled from MSB with 0s.`
              : isSigned
              ? `Arithmetic right shift by ${shiftAmt}. Sign bit (${binA[0]}) preserved and propagated into vacated high-order bits.`
              : `Logical right shift by ${shiftAmt}. Filled from MSB with 0s.`}
          </p>
        </div>
      )}

      {/* HARDWARE REGISTER STATUS INDICATORS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-bold font-sans tabular-nums">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">Carry-Out</span>
          <span className={`px-2 py-0.5 rounded text-xs ${carryOut === 1 ? "bg-amber-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"}`}>
            {carryOut}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">Borrow</span>
          <span className={`px-2 py-0.5 rounded text-xs ${borrowOut === 1 ? "bg-amber-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"}`}>
            {borrowOut}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">Sign Bit (MSB)</span>
          <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs">
            {binRes[0]} ({binRes[0] === "1" ? (isSigned ? "Negative -" : "1") : (isSigned ? "Positive +" : "0")})
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">Register Mask</span>
          <span className="font-mono text-blue-600 dark:text-blue-400 text-[11px]">
            0x{mask.toString(16).toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default HexBitVisualizer;
