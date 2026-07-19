import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { budgetSchema } from "../../utils/budgetSchema";
import { CATEGORY_OPTIONS } from "../../constants/categories";
import FormField from "../common/FormField";
import Button from "../common/Button";

const BUDGET_CATEGORY_OPTIONS = [
  { label: "Overall (All Categories)", value: "overall" },
  ...CATEGORY_OPTIONS,
];

const BudgetForm = ({ initialValues, onSubmit, onCancel, loading = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      category: "",
      amount: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        category: initialValues.category || "",
        amount:
          initialValues.amount !== undefined && initialValues.amount !== null
            ? Number(initialValues.amount)
            : "",
      });
    }
  }, [initialValues, reset]);

  const onFormSubmit = (data) => {
    onSubmit({
      category: data.category,
      amount: data.amount,
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
      <FormField
        label="Category"
        as="select"
        error={errors.category?.message}
        {...register("category")}
      >
        <option value="">Select a category</option>
        {BUDGET_CATEGORY_OPTIONS.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </FormField>

      <FormField
        label="Monthly Limit"
        type="number"
        placeholder="0.00"
        min="0.01"
        step="0.01"
        error={errors.amount?.message}
        {...register("amount", { valueAsNumber: true })}
      />

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" variant="primary" loading={loading}>
          Save Budget
        </Button>
      </div>
    </form>
  );
};

export default BudgetForm;
