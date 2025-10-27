// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { getSales } from "../api";

export default function Dashboard({ token }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await getSales(token);
        setReport(res.data);
      } catch (err) {
        alert("Failed to load sales: " + (err.response?.data?.detail || err.message));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (!report) return <p style={{ padding: 20 }}>No data</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Sales Report</h2>
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <div style={{ padding: 12, border: "1px solid #ddd" }}>
          <h4>Total Tickets</h4>
          <div style={{ fontSize: 24 }}>{report.total_tickets}</div>
        </div>
        <div style={{ padding: 12, border: "1px solid #ddd" }}>
          <h4>Total Revenue</h4>
          <div style={{ fontSize: 24 }}>${report.total_revenue}</div>
        </div>
      </div>

      <h3>Per Event</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Event</th>
            <th>Tickets Sold</th>
            <th>Revenue</th>
            <th>Bookings</th>
          </tr>
        </thead>
        <tbody>
          {report.per_event.map((e) => (
            <tr key={e.event_pk}>
              <td>{e.event_title}</td>
              <td>{e.tickets_sold}</td>
              <td>${e.revenue}</td>
              <td>{e.bookings_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
