"use client";

import React from "react";
import { Award, HeartPulse, Table, Zap, Flame } from "lucide-react";
import { PaceResult } from "@/lib/formulas/pace";

interface PaceTablesProps {
  result: PaceResult;
}

export function PaceTables({ result }: PaceTablesProps) {
  const worldRecordsTable = [
    { event: "100 meters", menPace: "2:35/mi (1:36/km)", womenPace: "2:49/mi (1:45/km)", menTime: "9.58s", womenTime: "10.49s" },
    { event: "200 meters", menPace: "2:35/mi (1:36/km)", womenPace: "2:52/mi (1:47/km)", menTime: "19.19s", womenTime: "21.34s" },
    { event: "400 meters", menPace: "2:54/mi (1:48/km)", womenPace: "3:12/mi (1:59/km)", menTime: "43.03s", womenTime: "47.60s" },
    { event: "800 meters", menPace: "3:23/mi (2:06/km)", womenPace: "3:48/mi (2:21/km)", menTime: "1:40.91", womenTime: "1:53.28" },
    { event: "1,500 meters", menPace: "3:41/mi (2:17/km)", womenPace: "4:07/mi (2:34/km)", menTime: "3:26.00", womenTime: "3:49.11" },
    { event: "1 Mile", menPace: "3:43/mi (2:19/km)", womenPace: "4:13/mi (2:37/km)", menTime: "3:43.13", womenTime: "4:12.33" },
    { event: "5K (5,000m)", menPace: "4:04/mi (2:31/km)", womenPace: "4:34/mi (2:50/km)", menTime: "12:35.36", womenTime: "14:00.21" },
    { event: "10K (10,000m)", menPace: "4:14/mi (2:38/km)", womenPace: "4:45/mi (2:57/km)", menTime: "26:11.00", womenTime: "28:54.14" },
    { event: "Half Marathon (13.1 mi)", menPace: "4:27/mi (2:46/km)", womenPace: "4:58/mi (3:05/km)", menTime: "57:31", womenTime: "1:04:02" },
    { event: "Marathon (26.2 mi)", menPace: "4:41/mi (2:55/km)", womenPace: "5:10/mi (3:13/km)", menTime: "2:00:35", womenTime: "2:11:53" },
  ];

  const hrAgeMatrix = [
    { age: "20", mhr: "200 bpm", z1: "100–120", z2: "120–140", z3: "140–160", z4: "160–180", z5: "180–200" },
    { age: "30", mhr: "190 bpm", z1: "95–114", z2: "114–133", z3: "133–152", z4: "152–171", z5: "171–190" },
    { age: "40", mhr: "180 bpm", z1: "90–108", z2: "108–126", z3: "126–144", z4: "144–162", z5: "162–180" },
    { age: "50", mhr: "170 bpm", z1: "85–102", z2: "102–119", z3: "119–136", z4: "136–153", z5: "153–170" },
    { age: "60", mhr: "160 bpm", z1: "80–96", z2: "96–112", z3: "112–128", z4: "128–144", z5: "144–160" },
    { age: "70", mhr: "150 bpm", z1: "75–90", z2: "90–105", z3: "105–120", z4: "120–135", z5: "135–150" },
  ];

  return (
    <div className="space-y-8 mt-8">
      {/* 1. Riegel Race Finish Predictions Table */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3>Riegel's Race Finish Time Predictions (From Current Performance)</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Target Race Distance</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-emerald-700 dark:text-emerald-400">Predicted Finish Time</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">Required Pace (/mile)</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-purple-700 dark:text-purple-400">Required Pace (/km)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {result.riegelPredictions.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2.5 px-3 font-bold text-zinc-900 dark:text-zinc-100">{row.eventName}</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums font-bold text-emerald-700 dark:text-emerald-400">{row.predictedTimeFormatted}</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">{row.predictedPacePerMileFormatted}</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums text-purple-700 dark:text-purple-400">{row.predictedPacePerKmFormatted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. World Record & Typical Race Paces Table */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3>World Record &amp; Elite Race Paces Reference Chart</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Event Distance</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">Men's WR Pace</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-purple-700 dark:text-purple-400">Women's WR Pace</th>
                <th className="py-2.5 px-3 font-sans tabular-nums">Men's WR Time</th>
                <th className="py-2.5 px-3 font-sans tabular-nums">Women's WR Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {worldRecordsTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2 px-3 font-bold text-zinc-900 dark:text-zinc-100">{row.event}</td>
                  <td className="py-2 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">{row.menPace}</td>
                  <td className="py-2 px-3 font-sans tabular-nums text-purple-700 dark:text-purple-400">{row.womenPace}</td>
                  <td className="py-2 px-3 font-sans tabular-nums text-zinc-500">{row.menTime}</td>
                  <td className="py-2 px-3 font-sans tabular-nums text-zinc-500">{row.womenTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Heart Rate Training Zones Matrix by Age */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <HeartPulse className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          <h3>Heart Rate Training Intensity Zones by Age (BPM)</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Age</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-rose-700 dark:text-rose-400">Max HR (220-Age)</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-sky-600">Zone 1 (50-60%)</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-emerald-600">Zone 2 (60-70%)</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-teal-600">Zone 3 (70-80%)</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-amber-600">Zone 4 (80-90%)</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-rose-600">Zone 5 (90-100%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {hrAgeMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2 px-3 font-bold text-zinc-900 dark:text-zinc-100">Age {row.age}</td>
                  <td className="py-2 px-3 font-sans tabular-nums font-bold text-rose-700 dark:text-rose-400">{row.mhr}</td>
                  <td className="py-2 px-3 font-sans tabular-nums text-sky-600">{row.z1} bpm</td>
                  <td className="py-2 px-3 font-sans tabular-nums text-emerald-600">{row.z2} bpm</td>
                  <td className="py-2 px-3 font-sans tabular-nums text-teal-600">{row.z3} bpm</td>
                  <td className="py-2 px-3 font-sans tabular-nums text-amber-600">{row.z4} bpm</td>
                  <td className="py-2 px-3 font-sans tabular-nums text-rose-600">{row.z5} bpm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
