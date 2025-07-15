import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getExperience = async (token) => {
  const res = await axios.get(`${API_BASE}/experience`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateExperience = async (experience, token) => {
  const res = await axios.put(`${API_BASE}/experience`, { experience }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
