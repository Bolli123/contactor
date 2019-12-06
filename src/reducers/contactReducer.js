import * as constants from '../constants';

export default function (state = [], action) {
  switch (action.type) {
    case constants.SET_CONTACTS:
      return action.payload.contacts
    case constants.EDIT_CONTACT:
      for (let i = 0; i < state.length; i++) {
        if (state[i].name === action.payload.name) {
          state[i] = action.payload.contact
        }
      }
      return state
    default: return state
  }
}
