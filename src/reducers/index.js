import {combineReducers} from 'redux';
import global from './global';
import persist from './persist';

const rootReducer = combineReducers({
  global,
  persist,
});

export default rootReducer;
