"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Copy,
  Check,
  ArrowRightLeft,
  Trash2,
  Sparkles,
  ExternalLink,
  AlertTriangle,
  FileText,
  Sliders,
  Code,
  Plus,
  X,
  Eye,
  Settings2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  UrlEncodingMode,
  UrlParameter,
  UrlBreakdown,
  UrlAnalytics,
} from "@/app/calculators/url-encoder-decoder/types";

// --- ENCODING & DECODING HELPERS ---

export function encodeUrlString(
  str: string,
  mode: UrlEncodingMode,
  lineByLine: boolean
): { output: string; error?: string } {
  if (!str) return { output: "" };

  try {
    const processSingle = (text: string): string => {
      let res = "";

      switch (mode) {
        case "component":
          res = encodeURIComponent(text);
          break;
        case "fullUri":
          res = encodeURI(text);
          break;
        case "rfc3986":
          // RFC 3986 §2.3 unreserved: A-Z, a-z, 0-9, -, ., _, ~
          // encodeURIComponent does not encode !'()* so we strictly encode them into uppercase hex
          res = encodeURIComponent(text).replace(/[!'()*]/g, (c) => {
            return "%" + c.charCodeAt(0).toString(16).toUpperCase();
          });
          break;
        case "formData":
          // In application/x-www-form-urlencoded, space becomes '+', and literal '+' is '%2B'
          res = encodeURIComponent(text).replace(/%20/g, "+");
          break;
        default:
          res = encodeURIComponent(text);
      }

      return res;
    };

    if (lineByLine) {
      const lines = str.split("\n");
      return { output: lines.map((l) => processSingle(l)).join("\n") };
    }

    return { output: processSingle(str) };
  } catch (err: any) {
    return { output: "", error: err.message || "Encoding error encountered." };
  }
}

export function decodeUrlString(
  str: string,
  mode: UrlEncodingMode,
  lineByLine: boolean
): { output: string; error?: string } {
  if (!str) return { output: "" };

  try {
    const processSingle = (text: string, lineIndex?: number): string => {
      let prep = text;
      if (mode === "formData") {
        // In form-data, '+' represents space
        prep = prep.replace(/\+/g, "%20");
      }

      try {
        if (mode === "fullUri") {
          return decodeURI(prep);
        }
        return decodeURIComponent(prep);
      } catch (e: any) {
        const lineMsg = lineIndex !== undefined ? ` on line ${lineIndex + 1}` : "";
        throw new Error(`Malformed percent-encoded sequence detected${lineMsg} (e.g. invalid hex or incomplete '%XX'). Check input characters.`);
      }
    };

    if (lineByLine) {
      const lines = str.split("\n");
      return { output: lines.map((l, idx) => processSingle(l, idx)).join("\n") };
    }

    return { output: processSingle(str) };
  } catch (err: any) {
    return {
      output: "",
      error: err.message || "Malformed percent-encoded sequence detected (e.g. invalid hex or incomplete '%XX'). Check input characters.",
    };
  }
}

// Helper to parse URL query parameters into editable items without corrupting literal '+'
export function parseQueryParams(urlStr: string, mode: UrlEncodingMode = "component"): UrlParameter[] {
  try {
    let searchStr = "";
    if (urlStr.includes("?")) {
      const afterQ = urlStr.split("?")[1];
      searchStr = afterQ.split("#")[0];
    } else if (urlStr.includes("=") || urlStr.includes("&")) {
      searchStr = urlStr.split("#")[0];
    }

    if (!searchStr.trim()) return [];

    const pairs = searchStr.split("&");
    const result: UrlParameter[] = [];
    let idx = 1;

    for (const pair of pairs) {
      if (!pair.trim()) continue;
      const eqIdx = pair.indexOf("=");
      let rawKey = "";
      let rawVal = "";
      if (eqIdx !== -1) {
        rawKey = pair.slice(0, eqIdx);
        rawVal = pair.slice(eqIdx + 1);
      } else {
        rawKey = pair;
        rawVal = "";
      }

      // Safe decoding without treating '+' as space in non-form-data modes
      const decodeParam = (valStr: string): string => {
        try {
          let prep = valStr;
          if (mode === "formData") {
            prep = prep.replace(/\+/g, "%20");
          }
          return decodeURIComponent(prep);
        } catch {
          return valStr;
        }
      };

      result.push({
        id: `param-${idx++}-${Date.now()}`,
        key: decodeParam(rawKey),
        value: decodeParam(rawVal),
        enabled: true,
      });
    }

    return result;
  } catch {
    return [];
  }
}

