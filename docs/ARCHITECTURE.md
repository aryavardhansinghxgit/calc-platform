# Enterprise Calculator Platform Architecture & Technical Guidelines

Welcome to the internal developer documentation for the Enterprise Calculator Platform built with Next.js 16 App Router, TypeScript, Tailwind CSS, and Clean Architecture principles.

---

## 1. High-Level System Architecture

$$\begin{aligned}
\text{Client User} \longrightarrow \texttt{Next.js 16 App Router} &\longrightarrow \begin{cases} 
\text{SSG Pre-rendered Routes } (\texttt{/calculators/[slug]}, \texttt{/category/[slug]}) \\
\text{Plugin Registry } (\texttt{PluginRegistry.ts}) \\
\text{Feature Modules } (\texttt{src/modules/<slug>/}) \\
\text{Corporate Financial Engine } (\texttt{src/lib/finance/})
\end{cases}
\end{aligned}$$

---

## 2. Directory Structure

- `src/app/`: Next.js App Router dynamic routes (`/calculators/[slug]`, `/category/[slug]`).
- `src/lib/calculator-engine/`: Core Calculator Engine, `PluginRegistry`, `CalculatorEngine.run()`, and base types.
- `src/lib/finance/`: Shared corporate finance mathematics functions (`PMT`, `NPV`, `IRR`, `APR`, `FV`, `PV`, `CalculateLoanSchedule`).
- `src/lib/errors/`: Enterprise typed error hierarchy (`CalculatorError`, `ValidationError`, `CalculationError`, `PluginNotFoundError`).
- `src/modules/`: Self-contained Feature Modules (`mortgage`, `loan`, `emi`, etc.) containing `types.ts`, `config.ts`, `formula.ts`, `validators.ts`, `content.ts`.
- `src/components/calculator/`: Generic UI components (`CalculatorForm`, `CalculatorResult`, `CalculatorLayout`, `CalculatorErrorBoundary`).
- `scripts/generate-calculator.js`: CLI generator script for scaffolding feature modules.

---

## 3. Calculator Plugin Contract (`CalculatorPlugin`)

Every calculator in the platform implements the `CalculatorPlugin` contract:

```typescript
export interface CalculatorPlugin<TInput = Record<string, any>, TOutput = Record<string, any>> {
  metadata: {
    id: string;
    title: string;
    slug: string;
    category: string;
    description: string;
    iconName?: string;
    keywords?: string[];
  };
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  formula: (inputs: TInput) => TOutput;
  validator?: (inputs: TInput) => { isValid: boolean; errors?: Record<string, string> };
  faqs?: CalculatorFAQ[];
}
```

---

## 4. Scaffolding New Calculators

To scaffold a new calculator module, run:

```bash
npm run generate:calculator -- --slug="auto-loan" --category="Finance" --title="Auto Loan Calculator"
```

This creates:
- `src/modules/auto-loan/types.ts`
- `src/modules/auto-loan/formula.ts`
- `src/modules/auto-loan/config.ts`

---

## 5. Coding Standards & Principles

1. **Zero Calculation in UI Components**: All mathematical calculations must be isolated inside pure functions in `src/modules/<slug>/formula.ts` or `src/lib/finance/financial-math.ts`.
2. **Strict TypeScript**: Avoid `any` types wherever possible.
3. **Resiliency**: Wrap interactive widget components in `CalculatorErrorBoundary`.
4. **Performance**: Dynamic import heavy visual components using `next/dynamic` with `{ ssr: false }`.
