import { useState, useEffect } from "react";
import axios from "axios";

export default function AddEvent() {
  const [form, setForm] = useState({
    event_name: "",
    description: "",
    location: "",
    date: "",
    time: "06:00 AM",
    ticket_price: "",
    total_tickets: "",
    available_tickets: "",
    category: "",
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://127.0.0.1:8000/api/events/categories/", {
          headers: { Authorization: `Token ${token}` },
        });
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();

    // Refresh when tab becomes visible again
    const handleVisibilityChange = () => {
      if (!document.hidden) fetchCategories();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://127.0.0.1:8000/api/events/add/", form, {
        headers: { Authorization: `Token ${token}` },
      });
      alert("Event added successfully!");
      setForm({
        event_name: "",
        description: "",
        location: "",
        date: "",
        time: "06:00 AM",
        ticket_price: "",
        total_tickets: "",
        available_tickets: "",
        category: "",
      });
    } catch (err) {
      alert("Failed to add event. Check your inputs or token.");
    }
  };

  return (
    <div className="auth-wrap">
      <div className="addevent-container"></div>
      <div className="add-event-card">
        <div className="add-event-title">Create New Event</div>

        <form onSubmit={handleSubmit} className="add-event-form">

          {/* Row 1: Event Name */}
          <div className="form-row full-width">
            <input
              className="add-event-input"
              type="text"
              name="event_name"
              placeholder="Event Name"
              value={form.event_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 2: Category */}
          <div className="form-row full-width">
            <select
              className="add-event-input"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="add-category-link">
              <a href="/add-category" className="text-link">
                Want to add a new category? Click here
              </a>
            </div>
          </div>

          {/* Row 3: Location, Date, Time */}
          <div className="form-row three-cols">
            <input
              className="add-event-input"
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              required
            />
            <input
              className="add-event-input"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
            <input
              className="add-event-input"
              type="text"
              name="time"
              placeholder="Time (e.g. 6:00 PM)"
              value={form.time}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 4: Ticket Info */}
          <div className="form-row three-cols">
            <input
              className="add-event-input"
              type="number"
              name="ticket_price"
              placeholder="Ticket Price"
              value={form.ticket_price}
              onChange={handleChange}
              required
            />
            <input
              className="add-event-input"
              type="number"
              name="total_tickets"
              placeholder="Total Tickets"
              value={form.total_tickets}
              onChange={handleChange}
              required
            />
            <input
              className="add-event-input"
              type="number"
              name="available_tickets"
              placeholder="Available Tickets"
              value={form.available_tickets}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 5: Description */}
          <div className="form-row full-width">
            <textarea
              className="add-event-textarea"
              name="description"
              placeholder="Event Description"
              value={form.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button className="add-event-btn" type="submit">
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}
