import api from "./api";

import { store } from "../store";
import { saveToken } from "../store/actions";
import { goToLogin } from "../helper/actions";
import { ToastAndroid } from "react-native";

const { dispatch } = store;

api.interceptors.request.use(
  config => {
    config.baseURL = store.getState().rootReducer.serverIP;
    const { rootReducer } = store.getState();
    if (rootReducer) {
      const tokenKey = `${rootReducer.token}`;
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
    if (error.message == "Network Error") {
      ToastAndroid.showWithGravityAndOffset(
        error.message + ": Серверийн ip address-аа шалгана уу!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50
      );
      return Promise.reject(error);
    } else if (error.response && error.response.status === 401) {
      goToLogin();
      ToastAndroid.showWithGravityAndOffset(
        error.response.data.error,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50
      );
    } else if (error.response && error.response.status === 400) {
      return Promise.reject(error);
    } else if (error.response && error.response.status === 404) {
      ToastAndroid.showWithGravityAndOffset(
        "404: Not found",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50
      );
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
