// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const studentRoutes = require("./studentRoutes.js");

// Create an instance of express
const app = express();
const PORT = 5000;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use Student Routes
app.use("/", studentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server on the PORT
app.listen(PORT, () => {
  console.log(`Server is running on the PORT: ${PORT}`);
});
