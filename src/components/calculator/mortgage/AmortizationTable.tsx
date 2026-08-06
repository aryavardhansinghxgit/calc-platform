"use client";

import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table as TableIcon, Download, Search } from "lucide-react";
import { AmortizationRow } from "@/lib/calculator-engine/formulas/mortgage";
import { formatCurrency } from "@/lib/calculator-engine/formatters";

export interface AmortizationTableProps {
  schedule: AmortizationRow[];
}

export function AmortizationTable({ schedule }: AmortizationTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"annual" | "monthly">("annual");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredData = useMemo(() => {
    let rows = schedule;

    if (viewMode === "annual") {
      rows = schedule.filter((r) => r.month % 12 === 0 || r.month === schedule.length);
    }

    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.month.toString().includes(q) ||
          r.date.toLowerCase().includes(q)
      );
    }

    return rows;
  }, [schedule, viewMode, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const handleDownloadCsv = () => {
    const headers = "Month,Date,Payment,Principal Paid,Interest Paid,Total Interest Paid,Remaining Balance\n";
    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers +
      schedule
        .map(
          (r) =>
            `${r.month},"${r.date}",${r.payment.toFixed(2)},${r.principalPaid.toFixed(2)},${r.interestPaid.toFixed(2)},${r.totalInterestPaid.toFixed(2)},${r.remainingBalance.toFixed(2)}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "amortization_schedule.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="bg-slate-900/90 border-slate-800/80 rounded-[12px] p-6 space-y-6">
      <CardHeader className="p-0 pb-2 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <TableIcon className="h-4 w-4 text-sky-400" /> Amortization Schedule
          </CardTitle>
          <CardDescription className="text-xs text-slate-400">
            Complete month-by-month and annual breakdown of principal and interest payments.
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1 bg-slate-950 rounded-xl border border-slate-800 flex items-center">
            <button
              type="button"
              onClick={() => { setViewMode("annual"); setCurrentPage(1); }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                viewMode === "annual" ? "bg-sky-500 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Annual
            </button>
            <button
              type="button"
              onClick={() => { setViewMode("monthly"); setCurrentPage(1); }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                viewMode === "monthly" ? "bg-sky-500 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Monthly
            </button>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownloadCsv}
            className="h-8 text-xs bg-slate-950 border-slate-800 hover:bg-slate-800 text-sky-400 gap-1.5"
          >
            <Download className="h-3.5 w-3.5" /> Export CSV
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search month or year..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="pl-9 h-9 bg-slate-950/80 border-slate-800 text-xs text-slate-200"
          />
        </div>

        <div className="rounded-xl border border-slate-800 overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-950">
              <TableRow className="border-slate-800">
                <TableHead className="text-xs font-bold text-slate-300">Month</TableHead>
                <TableHead className="text-xs font-bold text-slate-300">Date</TableHead>
                <TableHead className="text-xs font-bold text-slate-300">Payment</TableHead>
                <TableHead className="text-xs font-bold text-slate-300">Principal Paid</TableHead>
                <TableHead className="text-xs font-bold text-slate-300">Interest Paid</TableHead>
                <TableHead className="text-xs font-bold text-slate-300">Total Interest</TableHead>
                <TableHead className="text-xs font-bold text-slate-300 text-right">Remaining Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-xs text-slate-400 py-6">
                    No matching schedule entries found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRows.map((row) => (
                  <TableRow key={row.month} className="border-slate-800/60 hover:bg-slate-950/50">
                    <TableCell className="text-xs font-mono font-semibold text-slate-300">{row.month}</TableCell>
                    <TableCell className="text-xs text-slate-300">{row.date}</TableCell>
                    <TableCell className="text-xs font-mono font-bold text-white">{formatCurrency(row.payment)}</TableCell>
                    <TableCell className="text-xs font-mono text-emerald-400 font-semibold">{formatCurrency(row.principalPaid)}</TableCell>
                    <TableCell className="text-xs font-mono text-amber-400 font-semibold">{formatCurrency(row.interestPaid)}</TableCell>
                    <TableCell className="text-xs font-mono text-slate-400">{formatCurrency(row.totalInterestPaid)}</TableCell>
                    <TableCell className="text-xs font-mono font-bold text-sky-400 text-right">{formatCurrency(row.remainingBalance)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">
              Showing Page {currentPage} of {totalPages} ({filteredData.length} records)
            </span>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="h-7 text-xs bg-slate-950 border-slate-800 disabled:opacity-50"
              >
                Previous
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="h-7 text-xs bg-slate-950 border-slate-800 disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AmortizationTable;
