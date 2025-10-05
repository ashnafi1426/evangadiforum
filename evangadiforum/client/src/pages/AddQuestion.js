import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function AddQuestion() {
  const [form, setForm] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return alert("Fill all fields");

    try {
      await API.post("/questions/add-question", form);
      alert("Question added successfully");
      navigate("/questions");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Error adding question");
    }
  };

  return (
    <div>
      <h2>Add Question</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
}

export default AddQuestion;
