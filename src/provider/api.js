import axios from "axios";
import { store } from "../store";

const api = axios.create({
  baseURL: store.getState().token.serverIP,
  headers: { "Content-Type": "application/json" }
});

export default api;
