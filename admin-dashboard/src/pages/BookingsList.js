// src/pages/BookingsList.js
import React, { useEffect, useState } from "react";
import { getBookings } from "../api";

export default function BookingsList({ token }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    getBookings(token).then(r => setList(r.data)).catch(e => alert("Error loading bookings"));
  }, [token]);
  return (
    <div style={{ padding: 20 }}>
      <h3>Bookings</h3>
      <ul>
        {list.map(b => (
          <li key={b.id}>{b.user ? b.user : b.user_id} — {b.event ? b.event.title : b.event_id} — {b.status}</li>
        ))}
      </ul>
    </div>
  );
}
