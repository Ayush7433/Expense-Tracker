const express = require('express');
const { createExpense, getExpenses, updateExpense, deleteExpense, getDashboardStats } = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/expenses', authMiddleware, createExpense);
router.get('/expenses', authMiddleware, getExpenses);
router.put('/expenses/:id', authMiddleware, updateExpense);
router.delete('/expenses/:id', authMiddleware, deleteExpense);
router.get('/stats',authMiddleware, getDashboardStats);


module.exports = router;