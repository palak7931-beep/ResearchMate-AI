import axios from "axios";

// Use environment variable for backend URL, with fallback for development
const baseURL = import.meta.env.VITE_API_BASE_URL || "https://researchmate-ai-xc4u.railway.app";

const api = axios.create({
  baseURL: baseURL,
});

export default api;