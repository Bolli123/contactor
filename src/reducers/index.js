import { combineReducers } from 'redux';
import board from './boardReducer'
import list from './listReducer'
import task from './taskReducer'

export default combineReducers({
  board,
  list,
  task
});
