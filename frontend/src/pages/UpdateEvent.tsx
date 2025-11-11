import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

type Category = { id: number; name: string };

export default function UpdateEvent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("token");
    const fetch = async () => {
      try {
        const [catRes, eventRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/events/categories/", {
            headers: { Authorization: `Token ${token}` },
          }),
          axios.get(`http://127.0.0.1:8000/api/events/${id}/`, {
            headers: { Authorization: `Token ${token}` },
          }),
        ]);
        setCategories(catRes.data);
        // adapt field names if backend returns different keys
        setForm({
          event_name: eventRes.data.event_name ?? "",
          description: eventRes.data.description ?? "",
          location: eventRes.data.location ?? "",
          date: eventRes.data.date ?? "",
          time: eventRes.data.time ?? "06:00 AM",
          ticket_price: String(eventRes.data.ticket_price ?? ""),
          total_tickets: String(eventRes.data.total_tickets ?? ""),
          available_tickets: String(eventRes.data.available_tickets ?? ""),
          category: String(eventRes.data.category ?? ""),
        });
      } catch (err) {
        console.error("Failed to load event or categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      // use PUT or PATCH depending on your API
      await axios.put(`http://127.0.0.1:8000/api/events/${id}/`, form, {
        headers: { Authorization: `Token ${token}` },
      });
      navigate("/"); // or navigate back to event detail/list
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update event.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="max-w-3xl mx-auto text-center mt-16">Loading...</div>;

  return (
    <div className="auth-wrap">
      <div className="add-event-card">
        <div className="add-event-title">Update Event</div>

        <form onSubmit={handleSubmit} className="add-event-form">
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
          </div>

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

          <div className="form-row full-width">
            <textarea
              className="add-event-textarea"
              name="description"
              placeholder="Event Description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <button className="add-event-btn" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Update Event"}
          </button>
        </form>
      </div>
    </div>
  );
}