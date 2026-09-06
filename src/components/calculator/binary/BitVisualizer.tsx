"use client";

import React, { useState } from "react";
import { BitWidth, Operation, RepMode, SubtractionStepDetail } from "@/app/calculators/binary-calculator/binary-logic";

interface BitVisualizerProps {
  bitWidth: BitWidth;
  operation: Operation;
  cleanA: string;
  cleanB: string;
  resBin: string;
  repMode: RepMode;
  carryChain: string[];
  shiftAmount: number;
  isOverflow: boolean;
  carryOut: boolean;
  subtractionDetail?: SubtractionStepDetail;
}

export function BitVisualizer({
  bitWidth,
  operation,
  cleanA,
  cleanB,
  resBin,
  repMode,
  carryChain,
  shiftAmount,
  isOverflow,
  carryOut,
  subtractionDetail,
}: BitVisualizerProps) {
  const [activeTab, setActiveTab] = useState<"columns" | "twos" | "shifts">("columns");

  const padA = cleanA.padStart(bitWidth, "0");
  const padB = cleanB.padStart(bitWidth, "0");
  const padRes = resBin.padStart(bitWidth, "0");

  // Determine cell width and spacing for responsive layout
  // For 64-bit, we provide horizontal scroll with fixed cell size
  const cellWidth = 28;
  const cellHeight = 28;
  const labelWidth = 90;
  const startX = labelWidth + 10;
  const totalWidth = startX + bitWidth * cellWidth + 20;

  const isShift = operation === "<<" || operation === ">>";
  const isSubtract = operation === "-";

  return (
    <div className="space-y-4 print:break-inside-avoid">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Interactive Bit-Level Visualizer
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-sans tabular-nums">
            {bitWidth}-Bit Register
          </span>
        </div>

        {/* Visualizer Mode Toggles */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-bold no-print">
          <button
            type="button"
            onClick={() => setActiveTab("columns")}
            className={`px-2.5 py-1 rounded-md cursor-pointer transition-all ${
              activeTab === "columns"
                ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            Bit Columns
          </button>
          {isSubtract && (
            <button
              type="button"
              onClick={() => setActiveTab("twos")}
              className={`px-2.5 py-1 rounded-md cursor-pointer transition-all ${
                activeTab === "twos"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              2&apos;s Comp Steps
            </button>
          )}
          {isShift && (
            <button
              type="button"
              onClick={() => setActiveTab("shifts")}
              className={`px-2.5 py-1 rounded-md cursor-pointer transition-all ${
                activeTab === "shifts"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              Shift Diagram
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: BIT COLUMNS SVG */}
      {activeTab === "columns" && (
        <div className="overflow-x-auto p-2 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-slate-800">
          <svg
            width={totalWidth}
            height={operation === "+" || operation === "-" ? 190 : 160}
            viewBox={`0 0 ${totalWidth} ${operation === "+" || operation === "-" ? 190 : 160}`}
            className="font-sans text-xs select-none max-w-none"
            role="img"
            aria-label={`Bit-by-bit representation of ${operation} operation`}
          >
            {/* Header Row: Bit Indices (from bitWidth-1 down to 0) */}
            <text x="10" y="24" className="fill-slate-400 dark:fill-slate-500 font-bold text-[10px]">
              Bit Position
            </text>
            {Array.from({ length: bitWidth }).map((_, i) => {
              const bitIndex = bitWidth - 1 - i;
              const x = startX + i * cellWidth + cellWidth / 2;
              const isSign = bitIndex === bitWidth - 1 && repMode === "twos";
              return (
                <text
                  key={`idx-${i}`}
                  x={x}
                  y="24"
                  textAnchor="middle"
                  className={`text-[10px] font-bold ${
                    isSign ? "fill-rose-500 font-extrabold" : "fill-slate-400 dark:fill-slate-500"
                  }`}
                >
                  {bitIndex}
                  {isSign ? " (S)" : ""}
                </text>
              );
            })}

            {/* Carry Row for Addition / Subtraction */}
            {(operation === "+" || operation === "-") && (
              <>
                <text x="10" y="52" className="fill-amber-600 dark:fill-amber-400 font-bold text-[10px]">
                  Carry In
                </text>
                {Array.from({ length: bitWidth }).map((_, i) => {
                  const bitIndex = bitWidth - 1 - i;
                  const x = startX + i * cellWidth;
                  const carryVal = carryChain[bitIndex] ?? "0";
                  const isCarryOne = carryVal === "1";
                  return (
                    <g key={`c-${i}`}>
                      <rect
                        x={x + 2}
                        y="36"
                        width={cellWidth - 4}
                        height={20}
                        rx="4"
                        className={
                          isCarryOne
                            ? "fill-amber-100 dark:fill-amber-950/60 stroke-amber-400 dark:stroke-amber-600 stroke-[1.5]"
                            : "fill-transparent stroke-slate-200 dark:stroke-slate-800"
                        }
                      />
                      <text
                        x={x + cellWidth / 2}
                        y="50"
                        textAnchor="middle"
                        className={`text-[11px] font-bold ${
                          isCarryOne ? "fill-amber-700 dark:fill-amber-300" : "fill-slate-300 dark:fill-slate-700"
                        }`}
                      >
                        {carryVal}
                      </text>
                    </g>
                  );
                })}
              </>
            )}

            {/* Row A: Operand A */}
            {(() => {
              const yBase = operation === "+" || operation === "-" ? 65 : 38;
              return (
                <>
                  <text x="10" y={yBase + 18} className="fill-blue-600 dark:fill-blue-400 font-bold text-[11px]">
                    Input A
                  </text>
                  {Array.from({ length: bitWidth }).map((_, i) => {
                    const x = startX + i * cellWidth;
                    const bit = padA[i] ?? "0";
                    const isOne = bit === "1";
                    return (
                      <g key={`a-${i}`}>
                        <rect
                          x={x + 1}
                          y={yBase}
                          width={cellWidth - 2}
                          height={cellHeight - 2}
                          rx="4"
                          className={
                            isOne
                              ? "fill-blue-500 dark:fill-blue-600 stroke-blue-600 dark:stroke-blue-500 stroke-1"
                              : "fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 stroke-1"
                          }
                        />
                        <text
                          x={x + cellWidth / 2}
                          y={yBase + 18}
                          textAnchor="middle"
                          className={`text-xs font-bold tabular-nums ${
                            isOne ? "fill-white font-extrabold" : "fill-slate-700 dark:fill-slate-300"
                          }`}
                        >
                          {bit}
                        </text>
                      </g>
                    );
                  })}
                </>
              );
            })()}

            {/* Row B: Operand B (if binary op) */}
            {operation !== "NOT" && (
              (() => {
                const yBase = operation === "+" || operation === "-" ? 98 : 71;
                return (
                  <>
                    <text x="10" y={yBase + 18} className="fill-indigo-600 dark:fill-indigo-400 font-bold text-[11px]">
                      {operation} B
                    </text>
                    {Array.from({ length: bitWidth }).map((_, i) => {
                      const x = startX + i * cellWidth;
                      const bit = padB[i] ?? "0";
                      const isOne = bit === "1";
                      return (
                        <g key={`b-${i}`}>
                          <rect
                            x={x + 1}
                            y={yBase}
                            width={cellWidth - 2}
                            height={cellHeight - 2}
                            rx="4"
                            className={
                              isOne
                                ? "fill-indigo-500 dark:fill-indigo-600 stroke-indigo-600 dark:stroke-indigo-500 stroke-1"
                                : "fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 stroke-1"
                            }
                          />
                          <text
                            x={x + cellWidth / 2}
                            y={yBase + 18}
                            textAnchor="middle"
                            className={`text-xs font-bold tabular-nums ${
                              isOne ? "fill-white font-extrabold" : "fill-slate-700 dark:fill-slate-300"
                            }`}
                          >
                            {bit}
                          </text>
                        </g>
                      );
                    })}
                  </>
                );
              })()
            )}

            {/* Divider Line */}
            {(() => {
              const yLine = operation === "+" || operation === "-" ? 132 : (operation === "NOT" ? 72 : 105);
              return (
                <line
                  x1={startX}
                  y1={yLine}
                  x2={startX + bitWidth * cellWidth}
                  y2={yLine}
                  className="stroke-slate-300 dark:stroke-slate-700 stroke-[1.5]"
                />
              );
            })()}

            {/* Result Row */}
            {(() => {
              const yBase = operation === "+" || operation === "-" ? 140 : (operation === "NOT" ? 80 : 113);
              return (
                <>
                  <text x="10" y={yBase + 18} className="fill-emerald-600 dark:fill-emerald-400 font-extrabold text-[11px]">
                    Result
                  </text>
                  {Array.from({ length: bitWidth }).map((_, i) => {
                    const x = startX + i * cellWidth;
                    const bit = padRes[i] ?? "0";
                    const isOne = bit === "1";
                    const bitIndex = bitWidth - 1 - i;
                    const isSign = bitIndex === bitWidth - 1 && repMode === "twos";
                    return (
                      <g key={`res-${i}`}>
                        <rect
                          x={x + 1}
                          y={yBase}
                          width={cellWidth - 2}
                          height={cellHeight - 2}
                          rx="4"
                          className={
                            isOne
                              ? (isSign
                                  ? "fill-rose-600 stroke-rose-700 stroke-[1.5]"
                                  : "fill-emerald-600 dark:fill-emerald-600 stroke-emerald-700 dark:stroke-emerald-500 stroke-1")
                              : (isSign
                                  ? "fill-white dark:fill-slate-900 stroke-rose-400 dark:stroke-rose-600 stroke-[1.5]"
                                  : "fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 stroke-1")
                          }
                        />
                        <text
                          x={x + cellWidth / 2}
                          y={yBase + 18}
                          textAnchor="middle"
                          className={`text-xs font-bold tabular-nums ${
                            isOne ? "fill-white font-extrabold" : "fill-slate-800 dark:fill-slate-200"
                          }`}
                        >
                          {bit}
                        </text>
                      </g>
                    );
                  })}
                </>
              );
            })()}
          </svg>
        </div>
      )}

      {/* VIEW 2: TWO'S COMPLEMENT DETAILED BREAKDOWN */}
      {activeTab === "twos" && subtractionDetail && (
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
          <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">
            Hardware 2&apos;s Complement Subtraction Pipeline (A - B = A + (~B + 1))
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5 font-sans tabular-nums">
              <div className="text-slate-500 dark:text-slate-400 font-bold">Step 1: Original Subtrahend B</div>
              <div className="font-extrabold text-sm tracking-widest text-slate-800 dark:text-slate-200">
                {subtractionDetail.bRaw}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5 font-sans tabular-nums">
              <div className="text-slate-500 dark:text-slate-400 font-bold">Step 2: 1&apos;s Complement (~B)</div>
              <div className="font-extrabold text-sm tracking-widest text-indigo-600 dark:text-indigo-400">
                {subtractionDetail.onesComp}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5 font-sans tabular-nums">
              <div className="text-slate-500 dark:text-slate-400 font-bold">Step 3: 2&apos;s Complement (~B + 1)</div>
              <div className="font-extrabold text-sm tracking-widest text-purple-600 dark:text-purple-400">
                {subtractionDetail.twosComp}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5 font-sans tabular-nums">
              <div className="text-slate-500 dark:text-slate-400 font-bold">Step 4: Add A + 2&apos;s Complement</div>
              <div className="font-extrabold text-sm tracking-widest text-emerald-600 dark:text-emerald-400">
                {subtractionDetail.sumRaw}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 space-y-1 font-sans">
            <div className="font-bold text-blue-900 dark:text-blue-200">
              Register Carry &amp; Signed Result:
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              {subtractionDetail.discardCarry
                ? `Carry-out was produced beyond bit ${bitWidth - 1} and discarded by register size limit.`
                : `No carry-out was produced (indicates borrow in unsigned arithmetic).`}
              {" "}Under {repMode === "twos" ? "Signed 2's Complement" : "Unsigned"} interpretation, the final decimal value is{" "}
              <strong className="font-extrabold text-blue-600 dark:text-blue-400">{subtractionDetail.signedDec}</strong>.
            </p>
          </div>
        </div>
      )}

      {/* VIEW 3: SHIFT DIAGRAM */}
      {activeTab === "shifts" && isShift && (
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
          <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">
            {operation === "<<" ? "Logical Left Shift (<<)" : repMode === "twos" ? "Arithmetic Right Shift (>>)" : "Logical Right Shift (>>>)"}
          </h4>
          <p className="text-slate-600 dark:text-slate-400">
            Shifted {shiftAmount} bit position{shiftAmount > 1 ? "s" : ""}{" "}
            {operation === "<<" ? "to the left (filling lowest bits with 0)." : "to the right (preserving sign bit if signed)."}
          </p>
          <div className="flex flex-col gap-2 font-sans tabular-nums">
            <div className="flex items-center gap-3">
              <span className="w-24 text-slate-500 font-bold">Input A:</span>
              <span className="font-mono text-sm tracking-widest bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
                {padA}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-24 text-emerald-600 dark:text-emerald-400 font-bold">Shift Result:</span>
              <span className="font-mono text-sm tracking-widest bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                {padRes}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Status Badges: Overflow and Carry */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-bold">
        {isOverflow ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800">
            ⚠️ OVERFLOW: YES
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            ✓ No Overflow
          </span>
        )}

        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border ${
            carryOut
              ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-800"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
          }`}
        >
          Carry-Out: {carryOut ? "1" : "0"}
        </span>

        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
          {repMode === "twos" ? "Signed Two's Complement Interpretation" : "Unsigned Pure Binary Interpretation"}
        </span>
      </div>
    </div>
  );
}
