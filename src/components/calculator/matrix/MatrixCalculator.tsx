"use client";

import React, { useState, useMemo } from "react";
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
  Shuffle
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

export type MatrixTab = "binary" | "unaryA" | "unaryB" | "solver" | "spectral";

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

  // Scalar Multipliers
  const [ka, setKa] = useState<number>(1);
  const [kb, setKb] = useState<number>(1);

  // Constants vector b for Ax = b solver
  const [vectorB, setVectorB] = useState<number[]>([1, 2, 3]);

  // Selected Operation State
  const [activeTab, setActiveTab] = useState<MatrixTab>("binary");
  const [binaryOp, setBinaryOp] = useState<"add" | "sub" | "multAB" | "multBA" | "hadamard" | "kronecker">("multAB");
  const [unaryOpA, setUnaryOpA] = useState<"det" | "inv" | "trans" | "rref" | "rank" | "trace" | "power2">("det");

  // Feedback states
  const [copiedResult, setCopiedResult] = useState<boolean>(false);
  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);
  const [copiedCsv, setCopiedCsv] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

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

  // Preset Handlers
  const handleSetIdentityA = () => setMatrixA(createIdentityMatrix(rowsA));
  const handleSetZeroA = () => setMatrixA(createZeroMatrix(rowsA, colsA));
  const handleSetRandomA = () => setMatrixA(createRandomMatrix(rowsA, colsA));

  const handleSetIdentityB = () => setMatrixB(createIdentityMatrix(rowsB));
  const handleSetZeroB = () => setMatrixB(createZeroMatrix(rowsB, colsB));
  const handleSetRandomB = () => setMatrixB(createRandomMatrix(rowsB, colsB));

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

  // Main Result Computation
  const activeScaledA = useMemo(() => scaleMatrix(matrixA, ka), [matrixA, ka]);
  const activeScaledB = useMemo(() => scaleMatrix(matrixB, kb), [matrixB, kb]);

  const { resultMatrix, resultScalar, resultError, solverResult } = useMemo(() => {
    try {
      if (activeTab === "binary") {
        if (binaryOp === "add") return { resultMatrix: addMatrices(activeScaledA, activeScaledB) };
        if (binaryOp === "sub") return { resultMatrix: subtractMatrices(activeScaledA, activeScaledB) };
        if (binaryOp === "multAB") return { resultMatrix: multiplyMatrices(activeScaledA, activeScaledB) };
        if (binaryOp === "multBA") return { resultMatrix: multiplyMatrices(activeScaledB, activeScaledA) };
        if (binaryOp === "hadamard") return { resultMatrix: hadamardProduct(activeScaledA, activeScaledB) };
        if (binaryOp === "kronecker") return { resultMatrix: kroneckerProduct(activeScaledA, activeScaledB) };
      }

      if (activeTab === "unaryA") {
        if (unaryOpA === "det") return { resultScalar: determinantMatrix(activeScaledA) };
        if (unaryOpA === "inv") return { resultMatrix: inverseMatrix(activeScaledA) };
        if (unaryOpA === "trans") return { resultMatrix: transposeMatrix(activeScaledA) };
        if (unaryOpA === "rref") return { resultMatrix: rrefMatrix(activeScaledA).rref };
        if (unaryOpA === "rank") return { resultScalar: rankMatrix(activeScaledA) };
        if (unaryOpA === "trace") return { resultScalar: traceMatrix(activeScaledA) };
        if (unaryOpA === "power2") return { resultMatrix: matrixPower(activeScaledA, 2) };
      }

      if (activeTab === "solver") {
        const sol = solveLinearSystem(activeScaledA, vectorB);
        return { solverResult: sol };
      }

      return { resultMatrix: activeScaledA };
    } catch (err: any) {
      return { resultError: err.message || "Invalid Matrix Operation" };
    }
  }, [activeTab, binaryOp, unaryOpA, activeScaledA, activeScaledB, vectorB]);

  const detA = useMemo(() => {
    try {
      return determinantMatrix(matrixA);
    } catch {
      return NaN;
    }
  }, [matrixA]);

  const rankA = useMemo(() => rankMatrix(matrixA), [matrixA]);
  const traceA = useMemo(() => traceMatrix(matrixA), [matrixA]);
  const spectralA = useMemo(() => computeEigenvalues2x2or3x3(matrixA), [matrixA]);

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("rA", rowsA.toString());
    params.set("cA", colsA.toString());
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    handleCopy(shareableUrl, setCopiedUrl);
  };

  return (
    <div className="space-y-6">
      {/* DUAL MATRIX WORKSTATION (MATRICES A & B) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* MATRIX A CARD */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Matrix A ({rowsA} &times; {colsA})
              </h2>
            </div>
            
            {/* Dimension Picker */}
            <div className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1">
                <span>Rows:</span>
                <button type="button" onClick={() => handleRowsAChange(-1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800"><Minus className="h-3 w-3" /></button>
                <span className="w-4 text-center font-mono">{rowsA}</span>
                <button type="button" onClick={() => handleRowsAChange(1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800"><Plus className="h-3 w-3" /></button>
              </div>

              <div className="flex items-center gap-1">
                <span>Cols:</span>
                <button type="button" onClick={() => handleColsAChange(-1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800"><Minus className="h-3 w-3" /></button>
                <span className="w-4 text-center font-mono">{colsA}</span>
                <button type="button" onClick={() => handleColsAChange(1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800"><Plus className="h-3 w-3" /></button>
              </div>
            </div>
          </div>

          {/* GRID INPUT CELL MATRIX A */}
          <div className="overflow-x-auto py-2">
            <div className="inline-block min-w-full">
              <div
                className="grid gap-1.5 justify-center"
                style={{ gridTemplateColumns: `repeat(${colsA}, minmax(48px, 64px))` }}
              >
                {matrixA.map((row, r) =>
                  row.map((val, c) => (
                    <input
                      key={`A-${r}-${c}`}
                      type="number"
                      step="any"
                      value={val}
                      onChange={(e) => handleCellChangeA(r, c, e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-1 text-center font-mono font-bold text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* PRESETS FOR MATRIX A */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
            <button type="button" onClick={handleSetIdentityA} className="px-2 py-1 bg-white dark:bg-slate-800 border rounded-lg font-semibold cursor-pointer">Identity I</button>
            <button type="button" onClick={handleSetZeroA} className="px-2 py-1 bg-white dark:bg-slate-800 border rounded-lg font-semibold cursor-pointer">Zero 0</button>
            <button type="button" onClick={handleSetRandomA} className="px-2 py-1 bg-white dark:bg-slate-800 border rounded-lg font-semibold flex items-center gap-1 cursor-pointer">
              <Shuffle className="h-3 w-3" /> Random
            </button>
          </div>
        </div>

        {/* MATRIX B CARD */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Matrix B ({rowsB} &times; {colsB})
              </h2>
            </div>
            
            {/* Dimension Picker */}
            <div className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1">
                <span>Rows:</span>
                <button type="button" onClick={() => handleRowsBChange(-1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800"><Minus className="h-3 w-3" /></button>
                <span className="w-4 text-center font-mono">{rowsB}</span>
                <button type="button" onClick={() => handleRowsBChange(1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800"><Plus className="h-3 w-3" /></button>
              </div>

              <div className="flex items-center gap-1">
                <span>Cols:</span>
                <button type="button" onClick={() => handleColsBChange(-1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800"><Minus className="h-3 w-3" /></button>
                <span className="w-4 text-center font-mono">{colsB}</span>
                <button type="button" onClick={() => handleColsBChange(1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800"><Plus className="h-3 w-3" /></button>
              </div>
            </div>
          </div>

          {/* GRID INPUT CELL MATRIX B */}
          <div className="overflow-x-auto py-2">
            <div className="inline-block min-w-full">
              <div
                className="grid gap-1.5 justify-center"
                style={{ gridTemplateColumns: `repeat(${colsB}, minmax(48px, 64px))` }}
              >
                {matrixB.map((row, r) =>
                  row.map((val, c) => (
                    <input
                      key={`B-${r}-${c}`}
                      type="number"
                      step="any"
                      value={val}
                      onChange={(e) => handleCellChangeB(r, c, e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-1 text-center font-mono font-bold text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* PRESETS FOR MATRIX B */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
            <button type="button" onClick={handleSetIdentityB} className="px-2 py-1 bg-white dark:bg-slate-800 border rounded-lg font-semibold cursor-pointer">Identity I</button>
            <button type="button" onClick={handleSetZeroB} className="px-2 py-1 bg-white dark:bg-slate-800 border rounded-lg font-semibold cursor-pointer">Zero 0</button>
            <button type="button" onClick={handleSetRandomB} className="px-2 py-1 bg-white dark:bg-slate-800 border rounded-lg font-semibold flex items-center gap-1 cursor-pointer">
              <Shuffle className="h-3 w-3" /> Random
            </button>
            <button type="button" onClick={handleSwapAB} className="ml-auto px-2 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 rounded-lg font-bold flex items-center gap-1 cursor-pointer">
              Swap A &leftrightarrow; B
            </button>
          </div>
        </div>
      </div>

      {/* OPERATIONS TOOLBAR & HERO RESULT DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* OPERATIONS TABS & BUTTONS */}
        <div className="md:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab("binary")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "binary" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs" : "text-slate-600"
              }`}
            >
              Binary (A & B)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("unaryA")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "unaryA" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs" : "text-slate-600"
              }`}
            >
              Analysis Matrix A
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("solver")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "solver" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs" : "text-slate-600"
              }`}
            >
              Solve Ax = b
            </button>
          </div>

          {/* BINARY OP BUTTONS */}
          {activeTab === "binary" && (
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setBinaryOp("multAB")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  binaryOp === "multAB" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 border-slate-300"
                }`}
              >
                A &times; B
              </button>

              <button
                type="button"
                onClick={() => setBinaryOp("add")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  binaryOp === "add" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 border-slate-300"
                }`}
              >
                A + B
              </button>

              <button
                type="button"
                onClick={() => setBinaryOp("sub")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  binaryOp === "sub" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 border-slate-300"
                }`}
              >
                A - B
              </button>

              <button
                type="button"
                onClick={() => setBinaryOp("multBA")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  binaryOp === "multBA" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 border-slate-300"
                }`}
              >
                B &times; A
              </button>

              <button
                type="button"
                onClick={() => setBinaryOp("hadamard")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  binaryOp === "hadamard" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 border-slate-300"
                }`}
              >
                A &circ; B
              </button>

              <button
                type="button"
                onClick={() => setBinaryOp("kronecker")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  binaryOp === "kronecker" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 border-slate-300"
                }`}
              >
                A &otimes; B
              </button>
            </div>
          )}

          {/* UNARY A OP BUTTONS */}
          {activeTab === "unaryA" && (
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setUnaryOpA("det")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  unaryOpA === "det" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 border-slate-300"
                }`}
              >
                det(A)
              </button>

              <button
                type="button"
                onClick={() => setUnaryOpA("inv")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  unaryOpA === "inv" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 border-slate-300"
                }`}
              >
                A⁻¹ (Inverse)
              </button>

              <button
                type="button"
                onClick={() => setUnaryOpA("rref")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  unaryOpA === "rref" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 border-slate-300"
                }`}
              >
                RREF(A)
              </button>

              <button
                type="button"
                onClick={() => setUnaryOpA("trans")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  unaryOpA === "trans" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 border-slate-300"
                }`}
              >
                Aᵀ (Transpose)
              </button>

              <button
                type="button"
                onClick={() => setUnaryOpA("rank")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  unaryOpA === "rank" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 border-slate-300"
                }`}
              >
                Rank(A)
              </button>

              <button
                type="button"
                onClick={() => setUnaryOpA("trace")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  unaryOpA === "trace" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 border-slate-300"
                }`}
              >
                Trace(A)
              </button>
            </div>
          )}
        </div>

        {/* HERO RESULT DISPLAY CARD */}
        <div className="md:col-span-6 bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-slate-50 dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 border border-blue-200 dark:border-slate-700 rounded-2xl p-6 space-y-5 shadow-md">
          <div className="flex items-center justify-between border-b border-blue-200/80 pb-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>Result Matrix Output</span>
            </h2>
            {resultMatrix && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {resultMatrix.length} &times; {resultMatrix[0].length}
              </span>
            )}
          </div>

          {resultError ? (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold">
              {resultError}
            </div>
          ) : resultScalar !== undefined ? (
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Scalar Result:</span>
              <div className="text-4xl font-black text-slate-900 font-mono">{resultScalar}</div>
            </div>
          ) : solverResult ? (
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">System Solution:</span>
              <div className="text-base font-bold text-slate-900 font-mono">{solverResult.solutionString}</div>
            </div>
          ) : resultMatrix ? (
            <div className="overflow-x-auto py-2">
              <div className="inline-block min-w-full">
                <div
                  className="grid gap-1.5 justify-center border-l-2 border-r-2 border-blue-600 px-3 py-2 rounded-lg bg-white/60 dark:bg-slate-900/60"
                  style={{ gridTemplateColumns: `repeat(${resultMatrix[0].length}, minmax(44px, 56px))` }}
                >
                  {resultMatrix.map((row, r) =>
                    row.map((val, c) => (
                      <div key={`R-${r}-${c}`} className="text-center font-mono font-bold text-xs py-1.5 text-slate-900 dark:text-slate-100">
                        {val}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : null}

          {/* METRICS CHIPS */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-blue-200/80">
            <div className="bg-white/80 p-2.5 rounded-xl border text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">det(A)</span>
              <p className="text-xs font-mono font-bold text-slate-900">{Number.isNaN(detA) ? "N/A" : detA}</p>
            </div>

            <div className="bg-white/80 p-2.5 rounded-xl border text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Rank(A)</span>
              <p className="text-xs font-mono font-bold text-slate-900">{rankA}</p>
            </div>

            <div className="bg-white/80 p-2.5 rounded-xl border text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Trace(A)</span>
              <p className="text-xs font-mono font-bold text-blue-600">{Number.isNaN(traceA) ? "N/A" : traceA}</p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <button
              type="button"
              onClick={() => resultMatrix && handleCopy(resultMatrix.map(r => r.join("\t")).join("\n"), setCopiedResult)}
              className="bg-white hover:bg-blue-50 text-slate-800 border font-semibold rounded-xl px-2 py-2 text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedResult ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedResult ? "Copied!" : "Copy Matrix"}</span>
            </button>

            <button
              type="button"
              onClick={() => resultMatrix && handleCopy(formatMatrixToLaTeX(resultMatrix), setCopiedLatex)}
              className="bg-white hover:bg-blue-50 text-slate-800 border font-semibold rounded-xl px-2 py-2 text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedLatex ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <BookOpen className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedLatex ? "Copied!" : "Copy LaTeX"}</span>
            </button>

            <button
              type="button"
              onClick={() => resultMatrix && handleCopy(formatMatrixToCSV(resultMatrix), setCopiedCsv)}
              className="bg-white hover:bg-blue-50 text-slate-800 border font-semibold rounded-xl px-2 py-2 text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedCsv ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedCsv ? "Copied!" : "Export CSV"}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl px-2 py-2 text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedUrl ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copiedUrl ? "Link Copied!" : "Share URL"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
