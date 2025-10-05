import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function AddQuestion() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/question/add-question", form);
      alert("Question added successfully");
      navigate("/questions");
    } catch (err) {
      alert(err.response?.data?.msg || "Error adding question");
    }
  };

  return (
    <div>
      <h2>Add Question</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
}
export default AddQuestion;
