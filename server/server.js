require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

connectDB();

app.get("/",(req, res) => {
    res.send("API is running...");
})

app.listen(process.env.PORT || 3000, () => console.log("Server is running on port " + process.env.PORT || 3000));
