import * as constant from '../constants/constants';

const initialState = {
  movieAmount: 32,
};
const persistReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.MOVIE_AMOUNT:
      return {
        ...state,
        movieAmount: action.payload,
      };
    case constant.SAVED_MOVIE_LIST:
      return {
        ...state,
        savedMovieList: action.payload,
      };
    default:
      return state;
  }
};

export default persistReducer;
