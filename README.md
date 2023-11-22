# Student Management System

This project is a simple student management system built using Node.js and Express. It allows users to add new students, view all students sorted by student ID, view details of a specific student by ID, and identify the student with the highest GPA as the topper.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Adding a New Student](#adding-a-new-student)
  - [Viewing All Students](#viewing-all-students)
  - [Viewing a Specific Student](#viewing-a-specific-student)
  - [Viewing the Topper](#viewing-the-topper)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SunidhiS/student_management_system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd student_management_system
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the server:

   ```bash
   npm run server
   ```

The server will start on `http://localhost:5000`.

## Usage

### Adding a New Student

To add a new student, send a POST request to `/addStudent` with the following JSON payload:

```json
{
  "studentId": 123,
  "studentName": "John Doe",
  "studentGPA": 4.0
}
```

### Viewing All Students

To view all students, visit `http://localhost:5000/allStudents` in your browser.

### Viewing a Specific Student

To view details of a specific student by ID, visit `http://localhost:5000/student/:studentId` in your browser, replacing `:studentId` with the actual student ID.

### Viewing the Topper

To view details of the topper, visit `http://localhost:5000/topper` in your browser.

## Contributing

Contributions are welcome! Please submit a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).
