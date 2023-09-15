import * as constant from '../constants/constants';

export const setLoading = payload => {
  return {
    type: constant.LOADING,
    payload,
  };
};

export const setLoggedIn = payload => {
  return {
    type: constant.LOGGED_IN,
    payload,
  };
};
