"use client";

import { type FormEvent, useMemo, useState } from "react";
import {
  BarChart3,
  Bookmark,
  Check,
  Clipboard,
  Download,
  FolderOpen,
  History,
  Info,
  Save,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";

type ErrorMode = "absolute" | "signed";

interface ErrorResult {
  observed: number;
  trueValue: number;
  difference: number;
  absoluteError: number;
  absolutePercent: number;
  signedPercent: number;
  relativeError: number;
  accuracy: number;
  direction: "exact" | "over" | "under";
}

interface SavedRun {
  id: string;
  name?: string;
  description?: string;
  observed: number;
  trueValue: number;
  percent: number;
  direction: string;
  createdAt: string;
}

interface BatchRow {
  observed: number;
  trueValue: number;
  percent: number;
  absoluteError: number;
  valid: boolean;
}

const DEFAULT_OBSERVED = "56.891";
const DEFAULT_TRUE = "62.327";
const STORAGE_KEY = "saved_percent_error_calculations";

function parseValue(value: string): number | undefined {
  if (value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function formatValue(value: number, digits = 3): string {
  return value.toLocaleString(undefined, { maximumFractionDigits: digits });
}

function formatSigned(value: number, digits = 3): string {
  if (value === 0) return "0";
  return `${value > 0 ? "+" : ""}${formatValue(value, digits)}`;
}

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function PercentErrorCalculator() {
  const [observed, setObserved] = useState(DEFAULT_OBSERVED);
  const [trueValue, setTrueValue] = useState(DEFAULT_TRUE);
  const [mode, setMode] = useState<ErrorMode>("absolute");
  const [savedRuns, setSavedRuns] = useState<SavedRun[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [batchText, setBatchText] = useState("56.891,62.327\n9.5,9.8\n100,98");
  const [copied, setCopied] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [saveDescription, setSaveDescription] = useState("");
  const [saveSuccessMessage, setSaveSuccessMessage] = useState("");

  const result = useMemo<ErrorResult | null>(() => {
    const measured = parseValue(observed);
    const accepted = parseValue(trueValue);
    if (measured === undefined || accepted === undefined || accepted === 0) return null;

    const difference = measured - accepted;
    const absoluteError = Math.abs(difference);
    const absolutePercent = (absoluteError / Math.abs(accepted)) * 100;
    const signedPercent = (difference / Math.abs(accepted)) * 100;

    return {
      observed: measured,
      trueValue: accepted,
      difference,
      absoluteError,
      absolutePercent,
      signedPercent,
      relativeError: absoluteError / Math.abs(accepted),
      accuracy: Math.max(0, 100 - absolutePercent),
      direction: difference === 0 ? "exact" : difference > 0 ? "over" : "under",
    };
  }, [observed, trueValue]);

  const batchRows = useMemo<BatchRow[]>(() => {
    return batchText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [observedPart = "", truePart = ""] = line.split(/[;,]/).map((part) => part.trim());
        const observedNumber = parseValue(observedPart);
        const trueNumber = parseValue(truePart);
        const valid = observedNumber !== undefined && trueNumber !== undefined && trueNumber !== 0;
        return {
          observed: observedNumber ?? 0,
          trueValue: trueNumber ?? 0,
          percent: valid ? (Math.abs(observedNumber! - trueNumber!) / Math.abs(trueNumber!)) * 100 : 0,
          absoluteError: valid ? Math.abs(observedNumber! - trueNumber!) : 0,
          valid,
        };
      });
  }, [batchText]);

  const batchAverage = useMemo(() => {
    const validRows = batchRows.filter((row) => row.valid);
    return validRows.length ? validRows.reduce((sum, row) => sum + row.percent, 0) / validRows.length : 0;
  }, [batchRows]);

  const persistRuns = (runs: SavedRun[]) => {
    setSavedRuns(runs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(runs));
    } catch {
      // Saving is a convenience, not a requirement for calculating.
    }
  };

  const resultText = result
    ? `Observed value: ${result.observed}\nTrue value: ${result.trueValue}\nAbsolute error: ${formatValue(result.absoluteError, 6)}\nAbsolute percent error: ${formatValue(result.absolutePercent)}%\nSigned percent error: ${formatSigned(result.signedPercent)}%\nRelative error: ${formatValue(result.relativeError, 6)}\nCloseness score: ${formatValue(result.accuracy)}%`
    : "Enter a finite observed value and a non-zero true value.";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleOpenSave = () => {
    if (!result) return;
    setSaveName("");
    setSaveDescription("");
    setSaveSuccessMessage("");
    setIsSaveModalOpen(true);
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!result) return;
    const next: SavedRun = {
      id: `${Date.now()}`,
      name: saveName.trim() || `Percent error: ${formatValue(result.absolutePercent)}%`,
      description: saveDescription.trim() || `${formatValue(result.observed, 6)} observed vs ${formatValue(result.trueValue, 6)} true`,
      observed: result.observed,
      trueValue: result.trueValue,
      percent: result.absolutePercent,
      direction: result.direction,
      createdAt: new Date().toISOString(),
    };
    const updatedRuns = [next, ...savedRuns.filter((run) => !(run.observed === next.observed && run.trueValue === next.trueValue))].slice(0, 20);
    persistRuns(updatedRuns);
    setSaveSuccessMessage("Calculation saved successfully.");
  };

  const handleLoadSavedRun = (run: SavedRun) => {
    setObserved(String(run.observed));
    setTrueValue(String(run.trueValue));
    setMode("absolute");
    setIsSaveModalOpen(false);
  };

  const handleDeleteSavedRun = (id: string) => {
    persistRuns(savedRuns.filter((run) => run.id !== id));
  };

  const handleExport = () => {
    if (!result) return;
    downloadFile("percent-error-result.txt", resultText, "text/plain;charset=utf-8");
  };

  const handleExportBatch = () => {
    const csv = [
      "Observed value,True value,Absolute error,Absolute percent error,Status",
      ...batchRows.map((row) => `${row.observed},${row.trueValue},${row.valid ? row.absoluteError : ""},${row.valid ? row.percent : ""},${row.valid ? "Valid" : "Invalid"}`),
    ].join("\n");
    downloadFile("percent-error-batch.csv", csv, "text/csv;charset=utf-8");
  };

  const handleClear = () => {
    setObserved("0");
    setTrueValue("0");
    setMode("absolute");
  };

  const maxComparison = result ? Math.max(Math.abs(result.observed), Math.abs(result.trueValue), 1) : 1;
  const observedWidth = result ? Math.max(3, (Math.abs(result.observed) / maxComparison) * 100) : 0;
  const trueWidth = result ? Math.max(3, (Math.abs(result.trueValue) / maxComparison) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/70 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
          <button type="button" onClick={handleOpenSave} disabled={!result} className="w-full rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40">Save</button>
          <button type="button" onClick={handleExport} disabled={!result} className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">Export</button>
          <button type="button" onClick={() => void handleCopy()} disabled={!result} className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">{copied ? "Copied" : "Copy"}</button>
          <button type="button" onClick={handleClear} className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">Clear</button>
        </div>
      </div>
      <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col gap-3 border-b border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-950/50 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Measurement comparison</p>
            <h2 className="mt-1 text-base font-bold text-zinc-950 dark:text-zinc-100">Compare an observed value with the accepted value</h2>
          </div>
          <div className="flex rounded-lg border border-zinc-200 bg-white p-0.5 dark:border-zinc-700 dark:bg-zinc-900" role="tablist" aria-label="Error display mode">
            <button type="button" onClick={() => setMode("absolute")} className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${mode === "absolute" ? "bg-blue-600 text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"}`} role="tab" aria-selected={mode === "absolute"}>Absolute error</button>
            <button type="button" onClick={() => setMode("signed")} className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${mode === "signed" ? "bg-blue-600 text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"}`} role="tab" aria-selected={mode === "signed"}>Signed error</button>
          </div>
        </div>

        <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <label className="space-y-1.5">
                <span className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300"><span>Observed / measured value</span><span className="font-normal text-zinc-400">x</span></span>
                <input aria-label="Observed or measured value" type="number" inputMode="decimal" value={observed} onChange={(event) => setObserved(event.target.value)} className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 font-sans tabular-nums text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
                <span className="block text-[11px] leading-4 text-zinc-500">The value produced by an experiment, instrument, or measurement.</span>
              </label>
              <label className="space-y-1.5">
                <span className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300"><span>True / accepted value</span><span className="font-normal text-zinc-400">t</span></span>
                <input aria-label="True or accepted value" type="number" inputMode="decimal" value={trueValue} onChange={(event) => setTrueValue(event.target.value)} className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 font-sans tabular-nums text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
                <span className="block text-[11px] leading-4 text-zinc-500">The reference, theoretical, known, or accepted value.</span>
              </label>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {[{ label: "Gravity", observed: "9.5", trueValue: "9.80665" }, { label: "Density", observed: "2.58", trueValue: "2.70" }, { label: "Exact match", observed: "100", trueValue: "100" }].map((preset) => (
                <button key={preset.label} type="button" onClick={() => { setObserved(preset.observed); setTrueValue(preset.trueValue); }} className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 font-medium text-zinc-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300">Try {preset.label}</button>
              ))}
            </div>

          </div>

          <div className="min-w-0 rounded-xl border border-blue-100 bg-blue-50/60 p-4 dark:border-blue-900/70 dark:bg-blue-950/20">
            {result ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div><p className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">{mode === "absolute" ? "Absolute percent error" : "Signed percent error"}</p><p className="mt-1 font-sans tabular-nums text-4xl font-black tracking-tight text-zinc-950 dark:text-white">{mode === "absolute" ? formatValue(result.absolutePercent) : formatSigned(result.signedPercent)}<span className="text-xl text-blue-600">%</span></p></div>
                  <div className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${result.direction === "exact" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" : result.direction === "over" ? "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300" : "bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300"}`}>{result.direction === "exact" ? "Exact" : result.direction === "over" ? "Overestimate" : "Underestimate"}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                  {[{ label: "Absolute error", value: formatValue(result.absoluteError, 6) }, { label: "Relative error", value: formatValue(result.relativeError, 6) }, { label: "Signed error", value: `${formatSigned(result.signedPercent)}%` }, { label: "Closeness score", value: `${formatValue(result.accuracy)}%` }].map((metric) => <div key={metric.label} className="rounded-lg border border-blue-100 bg-white/80 p-2.5 dark:border-blue-900/60 dark:bg-zinc-900/70"><p className="text-[10px] leading-3 text-zinc-500">{metric.label}</p><p className="mt-1 truncate font-sans tabular-nums text-sm font-bold text-zinc-900 dark:text-zinc-100">{metric.value}</p></div>)}
                </div>
                <div className="space-y-2 border-t border-blue-200/70 pt-3 dark:border-blue-900/70">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Value comparison</p>
                  {[{ label: "Observed", value: result.observed, width: observedWidth, color: "bg-blue-600" }, { label: "True", value: result.trueValue, width: trueWidth, color: "bg-emerald-500" }].map((bar) => <div key={bar.label} className="grid grid-cols-[58px_minmax(0,1fr)_72px] items-center gap-2 text-xs"><span className="font-semibold text-zinc-600 dark:text-zinc-400">{bar.label}</span><div className="h-2 overflow-hidden rounded-full bg-white dark:bg-zinc-800"><div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.width}%` }} /></div><span className="truncate text-right font-sans tabular-nums font-semibold text-zinc-700 dark:text-zinc-300">{formatValue(bar.value, 6)}</span></div>)}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[260px] flex-col items-center justify-center text-center"><Info className="h-8 w-8 text-blue-500" /><h3 className="mt-3 text-sm font-bold text-zinc-900 dark:text-zinc-100">Waiting for valid values</h3><p className="mt-1 max-w-xs text-xs leading-5 text-zinc-500">Enter numbers in both fields. The true value must not be zero because it is the denominator of the formula.</p></div>
            )}
          </div>
        </div>
      </section>

      {result && <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-5"><div className="flex items-center gap-2"><BarChart3 className="h-4 w-4 text-blue-600" /><h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">How this result is calculated</h2></div><div className="mt-4 grid gap-2 sm:grid-cols-3">{[{ number: "1", title: "Find the difference", formula: `${formatValue(result.observed, 6)} − ${formatValue(result.trueValue, 6)} = ${formatSigned(result.difference, 6)}` }, { number: "2", title: "Take its magnitude", formula: `|${formatSigned(result.difference, 6)}| = ${formatValue(result.absoluteError, 6)}` }, { number: "3", title: "Scale against true value", formula: `${formatValue(result.absoluteError, 6)} ÷ |${formatValue(result.trueValue, 6)}| × 100 = ${formatValue(result.absolutePercent)}%` }].map((step) => <div key={step.number} className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-950"><div className="flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">{step.number}</span><h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{step.title}</h3></div><p className="mt-2 break-words font-sans tabular-nums text-[11px] leading-5 text-blue-700 dark:text-blue-300">{step.formula}</p></div>)}</div><p className="mt-3 flex items-start gap-2 text-[11px] leading-5 text-zinc-500"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />Absolute percent error reports size only. Switch to signed error when the direction of the measurement matters.</p></section>}

      <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-5"><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-emerald-600" /><h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Batch percent error analyzer</h2></div><p className="mt-1 text-xs text-zinc-500">Paste one observed,true pair per line. Commas and semicolons are accepted.</p></div><button type="button" onClick={handleExportBatch} disabled={!batchRows.length} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"><Download className="h-3.5 w-3.5" /> Export CSV</button></div><textarea value={batchText} onChange={(event) => setBatchText(event.target.value)} aria-label="Batch observed and true value pairs" className="mt-4 min-h-24 w-full resize-y rounded-xl border border-zinc-300 bg-zinc-50 p-3 font-sans tabular-nums text-xs leading-5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" placeholder="observed,true\n56.891,62.327" /><div className="mt-3 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800"><table className="w-full min-w-[520px] text-left text-xs"><thead className="bg-zinc-50 text-[10px] uppercase tracking-wider text-zinc-500 dark:bg-zinc-950"><tr><th className="px-3 py-2">#</th><th className="px-3 py-2">Observed</th><th className="px-3 py-2">True</th><th className="px-3 py-2">Absolute error</th><th className="px-3 py-2">Percent error</th></tr></thead><tbody>{batchRows.map((row, index) => <tr key={`${index}-${row.observed}-${row.trueValue}`} className="border-t border-zinc-100 dark:border-zinc-800"><td className="px-3 py-2 text-zinc-400">{index + 1}</td><td className="px-3 py-2 font-sans tabular-nums">{row.valid ? formatValue(row.observed, 6) : "Invalid"}</td><td className="px-3 py-2 font-sans tabular-nums">{row.valid ? formatValue(row.trueValue, 6) : "Invalid"}</td><td className="px-3 py-2 font-sans tabular-nums">{row.valid ? formatValue(row.absoluteError, 6) : "—"}</td><td className={`px-3 py-2 font-sans tabular-nums font-bold ${row.valid ? "text-blue-600 dark:text-blue-400" : "text-red-500"}`}>{row.valid ? `${formatValue(row.percent)}%` : "Check true value"}</td></tr>)}</tbody></table></div>{batchRows.some((row) => row.valid) && <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-300"><BarChart3 className="h-3.5 w-3.5 text-blue-500" />Average absolute percent error: <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">{formatValue(batchAverage)}%</span></p>}</section>

      {savedRuns.length > 0 && <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-5"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><History className="h-4 w-4 text-blue-600" /><h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Saved calculations</h2><span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-500 dark:bg-zinc-800">{savedRuns.length}</span></div><button type="button" onClick={() => persistRuns([])} className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-400 hover:text-red-500"><Trash2 className="h-3 w-3" /> Clear all</button></div><div className="mt-3 grid gap-2 sm:grid-cols-2">{savedRuns.map((run) => <div key={run.id} className="flex items-center justify-between gap-3 rounded-lg border border-zinc-100 bg-zinc-50 p-2.5 dark:border-zinc-800 dark:bg-zinc-950"><div className="min-w-0"><p className="truncate font-sans tabular-nums text-xs font-bold text-zinc-800 dark:text-zinc-200">{formatValue(run.observed, 6)} vs {formatValue(run.trueValue, 6)}</p><p className="mt-0.5 text-[10px] text-zinc-400">{new Date(run.createdAt).toLocaleString()}</p></div><span className="shrink-0 font-sans tabular-nums text-xs font-bold text-blue-600 dark:text-blue-400">{formatValue(run.percent)}%</span></div>)}</div></section>}

      {isSaveModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"><div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-6"><button type="button" onClick={() => setIsSaveModalOpen(false)} className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200" aria-label="Close save dialog"><X className="h-5 w-5" /></button><div className="flex items-center gap-2.5"><div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-950 dark:text-blue-400"><Bookmark className="h-5 w-5" /></div><div><h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Save Calculation</h3><p className="text-xs text-zinc-500">Name this result so you can load it later from this device.</p></div></div>{saveSuccessMessage ? <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"><Check className="h-4 w-4" /> {saveSuccessMessage}</div> : <form onSubmit={handleSave} className="mt-4 space-y-3"><div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs dark:border-zinc-700 dark:bg-zinc-800/60"><span className="block text-zinc-500">Current calculation</span><span className="mt-1 block font-sans tabular-nums text-sm font-bold text-zinc-900 dark:text-zinc-100">{result ? `${formatValue(result.absolutePercent)}% absolute error` : "No valid result"}</span><span className="mt-1 block text-[11px] text-zinc-500">{result ? `${formatValue(result.observed, 6)} observed vs ${formatValue(result.trueValue, 6)} true` : "Enter a non-zero true value first."}</span></div><label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">Name (optional)<input type="text" value={saveName} onChange={(event) => setSaveName(event.target.value)} placeholder="e.g. Physics lab trial 1" className="mt-1 h-9 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-xs font-normal outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" /></label><label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">Description (optional)<textarea rows={2} value={saveDescription} onChange={(event) => setSaveDescription(event.target.value)} placeholder="e.g. Gravity measurement before calibration" className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 p-2 text-xs font-normal outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" /></label><div className="flex justify-end gap-2 pt-1"><button type="button" onClick={() => { setSaveName(""); setSaveDescription(""); }} className="rounded-lg border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">Clear</button><button type="submit" className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700">Save Calculation</button></div></form>}{savedRuns.length > 0 && <div className="mt-5 space-y-2 border-t border-zinc-100 pt-4 dark:border-zinc-800"><span className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300"><FolderOpen className="h-3.5 w-3.5 text-blue-500" /> Saved Calculations ({savedRuns.length})</span><div className="max-h-48 space-y-2 overflow-y-auto">{savedRuns.map((run) => <div key={run.id} className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-2.5 dark:border-zinc-700 dark:bg-zinc-800/70"><div className="min-w-0"><span className="block truncate text-xs font-bold text-zinc-900 dark:text-zinc-100">{run.name || `Percent error: ${formatValue(run.percent)}%`}</span><span className="mt-0.5 block truncate text-[10px] text-zinc-500">{run.description || `${formatValue(run.observed, 6)} observed vs ${formatValue(run.trueValue, 6)} true`} • {new Date(run.createdAt).toLocaleDateString()}</span></div><div className="flex shrink-0 items-center gap-1"><button type="button" onClick={() => handleLoadSavedRun(run)} className="rounded px-2 py-1 text-[10px] font-semibold text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/40">Load</button><button type="button" onClick={() => handleDeleteSavedRun(run.id)} className="p-1 text-zinc-400 hover:text-red-500" title="Delete saved calculation"><Trash2 className="h-3.5 w-3.5" /></button></div></div>)}</div></div>}</div></div>}

      <p className="flex items-start gap-2 px-1 text-[11px] leading-5 text-zinc-500"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />Use the same units for both inputs. Percent error is unitless, but the absolute error keeps the units of the original measurement.</p>
    </div>
  );
}

export default PercentErrorCalculator;
