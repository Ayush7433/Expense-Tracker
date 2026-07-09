import { useEffect, useState } from "react";

const CATEGORY_OPTIONS = [
  { label: "Food", value: "food" },
  { label: "Travel", value: "travel" },
  { label: "Shopping", value: "shopping" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Bills", value: "bills" },
  { label: "Other", value: "other" },
];

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const ExpenseForm = ({
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    expenseDate: getTodayDate(),
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title || "",
        amount:
          initialValues.amount !== undefined && initialValues.amount !== null
            ? String(initialValues.amount)
            : "",
        category: initialValues.category || "",
        description: initialValues.description || "",
        expenseDate: initialValues.expenseDate
          ? new Date(initialValues.expenseDate).toISOString().split("T")[0]
          : getTodayDate(),
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    if (!formData.title.trim()) {
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      return;
    }

    if (!formData.category) {
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      amount: Number(formData.amount),
      category: formData.category,
      description: formData.description.trim(),
      expenseDate: formData.expenseDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g Groceries"
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            required
          >
            <option value="">Select a category</option>
            {CATEGORY_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Expense Date
          </label>
          <input
            type="date"
            name="expenseDate"
            value={formData.expenseDate}
            onChange={handleChange}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Optional note"
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-2xl border border-gray-200 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
        >
          {loading
            ? "Saving..."
            : initialValues
              ? "Update Expense"
              : "Add Expense"}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
