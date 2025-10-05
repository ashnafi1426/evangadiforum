const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { askQuestion, getAllQuestions, answerQuestion } = require("../controller/questionController");

// Ask a question
router.post("/ask", authMiddleware, askQuestion);

// Get all questions
router.get("/all", getAllQuestions);

// Answer a question
router.post("/answer/:questionId", authMiddleware, answerQuestion);

module.exports = router;
