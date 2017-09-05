import { GET_COMMITS, GET_COMMITS_SUCCESS, GET_COMMITS_FAIL } from '../actions/types';
const INITIAL_STATE = {
  data: []
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_COMMITS:
      return state;
    case GET_COMMITS_SUCCESS:
      return {...state, data: action.payload};
    case GET_COMMITS_FAIL:
      console.log('Displaying error in commits reducer : ', action.payload);
    default:
      return state;
  }
};