// Helper to parse visual URL breakdown components supporting arbitrary schemes and explicit ports
export function parseUrlBreakdown(urlStr: string): UrlBreakdown | null {
  if (!urlStr.trim()) return null;

  try {
    let testUrl = urlStr.trim();
    const schemeMatch = testUrl.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):\/\//);
    const hasScheme = !!schemeMatch;

    // Check for explicit port pattern before WHATWG URL normalizes default ports
    let explicitPort = "";
    const portMatch = testUrl.match(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\/[^/:]+:(\d+)/);
    if (portMatch) {
      explicitPort = portMatch[1];
    }

    if (!hasScheme) {
      testUrl = "https://" + testUrl;
    }

    const parsed = new URL(testUrl);
    return {
      protocol: hasScheme ? parsed.protocol : "(none)",
      hostname: parsed.hostname || "(none)",
      port: explicitPort || parsed.port || "(default 443/80)",
      pathname: parsed.pathname || "/",
      search: parsed.search || "(none)",
      hash: parsed.hash || "(none)",
    };
  } catch {
    return null;
  }
}

const SAMPLE_URLS = [
  "https://api.example.com/v1/search?query=hello world&category=dev tools&tags=c++#results",
  "https://shop.calcplatform.com/cart?item=Wireless Headphones&price=$149.99&coupon=SUMMER 2026",
  "https://maps.google.com/search?q=Central Park, New York&geo=40.7851,-73.9683",
  "https://auth.company.org/login?redirect_uri=https://app.company.org/oauth/callback&scope=user:email",
];

