"use client";

import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search, Calendar, Clock, FileSpreadsheet, ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react";
import { EmiAmortizationRow, AnnualEmiRow } from "@/modules/emi/types";
import { formatCurrency } from "@/lib/calculator-engine/formatters";

export interface EmiScheduleTableProps {
  monthlySchedule: EmiAmortizationRow[];
  annualSchedule: AnnualEmiRow[];
}

type SortField = "paymentNumber" | "paymentDate" | "beginningBalance" | "emiAmount" | "principalPaid" | "interestPaid" | "endingBalance" | "year";
type SortDirection = "asc" | "desc";

export function EmiScheduleTable({ monthlySchedule, annualSchedule }: EmiScheduleTableProps) {
  const [activeTab, setActiveTab] = useState<"annual" | "monthly">("annual");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [sortField, setSortField] = useState<SortField>(activeTab === "annual" ? "year" : "paymentNumber");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const processedRows = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    if (activeTab === "annual") {
      let rows = [...annualSchedule];
      if (q) {
        rows = rows.filter(
          (r) =>
            r.year.toString().includes(q) ||
            `year ${r.year}`.includes(q) ||
            formatCurrency(r.endingBalance).toLowerCase().includes(q)
        );
      }

      rows.sort((a, b) => {
        let valA: any = a[sortField as keyof AnnualEmiRow] ?? a.year;
        let valB: any = b[sortField as keyof AnnualEmiRow] ?? b.year;
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
        rows = rows.filter(
          (r) =>
            r.paymentNumber.toString().includes(q) ||
            r.paymentDate.toLowerCase().includes(q) ||
            formatCurrency(r.endingBalance).toLowerCase().includes(q)
        );
      }

      rows.sort((a, b) => {
        let valA: any = a[sortField as keyof EmiAmortizationRow] ?? a.paymentNumber;
        let valB: any = b[sortField as keyof EmiAmortizationRow] ?? b.paymentNumber;
        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();

        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });

      return rows;
    }
  }, [activeTab, annualSchedule, monthlySchedule, searchTerm, sortField, sortDirection]);

  const totalPages = Math.ceil(processedRows.length / itemsPerPage) || 1;

  const paginatedRows = useMemo(() => {
    if (itemsPerPage === -1) return processedRows;
    const start = (currentPage - 1) * itemsPerPage;
    return processedRows.slice(start, start + itemsPerPage);
  }, [processedRows, currentPage, itemsPerPage]);

  const handleExportCsv = () => {
    let headers = "";
    let csvLines: string[] = [];

    if (activeTab === "annual") {
      headers = "Year,Beginning Balance,Total Payment,Principal Paid,Interest Paid,Ending Balance\n";
      csvLines = annualSchedule.map(
        (r) =>
          `${r.year},${r.beginningBalance.toFixed(2)},${r.totalPayment.toFixed(2)},${r.principalPaid.toFixed(2)},${r.interestPaid.toFixed(2)},${r.endingBalance.toFixed(2)}`
      );
    } else {
      headers = "Payment Number,Date,Beginning Balance,EMI Amount,Principal Paid,Interest Paid,Extra Paid,Ending Balance\n";
      csvLines = monthlySchedule.map(
        (r) =>
          `${r.paymentNumber},"${r.paymentDate}",${r.beginningBalance.toFixed(2)},${r.emiAmount.toFixed(2)},${r.principalPaid.toFixed(2)},${r.interestPaid.toFixed(2)},${r.extraPaid.toFixed(2)},${r.endingBalance.toFixed(2)}`
      );
    }

    const csvContent = "data:text/csv;charset=utf-8," + headers + csvLines.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `emi_${activeTab}_schedule.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      {/* Controls Header: Tabs, Search, Export */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700/80">
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
            <Calendar className="h-3.5 w-3.5" /> Annual Schedule
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
            <Clock className="h-3.5 w-3.5" /> Monthly Schedule
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
            <Input
              placeholder={activeTab === "annual" ? "Search year..." : "Search payment or date..."}
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
            className="h-8 text-xs border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 gap-1 bg-white dark:bg-zinc-900"
          >
            <Download className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> CSV
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleExportExcel}
            className="h-8 text-xs border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 gap-1 bg-white dark:bg-zinc-900"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Excel
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-x-auto max-h-[480px] overflow-y-auto shadow-xs">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-zinc-100/90 dark:bg-zinc-800/90 backdrop-blur-xs">
            <TableRow className="border-zinc-200 dark:border-zinc-800">
              {activeTab === "monthly" ? (
                <>
                  <TableHead
                    onClick={() => handleSort("paymentNumber")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    Payment # {renderSortIcon("paymentNumber")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("paymentDate")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    Date {renderSortIcon("paymentDate")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("beginningBalance")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    Beginning Balance {renderSortIcon("beginningBalance")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("emiAmount")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    EMI Payment {renderSortIcon("emiAmount")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("principalPaid")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    Principal Paid {renderSortIcon("principalPaid")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("interestPaid")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    Interest Paid {renderSortIcon("interestPaid")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("endingBalance")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    Ending Balance {renderSortIcon("endingBalance")}
                  </TableHead>
                </>
              ) : (
                <>
                  <TableHead
                    onClick={() => handleSort("year")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    Year {renderSortIcon("year")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("principalPaid")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    Principal Paid {renderSortIcon("principalPaid")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("interestPaid")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    Interest Paid {renderSortIcon("interestPaid")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("endingBalance")}
                    className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 select-none"
                  >
                    Ending Balance {renderSortIcon("endingBalance")}
                  </TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={activeTab === "monthly" ? 7 : 4} className="text-center text-xs text-zinc-500 py-8">
                  No EMI entries found for "{searchTerm}".
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
                  <TableCell className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    {row.paymentDate}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-zinc-600 dark:text-zinc-400 text-right">
                    {formatCurrency(row.beginningBalance)}
                  </TableCell>
                  <TableCell className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100 text-right">
                    {formatCurrency(row.emiAmount)}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium text-right">
                    {formatCurrency(row.principalPaid)}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-amber-600 dark:text-amber-400 font-medium text-right">
                    {formatCurrency(row.interestPaid)}
                  </TableCell>
                  <TableCell className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 text-right">
                    {formatCurrency(row.endingBalance)}
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
                    Year {row.year}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium text-right">
                    {formatCurrency(row.principalPaid)}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-amber-600 dark:text-amber-400 font-medium text-right">
                    {formatCurrency(row.interestPaid)}
                  </TableCell>
                  <TableCell className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 text-right">
                    {formatCurrency(row.endingBalance)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
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
            <option value={50}>50 rows</option>
            <option value={-1}>All rows ({processedRows.length})</option>
          </select>
        </div>

        {itemsPerPage !== -1 && totalPages > 1 && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 font-mono">
              Page {currentPage} of {totalPages} ({processedRows.length} total entries)
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

export default EmiScheduleTable;
