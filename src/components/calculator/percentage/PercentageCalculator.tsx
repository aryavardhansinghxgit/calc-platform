"use client";

import React, { useState } from "react";
import {
  calculatePercentageOf,
  calculatePercentageValue,
  calculatePercentageChange,
} from "@/lib/formulas/percentage";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PercentageCalculator() {
  // Mode 1: What is X% of Y?
  const [percent1, setPercent1] = useState(15);
  const [value1, setValue1] = useState(200);

  // Mode 2: X is what % of Y?
  const [part2, setPart2] = useState(50);
  const [total2, setTotal2] = useState(250);

  // Mode 3: % Change from X to Y
  const [from3, setFrom3] = useState(100);
  const [to3, setTo3] = useState(135);

  const res1 = calculatePercentageOf(percent1, value1);
  const res2 = calculatePercentageValue(part2, total2);
  const res3 = calculatePercentageChange(from3, to3);

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100 p-6 space-y-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Percentage Calculator Tool</CardTitle>
        <CardDescription className="text-slate-400">Quickly solve percentage math problems</CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        {/* Tool 1 */}
        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-3">
          <div className="text-sm font-semibold text-slate-200">1. What is X% of Y?</div>
          <div className="flex flex-wrap items-center gap-3">
            <span>What is</span>
            <Input
              type="number"
              value={percent1}
              onChange={(e) => setPercent1(Number(e.target.value))}
              className="w-24 bg-slate-900 border-slate-800"
            />
            <span>% of</span>
            <Input
              type="number"
              value={value1}
              onChange={(e) => setValue1(Number(e.target.value))}
              className="w-32 bg-slate-900 border-slate-800"
            />
            <span>=</span>
            <span className="text-xl font-bold text-sky-400">{res1}</span>
          </div>
        </div>

        {/* Tool 2 */}
        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-3">
          <div className="text-sm font-semibold text-slate-200">2. X is what percentage of Y?</div>
          <div className="flex flex-wrap items-center gap-3">
            <Input
              type="number"
              value={part2}
              onChange={(e) => setPart2(Number(e.target.value))}
              className="w-28 bg-slate-900 border-slate-800"
            />
            <span>is what % of</span>
            <Input
              type="number"
              value={total2}
              onChange={(e) => setTotal2(Number(e.target.value))}
              className="w-32 bg-slate-900 border-slate-800"
            />
            <span>=</span>
            <span className="text-xl font-bold text-emerald-400">{res2.toFixed(2)}%</span>
          </div>
        </div>

        {/* Tool 3 */}
        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-3">
          <div className="text-sm font-semibold text-slate-200">3. Percentage Increase / Decrease</div>
          <div className="flex flex-wrap items-center gap-3">
            <span>From</span>
            <Input
              type="number"
              value={from3}
              onChange={(e) => setFrom3(Number(e.target.value))}
              className="w-28 bg-slate-900 border-slate-800"
            />
            <span>to</span>
            <Input
              type="number"
              value={to3}
              onChange={(e) => setTo3(Number(e.target.value))}
              className="w-28 bg-slate-900 border-slate-800"
            />
            <span>=</span>
            <span className="text-xl font-bold text-amber-400">{res3 > 0 ? `+${res3.toFixed(2)}%` : `${res3.toFixed(2)}%`}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
