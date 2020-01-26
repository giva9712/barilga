import axios from "axios";

const api = axios.create({
  baseURL: "https://gdsc.warehouse.com/api",
  headers: { "Content-Type": "application/json" }
});

export default api;
