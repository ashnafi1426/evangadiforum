const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Ask a question
async function askQuestion(req, res) {
  const { title, body } = req.body;
  const { userid } = req.user;

  if (!title || !body) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Title and body are required" });
  }

  try {
    await dbConnection.query(
      "INSERT INTO questions (title, body, userId) VALUES (?, ?, ?)",
      [title, body, userid]
    );
    res.status(StatusCodes.CREATED).json({ msg: "Question posted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
  }
}

// Get all questions with answers
async function getAllQuestions(req, res) {
  try {
    const [questions] = await dbConnection.query(
      `SELECT q.id, q.title, q.body, q.userId, a.id AS answerId, a.body AS answerBody, a.userId AS answerUser
       FROM questions q
       LEFT JOIN answers a ON q.id = a.questionId`
    );
    res.status(StatusCodes.OK).json(questions);
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
  }
}

// Answer a question
async function answerQuestion(req, res) {
  const { questionId } = req.params;
  const { body } = req.body;
  const { userid } = req.user;

  if (!body) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Answer body is required" });
  }

  try {
    await dbConnection.query(
      "INSERT INTO answers (body, questionId, userId) VALUES (?, ?, ?)",
      [body, questionId, userid]
    );
    res.status(StatusCodes.CREATED).json({ msg: "Answer posted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
  }
}

module.exports = { askQuestion, getAllQuestions, answerQuestion };
