require("dotenv").config();
const dns = require("dns");
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require('./routes/expenseRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const aiRoutes = require('./routes/aiRoutes');
const userRoutes = require("./routes/userRoutes");
const path = require("path");

dns.setDefaultResultOrder("ipv4first");
app.use(express.json());
app.use(cors());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);

connectDB();

app.listen(process.env.PORT || 3000, () => console.log("Server is running on port " + process.env.PORT || 3000));
