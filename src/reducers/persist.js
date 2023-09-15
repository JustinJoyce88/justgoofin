import * as constant from '../constants/constants';

const initialState = {
  user: {
    authToken: '',
    userName: '',
  },
  loggedIn: false
};
const persistReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload,
      };
    case constant.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case constant.LOGOUT_USER:
      return {
        ...state,
        user: {
          ...state.user,
          authToken: '',
          userName: '',
        },
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default persistReducer;
