import api from './api';

api.interceptors.request.use(
  config => {
    console.log(config);
    //const {auth} = store.getState();
    const user = null;
    if (user) {
      const token = `Bearer ${user.access_token}`;
      if (token) {
        config.headers.Authorization = `${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      //
    }else if (error.response && error.response.status === 400) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

