import * as constants from '../constants';

export const actionAddList = (id, name, color, boardId) => ({
  type: constants.ADD_LIST,
  payload: {
    id, name, color, boardId
  }
});

export const actionDeleteLists = (lists) => ({
  type: constants.DELETE_LISTS,
  payload: {lists}
});
