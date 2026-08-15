"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Lock, 
  Settings, 
  RefreshCw, 
  Copy, 
  Share2, 
  Printer, 
  Save, 
  Trash2, 
  Bookmark, 
  Info, 
  AlertTriangle,
  Eye,
  EyeOff,
  Clipboard,
  ShieldCheck,
  CheckCircle,
  FileText,
  Check
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { calculatePasswordGenerator } from "@/app/calculators/password-generator/calculator";
import { PasswordGeneratorInputs, PasswordGeneratorOutputs } from "@/app/calculators/password-generator/types";

// Word pool size for passphrases
const WORD_LIST_LENGTH = 96;

export function PasswordGenerator() {
  const [activeTab, setActiveTab] = useState<string>("random");
  
  // Tab 1: Random Password States
  const [length, setLength] = useState<number>(16);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [customSymbols, setCustomSymbols] = useState<string>("!@#$%^&*()_+-=[]{};:,.<>?");
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(false);
  const [excludeBrackets, setExcludeBrackets] = useState<boolean>(false);
  const [customExclusions, setCustomExclusions] = useState<string>("");
  const [noRepeat, setNoRepeat] = useState<boolean>(false);
  const [requireAll, setRequireAll] = useState<boolean>(true);
  const [bulkCount, setBulkCount] = useState<number>(1); // 1 = single, > 1 = bulk

  // Tab 2: Passphrase States
  const [wordCount, setWordCount] = useState<number>(4);
  const [separator, setSeparator] = useState<string>("-");
  const [capitalize, setCapitalize] = useState<boolean>(true);
  const [passphraseIncludeNum, setPassphraseIncludeNum] = useState<boolean>(false);
  const [passphraseIncludeSym, setPassphraseIncludeSym] = useState<boolean>(false);

  // Tab 3: PIN States
  const [pinLength, setPinLength] = useState<number>(6);

  // Tab 4: Strength Checker States
  const [checkPassword, setCheckPassword] = useState<string>("");

  // Common/Global UI States
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [customOutputs, setCustomOutputs] = useState<PasswordGeneratorOutputs | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [showSaveWarning, setShowSaveWarning] = useState<boolean>(false);
  const [savedRecords, setSavedRecords] = useState<any[]>([]);
  const [bulkGeneratedList, setBulkGeneratedList] = useState<string[]>([]);
  const [revealForPrint, setRevealForPrint] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Load configuration settings & saved passwords from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedConfig = localStorage.getItem("pwd_generator_settings");
      if (savedConfig) {
        const conf = JSON.parse(savedConfig);
        if (conf.activeTab) setActiveTab(conf.activeTab);
        if (conf.length) setLength(conf.length);
        if (conf.includeLower !== undefined) setIncludeLower(conf.includeLower);
        if (conf.includeUpper !== undefined) setIncludeUpper(conf.includeUpper);
        if (conf.includeNumbers !== undefined) setIncludeNumbers(conf.includeNumbers);
        if (conf.includeSymbols !== undefined) setIncludeSymbols(conf.includeSymbols);
        if (conf.customSymbols) setCustomSymbols(conf.customSymbols);
        if (conf.excludeAmbiguous !== undefined) setExcludeAmbiguous(conf.excludeAmbiguous);
        if (conf.excludeBrackets !== undefined) setExcludeBrackets(conf.excludeBrackets);
        if (conf.customExclusions) setCustomExclusions(conf.customExclusions);
        if (conf.noRepeat !== undefined) setNoRepeat(conf.noRepeat);
        if (conf.requireAll !== undefined) setRequireAll(conf.requireAll);
        if (conf.wordCount) setWordCount(conf.wordCount);
        if (conf.separator) setSeparator(conf.separator);
        if (conf.capitalize !== undefined) setCapitalize(conf.capitalize);
        if (conf.pinLength) setPinLength(conf.pinLength);
      }

      const records = localStorage.getItem("pwd_saved_records");
      if (records) {
        setSavedRecords(JSON.parse(records));
      }
    } catch (e) {
      console.warn("Could not read localStorage configurations.");
    }
  }, []);

  // Save Settings to Local Storage
  const handleSaveSettings = () => {
    try {
      const settings = {
        activeTab,
        length,
        includeLower,
        includeUpper,
        includeNumbers,
        includeSymbols,
        customSymbols,
        excludeAmbiguous,
        excludeBrackets,
        customExclusions,
        noRepeat,
        requireAll,
        wordCount,
        separator,
        capitalize,
        pinLength
      };
      localStorage.setItem("pwd_generator_settings", JSON.stringify(settings));
      setSaveSuccess("Settings saved successfully!");
      setTimeout(() => setSaveSuccess(null), 3000);
    } catch (e) {
      setSaveSuccess("Failed to save settings.");
    }
  };

  // Compile calculations
  const outputs = useMemo(() => {
    if (activeTab === "strength_checker") {
      return calculatePasswordGenerator({
        activeTab,
        checkPassword
      });
    }

    if (activeTab === "pin") {
      return calculatePasswordGenerator({
        activeTab,
        pinLength
      });
    }

    if (activeTab === "passphrase") {
      return calculatePasswordGenerator({
        activeTab,
        wordCount,
        separator,
        capitalize,
        passphraseIncludeNumber: passphraseIncludeNum,
        passphraseIncludeSymbol: passphraseIncludeSym
      });
    }

    // Default Random tab
    return calculatePasswordGenerator({
      activeTab,
      length,
      includeLowercase: includeLower,
      includeUppercase: includeUpper,
      includeNumbers,
      includeSymbols,
      customSymbols,
      excludeAmbiguous,
      excludeBrackets,
      customExclusions,
      noRepeat,
      requireAllCategories: requireAll
    });
  }, [
    activeTab,
    length,
    includeLower,
    includeUpper,
    includeNumbers,
    includeSymbols,
    customSymbols,
    excludeAmbiguous,
    excludeBrackets,
    customExclusions,
    noRepeat,
    requireAll,
    wordCount,
    separator,
    capitalize,
    passphraseIncludeNum,
    passphraseIncludeSym,
    pinLength,
    checkPassword
  ]);

  // Bulk Generator loop trigger
  const handleRegenerateBulk = () => {
    if (bulkCount <= 1) {
      setBulkGeneratedList([]);
      return;
    }
    const list = [];
    for (let i = 0; i < bulkCount; i++) {
      const res = calculatePasswordGenerator({
        activeTab: "random",
        length,
        includeLowercase: includeLower,
        includeUppercase: includeUpper,
        includeNumbers,
        includeSymbols,
        customSymbols,
        excludeAmbiguous,
        excludeBrackets,
        customExclusions,
        noRepeat,
        requireAllCategories: requireAll
      });
      if (res.generatedPassword) {
        list.push(res.generatedPassword);
      }
    }
    setBulkGeneratedList(list);
  };

  // Regenerate single trigger
  const handleRegenerate = () => {
    setShowPassword(true);
    if (bulkCount > 1 && activeTab === "random") {
      handleRegenerateBulk();
      return;
    }

    // Trigger state recalculation by forcing a slight parameter refresh
    if (activeTab === "random") {
      setLength(l => l);
      // Trigger dummy reload
      setCustomOutputs(null);
    } else if (activeTab === "passphrase") {
      setWordCount(w => w);
    } else if (activeTab === "pin") {
      setPinLength(p => p);
    }
  };

  useEffect(() => {
    if (bulkCount > 1 && activeTab === "random") {
      handleRegenerateBulk();
    } else {
      setBulkGeneratedList([]);
    }
  }, [bulkCount, length, includeLower, includeUpper, includeNumbers, includeSymbols, activeTab]);

  // Copy Clipboard Helper
  const handleCopy = (txt: string) => {
    if (!txt) return;
    navigator.clipboard.writeText(txt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCopyAll = () => {
    if (bulkGeneratedList.length === 0) return;
    navigator.clipboard.writeText(bulkGeneratedList.join("\n")).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    });
  };

  // Save Plaintext Password trigger (requires explicit warning validation)
  const handleSavePasswordClick = () => {
    setShowSaveWarning(true);
  };

  const confirmSavePassword = () => {
    setShowSaveWarning(false);
    const passValue = outputs.generatedPassword;
    if (!passValue) return;

    try {
      const newRecord = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString(),
        mode: activeTab,
        strength: outputs.strengthCategory,
        entropy: outputs.entropyBits,
        length: passValue.length,
        password: passValue
      };

      const updated = [newRecord, ...savedRecords].slice(0, 20); // Keep max 20 records
      setSavedRecords(updated);
      localStorage.setItem("pwd_saved_records", JSON.stringify(updated));
      setSaveSuccess("Password bookmarked locally!");
      setTimeout(() => setSaveSuccess(null), 3000);
    } catch (e) {
      setSaveSuccess("Bookmark storage failed.");
    }
  };

  // Delete saved records
  const handleDeleteRecord = (id: string) => {
    const updated = savedRecords.filter(r => r.id !== id);
    setSavedRecords(updated);
    try {
      localStorage.setItem("pwd_saved_records", JSON.stringify(updated));
    } catch (e) {}
  };

  // Preset Configurations Handler
  const handleApplyPreset = (presetType: string) => {
    if (presetType === "basic") {
      setLength(12);
      setIncludeLower(true);
      setIncludeUpper(true);
      setIncludeNumbers(true);
      setIncludeSymbols(false);
      setNoRepeat(false);
      setRequireAll(true);
    } else if (presetType === "strong") {
      setLength(16);
      setIncludeLower(true);
      setIncludeUpper(true);
      setIncludeNumbers(true);
      setIncludeSymbols(true);
      setNoRepeat(false);
      setRequireAll(true);
    } else if (presetType === "high_sec") {
      setLength(24);
      setIncludeLower(true);
      setIncludeUpper(true);
      setIncludeNumbers(true);
      setIncludeSymbols(true);
      setNoRepeat(false);
      setRequireAll(true);
    } else if (presetType === "maximum") {
      setLength(32);
      setIncludeLower(true);
      setIncludeUpper(true);
      setIncludeNumbers(true);
      setIncludeSymbols(true);
      setNoRepeat(false);
      setRequireAll(true);
    }
    setBulkCount(1);
  };

  // Native Web Share settings (no password strings inside query paths!)
  const handleShare = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?tab=${activeTab}&len=${length}&num=${includeNumbers ? 1 : 0}&sym=${includeSymbols ? 1 : 0}`;
    
    if (navigator.share) {
      navigator.share({
        title: "Strong Password Settings Configuration",
        text: `Check out these secure password configuration settings: Length ${length}, Numbers: ${includeNumbers ? "Yes" : "No"}`,
        url: shareUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setSaveSuccess("Share URL copied to clipboard! (Plaintext password excluded for safety)");
        setTimeout(() => setSaveSuccess(null), 4000);
      });
    }
  };

  // Print PDF trigger
  const handlePrint = () => {
    window.print();
  };

  // Reset calculations
  const handleReset = () => {
    setLength(16);
    setIncludeLower(true);
    setIncludeUpper(true);
    setIncludeNumbers(true);
    setIncludeSymbols(true);
    setCustomSymbols("!@#$%^&*()_+-=[]{};:,.<>?");
    setExcludeAmbiguous(false);
    setExcludeBrackets(false);
    setCustomExclusions("");
    setNoRepeat(false);
    setRequireAll(true);
    setBulkCount(1);
    setWordCount(4);
    setSeparator("-");
    setCapitalize(true);
    setPassphraseIncludeNum(false);
    setPassphraseIncludeSym(false);
    setPinLength(6);
    setCheckPassword("");
    setBulkGeneratedList([]);
    setRevealForPrint(false);
  };

  // Render Visual Strength level
  const strengthColor = useMemo(() => {
    const s = outputs.strengthCategory;
    if (s === "Very Strong") return "bg-emerald-600 text-emerald-600";
    if (s === "Strong") return "bg-green-500 text-green-500";
    if (s === "Fair") return "bg-amber-500 text-amber-500";
    if (s === "Weak") return "bg-orange-500 text-orange-500";
    return "bg-rose-600 text-rose-600";
  }, [outputs.strengthCategory]);

  const strengthPercentage = useMemo(() => {
    const s = outputs.strengthCategory;
    if (s === "Very Strong") return 100;
    if (s === "Strong") return 80;
    if (s === "Fair") return 60;
    if (s === "Weak") return 40;
    return 20;
  }, [outputs.strengthCategory]);

  return (
    <div className="w-full space-y-6">
      
      {/* 1. TOP HEADER SUMMARY */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm print:hidden">
        <div>
          <h1 className="text-xl font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" />
            Password Generator & Analyzer Suite
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Construct high-entropy credentials or inspect password policies locally using window.crypto CSPRNG.
          </p>
        </div>
        
        <button
          onClick={handleReset}
          className="px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer"
          title="Reset options to defaults"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* ALERT BANNERS */}
      {saveSuccess && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2 print:hidden animate-fade-in">
          <CheckCircle className="w-4 h-4" />
          {saveSuccess}
        </div>
      )}

      {/* 2. PASSWORD OUTPUT PANEL */}
      {activeTab !== "strength_checker" && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-900 dark:to-zinc-950 p-6 rounded-2xl border border-blue-100 dark:border-zinc-800 shadow-sm relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-2 font-mono text-[9px] text-zinc-400 uppercase tracking-widest pointer-events-none select-none">
            CSPRNG Source
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
              {bulkCount > 1 ? "Bulk Generated Passwords" : "Generated Password"}
            </label>

            {bulkCount > 1 ? (
              <div className="space-y-2 mt-2">
                <div className="max-h-40 overflow-y-auto bg-white dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-800 dark:text-zinc-200 space-y-1">
                  {bulkGeneratedList.map((pwd, i) => (
                    <div key={i} className="flex justify-between border-b dark:border-zinc-800 py-1">
                      <span>{pwd}</span>
                      <button 
                        onClick={() => handleCopy(pwd)} 
                        className="text-[10px] text-blue-600 hover:underline"
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyAll}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                  >
                    <Clipboard className="w-3.5 h-3.5" />
                    {copiedAll ? "Copied All!" : "Copy All"}
                  </button>
                  <button
                    onClick={handleRegenerate}
                    className="px-3 py-1.5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 text-xs font-bold rounded-lg flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                    Regenerate All
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mt-1.5">
                <div className="flex-1 min-w-[200px] relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={outputs.generatedPassword || ""}
                    readOnly
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 px-4 py-3 rounded-xl font-mono text-base tracking-wide text-zinc-900 dark:text-zinc-100 shadow-inner focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 cursor-pointer"
                    title={showPassword ? "Hide password string" : "Reveal password string"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(outputs.generatedPassword || "")}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-md active:scale-95 whitespace-nowrap cursor-pointer shrink-0 text-xs"
                  title="Copy password value"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleRegenerate}
                  className="px-3.5 py-3 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0"
                  title="Regenerate random password value"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Regenerate</span>
                </button>
              </div>
            )}
          </div>

          {/* STRENGTH PROGRESS BAR AND ENTROPY METRICS */}
          {bulkCount === 1 && (
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-blue-100/50 dark:border-zinc-800/80 pt-4">
              
              <div className="flex-1 space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-zinc-500">Security Strength Rating:</span>
                  <span className={`font-black ${strengthColor.split(" ")[1]}`}>
                    {outputs.strengthCategory}
                  </span>
                </div>
                <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${strengthColor.split(" ")[0]} transition-all duration-500`}
                    style={{ width: `${strengthPercentage}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-4 text-xs font-mono">
                <div className="bg-white dark:bg-zinc-900/40 px-3 py-1.5 rounded-lg border dark:border-zinc-800">
                  <span className="text-zinc-400">Entropy:</span>{" "}
                  <strong className="text-zinc-800 dark:text-zinc-200">{outputs.entropyBits} bits</strong>
                </div>
                <div className="bg-white dark:bg-zinc-900/40 px-3 py-1.5 rounded-lg border dark:border-zinc-800">
                  <span className="text-zinc-400">Search Space:</span>{" "}
                  <strong className="text-zinc-800 dark:text-zinc-200">{outputs.combinationsCountString}</strong>
                </div>
              </div>

            </div>
          )}

          {/* UNIFIED ACTION BAR: Copy, Save, Share, Print */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-4 border-t border-zinc-200 dark:border-zinc-800 no-print">
            <button
              type="button"
              onClick={() => handleCopy(outputs.generatedPassword || "")}
              className="text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />}
              <span>{copied ? "Copied!" : "Copy Result"}</span>
            </button>

            <button
              type="button"
              onClick={handleSavePasswordClick}
              className="text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Bookmark className="w-4 h-4 text-amber-500" />
              <span>Save</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Share2 className="w-4 h-4 text-blue-500" />
              <span>Share Link</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Printer className="w-4 h-4 text-purple-500" />
              <span>Print Report</span>
            </button>
          </div>

        </div>
      )}

      {/* EXPLICIT DIALOG WARNING FOR SAVING PASSWORD */}
      {showSaveWarning && (
        <div className="p-4 border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl space-y-3 print:hidden">
          <p className="flex items-center gap-1.5 text-rose-800 dark:text-rose-400 font-black text-xs">
            <AlertTriangle className="w-4 h-4" /> Plaintext Password Storage Warning
          </p>
          <p className="text-xs text-rose-700 dark:text-rose-400">
            Passwords are highly sensitive credentials. Saving plaintext passwords in local browser storage exposes them to potential risks if your device is unencrypted or accessed by unauthorized users. Bookmark only if you understand the security implications.
          </p>
          <div className="flex gap-2">
            <button
              onClick={confirmSavePassword}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-all"
            >
              I Understand, Save Bookmark
            </button>
            <button
              onClick={() => setShowSaveWarning(false)}
              className="px-3 py-1.5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 text-xs font-bold rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* 3. TABS SELECTOR PANEL */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 print:hidden">
        <button
          onClick={() => { setActiveTab("random"); setBulkCount(1); }}
          className={`flex-1 py-3 text-xs font-black border-b-2 transition-all ${
            activeTab === "random"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          Random Password
        </button>
        <button
          onClick={() => { setActiveTab("passphrase"); setBulkCount(1); }}
          className={`flex-1 py-3 text-xs font-black border-b-2 transition-all ${
            activeTab === "passphrase"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          Word Passphrase
        </button>
        <button
          onClick={() => { setActiveTab("pin"); setBulkCount(1); }}
          className={`flex-1 py-3 text-xs font-black border-b-2 transition-all ${
            activeTab === "pin"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          Secure PIN
        </button>
        <button
          onClick={() => { setActiveTab("strength_checker"); setBulkCount(1); }}
          className={`flex-1 py-3 text-xs font-black border-b-2 transition-all ${
            activeTab === "strength_checker"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          Strength Checker
        </button>
      </div>

      {/* 4. PARAMETERS INPUT PANEL */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm print:hidden">
        
        {/* TAB 1: RANDOM PASSWORD */}
        {activeTab === "random" && (
          <div className="space-y-6">
            
            {/* Presets Row */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Policy Presets:</span>
              <button
                onClick={() => handleApplyPreset("basic")}
                className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold rounded-md"
              >
                Basic Website (12 chars)
              </button>
              <button
                onClick={() => handleApplyPreset("strong")}
                className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold rounded-md"
              >
                Strong (16 chars)
              </button>
              <button
                onClick={() => handleApplyPreset("high_sec")}
                className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold rounded-md"
              >
                High Security (24 chars)
              </button>
              <button
                onClick={() => handleApplyPreset("maximum")}
                className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold rounded-md"
              >
                Maximum Policy (32 chars)
              </button>
            </div>

            {/* Slider controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-zinc-700 dark:text-zinc-300">Password Length:</span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono text-sm">{length} characters</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="128"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-zinc-700 dark:text-zinc-300">Generate Multiple (Bulk):</span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono text-sm">{bulkCount} passwords</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={bulkCount}
                  onChange={(e) => setBulkCount(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

            </div>

            {/* Checkbox matrices */}
            <div className="border-t dark:border-zinc-800 pt-4">
              <span className="text-[11px] font-black text-zinc-400 uppercase tracking-wider">Character Categories & Pools:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
                <label className="flex items-center gap-2 cursor-pointer p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border dark:border-zinc-800 hover:bg-zinc-100/50">
                  <input
                    type="checkbox"
                    checked={includeLower}
                    onChange={(e) => setIncludeLower(e.target.checked)}
                    className="rounded text-blue-600 accent-blue-600 w-4 h-4"
                  />
                  <div>
                    <div className="text-xs font-bold">Lowercase</div>
                    <div className="text-[10px] text-zinc-400 font-mono">a-z</div>
                  </div>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border dark:border-zinc-800 hover:bg-zinc-100/50">
                  <input
                    type="checkbox"
                    checked={includeUpper}
                    onChange={(e) => setIncludeUpper(e.target.checked)}
                    className="rounded text-blue-600 accent-blue-600 w-4 h-4"
                  />
                  <div>
                    <div className="text-xs font-bold">Uppercase</div>
                    <div className="text-[10px] text-zinc-400 font-mono">A-Z</div>
                  </div>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border dark:border-zinc-800 hover:bg-zinc-100/50">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="rounded text-blue-600 accent-blue-600 w-4 h-4"
                  />
                  <div>
                    <div className="text-xs font-bold">Numbers</div>
                    <div className="text-[10px] text-zinc-400 font-mono">0-9</div>
                  </div>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border dark:border-zinc-800 hover:bg-zinc-100/50">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    className="rounded text-blue-600 accent-blue-600 w-4 h-4"
                  />
                  <div>
                    <div className="text-xs font-bold">Symbols</div>
                    <div className="text-[10px] text-zinc-400 font-mono">Special</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Custom Symbols Configuration */}
            {includeSymbols && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Custom Symbols Pool:</label>
                <Input
                  value={customSymbols}
                  onChange={(e) => setCustomSymbols(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>
            )}

            {/* Exclusions Parameters & Unique logic */}
            <div className="border-t dark:border-zinc-800 pt-4 space-y-4">
              <span className="text-[11px] font-black text-zinc-400 uppercase tracking-wider">Advanced Exclusions & Constraints:</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <label className="flex items-center gap-2 cursor-pointer p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border dark:border-zinc-800 hover:bg-zinc-100/50">
                  <input
                    type="checkbox"
                    checked={excludeAmbiguous}
                    onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                    className="rounded text-blue-600 accent-blue-600 w-4 h-4"
                  />
                  <div>
                    <div className="text-xs font-bold">Exclude Ambiguous</div>
                    <div className="text-[9px] text-rose-500 font-mono">Excludes i,l,1,o,0,O,I</div>
                  </div>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border dark:border-zinc-800 hover:bg-zinc-100/50">
                  <input
                    type="checkbox"
                    checked={excludeBrackets}
                    onChange={(e) => setExcludeBrackets(e.target.checked)}
                    className="rounded text-blue-600 accent-blue-600 w-4 h-4"
                  />
                  <div>
                    <div className="text-xs font-bold">Exclude Brackets</div>
                    <div className="text-[9px] text-rose-500 font-mono">() [] {"{}"} &lt;&gt;</div>
                  </div>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border dark:border-zinc-800 hover:bg-zinc-100/50">
                  <input
                    type="checkbox"
                    checked={noRepeat}
                    onChange={(e) => setNoRepeat(e.target.checked)}
                    className="rounded text-blue-600 accent-blue-600 w-4 h-4"
                  />
                  <div>
                    <div className="text-xs font-bold">No Repeated Characters</div>
                    <div className="text-[9px] text-amber-600 font-mono">Unique characters only</div>
                  </div>
                </label>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Custom Characters to Exclude:</label>
                  <Input
                    value={customExclusions}
                    onChange={(e) => setCustomExclusions(e.target.value)}
                    placeholder='Example: " \ &apos; ` /'
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border dark:border-zinc-800 hover:bg-zinc-100/50 h-[40px]">
                    <input
                      type="checkbox"
                      checked={requireAll}
                      onChange={(e) => setRequireAll(e.target.checked)}
                      className="rounded text-blue-600 accent-blue-600 w-4 h-4"
                    />
                    <div className="text-xs font-bold">Require 1+ character from each selected category</div>
                  </label>
                </div>
              </div>

            </div>

            {/* Generate & Save Settings Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t dark:border-zinc-800">
              <button
                type="button"
                onClick={handleRegenerate}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Generate Password</span>
              </button>

              <button
                type="button"
                onClick={handleSaveSettings}
                className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Save Settings</span>
              </button>
            </div>

          </div>
        )}

        {/* TAB 2: PASSPHRASE */}
        {activeTab === "passphrase" && (
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-zinc-700 dark:text-zinc-300">Number of Words:</span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono text-sm">{wordCount} words</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={wordCount}
                  onChange={(e) => setWordCount(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Word Separator Character:</label>
                <Input
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                  placeholder="e.g. -, _, . or blank"
                  className="font-mono text-sm"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t dark:border-zinc-800">
              
              <label className="flex items-center gap-2 cursor-pointer p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border dark:border-zinc-800 hover:bg-zinc-100/50">
                <input
                  type="checkbox"
                  checked={capitalize}
                  onChange={(e) => setCapitalize(e.target.checked)}
                  className="rounded text-blue-600 accent-blue-600 w-4 h-4"
                />
                <div>
                  <div className="text-xs font-bold">Capitalize Words</div>
                  <div className="text-[9px] text-zinc-400 font-mono">Example: River-Cobalt</div>
                </div>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border dark:border-zinc-800 hover:bg-zinc-100/50">
                <input
                  type="checkbox"
                  checked={passphraseIncludeNum}
                  onChange={(e) => setPassphraseIncludeNum(e.target.checked)}
                  className="rounded text-blue-600 accent-blue-600 w-4 h-4"
                />
                <div>
                  <div className="text-xs font-bold">Append Random Number</div>
                  <div className="text-[9px] text-zinc-400 font-mono">Example: -7</div>
                </div>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border dark:border-zinc-800 hover:bg-zinc-100/50">
                <input
                  type="checkbox"
                  checked={passphraseIncludeSym}
                  onChange={(e) => setPassphraseIncludeSym(e.target.checked)}
                  className="rounded text-blue-600 accent-blue-600 w-4 h-4"
                />
                <div>
                  <div className="text-xs font-bold">Append Random Symbol</div>
                  <div className="text-[9px] text-zinc-400 font-mono">Example: -#</div>
                </div>
              </label>

            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/40 p-4 border dark:border-zinc-800 rounded-xl text-xs space-y-1">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">Word-list Details:</span>
              <p className="text-zinc-500">Choosing {wordCount} words from a list of {WORD_LIST_LENGTH} words yields {Math.pow(WORD_LIST_LENGTH, wordCount).toLocaleString()} combinations.</p>
            </div>

            {/* Generate Passphrase Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t dark:border-zinc-800">
              <button
                type="button"
                onClick={handleRegenerate}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Generate Passphrase</span>
              </button>

              <button
                type="button"
                onClick={handleSaveSettings}
                className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Save Settings</span>
              </button>
            </div>

          </div>
        )}

        {/* TAB 3: SECURE PIN */}
        {activeTab === "pin" && (
          <div className="space-y-6">
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-700 dark:text-zinc-300">PIN Code Length (Digits):</span>
                <span className="text-blue-600 dark:text-blue-400 font-mono text-sm">{pinLength} digits</span>
              </div>
              <input
                type="range"
                min="4"
                max="16"
                value={pinLength}
                onChange={(e) => setPinLength(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/40 p-4 border dark:border-zinc-800 rounded-xl text-xs space-y-1">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">Security Note:</span>
              <p className="text-zinc-500">A {pinLength}-digit PIN contains {Math.pow(10, pinLength).toLocaleString()} possible combinations. Longer PINs are significantly harder to guess.</p>
            </div>

            {/* Generate PIN Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t dark:border-zinc-800">
              <button
                type="button"
                onClick={handleRegenerate}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Generate PIN</span>
              </button>
            </div>

          </div>
        )}

        {/* TAB 4: STRENGTH CHECKER */}
        {activeTab === "strength_checker" && (
          <div className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Enter Password to Analyze:</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={checkPassword}
                  onChange={(e) => setCheckPassword(e.target.value)}
                  placeholder="Type a password..."
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-4 py-3 rounded-xl font-mono text-base tracking-wide text-zinc-900 dark:text-zinc-100 shadow-inner focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-zinc-400">
                🔒 Password analysis is processed entirely locally inside your browser. No external API transmissions are made.
              </p>
            </div>

            {checkPassword && (
              <div className="space-y-4 pt-4 border-t dark:border-zinc-800">
                
                {/* Visual strength rating */}
                <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border dark:border-zinc-800 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-zinc-500">Strength Category Assessment:</span>
                    <span className={`font-black ${strengthColor.split(" ")[1]}`}>
                      {outputs.strengthCategory}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${strengthColor.split(" ")[0]} transition-all duration-500`}
                      style={{ width: `${strengthPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Warnings List */}
                {outputs.warnings && outputs.warnings.length > 0 && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-900 rounded-xl space-y-1">
                    <span className="text-xs font-bold block">Security Warnings Detected:</span>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                      {outputs.warnings.map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Sizing details table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-lg border dark:border-zinc-800 text-center">
                    <div className="text-[10px] text-zinc-400 uppercase">Length</div>
                    <div className="text-base font-mono font-bold mt-1">{checkPassword.length}</div>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-lg border dark:border-zinc-800 text-center">
                    <div className="text-[10px] text-zinc-400 uppercase">Unique Characters</div>
                    <div className="text-base font-mono font-bold mt-1">{outputs.uniqueCount}</div>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-lg border dark:border-zinc-800 text-center">
                    <div className="text-[10px] text-zinc-400 uppercase">Entropy (Estimate)</div>
                    <div className="text-base font-mono font-bold mt-1">{outputs.entropyBits} bits</div>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-lg border dark:border-zinc-800 text-center">
                    <div className="text-[10px] text-zinc-400 uppercase">Search Pool Size</div>
                    <div className="text-base font-mono font-bold mt-1">{outputs.poolSize}</div>
                  </div>
                </div>

                {/* Character categories counts list */}
                <div className="p-4 border dark:border-zinc-800 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">Character Group Distribution:</span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="flex justify-between border-b dark:border-zinc-800 pb-1">
                      <span className="text-zinc-400">Lowercase letters:</span>
                      <span>{outputs.lowercaseCount}</span>
                    </div>
                    <div className="flex justify-between border-b dark:border-zinc-800 pb-1">
                      <span className="text-zinc-400">Uppercase letters:</span>
                      <span>{outputs.uppercaseCount}</span>
                    </div>
                    <div className="flex justify-between border-b dark:border-zinc-800 pb-1">
                      <span className="text-zinc-400">Numbers:</span>
                      <span>{outputs.numbersCount}</span>
                    </div>
                    <div className="flex justify-between border-b dark:border-zinc-800 pb-1">
                      <span className="text-zinc-400">Special symbols:</span>
                      <span>{outputs.symbolsCount}</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* Error reporting banner */}
        {outputs.error && (
          <div className="mt-4 p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-400 border border-rose-200 dark:border-rose-900 rounded-xl text-xs font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {outputs.error}
          </div>
        )}

      </div>

      {/* 5. SEARCHABLE SYMBOLS POOL DETAILS & EXPLANATION */}
      {activeTab === "random" && (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm print:hidden">
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600" />
            Character Pool Details
          </h3>
          <div className="mt-4 overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b dark:border-zinc-800 text-zinc-400">
                  <th className="py-2">Category Set</th>
                  <th className="py-2">Standard Pool</th>
                  <th className="py-2 text-right">Standard Size</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-zinc-800 font-mono text-zinc-600 dark:text-zinc-400">
                <tr>
                  <td className="py-2 font-sans font-bold">Lowercase</td>
                  <td className="py-2">a-z (abcdefghijklmnopqrstuvwxyz)</td>
                  <td className="py-2 text-right">26</td>
                </tr>
                <tr>
                  <td className="py-2 font-sans font-bold">Uppercase</td>
                  <td className="py-2">A-Z (ABCDEFGHIJKLMNOPQRSTUVWXYZ)</td>
                  <td className="py-2 text-right">26</td>
                </tr>
                <tr>
                  <td className="py-2 font-sans font-bold">Numbers</td>
                  <td className="py-2">0-9 (0123456789)</td>
                  <td className="py-2 text-right">10</td>
                </tr>
                <tr>
                  <td className="py-2 font-sans font-bold">Symbols</td>
                  <td className="py-2">{customSymbols}</td>
                  <td className="py-2 text-right">{customSymbols.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. LOCAL SAVED BOOKMARKS HISTORY */}
      {savedRecords.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm print:hidden">
          <div className="flex justify-between items-center border-b dark:border-zinc-800 pb-3">
            <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-blue-600" />
              Saved Local Passwords Bookmarks
            </h3>
            <button
              onClick={() => {
                setSavedRecords([]);
                localStorage.removeItem("pwd_saved_records");
              }}
              className="text-xs text-rose-600 hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Bookmarks
            </button>
          </div>
          
          <div className="divide-y dark:divide-zinc-800 mt-2">
            {savedRecords.map((rec) => (
              <div key={rec.id} className="py-3 flex justify-between items-center text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[10px]">
                      {rec.mode}
                    </span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">
                      {rec.password}
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    Saved: {rec.timestamp} | Length: {rec.length} | Entropy: {rec.entropy} bits ({rec.strength})
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(rec.password)}
                    className="p-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded text-zinc-600 dark:text-zinc-300"
                    title="Copy this password"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteRecord(rec.id)}
                    className="p-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 text-rose-600 rounded"
                    title="Delete bookmark"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. PRINTABLE HIDDEN/REVEALED LAYOUT STYLES */}
      <div className="hidden print:block space-y-4">
        <h2 className="text-xl font-bold border-b pb-2">Password Generator Configuration Summary Report</h2>
        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
          <div><strong>Generation Timestamp:</strong> <span suppressHydrationWarning>{isMounted ? new Date().toLocaleString() : ""}</span></div>
          <div><strong>Active Mode Selected:</strong> {activeTab}</div>
          {activeTab === "random" && (
            <>
              <div><strong>Password Length:</strong> {length} characters</div>
              <div><strong>Entropy bits rating:</strong> {outputs.entropyBits} bits</div>
              <div><strong>Strength Level:</strong> {outputs.strengthCategory}</div>
              <div><strong>Character Pool size:</strong> {outputs.poolSize} characters</div>
            </>
          )}
        </div>

        <div className="p-4 border bg-zinc-50 rounded-xl mt-4">
          <div className="text-xs font-bold text-zinc-500 uppercase">Generated Secure Password:</div>
          <div className="text-lg font-mono font-bold mt-2 select-all">
            {revealForPrint ? outputs.generatedPassword : "•••••••••••••••• (Plaintext hidden for print security)"}
          </div>
          {!revealForPrint && (
            <button 
              onClick={() => setRevealForPrint(true)}
              className="mt-2 text-xs text-blue-600 underline print:hidden"
            >
              Reveal Plaintext Password for Print
            </button>
          )}
        </div>
        
        <p className="text-[10px] text-zinc-400 mt-6 border-t pt-2">
          This report was generated securely and locally via client-side code using window.crypto.
        </p>
      </div>

    </div>
  );
}

export default PasswordGenerator;
