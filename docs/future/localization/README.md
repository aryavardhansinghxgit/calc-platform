# FUTURE VERSION: UNIVERSAL LOCALIZATION ENGINE (ULE)
## STATUS: ARCHIVED RESEARCH / NOT ACTIVE IN CURRENT PRODUCTION

> **IMPORTANT:**
> This directory contains research, architectural specifications, content parity models, and generator tooling developed for the future multilingual version of Calci.
> None of the code, components, or documentation in this folder are part of the active production runtime.
> Calci Current Version is strictly English-only.

---

## Key Architectural Principles (For Future Reference)

1. **Layered Parity Model:**
   - **Level 1 (Structure):** 1:1 section hierarchy and heading levels matching canonical English components.
   - **Level 2 (Block Coverage):** Paragraph-for-paragraph, table-for-table, formula-for-formula parity without synthetic heading-only stubs.
   - **Level 3 (Semantic & Density):** Word count (>800-1500 words), substantive FAQ bodies, and zero boilerplate.
   - **Level 4 (Data Invariance):** Exact numerical constants, worked examples, and statutory formulas preserved.
   - **Level 5 (Rendered UI):** UI overlays mapping input/output keys, zero untranslated child tokens.

2. **Published Matrix Gating:**
   - Strict gatekeeping where a locale route is only generated/accessible when UI overlay, content pack, and SEO are 100% verified.

3. **Lessons Learned from Pilot:**
   - Avoid generic 17-section templates on calculators with bespoke topologies.
   - Extract AST directly from the canonical English TSX component to guarantee authentic parity.
