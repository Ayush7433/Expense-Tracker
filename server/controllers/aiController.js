const { parseExpenseText, VALID_CATEGORIES } = require("../services/aiService");

const parseExpense = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Please describe the expense (e.g. 'Spent 500 on pizza yesterday')",
      });
    }

    let parsed;
    try {
      parsed = await parseExpenseText(text.trim());
    } catch (aiError) {
      console.error(aiError);

      return res.status(502).json({
        success: false,
        message:
          "Couldn't understand that — try rephrasing or enter it manually.",
      });
    }

    // --- Sanitize before trusting anything from the model ---

    const amount = Number(parsed.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message:
          "Couldn't figure out a valid amount from that — try including a number.",
      });
    }

    const category = VALID_CATEGORIES.includes(parsed.category)
      ? parsed.category
      : "other";

    let expenseDate = parsed.expenseDate;
    if (!expenseDate || isNaN(new Date(expenseDate).getTime())) {
      expenseDate = new Date().toISOString().split("T")[0];
    }

    const title =
      typeof parsed.title === "string" && parsed.title.trim()
        ? parsed.title.trim().slice(0, 50)
        : text.trim().slice(0, 50);

    const description =
      typeof parsed.description === "string"
        ? parsed.description.trim().slice(0, 200)
        : "";

    res.status(200).json({
      success: true,
      parsed: {
        title,
        amount,
        category,
        expenseDate,
        description,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error parsing expense",
    });
  }
};

module.exports = { parseExpense };
