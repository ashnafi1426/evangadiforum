import { useEffect, useState } from "react";
import API from "../api";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [answerForm, setAnswerForm] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const res = await API.get("/question/all");
    setQuestions(res.data.questions);
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswerForm({ ...answerForm, [questionId]: value });
  };

  const handleAnswerSubmit = async (questionId) => {
    try {
      await API.post("/question/add-answer", {
        questionId,
        content: answerForm[questionId],
      });
      fetchQuestions();
      setAnswerForm({ ...answerForm, [questionId]: "" });
    } catch (err) {
      alert(err.response?.data?.msg || "Error adding answer");
    }
  };

  return (
    <div>
      <h2>All Questions</h2>
      {questions.map((q) => (
        <div key={q.questionId} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <h3>{q.title}</h3>
          <p>{q.description}</p>
          <div>
            <strong>Answers:</strong>
            {q.answers.length === 0 ? (
              <p>No answers yet</p>
            ) : (
              q.answers.map((a) => <p key={a.answerId}>- {a.content}</p>)
            )}
          </div>
          <input
            type="text"
            placeholder="Your answer"
            value={answerForm[q.questionId] || ""}
            onChange={(e) => handleAnswerChange(q.questionId, e.target.value)}
          />
          <button onClick={() => handleAnswerSubmit(q.questionId)}>Submit Answer</button>
        </div>
      ))}
    </div>
  );
}
export default Questions;
