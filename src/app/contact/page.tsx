import React from "react";
import { Metadata } from "next";
import { ContactFeedbackClient } from "@/components/contact/ContactFeedbackClient";

export const metadata: Metadata = {
  title: "Feedback, Calculator Requests & Contact Support | CalcPlatform",
  description:
    "Send feedback, suggest new mathematical formulas or calculators, report calculation discrepancies, or reach out to the CalcPlatform engineering team.",
  openGraph: {
    title: "Feedback & Contact Hub | CalcPlatform",
    description:
      "Share feedback, suggest new calculators, or contact our engineering team directly.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactFeedbackClient />;
}
