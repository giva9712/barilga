import axios from "axios";

const api = axios.create({
  baseURL: "http://18.221.239.96:8800/api",
  headers: { "Content-Type": "application/json" }
});

export default api;
