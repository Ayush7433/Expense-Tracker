const Expense = require("../models/Expense");

const buildExpenseQuery = (
  userId,
  { search, category, startDate, endDate },
) => {
  const query = { user: userId };

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  if (startDate || endDate) {
    query.expenseDate = {};
    if (startDate) query.expenseDate.$gte = new Date(startDate);
    if (endDate) query.expenseDate.$lte = new Date(endDate);
  }

  return query;
};

const EXPORT_LIMIT = 5000;

const createExpense = async (req, res) => {
  try {
    const { title, amount, category, description, expenseDate } = req.body;
    if (!title || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, amount and category are required",
      });
    }

    const user = req.user;

    const expense = await Expense.create({
      title,
      amount,
      category,
      description,
      expenseDate,
      user: user._id,
    });

    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating expense",
    });
  }
};

const getExpenses = async (req, res) => {
  try {
    const user = req.user;

    const {
      search,
      category,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;

    const query = buildExpenseQuery(user._id, {
      search,
      category,
      startDate,
      endDate,
    });

    const skip = (page - 1) * limit;

    const expenses = await Expense.find(query)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(Number(limit));

    const totalExpenses = await Expense.countDocuments(query);

    res.status(200).json({
      success: true,
      count: expenses.length,
      totalExpenses,
      currentPage: Number(page),
      totalPages: Math.ceil(totalExpenses / limit),
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching expenses",
    });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating expense" + error,
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    const deletedExpense = await expense.deleteOne();

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting expense" + error,
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const stats = await Expense.aggregate([
      {
        $match: {
          user: req.user._id,
        },
      },
      {
        $group: {
          _id: null,
          totalExpenses: {
            $sum: 1,
          },
          totalAmount: {
            $sum: "$amount",
          },
          averageExpenses: {
            $avg: "$amount",
          },
          highestExpense: {
            $max: "$amount",
          },
          lowestExpense: {
            $min: "$amount",
          },
          thisMonthExpense: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gte: ["$expenseDate", startOfMonth] },
                    { $lt: ["$expenseDate", endOfMonth] },
                  ],
                },
                "$amount",
                0,
              ],
            },
          },
        },
      },
    ]);

    const dashboardStats = stats[0] || {
      totalExpenses: 0,
      totalAmount: 0,
      averageExpenses: 0,
      highestExpense: 0,
      lowestExpense: 0,
      thisMonthExpense: 0,
    };

    const categoryBreakdown = await Expense.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $project: { _id: 0, category: "$_id", total: 1 } },
    ]);

    const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);

    const monthlyBreakdown = await Expense.aggregate([
      {
        $match: {
          user: req.user._id,
          expenseDate: { $gte: twelveMonthsAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$expenseDate" } },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, month: "$_id", total: 1 } },
    ]);

    res.status(200).json({
      success: true,
      stats: dashboardStats,
      categoryBreakdown,
      monthlyBreakdown,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard stats" + error,
    });
  }
};

const exportExpenses = async (req, res) => {
  try {
    const user = req.user;
    const { search, category, startDate, endDate, format } = req.query;

    const query = buildExpenseQuery(user._id, {
      search,
      category,
      startDate,
      endDate,
    });

    const expenses = await Expense.find(query)
      .sort({ expenseDate: -1 })
      .limit(EXPORT_LIMIT);

    const summaryAgg = await Expense.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const categoryBreakdown = await Expense.aggregate([
      { $match: query },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $project: { _id: 0, category: "$_id", total: 1 } },
    ]);

    const summary = {
      totalAmount: summaryAgg[0]?.totalAmount || 0,
      count: summaryAgg[0]?.count || 0,
      categoryBreakdown,
    };

    if (format === "csv") {
      const header = ["Title", "Amount", "Category", "Date", "Description"];

      const escapeCsvValue = (value) => {
        const stringValue =
          value === undefined || value === null ? "" : String(value);
        if (/[",\n]/.test(stringValue)) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      };

      const rows = expenses.map((expense) =>
        [
          expense.title,
          expense.amount,
          expense.category,
          expense.expenseDate
            ? expense.expenseDate.toISOString().split("T")[0]
            : "",
          expense.description || "",
        ]
          .map(escapeCsvValue)
          .join(","),
      );

      const csvContent = [header.join(","), ...rows].join("\n");
      const filename = `expenses-export-${new Date().toISOString().split("T")[0]}.csv`;

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`,
      );

      return res.status(200).send(csvContent);
    }

    res.status(200).json({
      success: true,
      expenses,
      summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error exporting expenses",
    });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getDashboardStats,
  exportExpenses,
};
