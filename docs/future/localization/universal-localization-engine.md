# [FUTURE ARCHITECTURE] Universal Localization Engine (ULE) — Architectural Manual & Operator Guide
> **STATUS:** FUTURE VERSION ARCHITECTURAL RESEARCH / NOT ACTIVE IN CURRENT PRODUCTION

## 1. Executive Summary
The **Universal Localization Engine (ULE)** is Calci's data-driven, architecture-aware system designed for future multilingual support across locales (`en`, `es`, `fr`, `de`, `hi`, `pt`).

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

### 3.2 Bespoke Calculators (`BESPOKE`)
- **Render Path:** Custom multi-tab or domain-specific components (e.g. `MortgageCalculator`, `AmortizationCalculator`).
- **Contract:** Custom component accepts `{ overlay: TLocaleOverlay, locale: Locale }`.
- **Child Components:** All sub-components (schedule tables, chart legends, summary cards, action modals) receive the overlay context.

---

## 4. Universal Locale-Aware Formatter (`UniversalFormatter`)
- Strictly maintains **Language ≠ Currency** separation.
- `UniversalFormatter.formatCurrency(value, locale, { currency: "USD" })`
- `UniversalFormatter.formatNumber(value, locale)`
- `UniversalFormatter.formatPercent(value, locale)`
- `UniversalFormatter.formatMonthYear(month, year, locale)`

---

## 5. Terminology Memory (`TerminologyMemory`)
- Provides consistent cross-calculator financial, mathematical, and UI translations.
- Prevents terminology drift across related tools.

---

## 6. Publication State Machine Lifecycle
- `DRAFT` → `DISCOVERED` → `TRANSLATING` → `GENERATED` → `VERIFIED` → `PUBLISHED`.
- A calculator locale is only flipped to `PUBLISHED` when all 7 core automated gates pass:
  1. UI completeness (`uiPass`)
  2. Content parity (`contentPass`)
  3. FAQ alignment (`faqPass`)
  4. Mathematical invariance (`mathPass`)
  5. SEO & hreflang integrity (`seoPass`)
  6. Zero DOM English leakage (`domLeakagePass`)
  7. Clean sitemap presence (`sitemapPass`)
