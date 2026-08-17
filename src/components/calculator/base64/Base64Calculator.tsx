"use client";

import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  Code,
  Copy,
  Check,
  ArrowRightLeft,
  Download,
  Trash2,
  Sparkles,
  Upload,
  FileText,
  Image as ImageIcon,
  AlertTriangle,
  Sliders,
  CheckCircle2,
  Info,
  Globe,
  Layers,
  FileCode,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// --- UTILITY ENCODING & DECODING HELPERS ---

function encodeBase64(
  str: string,
  variant: "standard" | "urlsafe",
  charset: "UTF-8" | "ASCII" | "UTF-16" | "Latin-1",
  chunk76: boolean,
  lineByLine: boolean
): { output: string; error?: string } {
  if (!str) return { output: "" };

  try {
    const processSingle = (text: string): string => {
      let bytes: Uint8Array;

      if (charset === "UTF-8") {
        bytes = new TextEncoder().encode(text);
      } else if (charset === "ASCII" || charset === "Latin-1") {
        bytes = new Uint8Array(text.length);
        for (let i = 0; i < text.length; i++) {
          bytes[i] = text.charCodeAt(i) & 0xff;
        }
      } else if (charset === "UTF-16") {
        bytes = new Uint8Array(text.length * 2);
        for (let i = 0; i < text.length; i++) {
          const code = text.charCodeAt(i);
          bytes[i * 2] = code & 0xff;
          bytes[i * 2 + 1] = (code >> 8) & 0xff;
        }
      } else {
        bytes = new TextEncoder().encode(text);
      }

      // Convert bytes to binary string
      let binStr = "";
      for (let i = 0; i < bytes.length; i++) {
        binStr += String.fromCharCode(bytes[i]);
      }
      let b64 = btoa(binStr);

      if (variant === "urlsafe") {
        b64 = b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      }

      if (chunk76) {
        b64 = b64.match(/.{1,76}/g)?.join("\n") || b64;
      }

      return b64;
    };

    if (lineByLine) {
      const lines = str.split("\n");
      const processed = lines.map((l) => processSingle(l));
      return { output: processed.join("\n") };
    }

    return { output: processSingle(str) };
  } catch (err: any) {
    return { output: "", error: err.message || "Encoding failed. Ensure text is valid for chosen charset." };
  }
}

function decodeBase64(
  str: string,
  variant: "standard" | "urlsafe",
  charset: "UTF-8" | "ASCII" | "UTF-16" | "Latin-1",
  lineByLine: boolean
): { output: string; error?: string } {
  if (!str.trim()) return { output: "" };

  try {
    const processSingle = (b64Input: string): string => {
      let cleaned = b64Input.trim().replace(/\s+/g, "");

      if (variant === "urlsafe") {
        cleaned = cleaned.replace(/-/g, "+").replace(/_/g, "/");
        while (cleaned.length % 4 !== 0) {
          cleaned += "=";
        }
      }

      const binStr = atob(cleaned);
      const bytes = new Uint8Array(binStr.length);
      for (let i = 0; i < binStr.length; i++) {
        bytes[i] = binStr.charCodeAt(i);
      }

      if (charset === "UTF-8") {
        return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
      } else if (charset === "ASCII" || charset === "Latin-1") {
        return binStr;
      } else if (charset === "UTF-16") {
        let text = "";
        for (let i = 0; i < bytes.length; i += 2) {
          const code = bytes[i] | (bytes[i + 1] << 8);
          text += String.fromCharCode(code);
        }
        return text;
      }
      return new TextDecoder().decode(bytes);
    };

    if (lineByLine) {
      const lines = str.split("\n").filter((l) => l.trim().length > 0);
      const decoded = lines.map((l) => processSingle(l));
      return { output: decoded.join("\n") };
    }

    return { output: processSingle(str) };
  } catch (err: any) {
    return {
      output: "",
      error: "Invalid Base64 format or corrupted character encoding. Check for missing padding or illegal characters.",
    };
  }
}

const SAMPLE_TEXTS = [
  "Base64URL Test ?query=hello/world+demo>>?",
  "Hello, World! Welcome to CalcPlatform Base64 Tool 🚀",
  "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=",
  '{"name": "CalcPlatform", "type": "Developer Tools", "base64": true}',
  "The quick brown fox jumps over the lazy dog.",
];

