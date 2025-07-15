import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getAbout = async (token) => {
  const res = await axios.get(`${API_BASE}/about`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateAbout = async (data, token) => {
  const res = await axios.put(`${API_BASE}/about`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
