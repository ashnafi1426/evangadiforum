import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Questions from "./pages/Questions";
import AddQuestion from "./pages/AddQuestion";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/questions"
          element={token ? <Questions /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-question"
          element={token ? <AddQuestion /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/questions" />} />
      </Routes>
    </>
  );
}

export default App;
