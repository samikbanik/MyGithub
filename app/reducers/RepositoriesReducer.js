import { GET_REPOSITORIES, GET_REPOSITORIES_SUCCESS, GET_REPOSITORIES_FAIL } from '../actions/types';
const INITIAL_STATE = {
  data: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_REPOSITORIES:
      return { ...state, loading: true};
    case GET_REPOSITORIES_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case GET_REPOSITORIES_FAIL:
      return { ...state, loading: false };
      console.log('Displaying error in repositories reducer : ', action.payload);
    default:
      return state;
  }
};
