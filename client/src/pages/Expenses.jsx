import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Plus, RotateCcw } from "lucide-react";
import { fetchExpenses } from "../redux/slices/expenseSlice";
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

  const handleSubmit = async (formData) => {
    try {
      setFormLoading(true);

      if (selectedExpense?._id) {
        await updateExpenseApi(selectedExpense._id, formData);
        toast.success("Expense updated successfully");
      } else {
        await createExpenseApi(formData);
        toast.success("Expense created successfully");
      }

      setIsModalOpen(false);
      setSelectedExpense(null);

      dispatch(fetchExpenses({ page: 1, limit: 10 }));
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
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete expense");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleRetry = () => {
    dispatch(fetchExpenses({ page: 1, limit: 10 }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white px-6 py-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:flex-row lg:items-center lg:justify-between">
        <PageHeader
          title="Expenses"
          subtitle="Track and manage your recorded expenses."
        />

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col gap-1">
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
              className="mt-4"
              title="Reset Filters"
            >
              <span className="hidden sm:inline">Reset</span>
            </Button>
          )}

          <Button icon={Plus} onClick={openAddModal} className="mt-4">
            Add Expense
          </Button>
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
        title={selectedExpense ? "Edit Expense" : "Add Expense"}
        onClose={closeModal}
      >
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
    </div>
  );
};

export default Expenses;
