"use client";

import React from "react";
import { BookOpen, CheckCircle2, AlertTriangle, Lightbulb, HelpCircle, Layers, ShieldCheck, Target, Award } from "lucide-react";

export function MatrixContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
      
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span>1. Introduction to the Matrix Calculator & Linear Algebra Suite</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The <strong>Matrix Calculator & Linear Algebra Suite</strong> is a high-performance computational application engineered to execute matrix arithmetic, vector transformations, system of linear equations solving, and spectral decompositions.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Featuring dual editable matrix workstations (A and B from 1&times;1 to 10&times;10), this suite provides binary arithmetic (A+B, A-B, A&times;B, Kronecker tensor product), unary matrix analysis (&det;(A), A⁻¹, Aᵀ, Rank, Trace, RREF), linear system solvers (Ax = b), and exportable LaTeX/CSV notation.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600" />
          <span>2. Mathematical Concept, Definitions & Matrix Notation</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A matrix is a rectangular array of numbers arranged in m rows and n columns (denoted m &times; n). An element residing in row i and column j is written as a<sub>i,j</sub>:
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-base font-bold text-blue-700 dark:text-blue-300">
          {"A = [a_ij] for i = 1...m, j = 1...n"}
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
          Special Matrix Classifications
        </h3>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-4 list-disc">
          <li>
            <strong>Square Matrix:</strong> A matrix with equal rows and columns (m = n).
          </li>
          <li>
            <strong>Identity Matrix (I<sub>n</sub>):</strong> A square matrix with 1s along the main diagonal and 0s elsewhere (A &middot; I = A).
          </li>
          <li>
            <strong>Singular Matrix:</strong> A square matrix whose determinant is 0 (&det;(A) = 0), rendering it non-invertible.
          </li>
        </ul>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-600" />
          <span>3. Core Matrix Formulas & Non-Commutative Arithmetic</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">1. Matrix Multiplication (Dot Product)</h4>
            <p className="font-mono text-sm font-bold">{"c_ij = ∑ (a_ik · b_kj)"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Requires columns of A to equal rows of B (A_m×k &times; B_k×n &rarr; C_m×n).</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">2. 2x2 Determinant Formula</h4>
            <p className="font-mono text-sm font-bold">{"det([a b; c d]) = ad - bc"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Determines matrix invertibility and linear area scaling.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">3. 2x2 Inverse Matrix Formula</h4>
            <p className="font-mono text-sm font-bold">{"A⁻¹ = (1 / det(A)) · [d -b; -c a]"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Swaps main diagonal elements and flips signs on anti-diagonal.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">4. Non-Commutativity Property</h4>
            <p className="font-mono text-sm font-bold">{"A × B ≠ B × A  (In General)"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Order of matrix multiplication changes the resulting matrix.</p>
          </div>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-600" />
          <span>4. How the Calculation Works (Step-by-Step Breakdown)</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculation engine processes matrix operations in four steps:
        </p>

        <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300 pl-4 list-decimal">
          <li className="pl-2">
            <strong>Dimension Validation:</strong> Verifying matching inner dimensions for multiplication (m&times;k and k&times;n) or identical dimensions for addition (m&times;n).
          </li>
          <li className="pl-2">
            <strong>Dot Product Computation:</strong> Multiplying row vectors of A by column vectors of B to construct matrix C.
          </li>
          <li className="pl-2">
            <strong>Gauss-Jordan Elimination (RREF):</strong> Applying elementary row operations (row swap, scaling, elimination) to reduce matrices to Reduced Row Echelon Form.
          </li>
          <li className="pl-2">
            <strong>Augmented Matrix Inversion:</strong> Solving [A | I] &rarr; [I | A⁻¹] to compute inverses.
          </li>
        </ol>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-blue-600" />
          <span>5. Worked Calculation Examples</span>
        </h2>

        <div className="space-y-4">
          {/* Example 1 */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-blue-600">
              Example 1 (Matrix Multiplication 2x2): Multiply A and B
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
              A = [1 2; 3 4], B = [5 6; 7 8]<br />
              c₁₁ = 1(5) + 2(7) = 5 + 14 = 19<br />
              c₁₂ = 1(6) + 2(8) = 6 + 16 = 22<br />
              c₂₁ = 3(5) + 4(7) = 15 + 28 = 43<br />
              c₂₂ = 3(6) + 4(8) = 18 + 32 = 50<br />
              <strong>Result C = [19 22; 43 50]</strong>
            </p>
          </div>

          {/* Example 2 */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-blue-600">
              Example 2 (Determinant & Inverse): Find det(A) and A⁻¹ for [2 4; 3 7]
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
              det(A) = (2)(7) - (4)(3) = 14 - 12 = <strong>2</strong>.<br />
              A⁻¹ = (1/2) &middot; [7 -4; -3 2] = <strong>[3.5 -2; -1.5 1]</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-blue-600" />
          <span>6. Visual Understanding & Special Matrix Types Table</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-2.5">Matrix Type</th>
                <th className="p-2.5">Structural Condition</th>
                <th className="p-2.5">Determinant Property</th>
                <th className="p-2.5">Invertibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50 font-mono">
              <tr>
                <td className="p-2 font-bold font-sans">Identity Matrix (I)</td>
                <td className="p-2">Diagonal = 1, Off-diagonal = 0</td>
                <td className="p-2 text-blue-600 font-bold">det(I) = 1</td>
                <td className="p-2 font-bold text-emerald-600">Always Invertible</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">Symmetric Matrix</td>
                <td className="p-2">A = Aᵀ (a_ij = a_ji)</td>
                <td className="p-2">Real Eigenvalues</td>
                <td className="p-2">Invertible if det &ne; 0</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">Singular Matrix</td>
                <td className="p-2">Linearly Dependent Rows</td>
                <td className="p-2 text-rose-600 font-bold">det(A) = 0</td>
                <td className="p-2 font-bold text-rose-600">Non-Invertible (No A⁻¹)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <span>7. Common Errors & Edge Cases in Linear Algebra</span>
        </h2>

        <div className="space-y-3 text-sm">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 1: Assuming Matrix Multiplication is Commutative (AB = BA)
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              Matrix multiplication depends on order. In general, A &times; B &ne; B &times; A.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 2: Attempting Matrix Division Directly
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              Matrix division is undefined. To "divide" by matrix B, multiply by its inverse B⁻¹ (A &middot; B⁻¹).
            </p>
          </div>
        </div>
      </section>

      {/* 8. PRACTICAL APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Award className="h-6 w-6 text-blue-600" />
          <span>8. Real-World Applications Across Fields</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">3D Computer Graphics & Game Engines</h4>
            <p className="text-slate-600 dark:text-slate-400">
              4&times;4 transformation matrices handle 3D rotation, scaling, translation, and camera perspective projections in GPUs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Neural Networks & Deep Learning</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Forward and backward propagation in AI algorithms rely on massive matrix multiplication operations (Y = W &middot; X + B).
            </p>
          </div>
        </div>
      </section>

      {/* 9. RELATED MATHEMATICAL CONCEPTS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <span>9. Related Mathematical Concepts & Prerequisite Topics</span>
        </h2>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-4 list-disc">
          <li><strong>Systems of Linear Equations:</strong> Solving Ax = b via Gaussian elimination or Cramer's rule.</li>
          <li><strong>Eigenvalues & Eigenvectors:</strong> Spectral decomposition and principal component analysis (PCA).</li>
        </ul>
      </section>

      {/* 10. SUMMARY */}
      <section className="space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 p-6 rounded-2xl border border-blue-200 dark:border-slate-700">
        <h2 className="text-lg font-extrabold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          The <strong>Matrix Calculator & Linear Algebra Suite</strong> combines computational linear algebra with dynamic UI design. By supporting binary arithmetic, Laplace determinants, Gauss-Jordan RREF reductions, systems of equations, and LaTeX exports, this suite functions as an authoritative calculation and learning resource.
        </p>
      </section>

    </div>
  );
}
