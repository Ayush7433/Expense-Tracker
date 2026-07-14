import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Funnel, Plus, RefreshCw } from "lucide-react";
import { fetchExpenses } from "../redux/slices/expenseSlice";
import ExpenseTable from "../components/expense/ExpenseTable";
import Loader from "../components/common/Loader";
import {
  createExpenseApi,
  deleteExpenseApi,
  updateExpenseApi,
} from "../redux/services/expenseApi";
import Modal from "../components/common/Modal";
import ExpenseForm from "../components/expense/ExpenseForm";
import DeleteConfirmationModal from "../components/common/DeleteConfirmationModal";
import { useSearchParams } from "react-router-dom";
import FilterBar from "../components/expense/FilterBar";

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
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "";

  useEffect(() => {
    dispatch(
      fetchExpenses({
        page,
        limit: 10,
        search,
        category,
      }),
    );
  }, [dispatch, page, search, category]);

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
      <div className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white px-6 py-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>

          <p className="mt-2 text-sm text-gray-500">
            Track and manage your recorded expenses.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-slate-500">
              <Funnel size={18} />
            </label>
            <FilterBar />
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Expense
          </button>
        </div>
      </div>

      {error ? (
        <div className="flex flex-col gap-3 rounded-3xl border border-red-200 bg-red-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-red-700">{error}</p>
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            <RefreshCw size={16} />
            Retry
          </button>
        </div>
      ) : null}

      {loading && expenses.length === 0 ? (
        <Loader message="Loading expenses..." />
      ) : (
        <ExpenseTable
          expenses={expenses}
          loading={loading}
          pagination={pagination}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />
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
