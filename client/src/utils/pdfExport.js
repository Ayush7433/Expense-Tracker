import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatMonthLabel = (month) => {
  if (!month) return "";
  const [year, mon] = month.split("-").map(Number);
  return `${MONTH_NAMES[mon - 1]} ${year}`;
};

const formatCurrency = (value) =>
  `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;

const formatDate = (dateValue) => {
  if (!dateValue) return "";
  return new Date(dateValue).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getCategoryLabel = (category) => {
  if (category === "overall") return "Overall";
  return category.charAt(0).toUpperCase() + category.slice(1);
};

/**
 * Generates and downloads a PDF expense report.
 *
 * @param {Object} params
 * @param {Array}  params.expenses        - List of expense records.
 * @param {Object} params.summary         - { totalAmount, count, categoryBreakdown: [{category, total}] }
 * @param {Object|null} params.budgetSnapshot - { month, categories: [...], overall } or null if unavailable.
 * @param {string} params.scopeLabel      - Human-readable description of what was exported.
 */
export const generateExpensePdf = ({
  expenses = [],
  summary = {},
  budgetSnapshot = null,
  scopeLabel = "All Expenses",
}) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 14;
  let cursorY = 18;

  // --- Header ---
  doc.setFontSize(18);
  doc.setFont(undefined, "bold");
  doc.text("Expense Tracker", marginX, cursorY);

  doc.setFontSize(11);
  doc.setFont(undefined, "normal");
  cursorY += 7;
  doc.text("Expense Report", marginX, cursorY);

  doc.setFontSize(9);
  doc.setTextColor(100);
  cursorY += 6;
  doc.text(
    `Generated on: ${new Date().toLocaleString("en-IN")}`,
    marginX,
    cursorY,
  );
  cursorY += 5;
  const scopeLines = doc.splitTextToSize(
    `Scope: ${scopeLabel}`,
    pageWidth - marginX * 2,
  );
  doc.text(scopeLines, marginX, cursorY);
  cursorY += scopeLines.length * 5 + 4;

  doc.setTextColor(0);

  // --- Summary ---
  doc.setFontSize(12);
  doc.setFont(undefined, "bold");
  doc.text("Summary", marginX, cursorY);
  cursorY += 6;

  doc.setFontSize(10);
  doc.setFont(undefined, "normal");
  doc.text(`Total Expenses: ${summary.count || 0}`, marginX, cursorY);
  doc.text(
    `Total Amount: ${formatCurrency(summary.totalAmount)}`,
    marginX + 80,
    cursorY,
  );
  cursorY += 8;

  if (summary.categoryBreakdown?.length) {
    autoTable(doc, {
      startY: cursorY,
      head: [["Category", "Total Spent"]],
      body: summary.categoryBreakdown.map((item) => [
        getCategoryLabel(item.category),
        formatCurrency(item.total),
      ]),
      theme: "grid",
      headStyles: { fillColor: [59, 130, 246] },
      styles: { fontSize: 9 },
      margin: { left: marginX, right: marginX },
    });
    cursorY = doc.lastAutoTable.finalY + 10;
  }

  // --- Budget Snapshot ---
  if (budgetSnapshot) {
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text(
      `Budget Snapshot - ${formatMonthLabel(budgetSnapshot.month)}`,
      marginX,
      cursorY,
    );
    cursorY += 6;

    const rows = [];

    if (budgetSnapshot.overall && budgetSnapshot.overall.limit > 0) {
      rows.push([
        "Overall",
        formatCurrency(budgetSnapshot.overall.spent),
        formatCurrency(budgetSnapshot.overall.limit),
        budgetSnapshot.overall.percentage !== null
          ? `${budgetSnapshot.overall.percentage}%`
          : "-",
      ]);
    }

    (budgetSnapshot.categories || [])
      .filter((item) => item.limit > 0)
      .forEach((item) => {
        rows.push([
          getCategoryLabel(item.category),
          formatCurrency(item.spent),
          formatCurrency(item.limit),
          item.percentage !== null ? `${item.percentage}%` : "-",
        ]);
      });

    if (rows.length) {
      autoTable(doc, {
        startY: cursorY,
        head: [["Category", "Spent", "Limit", "% Used"]],
        body: rows,
        theme: "grid",
        headStyles: { fillColor: [34, 197, 94] },
        styles: { fontSize: 9 },
        margin: { left: marginX, right: marginX },
      });
      cursorY = doc.lastAutoTable.finalY + 10;
    } else {
      doc.setFontSize(9);
      doc.setFont(undefined, "italic");
      doc.text("No budgets set for this month.", marginX, cursorY);
      cursorY += 10;
    }
  }

  // --- Expense Table ---
  doc.setFontSize(12);
  doc.setFont(undefined, "bold");
  doc.text("Expenses", marginX, cursorY);
  cursorY += 4;

  autoTable(doc, {
    startY: cursorY,
    head: [["Title", "Amount", "Category", "Date", "Description"]],
    body: expenses.map((expense) => [
      expense.title,
      formatCurrency(expense.amount),
      getCategoryLabel(expense.category),
      formatDate(expense.expenseDate || expense.createdAt),
      expense.description || "-",
    ]),
    theme: "striped",
    headStyles: { fillColor: [30, 41, 59] },
    styles: { fontSize: 8 },
    columnStyles: {
      4: { cellWidth: 50 },
    },
    margin: { left: marginX, right: marginX },
  });

  if (expenses.length === 0) {
    doc.setFontSize(10);
    doc.setFont(undefined, "italic");
    doc.text("No expenses found for this export.", marginX, cursorY + 8);
  }

  const filename = `expenses-export-${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(filename);
};

/**
 * Resolves which month's budget snapshot should be shown for a given export,
 * based on the active date-range filter (if any).
 * - If startDate and endDate both fall within the same calendar month, that
 *   month is used.
 * - Otherwise (no filter, or a range spanning multiple months), falls back
 *   to the current month.
 */
export const resolveBudgetSnapshotMonth = (startDate, endDate) => {
  const getMonthKey = (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  };

  if (startDate && endDate) {
    const startMonth = getMonthKey(startDate);
    const endMonth = getMonthKey(endDate);
    if (startMonth === endMonth) {
      return startMonth;
    }
  }

  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};
