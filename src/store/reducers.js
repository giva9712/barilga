import { combineReducers } from "redux";

const rootReducer = (
  state = {
    token: null,
    userInfo: {},
    loading: true,
    error: null
  },
  action
) => {
  switch (action.type) {
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

export default combineReducers({
  token: rootReducer
});
