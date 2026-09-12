import axios from "axios";

const api = axios.create({
  baseURL: "https://researchmate-ai-xc4u.onrender.com",
});

export default api;