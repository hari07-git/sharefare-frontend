import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000", // ✅ no /api here
  withCredentials: true, // optional, needed only if your backend uses cookies/auth
});

export default API;
