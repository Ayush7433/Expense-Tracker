import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Plus, RotateCcw } from "lucide-react";
import { fetchExpenses } from "../redux/slices/expenseSlice";
import { fetchBudgetStatus } from "../redux/slices/budgetSlice";
import ExpenseTable from "../components/expense/ExpenseTable";
import Loader from "../components/common/Loader";
import PageHeader from "../components/common/PageHeader";
import ErrorBanner from "../components/common/ErrorBanner";
import {
  createExpenseApi,
  deleteExpenseApi,
  updateExpenseApi,
} from "../redux/services/expenseApi";
import Modal from "../components/common/Modal";
import ExpenseForm from "../components/expense/ExpenseForm";
import DeleteConfirmationModal from "../components/common/DeleteConfirmationModal";
import Button from "../components/common/Button";
import { useSearchParams } from "react-router-dom";
import FilterBar from "../components/expense/FilterBar";
import DateRangeFilter from "../components/expense/DateRangeFilter";
import Pagination from "../components/expense/Pagination";
import ExportModal from "../components/expense/ExportModal";
import QuickAddExpenseModal from "../components/expense/QuickAddExpenseModal";
import { Download, Sparkles } from "lucide-react";

const Expenses = () => {
  const dispatch = useDispatch();

  const { expenses, loading, error, pagination } = useSelector(
    (state) => state.expense,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isAiDraft, setIsAiDraft] = useState(false);

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  const hasFilters = Boolean(search || category || startDate || endDate);

  const resetFilters = () => {
    setSearchParams({});
  };

  useEffect(() => {
    dispatch(
      fetchExpenses({
        page,
        limit: 10,
        search,
        category,
        startDate,
        endDate,
      }),
    );
  }, [dispatch, page, search, category, startDate, endDate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const openAddModal = () => {
    setSelectedExpense(null);
    setIsModalOpen(true);
  };

  const openEditModal = (expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (formLoading) return;
    setIsModalOpen(false);
    setSelectedExpense(null);
    setIsAiDraft(false);
  };

  const openDeleteModal = (expense) => {
    if (deleteLoading) return;

    setExpenseToDelete(expense);
    setDeleteOpenModal(true);
  };

  const closeDeleteModal = () => {
    if (deleteLoading) return;

    setExpenseToDelete(null);
    setDeleteOpenModal(false);
  };

  const handleSubmit = async (formData, meta = {}) => {
    try {
      setFormLoading(true);

      if (selectedExpense?._id) {
        await updateExpenseApi(selectedExpense._id, formData);
        if (meta.overBudget) {
          toast.warning(
            meta.messages?.[0] || "Expense updated — you're over budget",
          );
        } else {
          toast.success("Expense updated successfully");
        }
      } else {
        await createExpenseApi(formData);
        if (meta.overBudget) {
          toast.warning(
            meta.messages?.[0] || "Expense saved — you're over budget",
          );
        } else {
          toast.success("Expense created successfully");
        }
      }

      setIsModalOpen(false);
      setSelectedExpense(null);

      dispatch(fetchExpenses({ page: 1, limit: 10 }));
      const expenseMonth = (
        formData.expenseDate || new Date().toISOString()
      ).slice(0, 7);
      dispatch(fetchBudgetStatus(expenseMonth));
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteExpense = async () => {
    try {
      setDeleteLoading(true);

      await deleteExpenseApi(expenseToDelete._id);
      toast.success("Expense deleted successfully");
      closeDeleteModal();

      dispatch(
        fetchExpenses({
          page: 1,
          limit: 10,
        }),
      );
      const deletedMonth = (
        expenseToDelete?.expenseDate ||
        expenseToDelete?.createdAt ||
        new Date().toISOString()
      ).slice(0, 7);
      dispatch(fetchBudgetStatus(deletedMonth));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete expense");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleRetry = () => {
    dispatch(fetchExpenses({ page: 1, limit: 10 }));
  };

  const handleParsed = (parsedDraft) => {
    setIsQuickAddOpen(false);
    setSelectedExpense(parsedDraft);
    setIsAiDraft(true);
    setIsModalOpen(true);
  };

  const handleManualEntry = () => {
    setIsQuickAddOpen(false);
    setIsAiDraft(false);
    openAddModal();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white px-6 py-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
          <PageHeader
            title="Expenses"
            subtitle="Track and manage your recorded expenses."
          />

          <div className="flex gap-3">
            <Button
              variant="outline"
              icon={Download}
              onClick={() => setIsExportModalOpen(true)}
              className="flex-1 sm:flex-none"
            >
              Export
            </Button>

            <Button
              icon={Plus}
              onClick={() => setIsQuickAddOpen(true)}
              className="flex-1 sm:flex-none"
            >
              Add Expense
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white px-6 py-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex w-full flex-col gap-1 sm:w-auto">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Categories
              </label>
              <FilterBar />
            </div>

            <DateRangeFilter />

            {hasFilters && (
              <Button
                variant="outline"
                icon={RotateCcw}
                onClick={resetFilters}
                title="Reset Filters"
                className="w-full sm:w-auto"
              >
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>

      {error ? <ErrorBanner message={error} onRetry={handleRetry} /> : null}

      {loading && expenses.length === 0 ? (
        <Loader message="Loading expenses..." />
      ) : (
        <>
          <ExpenseTable
            expenses={expenses}
            loading={loading}
            pagination={pagination}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        </>
      )}

      <Modal
        open={isModalOpen}
        title={
          isAiDraft
            ? "Confirm AI-Parsed Expense"
            : selectedExpense
              ? "Edit Expense"
              : "Add Expense"
        }
        onClose={closeModal}
      >
        {isAiDraft && (
          <p className="mb-4 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
            <Sparkles size={16} />
            AI-parsed — please review the details before saving.
          </p>
        )}
        <ExpenseForm
          initialValues={selectedExpense}
          loading={formLoading}
          onCancel={closeModal}
          onSubmit={handleSubmit}
        />
      </Modal>
      <DeleteConfirmationModal
        open={deleteOpenModal}
        loading={deleteLoading}
        onCancel={closeDeleteModal}
        onConfirm={handleDeleteExpense}
      />

      <Modal
        open={isQuickAddOpen}
        title="Add Expense"
        onClose={() => setIsQuickAddOpen(false)}
      >
        <QuickAddExpenseModal
          onParsed={handleParsed}
          onManualEntry={handleManualEntry}
          onClose={() => setIsQuickAddOpen(false)}
        />
      </Modal>

      <Modal
        open={isExportModalOpen}
        title="Export Expenses"
        onClose={() => setIsExportModalOpen(false)}
      >
        <ExportModal
          activeFilters={{ search, category, startDate, endDate }}
          hasActiveFilters={hasFilters}
          onClose={() => setIsExportModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Expenses;
