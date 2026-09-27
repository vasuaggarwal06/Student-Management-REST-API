const express = require("express");

const router = express.Router();

let students = require("../data/student");

//get students
router.get("/", (req, res) => {
  res.status(200).json(students);
});

module.exports = router;

//get student by id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      error: "Student not found",
    });
  }

  res.status(200).json(student);
});

// post
router.post("/", (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({
      error: "Name and course are required",
    });
  }

  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name,
    course,
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student created successfully",
    student: newStudent,
  });
});

// PUT
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      error: "Student not found",
    });
  }

  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({
      error: "Name and course are required",
    });
  }

  student.name = name;
  student.course = course;

  res.status(200).json({
    message: "Student updated successfully",
    student,
  });
});

// delete
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      error: "Student not found",
    });
  }

  const deletedStudent = students.splice(studentIndex, 1);

  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent[0],
  });
});
