import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getFullPortfolio = async (token) => {
  const res = await axios.get(`${API_BASE}/portfolio/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getPublicPortfolio = async (username) => {
    const res = await axios.get(`${API_BASE}/portfolio/${username}`);
    return res.data;
  };
