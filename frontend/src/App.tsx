import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddEvent from "./pages/AddEvent";
import AddCategory from "./pages/AddCategory";
import Header from "./components/Header";
import Home from "./pages/Home";
import UpdateEvent from "./pages/UpdateEvent"; 

export default function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/update-event/:id" element={<UpdateEvent />} />
        <Route path="/add-category" element={<AddCategory />} />
        {/* Profile route removed per UI simplification request */}
      </Routes>
    </Router>
  );
}
