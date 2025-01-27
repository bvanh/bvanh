import { actions } from "../action_types/index";
const initialState = {
  isLogin: true,
  dataNews: [],
  dataContent: [],
  userToken: null,
  userAccessToken: null,
  accessToken: JSON.parse(localStorage.getItem("accessTokenCms"))
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_TOKEN:
      return {
        ...state,
        userToken: action.userToken,
        userAccessToken: action.accessToken
      };
    case actions.SET_ACCESSTOKEN:
      return { ...state, accessToken: action.payload };
    case actions.SWITCH_LOGIN:
      return { ...state, isLogin: action.payload };
    default:
      return state;
  }
};
