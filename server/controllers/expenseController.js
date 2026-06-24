const Expense = require("../models/Expense");

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
    res.staus(501).json({
      success: false,
      message: "Error creating expense",
    });
  }
};

const getExpenses = async (req, res) => {
  try {
    const user = req.user;

    const expenses = await Expense.find({ user: user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      expenses,
      count: expenses.length,
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
        expense: updatedExpense
    })
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error updating expense" + error,
    })
  }
};

const deleteExpense = async (req, res) => {
    try {
        const {id} = req.params;
        const expense = await Expense.findOne({
            _id : id,
            user : req.user._id
        });

        if(!expense){
            return res.status(404).json({
                success : false,
                message : "Expense not found"
            });
        }

        const deletedExpense = await expense.deleteOne();

        res.status(200).json({
            success : true,
            message : "Expense deleted successfully",
        });

        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error deleting expense" + error
        })
        
    }
}

module.exports = { createExpense, getExpenses, updateExpense, deleteExpense };
