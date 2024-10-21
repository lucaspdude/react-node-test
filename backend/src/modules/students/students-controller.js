const asyncHandler = require("express-async-handler");
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
  const { name, className, section, roll } = req.query;
  const students = await getAllStudents(req.query);
  res.json({
    students,
  });
});

const handleAddStudent = asyncHandler(async (req, res) => {
  const { id: authorId } = req.user;
  const payload = req.body;
  const student = await addNewStudent({
    ...payload,
    authorId,
  });
  res.json({
    student,
  });
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
  const { id: authorId } = req.user;
  const payload = req.body;
  const student = await updateStudent(payload);
  res.json({
    student,
  });
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await getStudentDetail(id);
  res.json({
    student,
  });
});

const handleStudentStatus = asyncHandler(async (req, res) => {
  const { id: currentUserId, role: currentUserRole } = req.user;
  const { id: studentId } = req.params;
  const { status } = req.body;
  const payload = {
    userId: studentId,
    reviewerId: currentUserId,
    status,
  };
  const message = await setStudentStatus(payload);
  res.json({
    message,
  });
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
};
