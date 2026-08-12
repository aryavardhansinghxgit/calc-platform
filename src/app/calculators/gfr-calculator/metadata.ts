import { Metadata } from "next";

export const gfr_calculatorMetadata: Metadata = {
  title: "GFR Calculator (eGFR) | NKF-ASN CKD-EPI 2021 & Kidney Function Suite",
  description:
    "Calculate estimated Glomerular Filtration Rate (eGFR), CKD Stages 1-5, and KDIGO prognosis risk using CKD-EPI 2021 (race-free), CKD-EPI 2009, MDRD, Mayo, Cockcroft-Gault, and Pediatric Schwartz equations.",
  keywords: [
    "GFR Calculator",
    "eGFR Calculator",
    "Glomerular Filtration Rate Calculator",
    "CKD Stage Calculator",
    "CKD-EPI 2021 Calculator",
    "Kidney Function Calculator",
    "Creatinine Clearance Calculator",
    "Pediatric GFR Calculator",
    "MDRD GFR Calculator",
    "KDIGO CKD Staging",
  ],
  authors: [{ name: "Calculator Platform Nephrology Team" }],
  openGraph: {
    title: "Clinical GFR Calculator & Kidney Function Assessment Suite",
    description:
      "Calculate your eGFR, CKD stage, and KDIGO risk prognosis across 10 modes and 7 clinical equations.",
    type: "website",
    url: "https://calculator-platform.com/calculators/gfr-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "GFR Calculator | NKF-ASN CKD-EPI 2021 & Kidney Health",
    description:
      "Calculate eGFR, CKD stages 1-5, and creatinine clearance across 7 clinical equations.",
  },
};
