import { useEffect } from "react";
import { CATEGORY_OPTIONS } from "../../constants/categories";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseSchema } from "../../utils/expenseSchema";
import FormField from "../common/FormField";
import Button from "../common/Button";

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
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

  const onFormSubmit = (data) => {
    onSubmit({
      title: data.title,
      amount: data.amount,
      category: data.category,
      description: data.description,
      expenseDate: data.expenseDate,
    });
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


      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="primary"
          loading={loading}
        >
          {initialValues ? "Update Expense" : "Add Expense"}
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;
