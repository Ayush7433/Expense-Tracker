const express = require("express");
const { parseExpense } = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/parse-expense", authMiddleware, parseExpense);

module.exports = router;
