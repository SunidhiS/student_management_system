const express = require("express");
const Router = express.Router();
const {
  addStudent,
  getAllAndRenderStudents,
  getAndRenderStudent,
  getAndRenderTopper,
} = require("./studentControllers.js");

// POST request to add a new student
Router.post("/addStudent", addStudent);

// GET request to retrieve all students (API)
Router.get("/allStudents", getAllAndRenderStudents);

// GET request to retrieve a specific student by ID (API)
Router.get("/student/:studentId", getAndRenderStudent);

// GET request to retrieve topper (API)
Router.get("/topper", getAndRenderTopper);

// Export all Routes to be used in the server file
module.exports = Router;
