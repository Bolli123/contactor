import * as constants from '../constants';

export default function (state = [], action) {
  switch (action.type) {
    case constants.SET_CONTACTS:
      return action.payload.contacts
    case constants.EDIT_CONTACT:
      for (let i = 0; i < state.length; i++) {
        if (state[i].name === action.payload.name) {
          console.log(state[i])
          state[i] = action.payload.contact
          console.log(state[i])
        }
      }
      return state
    default: return state
  }
}
