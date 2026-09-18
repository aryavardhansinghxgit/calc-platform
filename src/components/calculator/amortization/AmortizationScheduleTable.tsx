"use client";

import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Download,
  Search,
  Calendar,
  Clock,
  FileSpreadsheet,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { AmortizationRow, AnnualAmortizationRow } from "@/modules/amortization/types";
import { formatCurrency, formatMonthYear } from "@/lib/calculator-engine/formatters";

export interface AmortizationScheduleTableProps {
  monthlySchedule: AmortizationRow[];
  annualSchedule: AnnualAmortizationRow[];
}

type SortField =
  | "paymentNumber"
  | "paymentDate"
  | "beginningBalance"
  | "paymentAmount"
  | "principalPaid"
  | "interestPaid"
  | "endingBalance"
  | "year";
type SortDirection = "asc" | "desc";

const DEFAULT_AMORTIZATION_OVERLAY = {
  annualTab: "Annual Schedule",
  monthlyTab: "Monthly Schedule",
  searchYearPlaceholder: "Search year...",
  searchPaymentPlaceholder: "Search payment or date...",
  exportCsvBtn: "Export CSV",
  exportExcelBtn: "Excel",
  yearCol: "Year",
  paymentNumberCol: "Payment #",
  paymentDateCol: "Payment Date",
  beginningBalanceCol: "Beginning Balance",
  paymentAmountCol: "Payment Amount",
  principalPaidCol: "Principal",
  interestPaidCol: "Interest",
  extraPaidCol: "Extra Paid",
  endingBalanceCol: "Ending Balance",
  prevPage: "Prev",
  nextPage: "Next",
  pageOf: "Page",
  showingRecords: "Showing",
  paymentsLabel: "payments",
};

