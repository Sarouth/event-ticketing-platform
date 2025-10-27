// src/pages/EventsList.js
import React, { useEffect, useState } from "react";
import { getEvents } from "../api";

export default function EventsList({ token }) {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getEvents(token).then((r) => setEvents(r.data)).catch((e) => alert("Error loading events"));
  }, [token]);
  return (
    <div style={{ padding: 20 }}>
      <h3>Events</h3>
      <ul>
        {events.map((ev) => (
          <li key={ev.id}>{ev.title} — {ev.date}</li>
        ))}
      </ul>
    </div>
  );
}
