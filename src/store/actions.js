export const saveServerIP = serverIP => ({
  type: "SAVE_SERVER_IP",
  serverIP
});

export const rememberLogin = loginInfo => ({
  type: "REMEMBER_LOGIN",
  loginInfo
});

export const saveUserInfo = userInfo => ({
  type: "SAVE_USER_INFO",
  userInfo
});

export const saveToken = token => ({
  type: "SAVE_TOKEN",
  token
});

export const removeToken = () => ({
  type: "REMOVE_TOKEN"
});

export const loading = bool => ({
  type: "LOADING",
  isLoading: bool
});

export const error = error => ({
  type: "ERROR",
  error
});

export const changeRefresh = force_refresh => ({
  type: "CHANGE_FORCE_REFRESH",
  force_refresh
});

export const removeAuth = () => dispatch => {
  dispatch(removeToken());
  dispatch(saveUserInfo({}));
};
