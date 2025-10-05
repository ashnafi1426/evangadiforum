import { useEffect, useState } from "react";
import API from "../api";

function Questions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await API.get("/questions");
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      <h2>Questions</h2>
      {questions.map((q) => (
        <div key={q.questionid} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{q.title}</h3>
          <p>{q.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Questions;
