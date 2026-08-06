"use client";

import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
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
      rows = rows.filter((r) => r.month.toString().includes(q) || r.date.toLowerCase().includes(q));
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
    <div className="space-y-3">
      {/* Controls row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center">
            <button
              type="button"
              onClick={() => { setViewMode("annual"); setCurrentPage(1); }}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                viewMode === "annual" ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              Annual
            </button>
            <button
              type="button"
              onClick={() => { setViewMode("monthly"); setCurrentPage(1); }}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                viewMode === "monthly" ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              Monthly
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-zinc-400" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="pl-8 h-8 w-36 text-xs bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
            />
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleDownloadCsv}
          className="h-7 text-[11px] border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 gap-1"
        >
          <Download className="h-3 w-3" /> CSV
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <TableHead className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Month</TableHead>
              <TableHead className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Date</TableHead>
              <TableHead className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Payment</TableHead>
              <TableHead className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Principal</TableHead>
              <TableHead className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Interest</TableHead>
              <TableHead className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Total Interest</TableHead>
              <TableHead className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-xs text-zinc-400 py-4">
                  No matching entries.
                </TableCell>
              </TableRow>
            ) : (
              paginatedRows.map((row) => (
                <TableRow key={row.month} className="border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <TableCell className="text-xs font-mono text-zinc-600 dark:text-zinc-400">{row.month}</TableCell>
                  <TableCell className="text-xs text-zinc-600 dark:text-zinc-400">{row.date}</TableCell>
                  <TableCell className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100">{formatCurrency(row.payment)}</TableCell>
                  <TableCell className="text-xs font-mono text-emerald-600 dark:text-emerald-400">{formatCurrency(row.principalPaid)}</TableCell>
                  <TableCell className="text-xs font-mono text-amber-600 dark:text-amber-400">{formatCurrency(row.interestPaid)}</TableCell>
                  <TableCell className="text-xs font-mono text-zinc-500">{formatCurrency(row.totalInterestPaid)}</TableCell>
                  <TableCell className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 text-right">{formatCurrency(row.remainingBalance)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-zinc-400">
            Page {currentPage}/{totalPages} ({filteredData.length} rows)
          </span>
          <div className="flex items-center gap-1">
            <Button type="button" variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="h-6 text-[11px] px-2">
              Prev
            </Button>
            <Button type="button" variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)} className="h-6 text-[11px] px-2">
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AmortizationTable;
