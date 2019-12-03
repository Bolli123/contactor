import * as constants from '../constants';
import data from '../resources/data.json';

export default function (state = data.contacts, action) {
  switch (action.type) {
    case constants.ADD_CONTACT:
      state.push(action.payload)
      return state
    case constants.DELETE_CONTACTS:
      return action.payload.contacts
    default: return state;
  }
}
