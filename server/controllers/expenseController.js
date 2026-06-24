const Expense = require('../models/Expense');

const createExpense = async (req, res) => {
    try {
        const {title, amount, category, description, expenseDate} = req.body;
        if(!title || !amount || !category ){
            return res.status(400).json({
                success: false,
                message: "Title, amount and category are required"
            })
        }

        const user = req.user;

        const expense = await Expense.create({
            title,
            amount,
            category,
            description,
            expenseDate,
            user : user._id,
        })

        res.status(201).json({
            success: true,
            message: "Expense created successfully",
            expense
        })

    } catch (error) {
        res.staus(501).json({
            success: false,
            message: "Error creating expense",
        })
    }
}

module.exports = {createExpense}