import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getSkills = async (token) => {
  const res = await axios.get(`${API_BASE}/skills`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateSkills = async (skills, token) => {
  const res = await axios.put(`${API_BASE}/skills`, { skills }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
