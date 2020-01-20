import axios from 'axios';

const api = axios.create({
  baseURL: 'https://e.aptek.mn/api/',
  headers: {'Content-Type': 'application/json'},
});

export default api;
