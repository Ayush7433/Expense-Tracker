import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import PageHeader from "../components/common/PageHeader";
import Loader from "../components/common/Loader";
import ErrorBanner from "../components/common/ErrorBanner";
import Modal from "../components/common/Modal";
import BudgetForm from "../components/budget/BudgetForm";
import BudgetOverview from "../components/budget/BudgetOverview";
import MonthSelector from "../components/budget/MonthSelector";
import {
  fetchBudgets,
  fetchBudgetStatus,
  setSelectedMonth,
} from "../redux/slices/budgetSlice";
import { createOrUpdateBudgetApi } from "../redux/services/budgetApi";

const Budgets = () => {
  const dispatch = useDispatch();
  const { selectedMonth, categories, overall, loading, error } = useSelector(
    (state) => state.budget
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchBudgets(selectedMonth));
    dispatch(fetchBudgetStatus(selectedMonth));
  }, [dispatch, selectedMonth]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleMonthChange = (month) => {
    dispatch(setSelectedMonth(month));
  };

  const openEditModal = (budgetData) => {
    setSelectedBudget(budgetData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (formLoading) return;
    setIsModalOpen(false);
    setSelectedBudget(null);
  };

  const handleSubmit = async (formData) => {
    try {
      setFormLoading(true);

      await createOrUpdateBudgetApi({
        ...formData,
        month: selectedMonth,
      });

      toast.success("Budget saved successfully");
      setIsModalOpen(false);
      setSelectedBudget(null);

      dispatch(fetchBudgets(selectedMonth));
      dispatch(fetchBudgetStatus(selectedMonth));
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to save budget";
      toast.error(message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleRetry = () => {
    dispatch(fetchBudgets(selectedMonth));
    dispatch(fetchBudgetStatus(selectedMonth));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white px-6 py-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:flex-row lg:items-center lg:justify-between">
        <PageHeader
          title="Budgets"
          subtitle="Set monthly spending limits and track your progress."
        />

        <MonthSelector month={selectedMonth} onChange={handleMonthChange} />
      </div>

      {error ? <ErrorBanner message={error} onRetry={handleRetry} /> : null}

      {loading ? (
        <Loader message="Loading budgets..." />
      ) : (
        <BudgetOverview
          overall={overall}
          categories={categories}
          onEdit={openEditModal}
        />
      )}

      <Modal
        open={isModalOpen}
        title={selectedBudget?.limit > 0 ? "Edit Budget" : "Set Budget"}
        onClose={closeModal}
      >
        <BudgetForm
          initialValues={
            selectedBudget
              ? {
                  category: selectedBudget.category,
                  amount: selectedBudget.limit,
                }
              : null
          }
          loading={formLoading}
          onCancel={closeModal}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default Budgets;
