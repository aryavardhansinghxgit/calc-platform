"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, DollarSign, Calculator } from "lucide-react";
import { ItemizedClosingCosts } from "@/modules/refinance/types";
import { formatCurrency } from "@/lib/calculator-engine/formatters";

export interface RefinanceCostBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  costs: ItemizedClosingCosts;
  onChange: (updated: ItemizedClosingCosts) => void;
}

export function RefinanceCostBreakdownModal({
  isOpen,
  onClose,
  costs,
  onChange,
}: RefinanceCostBreakdownModalProps) {
  if (!isOpen) return null;

  const handleChange = (field: keyof ItemizedClosingCosts, val: number) => {
    onChange({
      ...costs,
      [field]: Math.max(0, val),
    });
  };

  const totalItemized =
    (costs.applicationFee ?? 0) +
    (costs.appraisalFee ?? 0) +
    (costs.originationFee ?? 0) +
    (costs.titleFee ?? 0) +
    (costs.recordingFee ?? 0) +
    (costs.inspectionFee ?? 0) +
    (costs.surveyFee ?? 0) +
    (costs.customFee ?? 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-lg w-full p-6 space-y-4 relative max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className="text-base font-bold text-blue-600 dark:text-blue-400">
                Itemized Refinancing Closing Costs
              </h3>
              <p className="text-xs text-zinc-500">
                Calculate total closing costs by entering itemized lender & title fees
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto pr-1 flex-1 space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-zinc-700 dark:text-zinc-300 font-medium">Application Fee ($)</Label>
              <Input
                type="number"
                min={0}
                value={costs.applicationFee ?? 300}
                onChange={(e) => handleChange("applicationFee", Number(e.target.value))}
                className="mt-1 bg-zinc-50 dark:bg-zinc-800 font-sans tabular-nums text-xs"
              />
            </div>
            <div>
              <Label className="text-zinc-700 dark:text-zinc-300 font-medium">Appraisal Fee ($)</Label>
              <Input
                type="number"
                min={0}
                value={costs.appraisalFee ?? 450}
                onChange={(e) => handleChange("appraisalFee", Number(e.target.value))}
                className="mt-1 bg-zinc-50 dark:bg-zinc-800 font-sans tabular-nums text-xs"
              />
            </div>
            <div>
              <Label className="text-zinc-700 dark:text-zinc-300 font-medium">Loan Origination Fee ($)</Label>
              <Input
                type="number"
                min={0}
                value={costs.originationFee ?? 750}
                onChange={(e) => handleChange("originationFee", Number(e.target.value))}
                className="mt-1 bg-zinc-50 dark:bg-zinc-800 font-sans tabular-nums text-xs"
              />
            </div>
            <div>
              <Label className="text-zinc-700 dark:text-zinc-300 font-medium">Title & Search Fee ($)</Label>
              <Input
                type="number"
                min={0}
                value={costs.titleFee ?? 800}
                onChange={(e) => handleChange("titleFee", Number(e.target.value))}
                className="mt-1 bg-zinc-50 dark:bg-zinc-800 font-sans tabular-nums text-xs"
              />
            </div>
            <div>
              <Label className="text-zinc-700 dark:text-zinc-300 font-medium">Recording Fee ($)</Label>
              <Input
                type="number"
                min={0}
                value={costs.recordingFee ?? 150}
                onChange={(e) => handleChange("recordingFee", Number(e.target.value))}
                className="mt-1 bg-zinc-50 dark:bg-zinc-800 font-sans tabular-nums text-xs"
              />
            </div>
            <div>
              <Label className="text-zinc-700 dark:text-zinc-300 font-medium">Inspection Fee ($)</Label>
              <Input
                type="number"
                min={0}
                value={costs.inspectionFee ?? 200}
                onChange={(e) => handleChange("inspectionFee", Number(e.target.value))}
                className="mt-1 bg-zinc-50 dark:bg-zinc-800 font-sans tabular-nums text-xs"
              />
            </div>
            <div>
              <Label className="text-zinc-700 dark:text-zinc-300 font-medium">Survey Fee ($)</Label>
              <Input
                type="number"
                min={0}
                value={costs.surveyFee ?? 250}
                onChange={(e) => handleChange("surveyFee", Number(e.target.value))}
                className="mt-1 bg-zinc-50 dark:bg-zinc-800 font-sans tabular-nums text-xs"
              />
            </div>
            <div>
              <Label className="text-zinc-700 dark:text-zinc-300 font-medium">Custom Fee ($)</Label>
              <Input
                type="number"
                min={0}
                value={costs.customFee ?? 0}
                onChange={(e) => handleChange("customFee", Number(e.target.value))}
                className="mt-1 bg-zinc-50 dark:bg-zinc-800 font-sans tabular-nums text-xs"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-between text-xs font-bold">
            <span className="text-blue-900 dark:text-blue-200">Total Itemized Closing Costs:</span>
            <span className="text-sm font-sans tabular-nums text-blue-600 dark:text-blue-400">
              {formatCurrency(totalItemized)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <Button type="button" onClick={onClose} className="h-8 text-xs bg-blue-600 text-white">
            Apply Itemized Costs
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RefinanceCostBreakdownModal;
