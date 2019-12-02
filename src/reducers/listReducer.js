import * as constants from '../constants';
import data from '../resources/data.json';

export default function (state = data.lists, action) {
  switch (action.type) {
    case constants.ADD_LIST:
      state.push(action.payload)
      return state
    case constants.DELETE_LISTS:
      return action.payload.lists
    default: return state;
  }
}
