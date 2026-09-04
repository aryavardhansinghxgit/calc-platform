"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sliders,
  Layers,
  Copy,
  Download,
  CheckCircle2,
  RotateCw,
  RotateCcw,
  Hash,
  Shuffle,
  Grid,
  Percent,
  FileText,
  Printer
} from "lucide-react";
import { jsPDF } from "jspdf";
import {
  computeStandardCombinatorics,
  generateCombinationsList,
  generatePermutationsList,
  computeCircularPermutations,
  computeMultisetPermutations,
  computeDerangements,
  computePascalTriangle,
  computeHypergeometricProbability
} from "@/app/calculators/permutation-combination-calculator/perm-comb-logic";

export type FormatMode = "std" | "sci" | "log";
export type StandardVisualTab = "steps" | "list";
export type ListType = "comb" | "perm";

export interface SavedPermItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
  rawInputs?: {
    n?: number;
    r?: number;
    circN?: number;
    word?: string;
    derangeN?: number;
    pascalN?: number;
    pascalK?: number;
    hypN?: number;
    hypK?: number;
    hypSampleN?: number;
    hypSuccessK?: number;
  };
}

export function PermutationCombinationCalculator() {
  // Card 1 Inputs: Standard 4-in-1 Combinatorics Engine
  const [nVal, setNVal] = useState<number>(6);
  const [rVal, setRVal] = useState<number>(2);
  const [formatMode, setFormatMode] = useState<FormatMode>("std");
  const [activeVisual1, setActiveVisual1] = useState<StandardVisualTab>("steps");
  const [listType, setListType] = useState<ListType>("comb");
  const [copiedList, setCopiedList] = useState<boolean>(false);

  // Card 2 Inputs: Circular Permutations
  const [circN, setCircN] = useState<number>(6);

  // Card 3 Inputs: Multiset / Word Anagrams
  const [multisetInput, setMultisetInput] = useState<string>("MISSISSIPPI");

  // Card 4 Inputs: Derangements (!n)
  const [derangeN, setDerangeN] = useState<number>(5);

  // Card 5 Inputs: Pascal's Triangle & Binomial Coefficient
  const [pascalN, setPascalN] = useState<number>(7);
  const [pascalK, setPascalK] = useState<number>(3);

  // Card 6 Inputs: Hypergeometric Probability
  const [hypN, setHypN] = useState<number>(52);
  const [hypK, setHypK] = useState<number>(13);
  const [hypSampleN, setHypSampleN] = useState<number>(5);
  const [hypSuccessK, setHypSuccessK] = useState<number>(2);

  // Saved calculation states for Card 1 to 6
  const [savedStandardItems, setSavedStandardItems] = useState<SavedPermItem[]>([]);
  const [justSavedStandard, setJustSavedStandard] = useState<boolean>(false);

  const [savedCircularItems, setSavedCircularItems] = useState<SavedPermItem[]>([]);
  const [justSavedCircular, setJustSavedCircular] = useState<boolean>(false);

  const [savedMultisetItems, setSavedMultisetItems] = useState<SavedPermItem[]>([]);
  const [justSavedMultiset, setJustSavedMultiset] = useState<boolean>(false);

  const [savedDerangeItems, setSavedDerangeItems] = useState<SavedPermItem[]>([]);
  const [justSavedDerange, setJustSavedDerange] = useState<boolean>(false);

  const [savedPascalItems, setSavedPascalItems] = useState<SavedPermItem[]>([]);
  const [justSavedPascal, setJustSavedPascal] = useState<boolean>(false);

  const [savedProbItems, setSavedProbItems] = useState<SavedPermItem[]>([]);
  const [justSavedProb, setJustSavedProb] = useState<boolean>(false);

  // Load feedback states for saved items
  const [loadedStandardId, setLoadedStandardId] = useState<string | null>(null);
  const [loadedCircularId, setLoadedCircularId] = useState<string | null>(null);
  const [loadedMultisetId, setLoadedMultisetId] = useState<string | null>(null);
  const [loadedDerangeId, setLoadedDerangeId] = useState<string | null>(null);
  const [loadedPascalId, setLoadedPascalId] = useState<string | null>(null);
  const [loadedProbId, setLoadedProbId] = useState<string | null>(null);
  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_perm_standard");
      if (s1) setSavedStandardItems(JSON.parse(s1));

      const s2 = localStorage.getItem("saved_perm_circular");
      if (s2) setSavedCircularItems(JSON.parse(s2));

      const s3 = localStorage.getItem("saved_perm_multiset");
      if (s3) setSavedMultisetItems(JSON.parse(s3));

      const s4 = localStorage.getItem("saved_perm_derange");
      if (s4) setSavedDerangeItems(JSON.parse(s4));

      const s5 = localStorage.getItem("saved_perm_pascal");
      if (s5) setSavedPascalItems(JSON.parse(s5));

      const s6 = localStorage.getItem("saved_perm_prob");
      if (s6) setSavedProbItems(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Card 1 Calculations
  const stdResult = useMemo(
    () => computeStandardCombinatorics(nVal, rVal, formatMode),
    [nVal, rVal, formatMode]
  );

  const generatedList = useMemo(() => {
    if (nVal > 8 || rVal > 5 || nVal <= 0 || rVal <= 0 || rVal > nVal) return [];
    return listType === "comb"
      ? generateCombinationsList(nVal, rVal)
      : generatePermutationsList(nVal, rVal);
  }, [nVal, rVal, listType]);

  // Card 2 Calculations
  const circResult = useMemo(() => computeCircularPermutations(circN, formatMode), [circN, formatMode]);

  // Card 3 Calculations
  const multisetResult = useMemo(() => computeMultisetPermutations(multisetInput, formatMode), [multisetInput, formatMode]);

  // Card 4 Calculations
  const derangeResult = useMemo(() => computeDerangements(derangeN, formatMode), [derangeN, formatMode]);

  // Card 5 Calculations
  const pascalResult = useMemo(() => computePascalTriangle(pascalN, pascalK, formatMode), [pascalN, pascalK, formatMode]);

  // Card 6 Calculations
  const probResult = useMemo(() => computeHypergeometricProbability(hypN, hypK, hypSampleN, hypSuccessK), [hypN, hypK, hypSampleN, hypSuccessK]);

  // Save Handlers with rawInputs snapshot
  const handleSaveStandard = () => {
    const inputsStr = `n = ${nVal}, r = ${rVal}`;
    const opStr = `Standard 4-in-1 Combinatorics`;
    const resList = [
      `Permutations nPr = ${stdResult.nPrFormatted}`,
      `Combinations nCr = ${stdResult.nCrFormatted}`,
      `Permutations w/ Rep (n^r) = ${stdResult.nPrRepFormatted}`,
      `Combinations w/ Rep = ${stdResult.nCrRepFormatted}`
    ];

    const newItem: SavedPermItem = {
      id: Date.now().toString(),
      title: `n=${nVal}, r=${rVal} (nPr=${stdResult.nPrFormatted}, nCr=${stdResult.nCrFormatted})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `nPr = ${stdResult.nPrFormatted}, nCr = ${stdResult.nCrFormatted}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawInputs: { n: nVal, r: rVal }
    };

    const updated = [newItem, ...savedStandardItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedStandardItems(updated);
    try { localStorage.setItem("saved_perm_standard", JSON.stringify(updated)); } catch (e) {}
    setJustSavedStandard(true);
    setTimeout(() => setJustSavedStandard(false), 2000);
  };

  const handleSaveCircular = () => {
    const inputsStr = `n = ${circN} items`;
    const opStr = `Circular & Symmetry Permutations`;
    const resList = [
      `Circular Seating (n-1)! = ${circResult.circularFormatted}`,
      `Necklace/Beads (n-1)!/2 = ${circResult.necklaceFormatted}`
    ];

    const newItem: SavedPermItem = {
      id: Date.now().toString(),
      title: `Circular (n=${circN} → ${circResult.circularFormatted})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Circular = ${circResult.circularFormatted}, Necklace = ${circResult.necklaceFormatted}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawInputs: { circN }
    };

    const updated = [newItem, ...savedCircularItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedCircularItems(updated);
    try { localStorage.setItem("saved_perm_circular", JSON.stringify(updated)); } catch (e) {}
    setJustSavedCircular(true);
    setTimeout(() => setJustSavedCircular(false), 2000);
  };

  const handleSaveMultiset = () => {
    const inputsStr = `Word: "${multisetResult.inputStr}" (Length n=${multisetResult.n})`;
    const opStr = `Multiset Anagram Permutations`;
    const resList = [
      `Unique Anagrams = ${multisetResult.formattedPermutations}`,
      `Unique Characters = ${multisetResult.uniqueCharCount}`
    ];

    const newItem: SavedPermItem = {
      id: Date.now().toString(),
      title: `Anagram "${multisetResult.inputStr}" (${multisetResult.formattedPermutations})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Permutations = ${multisetResult.formattedPermutations}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawInputs: { word: multisetResult.inputStr }
    };

    const updated = [newItem, ...savedMultisetItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedMultisetItems(updated);
    try { localStorage.setItem("saved_perm_multiset", JSON.stringify(updated)); } catch (e) {}
    setJustSavedMultiset(true);
    setTimeout(() => setJustSavedMultiset(false), 2000);
  };

  const handleSaveDerange = () => {
    const inputsStr = `n = ${derangeN} items`;
    const opStr = `Derangements & Subfactorials (!n)`;
    const resList = [
      `Subfactorial !${derangeN} = ${derangeResult.formattedSubfactorial}`,
      `Proportion = ${derangeResult.proportionPct}% (out of ${derangeResult.totalPermutations})`
    ];

    const newItem: SavedPermItem = {
      id: Date.now().toString(),
      title: `Derangements (!${derangeN} = ${derangeResult.formattedSubfactorial})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `!${derangeN} = ${derangeResult.formattedSubfactorial}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawInputs: { derangeN }
    };

    const updated = [newItem, ...savedDerangeItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedDerangeItems(updated);
    try { localStorage.setItem("saved_perm_derange", JSON.stringify(updated)); } catch (e) {}
    setJustSavedDerange(true);
    setTimeout(() => setJustSavedDerange(false), 2000);
  };

  const handleSavePascal = () => {
    const inputsStr = `Row n = ${pascalN}, Position k = ${pascalK}`;
    const opStr = `Binomial Coefficient C(${pascalN}, ${pascalK})`;
    const resList = [
      `Coefficient C(${pascalN}, ${pascalK}) = ${pascalResult.formattedBinom}`,
      `Row Sum (2^${pascalN}) = ${pascalResult.formattedRowSum}`
    ];

    const newItem: SavedPermItem = {
      id: Date.now().toString(),
      title: `Binomial C(${pascalN}, ${pascalK}) = ${pascalResult.formattedBinom}`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `C(${pascalN}, ${pascalK}) = ${pascalResult.formattedBinom}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawInputs: { pascalN, pascalK }
    };

    const updated = [newItem, ...savedPascalItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedPascalItems(updated);
    try { localStorage.setItem("saved_perm_pascal", JSON.stringify(updated)); } catch (e) {}
    setJustSavedPascal(true);
    setTimeout(() => setJustSavedPascal(false), 2000);
  };

  const handleSaveProb = () => {
    const inputsStr = `N=${hypN}, K=${hypK}, n=${hypSampleN}, k=${hypSuccessK}`;
    const opStr = `Hypergeometric Combinatorial Probability`;
    const resList = [
      `Probability P(X = ${hypSuccessK}) = ${probResult.probabilityPct}`,
      `Odds Ratio = ${probResult.oddsRatioStr}`,
      `Favorable / Total = ${probResult.favorableOutcomes} / ${probResult.totalOutcomes}`
    ];

    const newItem: SavedPermItem = {
      id: Date.now().toString(),
      title: `Probability P(X=${hypSuccessK}) = ${probResult.probabilityPct}`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `P = ${probResult.probabilityPct} (${probResult.oddsRatioStr})`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawInputs: { hypN, hypK, hypSampleN, hypSuccessK }
    };

    const updated = [newItem, ...savedProbItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedProbItems(updated);
    try { localStorage.setItem("saved_perm_prob", JSON.stringify(updated)); } catch (e) {}
    setJustSavedProb(true);
    setTimeout(() => setJustSavedProb(false), 2000);
  };

  // Load Handlers: Restore exact snapshot into live interactive controls
  const handleLoadStandard = (item: SavedPermItem) => {
    if (item.rawInputs?.n !== undefined && item.rawInputs?.r !== undefined) {
      setNVal(item.rawInputs.n);
      setRVal(item.rawInputs.r);
    } else {
      const match = item.inputs.match(/n\s*=\s*(\d+),\s*r\s*=\s*(\d+)/);
      if (match) {
        setNVal(parseInt(match[1], 10));
        setRVal(parseInt(match[2], 10));
      }
    }
    setLoadedStandardId(item.id);
    setTimeout(() => setLoadedStandardId(null), 1500);
  };

  const handleLoadCircular = (item: SavedPermItem) => {
    if (item.rawInputs?.circN !== undefined) {
      setCircN(item.rawInputs.circN);
    } else {
      const match = item.inputs.match(/n\s*=\s*(\d+)/);
      if (match) setCircN(parseInt(match[1], 10));
    }
    setLoadedCircularId(item.id);
    setTimeout(() => setLoadedCircularId(null), 1500);
  };

  const handleLoadMultiset = (item: SavedPermItem) => {
    if (item.rawInputs?.word !== undefined) {
      setMultisetInput(item.rawInputs.word);
    } else {
      const match = item.inputs.match(/Word:\s*"([^"]+)"/);
      if (match) setMultisetInput(match[1]);
    }
    setLoadedMultisetId(item.id);
    setTimeout(() => setLoadedMultisetId(null), 1500);
  };

  const handleLoadDerange = (item: SavedPermItem) => {
    if (item.rawInputs?.derangeN !== undefined) {
      setDerangeN(item.rawInputs.derangeN);
    } else {
      const match = item.inputs.match(/n\s*=\s*(\d+)/);
      if (match) setDerangeN(parseInt(match[1], 10));
    }
    setLoadedDerangeId(item.id);
    setTimeout(() => setLoadedDerangeId(null), 1500);
  };

  const handleLoadPascal = (item: SavedPermItem) => {
    if (item.rawInputs?.pascalN !== undefined && item.rawInputs?.pascalK !== undefined) {
      setPascalN(item.rawInputs.pascalN);
      setPascalK(item.rawInputs.pascalK);
    } else {
      const match = item.inputs.match(/Row\s*n\s*=\s*(\d+),\s*Position\s*k\s*=\s*(\d+)/i);
      if (match) {
        setPascalN(parseInt(match[1], 10));
        setPascalK(parseInt(match[2], 10));
      }
    }
    setLoadedPascalId(item.id);
    setTimeout(() => setLoadedPascalId(null), 1500);
  };

  const handleLoadProb = (item: SavedPermItem) => {
    if (item.rawInputs?.hypN !== undefined) {
      setHypN(item.rawInputs.hypN);
      setHypK(item.rawInputs.hypK ?? 13);
      setHypSampleN(item.rawInputs.hypSampleN ?? 5);
      setHypSuccessK(item.rawInputs.hypSuccessK ?? 2);
    } else {
      const match = item.inputs.match(/N=(\d+),\s*K=(\d+),\s*n=(\d+),\s*k=(\d+)/i);
      if (match) {
        setHypN(parseInt(match[1], 10));
        setHypK(parseInt(match[2], 10));
        setHypSampleN(parseInt(match[3], 10));
        setHypSuccessK(parseInt(match[4], 10));
      }
    }
    setLoadedProbId(item.id);
    setTimeout(() => setLoadedProbId(null), 1500);
  };

  // Copy List Helper
  const handleCopyList = () => {
    if (generatedList.length === 0) return;
    navigator.clipboard.writeText(generatedList.join(", "));
    setCopiedList(true);
    setTimeout(() => setCopiedList(false), 2000);
  };

  // Copy LaTeX Helper
  const handleCopyLatex = () => {
    const latex = [
      `% Permutation & Combination Formulas (n=${nVal}, r=${rVal})`,
      `P(${nVal}, ${rVal}) = \\frac{${nVal}!{(${nVal} - ${rVal})!} = ${stdResult.nPr}`,
      `C(${nVal}, ${rVal}) = \\frac{${nVal}!{${rVal}!(${nVal} - ${rVal})!} = ${stdResult.nCr}`,
      `P_{\\text{rep}}(${nVal}, ${rVal}) = ${nVal}^{${rVal}} = ${stdResult.nPrRep}`,
      `C_{\\text{rep}}(${nVal}, ${rVal}) = \\binom{${nVal} + ${rVal} - 1}{${rVal}} = ${stdResult.nCrRep}`
    ].join("\n");

    navigator.clipboard.writeText(latex);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2000);
  };

  // Download List Helper
  const handleDownloadList = () => {
    if (generatedList.length === 0) return;
    const blob = new Blob([generatedList.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${listType}_n${nVal}_r${rVal}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Real CSV Export Function
  const handleExportCSV = () => {
    const timestamp = new Date().toISOString();
    const rows = [
      ["Module", "Input Parameters", "n", "r", "Metric", "Formula", "Calculated Value", "Formatted Value", "Derivation / Step", "Timestamp"],
      ["Standard 4-in-1", `n=${nVal}, r=${rVal}`, String(nVal), String(rVal), "Permutations nPr (Order Matters)", "n! / (n - r)!", stdResult.nPr.toString(), stdResult.nPrFormatted, stdResult.nPrSteps, timestamp],
      ["Standard 4-in-1", `n=${nVal}, r=${rVal}`, String(nVal), String(rVal), "Combinations nCr (Order Ignored)", "n! / [ r! (n - r)! ]", stdResult.nCr.toString(), stdResult.nCrFormatted, stdResult.nCrSteps, timestamp],
      ["Standard 4-in-1", `n=${nVal}, r=${rVal}`, String(nVal), String(rVal), "Permutations w/ Repetition", "n^r", stdResult.nPrRep.toString(), stdResult.nPrRepFormatted, stdResult.nPrRepSteps, timestamp],
      ["Standard 4-in-1", `n=${nVal}, r=${rVal}`, String(nVal), String(rVal), "Combinations w/ Repetition", "(n + r - 1)! / [ r! (n - 1)! ]", stdResult.nCrRep.toString(), stdResult.nCrRepFormatted, stdResult.nCrRepSteps, timestamp],
      ["Circular Permutations", `n=${circN}`, String(circN), "", "Circular Table Seating", "(n - 1)!", circResult.circularPerm.toString(), circResult.circularFormatted, `(n - 1)! = ${circN - 1}! = ${circResult.circularFormatted}`, timestamp],
      ["Circular Permutations", `n=${circN}`, String(circN), "", "Necklace / Key Ring (Reflection)", "(n - 1)! / 2", circResult.necklacePerm.toString(), circResult.necklaceFormatted, `(n - 1)! / 2 = ${circResult.necklaceFormatted}`, timestamp],
      ["Multiset Anagrams", `Word="${multisetResult.inputStr}"`, String(multisetResult.n), "", "Unique Anagram Permutations", "n! / (n1! × n2! × ...)", multisetResult.totalPermutations.toString(), multisetResult.formattedPermutations, multisetResult.stepText, timestamp],
      ["Derangements", `n=${derangeN}`, String(derangeN), "", "Subfactorial !n", "!n = (n - 1)(!(n - 1) + !(n - 2))", derangeResult.subfactorial.toString(), derangeResult.formattedSubfactorial, `${derangeResult.proportionPct}% of total permutations`, timestamp],
      ["Pascal's Triangle", `Row n=${pascalN}, Position k=${pascalK}`, String(pascalN), String(pascalK), "Binomial Coefficient C(n, k)", "n! / [ k! (n - k)! ]", pascalResult.binomCoeff.toString(), pascalResult.formattedBinom, `Row Sum = ${pascalResult.formattedRowSum}`, timestamp],
      ["Hypergeometric Probability", `N=${hypN}, K=${hypK}, n=${hypSampleN}, k=${hypSuccessK}`, String(hypSampleN), String(hypSuccessK), "Exact Probability P(X = k)", "[ C(K, k) × C(N - K, n - k) ] / C(N, n)", String(probResult.probability), probResult.probabilityPct, probResult.stepText, timestamp]
    ];

    const csvContent = rows
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `permutations_combinations_n${nVal}_r${rVal}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Real PDF Export Function using jsPDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 36;
    let y = 45;

    // Header Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(37, 99, 235); // Blue-600
    doc.text("Permutation & Combination Calculation Report", margin, y);
    y += 18;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.text(`Generated on ${new Date().toLocaleString()} | CalcPlatform Math Suite`, margin, y);
    y += 20;

    const drawSectionHeader = (title: string) => {
      doc.setFillColor(37, 99, 235);
      doc.rect(margin, y, pageWidth - margin * 2, 20, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(title, margin + 8, y + 14);
      y += 26;
    };

    const drawRow = (label: string, value: string, sub?: string) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      doc.text(label, margin + 10, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(37, 99, 235);
      doc.text(value, margin + 220, y);
      if (sub) {
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(8);
        doc.text(sub, margin + 340, y);
      }
      y += 15;
    };

    // 1. Standard Combinatorics
    drawSectionHeader("1. Standard 4-in-1 Combinatorics Engine");
    drawRow("Inputs:", `Total Items (n) = ${nVal}, Chosen (r) = ${rVal}`);
    drawRow("Permutations nPr (Order Matters):", stdResult.nPrFormatted, "Formula: n! / (n - r)!");
    drawRow("Combinations nCr (Order Ignored):", stdResult.nCrFormatted, "Formula: n! / [ r! (n - r)! ]");
    drawRow("Permutations w/ Repetition:", stdResult.nPrRepFormatted, "Formula: n^r");
    drawRow("Combinations w/ Repetition:", stdResult.nCrRepFormatted, "Formula: (n + r - 1)! / [ r! (n - 1)! ]");
    y += 4;
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(`Step nPr: ${stdResult.nPrSteps}`, margin + 10, y); y += 12;
    doc.text(`Step nCr: ${stdResult.nCrSteps}`, margin + 10, y); y += 16;

    // 2. Circular Permutations
    drawSectionHeader("2. Circular Permutations & Necklace Symmetry");
    drawRow(`Inputs (n = ${circN} items):`, `Seating = ${circResult.circularFormatted}`, `Necklace = ${circResult.necklaceFormatted}`);
    y += 4;

    // 3. Multiset Anagrams
    drawSectionHeader("3. Multiset & Anagram Permutations");
    drawRow(`Input Word: "${multisetResult.inputStr}"`, `Unique Anagrams = ${multisetResult.formattedPermutations}`, `Length n = ${multisetResult.n}, Unique = ${multisetResult.uniqueCharCount}`);
    y += 4;

    // 4. Derangements
    drawSectionHeader("4. Derangements & Subfactorials (!n)");
    drawRow(`Set Size n = ${derangeN}:`, `Subfactorial !${derangeN} = ${derangeResult.formattedSubfactorial}`, `Proportion = ${derangeResult.proportionPct}% of ${derangeResult.totalPermutations}`);
    y += 4;

    // 5. Pascal's Triangle
    drawSectionHeader("5. Binomial Coefficient & Pascal's Triangle");
    drawRow(`Row n = ${pascalN}, Position k = ${pascalK}:`, `C(${pascalN}, ${pascalK}) = ${pascalResult.formattedBinom}`, `Row Sum 2^${pascalN} = ${pascalResult.formattedRowSum}`);
    y += 4;

    // 6. Hypergeometric Probability
    drawSectionHeader("6. Combinatorial Hypergeometric Probability");
    drawRow(`Parameters (N=${hypN}, K=${hypK}, n=${hypSampleN}, k=${hypSuccessK}):`, `Probability = ${probResult.probabilityPct}`, `Odds: ${probResult.oddsRatioStr}`);
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(probResult.stepText, margin + 10, y);
    y += 18;

    // Footer note
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("Educational authority and mathematical accuracy verified by CalcPlatform.", margin, doc.internal.pageSize.getHeight() - 25);

    doc.save(`permutation_combination_report_n${nVal}_r${rVal}.pdf`);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: STANDARD 4-IN-1 COMBINATORICS ENGINE (nPr & nCr) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid print:shadow-none print:border-slate-300 print:mb-6">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Standard 4-in-1 Combinatorics Engine (nPr &amp; nCr)</span>
          <div className="flex items-center gap-1.5 no-print">
            <button
              type="button"
              onClick={handleExportCSV}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Export all calculation results as CSV"
            >
              <Download className="w-3 h-3 text-white" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Download comprehensive PDF report"
            >
              <FileText className="w-3 h-3 text-white" />
              <span>PDF</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Print page report"
            >
              <Printer className="w-3 h-3 text-white" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={handleSaveStandard}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedStandard ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT FORM & SCENARIO CHIPS */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Sliders className="h-4 w-4 text-blue-600" />
                <span>Input Parameters (n &amp; r)</span>
              </h2>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Total Items (n):
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="1000"
                      value={nVal}
                      onChange={(e) => setNVal(Math.max(0, parseInt(e.target.value, 10) || 0))}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Chosen Items (r):
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="1000"
                      value={rVal}
                      onChange={(e) => setRVal(Math.max(0, parseInt(e.target.value, 10) || 0))}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                    />
                  </div>
                </div>

                {/* DISPLAY FORMAT TOGGLE */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Number Format:
                  </label>
                  <div className="grid grid-cols-3 gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setFormatMode("std")}
                      className={`py-1 rounded-lg cursor-pointer transition-all ${
                        formatMode === "std" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      Standard
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormatMode("sci")}
                      className={`py-1 rounded-lg cursor-pointer transition-all ${
                        formatMode === "sci" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      Scientific
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormatMode("log")}
                      className={`py-1 rounded-lg cursor-pointer transition-all ${
                        formatMode === "log" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      Log10
                    </button>
                  </div>
                </div>

                {/* QUICK SCENARIO CHIPS */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-500 block">Quick Scenarios:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => { setNVal(49); setRVal(6); }}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:border-blue-600 cursor-pointer"
                    >
                      Lottery (6/49)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setNVal(52); setRVal(5); }}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:border-blue-600 cursor-pointer"
                    >
                      Poker (5-Card)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setNVal(10); setRVal(4); }}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:border-blue-600 cursor-pointer"
                    >
                      4-Digit PIN
                    </button>
                    <button
                      type="button"
                      onClick={() => { setNVal(10); setRVal(3); }}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:border-blue-600 cursor-pointer"
                    >
                      Podium (3 of 10)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 4 HERO RESULT SUB-CARDS */}
            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Permutations (No Repetition) */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Permutations nPr (Order Matters)
                  </span>
                  <div className="text-2xl font-mono font-black text-slate-900 dark:text-slate-100 break-all">
                    {stdResult.nPrFormatted}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block">n! / (n - r)!</span>
                </div>

                {/* Combinations (No Repetition) */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Combinations nCr (Order Ignored)
                  </span>
                  <div className="text-2xl font-mono font-black text-blue-600 dark:text-blue-400 break-all">
                    {stdResult.nCrFormatted}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block">n! / [ r! (n - r)! ]</span>
                </div>

                {/* Permutations (With Repetition) */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Permutations w/ Repetition
                  </span>
                  <div className="text-2xl font-mono font-black text-slate-900 dark:text-slate-100 break-all">
                    {stdResult.nPrRepFormatted}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block">n^r</span>
                </div>

                {/* Combinations (With Repetition) */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Combinations w/ Repetition
                  </span>
                  <div className="text-2xl font-mono font-black text-slate-900 dark:text-slate-100 break-all">
                    {stdResult.nCrRepFormatted}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block">(n + r - 1)! / [ r! (n - 1)! ]</span>
                </div>
              </div>
            </div>
          </div>

          {/* TABBED VISUAL ANALYTICS & ITEM LIST GENERATOR */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span>Interactive Derivations &amp; Item List Visualizer</span>
              </h3>

              <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold no-print">
                <button
                  type="button"
                  onClick={() => setActiveVisual1("steps")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual1 === "steps" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Step Derivations
                </button>

                <button
                  type="button"
                  onClick={() => setActiveVisual1("list")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual1 === "list" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Item List Generator
                </button>

                <button
                  type="button"
                  onClick={handleCopyLatex}
                  className="px-2.5 py-1 rounded-lg cursor-pointer transition-all bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center gap-1"
                  title="Copy LaTeX formula and calculations"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedLatex ? "Copied LaTeX!" : "Copy LaTeX"}</span>
                </button>
              </div>
            </div>

            {/* TAB 1: STEP DERIVATIONS */}
            {activeVisual1 === "steps" && (
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans text-xs">Permutation Step Formula:</span>
                  <p>{stdResult.nPrSteps}</p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans text-xs">Combination Step Formula:</span>
                  <p>{stdResult.nCrSteps}</p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans text-xs">Permutation with Repetition Step:</span>
                  <p>{stdResult.nPrRepSteps}</p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans text-xs">Combination with Repetition Step:</span>
                  <p>{stdResult.nCrRepSteps}</p>
                </div>
              </div>
            )}

            {/* TAB 2: ITEM LIST GENERATOR */}
            {activeVisual1 === "list" && (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span>Generated Elements for Set Size n={nVal}, r={rVal}:</span>
                    <div className="flex bg-slate-200 dark:bg-slate-700 p-0.5 rounded-lg text-[11px]">
                      <button
                        type="button"
                        onClick={() => setListType("comb")}
                        className={`px-2 py-0.5 rounded cursor-pointer ${listType === "comb" ? "bg-blue-600 text-white" : ""}`}
                      >
                        Combinations ({generatedList.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setListType("perm")}
                        className={`px-2 py-0.5 rounded cursor-pointer ${listType === "perm" ? "bg-blue-600 text-white" : ""}`}
                      >
                        Permutations ({generatedList.length})
                      </button>
                    </div>
                  </div>

                  {generatedList.length > 0 && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyList}
                        className="px-2.5 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedList ? "Copied!" : "Copy List"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadList}
                        className="px-2.5 py-1 rounded bg-slate-700 text-white hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download .txt</span>
                      </button>
                    </div>
                  )}
                </div>

                {nVal > 8 || rVal > 5 ? (
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-300 text-center">
                    Item listing is enabled for small sets (n &le; 8, r &le; 5) to prevent browser memory slowdowns.
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 max-h-48 overflow-y-auto">
                    <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                      {generatedList.map((item, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* EMBEDDED SAVED RAW DATA CALCULATIONS INSIDE CARD 1 */}
          {savedStandardItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Standard Combinatorics ({savedStandardItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedStandardItems([]);
                    try { localStorage.removeItem("saved_perm_standard"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedStandardItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1 no-print">
                          <button
                            type="button"
                            onClick={() => handleLoadStandard(item)}
                            className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 font-semibold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                            title="Load this calculation back into controls"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>{loadedStandardId === item.id ? "Loaded!" : "Load"}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedStandardItems.filter(i => i.id !== item.id);
                              setSavedStandardItems(updated);
                              try { localStorage.setItem("saved_perm_standard", JSON.stringify(updated)); } catch(e){}
                            }}
                            className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Calculated Answers:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug">
                                  {resLine}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: CIRCULAR PERMUTATIONS & NECKLACE SYMMETRY SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid print:shadow-none print:border-slate-300 print:mb-6">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Circular Permutations &amp; Necklace Symmetry Suite</span>
          <button
            type="button"
            onClick={handleSaveCircular}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCircular ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Circular Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Number of Distinct Items (n):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={circN}
                    onChange={(e) => setCircN(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CIRCULAR OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Circular Table Seating (n - 1)!
                    </span>
                    <div className="text-2xl font-mono font-black text-slate-900 dark:text-slate-100 break-all">
                      {circResult.circularFormatted}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Necklace / Key Ring Symmetry (n - 1)! / 2
                    </span>
                    <div className="text-2xl font-mono font-black text-blue-600 dark:text-blue-400 break-all">
                      {circResult.necklaceFormatted}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans text-slate-600 dark:text-slate-400 leading-relaxed">
                  {circResult.explanation}
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED CIRCULAR PERMUTATIONS INSIDE CARD 2 */}
          {savedCircularItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Circular Calculations ({savedCircularItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCircularItems([]);
                    try { localStorage.removeItem("saved_perm_circular"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedCircularItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1 no-print">
                          <button
                            type="button"
                            onClick={() => handleLoadCircular(item)}
                            className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 font-semibold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                            title="Load this calculation back into controls"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>{loadedCircularId === item.id ? "Loaded!" : "Load"}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedCircularItems.filter(i => i.id !== item.id);
                              setSavedCircularItems(updated);
                              try { localStorage.setItem("saved_perm_circular", JSON.stringify(updated)); } catch(e){}
                            }}
                            className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug">
                                  {resLine}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: MULTISET / REPEATED ELEMENTS PERMUTATION ENGINE (WORDS & ANAGRAMS) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid print:shadow-none print:border-slate-300 print:mb-6">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Multiset &amp; Anagram Permutation Engine (n! / n1!n2!...)</span>
          <button
            type="button"
            onClick={handleSaveMultiset}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedMultiset ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Word / String Input
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Word with Duplicate Letters:
                  </label>
                  <input
                    type="text"
                    value={multisetInput}
                    onChange={(e) => setMultisetInput(e.target.value)}
                    placeholder="e.g. MISSISSIPPI, BANANA, SUCCESS"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm tracking-wider uppercase"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: MULTISET OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Total Unique Anagram Permutations
                  </span>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {multisetResult.formattedPermutations}
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    Word Length (n): {multisetResult.n} | Unique Letters: {multisetResult.uniqueCharCount}
                  </p>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 block">Character Frequency Table:</span>
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {multisetResult.freqTable.map((item, idx) => (
                      <span key={idx} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200">
                        {item.char}: {item.count}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED MULTISET ANAGRAMS INSIDE CARD 3 */}
          {savedMultisetItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Anagram Calculations ({savedMultisetItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedMultisetItems([]);
                    try { localStorage.removeItem("saved_perm_multiset"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedMultisetItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1 no-print">
                          <button
                            type="button"
                            onClick={() => handleLoadMultiset(item)}
                            className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 font-semibold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                            title="Load this calculation back into controls"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>{loadedMultisetId === item.id ? "Loaded!" : "Load"}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedMultisetItems.filter(i => i.id !== item.id);
                              setSavedMultisetItems(updated);
                              try { localStorage.setItem("saved_perm_multiset", JSON.stringify(updated)); } catch(e){}
                            }}
                            className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug">
                                  {resLine}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: DERANGEMENTS & SUBFACTORIALS (!n) ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid print:shadow-none print:border-slate-300 print:mb-6">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Derangements &amp; Subfactorials (!n) Engine</span>
          <button
            type="button"
            onClick={handleSaveDerange}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedDerange ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Derangement Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Set Size (n):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={derangeN}
                    onChange={(e) => setDerangeN(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: DERANGEMENT OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Subfactorial !{derangeN} (No Item in Original Spot)
                  </span>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    !{derangeN} = {derangeResult.formattedSubfactorial}
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    Proportion of n!: {derangeResult.proportionPct}% (&approx; 1/e = 36.79%)
                  </p>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans text-slate-600 dark:text-slate-400 leading-relaxed">
                  {derangeResult.explanation}
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED DERANGEMENTS INSIDE CARD 4 */}
          {savedDerangeItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Derangements ({savedDerangeItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedDerangeItems([]);
                    try { localStorage.removeItem("saved_perm_derange"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedDerangeItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1 no-print">
                          <button
                            type="button"
                            onClick={() => handleLoadDerange(item)}
                            className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 font-semibold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                            title="Load this calculation back into controls"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>{loadedDerangeId === item.id ? "Loaded!" : "Load"}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedDerangeItems.filter(i => i.id !== item.id);
                              setSavedDerangeItems(updated);
                              try { localStorage.setItem("saved_perm_derange", JSON.stringify(updated)); } catch(e){}
                            }}
                            className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug">
                                  {resLine}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: BINOMIAL COEFFICIENT & PASCAL'S TRIANGLE INSPECTOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid print:shadow-none print:border-slate-300 print:mb-6">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Binomial Coefficient &amp; Pascal's Triangle Inspector</span>
          <button
            type="button"
            onClick={handleSavePascal}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedPascal ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Pascal Row Parameters
              </h2>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Row (n):
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="500"
                      value={pascalN}
                      onChange={(e) => setPascalN(Math.max(0, parseInt(e.target.value, 10) || 0))}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Position (k):
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={pascalN}
                      value={pascalK}
                      onChange={(e) => setPascalK(Math.max(0, parseInt(e.target.value, 10) || 0))}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: PASCAL OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Binomial Coefficient C({pascalN}, {pascalK})
                    </span>
                    <div className="text-2xl font-mono font-black text-slate-900 dark:text-slate-100 break-all">
                      {pascalResult.formattedBinom}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Row Sum (&sum; = 2^{pascalN})
                    </span>
                    <div className="text-2xl font-mono font-black text-blue-600 dark:text-blue-400 break-all">
                      {pascalResult.formattedRowSum}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 block">Full Pascal Row n={pascalN} Coefficients:</span>
                  <div className="flex flex-wrap gap-1 font-mono text-xs max-h-36 overflow-y-auto">
                    {pascalResult.formattedRowCoeffs.map((c, idx) => (
                      <span key={idx} className={`px-2 py-0.5 rounded border ${idx === pascalK ? "bg-blue-600 text-white border-blue-600 font-black" : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"}`}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED PASCAL CALCULATIONS INSIDE CARD 5 */}
          {savedPascalItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Pascal Calculations ({savedPascalItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedPascalItems([]);
                    try { localStorage.removeItem("saved_perm_pascal"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedPascalItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1 no-print">
                          <button
                            type="button"
                            onClick={() => handleLoadPascal(item)}
                            className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 font-semibold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                            title="Load this calculation back into controls"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>{loadedPascalId === item.id ? "Loaded!" : "Load"}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedPascalItems.filter(i => i.id !== item.id);
                              setSavedPascalItems(updated);
                              try { localStorage.setItem("saved_perm_pascal", JSON.stringify(updated)); } catch(e){}
                            }}
                            className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug">
                                  {resLine}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 6: COMBINATORIAL HYPERGEOMETRIC PROBABILITY & ODDS ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid print:shadow-none print:border-slate-300 print:mb-6">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Combinatorial Hypergeometric Probability &amp; Odds Solver</span>
          <button
            type="button"
            onClick={handleSaveProb}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedProb ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Probability Inputs
              </h2>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Total Population (N):</label>
                    <input
                      type="number"
                      min="1"
                      value={hypN}
                      onChange={(e) => setHypN(parseInt(e.target.value, 10) || 1)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Successes in Pop (K):</label>
                    <input
                      type="number"
                      min="0"
                      value={hypK}
                      onChange={(e) => setHypK(parseInt(e.target.value, 10) || 0)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Sample Drawn (n):</label>
                    <input
                      type="number"
                      min="1"
                      value={hypSampleN}
                      onChange={(e) => setHypSampleN(parseInt(e.target.value, 10) || 1)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Desired Successes (k):</label>
                    <input
                      type="number"
                      min="0"
                      value={hypSuccessK}
                      onChange={(e) => setHypSuccessK(parseInt(e.target.value, 10) || 0)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: PROBABILITY OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Exact Probability P(X = {hypSuccessK})
                  </span>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {probResult.probabilityPct}
                  </div>
                  <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    Odds: {probResult.oddsRatioStr}
                  </p>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400">
                  {probResult.stepText}
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED PROBABILITY SOLVES INSIDE CARD 6 */}
          {savedProbItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Probability Calculations ({savedProbItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedProbItems([]);
                    try { localStorage.removeItem("saved_perm_prob"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedProbItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1 no-print">
                          <button
                            type="button"
                            onClick={() => handleLoadProb(item)}
                            className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 font-semibold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                            title="Load this calculation back into controls"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>{loadedProbId === item.id ? "Loaded!" : "Load"}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedProbItems.filter(i => i.id !== item.id);
                              setSavedProbItems(updated);
                              try { localStorage.setItem("saved_perm_prob", JSON.stringify(updated)); } catch(e){}
                            }}
                            className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug">
                                  {resLine}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PermutationCombinationCalculator;
