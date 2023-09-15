import * as constant from '../constants/constants';

const initialState = {
  loading: false,
};
const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
export default globalReducer;
