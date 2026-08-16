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
  ChevronUp
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
}

export function MatrixCalculator() {
  // Dimensions for Matrix A & B
  const [rowsA, setRowsA] = useState<number>(3);
  const [colsA, setColsA] = useState<number>(3);
  const [rowsB, setRowsB] = useState<number>(3);
  const [colsB, setColsB] = useState<number>(3);

  // Matrix A & B State
  const [matrixA, setMatrixA] = useState<Matrix>([
    [1, 2, 3],
    [0, 1, 4],
    [5, 6, 0]
  ]);

  const [matrixB, setMatrixB] = useState<Matrix>([
    [2, 0, -1],
    [1, 3, 2],
    [0, -2, 1]
  ]);

  // Constants vector b for Ax = b solver
  const [vectorB, setVectorB] = useState<number[]>([1, 2, 3]);

  // Selected Operations for Card 1 & Card 2
  const [binaryOp, setBinaryOp] = useState<"add" | "sub" | "multAB" | "multBA" | "hadamard" | "kronecker">("multAB");
  const [unaryOpA, setUnaryOpA] = useState<"det" | "inv" | "trans" | "rref" | "rank" | "trace" | "power2">("det");

  // Feedback states
  const [copiedResult, setCopiedResult] = useState<boolean>(false);
  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);
  const [copiedCsv, setCopiedCsv] = useState<boolean>(false);

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
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
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

  // Resize Handlers
  const updateMatrixDimensions = (
    currentMat: Matrix,
    newRows: number,
    newCols: number
  ): Matrix => {
    const r = Math.max(1, Math.min(6, newRows));
    const c = Math.max(1, Math.min(6, newCols));
    const newMat = createZeroMatrix(r, c);

    for (let i = 0; i < Math.min(currentMat.length, r); i++) {
      for (let j = 0; j < Math.min(currentMat[0].length, c); j++) {
        newMat[i][j] = currentMat[i][j];
      }
    }
    return newMat;
  };

  const handleRowsAChange = (delta: number) => {
    const nr = rowsA + delta;
    if (nr >= 1 && nr <= 6) {
      setRowsA(nr);
      setMatrixA((prev) => updateMatrixDimensions(prev, nr, colsA));
      setVectorB(Array(nr).fill(1));
    }
  };

  const handleColsAChange = (delta: number) => {
    const nc = colsA + delta;
    if (nc >= 1 && nc <= 6) {
      setColsA(nc);
      setMatrixA((prev) => updateMatrixDimensions(prev, rowsA, nc));
    }
  };

  const handleRowsBChange = (delta: number) => {
    const nr = rowsB + delta;
    if (nr >= 1 && nr <= 6) {
      setRowsB(nr);
      setMatrixB((prev) => updateMatrixDimensions(prev, nr, colsB));
    }
  };

  const handleColsBChange = (delta: number) => {
    const nc = colsB + delta;
    if (nc >= 1 && nc <= 6) {
      setColsB(nc);
      setMatrixB((prev) => updateMatrixDimensions(prev, rowsB, nc));
    }
  };

  const handleCellChangeA = (r: number, c: number, val: string) => {
    const num = parseFloat(val) || 0;
    setMatrixA((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = num;
      return next;
    });
  };

  const handleCellChangeB = (r: number, c: number, val: string) => {
    const num = parseFloat(val) || 0;
    setMatrixB((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = num;
      return next;
    });
  };

  const handleVectorBChange = (idx: number, val: string) => {
    const num = parseFloat(val) || 0;
    setVectorB((prev) => {
      const next = [...prev];
      next[idx] = num;
      return next;
    });
  };

  const handleSwapAB = () => {
    const tmpMat = matrixA;
    const tmpR = rowsA;
    const tmpC = colsA;

    setMatrixA(matrixB);
    setRowsA(rowsB);
    setColsA(colsB);

    setMatrixB(tmpMat);
    setRowsB(tmpR);
    setColsB(tmpC);
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
    try { return determinantMatrix(matrixA); } catch { return NaN; }
  }, [matrixA]);

  const rankA = useMemo(() => rankMatrix(matrixA), [matrixA]);
  const traceA = useMemo(() => traceMatrix(matrixA), [matrixA]);

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      navigator.clipboard.writeText(text);
      setFn(true);
      setTimeout(() => setFn(false), 2000);
    } catch (e) {}
  };

  // Save Card 1 Handler
  const handleSaveBinary = () => {
    const inputsStr = `Matrix A (${rowsA}x${colsA}), Matrix B (${rowsB}x${colsB}), Op: ${binaryOp}`;
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
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedBinaryItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedBinaryItems(updated);
    try {
      localStorage.setItem("saved_matrix_binary", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedBinary(true);
    setTimeout(() => setJustSavedBinary(false), 2000);
  };

  // Save Card 2 Handler
  const handleSaveUnary = () => {
    const inputsStr = `Matrix A (${rowsA}x${colsA}), Operation: ${unaryOpA}`;
    const opStr = `Single Matrix Analysis (${unaryOpA})`;
    const resStr = unaryResult.resultScalar !== undefined
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
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedUnaryItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedUnaryItems(updated);
    try {
      localStorage.setItem("saved_matrix_unary", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedUnary(true);
    setTimeout(() => setJustSavedUnary(false), 2000);
  };

  // Save Card 3 Handler
  const handleSaveSolver = () => {
    const inputsStr = `Coefficients A (${rowsA}x${colsA}), Vector b: [${vectorB.join(", ")}]`;
    const opStr = `Linear System Solver (Ax = b)`;
    const solStr = solverResult ? solverResult.solutionString : "N/A";
    const resList = [
      `System Solution = ${solStr}`,
      `Solvability = ${solverResult ? (solverResult.hasSolution ? (solverResult.isUnique ? "Unique Solution" : "Infinite Solutions") : "Inconsistent System") : "N/A"}`
    ];

    const newItem: SavedMatrixItem = {
      id: Date.now().toString(),
      title: `Linear System (Ax = b)`,
      inputs: inputsStr,
      operation: opStr,
      result: solStr,
      resultsList: resList,
      expression: `Ax = b ➔ ${solStr}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedSolverItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedSolverItems(updated);
    try {
      localStorage.setItem("saved_matrix_solver", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedSolver(true);
    setTimeout(() => setJustSavedSolver(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: DUAL MATRIX ARITHMETIC & BINARY WORKSTATION (A & B) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Dual Matrix Arithmetic &amp; Binary Workstation (A &amp; B)</span>
          <button
            type="button"
            onClick={handleSaveBinary}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
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
                <div className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-1">
                    <span>Rows:</span>
                    <button type="button" onClick={() => handleRowsAChange(-1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800 cursor-pointer"><Minus className="h-3 w-3" /></button>
                    <span className="w-4 text-center font-mono">{rowsA}</span>
                    <button type="button" onClick={() => handleRowsAChange(1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800 cursor-pointer"><Plus className="h-3 w-3" /></button>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Cols:</span>
                    <button type="button" onClick={() => handleColsAChange(-1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800 cursor-pointer"><Minus className="h-3 w-3" /></button>
                    <span className="w-4 text-center font-mono">{colsA}</span>
                    <button type="button" onClick={() => handleColsAChange(1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800 cursor-pointer"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto py-1">
                <div className="inline-block min-w-full">
                  <div
                    className="grid gap-1.5 justify-center"
                    style={{ gridTemplateColumns: `repeat(${colsA}, minmax(48px, 64px))` }}
                  >
                    {matrixA.map((row, r) =>
                      row.map((val, c) => (
                        <input
                          key={`A1-${r}-${c}`}
                          type="number"
                          step="any"
                          value={val}
                          onChange={(e) => handleCellChangeA(r, c, e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-1.5 px-1 text-center font-mono font-bold text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-600"
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
                <div className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-1">
                    <span>Rows:</span>
                    <button type="button" onClick={() => handleRowsBChange(-1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800 cursor-pointer"><Minus className="h-3 w-3" /></button>
                    <span className="w-4 text-center font-mono">{rowsB}</span>
                    <button type="button" onClick={() => handleRowsBChange(1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800 cursor-pointer"><Plus className="h-3 w-3" /></button>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Cols:</span>
                    <button type="button" onClick={() => handleColsBChange(-1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800 cursor-pointer"><Minus className="h-3 w-3" /></button>
                    <span className="w-4 text-center font-mono">{colsB}</span>
                    <button type="button" onClick={() => handleColsBChange(1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800 cursor-pointer"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto py-1">
                <div className="inline-block min-w-full">
                  <div
                    className="grid gap-1.5 justify-center"
                    style={{ gridTemplateColumns: `repeat(${colsB}, minmax(48px, 64px))` }}
                  >
                    {matrixB.map((row, r) =>
                      row.map((val, c) => (
                        <input
                          key={`B1-${r}-${c}`}
                          type="number"
                          step="any"
                          value={val}
                          onChange={(e) => handleCellChangeB(r, c, e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-1.5 px-1 text-center font-mono font-bold text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button type="button" onClick={handleSwapAB} className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer">
                  Swap A &leftrightarrow; B
                </button>
              </div>
            </div>
          </div>

          {/* BINARY OPERATIONS TOOLBAR */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
              Select Binary Operation
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              <button
                type="button"
                onClick={() => setBinaryOp("multAB")}
                className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  binaryOp === "multAB" ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                }`}
              >
                A &times; B
              </button>
              <button
                type="button"
                onClick={() => setBinaryOp("add")}
                className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  binaryOp === "add" ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                }`}
              >
                A + B
              </button>
              <button
                type="button"
                onClick={() => setBinaryOp("sub")}
                className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  binaryOp === "sub" ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                }`}
              >
                A - B
              </button>
              <button
                type="button"
                onClick={() => setBinaryOp("multBA")}
                className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  binaryOp === "multBA" ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                }`}
              >
                B &times; A
              </button>
              <button
                type="button"
                onClick={() => setBinaryOp("hadamard")}
                className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  binaryOp === "hadamard" ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                }`}
              >
                A &circ; B
              </button>
              <button
                type="button"
                onClick={() => setBinaryOp("kronecker")}
                className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  binaryOp === "kronecker" ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                }`}
              >
                A &otimes; B
              </button>
            </div>
          </div>

          {/* BINARY RESULT DISPLAY */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Binary Result Output
              </span>
              {binaryResult.resultMatrix && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  {binaryResult.resultMatrix.length} &times; {binaryResult.resultMatrix[0].length}
                </span>
              )}
            </div>

            {binaryResult.resultError ? (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold">
                {binaryResult.resultError}
              </div>
            ) : binaryResult.resultMatrix ? (
              <div className="overflow-x-auto py-2">
                <div className="inline-block min-w-full">
                  <div
                    className="grid gap-1.5 justify-center border-l-2 border-r-2 border-blue-600 px-3 py-2 rounded-lg bg-white dark:bg-slate-900"
                    style={{ gridTemplateColumns: `repeat(${binaryResult.resultMatrix[0].length}, minmax(44px, 56px))` }}
                  >
                    {binaryResult.resultMatrix.map((row, r) =>
                      row.map((val, c) => (
                        <div key={`R1-${r}-${c}`} className="text-center font-mono font-bold text-xs py-1.5 text-slate-900 dark:text-slate-100">
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
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Binary Operations ({savedBinaryItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedBinaryItems([]);
                    try { localStorage.removeItem("saved_matrix_binary"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedBinaryItems.map((item) => {
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
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedBinaryItems.filter(i => i.id !== item.id);
                            setSavedBinaryItems(updated);
                            try { localStorage.setItem("saved_matrix_binary", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
      {/* CARD 2: SINGLE MATRIX ANALYSIS & TRANSFORMATIONS (MATRIX A) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Single Matrix Analysis &amp; Transformations (Matrix A)</span>
          <button
            type="button"
            onClick={handleSaveUnary}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
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
                    className={`py-2 px-2.5 rounded-xl border cursor-pointer ${unaryOpA === "det" ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"}`}
                  >
                    det(A)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnaryOpA("inv")}
                    className={`py-2 px-2.5 rounded-xl border cursor-pointer ${unaryOpA === "inv" ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"}`}
                  >
                    Inverse A⁻¹
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnaryOpA("rref")}
                    className={`py-2 px-2.5 rounded-xl border cursor-pointer ${unaryOpA === "rref" ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"}`}
                  >
                    RREF(A)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnaryOpA("trans")}
                    className={`py-2 px-2.5 rounded-xl border cursor-pointer ${unaryOpA === "trans" ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"}`}
                  >
                    Transpose Aᵀ
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnaryOpA("rank")}
                    className={`py-2 px-2.5 rounded-xl border cursor-pointer ${unaryOpA === "rank" ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"}`}
                  >
                    Rank(A)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnaryOpA("trace")}
                    className={`py-2 px-2.5 rounded-xl border cursor-pointer ${unaryOpA === "trace" ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"}`}
                  >
                    Trace(A)
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: UNARY OUTPUT & METRICS */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Unary Operation Result ({unaryOpA})
                  </span>
                  {unaryResult.resultError ? (
                    <p className="text-xs font-bold text-rose-500">{unaryResult.resultError}</p>
                  ) : unaryResult.resultScalar !== undefined ? (
                    <div className="text-3xl font-mono font-bold text-slate-900 dark:text-slate-100">{unaryResult.resultScalar}</div>
                  ) : unaryResult.resultMatrix ? (
                    <div className="overflow-x-auto py-1">
                      <div
                        className="grid gap-1.5 justify-center border-l-2 border-r-2 border-blue-600 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800"
                        style={{ gridTemplateColumns: `repeat(${unaryResult.resultMatrix[0].length}, minmax(40px, 50px))` }}
                      >
                        {unaryResult.resultMatrix.map((row, r) =>
                          row.map((val, c) => (
                            <div key={`R2-${r}-${c}`} className="text-center font-mono font-bold text-xs py-1 text-slate-900 dark:text-slate-100">
                              {val}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">det(A)</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{Number.isNaN(detA) ? "N/A" : detA}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Rank(A)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{rankA}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Trace(A)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{Number.isNaN(traceA) ? "N/A" : traceA}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED UNARY SOLVES INSIDE CARD 2 */}
          {savedUnaryItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Matrix Analytics ({savedUnaryItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedUnaryItems([]);
                    try { localStorage.removeItem("saved_matrix_unary"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedUnaryItems.map((item) => {
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
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedUnaryItems.filter(i => i.id !== item.id);
                            setSavedUnaryItems(updated);
                            try { localStorage.setItem("saved_matrix_unary", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
      {/* CARD 3: LINEAR SYSTEM SOLVER (Ax = b) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Linear System Solver (Ax = b)</span>
          <button
            type="button"
            onClick={handleSaveSolver}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
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
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Right-hand Vector b:</label>
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(rowsA, 4)}, 1fr)` }}>
                  {vectorB.map((val, idx) => (
                    <div key={`vb-${idx}`} className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 block">b{idx + 1}</span>
                      <input
                        type="number"
                        step="any"
                        value={val}
                        onChange={(e) => handleVectorBChange(idx, e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-2 py-1.5 text-center font-mono font-bold text-xs"
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
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    System Solution Vector x
                  </span>
                  <div className="text-xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {solverResult ? solverResult.solutionString : "N/A"}
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase">Solvability Status</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">{solverResult ? (solverResult.hasSolution ? (solverResult.isUnique ? "Unique Solution" : "Infinite Solutions") : "Inconsistent System") : "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED LINEAR SYSTEM SOLVES INSIDE CARD 3 */}
          {savedSolverItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Linear System Solves ({savedSolverItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedSolverItems([]);
                    try { localStorage.removeItem("saved_matrix_solver"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedSolverItems.map((item) => {
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
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedSolverItems.filter(i => i.id !== item.id);
                            setSavedSolverItems(updated);
                            try { localStorage.setItem("saved_matrix_solver", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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

export default MatrixCalculator;
