import * as constants from '../constants';

export const actionEditContact = (name, contact) => ({
  type: constants.EDIT_CONTACT,
  payload: {
    name, contact
  }
});

export const actionSetContacts = (contacts) => ({
  type: constants.SET_CONTACTS,
  payload: { contacts }
});
