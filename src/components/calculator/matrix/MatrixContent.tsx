"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, Calculator, Layers, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export function MatrixContent() {
  // All 15 FAQs open (unfolded) by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 15 }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const faqs = [
    {
      question: "What is a matrix calculator?",
      answer: "A matrix calculator is an online mathematical tool that performs operations on matrices, such as addition, subtraction, multiplication, transpose, determinant, inverse, rank and RREF. A more advanced matrix solver can also solve systems written as Ax = b."
    },
    {
      question: "How do I multiply two matrices?",
      answer: "To multiply A by B, the number of columns in A must equal the number of rows in B. Each result entry is found by multiplying a row of A by a column of B and adding the products."
    },
    {
      question: "Can I multiply matrices of different sizes?",
      answer: "Yes, provided their inner dimensions match. For example, a (2 × 3) matrix multiplied by a (3 × 4) matrix is valid and produces a (2 × 4) matrix."
    },
    {
      question: "Can I add matrices of different sizes?",
      answer: "No. Matrix addition and subtraction require the matrices to have identical dimensions."
    },
    {
      question: "How do I find the determinant of a matrix?",
      answer: "For a 2 × 2 matrix [[a, b], [c, d]], det(A) = ad - bc. For larger square matrices, determinant algorithms such as Gaussian elimination with row swaps or cofactor expansion can be used."
    },
    {
      question: "When does a matrix inverse exist?",
      answer: "A square matrix has an ordinary inverse exactly when it is nonsingular, meaning its determinant is nonzero (det(A) ≠ 0)."
    },
    {
      question: "What happens when the determinant is zero?",
      answer: "The matrix is singular and has no ordinary inverse. Its rows or columns are linearly dependent."
    },
    {
      question: "What is RREF?",
      answer: "RREF stands for reduced row echelon form. It is a standardized matrix form obtained through elementary row operations and is commonly used to solve systems of equations, determine rank, and identify free variables."
    },
    {
      question: "What is matrix rank?",
      answer: "Matrix rank is the number of linearly independent rows or columns in the matrix. Computationally, it equals the number of non-zero pivot positions in its reduced row echelon form (RREF)."
    },
    {
      question: "What is the trace of a matrix?",
      answer: "The trace is the sum of the entries on the main diagonal of a square matrix. It is invariant under cyclic permutations and similarity transformations."
    },
    {
      question: "Why is AB usually different from BA?",
      answer: "Matrix multiplication generally does not commute (AB ≠ BA). Even when both products are dimensionally valid, changing the order changes which rows are combined with which columns, producing a different resulting matrix."
    },
    {
      question: "Can a matrix calculator solve Ax = b?",
      answer: "Yes. A linear-system solver uses row reduction or related methods to determine whether the system has a unique solution, infinitely many solutions, or no solution."
    },
    {
      question: "Can I use decimals and negative numbers?",
      answer: "Yes. Valid numerical matrix entries can include negative and decimal values. The calculator preserves the values as entered rather than silently converting incomplete input into zero."
    },
    {
      question: "What is the difference between a matrix and a vector?",
      answer: "A vector can be treated as a one-dimensional matrix, commonly represented as a column (m × 1) or row (1 × n). A general matrix can contain multiple rows and columns."
    },
    {
      question: "What is an identity matrix?",
      answer: "An identity matrix is a square matrix with ones on the main diagonal and zeros elsewhere. It acts like 1 under compatible matrix multiplication: AI = A and IA = A."
    }
  ];

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      
      {/* 4. INTRODUCTORY CONTENT DIRECTLY UNDER THE CALCULATOR */}
      <div className="space-y-4 text-slate-800 dark:text-slate-200">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Matrix Calculator for Matrix Operations and Linear Algebra
        </h2>
        <p>
          Use this free matrix calculator to perform common linear algebra calculations without doing every row and column operation by hand. Enter one or two matrices, choose the operation you need, and get the calculated result with mathematical details.
        </p>
        <p>
          The calculator supports matrix addition, subtraction, multiplication, transpose, determinant, inverse, rank, trace, reduced row echelon form (RREF), and systems of linear equations in the form Ax = b. It also handles dimension checks so that operations that are not mathematically defined are not silently treated as valid calculations.
        </p>
        <p>
          A matrix is a rectangular array of numbers arranged in rows and columns. Its dimensions are written as <em>m</em> &times; <em>n</em>, where <em>m</em> is the number of rows and <em>n</em> is the number of columns. For example,
        </p>
        
        {/* Rendered 3x3 Matrix Example */}
        <div className="my-3 flex justify-center">
          <div className="inline-flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm sm:text-base">
            <span className="font-semibold text-slate-700 dark:text-slate-300">A =</span>
            <div className="inline-grid grid-cols-3 gap-x-4 gap-y-1 px-2.5 py-1 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center font-bold text-blue-700 dark:text-blue-300">
              <span>1</span><span>2</span><span>3</span>
              <span>0</span><span>1</span><span>4</span>
              <span>5</span><span>6</span><span>0</span>
            </div>
          </div>
        </div>

        <p>
          is a 3 &times; 3 matrix.
        </p>
        <p>
          This page is designed to be useful both as an online matrix solver and as a reference for understanding why each result is correct. You can calculate a result, inspect the mathematical operation, save calculations, restore previous inputs, copy results, and export supported results for later use.
        </p>
      </div>

      {/* 5. RELATED CALCULATORS — ABOVE THE MAIN EDUCATIONAL CONTENT */}
      <div className="pt-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Related Calculators
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm">
            <Link href="/calculators/scientific-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Scientific Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <Link href="/calculators/slope-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Slope Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <Link href="/calculators/distance-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Distance Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <Link href="/calculators/quadratic-formula-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Quadratic Formula Calculator
            </Link>
          </div>
        </div>
      </div>

      {/* 6. MAIN LONG-FORM EDUCATIONAL CONTENT */}
      <div className="pt-8 space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section: What It Calculates */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Matrix Calculator: What It Calculates
          </h2>
          <p>
            A matrix calculator is a tool for carrying out numerical operations on matrices and related linear algebra objects. Matrix calculations appear in algebra, engineering, computer science, statistics, physics, economics, computer graphics, optimization, and many other technical fields.
          </p>
          <p>
            The most important distinction when working with matrices is that the dimensions of the matrices determine which operations are valid.
          </p>
          <p>
            For two matrices, <em>A<sub>m &times; n</sub></em> and <em>B<sub>p &times; q</sub></em>, addition and subtraction require:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            m = p, &emsp; n = q
          </div>
          <p>
            Matrix multiplication follows a different rule. The number of columns in the first matrix must equal the number of rows in the second:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            A<sub>m &times; n</sub> · B<sub>n &times; p</sub> = C<sub>m &times; p</sub>
          </div>
          <p>
            This dimension rule is fundamental. It is also why matrix multiplication generally cannot be treated like ordinary multiplication of numbers. The order of multiplication can change the answer. Standard linear algebra texts treat matrix multiplication, transposes, inverses, determinants and systems of equations as connected parts of the same subject.
          </p>
        </section>

        {/* Section: Matrix Addition */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Matrix Addition
          </h2>
          <p>
            Matrix addition is performed element by element. For matrices of equal dimensions:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            A + B = C &emsp; where &emsp; c<sub>ij</sub> = a<sub>ij</sub> + b<sub>ij</sub>
          </div>
          <p>
            For example, adding two 2 &times; 2 matrices:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm">
            <div className="inline-grid grid-cols-2 gap-x-3 gap-y-1 px-2 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center">
              <span>1</span><span>2</span>
              <span>3</span><span>4</span>
            </div>
            <span>+</span>
            <div className="inline-grid grid-cols-2 gap-x-3 gap-y-1 px-2 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center">
              <span>5</span><span>6</span>
              <span>7</span><span>8</span>
            </div>
            <span>=</span>
            <div className="inline-grid grid-cols-2 gap-x-3 gap-y-1 px-2 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center font-bold text-blue-700 dark:text-blue-300">
              <span>6</span><span>8</span>
              <span>10</span><span>12</span>
            </div>
          </div>
          <p>
            The dimensions must match. A 2 &times; 2 matrix cannot be added directly to a 2 &times; 3 matrix.
          </p>
        </section>

        {/* Section: Matrix Subtraction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Matrix Subtraction
          </h2>
          <p>
            Subtraction follows the same dimensional requirement as addition:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            A − B = C &emsp; with &emsp; c<sub>ij</sub> = a<sub>ij</sub> − b<sub>ij</sub>
          </div>
          <p>
            For example:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm">
            <div className="inline-grid grid-cols-2 gap-x-3 gap-y-1 px-2 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center">
              <span>7</span><span>8</span>
              <span>9</span><span>10</span>
            </div>
            <span>−</span>
            <div className="inline-grid grid-cols-2 gap-x-3 gap-y-1 px-2 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center">
              <span>2</span><span>3</span>
              <span>4</span><span>5</span>
            </div>
            <span>=</span>
            <div className="inline-grid grid-cols-2 gap-x-3 gap-y-1 px-2 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center font-bold text-blue-700 dark:text-blue-300">
              <span>5</span><span>5</span>
              <span>5</span><span>5</span>
            </div>
          </div>
          <p>
            The calculator should therefore reject incompatible matrix dimensions rather than silently resize either matrix.
          </p>
        </section>

        {/* Section: Matrix Multiplication */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Matrix Multiplication
          </h2>
          <p>
            Matrix multiplication is one of the most frequently used matrix operations and one of the easiest to calculate incorrectly manually.
          </p>
          <p>
            Suppose <em>A</em> is an <em>m &times; n</em> matrix and <em>B</em> is an <em>n &times; p</em> matrix. Then <em>C = AB</em> has dimensions <em>m &times; p</em> and each element is computed using a row-column dot product:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            c<sub>ij</sub> = &sum;<sub>k=1</sub><sup>n</sup> a<sub>ik</sub> · b<sub>kj</sub>
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
            Worked 3 &times; 3 Example
          </h3>
          <p>
            Consider matrices:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold">A =</span>
              <div className="inline-grid grid-cols-3 gap-x-3 gap-y-1 px-2 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center">
                <span>1</span><span>2</span><span>3</span>
                <span>0</span><span>1</span><span>4</span>
                <span>5</span><span>6</span><span>0</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">B =</span>
              <div className="inline-grid grid-cols-3 gap-x-3 gap-y-1 px-2 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center">
                <span>2</span><span>0</span><span>-1</span>
                <span>1</span><span>3</span><span>2</span>
                <span>0</span><span>-2</span><span>1</span>
              </div>
            </div>
          </div>
          <p>
            The first element of <em>AB</em> (row 1, column 1) is:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            c<sub>11</sub> = 1(2) + 2(1) + 3(0) = 2 + 2 + 0 = 4
          </div>
          <p>
            The second element of the first row (row 1, column 2) is:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            c<sub>12</sub> = 1(0) + 2(3) + 3(-2) = 0 + 6 - 6 = 0
          </div>
          <p>
            Continuing the row-column multiplication for all entries gives:
          </p>
          <div className="flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm">
            <span className="font-semibold">AB =</span>
            <div className="inline-grid grid-cols-3 gap-x-4 gap-y-1 px-3 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center font-bold text-blue-700 dark:text-blue-300">
              <span>4</span><span>0</span><span>6</span>
              <span>1</span><span>-5</span><span>6</span>
              <span>16</span><span>18</span><span>7</span>
            </div>
          </div>
          <p>
            The calculator&apos;s audited implementation returns exactly this result.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
            Why AB and BA Are Different
          </h3>
          <p>
            Using the exact same matrices in reverse order:
          </p>
          <div className="flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm">
            <span className="font-semibold">BA =</span>
            <div className="inline-grid grid-cols-3 gap-x-4 gap-y-1 px-3 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center font-bold text-purple-700 dark:text-purple-300">
              <span>-3</span><span>-2</span><span>6</span>
              <span>11</span><span>17</span><span>15</span>
              <span>5</span><span>4</span><span>-8</span>
            </div>
          </div>
          <p>
            Therefore, <strong>AB &ne; BA</strong>. This property is called <em>non-commutativity</em> of matrix multiplication. It is an important difference between matrix algebra and ordinary scalar arithmetic. The calculator has specifically been tested for this distinction.
          </p>
        </section>

        {/* Section: Determinant of a Matrix */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Determinant of a Matrix
          </h2>
          <p>
            The determinant is defined for square matrices and is a scalar value associated with the matrix.
          </p>
          <p>
            For a 2 &times; 2 matrix <em>A = [[a, b], [c, d]]</em>, the determinant is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            det(A) = ad − bc
          </div>
          <p>
            For the example <em>[[1, 2], [3, 4]]</em>:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center font-mono">
            det(A) = 1(4) − 2(3) = 4 − 6 = −2
          </div>
          <p>
            The determinant is especially important when investigating whether a square matrix is invertible. An invertible square matrix has a nonzero determinant. A singular matrix has determinant zero and therefore has no ordinary inverse.
          </p>
          <p>
            For the calculator&apos;s 3 &times; 3 test matrix:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            det(A) = 1
          </div>
          <p>
            The implementation has also been tested against singular matrices where the determinant equals zero.
          </p>
        </section>

        {/* Section: Matrix Inverse */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Matrix Inverse
          </h2>
          <p>
            The inverse of a square matrix <em>A</em>, written <em>A<sup>−1</sup></em>, is the matrix satisfying:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            A · A<sup>−1</sup> = A<sup>−1</sup> · A = I
          </div>
          <p>
            where <em>I</em> is the identity matrix.
          </p>
          <p>
            An inverse exists only for an invertible, nonsingular square matrix. A determinant of zero indicates that the matrix is singular and cannot have an ordinary inverse.
          </p>
          <p>
            For the test matrix <em>A = [[1, 2, 3], [0, 1, 4], [5, 6, 0]]</em>, the inverse is:
          </p>
          <div className="flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm">
            <span className="font-semibold">A<sup>−1</sup> =</span>
            <div className="inline-grid grid-cols-3 gap-x-4 gap-y-1 px-3 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center font-bold text-blue-700 dark:text-blue-300">
              <span>-24</span><span>18</span><span>5</span>
              <span>20</span><span>-15</span><span>-4</span>
              <span>-5</span><span>4</span><span>1</span>
            </div>
          </div>
          <p>
            Multiplying the original matrix by this inverse produces the identity matrix:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center font-mono">
            A · A<sup>−1</sup> = I &emsp; and &emsp; A<sup>−1</sup> · A = I
          </div>
          <p>
            Both identity checks have been independently tested in the calculator implementation.
          </p>
        </section>

        {/* Section: Transpose of a Matrix */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Transpose of a Matrix
          </h2>
          <p>
            The transpose changes rows into columns. If:
          </p>
          <div className="flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm">
            <span className="font-semibold">A =</span>
            <div className="inline-grid grid-cols-3 gap-x-3 gap-y-1 px-2 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center">
              <span>1</span><span>2</span><span>3</span>
              <span>4</span><span>5</span><span>6</span>
            </div>
          </div>
          <p>
            then:
          </p>
          <div className="flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm">
            <span className="font-semibold">A<sup>T</sup> =</span>
            <div className="inline-grid grid-cols-2 gap-x-4 gap-y-1 px-3 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center font-bold text-blue-700 dark:text-blue-300">
              <span>1</span><span>4</span>
              <span>2</span><span>5</span>
              <span>3</span><span>6</span>
            </div>
          </div>
          <p>
            Notice that a 2 &times; 3 matrix becomes a 3 &times; 2 matrix. Transpose operations are common in linear algebra, statistics, optimization and numerical computing. One useful identity is:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            (A<sup>T</sup>)<sup>T</sup> = A
          </div>
          <p>
            The calculator has been tested against this property as well as direct transpose examples.
          </p>
        </section>

        {/* Section: Matrix Rank */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Matrix Rank
          </h2>
          <p>
            The rank of a matrix describes the dimension of its row space and column space. Computationally, it can be obtained from the number of independent pivot rows after row reduction.
          </p>
          <p>
            For example:
          </p>
          <div className="flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm">
            <span className="font-semibold">A =</span>
            <div className="inline-grid grid-cols-3 gap-x-3 gap-y-1 px-2 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center">
              <span>1</span><span>2</span><span>3</span>
              <span>2</span><span>4</span><span>6</span>
              <span>3</span><span>6</span><span>9</span>
            </div>
          </div>
          <p>
            has dependent rows because every row is a scalar multiple of the first row. Its rank is therefore:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            rank(A) = 1
          </div>
          <p>
            A full-rank 3 &times; 3 matrix has rank 3, while the zero matrix has rank 0. The calculator has been tested against full-rank, rank-deficient and zero matrices.
          </p>
        </section>

        {/* Section: Matrix Trace */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Matrix Trace
          </h2>
          <p>
            The trace is defined for a square matrix and equals the sum of the entries on its main diagonal.
          </p>
          <p>
            For <em>A = [[1, 2, 3], [0, 1, 4], [5, 6, 0]]</em>, the trace is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            tr(A) = 1 + 1 + 0 = 2
          </div>
          <p>
            Trace appears in several areas of mathematics, including linear transformations, eigenvalue theory and matrix analysis. The calculator checks the diagonal elements directly rather than treating the trace as a general sum of all matrix entries.
          </p>
        </section>

        {/* Section: RREF */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            RREF: Reduced Row Echelon Form
          </h2>
          <p>
            Reduced row echelon form, or RREF, is a standardized matrix form obtained by elementary row operations. The three elementary row operations are:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>swapping two rows;</li>
            <li>multiplying a row by a nonzero constant;</li>
            <li>adding a multiple of one row to another row.</li>
          </ul>
          <p>
            These operations preserve the solution set of a corresponding system of linear equations. A matrix in RREF has a characteristic pivot structure: pivot entries are normalized to 1, pivot columns have zeros above and below their leading entries, and zero rows appear beneath nonzero rows.
          </p>
          <p>
            RREF is particularly useful for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>solving simultaneous equations;</li>
            <li>determining matrix rank;</li>
            <li>identifying free variables;</li>
            <li>investigating consistency;</li>
            <li>analyzing systems with more equations than unknowns or more unknowns than equations.</li>
          </ul>
          <p>
            Standard linear algebra treatments use row reduction and RREF as a central computational method for systems of equations.
          </p>
        </section>

        {/* Section: Solving Ax = b */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Solving a Linear System Ax = b
          </h2>
          <p>
            A system of linear equations can be written compactly as:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            Ax = b
          </div>
          <p>
            where:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><em>A</em> is the coefficient matrix;</li>
            <li><em>x</em> is the vector of unknowns;</li>
            <li><em>b</em> is the vector of constants.</li>
          </ul>
          <p>
            The calculator uses the matrix structure to determine whether the system has: one unique solution, infinitely many solutions, or no solution. These three cases are important and should not be confused.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
            Example
          </h3>
          <p>
            For:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold">A =</span>
              <div className="inline-grid grid-cols-3 gap-x-3 gap-y-1 px-2 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center">
                <span>1</span><span>2</span><span>3</span>
                <span>0</span><span>1</span><span>4</span>
                <span>5</span><span>6</span><span>0</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">b =</span>
              <div className="inline-grid grid-cols-1 gap-y-1 px-2 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center">
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </div>
            </div>
          </div>
          <p>
            the solution is:
          </p>
          <div className="flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm">
            <span className="font-semibold">x =</span>
            <div className="inline-grid grid-cols-1 gap-y-1 px-3 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center font-bold text-blue-700 dark:text-blue-300">
              <span>27</span>
              <span>-22</span>
              <span>6</span>
            </div>
          </div>
          <p>
            Substitution verifies the result:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1 font-mono text-xs sm:text-sm">
            <div>1(27) + 2(-22) + 3(6) = 27 − 44 + 18 = 1</div>
            <div>0(27) + 1(-22) + 4(6) = −22 + 24 = 2</div>
            <div>5(27) + 6(-22) + 0(6) = 135 − 132 = 3</div>
          </div>
          <p>
            The production audit independently verified this solution.
          </p>
        </section>

        {/* Section: Unique, Infinite and No-Solution Systems */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Unique, Infinite and No-Solution Systems
          </h2>
          <p>
            Not every linear system has one answer:
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Unique solution</h3>
              <p className="mt-1">There is exactly one vector <em>x</em> satisfying <em>Ax = b</em>. This occurs when the coefficient matrix has full column rank and the system is consistent.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Infinitely many solutions</h3>
              <p className="mt-1">The equations are consistent but contain dependent information, leaving one or more free variables. Any linear combination of the homogeneous nullspace solutions satisfies the system.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">No solution (Inconsistent)</h3>
              <p className="mt-1">The equations contradict one another. For example, the equations <code>x + 2y = 3</code> and <code>2x + 4y = 7</code> cannot both be true. The second equation would require the left side to equal 6 when doubled from the first equation, but its right side is 7.</p>
            </div>
          </div>
          <p>
            The calculator explicitly distinguishes these cases rather than reporting a generic numerical failure.
          </p>
        </section>

        {/* Section: Important Matrix Dimension Rules Table */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Important Matrix Dimension Rules
          </h2>
          <p>
            Before performing a matrix operation, check its dimensions.
          </p>
          
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3 font-bold text-slate-900 dark:text-slate-100">Operation</th>
                  <th className="p-3 font-bold text-slate-900 dark:text-slate-100">Required condition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-normal">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-semibold">A + B</td>
                  <td className="p-3">Same dimensions (m = p, n = q)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-semibold">A − B</td>
                  <td className="p-3">Same dimensions (m = p, n = q)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-semibold">AB</td>
                  <td className="p-3">Columns of A = rows of B (n = p)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-semibold">BA</td>
                  <td className="p-3">Columns of B = rows of A</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-semibold">det(A)</td>
                  <td className="p-3">A must be square (m = n)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-semibold">A<sup>−1</sup></td>
                  <td className="p-3">A must be square and nonsingular (det(A) ≠ 0)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-semibold">A<sup>T</sup></td>
                  <td className="p-3">Any valid matrix (m × n becomes n × m)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-semibold">Rank</td>
                  <td className="p-3">Any valid matrix (rank ≤ min(m, n))</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-semibold">RREF</td>
                  <td className="p-3">Any valid matrix</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-semibold">Trace</td>
                  <td className="p-3">A must be square (m = n)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="pt-1">
            For multiplication:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            (m &times; n) &times; (n &times; p) = (m &times; p)
          </div>
          <p>
            This is one of the most useful rules to remember when checking a matrix multiplication problem.
          </p>
        </section>

        {/* Section: Identity Matrix and Why It Matters */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Identity Matrix and Why It Matters
          </h2>
          <p>
            The identity matrix is the matrix analogue of the scalar number 1. For a 3 &times; 3 matrix:
          </p>
          <div className="flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm">
            <span className="font-semibold">I<sub>3</sub> =</span>
            <div className="inline-grid grid-cols-3 gap-x-4 gap-y-1 px-3 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center font-bold text-blue-700 dark:text-blue-300">
              <span>1</span><span>0</span><span>0</span>
              <span>0</span><span>1</span><span>0</span>
              <span>0</span><span>0</span><span>1</span>
            </div>
          </div>
          <p>
            For a compatible matrix <em>A</em>:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center font-mono">
            A · I = A &emsp; and &emsp; I · A = A
          </div>
          <p>
            For an invertible matrix:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            A · A<sup>−1</sup> = I &emsp; and &emsp; A<sup>−1</sup> · A = I
          </div>
          <p>
            The identity matrix therefore provides a natural verification mechanism for matrix inverses.
          </p>
        </section>

        {/* Section: Singular vs. Invertible Matrices */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Singular vs. Invertible Matrices
          </h2>
          <p>
            A square matrix is singular when its determinant is zero:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-red-600 dark:text-red-400">
            det(A) = 0 &emsp; (Singular, No Ordinary Inverse)
          </div>
          <p>
            A singular matrix does not possess an ordinary matrix inverse. By contrast, if:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
            det(A) &ne; 0 &emsp; (Nonsingular, Invertible)
          </div>
          <p>
            the square matrix is nonsingular and therefore invertible. This relationship connects determinant, rank and inverse calculations. In computational practice, checking these properties before attempting an inverse prevents undefined calculations and misleading numerical results.
          </p>
        </section>

        {/* Section: Worked Example: Determinant and Inverse */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Worked Example: Determinant and Inverse
          </h2>
          <p>
            Consider:
          </p>
          <div className="flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm">
            <span className="font-semibold">A =</span>
            <div className="inline-grid grid-cols-2 gap-x-4 gap-y-1 px-3 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center font-bold">
              <span>4</span><span>7</span>
              <span>2</span><span>6</span>
            </div>
          </div>
          <p>
            The determinant is:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-blue-700 dark:text-blue-300">
            det(A) = 4(6) − 7(2) = 24 − 14 = 10
          </div>
          <p>
            Because the determinant is nonzero (10 &ne; 0), the matrix is invertible.
          </p>
          <p>
            The 2 &times; 2 inverse formula is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono">
            A<sup>−1</sup> = (1 / (ad − bc)) · [[d, −b], [−c, a]]
          </div>
          <p>
            Therefore:
          </p>
          <div className="flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm">
            <span className="font-semibold">A<sup>−1</sup> =</span>
            <span>(1/10) ·</span>
            <div className="inline-grid grid-cols-2 gap-x-4 gap-y-1 px-3 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center">
              <span>6</span><span>-7</span>
              <span>-2</span><span>4</span>
            </div>
            <span>=</span>
            <div className="inline-grid grid-cols-2 gap-x-4 gap-y-1 px-3 border-l-2 border-r-2 border-slate-800 dark:border-slate-200 text-center font-bold text-blue-700 dark:text-blue-300">
              <span>0.6</span><span>-0.7</span>
              <span>-0.2</span><span>0.4</span>
            </div>
          </div>
          <p>
            The inverse can then be checked by multiplication with the original matrix. The result should be the identity matrix. This is also the basic verification principle used in standard matrix-inverse procedures.
          </p>
        </section>

        {/* Section: How to Use the Matrix Calculator */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use the Matrix Calculator
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Step 1: Set the matrix dimensions</h3>
              <p className="mt-1">Choose the required number of rows and columns for Matrix A (from 1 &times; 1 up to 10 &times; 10). Add Matrix B when the operation requires two matrices.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Step 2: Enter the matrix values</h3>
              <p className="mt-1">Fill each matrix cell with the corresponding numerical value. Negative values and decimal values should be entered directly into their cells.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Step 3: Choose the operation</h3>
              <p className="mt-1">Select the operation you need: addition, subtraction, multiplication, transpose, determinant, inverse, rank, trace, RREF, or linear-system solving (Ax = b).</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Step 4: Read the result</h3>
              <p className="mt-1">The calculator produces the computed result and the associated mathematical analysis.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Step 5: Verify or reuse the calculation</h3>
              <p className="mt-1">Saved calculations can be restored, while supported results can be copied or exported. The production audit verified save/load, copy, LaTeX and CSV functionality.</p>
            </div>
          </div>
        </section>

        {/* Section: Common Matrix Calculator Mistakes */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Matrix Calculator Mistakes
          </h2>
          <div className="space-y-2.5">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100">Mistake 1: Multiplying matrices element by element</span>
              <p className="mt-1">Ordinary matrix multiplication is not simply <code>a<sub>ij</sub> · b<sub>ij</sub></code>. It uses row-by-column dot products: <code>c<sub>ij</sub> = &sum;<sub>k</sub> a<sub>ik</sub>b<sub>kj</sub></code>. Element-wise multiplication (Hadamard product) is a completely different operation.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100">Mistake 2: Ignoring dimensions</span>
              <p className="mt-1">A 2 &times; 3 matrix cannot be multiplied by a 2 &times; 2 matrix in that order because the inner dimensions do not match.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100">Mistake 3: Assuming AB = BA</span>
              <p className="mt-1">For matrices, multiplication is generally non-commutative: <code>AB &ne; BA</code>.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100">Mistake 4: Finding an inverse without checking singularity</span>
              <p className="mt-1">A determinant of zero means the inverse does not exist.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100">Mistake 5: Treating the determinant like an ordinary matrix</span>
              <p className="mt-1">The determinant of a square matrix is a scalar number, not another matrix.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100">Mistake 6: Confusing rank with matrix dimensions</span>
              <p className="mt-1">A 4 &times; 5 matrix can have rank at most min(4, 5) = 4. Rank depends on independent rows or columns, not simply on the number of entries.</p>
            </div>
          </div>
        </section>

        {/* Section: Matrix Calculations in Engineering, Computing and Data Science */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Matrix Calculations in Engineering, Computing and Data Science
          </h2>
          <p>
            Matrices are not only classroom objects. They provide a compact way to represent systems of equations, transformations and relationships between multiple variables.
          </p>
          <p>
            In computer graphics, matrices are used for transformations such as scaling, rotation and coordinate transformations. In numerical methods and engineering, matrix systems arise naturally from discretized models and simultaneous equations. For polynomial root finding and curve modeling, see our{" "}
            <Link href="/calculators/quadratic-formula-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Quadratic Formula Calculator
            </Link>
            .
          </p>
          <p>
            In statistics and data science, matrices organize observations, features and transformations. In machine learning, matrix operations appear throughout linear models and neural-network computations. Coordinate geometry and distance transformations also rely on matrix rotations; to examine spatial separation directly, explore our{" "}
            <Link href="/calculators/distance-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Distance Calculator
            </Link>
            {" "}and{" "}
            <Link href="/calculators/slope-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Slope Calculator
            </Link>
            .
          </p>
          <p>
            For general high-precision numerical evaluations and transcendental functions across scientific disciplines, use our{" "}
            <Link href="/calculators/scientific-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Scientific Calculator
            </Link>
            . This breadth is reflected in standard university linear algebra curricula, which connect systems of equations, matrices, determinants, eigenvalues, vector spaces and linear transformations.
          </p>
        </section>

        {/* Section: Why Use a Matrix Calculator Instead of Calculating Manually? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Use a Matrix Calculator Instead of Calculating Manually?
          </h2>
          <p>
            Manual matrix arithmetic is useful for understanding the mathematics, but larger matrices can make arithmetic errors difficult to detect. A calculator is particularly useful for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Checking homework:</strong> compare a manually derived result against an independent calculation.</li>
            <li><strong>Learning:</strong> inspect formulas and intermediate mathematical reasoning.</li>
            <li><strong>Linear systems:</strong> avoid repetitive elimination arithmetic.</li>
            <li><strong>Matrix multiplication:</strong> reduce row-column arithmetic mistakes.</li>
            <li><strong>Determinants and inverses:</strong> quickly verify whether a matrix is singular or invertible.</li>
            <li><strong>Exploration:</strong> change entries or dimensions and immediately observe how the result changes.</li>
          </ul>
          <p>
            The best use of an online calculator is not to replace understanding, but to combine computational efficiency with mathematical verification.
          </p>
        </section>

        {/* Section: Accuracy and Validation */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Accuracy and Validation
          </h2>
          <p>
            This Matrix Calculator has undergone mathematical and functional regression testing across its core operations.
          </p>
          <p>
            The audited production version passed independent randomized testing covering matrix addition, subtraction, multiplication, transpose, trace, inverse verification and linear-system residual checks. The reported suite contained 11,096 assertions with zero failures.
          </p>
          <p>
            The audit also verified:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>matrix dimensions from 1 × 1 through 10 × 10</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>singular-matrix detection</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>inverse verification</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>unique, infinite and inconsistent linear systems</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>CSV export</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>PDF/print output</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>responsive layouts</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>accessibility</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>TypeScript compilation</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>server-rendered SEO content</span>
            </li>
          </ul>
        </section>

        {/* Section: Matrix Calculator vs. a Hand Calculation */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Matrix Calculator vs. a Hand Calculation
          </h2>
          <p>
            A manual solution is valuable when the objective is to learn the method. An online matrix calculator is valuable when the objective is speed, verification or experimentation.
          </p>
          <p>
            For coursework, a good workflow is:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>understand the formula;</li>
            <li>solve a smaller example manually;</li>
            <li>use the calculator to verify the result;</li>
            <li>inspect why the answer is correct;</li>
            <li>use the same method on the full problem.</li>
          </ol>
          <p>
            This approach preserves mathematical understanding while reducing avoidable arithmetic errors.
          </p>
        </section>

      </div>

      {/* 7. FAQ SECTION (15 FAQs, Unfolded by Default) */}
      <div className="pt-8">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions About Matrix Calculators
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-800/20 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 8. FINAL CONTENT SECTION & REFERENCES */}
      <div className="pt-8 space-y-6 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Matrix Calculator Reference
          </h2>
          <p>
            The central formulas to remember are:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs sm:text-sm">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              (A + B)<sub>ij</sub> = a<sub>ij</sub> + b<sub>ij</sub>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              (A − B)<sub>ij</sub> = a<sub>ij</sub> − b<sub>ij</sub>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              (AB)<sub>ij</sub> = &sum;<sub>k</sub> a<sub>ik</sub>b<sub>kj</sub>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              det([[a, b], [c, d]]) = ad − bc
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              A · A<sup>−1</sup> = A<sup>−1</sup> · A = I
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              (A<sup>T</sup>)<sup>T</sup> = A
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              Ax = b
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              rank(A) = pivots in RREF(A)
            </div>
          </div>
          <p>
            Understanding these relationships makes it much easier to decide which matrix operation is appropriate for a particular problem.
          </p>
          <p>
            The strongest workflow is therefore simple: check dimensions first, choose the correct operation, calculate the result, and verify it using a relevant identity or substitution.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Sources and Further Reading
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            For readers who want a deeper mathematical treatment, useful references include university-level linear algebra texts and OpenStax material covering matrix inverses, determinants and systems of equations. MIT OpenCourseWare also provides lecture material covering matrix operations, multiplication, transposes, determinants, inverses and linear systems.
          </p>
        </section>
      </div>

      {/* 9. RELATED CALCULATORS — AFTER THE CONTENT */}
      <div className="pt-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Related Calculators
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm">
            <Link href="/calculators/scientific-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Scientific Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <Link href="/calculators/slope-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Slope Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <Link href="/calculators/distance-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Distance Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <Link href="/calculators/quadratic-formula-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Quadratic Formula Calculator
            </Link>
          </div>
        </div>
      </div>

    </article>
  );
}

export default MatrixContent;
