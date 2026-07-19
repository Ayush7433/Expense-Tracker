const express = require("express");
const {
  createOrUpdateBudget,
  getBudgets,
  deleteBudget,
  getBudgetStatus,
} = require("../controllers/budgetController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/budgets", authMiddleware, createOrUpdateBudget);
router.get("/budgets", authMiddleware, getBudgets);
router.get("/budgets/status", authMiddleware, getBudgetStatus);
router.delete("/budgets/:id", authMiddleware, deleteBudget);

module.exports = router;
