// app.js
require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./Config/database"); // Import Sequelize instance
const userRoutes = require("./Routes/userRoutes");
const studentRoutes = require("./Routes/studentRoutes");

const app = express(); // Initialize Express app

// Middleware setup
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000" // Replace with frontend origin
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route setup
app.use("/", userRoutes);
app.use("/api/Student", studentRoutes);

// Sync Sequelize models and create MySQL tables if they don't exist
sequelize.sync({ force: false })  // Set force: true for development if you want to drop and recreate tables
  .then(() => {
    console.log("Database & tables synced successfully.");
  })
  .catch(err => {
    console.error("Error syncing database & tables:", err);
  });

module.exports = app;
