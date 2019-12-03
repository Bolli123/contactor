import * as constants from '../constants';

export const actionAddContact = (id, name, phoneNumber, thumbnailPhoto) => ({
  type: constants.ADD_CONTACT,
  payload: {
    id, name, phoneNumber, thumbnailPhoto
  }
});

export const actionDeleteContacts = (contacts) => ({
  type: constants.DELETE_CONTACTS,
  payload: { contacts }
});
