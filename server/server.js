require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require('./routes/expenseRoutes');

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

connectDB();

app.listen(process.env.PORT || 3000, () => console.log("Server is running on port " + process.env.PORT || 3000));
