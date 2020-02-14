import api from "./api";

import { store } from "../store";
import { saveToken } from "../store/actions";
import { goToLogin } from "../helper/actions";
import { ToastAndroid } from "react-native";

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
    } else if (response.data.token) {
      dispatch(saveToken(response.data.token));
    }
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      goToLogin();
      ToastAndroid.showWithGravityAndOffset(
        error.response.data.error,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        25,
        50
      );
    } else if (error.response && error.response.status === 400) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
