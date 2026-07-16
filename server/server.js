require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require("./routes/userRoutes");
const path = require("path");

app.use(express.json());
app.use(cors());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/users", userRoutes);

connectDB();

app.listen(process.env.PORT || 3000, () => console.log("Server is running on port " + process.env.PORT || 3000));
