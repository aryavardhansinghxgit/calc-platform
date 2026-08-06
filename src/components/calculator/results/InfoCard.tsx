"use client";

import React from "react";
import { Info } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface InfoCardProps {
  title?: string;
  description: string;
}

export function InfoCard({ title = "Pro Tip", description }: InfoCardProps) {
  return (
    <Card className="bg-sky-950/20 border-sky-500/30 rounded-[12px] p-4 flex items-start gap-3">
      <Info className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
      <div className="space-y-1 text-xs">
        {title && <h4 className="font-semibold text-sky-300">{title}</h4>}
        <p className="text-slate-300 leading-relaxed">{description}</p>
      </div>
    </Card>
  );
}

export default InfoCard;
