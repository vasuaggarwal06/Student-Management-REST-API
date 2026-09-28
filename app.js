const express = require("express");

const studentRoutes = require("./routes/studentroutes");
const logger = require("./middleware/logger");

const app = express();

// Middleware to read JSON data
app.use(express.json());

// Custom Logger Middleware
app.use(logger);

// Student Routes
app.use("/students", studentRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Student Management REST API is running",
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: "Internal Server Error",
  });
});

// Start Server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
