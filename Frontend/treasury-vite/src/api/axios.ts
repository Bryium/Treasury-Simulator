// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://treasury-simulator.onrender.com",
});

export default api;
