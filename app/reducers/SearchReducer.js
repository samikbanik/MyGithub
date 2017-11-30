import { SEARCH_CHANGED } from '../actions/types';

const INITIAL_STATE = {
  searchedUser: ''
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case SEARCH_CHANGED:
      return { ...state, searchedUser: action.payload };
    default:
      return state;
  }
};
