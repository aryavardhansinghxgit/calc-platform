"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Calculator,
  Copy,
  Check,
  Share2,
  Sparkles,
  Sliders,
  RotateCcw,
  BookOpen,
  Zap,
  Grid,
  ListOrdered,
  Layers,
  PieChart,
  CheckCircle2,
  Info,
  ShieldCheck,
  Split,
  Plus,
  Minus,
  ArrowRight,
  Shuffle,
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Download,
  Code2,
  ArrowLeftRight,
  RefreshCw
} from "lucide-react";
import {
  Matrix,
  createZeroMatrix,
  createIdentityMatrix,
  createRandomMatrix,
  addMatrices,
  subtractMatrices,
  multiplyMatrices,
  scaleMatrix,
  hadamardProduct,
  kroneckerProduct,
  transposeMatrix,
  traceMatrix,
  determinantMatrix,
  rrefMatrix,
  rankMatrix,
  inverseMatrix,
  matrixPower,
  solveLinearSystem,
  computeEigenvalues2x2or3x3,
  formatMatrixToLaTeX,
  formatMatrixToCSV
} from "@/app/calculators/matrix-calculator/matrix-logic";

export interface SavedMatrixItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
  snapshot?: {
    rowsA: number;
    colsA: number;
    rawA: string[][];
    rowsB?: number;
    colsB?: number;
    rawB?: string[][];
    rawVectorB?: string[];
    binaryOp?: string;
    unaryOp?: string;
  };
}

