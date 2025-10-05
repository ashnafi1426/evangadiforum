const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Ask a question
async function askQuestion(req, res) {
  const { title, body } = req.body;
  const { userid } = req.user;

  if (!title || !body) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Title and body required" });
  }

  try {
    await dbConnection.query(
      "INSERT INTO questions (title, body, userId) VALUES (?, ?, ?)",
      [title, body, userid]
    );
    res.status(StatusCodes.CREATED).json({ msg: "Question posted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
  }
}

// Get all questions with answers grouped
async function getAllQuestions(req, res) {
  try {
    const [rows] = await dbConnection.query(
      `SELECT q.id AS questionId, q.title, q.body AS description, q.userId AS questionUser,
       a.id AS answerId, a.body AS content, a.userId AS answerUser
       FROM questions q
       LEFT JOIN answers a ON q.id = a.questionId
       ORDER BY q.id, a.id`
    );

    const questionsMap = new Map();

    rows.forEach(row => {
      if (!questionsMap.has(row.questionId)) {
        questionsMap.set(row.questionId, {
          questionId: row.questionId,
          title: row.title,
          description: row.description,
          questionUser: row.questionUser,
          answers: []
        });
      }
      if (row.answerId) {
        questionsMap.get(row.questionId).answers.push({
          answerId: row.answerId,
          content: row.content,
          answerUser: row.answerUser
        });
      }
    });

    res.status(StatusCodes.OK).json({ questions: Array.from(questionsMap.values()) });
  } catch (err) {
    console.error(err.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
  }
}

// Answer a question
async function answerQuestion(req, res) {
  const { questionId } = req.params;
  const { body } = req.body;
  const { userid } = req.user;

  if (!body) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Answer body required" });

  try {
    await dbConnection.query(
      "INSERT INTO answers (body, questionId, userId) VALUES (?, ?, ?)",
      [body, questionId, userid]
    );
    res.status(StatusCodes.CREATED).json({ msg: "Answer posted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
  }
}

module.exports = { askQuestion, getAllQuestions, answerQuestion };
