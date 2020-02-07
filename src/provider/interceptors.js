import api from "./api";

import { store } from "../store";
import { saveToken } from "../store/actions";
import { goToLogin } from "../helper/actions";

const { dispatch } = store;

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
    if (response.data.jwtToken) {
      dispatch(saveToken(response.data.jwtToken));
    }
    return response;
  },
  error => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      goToLogin();
    } else if (error.response && error.response.status === 400) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
