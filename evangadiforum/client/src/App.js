import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Questions from "./pages/Questions";
import AddQuestion from "./pages/AddQuestion";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/questions" element={token ? <Questions /> : <Navigate to="/login" />} />
        <Route path="/add-question" element={token ? <AddQuestion /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
