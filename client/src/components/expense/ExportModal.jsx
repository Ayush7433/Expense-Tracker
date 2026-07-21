import { useState } from "react";
import { toast } from "sonner";
import { FileText, FileSpreadsheet } from "lucide-react";
import Button from "../common/Button";
import {
  getExportDataApi,
  downloadCsvExportApi,
} from "../../redux/services/exportApi";
import { getBudgetStatusApi } from "../../redux/services/budgetApi";
import {
  generateExpensePdf,
  resolveBudgetSnapshotMonth,
} from "../../utils/pdfExport";

const buildScopeLabel = (scope, activeFilters) => {
  if (scope === "all") return "All Expenses";

  const parts = [];
  if (activeFilters.search) parts.push(`Search: "${activeFilters.search}"`);
  if (activeFilters.category) parts.push(`Category: ${activeFilters.category}`);
  if (activeFilters.startDate || activeFilters.endDate) {
    parts.push(
      `Date: ${activeFilters.startDate || "Any"} to ${activeFilters.endDate || "Any"}`,
    );
  }

  return parts.length > 0
    ? `Filtered View — ${parts.join(", ")}`
    : "Current Filtered View";
};

const ExportModal = ({ activeFilters, hasActiveFilters, onClose }) => {
  const [scope, setScope] = useState(hasActiveFilters ? "filtered" : "all");
  const [format, setFormat] = useState("csv");
  const [loading, setLoading] = useState(false);

  const getFilterParams = () => {
    if (scope === "all") return {};

    return {
      search: activeFilters.search,
      category: activeFilters.category,
      startDate: activeFilters.startDate,
      endDate: activeFilters.endDate,
    };
  };

  const handleExport = async () => {
    setLoading(true);

    try {
      const filterParams = getFilterParams();

      if (format === "csv") {
        await downloadCsvExportApi(filterParams);
        toast.success("CSV export downloaded");
      } else {
        const { expenses, summary } = await getExportDataApi(filterParams);

        const snapshotMonth = resolveBudgetSnapshotMonth(
          filterParams.startDate,
          filterParams.endDate,
        );

        let budgetSnapshot = null;
        try {
          budgetSnapshot = await getBudgetStatusApi(snapshotMonth);
        } catch {
          // Budget snapshot is a nice-to-have on the PDF — if it fails,
          // proceed without blocking the export itself.
          budgetSnapshot = null;
        }

        generateExpensePdf({
          expenses,
          summary,
          budgetSnapshot,
          scopeLabel: buildScopeLabel(scope, activeFilters),
        });

        toast.success("PDF export downloaded");
      }

      onClose();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to export expenses";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-medium text-gray-700 dark:text-slate-300">
          Scope
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setScope("all")}
            className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
              scope === "all"
                ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-400"
                : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            All Expenses
          </button>

          <button
            type="button"
            onClick={() => setScope("filtered")}
            disabled={!hasActiveFilters}
            className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
              scope === "filtered"
                ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-400"
                : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
            title={
              !hasActiveFilters ? "No filters currently active" : undefined
            }
          >
            Current Filtered View
          </button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-gray-700 dark:text-slate-300">
          Format
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setFormat("csv")}
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
              format === "csv"
                ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-400"
                : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <FileSpreadsheet size={18} />
            CSV
          </button>

          <button
            type="button"
            onClick={() => setFormat("pdf")}
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
              format === "pdf"
                ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-400"
                : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <FileText size={18} />
            PDF
          </button>
        </div>

        {format === "pdf" && (
          <p className="mt-3 text-xs text-gray-500 dark:text-slate-400">
            The PDF includes a summary, category breakdown, and a budget
            snapshot for the relevant month.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={handleExport}
          loading={loading}
        >
          Export
        </Button>
      </div>
    </div>
  );
};

export default ExportModal;
