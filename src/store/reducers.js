import { combineReducers } from "redux";

const rootReducer = (
  state = {
    serverIP: "http://18.221.239.96:8800/api",
    token: null,
    loginInfo: null,
    userInfo: {},
    loading: true,
    error: null
  },
  action
) => {
  switch (action.type) {
    case "SAVE_SERVER_IP":
      return { ...state, serverIP: action.serverIP };
    case "REMEMBER_LOGIN":
      return { ...state, loginInfo: action.loginInfo };
    case "SAVE_USER_INFO":
      return { ...state, userInfo: action.userInfo };
    case "SAVE_TOKEN":
      return { ...state, token: action.token };
    case "REMOVE_TOKEN":
      return { ...state, token: null };
    case "LOADING":
      return { ...state, loading: action.isLoading };
    case "ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

const helperReducer = (
  state = {
    force_refresh: false
  },
  action
) => {
  switch (action.type) {
    case "CHANGE_FORCE_REFRESH":
      return { ...state, force_refresh: action.force_refresh };
    default:
      return state;
  }
};

export default combineReducers({
  rootReducer: rootReducer,
  helperReducer: helperReducer
});
