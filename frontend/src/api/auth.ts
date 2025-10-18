import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/users/";

export const registerUser = (userData: { username: string; email: string; password: string }) =>
  axios.post(`${API_URL}register/`, userData);

export const loginUser = (userData: { username: string; password: string }) =>
  axios.post(`${API_URL}login/`, userData);

export const getProfile = (token: string) =>
  axios.get(`${API_URL}profile/`, {
    headers: { Authorization: `Token ${token}` },
  });
