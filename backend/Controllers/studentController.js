// studentController.js
const Student = require('../Model/studentModel');
const User = require('../Model/userModel');

// Get all students with user details
exports.getStudents = async (req, res) => {
  try {
    // Fetch students with associated user details (JOIN equivalent)
    const students = await Student.findAll({
      include: {
        model: User,
        attributes: ['firstName', 'lastName', 'email']
      }
    });

    // If no students are found
    if (!students || students.length === 0) {
      return res.status(404).json({ msg: "No students found" });
    }

    // Map student data to include user name and email
    const studentData = students.map(student => {
      const stname = `${student.User.firstName} ${student.User.lastName}`;
      return {
        id: student.id,
        userId: student.userId,
        stname,
        email: student.User.email,
        contactNumber: student.contactNumber,
        course: student.course,
        module: student.module,
      };
    });

    res.json(studentData);
  } catch (err) {
    console.error("Server error: ", err);
    res.status(500).send("Server error");
  }
};

// Add a new student
exports.addStudent = async (req, res) => {
  const { userId, course, module, contactNumber } = req.body;
  try {
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Create a new student entry
    const newStudent = await Student.create({
      userId,
      course,
      module,
      contactNumber
    });

    const stname = `${user.firstName} ${user.lastName}`;
    res.json({
      id: newStudent.id,
      userId: user.id,
      stname,
      email: user.email,
      contactNumber: newStudent.contactNumber,
      course: newStudent.course,
      module: newStudent.module,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  const { userId, course, module, contactNumber } = req.body;
  const { id } = req.params;

  try {
    // Find the student by ID
    let student = await Student.findByPk(id);
    if (!student) return res.status(404).json({ msg: "Student not found" });

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Update student data
    student.course = course;
    student.module = module;
    student.contactNumber = contactNumber;

    await student.save();

    const stname = `${user.firstName} ${user.lastName}`;
    res.json({
      id: student.id,
      userId: user.id,
      stname,
      email: user.email,
      contactNumber: student.contactNumber,
      course: student.course,
      module: student.module,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ msg: "Student not found" });

    await student.destroy();
    res.json({ msg: "Student removed" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};













// // studentController.js
// const Student = require("../Model/studentSchema");
// const User = require("../Model/userSchema");

// exports.getStudents = async (req, res) => {
//   try {
//     // Find students and populate user details
//     const students = await Student.find().populate('userId', 'firstName lastName email');
    
//     // If no students are found, return a 404 response
//     if (!students || students.length === 0) {
//       return res.status(404).json({ msg: "No students found" });
//     }

//     // Map student data to include user name and email
//     const studentData = students.map(student => {
//       // If userId is missing or invalid, skip this student
//       if (!student.userId) {
//         console.error(`Missing userId for student: ${student._id}`);
//         return null;
//       }

//       const stname = `${student.userId.firstName} ${student.userId.lastName}`;
//       return {
//         id: student._id,
//         userId: student.userId._id,
//         stname,
//         email: student.userId.email,
//         contactNumber: student.contactNumber,
//         course: student.course,
//         module: student.module,
//       };
//     }).filter(student => student !== null); // Filter out any invalid students

//     // Respond with the student data
//     res.json(studentData);
//   } catch (err) {
//     console.error("Server error: ", err); // Log the error for debugging
//     res.status(500).send("Server error");
//   }
// };

// exports.addStudent = async (req, res) => {
//   const { userId, course, module, contactNumber } = req.body;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     const newStudent = new Student({
//       userId,
//       course,
//       module,
//       contactNumber
//     });

//     await newStudent.save();

//     const stname = `${user.firstName} ${user.lastName}`;
//     res.json({
//       id: newStudent._id,
//       userId: user._id,
//       stname,
//       email: user.email,
//       contactNumber: newStudent.contactNumber,
//       course: newStudent.course,
//       module: newStudent.module,
//     });
//   } catch (err) {
//     res.status(500).send("Server error");
//   }
// };

// exports.updateStudent = async (req, res) => {
//   const { userId, course, module, contactNumber } = req.body;
//   const { id } = req.params; // Ensure we have the student ID from the URL

//   try {
//     let student = await Student.findById(id);
//     if (!student) return res.status(404).json({ msg: "Student not found" });

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     student.course = course;
//     student.module = module;
//     student.contactNumber = contactNumber;

//     await student.save();

//     const stname = `${user.firstName} ${user.lastName}`;
//     res.json({
//       id: student._id,
//       userId: user._id,
//       stname,
//       email: user.email,
//       contactNumber: student.contactNumber,
//       course: student.course,
//       module: student.module,
//     });
//   } catch (err) {
//     res.status(500).send("Server error");
//   }
// };

// exports.deleteStudent = async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     if (!student) return res.status(404).json({ msg: "Student not found" });

//     await student.remove();
//     res.json({ msg: "Student removed" });
//   } catch (err) {
//     res.status(500).send("Server error");
//   }
// };