export function URLEncoderDecoder() {
  const [opMode, setOpMode] = useState<"encode" | "decode">("encode");
  const [encMode, setEncMode] = useState<UrlEncodingMode>("component");
  const [lineByLine, setLineByLine] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(
    "https://api.example.com/v1/search?query=hello world&category=dev tools&tags=c++#results"
  );

  // Parameter Table State
  const [paramsList, setParamsList] = useState<UrlParameter[]>([]);

  // Copy Feedback State
  const [copied, setCopied] = useState<boolean>(false);

  // Auto-parse query parameters when component mounts or sample loads
  useEffect(() => {
    const parsed = parseQueryParams(inputText, encMode);
    if (parsed.length > 0) {
      setParamsList(parsed);
    }
  }, []); // Initial mount

  // Perform calculation
  const textResult = useMemo(() => {
    if (opMode === "encode") {
      return encodeUrlString(inputText, encMode, lineByLine);
    } else {
      return decodeUrlString(inputText, encMode, lineByLine);
    }
  }, [inputText, opMode, encMode, lineByLine]);

  // Visual Breakdown Inspector
  const breakdown = useMemo(() => {
    return parseUrlBreakdown(inputText);
  }, [inputText]);

  // Analytics Computation
  const analytics: UrlAnalytics = useMemo(() => {
    const inBytes = new TextEncoder().encode(inputText).length;
    const outBytes = new TextEncoder().encode(textResult.output).length;
    const ratio = inBytes > 0 ? ((outBytes - inBytes) / inBytes) * 100 : 0;
    const lines = textResult.output ? textResult.output.split("\n").length : 0;

    return {
      inputChars: Array.from(inputText).length,
      outputChars: Array.from(textResult.output).length,
      inputBytes: inBytes,
      outputBytes: outBytes,
      expansionRatio: parseFloat(ratio.toFixed(2)),
      lineCount: lines,
    };
  }, [inputText, textResult.output]);

  // Reconstruct URL from parameter table edits according to selected mode
  const handleUpdateParams = (updated: UrlParameter[]) => {
    setParamsList(updated);

    try {
      let baseUrl = inputText;
      let hashStr = "";

      if (baseUrl.includes("#")) {
        const hashParts = baseUrl.split("#");
        baseUrl = hashParts[0];
        hashStr = "#" + hashParts[1];
      }

      if (baseUrl.includes("?")) {
        baseUrl = baseUrl.split("?")[0];
      }

      const activeParams = updated.filter((p) => p.enabled && p.key.trim());
      if (activeParams.length === 0) {
        setInputText(baseUrl + hashStr);
        return;
      }

      const encodeParam = (s: string) => {
        if (encMode === "formData") {
          return encodeURIComponent(s).replace(/%20/g, "+");
        }
        return encodeURIComponent(s);
      };

      const qs = activeParams
        .map((p) => `${encodeParam(p.key)}=${encodeParam(p.value)}`)
        .join("&");

      setInputText(`${baseUrl}?${qs}${hashStr}`);
    } catch {
      // Fallback
    }
  };

  const handleParamChange = (id: string, field: "key" | "value" | "enabled", val: any) => {
    const updated = paramsList.map((p) => (p.id === id ? { ...p, [field]: val } : p));
    handleUpdateParams(updated);
  };

  const handleAddParam = () => {
    const newParam: UrlParameter = {
      id: `param-${Date.now()}`,
      key: `param_${paramsList.length + 1}`,
      value: "",
      enabled: true,
    };
    handleUpdateParams([...paramsList, newParam]);
  };

  const handleDeleteParam = (id: string) => {
    const updated = paramsList.filter((p) => p.id !== id);
    handleUpdateParams(updated);
  };

  // Actions
  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    if (textResult.output && !textResult.error) {
      const nextInput = textResult.output;
      setInputText(nextInput);
      setOpMode((prev) => (prev === "encode" ? "decode" : "encode"));
      const parsed = parseQueryParams(nextInput, encMode);
      setParamsList(parsed);
    }
  };

  const handleClear = () => {
    setInputText("");
    setParamsList([]);
  };

  const handleLoadSample = () => {
    const sample = SAMPLE_URLS[0]; // Golden sample URL matching PDF
    setInputText(sample);
    const parsed = parseQueryParams(sample, encMode);
    setParamsList(parsed);
    setOpMode("encode");
  };

  const handleOpenSandbox = () => {
    const targetUrl = opMode === "encode" ? textResult.output : inputText;
    if (!targetUrl) return;

    const trimmed = targetUrl.trim();
    // Security check: strictly block dangerous script protocols
    if (/^(javascript:|data:|vbscript:)/i.test(trimmed)) {
      alert("Opening javascript:, data:, or script URLs is blocked for security.");
      return;
    }

    let valid = trimmed;
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//i.test(valid)) {
      valid = "https://" + valid;
    }

    try {
      window.open(valid, "_blank", "noopener,noreferrer");
    } catch {
      // Pop-up blocker
    }
  };

  const handleDownload = (type: "txt" | "json") => {
    if (!textResult.output) return;

    let blobContent = textResult.output;
    let mimeType = "text/plain;charset=utf-8";
    const filename = `url-${opMode}d.${type}`;

    if (type === "json") {
      mimeType = "application/json";
      blobContent = JSON.stringify(
        {
          operation: opMode,
          mode: encMode,
          input: inputText,
          output: textResult.output,
          analytics,
          breakdown,
          parameters: paramsList,
        },
        null,
        2
      );
    }

    const blob = new Blob([blobContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP CONTROL BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-2xl shadow-xs">
        {/* Operation Mode Segmented Control */}
        <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200/70 dark:border-zinc-700/70" role="group" aria-label="Operation Mode">
          <button
            type="button"
            onClick={() => setOpMode("encode")}
            aria-pressed={opMode === "encode"}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              opMode === "encode"
                ? "bg-blue-600 text-white shadow-sm scale-[1.02]"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <Zap className="h-3.5 w-3.5" /> Encode URL
          </button>
          <button
            type="button"
            onClick={() => setOpMode("decode")}
            aria-pressed={opMode === "decode"}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              opMode === "decode"
                ? "bg-indigo-600 text-white shadow-sm scale-[1.02]"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <Code className="h-3.5 w-3.5" /> Decode URL
          </button>
        </div>

        {/* Encoding Granularity Mode Selector */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
            <Sliders className="h-3.5 w-3.5 text-blue-500" /> Mode:
          </span>

          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200/70 dark:border-zinc-700/70" role="group" aria-label="Encoding Mode">
            <button
              type="button"
              onClick={() => setEncMode("component")}
              title="encodeURIComponent - Encodes all delimiters including :, /, ?, &, #"
              aria-pressed={encMode === "component"}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                encMode === "component"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              encodeURIComponent (Query)
            </button>
            <button
              type="button"
              onClick={() => setEncMode("fullUri")}
              title="encodeURI - Preserves URL protocol and structure delimiters"
              aria-pressed={encMode === "fullUri"}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                encMode === "fullUri"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              encodeURI (Full Address)
            </button>
            <button
              type="button"
              onClick={() => setEncMode("rfc3986")}
              title="RFC 3986 Strict Mode - Encodes !, ', (, ), *"
              aria-pressed={encMode === "rfc3986"}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                encMode === "rfc3986"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              RFC 3986 Strict
            </button>
            <button
              type="button"
              onClick={() => setEncMode("formData")}
              title="Form Data Mode - Converts spaces to + instead of %20"
              aria-pressed={encMode === "formData"}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                encMode === "formData"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              Form Data (+ space)
            </button>
          </div>
        </div>
      </div>

      {/* 2. DUAL-CARD WORKSPACE */}
      <div className="space-y-4">
        {/* Quick Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-zinc-50 dark:bg-zinc-800/40 p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
          <label htmlFor="batch-mode-checkbox" className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
            <input
              id="batch-mode-checkbox"
              type="checkbox"
              checked={lineByLine}
              onChange={(e) => setLineByLine(e.target.checked)}
              className="rounded text-blue-600 accent-blue-600 cursor-pointer"
            />
            <span>Batch line-by-line mode (process each line independently)</span>
          </label>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleLoadSample}
              className="text-[11px] font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 cursor-pointer"
            >
              <Sparkles className="h-3 w-3" /> Load Sample URL
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="text-[11px] font-medium text-zinc-400 hover:text-red-500 flex items-center gap-1 px-2 py-1 cursor-pointer"
            >
              <Trash2 className="h-3 w-3" /> Clear All
            </button>
          </div>
        </div>

        {/* Dual-Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Card: Input Workspace */}
          <div className="lg:col-span-6 space-y-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs flex flex-col">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
              <label htmlFor="raw-url-input" className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 cursor-pointer">
                <FileText className="h-3.5 w-3.5 text-blue-600" />
                <span>{opMode === "encode" ? "Raw Input URL / String" : "Encoded Percent-String Input"}</span>
              </label>
              <span className="text-[10px] font-sans tabular-nums text-zinc-400">
                {analytics.inputChars} chars | {analytics.inputBytes} B
              </span>
            </div>

            <textarea
              id="raw-url-input"
              value={inputText}
              onChange={(e) => {
                const val = e.target.value;
                setInputText(val);
                const parsed = parseQueryParams(val, encMode);
                if (parsed.length > 0) setParamsList(parsed);
              }}
              placeholder={
                opMode === "encode"
                  ? "Paste raw URL or query text here..."
                  : "Paste percent-encoded URL (e.g., https%3A%2F%2F...) here..."
              }
              rows={9}
              className="w-full flex-1 p-3 text-xs font-sans tabular-nums bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 resize-y text-zinc-900 dark:text-zinc-100"
            />
          </div>

          {/* Right Card: Output Workspace */}
          <div className="lg:col-span-6 space-y-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs flex flex-col">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
              <label htmlFor="url-output" className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                <Code className="h-3.5 w-3.5 text-emerald-600" />
                <span>{opMode === "encode" ? "Percent-Encoded Output" : "Decoded Plaintext Output"}</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {encMode === "component"
                    ? "encodeURIComponent"
                    : encMode === "fullUri"
                    ? "encodeURI"
                    : encMode === "rfc3986"
                    ? "RFC 3986 Strict"
                    : "Form Data (+ space)"}
                </span>
              </label>
              <span className="text-[10px] font-sans tabular-nums text-zinc-400">
                {analytics.outputChars} chars | {analytics.outputBytes} B
              </span>
            </div>

            {textResult.error ? (
              <div role="alert" aria-live="assertive" className="flex-1 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-bold">
                  <AlertTriangle className="h-4 w-4 shrink-0" /> Decoding Error
                </div>
                <p className="text-rose-600 dark:text-rose-300 text-[11px] leading-relaxed">
                  {textResult.error}
                </p>
              </div>
            ) : (
              <textarea
                id="url-output"
                readOnly
                value={textResult.output}
                placeholder="Transformed URL will appear here dynamically..."
                rows={9}
                className="w-full flex-1 p-3 text-xs font-sans tabular-nums bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none resize-y text-emerald-700 dark:text-emerald-400"
              />
            )}

            {/* Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex flex-wrap items-center gap-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(textResult.output)}
                  disabled={!textResult.output || !!textResult.error}
                  aria-label="Copy Output"
                  className="h-7 text-xs gap-1 border-zinc-200 dark:border-zinc-700 cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy Output"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSwap}
                  disabled={!textResult.output || !!textResult.error}
                  aria-label="Swap Input and Output"
                  className="h-7 text-xs gap-1 border-zinc-200 dark:border-zinc-700 cursor-pointer"
                >
                  <ArrowRightLeft className="h-3.5 w-3.5 text-blue-500" /> Swap
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleOpenSandbox}
                  disabled={!inputText && !textResult.output}
                  aria-label="Open URL in New Tab"
                  className="h-7 text-xs gap-1 border-zinc-200 dark:border-zinc-700 cursor-pointer text-purple-600 dark:text-purple-400"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Open in New Tab
                </Button>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleDownload("txt")}
                  disabled={!textResult.output || !!textResult.error}
                  aria-label="Export TXT"
                  className="text-[11px] font-bold px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer text-zinc-700 dark:text-zinc-300"
                >
                  .txt
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload("json")}
                  disabled={!textResult.output || !!textResult.error}
                  aria-label="Export JSON"
                  className="text-[11px] font-bold px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer text-zinc-700 dark:text-zinc-300"
                >
                  .json
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE URL PARAMETER PARSER & KEY-VALUE TABLE EDITOR */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Settings2 className="h-4 w-4 text-blue-600" />
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
              Interactive URL Query Parameter Table Editor
            </h3>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600">
              {paramsList.length} {paramsList.length === 1 ? "Parameter" : "Parameters"}
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddParam}
            aria-label="Add New Query Parameter"
            className="h-7 text-xs gap-1 cursor-pointer border-blue-200 dark:border-blue-900 text-blue-600"
          >
            <Plus className="h-3.5 w-3.5" /> Add Parameter
          </Button>
        </div>

        {paramsList.length === 0 ? (
          <p className="text-xs text-zinc-400 italic">
            No query parameters detected in the current URL. Type a URL containing <code>?key=value</code> or click "Add Parameter" above.
          </p>
        ) : (
          <div className="overflow-x-auto space-y-2">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/60 font-bold text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700">
                  <th scope="col" className="p-2 w-12 text-center">Active</th>
                  <th scope="col" className="p-2 w-1/3">Key (Param Name)</th>
                  <th scope="col" className="p-2">Value</th>
                  <th scope="col" className="p-2 w-12 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {paramsList.map((param, idx) => (
                  <tr
                    key={param.id}
                    className={`transition-colors ${
                      param.enabled ? "" : "opacity-40 bg-zinc-50/50 dark:bg-zinc-950/20"
                    }`}
                  >
                    <td className="p-2 text-center">
                      <input
                        type="checkbox"
                        checked={param.enabled}
                        onChange={(e) => handleParamChange(param.id, "enabled", e.target.checked)}
                        aria-label={`Enable parameter ${param.key || idx + 1}`}
                        className="rounded text-blue-600 accent-blue-600 cursor-pointer"
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        id={`param-key-${param.id}`}
                        value={param.key}
                        onChange={(e) => handleParamChange(param.id, "key", e.target.value)}
                        aria-label={`Parameter ${idx + 1} name`}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900"
                        placeholder="param_name"
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        id={`param-val-${param.id}`}
                        value={param.value}
                        onChange={(e) => handleParamChange(param.id, "value", e.target.value)}
                        aria-label={`Parameter ${idx + 1} value`}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400"
                        placeholder="param_value"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteParam(param.id)}
                        className="text-zinc-400 hover:text-rose-600 cursor-pointer p-1"
                        aria-label={`Delete parameter ${param.key || idx + 1}`}
                        title="Delete parameter"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. LIVE URL BREAKDOWN INSPECTOR */}
      {breakdown && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <Eye className="h-4 w-4 text-purple-600" />
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
              Live URL Component Breakdown Inspector
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-sans tabular-nums">
            <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700">
              <span className="text-[10px] text-zinc-400 font-bold block uppercase font-sans">Protocol</span>
              <span className="font-bold text-blue-600 block truncate">{breakdown.protocol}</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700">
              <span className="text-[10px] text-zinc-400 font-bold block uppercase font-sans">Hostname</span>
              <span className="font-bold text-emerald-600 block truncate">{breakdown.hostname}</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700">
              <span className="text-[10px] text-zinc-400 font-bold block uppercase font-sans">Port</span>
              <span className="font-bold text-zinc-700 dark:text-zinc-300 block truncate">{breakdown.port}</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700">
              <span className="text-[10px] text-zinc-400 font-bold block uppercase font-sans">Pathname</span>
              <span className="font-bold text-purple-600 block truncate">{breakdown.pathname}</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700">
              <span className="text-[10px] text-zinc-400 font-bold block uppercase font-sans">Search Query</span>
              <span className="font-bold text-amber-600 block truncate">{breakdown.search}</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700">
              <span className="text-[10px] text-zinc-400 font-bold block uppercase font-sans">Hash Fragment</span>
              <span className="font-bold text-rose-600 block truncate">{breakdown.hash}</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. DATA ANALYTICS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs" aria-live="polite">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] text-zinc-400 font-bold block uppercase">Input Size</span>
          <span className="text-base font-black font-sans tabular-nums text-zinc-900 dark:text-zinc-100 block">
            {analytics.inputBytes} Bytes
          </span>
          <span className="text-[10px] text-zinc-400">{analytics.inputChars} characters</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] text-zinc-400 font-bold block uppercase">Output Size</span>
          <span className="text-base font-black font-sans tabular-nums text-blue-600 block">
            {analytics.outputBytes} Bytes
          </span>
          <span className="text-[10px] text-zinc-400">{analytics.outputChars} characters</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] text-zinc-400 font-bold block uppercase">Expansion Ratio</span>
          <span className={`text-base font-black font-sans tabular-nums block ${analytics.expansionRatio >= 0 ? "text-amber-600" : "text-emerald-600"}`}>
            {analytics.expansionRatio >= 0 ? `+${analytics.expansionRatio}%` : `${analytics.expansionRatio}%`}
          </span>
          <span className="text-[10px] text-zinc-400">Percent-encoding growth</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] text-zinc-400 font-bold block uppercase">Line Count</span>
          <span className="text-base font-black font-sans tabular-nums text-purple-600 block">
            {analytics.lineCount} {analytics.lineCount === 1 ? "Line" : "Lines"}
          </span>
          <span className="text-[10px] text-zinc-400">{lineByLine ? "Batch line-by-line" : "Single URL stream"}</span>
        </div>
      </div>
    </div>
  );
}
