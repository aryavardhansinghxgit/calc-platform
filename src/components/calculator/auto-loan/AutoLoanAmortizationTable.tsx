"use client";

import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search, FileSpreadsheet, ArrowUpDown, ChevronUp, ChevronDown, Calendar, Clock } from "lucide-react";
import { AmortizationMonthRow, AmortizationYearRow } from "@/lib/calculator-engine/formulas/auto-loan";
import { formatCurrency } from "@/lib/calculator-engine/formatters";

export interface AutoLoanAmortizationTableProps {
  monthlySchedule: AmortizationMonthRow[];
  annualSchedule: AmortizationYearRow[];
}

type SortField = "month" | "payment" | "principal" | "interest" | "totalInterestPaid" | "remainingBalance";
type SortDirection = "asc" | "desc";

export function AutoLoanAmortizationTable({ monthlySchedule, annualSchedule }: AutoLoanAmortizationTableProps) {
  const [viewMode, setViewMode] = useState<"monthly" | "annual">("monthly");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [sortField, setSortField] = useState<SortField>("month");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const processedMonthlyRows = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    let rows = [...monthlySchedule];

    if (q) {
      rows = rows.filter(
        (r) =>
          r.month.toString().includes(q) ||
          formatCurrency(r.payment).toLowerCase().includes(q) ||
          formatCurrency(r.remainingBalance).toLowerCase().includes(q)
      );
    }

    rows.sort((a, b) => {
      let valA: any = a[sortField] ?? a.month;
      let valB: any = b[sortField] ?? b.month;

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return rows;
  }, [monthlySchedule, searchTerm, sortField, sortDirection]);

  const totalPages = Math.ceil(processedMonthlyRows.length / itemsPerPage) || 1;

  const paginatedMonthlyRows = useMemo(() => {
    if (itemsPerPage === -1) return processedMonthlyRows;
    const start = (currentPage - 1) * itemsPerPage;
    return processedMonthlyRows.slice(start, start + itemsPerPage);
  }, [processedMonthlyRows, currentPage, itemsPerPage]);

  const handleExportCsv = () => {
    let headers = "";
    let csvLines: string[] = [];

    if (viewMode === "monthly") {
      headers = "Month,Payment,Principal Paid,Interest Paid,Total Interest,Remaining Balance,LTV %\n";
      csvLines = monthlySchedule.map(
        (r) =>
          `${r.month},${r.payment.toFixed(2)},${r.principal.toFixed(2)},${r.interest.toFixed(2)},${r.totalInterestPaid.toFixed(2)},${r.remainingBalance.toFixed(2)},${r.loanToValueRatio}%`
      );
    } else {
      headers = "Year,Principal Paid,Interest Paid,Ending Balance\n";
      csvLines = annualSchedule.map(
        (r) => `${r.year},${r.principalPaid.toFixed(2)},${r.interestPaid.toFixed(2)},${r.endingBalance.toFixed(2)}`
      );
    }

    const csvContent = "data:text/csv;charset=utf-8," + headers + csvLines.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `auto_loan_amortization_${viewMode}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-3 w-3 opacity-40 ml-1 inline" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="h-3 w-3 text-blue-600 dark:text-blue-400 ml-1 inline" />
    ) : (
      <ChevronDown className="h-3 w-3 text-blue-600 dark:text-blue-400 ml-1 inline" />
    );
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
      {/* Header Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <h3 className="text-base font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">Amortization Schedule
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Detailed breakdown of principal, interest, and remaining balance over time.
          </p>
        </div>

        {/* View Toggle & Export Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Monthly / Annual Toggle */}
          <div className="inline-flex items-center p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <button
              type="button"
              onClick={() => {
                setViewMode("monthly");
                setCurrentPage(1);
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                viewMode === "monthly"
                  ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode("annual");
                setCurrentPage(1);
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                viewMode === "annual"
                  ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              Annual
            </button>
          </div>

          {/* CSV Export */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            className="h-8 text-xs gap-1.5 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-zinc-500" />
            CSV Export
          </Button>

          {/* Excel Export */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            className="h-8 text-xs gap-1.5 border-emerald-200 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 cursor-pointer"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            Excel Export
          </Button>
        </div>
      </div>

      {/* Search & Filter Toolbar (Only for Monthly view) */}
      {viewMode === "monthly" && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <Input
              type="text"
              placeholder="Search month or balance..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8 h-8 text-xs bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus-visible:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto text-zinc-500 dark:text-zinc-400">
            <span>Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="h-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs px-2 text-zinc-800 dark:text-zinc-200 focus-visible:outline-none"
            >
              <option value={12}>12 (1 Yr)</option>
              <option value={24}>24 (2 Yrs)</option>
              <option value={60}>60 (5 Yrs)</option>
              <option value={-1}>All Rows</option>
            </select>
          </div>
        </div>
      )}

      {/* Table Area */}
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-x-auto">
        {viewMode === "monthly" ? (
          <Table>
            <TableHeader className="bg-zinc-50 dark:bg-zinc-950/60">
              <TableRow className="hover:bg-transparent border-zinc-200 dark:border-zinc-800">
                <TableHead
                  onClick={() => handleSort("month")}
                  className="cursor-pointer font-bold text-xs text-zinc-700 dark:text-zinc-300 select-none py-2.5"
                >
                  Month {renderSortIcon("month")}
                </TableHead>
                <TableHead
                  onClick={() => handleSort("payment")}
                  className="cursor-pointer font-bold text-xs text-zinc-700 dark:text-zinc-300 text-right select-none py-2.5"
                >
                  Payment {renderSortIcon("payment")}
                </TableHead>
                <TableHead
                  onClick={() => handleSort("principal")}
                  className="cursor-pointer font-bold text-xs text-zinc-700 dark:text-zinc-300 text-right select-none py-2.5"
                >
                  Principal {renderSortIcon("principal")}
                </TableHead>
                <TableHead
                  onClick={() => handleSort("interest")}
                  className="cursor-pointer font-bold text-xs text-zinc-700 dark:text-zinc-300 text-right select-none py-2.5"
                >
                  Interest {renderSortIcon("interest")}
                </TableHead>
                <TableHead
                  onClick={() => handleSort("totalInterestPaid")}
                  className="cursor-pointer font-bold text-xs text-zinc-700 dark:text-zinc-300 text-right select-none py-2.5"
                >
                  Cum. Interest {renderSortIcon("totalInterestPaid")}
                </TableHead>
                <TableHead
                  onClick={() => handleSort("remainingBalance")}
                  className="cursor-pointer font-bold text-xs text-zinc-700 dark:text-zinc-300 text-right select-none py-2.5"
                >
                  Ending Balance {renderSortIcon("remainingBalance")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedMonthlyRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-zinc-400 text-xs">
                    No matching schedule records found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedMonthlyRows.map((r) => (
                  <TableRow
                    key={`m-${r.month}`}
                    className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 border-zinc-100 dark:border-zinc-800/60 font-sans tabular-nums text-xs"
                  >
                    <TableCell className="font-semibold text-zinc-900 dark:text-zinc-100 py-2">
                      Mo {r.month}
                    </TableCell>
                    <TableCell className="text-right text-zinc-900 dark:text-zinc-100 py-2">
                      {formatCurrency(r.payment)}
                    </TableCell>
                    <TableCell className="text-right text-blue-600 dark:text-blue-400 font-semibold py-2">
                      {formatCurrency(r.principal)}
                    </TableCell>
                    <TableCell className="text-right text-emerald-600 dark:text-emerald-400 font-semibold py-2">
                      {formatCurrency(r.interest)}
                    </TableCell>
                    <TableCell className="text-right text-zinc-500 dark:text-zinc-400 py-2">
                      {formatCurrency(r.totalInterestPaid)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-zinc-900 dark:text-zinc-100 py-2">
                      {formatCurrency(r.remainingBalance)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHeader className="bg-zinc-50 dark:bg-zinc-950/60">
              <TableRow className="hover:bg-transparent border-zinc-200 dark:border-zinc-800">
                <TableHead className="font-bold text-xs text-zinc-700 dark:text-zinc-300 py-2.5">
                  Year
                </TableHead>
                <TableHead className="font-bold text-xs text-zinc-700 dark:text-zinc-300 text-right py-2.5">
                  Principal Paid
                </TableHead>
                <TableHead className="font-bold text-xs text-zinc-700 dark:text-zinc-300 text-right py-2.5">
                  Interest Paid
                </TableHead>
                <TableHead className="font-bold text-xs text-zinc-700 dark:text-zinc-300 text-right py-2.5">
                  Ending Balance
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {annualSchedule.map((yr) => (
                <TableRow
                  key={`yr-${yr.year}`}
                  className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 border-zinc-100 dark:border-zinc-800/60 font-sans tabular-nums text-xs"
                >
                  <TableCell className="font-semibold text-zinc-900 dark:text-zinc-100 py-2.5">
                    Year {yr.year}
                  </TableCell>
                  <TableCell className="text-right text-blue-600 dark:text-blue-400 font-semibold py-2.5">
                    {formatCurrency(yr.principalPaid)}
                  </TableCell>
                  <TableCell className="text-right text-emerald-600 dark:text-emerald-400 font-semibold py-2.5">
                    {formatCurrency(yr.interestPaid)}
                  </TableCell>
                  <TableCell className="text-right font-bold text-zinc-900 dark:text-zinc-100 py-2.5">
                    {formatCurrency(yr.endingBalance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination Footer */}
      {viewMode === "monthly" && itemsPerPage !== -1 && totalPages > 1 && (
        <div className="flex items-center justify-between pt-1 text-xs text-zinc-500 dark:text-zinc-400">
          <span>
            Page <strong className="text-zinc-900 dark:text-zinc-100">{currentPage}</strong> of{" "}
            <strong className="text-zinc-900 dark:text-zinc-100">{totalPages}</strong> ({processedMonthlyRows.length} total payments)
          </span>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="h-7 px-2.5 text-xs border-zinc-200 dark:border-zinc-800 disabled:opacity-40"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="h-7 px-2.5 text-xs border-zinc-200 dark:border-zinc-800 disabled:opacity-40"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
