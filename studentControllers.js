// Import the necessary modules
const path = require("path");

// Array to store student data
let studentDatabase = [];

// 1. Function to add a new student to the database
const addStudent = (req, res) => {
  // Extracting student details from the request body
  const { studentId, studentName, studentGPA } = req.body;

  // Check if the required properties are present in the request body
  if (!studentId || !studentName || !studentGPA) {
    return res
      .status(400)
      .send("Invalid request. Please provide all required fields.");
  }

  // Checking if the student Id is unique
  const isUnique = !studentDatabase.some(
    (student) => student.studentId === Number(studentId)
  );

  // Checking if GPA is within the valid range (0 to 5)
  const isValidGPA =
    !isNaN(studentGPA) &&
    parseFloat(studentGPA) >= 0 &&
    parseFloat(studentGPA) <= 5;

  if (isUnique && isValidGPA) {
    // Creating a new student object with parsed studentId and studentGPA
    const newStudent = {
      studentId: Number(studentId),
      StudentName: studentName,
      StudentGPA: Number(studentGPA),
    };

    // Adding the new student to the database
    studentDatabase.push(newStudent);
    res.send("Student Added Successfully!");
  } else {
    // Responding with an error if the student Id is not unique or GPA is invalid
    if (!isUnique) {
      res.status(409).send("Student ID already exists.");
    } else {
      res.status(400).send("Invalid GPA. GPA should be between 0 and 5.");
    }
  }
};

// 2. Function to retrieve and render all students details after sort by studentId
const getAllAndRenderStudents = (req, res) => {
  // Checking if there are no students in the database
  if (!studentDatabase.length) {
    // If no students, render an EJS file with an empty array
    return res.render(path.join(__dirname, "views", "allStudents"), {
      students: [],
    });
  }

  // Sorting the students array based on parsed studentId
  const sortedStudents = studentDatabase.slice().sort((a, b) => {
    const studentIdA = Number(a.studentId);
    const studentIdB = Number(b.studentId);

    return studentIdA - studentIdB;
  });

  // Responding with the sorted array of all students (JSON)
  // res.status(200).json(sortedStudents);

  // Alternatively, you can render an EJS file with the sorted students
  res.render(path.join(__dirname, "views", "allStudents"), {
    students: sortedStudents,
  });
};

// 3. Function to retrieve and render a specific student by ID
const getAndRenderStudent = (req, res) => {
  // Checking if there are no students in the database
  if (!studentDatabase.length) {
    // If no students, render an EJS file with an empty array or send an error response
    return res.status(503).send("No Students Available");
  }

  // Extracting the student ID from the request parameters
  const studentId = req.params.studentId;

  // Finding the student with the specified ID in the database
  const student = studentDatabase.find(
    (student) => +student.studentId === +studentId
  );

  if (student) {
    // Responding with the details of the found student (JSON or EJS)
    // res.status(200).json(student);

    // Alternatively, you can render an EJS file with the student details
    res.render(path.join(__dirname, "views", "student"), { student });
  } else {
    // Responding with an error if the student is not found
    // res.status(404).send("Student Not Found");

    // Alternatively, you can render an EJS file for the not found case
    res.render(path.join(__dirname, "views", "studentNotFound"));
  }
};

// 4. Function to retrieve topper(s)
const getAndRenderTopper = (req, res) => {
  // Checking if there are no students in the database
  if (!studentDatabase.length) {
    // If no students, render an EJS file with an empty array or send an error response
    return res.status(503).send("No Students Available");
  }

  // Finding the highest GPA using the reduce function
  const maxGPA = Math.max(
    ...studentDatabase.map((student) => Number(student.StudentGPA))
  );

  // Filter students with the maximum GPA
  const topperStudents = studentDatabase.filter(
    (student) => Number(student.StudentGPA) === maxGPA
  );

  // Responding with the topper details (JSON or EJS)
  if (topperStudents.length) {
    // res.status(200).json(topperStudents);

    // Alternatively, you can render an EJS file with the topper details
    res.render(path.join(__dirname, "views", "topper"), {
      topper: topperStudents[0],
    });
  } else {
    // Responding with an error if no topper is found
    // res.status(404).send("No Topper Found");

    // Alternatively, you can render an EJS file for the not found case
    res.render(path.join(__dirname, "views", "topperNotFound"));
  }
};

// Exporting the functions to be used in other files
module.exports = {
  addStudent,
  getAllAndRenderStudents,
  getAndRenderStudent,
  getAndRenderTopper,
};
