import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";

export default function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Profile route removed per UI simplification request */}
      </Routes>
    </Router>
  );
}
