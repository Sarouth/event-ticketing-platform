import { useState } from "react";
import axios from "axios";

export default function AddCategory() {
  const [form, setForm] = useState({ name: "", description: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/events/categories/", form);
      alert("✅ Category added successfully!");
      setForm({ name: "", description: "" });
    } catch (err) {
      alert("❌ Failed to add category");
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-title">Add Category</div>

        <form onSubmit={handleSubmit} className="auth-fields">
          <input
            className="auth-input"
            type="text"
            name="name"
            placeholder="Category Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          {/* <textarea
            className="auth-input"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          ></textarea> */}

          <button className="btn-primary" type="submit">
            Add Category
          </button>
        </form>
        
      </div>
    </div>
  );
}
