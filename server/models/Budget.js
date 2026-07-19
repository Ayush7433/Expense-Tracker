const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        "food",
        "travel",
        "entertainment",
        "shopping",
        "bills",
        "other",
        "overall",
      ],
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    month: {
      // Format: 'YYYY-MM', e.g. '2026-07'
      type: String,
      required: true,
      match: [/^\d{4}-(0[1-9]|1[0-2])$/, "Month must be in YYYY-MM format"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// One budget per user, per category, per month
budgetSchema.index({ user: 1, category: 1, month: 1 }, { unique: true });

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
