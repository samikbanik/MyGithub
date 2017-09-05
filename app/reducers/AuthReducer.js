import { USERNAME_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER } from '../actions/types';
const INITIAL_STATE = { username: '', password: '', user: null, error: '', loading: false };
export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case USERNAME_CHANGED:
      return { ...state, username: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: ''};
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload, error: '', loading: false};
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication failed.', password: '', loading: false };
    default:
      return state;
  }
};