export function MatrixCalculator() {
  // Dimensions for Matrix A & B (1 to 10)
  const [rowsA, setRowsA] = useState<number>(3);
  const [colsA, setColsA] = useState<number>(3);
  const [rowsB, setRowsB] = useState<number>(3);
  const [colsB, setColsB] = useState<number>(3);

  // String-based cells to allow typing "-", ".", "" without premature zero coercion
  const [rawMatrixA, setRawMatrixA] = useState<string[][]>([
    ["1", "2", "3"],
    ["0", "1", "4"],
    ["5", "6", "0"]
  ]);

  const [rawMatrixB, setRawMatrixB] = useState<string[][]>([
    ["2", "0", "-1"],
    ["1", "3", "2"],
    ["0", "-2", "1"]
  ]);

  // Constants vector b for Ax = b solver
  const [rawVectorB, setRawVectorB] = useState<string[]>(["1", "2", "3"]);

  // Derived numeric matrices for calculation
  const matrixA: Matrix = useMemo(() => {
    return rawMatrixA.map((row) =>
      row.map((val) => {
        const parsed = parseFloat(val);
        return Number.isFinite(parsed) ? parsed : 0;
      })
    );
  }, [rawMatrixA]);

  const matrixB: Matrix = useMemo(() => {
    return rawMatrixB.map((row) =>
      row.map((val) => {
        const parsed = parseFloat(val);
        return Number.isFinite(parsed) ? parsed : 0;
      })
    );
  }, [rawMatrixB]);

  const vectorB: number[] = useMemo(() => {
    return rawVectorB.map((val) => {
      const parsed = parseFloat(val);
      return Number.isFinite(parsed) ? parsed : 0;
    });
  }, [rawVectorB]);

  // Selected Operations for Card 1 & Card 2
  const [binaryOp, setBinaryOp] = useState<"add" | "sub" | "multAB" | "multBA" | "hadamard" | "kronecker">("multAB");
  const [unaryOpA, setUnaryOpA] = useState<"det" | "inv" | "trans" | "rref" | "rank" | "trace" | "power2">("det");

  // Feedback states
  const [copiedBinary, setCopiedBinary] = useState<boolean>(false);
  const [copiedBinaryLatex, setCopiedBinaryLatex] = useState<boolean>(false);
  const [copiedUnary, setCopiedUnary] = useState<boolean>(false);
  const [copiedUnaryLatex, setCopiedUnaryLatex] = useState<boolean>(false);
  const [copiedSolver, setCopiedSolver] = useState<boolean>(false);
  const [copiedSolverLatex, setCopiedSolverLatex] = useState<boolean>(false);

  // Restore toast state
  const [restoreMessage, setRestoreMessage] = useState<string | null>(null);

  // Saved calculation states for Card 1, 2, 3
  const [savedBinaryItems, setSavedBinaryItems] = useState<SavedMatrixItem[]>([]);
  const [justSavedBinary, setJustSavedBinary] = useState<boolean>(false);

  const [savedUnaryItems, setSavedUnaryItems] = useState<SavedMatrixItem[]>([]);
  const [justSavedUnary, setJustSavedUnary] = useState<boolean>(false);

  const [savedSolverItems, setSavedSolverItems] = useState<SavedMatrixItem[]>([]);
  const [justSavedSolver, setJustSavedSolver] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const storedBinary = localStorage.getItem("saved_matrix_binary");
      if (storedBinary) setSavedBinaryItems(JSON.parse(storedBinary));

      const storedUnary = localStorage.getItem("saved_matrix_unary");
      if (storedUnary) setSavedUnaryItems(JSON.parse(storedUnary));

      const storedSolver = localStorage.getItem("saved_matrix_solver");
      if (storedSolver) setSavedSolverItems(JSON.parse(storedSolver));
    } catch (e) {}
  }, []);

  // Helper to resize raw string matrices smoothly
  const updateRawDimensions = (current: string[][], newRows: number, newCols: number): string[][] => {
    const r = Math.max(1, Math.min(10, newRows));
    const c = Math.max(1, Math.min(10, newCols));
    return Array.from({ length: r }, (_, i) =>
      Array.from({ length: c }, (_, j) => (current[i] && current[i][j] !== undefined ? current[i][j] : "0"))
    );
  };

  const handleRowsAChange = (delta: number) => {
    const nr = rowsA + delta;
    if (nr >= 1 && nr <= 10) {
      setRowsA(nr);
      setRawMatrixA((prev) => updateRawDimensions(prev, nr, colsA));
      setRawVectorB((prev) => {
        const next = [...prev];
        while (next.length < nr) next.push("1");
        return next.slice(0, nr);
      });
    }
  };

  const handleColsAChange = (delta: number) => {
    const nc = colsA + delta;
    if (nc >= 1 && nc <= 10) {
      setColsA(nc);
      setRawMatrixA((prev) => updateRawDimensions(prev, rowsA, nc));
    }
  };

  const handleRowsBChange = (delta: number) => {
    const nr = rowsB + delta;
    if (nr >= 1 && nr <= 10) {
      setRowsB(nr);
      setRawMatrixB((prev) => updateRawDimensions(prev, nr, colsB));
    }
  };

  const handleColsBChange = (delta: number) => {
    const nc = colsB + delta;
    if (nc >= 1 && nc <= 10) {
      setColsB(nc);
      setRawMatrixB((prev) => updateRawDimensions(prev, rowsB, nc));
    }
  };

  const handleCellChangeA = (r: number, c: number, val: string) => {
    setRawMatrixA((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = val;
      return next;
    });
  };

  const handleCellChangeB = (r: number, c: number, val: string) => {
    setRawMatrixB((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = val;
      return next;
    });
  };

  const handleVectorBChange = (idx: number, val: string) => {
    setRawVectorB((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  const handleSwapAB = () => {
    const tmpRaw = rawMatrixA;
    const tmpR = rowsA;
    const tmpC = colsA;

    setRawMatrixA(rawMatrixB);
    setRowsA(rowsB);
    setColsA(colsB);

    setRawMatrixB(tmpRaw);
    setRowsB(tmpR);
    setColsB(tmpC);
  };

  // Presets Handlers
  const applyPresetA = (type: "golden" | "identity" | "zero" | "random") => {
    if (type === "golden") {
      setRowsA(3);
      setColsA(3);
      setRawMatrixA([
        ["1", "2", "3"],
        ["0", "1", "4"],
        ["5", "6", "0"]
      ]);
      setRawVectorB(["1", "2", "3"]);
    } else if (type === "identity") {
      const dim = Math.max(rowsA, colsA);
      setRowsA(dim);
      setColsA(dim);
      const ident = createIdentityMatrix(dim);
      setRawMatrixA(ident.map((row) => row.map((v) => v.toString())));
    } else if (type === "zero") {
      const zeros = createZeroMatrix(rowsA, colsA);
      setRawMatrixA(zeros.map((row) => row.map((v) => v.toString())));
    } else if (type === "random") {
      const rnd = createRandomMatrix(rowsA, colsA);
      setRawMatrixA(rnd.map((row) => row.map((v) => v.toString())));
    }
  };

  const applyPresetB = (type: "golden" | "identity" | "zero" | "random") => {
    if (type === "golden") {
      setRowsB(3);
      setColsB(3);
      setRawMatrixB([
        ["2", "0", "-1"],
        ["1", "3", "2"],
        ["0", "-2", "1"]
      ]);
    } else if (type === "identity") {
      const dim = Math.max(rowsB, colsB);
      setRowsB(dim);
      setColsB(dim);
      const ident = createIdentityMatrix(dim);
      setRawMatrixB(ident.map((row) => row.map((v) => v.toString())));
    } else if (type === "zero") {
      const zeros = createZeroMatrix(rowsB, colsB);
      setRawMatrixB(zeros.map((row) => row.map((v) => v.toString())));
    } else if (type === "random") {
      const rnd = createRandomMatrix(rowsB, colsB);
      setRawMatrixB(rnd.map((row) => row.map((v) => v.toString())));
    }
  };

  // Card 1 Binary Result
  const binaryResult = useMemo(() => {
    try {
      if (binaryOp === "add") return { resultMatrix: addMatrices(matrixA, matrixB) };
      if (binaryOp === "sub") return { resultMatrix: subtractMatrices(matrixA, matrixB) };
      if (binaryOp === "multAB") return { resultMatrix: multiplyMatrices(matrixA, matrixB) };
      if (binaryOp === "multBA") return { resultMatrix: multiplyMatrices(matrixB, matrixA) };
      if (binaryOp === "hadamard") return { resultMatrix: hadamardProduct(matrixA, matrixB) };
      if (binaryOp === "kronecker") return { resultMatrix: kroneckerProduct(matrixA, matrixB) };
      return { resultMatrix: matrixA };
    } catch (err: any) {
      return { resultError: err.message || "Invalid Binary Matrix Operation" };
    }
  }, [binaryOp, matrixA, matrixB]);

  // Card 2 Unary Result
  const unaryResult = useMemo(() => {
    try {
      if (unaryOpA === "det") return { resultScalar: determinantMatrix(matrixA) };
      if (unaryOpA === "inv") return { resultMatrix: inverseMatrix(matrixA) };
      if (unaryOpA === "trans") return { resultMatrix: transposeMatrix(matrixA) };
      if (unaryOpA === "rref") return { resultMatrix: rrefMatrix(matrixA).rref };
      if (unaryOpA === "rank") return { resultScalar: rankMatrix(matrixA) };
      if (unaryOpA === "trace") return { resultScalar: traceMatrix(matrixA) };
      if (unaryOpA === "power2") return { resultMatrix: matrixPower(matrixA, 2) };
      return { resultMatrix: matrixA };
    } catch (err: any) {
      return { resultError: err.message || "Invalid Unary Matrix Operation" };
    }
  }, [unaryOpA, matrixA]);

  // Card 3 Linear Solver Result
  const solverResult = useMemo(() => {
    try {
      return solveLinearSystem(matrixA, vectorB);
    } catch (err: any) {
      return null;
    }
  }, [matrixA, vectorB]);

  const detA = useMemo(() => {
    try {
      return determinantMatrix(matrixA);
    } catch {
      return NaN;
    }
  }, [matrixA]);

  const rankA = useMemo(() => rankMatrix(matrixA), [matrixA]);
  const traceA = useMemo(() => traceMatrix(matrixA), [matrixA]);

  const copyToClipboard = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      navigator.clipboard.writeText(text);
      setFn(true);
      setTimeout(() => setFn(false), 2000);
    } catch (e) {}
  };

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Save Card 1 Handler
  const handleSaveBinary = () => {
    const inputsStr = `Matrix A (${rowsA}×${colsA}), Matrix B (${rowsB}×${colsB}), Op: ${binaryOp}`;
    const opStr = `Binary Matrix Operation (${binaryOp})`;
    const resStr = binaryResult.resultMatrix
      ? formatMatrixToCSV(binaryResult.resultMatrix).replace(/\n/g, "; ")
      : binaryResult.resultError || "N/A";
    const resList = [
      `Binary Operation = ${binaryOp}`,
      `Result Grid = ${resStr}`
    ];

    const newItem: SavedMatrixItem = {
      id: Date.now().toString(),
      title: `Binary Matrix (${binaryOp})`,
      inputs: inputsStr,
      operation: opStr,
      result: resStr,
      resultsList: resList,
      expression: `${binaryOp}(A, B)`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      snapshot: {
        rowsA,
        colsA,
        rawA: rawMatrixA,
        rowsB,
        colsB,
        rawB: rawMatrixB,
        binaryOp
      }
    };

    const updated = [newItem, ...savedBinaryItems.filter((item) => item.inputs !== inputsStr)].slice(0, 15);
    setSavedBinaryItems(updated);
    try {
      localStorage.setItem("saved_matrix_binary", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedBinary(true);
    setTimeout(() => setJustSavedBinary(false), 2000);
  };

  // Restore Card 1
  const handleRestoreBinary = (item: SavedMatrixItem) => {
    if (item.snapshot) {
      setRowsA(item.snapshot.rowsA);
      setColsA(item.snapshot.colsA);
      setRawMatrixA(item.snapshot.rawA);
      if (item.snapshot.rowsB && item.snapshot.colsB && item.snapshot.rawB) {
        setRowsB(item.snapshot.rowsB);
        setColsB(item.snapshot.colsB);
        setRawMatrixB(item.snapshot.rawB);
      }
      if (item.snapshot.binaryOp) {
        setBinaryOp(item.snapshot.binaryOp as any);
      }
    }
    setRestoreMessage(`Restored: ${item.title}`);
    setTimeout(() => setRestoreMessage(null), 3000);
  };

  // Save Card 2 Handler
  const handleSaveUnary = () => {
    const inputsStr = `Matrix A (${rowsA}×${colsA}), Operation: ${unaryOpA}`;
    const opStr = `Single Matrix Analysis (${unaryOpA})`;
    const resStr =
      unaryResult.resultScalar !== undefined
        ? unaryResult.resultScalar.toString()
        : unaryResult.resultMatrix
        ? formatMatrixToCSV(unaryResult.resultMatrix).replace(/\n/g, "; ")
        : unaryResult.resultError || "N/A";

    const resList = [
      `Operation = ${unaryOpA}`,
      `Result = ${resStr}`,
      `det(A) = ${Number.isNaN(detA) ? "N/A" : detA}`,
      `Rank(A) = ${rankA}`,
      `Trace(A) = ${Number.isNaN(traceA) ? "N/A" : traceA}`
    ];

    const newItem: SavedMatrixItem = {
      id: Date.now().toString(),
      title: `Analysis A (${unaryOpA})`,
      inputs: inputsStr,
      operation: opStr,
      result: resStr,
      resultsList: resList,
      expression: `${unaryOpA}(A) = ${resStr}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      snapshot: {
        rowsA,
        colsA,
        rawA: rawMatrixA,
        unaryOp: unaryOpA
      }
    };

    const updated = [newItem, ...savedUnaryItems.filter((item) => item.inputs !== inputsStr)].slice(0, 15);
    setSavedUnaryItems(updated);
    try {
      localStorage.setItem("saved_matrix_unary", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedUnary(true);
    setTimeout(() => setJustSavedUnary(false), 2000);
  };

  // Restore Card 2
  const handleRestoreUnary = (item: SavedMatrixItem) => {
    if (item.snapshot) {
      setRowsA(item.snapshot.rowsA);
      setColsA(item.snapshot.colsA);
      setRawMatrixA(item.snapshot.rawA);
      if (item.snapshot.unaryOp) {
        setUnaryOpA(item.snapshot.unaryOp as any);
      }
    }
    setRestoreMessage(`Restored: ${item.title}`);
    setTimeout(() => setRestoreMessage(null), 3000);
  };

  // Save Card 3 Handler
  const handleSaveSolver = () => {
    const inputsStr = `Coefficients A (${rowsA}×${colsA}), Vector b: [${rawVectorB.join(", ")}]`;
    const opStr = `Linear System Solver (Ax = b)`;
    const solStr = solverResult ? solverResult.solutionString : "N/A";
    const resList = [
      `System Solution = ${solStr}`,
      `Solvability = ${
        solverResult
          ? solverResult.hasSolution
            ? solverResult.isUnique
              ? "Unique Solution"
              : "Infinite Solutions"
            : "Inconsistent System"
          : "N/A"
      }`
    ];

    const newItem: SavedMatrixItem = {
      id: Date.now().toString(),
      title: `Linear System (Ax = b)`,
      inputs: inputsStr,
      operation: opStr,
      result: solStr,
      resultsList: resList,
      expression: `Ax = b ➔ ${solStr}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      snapshot: {
        rowsA,
        colsA,
        rawA: rawMatrixA,
        rawVectorB
      }
    };

    const updated = [newItem, ...savedSolverItems.filter((item) => item.inputs !== inputsStr)].slice(0, 15);
    setSavedSolverItems(updated);
    try {
      localStorage.setItem("saved_matrix_solver", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedSolver(true);
    setTimeout(() => setJustSavedSolver(false), 2000);
  };

  // Restore Card 3
  const handleRestoreSolver = (item: SavedMatrixItem) => {
    if (item.snapshot) {
      setRowsA(item.snapshot.rowsA);
      setColsA(item.snapshot.colsA);
      setRawMatrixA(item.snapshot.rawA);
      if (item.snapshot.rawVectorB) {
        setRawVectorB(item.snapshot.rawVectorB);
      }
    }
    setRestoreMessage(`Restored: ${item.title}`);
    setTimeout(() => setRestoreMessage(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* RESTORE NOTIFICATION TOAST */}
      {restoreMessage && (
        <div className="no-print fixed bottom-5 right-5 z-50 bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3">
          <RotateCcw className="w-4 h-4" />
          <span>{restoreMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CARD 1: DUAL MATRIX ARITHMETIC & BINARY WORKSTATION (A & B) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print-card">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Dual Matrix Arithmetic &amp; Binary Workstation (A &amp; B)</span>
          <button
            type="button"
            onClick={handleSaveBinary}
            className="no-print bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBinary ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* MATRIX A CARD */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Matrix A ({rowsA} &times; {colsA})
                </h2>
                <div className="no-print flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-1">
                    <span>Rows:</span>
                    <button
                      type="button"
                      onClick={() => handleRowsAChange(-1)}
                      disabled={rowsA <= 1}
                      className="p-1 rounded bg-slate-200 dark:bg-slate-800 disabled:opacity-40 cursor-pointer"
                      title="Decrease Rows"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-4 text-center font-mono">{rowsA}</span>
                    <button
                      type="button"
                      onClick={() => handleRowsAChange(1)}
                      disabled={rowsA >= 10}
                      className="p-1 rounded bg-slate-200 dark:bg-slate-800 disabled:opacity-40 cursor-pointer"
                      title="Increase Rows"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Cols:</span>
                    <button
                      type="button"
                      onClick={() => handleColsAChange(-1)}
                      disabled={colsA <= 1}
                      className="p-1 rounded bg-slate-200 dark:bg-slate-800 disabled:opacity-40 cursor-pointer"
                      title="Decrease Columns"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-4 text-center font-mono">{colsA}</span>
                    <button
                      type="button"
                      onClick={() => handleColsAChange(1)}
                      disabled={colsA >= 10}
                      className="p-1 rounded bg-slate-200 dark:bg-slate-800 disabled:opacity-40 cursor-pointer"
                      title="Increase Columns"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* QUICK PRESETS FOR MATRIX A */}
              <div className="no-print flex items-center gap-1.5 flex-wrap text-[11px] font-semibold">
                <span className="text-[10px] uppercase font-bold text-slate-400">Presets:</span>
                <button
                  type="button"
                  onClick={() => applyPresetA("golden")}
                  className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  Golden (3×3)
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetA("identity")}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Identity (I)
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetA("zero")}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Zero
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetA("random")}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Shuffle className="w-2.5 h-2.5" /> Random
                </button>
              </div>

              <div className="overflow-x-auto py-1">
                <div className="inline-block min-w-full">
                  <div
                    className="grid matrix-grid gap-1.5 justify-center"
                    style={{ gridTemplateColumns: `repeat(${colsA}, minmax(42px, 60px))` }}
                  >
                    {rawMatrixA.map((row, r) =>
                      row.map((val, c) => (
                        <input
                          key={`A1-${r}-${c}`}
                          type="text"
                          inputMode="decimal"
                          value={val}
                          onChange={(e) => handleCellChangeA(r, c, e.target.value)}
                          aria-label={`Matrix A Row ${r + 1} Column ${c + 1}`}
                          className="w-full matrix-cell-print bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-1.5 px-1 text-center font-mono font-bold text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* MATRIX B CARD */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Matrix B ({rowsB} &times; {colsB})
                </h2>
                <div className="no-print flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-1">
                    <span>Rows:</span>
                    <button
                      type="button"
                      onClick={() => handleRowsBChange(-1)}
                      disabled={rowsB <= 1}
                      className="p-1 rounded bg-slate-200 dark:bg-slate-800 disabled:opacity-40 cursor-pointer"
                      title="Decrease Rows"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-4 text-center font-mono">{rowsB}</span>
                    <button
                      type="button"
                      onClick={() => handleRowsBChange(1)}
                      disabled={rowsB >= 10}
                      className="p-1 rounded bg-slate-200 dark:bg-slate-800 disabled:opacity-40 cursor-pointer"
                      title="Increase Rows"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Cols:</span>
                    <button
                      type="button"
                      onClick={() => handleColsBChange(-1)}
                      disabled={colsB <= 1}
                      className="p-1 rounded bg-slate-200 dark:bg-slate-800 disabled:opacity-40 cursor-pointer"
                      title="Decrease Columns"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-4 text-center font-mono">{colsB}</span>
                    <button
                      type="button"
                      onClick={() => handleColsBChange(1)}
                      disabled={colsB >= 10}
                      className="p-1 rounded bg-slate-200 dark:bg-slate-800 disabled:opacity-40 cursor-pointer"
                      title="Increase Columns"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* QUICK PRESETS FOR MATRIX B */}
              <div className="no-print flex items-center gap-1.5 flex-wrap text-[11px] font-semibold">
                <span className="text-[10px] uppercase font-bold text-slate-400">Presets:</span>
                <button
                  type="button"
                  onClick={() => applyPresetB("golden")}
                  className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  Golden (3×3)
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetB("identity")}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Identity (I)
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetB("zero")}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Zero
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetB("random")}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Shuffle className="w-2.5 h-2.5" /> Random
                </button>
              </div>

              <div className="overflow-x-auto py-1">
                <div className="inline-block min-w-full">
                  <div
                    className="grid matrix-grid gap-1.5 justify-center"
                    style={{ gridTemplateColumns: `repeat(${colsB}, minmax(42px, 60px))` }}
                  >
                    {rawMatrixB.map((row, r) =>
                      row.map((val, c) => (
                        <input
                          key={`B1-${r}-${c}`}
                          type="text"
                          inputMode="decimal"
                          value={val}
                          onChange={(e) => handleCellChangeB(r, c, e.target.value)}
                          aria-label={`Matrix B Row ${r + 1} Column ${c + 1}`}
                          className="w-full matrix-cell-print bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-1.5 px-1 text-center font-mono font-bold text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="no-print flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleSwapAB}
                  className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-indigo-100 transition-colors"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>Swap A ⇄ B</span>
                </button>
              </div>
            </div>
          </div>

          {/* BINARY OPERATIONS TOOLBAR */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                Select Binary Operation
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {binaryOp === "hadamard"
                  ? "Hadamard (c_ij = a_ij × b_ij)"
                  : binaryOp === "kronecker"
                  ? "Kronecker Tensor (A ⊗ B)"
                  : binaryOp === "multBA"
                  ? "Reverse Multiplication (B × A)"
                  : ""}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              <button
                type="button"
                onClick={() => setBinaryOp("multAB")}
                className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  binaryOp === "multAB"
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                }`}
              >
                A &times; B
              </button>
              <button
                type="button"
                onClick={() => setBinaryOp("add")}
                className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  binaryOp === "add"
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                }`}
              >
                A + B
              </button>
              <button
                type="button"
                onClick={() => setBinaryOp("sub")}
                className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  binaryOp === "sub"
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                }`}
              >
                A - B
              </button>
              <button
                type="button"
                onClick={() => setBinaryOp("multBA")}
                className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  binaryOp === "multBA"
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                }`}
              >
                B &times; A
              </button>
              <button
                type="button"
                onClick={() => setBinaryOp("hadamard")}
                className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  binaryOp === "hadamard"
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                }`}
              >
                A &compfn; B (Hadamard)
              </button>
              <button
                type="button"
                onClick={() => setBinaryOp("kronecker")}
                className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  binaryOp === "kronecker"
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                }`}
              >
                A &otimes; B
              </button>
            </div>
          </div>

          {/* BINARY RESULT DISPLAY */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Binary Result Output ({binaryOp === "multAB" ? "A × B" : binaryOp === "multBA" ? "B × A" : binaryOp === "add" ? "A + B" : binaryOp === "sub" ? "A - B" : binaryOp === "hadamard" ? "A ∘ B" : "A ⊗ B"})
                </span>
                {binaryResult.resultMatrix && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {binaryResult.resultMatrix.length} &times; {binaryResult.resultMatrix[0].length}
                  </span>
                )}
              </div>

              {/* ACTION BUTTONS: COPY, LATEX, CSV */}
              {binaryResult.resultMatrix && (
                <div className="no-print flex items-center gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      const matStr = binaryResult.resultMatrix!.map((r) => r.join("\t")).join("\n");
                      copyToClipboard(matStr, setCopiedBinary);
                    }}
                    className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1 cursor-pointer font-semibold"
                    title="Copy Result Matrix to Clipboard"
                  >
                    {copiedBinary ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedBinary ? "Copied" : "Copy"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const latex = formatMatrixToLaTeX(binaryResult.resultMatrix!);
                      copyToClipboard(latex, setCopiedBinaryLatex);
                    }}
                    className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1 cursor-pointer font-semibold"
                    title="Copy Result as LaTeX Matrix"
                  >
                    {copiedBinaryLatex ? <Check className="w-3 h-3 text-emerald-500" /> : <Code2 className="w-3 h-3" />}
                    <span>{copiedBinaryLatex ? "Copied LaTeX" : "LaTeX"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const csvContent = formatMatrixToCSV(binaryResult.resultMatrix!);
                      downloadCSV(csvContent, `matrix_${binaryOp}_result.csv`);
                    }}
                    className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1 cursor-pointer font-semibold"
                    title="Export Matrix as CSV"
                  >
                    <Download className="w-3 h-3" />
                    <span>CSV</span>
                  </button>
                </div>
              )}
            </div>

            {binaryResult.resultError ? (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs font-bold">
                {binaryResult.resultError}
              </div>
            ) : binaryResult.resultMatrix ? (
              <div className="overflow-x-auto py-2">
                <div className="inline-block min-w-full">
                  <div
                    className="grid matrix-grid gap-1.5 justify-center border-l-2 border-r-2 border-blue-600 px-3 py-2 rounded-lg bg-white dark:bg-slate-900"
                    style={{ gridTemplateColumns: `repeat(${binaryResult.resultMatrix[0].length}, minmax(44px, 56px))` }}
                  >
                    {binaryResult.resultMatrix.map((row, r) =>
                      row.map((val, c) => (
                        <div
                          key={`R1-${r}-${c}`}
                          className="matrix-cell-print text-center font-mono font-bold text-xs py-1.5 text-slate-900 dark:text-slate-100"
                        >
                          {val}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* EMBEDDED SAVED BINARY MATRIX OPERATIONS INSIDE CARD 1 */}
          {savedBinaryItems.length > 0 && (
            <div className="no-print bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Binary Operations ({savedBinaryItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedBinaryItems([]);
                    try {
                      localStorage.removeItem("saved_matrix_binary");
                    } catch (e) {}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedBinaryItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts =
                    item.resultsList ??
                    (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
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
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleRestoreBinary(item)}
                            className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Restore calculation into workstation"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedBinaryItems.filter((i) => i.id !== item.id);
                              setSavedBinaryItems(updated);
                              try {
                                localStorage.setItem("saved_matrix_binary", JSON.stringify(updated));
                              } catch (e) {}
                            }}
                            className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">
                            {item.inputs || item.expression}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 text-blue-600" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-blue-600" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div
                                  key={idx}
                                  className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug"
                                >
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
      {/* CARD 2: SINGLE MATRIX ANALYSIS & TRANSFORMATIONS (MATRIX A) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print-card">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Single Matrix Analysis &amp; Transformations (Matrix A)</span>
          <button
            type="button"
            onClick={handleSaveUnary}
            className="no-print bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedUnary ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Matrix A Operations
              </h2>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setUnaryOpA("det")}
                    className={`py-2 px-2.5 rounded-xl border cursor-pointer transition-all ${
                      unaryOpA === "det"
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    det(A)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnaryOpA("inv")}
                    className={`py-2 px-2.5 rounded-xl border cursor-pointer transition-all ${
                      unaryOpA === "inv"
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    Inverse A⁻¹
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnaryOpA("rref")}
                    className={`py-2 px-2.5 rounded-xl border cursor-pointer transition-all ${
                      unaryOpA === "rref"
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    RREF(A)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnaryOpA("trans")}
                    className={`py-2 px-2.5 rounded-xl border cursor-pointer transition-all ${
                      unaryOpA === "trans"
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    Transpose Aᵀ
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnaryOpA("rank")}
                    className={`py-2 px-2.5 rounded-xl border cursor-pointer transition-all ${
                      unaryOpA === "rank"
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    Rank(A)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnaryOpA("trace")}
                    className={`py-2 px-2.5 rounded-xl border cursor-pointer transition-all ${
                      unaryOpA === "trace"
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    Trace(A)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnaryOpA("power2")}
                    className={`col-span-2 py-2 px-2.5 rounded-xl border cursor-pointer transition-all ${
                      unaryOpA === "power2"
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    Matrix Square A² (A &times; A)
                  </button>
                </div>
              </div>

              {/* DYNAMIC MATRIX A HEATMAP / SPARSITY VISUALIZER */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Matrix A Structure Visualizer
                </span>
                <div
                  className="grid gap-1 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 justify-center"
                  style={{ gridTemplateColumns: `repeat(${colsA}, minmax(18px, 24px))` }}
                >
                  {matrixA.map((row, r) =>
                    row.map((val, c) => {
                      const bgClass =
                        val > 0
                          ? "bg-blue-500 text-white"
                          : val < 0
                          ? "bg-rose-500 text-white"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-400";
                      return (
                        <div
                          key={`hm-${r}-${c}`}
                          className={`h-5 w-5 rounded flex items-center justify-center font-mono text-[9px] font-bold ${bgClass}`}
                          title={`A[${r + 1},${c + 1}] = ${val}`}
                        >
                          {val > 0 ? "+" : val < 0 ? "-" : "0"}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: UNARY OUTPUT & METRICS */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Unary Operation Result ({unaryOpA})
                    </span>

                    {/* ACTION BUTTONS: COPY, LATEX, CSV */}
                    <div className="no-print flex items-center gap-1.5 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          const str =
                            unaryResult.resultScalar !== undefined
                              ? `${unaryOpA}(A) = ${unaryResult.resultScalar}`
                              : unaryResult.resultMatrix
                              ? unaryResult.resultMatrix.map((r) => r.join("\t")).join("\n")
                              : "";
                          copyToClipboard(str, setCopiedUnary);
                        }}
                        className="px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1 cursor-pointer font-semibold text-[11px]"
                        title="Copy Result to Clipboard"
                      >
                        {copiedUnary ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedUnary ? "Copied" : "Copy"}</span>
                      </button>

                      {unaryResult.resultMatrix && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              const latex = formatMatrixToLaTeX(unaryResult.resultMatrix!);
                              copyToClipboard(latex, setCopiedUnaryLatex);
                            }}
                            className="px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1 cursor-pointer font-semibold text-[11px]"
                            title="Copy Result as LaTeX"
                          >
                            {copiedUnaryLatex ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Code2 className="w-3 h-3" />
                            )}
                            <span>{copiedUnaryLatex ? "Copied LaTeX" : "LaTeX"}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const csvContent = formatMatrixToCSV(unaryResult.resultMatrix!);
                              downloadCSV(csvContent, `matrix_A_${unaryOpA}.csv`);
                            }}
                            className="px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1 cursor-pointer font-semibold text-[11px]"
                            title="Download CSV"
                          >
                            <Download className="w-3 h-3" />
                            <span>CSV</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {unaryResult.resultError ? (
                    <p className="text-xs font-bold text-rose-500">{unaryResult.resultError}</p>
                  ) : unaryResult.resultScalar !== undefined ? (
                    <div className="text-3xl font-mono font-bold text-slate-900 dark:text-slate-100 py-1">
                      {unaryResult.resultScalar}
                    </div>
                  ) : unaryResult.resultMatrix ? (
                    <div className="overflow-x-auto py-1">
                      <div
                        className="grid matrix-grid gap-1.5 justify-center border-l-2 border-r-2 border-blue-600 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800"
                        style={{ gridTemplateColumns: `repeat(${unaryResult.resultMatrix[0].length}, minmax(40px, 50px))` }}
                      >
                        {unaryResult.resultMatrix.map((row, r) =>
                          row.map((val, c) => (
                            <div
                              key={`R2-${r}-${c}`}
                              className="matrix-cell-print text-center font-mono font-bold text-xs py-1 text-slate-900 dark:text-slate-100"
                            >
                              {val}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">det(A)</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{Number.isNaN(detA) ? "N/A" : detA}</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Rank(A)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{rankA}</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Trace(A)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{Number.isNaN(traceA) ? "N/A" : traceA}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED UNARY SOLVES INSIDE CARD 2 */}
          {savedUnaryItems.length > 0 && (
            <div className="no-print bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Matrix Analytics ({savedUnaryItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedUnaryItems([]);
                    try {
                      localStorage.removeItem("saved_matrix_unary");
                    } catch (e) {}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedUnaryItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts =
                    item.resultsList ??
                    (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
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
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleRestoreUnary(item)}
                            className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Restore calculation into workstation"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedUnaryItems.filter((i) => i.id !== item.id);
                              setSavedUnaryItems(updated);
                              try {
                                localStorage.setItem("saved_matrix_unary", JSON.stringify(updated));
                              } catch (e) {}
                            }}
                            className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">
                            {item.inputs || item.expression}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 text-blue-600" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-blue-600" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div
                                  key={idx}
                                  className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug"
                                >
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
      {/* CARD 3: LINEAR SYSTEM SOLVER (Ax = b) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print-card">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Linear System Solver (Ax = b)</span>
          <button
            type="button"
            onClick={handleSaveSolver}
            className="no-print bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedSolver ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Vector b Constants ({rowsA} Elements)
              </h2>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Right-hand Vector b:
                </label>
                <div
                  className="grid matrix-grid gap-2"
                  style={{ gridTemplateColumns: `repeat(${Math.min(rowsA, 5)}, 1fr)` }}
                >
                  {rawVectorB.map((val, idx) => (
                    <div key={`vb-${idx}`} className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 block">b{idx + 1}</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={val}
                        onChange={(e) => handleVectorBChange(idx, e.target.value)}
                        aria-label={`Vector b element ${idx + 1}`}
                        className="w-full matrix-cell-print bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-2 py-1.5 text-center font-mono font-bold text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SOLVER OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      System Solution Vector x
                    </span>

                    {/* ACTION BUTTONS: COPY, LATEX, CSV */}
                    {solverResult && (
                      <div className="no-print flex items-center gap-1.5 text-xs">
                        <button
                          type="button"
                          onClick={() => {
                            copyToClipboard(solverResult.solutionString, setCopiedSolver);
                          }}
                          className="px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1 cursor-pointer font-semibold text-[11px]"
                          title="Copy Solution to Clipboard"
                        >
                          {copiedSolver ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedSolver ? "Copied" : "Copy"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const vecLatex = solverResult.solutionVector
                              ? `\\mathbf{x} = \\begin{bmatrix} ${solverResult.solutionVector.join(" \\\\ ")} \\end{bmatrix}`
                              : solverResult.solutionString;
                            copyToClipboard(vecLatex, setCopiedSolverLatex);
                          }}
                          className="px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1 cursor-pointer font-semibold text-[11px]"
                          title="Copy Solution as LaTeX"
                        >
                          {copiedSolverLatex ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Code2 className="w-3 h-3" />
                          )}
                          <span>{copiedSolverLatex ? "Copied LaTeX" : "LaTeX"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const csv = `Variable,Value\n${
                              solverResult.solutionVector
                                ? solverResult.solutionVector.map((v, i) => `x${i + 1},${v}`).join("\n")
                                : `Status,"${solverResult.solutionString}"`
                            }`;
                            downloadCSV(csv, `linear_system_solution.csv`);
                          }}
                          className="px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1 cursor-pointer font-semibold text-[11px]"
                          title="Download CSV"
                        >
                          <Download className="w-3 h-3" />
                          <span>CSV</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="text-xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all py-1">
                    {solverResult ? solverResult.solutionString : "N/A"}
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase">Solvability Status</span>
                  <span
                    className={`font-mono font-bold ${
                      solverResult
                        ? solverResult.hasSolution
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-rose-600 dark:text-rose-400"
                        : "text-slate-500"
                    }`}
                  >
                    {solverResult
                      ? solverResult.hasSolution
                        ? solverResult.isUnique
                          ? "Unique Solution (Consistent System)"
                          : "Infinitely Many Solutions (Underdetermined System)"
                        : "No Solution (Inconsistent System)"
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED LINEAR SYSTEM SOLVES INSIDE CARD 3 */}
          {savedSolverItems.length > 0 && (
            <div className="no-print bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Linear System Solves ({savedSolverItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedSolverItems([]);
                    try {
                      localStorage.removeItem("saved_matrix_solver");
                    } catch (e) {}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedSolverItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts =
                    item.resultsList ??
                    (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
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
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleRestoreSolver(item)}
                            className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Restore calculation into workstation"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedSolverItems.filter((i) => i.id !== item.id);
                              setSavedSolverItems(updated);
                              try {
                                localStorage.setItem("saved_matrix_solver", JSON.stringify(updated));
                              } catch (e) {}
                            }}
                            className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">
                            {item.inputs || item.expression}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 text-blue-600" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-blue-600" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div
                                  key={idx}
                                  className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug"
                                >
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

export default MatrixCalculator;
