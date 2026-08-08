"use client";

import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search, Printer } from "lucide-react";
import { AmortizationComparisonRow } from "@/modules/refinance/types";
import { formatCurrency } from "@/lib/calculator-engine/formatters";

export interface RefinanceAmortizationTableProps {
  schedule: AmortizationComparisonRow[];
}

export function RefinanceAmortizationTable({ schedule }: RefinanceAmortizationTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);

  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return schedule;
    const q = searchTerm.trim().toLowerCase();
    return schedule.filter((r) => r.month.toString().includes(q) || `month ${r.month}`.includes(q));
  }, [schedule, searchTerm]);

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage) || 1;

  const paginatedRows = useMemo(() => {
    if (itemsPerPage === -1) return filteredRows;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRows.slice(start, start + itemsPerPage);
  }, [filteredRows, currentPage, itemsPerPage]);

  const handleExportCsv = () => {
    const headers = "Month,Current Payment,Current Principal,Current Interest,Current Balance,New Payment,New Principal,New Interest,New Balance\n";
    const csvLines = schedule.map(
      (r) =>
        `${r.month},${r.currentPayment.toFixed(2)},${r.currentPrincipal.toFixed(2)},${r.currentInterest.toFixed(2)},${r.currentBalance.toFixed(2)},${r.newPayment.toFixed(2)},${r.newPrincipal.toFixed(2)},${r.newInterest.toFixed(2)},${r.newBalance.toFixed(2)}`
    );

    const csvContent = "data:text/csv;charset=utf-8," + headers + csvLines.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "refinance_amortization_comparison.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Search & Export Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700/80">
        <div className="relative flex-1 sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
          <Input
            placeholder="Search month number..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-8 h-8 text-xs bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            className="h-8 text-xs border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 gap-1 bg-white dark:bg-zinc-900"
          >
            <Download className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> Export CSV
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="h-8 text-xs border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 gap-1 bg-white dark:bg-zinc-900"
          >
            <Printer className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" /> Print
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-x-auto max-h-[480px] overflow-y-auto shadow-xs">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-zinc-100/90 dark:bg-zinc-800/90 backdrop-blur-xs">
            <TableRow className="border-zinc-200 dark:border-zinc-800 text-[11px]">
              <TableHead className="font-bold"># Month</TableHead>
              <TableHead className="font-bold text-center bg-rose-50/50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200" colSpan={4}>
                CURRENT LOAN SCHEDULE
              </TableHead>
              <TableHead className="font-bold text-center bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200" colSpan={4}>
                NEW REFINANCED LOAN SCHEDULE
              </TableHead>
            </TableRow>
            <TableRow className="border-zinc-200 dark:border-zinc-800 text-[10px] uppercase font-bold text-zinc-500">
              <TableHead className="py-1">Month</TableHead>
              <TableHead className="py-1 text-right">Payment</TableHead>
              <TableHead className="py-1 text-right">Principal</TableHead>
              <TableHead className="py-1 text-right">Interest</TableHead>
              <TableHead className="py-1 text-right">Balance</TableHead>
              <TableHead className="py-1 text-right">Payment</TableHead>
              <TableHead className="py-1 text-right">Principal</TableHead>
              <TableHead className="py-1 text-right">Interest</TableHead>
              <TableHead className="py-1 text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs font-mono">
            {paginatedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-xs text-zinc-500 py-8">
                  No month matching "{searchTerm}".
                </TableCell>
              </TableRow>
            ) : (
              paginatedRows.map((row) => (
                <TableRow key={`schedule-comp-${row.month}`} className="border-zinc-100 dark:border-zinc-800/60 hover:bg-blue-50/30 dark:hover:bg-blue-950/20">
                  <TableCell className="font-sans font-bold">{row.month}</TableCell>
                  <TableCell className="text-right">{formatCurrency(row.currentPayment)}</TableCell>
                  <TableCell className="text-right text-zinc-600 dark:text-zinc-400">{formatCurrency(row.currentPrincipal)}</TableCell>
                  <TableCell className="text-right text-amber-600 dark:text-amber-400">{formatCurrency(row.currentInterest)}</TableCell>
                  <TableCell className="text-right font-semibold text-rose-600 dark:text-rose-400">{formatCurrency(row.currentBalance)}</TableCell>
                  <TableCell className="text-right font-bold text-blue-600 dark:text-blue-400">{formatCurrency(row.newPayment)}</TableCell>
                  <TableCell className="text-right text-emerald-600 dark:text-emerald-400">{formatCurrency(row.newPrincipal)}</TableCell>
                  <TableCell className="text-right text-amber-600 dark:text-amber-400">{formatCurrency(row.newInterest)}</TableCell>
                  <TableCell className="text-right font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(row.newBalance)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span>Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="h-7 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs px-2 text-zinc-900 dark:text-zinc-100"
          >
            <option value={12}>12 rows</option>
            <option value={24}>24 rows</option>
            <option value={60}>60 rows</option>
            <option value={-1}>All rows ({filteredRows.length})</option>
          </select>
        </div>

        {itemsPerPage !== -1 && totalPages > 1 && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 font-mono">
              Page {currentPage} of {totalPages} ({filteredRows.length} total months)
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="h-7 text-xs px-2.5 border-zinc-200 dark:border-zinc-700"
              >
                Previous
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="h-7 text-xs px-2.5 border-zinc-200 dark:border-zinc-700"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RefinanceAmortizationTable;
