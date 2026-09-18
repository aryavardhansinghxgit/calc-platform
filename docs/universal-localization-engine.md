# Universal Localization Engine (ULE) — Architectural Manual & Operator Guide

## 1. Executive Summary
The **Universal Localization Engine (ULE)** is Calci's data-driven, architecture-aware system for discovering, extracting, localizing, verifying, and publishing calculators across multilingual locales (`en`, `es`, `fr`, `de`, `hi`, `pt`).

Instead of creating separate React components or manual boilerplates per language, the ULE discovers the underlying rendering contract and applies strongly typed locale overlays and educational content packs through a 10-dimension verification gate.

---

## 2. Core Architecture

```
                    ┌─────────────────────────┐
                    │  Human Command / Task   │
                    │  "Add French to ..."    │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │ Localization            │
                    │ Orchestrator            │
                    └────────────┬────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
   Architecture             Localizable             Readiness
    Discovery                Surfaces               Scorecard
  (Generic/Bespoke)       (UI/Content/SEO)         (10 Gates)
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
                    ┌─────────────────────────┐
                    │ Localization Assembly   │
                    │ (Overlays & Content)    │
                    └────────────┬────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
   Engine Purity           DOM Leakage             Sitemap & SEO
    Verification             Auditor                 Audit
 (Math Invariance)       (No En Leakage)           (No /en/ URLs)
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
                    ┌─────────────────────────┐
                    │ Publication Gate        │
                    │ State Machine           │
                    │ (DRAFT → PUBLISHED)     │
                    └─────────────────────────┘
```

---

## 3. Universal Renderer Contracts

### 3.1 Generic Schema Calculators (`GENERIC_SCHEMA`)
- **Render Path:** `src/components/calculator/CalculatorLayout.tsx` using `CalculatorForm` and `CalculatorResult`.
- **Contract:** Receives localized definitions (`inputs`, `outputs`, `title`, `description`, `faqs`) dynamically mapped from `getCalculatorOverlay(slug, locale)`.
- **Zero Component Duplication:** One universal form/result renderer handles all languages.

### 3.2 Bespoke Calculators (`BESPOKE`)
- **Render Path:** Custom multi-tab or domain-specific components (e.g. `MortgageCalculator`, `AmortizationCalculator`).
- **Contract:** Custom component accepts `{ overlay: TLocaleOverlay, locale: Locale }`.
- **Child Components:** All sub-components (schedule tables, chart legends, summary cards, action modals) receive the overlay context.

---

## 4. Universal Locale-Aware Formatter (`UniversalFormatter`)
Located at [formatter.ts](file:///c:/Users/saman/Real%20websites/calc-platform/src/lib/i18n/engine/formatter.ts).
- Strictly maintains **Language ≠ Currency** separation.
- `UniversalFormatter.formatCurrency(value, locale, { currency: "USD" })`
- `UniversalFormatter.formatNumber(value, locale)`
- `UniversalFormatter.formatPercent(value, locale)`
- `UniversalFormatter.formatMonthYear(month, year, locale)`

---

## 5. Terminology Memory (`TerminologyMemory`)
Located at [terminology.ts](file:///c:/Users/saman/Real%20websites/calc-platform/src/lib/i18n/engine/terminology.ts).
- Provides consistent cross-calculator financial, mathematical, and UI translations.
- Prevents terminology drift across related tools (e.g., ensuring "Principal" translates consistently in Mortgage, Amortization, and Loans).

---

## 6. Publication State Machine Lifecycle
Located at [state-machine.ts](file:///c:/Users/saman/Real%20websites/calc-platform/src/lib/i18n/engine/state-machine.ts).
- `DRAFT` → `DISCOVERED` → `TRANSLATING` → `GENERATED` → `VERIFIED` → `PUBLISHED`.
- A calculator locale is only flipped to `PUBLISHED` when all 7 core automated gates pass:
  1. UI completeness (`uiPass`)
  2. Content parity (`contentPass`)
  3. FAQ alignment (`faqPass`)
  4. Mathematical invariance (`mathPass`)
  5. SEO & hreflang integrity (`seoPass`)
  6. Zero DOM English leakage (`domLeakagePass`)
  7. Clean sitemap presence (`sitemapPass`)

---

## 7. Natural Command Resolution
Examples of instructions handled by `resolveHumanCommand(text)`:
- `"Add French to Mortgage, Amortization, BMI and Percentage."`
- `"Add German and Hindi to Finance calculators."`
- `"Add Portuguese to all Health calculators."`
- `"Complete Spanish across the entire catalog."`
