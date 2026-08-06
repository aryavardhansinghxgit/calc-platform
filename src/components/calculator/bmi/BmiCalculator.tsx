"use client";

import React, { useState, useMemo } from "react";
import { calculateBmi } from "@/lib/formulas/bmi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function BmiCalculator() {
  const [weightKg, setWeightKg] = useState(70);
  const [heightCm, setHeightCm] = useState(175);

  const results = useMemo(() => {
    return calculateBmi({ weightKg, heightCm });
  }, [weightKg, heightCm]);

  const getBadgeColor = (cat: string) => {
    switch (cat) {
      case "Underweight":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "Normal weight":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Overweight":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default:
        return "bg-rose-500/20 text-rose-400 border-rose-500/30";
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100 p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Body Mass Index (BMI) Calculator</CardTitle>
        <CardDescription className="text-slate-400">Assess body weight relative to height</CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-slate-300">Weight (kg)</Label>
            <Input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="bg-slate-950 border-slate-800"
            />
          </div>
          <div>
            <Label className="text-slate-300">Height (cm)</Label>
            <Input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="bg-slate-950 border-slate-800"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Your BMI</div>
            <div className="text-3xl font-extrabold text-sky-400">{results.bmi}</div>
          </div>
          <div className="text-right space-y-1">
            <div className="text-xs text-slate-400">Classification</div>
            <Badge className={getBadgeColor(results.category)}>{results.category}</Badge>
            <div className="text-xs text-slate-400 mt-1">
              Healthy weight range: {results.healthyWeightRange[0]} kg – {results.healthyWeightRange[1]} kg
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
