"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Layers,
  Calculator,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Award,
  Grid,
  Zap,
  ListOrdered,
  ArrowRight,
  ShieldCheck,
  Compass,
  FileSpreadsheet
} from "lucide-react";

export function GcfContent() {
  const faqs = [
    {
      q: "What is a GCF?",
      a: "The greatest common factor is the largest positive integer that divides every number in a given set without a remainder."
    },
    {
      q: "Is GCF the same as GCD?",
      a: "Yes. For ordinary integer calculations, GCF and GCD describe the same quantity. GCD stands for greatest common divisor."
    },
    {
      q: "Is GCF the same as HCF?",
      a: "Yes. HCF, meaning highest common factor, is another common name for the same concept."
    },
    {
      q: "How do I find the GCF of two numbers?",
      a: "You can list their factors, use prime factorization, or apply the Euclidean algorithm. The calculator above displays several of these step-by-step approaches."
    },
    {
      q: "How do I find the GCF of three or more numbers?",
      a: "Calculate the GCF pairwise using the associative property: GCF(a, b, c) = GCF(GCF(a, b), c). Continue sequentially until all numbers in the set have been processed."
    },
    {
      q: "What is the GCF of 12 and 18?",
      a: "The GCF is 6. Factors of 12 are {1, 2, 3, 4, 6, 12} and factors of 18 are {1, 2, 3, 6, 9, 18}, making 6 their largest shared factor."
    },
    {
      q: "What is the GCF of 48 and 180?",
      a: "The GCF is 12. Prime factorizations are 48 = 2⁴ × 3 and 180 = 2² × 3² × 5, yielding 2² × 3 = 12."
    },
    {
      q: "What is the GCF of 36, 54 and 90?",
      a: "The GCF is 18. Shared prime powers are 2¹ and 3², yielding 2 × 9 = 18."
    },
    {
      q: "What happens when the GCF is 1?",
      a: "The numbers have no common divisor greater than 1 and are collectively relatively prime (coprime)."
    },
    {
      q: "Can the GCF be larger than the smallest number?",
      a: "No. A common factor must divide every input including the smallest, so the GCF cannot exceed the smallest absolute input value."
    },
    {
      q: "How is GCF related to LCM?",
      a: "For two positive integers, their product equals the product of their GCF and LCM: GCF(a, b) × LCM(a, b) = a × b."
    },
    {
      q: "Can GCF be used to simplify fractions?",
      a: "Yes. Dividing both the numerator and denominator by their GCF reduces a fraction to its lowest irreducible terms in a single operation."
    },
    {
      q: "Can GCF be used to simplify ratios?",
      a: "Yes. Dividing every term in a ratio by the collective GCF of all terms scales the ratio down to its simplest integer form."
    },
    {
      q: "What is the GCF of a number and 1?",
      a: "It is always 1, because 1 has no positive divisors other than 1."
    },
    {
      q: "What is the GCF of a number and itself?",
      a: "For any non-zero integer a, GCF(a, a) = |a|."
    },
    {
      q: "Does GCF work with negative integers?",
      a: "Yes. The conventional integer GCD is strictly positive and is evaluated from the absolute values of the numbers: GCF(−a, b) = GCF(|a|, |b|)."
    },
    {
      q: "What is the GCF of zero and a non-zero number?",
      a: "For non-zero a, GCF(a, 0) = |a|. However, GCF(0, 0) is undefined because every non-zero integer divides 0."
    },
    {
      q: "Why is prime factorization useful for GCF?",
      a: "It provides a clear structural view of the numbers, showing shared prime building blocks and applying the minimum exponent rule."
    },
    {
      q: "Why is the Euclidean algorithm useful?",
      a: "It computes the GCF quickly through repeated division without requiring factorization, making it ideal for arbitrarily large integers."
    }
  ];

  return (
    <article className="space-y-12 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">

      {/* ========================================================================= */}
      {/* 0. TOP RELATED CALCULATORS (Directly above educational content) */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <Compass className="h-4 w-4" />
          <span>Related Integer &amp; Arithmetic Calculators</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <Link
            href="/calculators/lcm-calculator"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 hover:shadow-xs transition-all group"
          >
            <h4 className="font-bold text-blue-600 dark:text-blue-400 text-sm group-hover:underline mb-1 flex items-center justify-between">
              <span>Least Common Multiple (LCM) Calculator</span>
              <ArrowRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Find the smallest positive common multiple for 2 or more numbers with step-by-step methods.
            </p>
          </Link>

          <Link
            href="/calculators/factor-calculator"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 hover:shadow-xs transition-all group"
          >
            <h4 className="font-bold text-blue-600 dark:text-blue-400 text-sm group-hover:underline mb-1 flex items-center justify-between">
              <span>Factor Calculator &amp; Prime Factorization</span>
              <ArrowRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Decompose any integer into prime factor trees, discover all divisor pairs, and check primality.
            </p>
          </Link>

          <Link
            href="/calculators/fraction-calculator"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 hover:shadow-xs transition-all group"
          >
            <h4 className="font-bold text-blue-600 dark:text-blue-400 text-sm group-hover:underline mb-1 flex items-center justify-between">
              <span>Fraction Calculator</span>
              <ArrowRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Add, subtract, multiply, and simplify fractions to irreducible lowest terms using common factors.
            </p>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1. DEFINITION AND MEANING */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>1. Greatest Common Factor (GCF): Definition and Meaning</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The <strong>Greatest Common Factor (GCF)</strong> is the largest positive integer that divides every number in a given set without leaving a remainder. In number theory, the same quantity is commonly called the <strong>Greatest Common Divisor (GCD)</strong>. In some curricula, especially in the UK and other Commonwealth contexts, it is also called the <strong>Highest Common Factor (HCF)</strong>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For positive integers, GCF, GCD, and HCF refer to the exact same mathematical quantity.
        </p>

        <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Introductory Worked Set: 36, 54, and 90
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-sans">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Factors of 36:</span>
              <p className="font-mono text-slate-600 dark:text-slate-400">1, 2, 3, 4, 6, 9, 12, 18, 36</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Factors of 54:</span>
              <p className="font-mono text-slate-600 dark:text-slate-400">1, 2, 3, 6, 9, 18, 27, 54</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Factors of 90:</span>
              <p className="font-mono text-slate-600 dark:text-slate-400">1, 2, 3, 5, 6, 9, 10, 15, 18, 30, 45, 90</p>
            </div>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 pt-1">
            The common factors shared by all three numbers are <strong>1, 2, 3, 6, 9, and 18</strong>. The largest among these is <strong>18</strong>.
          </p>
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 font-mono text-sm font-bold text-center">
            {"GCF(36, 54, 90) = 18"}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. GCF, GCD AND HCF */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>2. GCF, GCD and HCF: Are They the Same?</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For ordinary integer calculations, GCF, GCD, and HCF are different names for the same concept:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
          <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <strong className="text-blue-600 dark:text-blue-400 block text-sm">GCF</strong>
            <span>Greatest Common Factor (standard in US &amp; Canadian curricula)</span>
          </li>
          <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <strong className="text-blue-600 dark:text-blue-400 block text-sm">GCD</strong>
            <span>Greatest Common Divisor (standard in computer science &amp; number theory)</span>
          </li>
          <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <strong className="text-blue-600 dark:text-blue-400 block text-sm">HCF</strong>
            <span>Highest Common Factor (standard in UK, Indian, &amp; Commonwealth systems)</span>
          </li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For example, whether written as <code className="font-mono font-bold text-blue-600 dark:text-blue-400">GCF(48, 180) = 12</code>, <code className="font-mono font-bold text-blue-600 dark:text-blue-400">GCD(48, 180) = 12</code>, or <code className="font-mono font-bold text-blue-600 dark:text-blue-400">HCF(48, 180) = 12</code>, all three identify the exact same mathematical value.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 3. HOW TO FIND THE GCF */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>3. How to Find the GCF</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          There are several valid ways to calculate a greatest common factor. The most useful method depends on the size and structure of the numbers:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">1. Listing Factors</span>
            <p className="text-slate-600 dark:text-slate-400">Directly enumerating all divisors; easiest for small classroom numbers.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">2. Prime Factorization</span>
            <p className="text-slate-600 dark:text-slate-400">Decomposing into prime powers and taking minimum exponents for all shared primes.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">3. Euclidean Algorithm</span>
            <p className="text-slate-600 dark:text-slate-400">Repeated modulo division; optimal for large numbers without full factorization.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">4. Division Grid / Ladder</span>
            <p className="text-slate-600 dark:text-slate-400">Simultaneous extraction of common prime divisors in an inverted division table.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">5. Repeated Pairwise GCF</span>
            <p className="text-slate-600 dark:text-slate-400">Applying associativity across N numbers: GCF(a, b, c) = GCF(GCF(a, b), c).</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">6. Bézout's Identity</span>
            <p className="text-slate-600 dark:text-slate-400">Expressing GCF as an integer linear combination: a·x + b·y = GCF(a, b).</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. GCF BY LISTING FACTORS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ListOrdered className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>4. GCF by Listing Factors</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The direct factor-listing method is often the easiest approach for classroom examples. Suppose we need the GCF of 24 and 36:
        </p>
        <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
          <p><strong>Factors of 24:</strong> 1, 2, 3, 4, 6, 8, 12, 24</p>
          <p><strong>Factors of 36:</strong> 1, 2, 3, 4, 6, 9, 12, 18, 36</p>
          <p className="text-blue-600 dark:text-blue-400 font-bold"><strong>Common Factors:</strong> 1, 2, 3, 4, 6, 12</p>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 pt-1">
            The largest common factor is <strong>12</strong>. Therefore, <code className="text-blue-600">GCF(24, 36) = 12</code>.
          </p>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          The limitation is computational efficiency. As integers grow into tens or hundreds of thousands, listing every divisor becomes impractical. For larger inputs, the Euclidean algorithm is mathematically superior.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 5. GCF BY PRIME FACTORIZATION */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>5. GCF by Prime Factorization</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Prime factorization decomposes an integer into unique prime building blocks. To find the GCF of 36, 54, and 90:
        </p>
        <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
          <p>36 = 2² × 3²</p>
          <p>54 = 2¹ × 3³</p>
          <p>90 = 2¹ × 3² × 5¹</p>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1 font-sans">
            <p>• <strong>Prime 2:</strong> Appears in all three. Minimum exponent = 1 → 2¹</p>
            <p>• <strong>Prime 3:</strong> Appears in all three. Minimum exponent = 2 → 3²</p>
            <p>• <strong>Prime 5:</strong> Not present in 36 or 54 → Excluded</p>
            <p className="pt-1 font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
              {"GCF = 2¹ × 3² = 2 × 9 = 18"}
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          This minimum-exponent rule explains why prime factorization works: the GCF can only contain the amount of each prime power that all numbers have in common.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 6. GCF BY THE EUCLIDEAN ALGORITHM */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>6. GCF by the Euclidean Algorithm</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The Euclidean algorithm is a fast, highly efficient algorithm for computing the greatest common divisor of two integers. It is governed by the recursive invariant:
        </p>
        <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 font-mono text-sm font-bold text-center text-blue-900 dark:text-blue-200">
          {"GCF(a, b) = GCF(b, a mod b)"}
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          where <code className="font-mono">a mod b</code> is the remainder obtained when <code className="font-mono">a</code> is divided by <code className="font-mono">b</code>.
        </p>

        <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
          <p className="font-bold text-slate-700 dark:text-slate-300 font-sans">Worked Step-by-Step for GCF(180, 48):</p>
          <p>Step 1: 180 = 48 × 3 + 36  (remainder = 36)</p>
          <p>Step 2: 48 = 36 × 1 + 12   (remainder = 12)</p>
          <p>Step 3: 36 = 12 × 3 + 0    (remainder = 0)</p>
          <p className="pt-1 font-bold text-emerald-600 dark:text-emerald-400 font-sans">
            The last non-zero remainder is 12. Therefore, GCF(180, 48) = 12.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. GCF OF THREE OR MORE NUMBERS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>7. GCF of Three or More Numbers</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The GCF operation is associative and commutative, allowing it to scale to any finite set of integers:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm text-center font-bold">
          {"GCF(a, b, c) = GCF(GCF(a, b), c)"}
        </div>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          To find <code className="font-mono font-bold">GCF(36, 54, 90)</code>, first evaluate <code className="font-mono font-bold">GCF(36, 54) = 18</code>. Then evaluate <code className="font-mono font-bold">GCF(18, 90) = 18</code>. Changing the grouping or order does not alter the result: <code className="font-mono font-bold">GCF(90, 36, 54) = 18</code>.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 8. WHAT DOES IT MEAN WHEN GCF IS 1? */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>8. What Does It Mean When the GCF Is 1?</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          When the GCF of a set of integers is 1, the numbers have no common divisor greater than 1. They are collectively <strong>relatively prime</strong> (or <strong>coprime</strong>).
        </p>
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1 text-xs">
          <p className="font-bold text-amber-900 dark:text-amber-200">
            Example: GCF(6, 10, 15) = 1 and GCF(17, 19, 23) = 1
          </p>
          <p className="text-amber-800 dark:text-amber-300">
            A GCF of 1 does not mean the individual numbers have no divisors. 6, 10, and 15 are composite, but no single factor greater than 1 divides all three simultaneously.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9 & 10. WORKED EXAMPLES */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>9 &amp; 10. Complete Step-by-Step Worked Examples</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
              Worked Example 1: GCF(12, 18, 30)
            </h3>
            <div className="space-y-1.5 text-xs font-mono">
              <p>12 = 2² × 3</p>
              <p>18 = 2 × 3²</p>
              <p>30 = 2 × 3 × 5</p>
              <p className="pt-1 font-sans text-slate-700 dark:text-slate-300">
                Shared primes: 2 (min power 1) and 3 (min power 1).
              </p>
              <p className="font-bold text-blue-600 dark:text-blue-400">GCF = 2 × 3 = 6</p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-sans">
                <strong>Divisibility Verification:</strong> 12÷6=2, 18÷6=3, 30÷6=5. All integer quotients; no larger common divisor exists.
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
              Worked Example 2: GCF(48, 180)
            </h3>
            <div className="space-y-1.5 text-xs font-mono">
              <p>48 = 2⁴ × 3</p>
              <p>180 = 2² × 3² × 5</p>
              <p className="pt-1 font-sans text-slate-700 dark:text-slate-300">
                min(4, 2) for prime 2 = 2; min(1, 2) for prime 3 = 1.
              </p>
              <p className="font-bold text-blue-600 dark:text-blue-400">GCF = 2² × 3 = 4 × 3 = 12</p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-sans">
                <strong>Divisibility Verification:</strong> 48÷12=4, 180÷12=15. Since GCF(4, 15)=1, 12 is the maximal factor.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. GCF AND LEAST COMMON MULTIPLE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>11. GCF and the Least Common Multiple (GCF-LCM Duality)</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For two positive integers <code className="font-mono font-bold">a</code> and <code className="font-mono font-bold">b</code>, the greatest common factor and the least common multiple satisfy a fundamental product identity:
        </p>
        <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-center font-mono text-base font-extrabold text-blue-900 dark:text-blue-200">
          {"GCF(a, b) × LCM(a, b) = |a × b| = a × b"}
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1">
          <p>For a = 48, b = 180:</p>
          <p>GCF(48, 180) = 12,  LCM(48, 180) = 720</p>
          <p>GCF × LCM = 12 × 720 = 8,640</p>
          <p>Product a × b = 48 × 180 = 8,640</p>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          For the complementary smallest-common-multiple problem, explore our dedicated{" "}
          <Link href="/calculators/lcm-calculator" className="font-bold text-blue-600 dark:text-blue-400 underline">
            Least Common Multiple (LCM) Calculator
          </Link>.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 12, 13, 14. APPLICATIONS: FRACTIONS, RATIOS, ALGEBRA */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>12, 13 &amp; 14. Core Mathematical Applications</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400">12. Fraction Reduction</h4>
            <p className="text-slate-600 dark:text-slate-400">
              To reduce 48/180, divide numerator and denominator by GCF(48, 180) = 12: (48÷12)/(180÷12) = 4/15. For full multi-step fraction operations, use our{" "}
              <Link href="/calculators/fraction-calculator" className="font-bold text-blue-600 dark:text-blue-400 underline">
                Fraction Calculator
              </Link>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400">13. Ratio Simplification</h4>
            <p className="text-slate-600 dark:text-slate-400">
              For 36 : 54 : 90, dividing every term by GCF = 18 yields 2 : 3 : 5, preserving relative proportions while eliminating common scaling.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400">14. Algebraic Factoring</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Factoring out common terms: 12x + 18 = 6(2x + 3), and for polynomials with variables: 12x² + 18x = 6x(2x + 3).
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 15. DIVISION GRID / LADDER METHOD */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Grid className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>15. GCF Using a Division Grid or Ladder Method</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The division grid (ladder method) extracts common prime factors repeatedly from all integers simultaneously:
        </p>
        <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1.5">
          <p>Divide by 2:  36, 54, 90  →  [18, 27, 45]</p>
          <p>Divide by 3:  18, 27, 45  →  [6, 9, 15]</p>
          <p>Divide by 3:  6, 9, 15    →  [2, 3, 5]</p>
          <p className="pt-2 font-bold text-blue-600 dark:text-blue-400 font-sans">
            Common Divisors Product: 2 × 3 × 3 = 18. Remaining quotients [2, 3, 5] share no factor &gt; 1.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 16. BÉZOUT'S IDENTITY AND GCF */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>16. Bézout's Identity and the GCF</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For two integers <code className="font-mono">a</code> and <code className="font-mono">b</code>, Bézout's identity states that there exist integers <code className="font-mono">x</code> and <code className="font-mono">y</code> such that:
        </p>
        <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 font-mono text-sm font-bold text-center text-blue-900 dark:text-blue-200">
          {"a · x + b · y = GCF(a, b)"}
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          For 48 and 180: <code className="font-mono font-bold">48 × 4 + 180 × (−1) = 192 − 180 = 12</code>. This linear equation provides an exact algebraic verification of the result and is fundamental to modular arithmetic, cryptography, and Diophantine equations.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 17. PRIME FACTOR VIEW */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>17. Prime-Factor View: GCF vs LCM Duality</span>
        </h2>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <p>Suppose a = 2⁵ × 3² × 7 and b = 2³ × 3⁴ × 11:</p>
          <p className="font-bold text-blue-600 dark:text-blue-400 font-mono">
            GCF takes MINIMUM exponents of shared primes: 2³ × 3² = 72
          </p>
          <p className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            LCM takes MAXIMUM exponents of all primes: 2⁵ × 3⁴ × 7¹ × 11¹
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 18 & 19. HOW THE CALCULATOR WORKS & INPUT RULES */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>18 &amp; 19. How the Calculator Works &amp; Input Rules</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Enter two or more positive integers separated by commas or spaces into the calculation field (e.g. <code className="font-mono font-bold">12, 18, 30</code> or <code className="font-mono font-bold">48 180</code>). The calculator dynamically parses the input, evaluates the GCF, computes the LCM, generates prime power expressions, and renders 6 tabbed mathematical derivations.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 20 & 21. EDGE CASES & COMMON FACTORS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <span>20 &amp; 21. Edge Cases &amp; GCF vs Common Factors</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">Zero &amp; Negative Numbers</h4>
            <p className="text-amber-800 dark:text-amber-300">
              For any non-zero integer a, GCF(a, 0) = |a|. Negative inputs are mapped to absolute values: GCF(−12, 18) = 6. The pair (0, 0) is undefined.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">GCF vs Common Factors</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Common factors of 12 and 18 are 1, 2, 3, and 6. Every GCF is a common factor, but only 6 is the maximal common factor.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 22 & 23. GCF VS LCM & METHOD SELECTION */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>22 &amp; 23. When to Use Each Calculation Method</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <strong className="text-blue-600 dark:text-blue-400 block mb-1">Factor Listing</strong>
            <span>Best for small integers (&lt;50) when learning factor definitions.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <strong className="text-blue-600 dark:text-blue-400 block mb-1">Prime Factorization</strong>
            <span>Best when prime structure or simultaneous LCM computation is needed.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <strong className="text-blue-600 dark:text-blue-400 block mb-1">Euclidean Algorithm</strong>
            <span>Best for large integers where factoring into primes is computationally hard.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <strong className="text-blue-600 dark:text-blue-400 block mb-1">Bézout's Identity</strong>
            <span>Essential for number theory, modular inverses, and Diophantine equations.</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 24 & 25. APPLICATIONS & CROSS-VERIFICATION */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>24 &amp; 25. Real-World Applications &amp; Cross-Method Verification</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">Equal Grouping &amp; Distribution Logistics</span>
            <p className="text-slate-600 dark:text-slate-400">
              When packaging different items (e.g. 36 pens, 54 notebooks, 90 folders) into identical kits without leftovers, GCF(36, 54, 90) = 18 kits.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">Room Tiling &amp; Grid Geometry</span>
            <p className="text-slate-600 dark:text-slate-400">
              The largest square tile that can tile an M × N rectangular floor without cutting tiles equals GCF(M, N).
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 26. FREQUENTLY ASKED QUESTIONS (UNFOLDED, 401(K) EXECUTIVE STYLE) */}
      {/* ========================================================================= */}
      <section className="space-y-5 pt-2">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>26. Frequently Asked Questions About GCF</span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Clear, mathematically verified answers to common questions about greatest common factors, divisors, and integer arithmetic:
        </p>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs transition-all"
            >
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-mono font-extrabold">Q:</span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 27. FINAL TAKEAWAY */}
      {/* ========================================================================= */}
      <section className="space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 p-6 rounded-2xl border border-blue-200 dark:border-slate-700">
        <h2 className="text-lg sm:text-xl font-extrabold text-blue-900 dark:text-blue-300 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span>27. Final Educational Takeaway</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          The Greatest Common Factor is the largest integer that divides every number in a set without a remainder. GCF, GCD, and HCF are interchangeable names for the exact same integer concept. For two positive integers, GCF is directly linked to the Least Common Multiple through <code className="font-mono font-bold text-blue-700 dark:text-blue-300">{"GCF(a, b) × LCM(a, b) = a × b"}</code>. A reliable GCF calculation does more than return a number: it establishes a precise divisibility relationship among your numbers across arithmetic, fraction reduction, and discrete mathematics.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 28. BOTTOM RELATED-CALCULATOR BLOCK (Once at the very end) */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <Compass className="h-4 w-4" />
          <span>Related Integer &amp; Arithmetic Calculators</span>
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Continue your mathematical exploration with these related tools:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <Link
            href="/calculators/lcm-calculator"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 hover:shadow-xs transition-all group"
          >
            <h4 className="font-bold text-blue-600 dark:text-blue-400 text-sm group-hover:underline mb-1 flex items-center justify-between">
              <span>Least Common Multiple (LCM) Calculator</span>
              <ArrowRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Find the smallest positive common multiple for 2 or more numbers with step-by-step methods.
            </p>
          </Link>

          <Link
            href="/calculators/factor-calculator"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 hover:shadow-xs transition-all group"
          >
            <h4 className="font-bold text-blue-600 dark:text-blue-400 text-sm group-hover:underline mb-1 flex items-center justify-between">
              <span>Factor Calculator &amp; Prime Factorization</span>
              <ArrowRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Decompose any integer into prime factor trees, discover all divisor pairs, and check primality.
            </p>
          </Link>

          <Link
            href="/calculators/fraction-calculator"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 hover:shadow-xs transition-all group"
          >
            <h4 className="font-bold text-blue-600 dark:text-blue-400 text-sm group-hover:underline mb-1 flex items-center justify-between">
              <span>Fraction Calculator</span>
              <ArrowRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Add, subtract, multiply, and simplify fractions to irreducible lowest terms using common factors.
            </p>
          </Link>
        </div>
      </section>

    </article>
  );
}

export default GcfContent;
