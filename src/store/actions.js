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

export const removeAuth = () => dispatch => {
  dispatch(removeToken());
  dispatch(saveUserInfo({}));
};
