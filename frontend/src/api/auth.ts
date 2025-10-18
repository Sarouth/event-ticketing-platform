import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api/users/";

export const registerUser = (data: any) =>
  axios.post(API_BASE + "register/", data);

export const loginUser = (data: any) =>
  axios.post(API_BASE + "login/", data);

export const getProfile = (token: string) =>
  axios.get(API_BASE + "profile/", {
    headers: { Authorization: `Token ${token}` },
  });
