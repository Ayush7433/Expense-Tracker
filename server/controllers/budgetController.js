const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

const CATEGORIES = [
  "food",
  "travel",
  "entertainment",
  "shopping",
  "bills",
  "other",
];

const MONTH_REGEX = /^\d{4}-(0[1-9]|1[0-2])$/;

const getMonthRange = (month) => {
  // month format: 'YYYY-MM'
  const [year, mon] = month.split("-").map(Number);
  const startOfMonth = new Date(year, mon - 1, 1);
  const endOfMonth = new Date(year, mon, 1);
  return { startOfMonth, endOfMonth };
};

const createOrUpdateBudget = async (req, res) => {
  try {
    const { category, amount, month } = req.body;

    if (!category || amount === undefined || !month) {
      return res.status(400).json({
        success: false,
        message: "Category, amount and month are required",
      });
    }

    if (!MONTH_REGEX.test(month)) {
      return res.status(400).json({
        success: false,
        message: "Month must be in YYYY-MM format",
      });
    }

    const budget = await Budget.findOneAndUpdate(
      { user: req.user._id, category, month },
      { amount },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Budget saved successfully",
      budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving budget",
    });
  }
};

const getBudgets = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({
        success: false,
        message: "Month is required",
      });
    }

    if (!MONTH_REGEX.test(month)) {
      return res.status(400).json({
        success: false,
        message: "Month must be in YYYY-MM format",
      });
    }

    const budgets = await Budget.find({ user: req.user._id, month });

    res.status(200).json({
      success: true,
      budgets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching budgets",
    });
  }
};

const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;

    const budget = await Budget.findOne({ _id: id, user: req.user._id });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    await budget.deleteOne();

    res.status(200).json({
      success: true,
      message: "Budget deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting budget",
    });
  }
};

const getBudgetStatus = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({
        success: false,
        message: "Month is required",
      });
    }

    if (!MONTH_REGEX.test(month)) {
      return res.status(400).json({
        success: false,
        message: "Month must be in YYYY-MM format",
      });
    }

    const { startOfMonth, endOfMonth } = getMonthRange(month);

    const [budgets, spendByCategory] = await Promise.all([
      Budget.find({ user: req.user._id, month }),
      Expense.aggregate([
        {
          $match: {
            user: req.user._id,
            expenseDate: { $gte: startOfMonth, $lt: endOfMonth },
          },
        },
        {
          $group: {
            _id: "$category",
            spent: { $sum: "$amount" },
          },
        },
      ]),
    ]);

    const spendMap = {};
    let overallSpent = 0;

    spendByCategory.forEach((entry) => {
      spendMap[entry._id] = entry.spent;
      overallSpent += entry.spent;
    });

    const budgetMap = {};
    budgets.forEach((b) => {
      budgetMap[b.category] = b.amount;
    });

    const categories = CATEGORIES.map((category) => {
      const spent = spendMap[category] || 0;
      const limit = budgetMap[category] || 0;

      return {
        category,
        spent,
        limit,
        remaining: limit - spent,
        percentage: limit > 0 ? Math.round((spent / limit) * 100) : null,
      };
    });

    const overallLimit = budgetMap.overall || 0;

    const overall = {
      category: "overall",
      spent: overallSpent,
      limit: overallLimit,
      remaining: overallLimit - overallSpent,
      percentage:
        overallLimit > 0
          ? Math.round((overallSpent / overallLimit) * 100)
          : null,
    };

    res.status(200).json({
      success: true,
      month,
      categories,
      overall,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching budget status",
    });
  }
};

module.exports = {
  createOrUpdateBudget,
  getBudgets,
  deleteBudget,
  getBudgetStatus,
};
