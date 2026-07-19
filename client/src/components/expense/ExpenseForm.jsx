import { useEffect, useState } from "react";
import { CATEGORY_OPTIONS } from "../../constants/categories";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseSchema } from "../../utils/expenseSchema";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { AlertTriangle } from "lucide-react";
import { getBudgetStatusApi } from "../../redux/services/budgetApi";

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const getLabel = (category) => {
  if (category === "overall") return "Overall";
  return category.charAt(0).toUpperCase() + category.slice(1);
};

const ExpenseForm = ({
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      amount: "",
      category: "",
      description: "",
      expenseDate: getTodayDate(),
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [checkingBudget, setCheckingBudget] = useState(false);
  const [budgetWarning, setBudgetWarning] = useState(null); // { messages: string[], pendingData }

  useEffect(() => {
    if (initialValues) {
      reset({
        title: initialValues.title || "",
        amount:
          initialValues.amount !== undefined && initialValues.amount !== null
            ? Number(initialValues.amount)
            : "",
        category: initialValues.category || "",
        description: initialValues.description || "",
        expenseDate: initialValues.expenseDate
          ? new Date(initialValues.expenseDate).toISOString().split("T")[0]
          : getTodayDate(),
      });
    }
  }, [initialValues, reset]);

  /**
   * Checks the given payload against current budget status for its month.
   * Returns an array of human-readable warning strings (empty if no budget
   * would be exceeded, or if the check itself fails — we fail open rather
   * than blocking expense entry over a budget-service hiccup).
   */
  const checkBudgetImpact = async (data) => {
    const month = data.expenseDate?.slice(0, 7);
    if (!month) return [];

    try {
      const response = await getBudgetStatusApi(month);
      const categories = response?.categories || [];
      const overall = response?.overall || null;

      // If we're editing an expense that already belongs to this same month,
      // subtract its old amount first so we don't double-count it.
      const sameMonth =
        initialValues?.expenseDate &&
        new Date(initialValues.expenseDate).toISOString().slice(0, 7) === month;

      const oldCategoryAmount =
        initialValues && sameMonth && initialValues.category === data.category
          ? Number(initialValues.amount || 0)
          : 0;

      const oldOverallAmount =
        initialValues && sameMonth ? Number(initialValues.amount || 0) : 0;

      const warnings = [];

      const categoryEntry = categories.find(
        (c) => c.category === data.category,
      );
      if (categoryEntry && categoryEntry.limit > 0) {
        const projectedSpent =
          categoryEntry.spent - oldCategoryAmount + data.amount;
        if (projectedSpent > categoryEntry.limit) {
          warnings.push(
            `This will put you ₹${(projectedSpent - categoryEntry.limit).toLocaleString()} over your ${getLabel(
              data.category,
            )} budget for ${month}.`,
          );
        }
      }

      if (overall && overall.limit > 0) {
        const projectedOverall = overall.spent - oldOverallAmount + data.amount;
        if (projectedOverall > overall.limit) {
          warnings.push(
            `This will put you ₹${(projectedOverall - overall.limit).toLocaleString()} over your Overall budget for ${month}.`,
          );
        }
      }

      return warnings;
    } catch (error) {
      return [];
    }
  };

  const onFormSubmit = async (data) => {
    const payload = {
      title: data.title,
      amount: data.amount,
      category: data.category,
      description: data.description,
      expenseDate: data.expenseDate,
    };

    setCheckingBudget(true);
    const warnings = await checkBudgetImpact(payload);
    setCheckingBudget(false);

    if (warnings.length > 0) {
      setBudgetWarning({ messages: warnings, pendingData: payload });
      return;
    }

    onSubmit(payload, { overBudget: false });
  };

  const handleConfirmAnyway = () => {
    if (!budgetWarning) return;
    onSubmit(budgetWarning.pendingData, {
      overBudget: true,
      messages: budgetWarning.messages,
    });
    setBudgetWarning(null);
  };

  const handleDismissWarning = () => {
    setBudgetWarning(null);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FormField
            label="Title"
            placeholder="e.g Groceries"
            error={errors.title?.message}
            {...register("title")}
          />
        </div>

        <div>
          <FormField
            label="Amount"
            type="number"
            placeholder="0.00"
            min="0.01"
            step="0.01"
            error={errors.amount?.message}
            {...register("amount", { valueAsNumber: true })}
          />
        </div>

        <div>
          <FormField
            label="Category"
            as="select"
            error={errors.category?.message}
            {...register("category")}
          >
            <option value="">Select a category</option>
            {CATEGORY_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </FormField>
        </div>

        <div className="sm:col-span-2">
          <FormField
            label="Expense Date"
            type="date"
            error={errors.expenseDate?.message}
            {...register("expenseDate")}
          />
        </div>

        <div className="sm:col-span-2">
          <FormField
            label="Description"
            as="textarea"
            rows="4"
            placeholder="Optional note"
            error={errors.description?.message}
            {...register("description")}
          />
        </div>
      </div>

      {budgetWarning && (
        <div className="flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 dark:border-amber-900 dark:bg-amber-950/30">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={18}
              className="mt-0.5 flex-shrink-0 text-amber-600 dark:text-amber-400"
            />
            <div className="space-y-1">
              {budgetWarning.messages.map((msg, index) => (
                <p
                  key={index}
                  className="text-sm font-medium text-amber-800 dark:text-amber-300"
                >
                  {msg}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              type="button"
              onClick={handleDismissWarning}
            >
              Go Back
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={handleConfirmAnyway}
              loading={loading}
            >
              Save Anyway
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button
          type="submit"
          variant="primary"
          loading={loading || checkingBudget}
          disabled={!!budgetWarning}
        >
          {initialValues ? "Update Expense" : "Add Expense"}
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;
