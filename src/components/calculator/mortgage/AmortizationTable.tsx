"use client";

import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search, Calendar, Clock } from "lucide-react";
import { AmortizationRow } from "@/lib/calculator-engine/formulas/mortgage";
import { formatCurrency } from "@/lib/calculator-engine/formatters";

export interface AmortizationTableProps {
  schedule: AmortizationRow[];
}

interface AnnualScheduleRow {
  year: number;
  periodLabel: string;
  totalPayment: number;
  principalPaid: number;
  interestPaid: number;
  extraPaid: number;
  taxesPaid: number;
  insurancePaid: number;
  pmiPaid: number;
  otherPaid: number;
  remainingBalance: number;
  dateRange: string;
}

export function AmortizationTable({ schedule }: AmortizationTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"annual" | "monthly">("annual");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Aggregate monthly rows into annual rows for Annual Tab
  const annualSchedule = useMemo(() => {
    if (!schedule || schedule.length === 0) return [];
    
    const map = new Map<number, AnnualScheduleRow>();

    schedule.forEach((row) => {
      const y = row.year;
      if (!map.has(y)) {
        map.set(y, {
          year: y,
          periodLabel: `Year ${y}`,
          totalPayment: 0,
          principalPaid: 0,
          interestPaid: 0,
          extraPaid: 0,
          taxesPaid: 0,
          insurancePaid: 0,
          pmiPaid: 0,
          otherPaid: 0,
          remainingBalance: row.remainingBalance,
          dateRange: row.date,
        });
      }

      const item = map.get(y)!;
      item.totalPayment += row.payment;
      item.principalPaid += row.principalPaid;
      item.interestPaid += row.interestPaid;
      item.extraPaid += row.extraPaid || 0;
      item.taxesPaid += row.propertyTax || 0;
      item.insurancePaid += row.homeInsurance || 0;
      item.pmiPaid += row.pmi || 0;
      item.otherPaid += (row.hoaFee || 0) + (row.otherCosts || 0);
      item.remainingBalance = row.remainingBalance; // End of year balance
      item.dateRange = item.dateRange.includes("-")
        ? item.dateRange.split(" - ")[0] + " - " + row.date
        : item.dateRange + " - " + row.date;
    });

    return Array.from(map.values());
  }, [schedule]);

  // Filtered data based on active view mode and search term
  const displayedRows = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    if (viewMode === "annual") {
      if (!q) return annualSchedule;
      return annualSchedule.filter(
        (r) =>
          r.periodLabel.toLowerCase().includes(q) ||
          r.year.toString().includes(q) ||
          r.dateRange.toLowerCase().includes(q)
      );
    } else {
      if (!q) return schedule;
      return schedule.filter(
        (r) =>
          r.month.toString().includes(q) ||
          r.date.toLowerCase().includes(q) ||
          `month ${r.month}`.includes(q)
      );
    }
  }, [schedule, annualSchedule, viewMode, searchTerm]);

  const totalPages = Math.ceil(displayedRows.length / itemsPerPage) || 1;
  
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return displayedRows.slice(start, start + itemsPerPage);
  }, [displayedRows, currentPage]);

  const handleDownloadCsv = () => {
    let headers = "";
    let csvLines: string[] = [];

    if (viewMode === "annual") {
      headers = "Year,Date Range,Total Payment,Principal Paid,Interest Paid,Extra Principal,Ending Balance\n";
      csvLines = annualSchedule.map(
        (r) =>
          `${r.year},"${r.dateRange}",${r.totalPayment.toFixed(2)},${(r.principalPaid + r.extraPaid).toFixed(2)},${r.interestPaid.toFixed(2)},${r.extraPaid.toFixed(2)},${r.remainingBalance.toFixed(2)}`
      );
    } else {
      headers = "Month,Date,Payment,Principal,Interest,Extra Paid,Taxes & Fees,Remaining Balance\n";
      csvLines = schedule.map(
        (r) =>
          `${r.month},"${r.date}",${r.payment.toFixed(2)},${r.principalPaid.toFixed(2)},${r.interestPaid.toFixed(2)},${(r.extraPaid || 0).toFixed(2)},${((r.propertyTax || 0) + (r.homeInsurance || 0) + (r.pmi || 0) + (r.hoaFee || 0) + (r.otherCosts || 0)).toFixed(2)},${r.remainingBalance.toFixed(2)}`
      );
    }

    const csvContent = "data:text/csv;charset=utf-8," + headers + csvLines.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mortgage_amortization_${viewMode}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Tab Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700/80">
        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <button
            type="button"
            onClick={() => {
              setViewMode("annual");
              setCurrentPage(1);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              viewMode === "annual"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            Annual Tab
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode("monthly");
              setCurrentPage(1);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              viewMode === "monthly"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            Monthly Tab
          </button>
        </div>

        {/* Search & Export */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
            <Input
              placeholder={viewMode === "annual" ? "Filter by year or date..." : "Filter by month or date..."}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8 h-8 w-full sm:w-48 text-xs bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
            />
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownloadCsv}
            className="h-8 text-xs border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 gap-1.5 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Download className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Amortization Table */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-800/80">
              <TableHead className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {viewMode === "annual" ? "Period (Year)" : "Period (Month)"}
              </TableHead>
              <TableHead className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Date</TableHead>
              <TableHead className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right">Payment</TableHead>
              <TableHead className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right">Principal</TableHead>
              <TableHead className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right">Interest</TableHead>
              <TableHead className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right">Remaining Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-xs text-zinc-500 py-8">
                  No amortization entries found for "{searchTerm}".
                </TableCell>
              </TableRow>
            ) : (
              paginatedRows.map((row: any) => {
                const periodLabel = viewMode === "annual" ? `Year ${row.year}` : `Month ${row.month}`;
                const dateLabel = viewMode === "annual" ? row.dateRange : row.date;
                const paymentAmount = viewMode === "annual" ? row.totalPayment : row.payment;
                const principalAmount =
                  viewMode === "annual"
                    ? row.principalPaid + (row.extraPaid || 0)
                    : row.principalPaid + (row.extraPaid || 0);
                const interestAmount = row.interestPaid;
                const balanceAmount = row.remainingBalance;

                return (
                  <TableRow
                    key={viewMode === "annual" ? `year-${row.year}` : `month-${row.month}`}
                    className="border-zinc-100 dark:border-zinc-800/60 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors"
                  >
                    <TableCell className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      {periodLabel}
                    </TableCell>
                    <TableCell className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                      {dateLabel}
                    </TableCell>
                    <TableCell className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100 text-right">
                      {formatCurrency(paymentAmount)}
                    </TableCell>
                    <TableCell className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium text-right">
                      {formatCurrency(principalAmount)}
                    </TableCell>
                    <TableCell className="text-xs font-mono text-amber-600 dark:text-amber-400 font-medium text-right">
                      {formatCurrency(interestAmount)}
                    </TableCell>
                    <TableCell className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 text-right">
                      {formatCurrency(balanceAmount)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            Showing Page {currentPage} of {totalPages} ({displayedRows.length} total entries)
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
  );
}

export default AmortizationTable;
