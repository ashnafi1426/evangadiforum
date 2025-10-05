const express = require("express");
const router = express.Router();
const db = require("../db");

// Add a question
router.post("/add-question", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ msg: "Title and description required" });
  }

  const sql = "INSERT INTO questions (title, description) VALUES (?, ?)";
  db.query(sql, [title, description], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    }
    res.json({ msg: "Question added successfully", id: result.insertId });
  });
});

// Get all questions
router.get("/", (req, res) => {
  const sql = "SELECT * FROM questions ORDER BY questionid DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;
