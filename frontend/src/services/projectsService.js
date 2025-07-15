import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getProjects = async (token) => {
  const res = await axios.get(`${API_BASE}/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateProjects = async (projects, token) => {
  const res = await axios.put(`${API_BASE}/projects`, { projects }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
