import axios from "axios";

export const API_BASE = "http://127.0.0.1:8000/api/events/";



export const registerUser = (data: any) =>
  axios.post(API_BASE + "register/", data);

export const loginUser = (data: any) =>
  axios.post(API_BASE + "login/", data);

export const getProfile = (token: string) =>
  axios.get(API_BASE + "profile/", {
    headers: { Authorization: `Token ${token}` },
  });


export const addEvent = (data: any, token: string) =>
  axios.post(API_BASE + "add/", data, {
    headers: { Authorization: `Token ${token}` },
  });



  // new helpers for single-event operations
export const getEvent = (id: string | number, token: string) =>
  axios.get(`${API_BASE}${id}/`, {
    headers: { Authorization: `Token ${token}` },
  });

export const updateEvent = (id: string | number, data: any, token: string) =>
  axios.put(`${API_BASE}${id}/`, data, {
    headers: { Authorization: `Token ${token}` },
  });
