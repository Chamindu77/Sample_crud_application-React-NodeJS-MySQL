// studentRoutes.js
const express = require("express");
const router = express.Router();
const { getStudents, addStudent, updateStudent, deleteStudent } = require('../Controllers/studentController');

// Route for fetching all students
router.get("/GetStudents", getStudents);

// Route for adding a new student
router.post("/AddStudent", addStudent);

// Route for updating an existing student
router.put("/UpdateStudent/:id", updateStudent);

// Route for deleting a student
router.delete("/DeleteStudent/:id", deleteStudent);

module.exports = router;







// const express = require("express");
// const router = express.Router();
// const { getStudents, addStudent, updateStudent, deleteStudent } = require('../Controllers/studentController');

// //onst studentController = require("../Controllers/studentController");

// // http://localhost:3000/api/Student/GetStudents

// router.get("/GetStudents", getStudents);
// router.post("/AddStudent", addStudent);
// router.put("/UpdateStudent/:id", updateStudent);
// router.delete("/DeleteStudent/:id", deleteStudent);

// module.exports = router;
