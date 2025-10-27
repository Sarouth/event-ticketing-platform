// src/api.js
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000"; // Django server

const api = axios.create({
  baseURL: API_BASE,
});

// helper to attach token for a single call
export const authGet = (url, token) =>
  api.get(url, { headers: { Authorization: `Bearer ${token}` } });

// login (get tokens)
export const loginRequest = (username, password) =>
  api.post("/api/token/", { username, password });

// refresh
export const refreshToken = (refresh) =>
  api.post("/api/token/refresh/", { refresh });

// admin endpoints
export const getSales = (token) => authGet("/api/admin/sales/", token);
export const getEvents = (token) => authGet("/api/admin/events/", token);
export const getBookings = (token) => authGet("/api/admin/bookings/", token);

export default api;




