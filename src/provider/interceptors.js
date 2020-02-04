import api from "./api";

import { store } from "../store";

import { loading } from "../store/actions";

api.interceptors.request.use(
  config => {
    const { token } = store.getState();
    if (token) {
      const tokenKey = `${token.token}`;
      if (tokenKey) {
        config.headers.authentication = `${tokenKey}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      //
    } else if (error.response && error.response.status === 400) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