export function Base64Calculator() {
  const [tabMode, setTabMode] = useState<"text" | "file">("text");
  const [opMode, setOpMode] = useState<"encode" | "decode">("encode");
  const [variant, setVariant] = useState<"standard" | "urlsafe">("standard");
  const [charset, setCharset] = useState<"UTF-8" | "ASCII" | "UTF-16" | "Latin-1">("UTF-8");
  const [chunk76, setChunk76] = useState<boolean>(false);
  const [lineByLine, setLineByLine] = useState<boolean>(false);

  // Text Mode State
  const [inputText, setInputText] = useState<string>("Base64URL Test ?query=hello/world+demo>>?");

  // File Mode State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string>("");
  const [fileOutputType, setFileOutputType] = useState<"raw" | "dataUri" | "htmlImg" | "cssBg">("dataUri");
  const [fileLoading, setFileLoading] = useState<boolean>(false);

  // Actions State
  const [copied, setCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate Text Mode Result dynamically
  const textResult = useMemo(() => {
    if (tabMode !== "text") return { output: "" };

    if (opMode === "encode") {
      return encodeBase64(inputText, variant, charset, chunk76, lineByLine);
    } else {
      return decodeBase64(inputText, variant, charset, lineByLine);
    }
  }, [inputText, opMode, variant, charset, chunk76, lineByLine, tabMode]);

  // Analytics Computation
  const analytics = useMemo(() => {
    const inputStr = tabMode === "text" ? inputText : selectedFile ? `${selectedFile.name}` : "";
    const outputStr = tabMode === "text" ? textResult.output : fileBase64;

    const inBytes = new TextEncoder().encode(inputStr).length;
    const outBytes = new TextEncoder().encode(outputStr).length;
    const ratio = inBytes > 0 ? ((outBytes - inBytes) / inBytes) * 100 : 0;
    const lines = outputStr ? outputStr.split("\n").length : 0;

    return {
      inputBytes: inBytes,
      outputBytes: outBytes,
      inputChars: inputStr.length,
      outputChars: outputStr.length,
      expansionRatio: parseFloat(ratio.toFixed(2)),
      lineCount: lines,
    };
  }, [inputText, textResult.output, selectedFile, fileBase64, tabMode]);

  // File Upload Processor
  const processFile = useCallback((file: File) => {
    setSelectedFile(file);
    setFileLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setFileBase64(result);
      }
      setFileLoading(false);
    };

    reader.onerror = () => {
      setFileLoading(false);
    };

    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Formatted File Output — responds to variant (standard vs urlsafe)
  const formattedFileOutput = useMemo(() => {
    if (!fileBase64 || !selectedFile) return "";
    const mime = selectedFile.type || "application/octet-stream";
    let rawB64 = fileBase64.includes(",") ? fileBase64.split(",")[1] : fileBase64;

    if (variant === "urlsafe") {
      rawB64 = rawB64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }

    const uri = `data:${mime};base64,${rawB64}`;

    switch (fileOutputType) {
      case "dataUri":
        return uri;
      case "raw":
        return rawB64;
      case "htmlImg":
        return `<img src="${uri}" alt="${selectedFile.name}" />`;
      case "cssBg":
        return `background-image: url("${uri}");`;
      default:
        return uri;
    }
  }, [fileBase64, selectedFile, fileOutputType, variant]);

  // Toolbar Actions
  const handleCopy = (textToCopy: string) => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    if (textResult.output && !textResult.error) {
      setInputText(textResult.output);
      setOpMode((prev) => (prev === "encode" ? "decode" : "encode"));
    }
  };

  const handleDownload = (content: string, filename: string) => {
    if (!content) return;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInputText("");
    setSelectedFile(null);
    setFileBase64("");
  };

  const handleLoadSample = () => {
    const random = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setInputText(random);
    setOpMode("encode");
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP MODE TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-2xl shadow-xs">
        {/* Tab Switcher: Text Convert vs File to Base64 */}
        <div className="flex items-center gap-1.5 bg-zinc-100/80 dark:bg-zinc-800/80 p-1 rounded-xl">
          <button
            onClick={() => setTabMode("text")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              tabMode === "text"
                ? "bg-blue-600 text-white shadow-sm scale-[1.02]"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-700/50"
            }`}
          >
            <FileText className="h-3.5 w-3.5" /> Text Convert
          </button>
          <button
            onClick={() => setTabMode("file")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              tabMode === "file"
                ? "bg-blue-600 text-white shadow-sm scale-[1.02]"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-700/50"
            }`}
          >
            <Upload className="h-3.5 w-3.5" /> File to Base64 (Data URI)
          </button>
        </div>

        {/* Global Controls Group */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Operation Segmented Pill: Encode vs Decode */}
          {tabMode === "text" && (
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200/70 dark:border-zinc-700/70">
              <button
                onClick={() => setOpMode("encode")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  opMode === "encode"
                    ? "bg-blue-600 text-white shadow-sm scale-[1.02]"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                <Zap className="h-3.5 w-3.5" /> Encode
              </button>
              <button
                onClick={() => setOpMode("decode")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  opMode === "decode"
                    ? "bg-indigo-600 text-white shadow-sm scale-[1.02]"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                <Code className="h-3.5 w-3.5" /> Decode
              </button>
            </div>
          )}

          {/* Variant Toggle: Standard vs RFC 4648 URL-Safe */}
          <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200/70 dark:border-zinc-700/70">
            <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 pl-1.5 flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 text-blue-500" /> Variant:
            </span>
            <button
              onClick={() => setVariant("standard")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                variant === "standard"
                  ? "bg-blue-600 text-white shadow-sm scale-[1.02]"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              <span>Standard</span>
              <span className={`px-1.5 py-0.2 text-[10px] font-sans tabular-nums rounded ${variant === "standard" ? "bg-blue-700 text-white" : "bg-zinc-200 dark:bg-zinc-700 text-slate-800 dark:text-slate-200 font-semibold"}`}>
                + /
              </span>
            </button>
            <button
              onClick={() => setVariant("urlsafe")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                variant === "urlsafe"
                  ? "bg-purple-600 text-white shadow-sm scale-[1.02]"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              <span>URL-Safe</span>
              <span className={`px-1.5 py-0.2 text-[10px] font-sans tabular-nums rounded ${variant === "urlsafe" ? "bg-purple-700 text-white" : "bg-zinc-200 dark:bg-zinc-700 text-slate-800 dark:text-slate-200 font-semibold"}`}>
                - _
              </span>
            </button>
          </div>

          {/* Charset Selector */}
          <div className="flex items-center gap-1.5">
            <select
              value={charset}
              onChange={(e) => setCharset(e.target.value as any)}
              className="h-9 text-xs font-bold px-3 py-1.5 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xs hover:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
            >
              <option value="UTF-8">UTF-8 (Unicode / Emojis)</option>
              <option value="ASCII">ASCII</option>
              <option value="Latin-1">Latin-1 (ISO-8859-1)</option>
              <option value="UTF-16">UTF-16</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. DUAL-PANE TEXT CONVERT MODE */}
      {tabMode === "text" && (
        <div className="space-y-4">
          {/* Quick Options Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-zinc-50 dark:bg-zinc-800/40 p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chunk76}
                  onChange={(e) => setChunk76(e.target.checked)}
                  className="rounded text-blue-600 accent-blue-600 cursor-pointer"
                />
                <span>Chunk output at 76 chars (MIME RFC 2045)</span>
              </label>
              <label className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lineByLine}
                  onChange={(e) => setLineByLine(e.target.checked)}
                  className="rounded text-blue-600 accent-blue-600 cursor-pointer"
                />
                <span>Process each line independently</span>
              </label>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleLoadSample}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/50 cursor-pointer"
              >
                <Sparkles className="h-3 w-3" /> Load Sample
              </button>
              <button
                onClick={handleClear}
                className="text-[11px] font-medium text-zinc-400 hover:text-red-500 flex items-center gap-1 px-2 py-1 cursor-pointer"
              >
                <Trash2 className="h-3 w-3" /> Clear
              </button>
            </div>
          </div>

          {/* Dual-Pane Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Pane: Input Text Box (Col 6) */}
            <div className="lg:col-span-6 space-y-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs flex flex-col">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-blue-600" />
                  <span>{opMode === "encode" ? "Raw Input Text" : "Base64 Input String"}</span>
                </label>
                <span className="text-[10px] font-sans tabular-nums text-zinc-400">
                  {analytics.inputChars} chars | {analytics.inputBytes} B
                </span>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={opMode === "encode" ? "Type or paste text to encode..." : "Paste Base64 string to decode..."}
                rows={10}
                className="w-full flex-1 p-3 text-xs font-sans tabular-nums bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 resize-y"
              />
            </div>

            {/* Right Pane: Dynamic Output Box (Col 6) */}
            <div className="lg:col-span-6 space-y-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs flex flex-col">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                  <Code className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{opMode === "encode" ? "Encoded Base64 Output" : "Decoded Plaintext Output"}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    variant === "standard"
                      ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                      : "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300"
                  }`}>
                    {variant === "standard" ? "Standard (+ /)" : "URL-Safe (- _)"}
                  </span>
                </label>
                <span className="text-[10px] font-sans tabular-nums text-zinc-400">
                  {analytics.outputChars} chars | {analytics.outputBytes} B
                </span>
              </div>

              {textResult.error ? (
                <div className="flex-1 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-bold">
                    <AlertTriangle className="h-4 w-4 shrink-0" /> Error Decoding Base64
                  </div>
                  <p className="text-rose-600 dark:text-rose-300 text-[11px] leading-relaxed">
                    {textResult.error}
                  </p>
                </div>
              ) : (
                <textarea
                  readOnly
                  value={textResult.output}
                  placeholder="Output will appear dynamically..."
                  rows={10}
                  className="w-full flex-1 p-3 text-xs font-sans tabular-nums bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none resize-y text-emerald-700 dark:text-emerald-400"
                />
              )}

              {/* Action Toolbar for Output */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-1.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(textResult.output)}
                    disabled={!textResult.output || !!textResult.error}
                    className="h-7 text-xs gap-1 border-zinc-200 dark:border-zinc-700 cursor-pointer"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy Output"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleSwap}
                    disabled={!textResult.output || !!textResult.error}
                    className="h-7 text-xs gap-1 border-zinc-200 dark:border-zinc-700 cursor-pointer"
                  >
                    <ArrowRightLeft className="h-3.5 w-3.5 text-blue-500" /> Swap
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(textResult.output, opMode === "encode" ? "encoded.txt" : "decoded.txt")}
                    disabled={!textResult.output || !!textResult.error}
                    className="h-7 text-xs gap-1 border-zinc-200 dark:border-zinc-700 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" /> Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. FILE TO BASE64 DATA URI MODE */}
      {tabMode === "file" && (
        <div className="space-y-5">
          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-blue-300 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 rounded-2xl p-8 text-center cursor-pointer hover:bg-blue-50/80 transition-all space-y-3"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <Upload className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                {selectedFile ? `Selected File: ${selectedFile.name}` : "Drag & Drop Any File Here"}
              </h3>
              <p className="text-xs text-zinc-500">
                Supports Images (PNG, JPG, SVG, WebP), PDFs, Audio, or raw binary assets. Client-side conversion.
              </p>
            </div>
          </div>

          {/* File Output Options & Display */}
          {selectedFile && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-purple-600" />
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    File Details: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </span>
                </div>

                {/* Output Format Picker */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[10px] text-zinc-400 font-bold">Output Format:</span>
                  <button
                    onClick={() => setFileOutputType("dataUri")}
                    className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer ${
                      fileOutputType === "dataUri" ? "bg-blue-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600"
                    }`}
                  >
                    Data URI
                  </button>
                  <button
                    onClick={() => setFileOutputType("raw")}
                    className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer ${
                      fileOutputType === "raw" ? "bg-blue-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600"
                    }`}
                  >
                    Raw Base64
                  </button>
                  <button
                    onClick={() => setFileOutputType("htmlImg")}
                    className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer ${
                      fileOutputType === "htmlImg" ? "bg-blue-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600"
                    }`}
                  >
                    HTML &lt;img&gt;
                  </button>
                  <button
                    onClick={() => setFileOutputType("cssBg")}
                    className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer ${
                      fileOutputType === "cssBg" ? "bg-blue-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600"
                    }`}
                  >
                    CSS Background
                  </button>
                </div>
              </div>

              <textarea
                readOnly
                value={formattedFileOutput}
                rows={8}
                className="w-full p-3 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none text-purple-700 dark:text-purple-400"
              />

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(formattedFileOutput)}
                  className="h-8 text-xs gap-1 border-zinc-200 dark:border-zinc-700 cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy Asset Snippet"}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. REAL-TIME DATA ANALYTICS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] text-zinc-400 font-bold block uppercase">Input Size</span>
          <span className="text-base font-black font-sans tabular-nums text-zinc-900 dark:text-zinc-100 block">
            {analytics.inputBytes} Bytes
          </span>
          <span className="text-[10px] text-zinc-400">{analytics.inputChars} characters</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] text-zinc-400 font-bold block uppercase">Encoded Size</span>
          <span className="text-base font-black font-sans tabular-nums text-blue-600 block">
            {analytics.outputBytes} Bytes
          </span>
          <span className="text-[10px] text-zinc-400">{analytics.outputChars} characters</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] text-zinc-400 font-bold block uppercase">Overhead Expansion Ratio</span>
          <span className={`text-base font-black font-sans tabular-nums block ${analytics.expansionRatio >= 0 ? "text-amber-600" : "text-emerald-600"}`}>
            {analytics.expansionRatio >= 0 ? `+${analytics.expansionRatio}%` : `${analytics.expansionRatio}%`}
          </span>
          <span className="text-[10px] text-zinc-400">Standard 4:3 size bloat</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] text-zinc-400 font-bold block uppercase">Line Breakdown</span>
          <span className="text-base font-black font-sans tabular-nums text-purple-600 block">
            {analytics.lineCount} {analytics.lineCount === 1 ? "Line" : "Lines"}
          </span>
          <span className="text-[10px] text-zinc-400">{chunk76 ? "MIME 76-char chunked" : "Continuous stream"}</span>
        </div>
      </div>
    </div>
  );
}