export function AmortizationScheduleTable({
  monthlySchedule,
  annualSchedule,
}: AmortizationScheduleTableProps) {
  const overlay = DEFAULT_AMORTIZATION_OVERLAY;
  const activeIntlLocale = "en-US";

  const [activeTab, setActiveTab] = useState<"annual" | "monthly">("annual");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [sortField, setSortField] = useState<SortField>(activeTab === "annual" ? "year" : "paymentNumber");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Handle column header sorting toggle
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Helper to get formatted date string for a monthly row
  const getFormattedRowDate = (row: AmortizationRow): string => {
    if (row.paymentMonth && row.paymentYear) {
      return formatMonthYear(row.paymentMonth, row.paymentYear, activeIntlLocale, "short");
    }
    return row.paymentDate;
  };

  // Filter and sort active dataset
  const processedRows = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    if (activeTab === "annual") {
      let rows = [...annualSchedule];
      if (q) {
        rows = rows.filter(
          (r) =>
            r.year.toString().includes(q) ||
            `${overlay.yearCol} ${r.year}`.toLowerCase().includes(q) ||
            formatCurrency(r.endingBalance, "$", 2, activeIntlLocale).toLowerCase().includes(q)
        );
      }

      rows.sort((a, b) => {
        let valA: any = a[sortField as keyof AnnualAmortizationRow] ?? a.year;
        let valB: any = b[sortField as keyof AnnualAmortizationRow] ?? b.year;
        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();

        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });

      return rows;
    } else {
      let rows = [...monthlySchedule];
      if (q) {
        rows = rows.filter((r) => {
          const dateStr = getFormattedRowDate(r).toLowerCase();
          return (
            r.paymentNumber.toString().includes(q) ||
            dateStr.includes(q) ||
            r.paymentDate.toLowerCase().includes(q) ||
            `${overlay.paymentNumberCol} ${r.paymentNumber}`.toLowerCase().includes(q)
          );
        });
      }

      rows.sort((a, b) => {
        let valA: any = a[sortField as keyof AmortizationRow] ?? a.paymentNumber;
        let valB: any = b[sortField as keyof AmortizationRow] ?? b.paymentNumber;
        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();

        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });

      return rows;
    }
  }, [activeTab, annualSchedule, monthlySchedule, searchTerm, sortField, sortDirection, activeIntlLocale, overlay]);

  const totalPages = Math.ceil(processedRows.length / itemsPerPage) || 1;

  const paginatedRows = useMemo(() => {
    if (itemsPerPage === -1) return processedRows;
    const start = (currentPage - 1) * itemsPerPage;
    return processedRows.slice(start, start + itemsPerPage);
  }, [processedRows, currentPage, itemsPerPage]);

  // Export CSV
  const handleExportCsv = () => {
    let headers = "";
    let csvLines: string[] = [];

    if (activeTab === "annual") {
      headers = `${overlay.yearCol},${overlay.beginningBalanceCol},${overlay.paymentAmountCol},${overlay.principalPaidCol},${overlay.interestPaidCol},${overlay.endingBalanceCol}\n`;
      csvLines = annualSchedule.map(
        (r) =>
          `${r.year},${r.beginningBalance.toFixed(2)},${r.totalPayment.toFixed(2)},${r.principalPaid.toFixed(2)},${r.interestPaid.toFixed(2)},${r.endingBalance.toFixed(2)}`
      );
    } else {
      headers = `${overlay.paymentNumberCol},${overlay.paymentDateCol},${overlay.beginningBalanceCol},${overlay.paymentAmountCol},${overlay.principalPaidCol},${overlay.interestPaidCol},${overlay.endingBalanceCol}\n`;
      csvLines = monthlySchedule.map(
        (r) =>
          `${r.paymentNumber},"${getFormattedRowDate(r)}",${r.beginningBalance.toFixed(2)},${r.paymentAmount.toFixed(2)},${r.principalPaid.toFixed(2)},${r.interestPaid.toFixed(2)},${r.endingBalance.toFixed(2)}`
      );
    }

    const csvContent = "data:text/csv;charset=utf-8," + headers + csvLines.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `amortization_${activeTab}_schedule.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Excel
  const handleExportExcel = () => {
    handleExportCsv();
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
    <div className="space-y-4">
      {/* Controls Header: Tabs, Search, Export Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700/80">
        {/* Schedule View Tabs */}
        <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <button
            type="button"
            onClick={() => {
              setActiveTab("annual");
              setCurrentPage(1);
              setSortField("year");
              setSortDirection("asc");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === "annual"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" /> {overlay.annualTab}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("monthly");
              setCurrentPage(1);
              setSortField("paymentNumber");
              setSortDirection("asc");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === "monthly"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <Clock className="h-3.5 w-3.5" /> {overlay.monthlyTab}
          </button>
        </div>

        {/* Search & Export Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
            <Input
              placeholder={activeTab === "annual" ? overlay.searchYearPlaceholder : overlay.searchPaymentPlaceholder}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8 h-8 w-full sm:w-44 text-xs bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
            />
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            className="h-8 text-xs border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 gap-1 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Download className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> {overlay.exportCsvBtn}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleExportExcel}
            className="h-8 text-xs border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 gap-1 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> {overlay.exportExcelBtn}
          </Button>
        </div>
      </div>

      {/* Table Container with Sticky Header & Mobile Horizontal Scroll */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-x-auto max-h-[500px] overflow-y-auto shadow-xs">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-zinc-100/90 dark:bg-zinc-800/90 backdrop-blur-xs">
            <TableRow className="border-zinc-200 dark:border-zinc-800">
              {activeTab === "monthly" ? (
                <>
                  <TableHead
                    onClick={() => handleSort("paymentNumber")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    {overlay.paymentNumberCol} {renderSortIcon("paymentNumber")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("paymentDate")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    {overlay.paymentDateCol} {renderSortIcon("paymentDate")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("beginningBalance")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    {overlay.beginningBalanceCol} {renderSortIcon("beginningBalance")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("paymentAmount")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    {overlay.paymentAmountCol} {renderSortIcon("paymentAmount")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("principalPaid")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    {overlay.principalPaidCol} {renderSortIcon("principalPaid")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("interestPaid")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    {overlay.interestPaidCol} {renderSortIcon("interestPaid")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("endingBalance")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    {overlay.endingBalanceCol} {renderSortIcon("endingBalance")}
                  </TableHead>
                </>
              ) : (
                <>
                  <TableHead
                    onClick={() => handleSort("year")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    {overlay.yearCol} {renderSortIcon("year")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("principalPaid")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    {overlay.principalPaidCol} {renderSortIcon("principalPaid")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("interestPaid")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    {overlay.interestPaidCol} {renderSortIcon("interestPaid")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("endingBalance")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    {overlay.endingBalanceCol} {renderSortIcon("endingBalance")}
                  </TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={activeTab === "monthly" ? 7 : 4} className="text-center text-xs text-zinc-500 py-8">
                  No records found.
                </TableCell>
              </TableRow>
            ) : activeTab === "monthly" ? (
              paginatedRows.map((row: any) => (
                <TableRow
                  key={`month-${row.paymentNumber}`}
                  className="border-zinc-100 dark:border-zinc-800/60 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors"
                >
                  <TableCell className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {row.paymentNumber}
                  </TableCell>
                  <TableCell className="text-xs text-zinc-500 dark:text-zinc-400 font-sans tabular-nums">
                    {getFormattedRowDate(row)}
                  </TableCell>
                  <TableCell className="text-xs font-sans tabular-nums text-zinc-600 dark:text-zinc-400 text-right">
                    {formatCurrency(row.beginningBalance, "$", 2, activeIntlLocale)}
                  </TableCell>
                  <TableCell className="text-xs font-sans tabular-nums font-semibold text-zinc-900 dark:text-zinc-100 text-right">
                    {formatCurrency(row.paymentAmount, "$", 2, activeIntlLocale)}
                  </TableCell>
                  <TableCell className="text-xs font-sans tabular-nums text-emerald-600 dark:text-emerald-400 font-medium text-right">
                    {formatCurrency(row.principalPaid, "$", 2, activeIntlLocale)}
                  </TableCell>
                  <TableCell className="text-xs font-sans tabular-nums text-amber-600 dark:text-amber-400 font-medium text-right">
                    {formatCurrency(row.interestPaid, "$", 2, activeIntlLocale)}
                  </TableCell>
                  <TableCell className="text-xs font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400 text-right">
                    {formatCurrency(row.endingBalance, "$", 2, activeIntlLocale)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              paginatedRows.map((row: any) => (
                <TableRow
                  key={`year-${row.year}`}
                  className="border-zinc-100 dark:border-zinc-800/60 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors"
                >
                  <TableCell className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {overlay.yearCol} {row.year}
                  </TableCell>
                  <TableCell className="text-xs font-sans tabular-nums text-emerald-600 dark:text-emerald-400 font-medium text-right">
                    {formatCurrency(row.principalPaid, "$", 2, activeIntlLocale)}
                  </TableCell>
                  <TableCell className="text-xs font-sans tabular-nums text-amber-600 dark:text-amber-400 font-medium text-right">
                    {formatCurrency(row.interestPaid, "$", 2, activeIntlLocale)}
                  </TableCell>
                  <TableCell className="text-xs font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400 text-right">
                    {formatCurrency(row.endingBalance, "$", 2, activeIntlLocale)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer & Page Size Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span>{overlay.showingRecords}:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="h-7 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs px-2 text-zinc-900 dark:text-zinc-100"
          >
            <option value={12}>12 {overlay.paymentsLabel}</option>
            <option value={24}>24 {overlay.paymentsLabel}</option>
            <option value={50}>50 {overlay.paymentsLabel}</option>
            <option value={-1}>All ({processedRows.length})</option>
          </select>
        </div>

        {itemsPerPage !== -1 && totalPages > 1 && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 font-sans tabular-nums">
              {overlay.pageOf} {currentPage} / {totalPages} ({processedRows.length})
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="h-7 text-xs px-2.5 border-zinc-200 dark:border-zinc-700 cursor-pointer"
              >
                {overlay.prevPage}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="h-7 text-xs px-2.5 border-zinc-200 dark:border-zinc-700 cursor-pointer"
              >
                {overlay.nextPage}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AmortizationScheduleTable;
