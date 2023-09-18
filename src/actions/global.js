import * as constant from '../constants/constants';

export const setLoading = payload => {
  return {
    type: constant.LOADING,
    payload,
  };
};

export const setMovieAmount = payload => {
  return {
    type: constant.MOVIE_AMOUNT,
    payload,
  };
};
