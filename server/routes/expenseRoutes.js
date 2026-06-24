const express = require('express');
const { createExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/expenses', authMiddleware, createExpense);
router.get('/expenses', authMiddleware, getExpenses);
router.put('/expenses/:id', authMiddleware, updateExpense);
router.delete('/expenses/:id', authMiddleware, deleteExpense)


module.exports = router;