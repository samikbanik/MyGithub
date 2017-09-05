import { GET_REPOSITORIES, GET_REPOSITORIES_SUCCESS, GET_REPOSITORIES_FAIL } from '../actions/types';
const INITIAL_STATE = {
  data: []
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_REPOSITORIES:
      return state;
    case GET_REPOSITORIES_SUCCESS:
      return {...state, data: action.payload};
    case GET_REPOSITORIES_FAIL:
      console.log('Displaying error in repositories reducer : ', action.payload);
    default:
      return state;
  }
};
