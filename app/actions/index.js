import {
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  GET_REPOSITORIES,
  GET_REPOSITORIES_SUCCESS,
  GET_REPOSITORIES_FAIL,
  GET_COMMITS,
  GET_COMMITS_SUCCESS,
  GET_COMMITS_FAIL
} from './types';
import Base64 from '../components/Base64';

export const usernameChanged = (text) => {
  return {
    type: USERNAME_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    fetch('https://api.github.com/users/' + username , {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Base64.btoa(username + ':' + password)
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.login){
          loginUserSuccess(dispatch, responseJson);
        }
        else{
          loginUserFail(dispatch);
        }
      })
      .catch((error) => {
        loginUserFail(dispatch);
      });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

export const getRepositories = (username, password) => {
  return (dispatch) => {
    dispatch({ type: GET_REPOSITORIES });
    fetch('https://api.github.com/users/' + username + '/repos' , {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Base64.btoa(username + ':' + password)
      }
    })
      .then((response) => response.json())
      .then((responseJson) => getRepositoriesSuccess(dispatch, responseJson))
      .catch((error) => getRepositoriesFail(dispatch, error));
  };
}

const getRepositoriesSuccess = (dispatch, repositories) => {
  dispatch({
    type: GET_REPOSITORIES_SUCCESS,
    payload: repositories
  });
};

const getRepositoriesFail = (dispatch, error) => {
  dispatch({
    type: GET_REPOSITORIES_FAIL,
    payload: error
  });
}

export const getCommits = (username, password, repo) => {
  return (dispatch) => {
    dispatch({ type: GET_COMMITS });
    fetch('https://api.github.com/repos/' + username + '/' + repo + '/commits' , {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Base64.btoa(username + ':' + password)
      }
    })
      .then((response) => response.json())
      .then((responseJson) => getCommitsSuccess(dispatch, responseJson))
      .catch((error) => getCommitsFail(dispatch, error));
  };
}

const getCommitsSuccess = (dispatch, commits) => {
  dispatch({
    type: GET_COMMITS_SUCCESS,
    payload: commits
  });
};

const getCommitsFail = (dispatch, error) => {
  dispatch({
    type: GET_COMMITS_FAIL,
    payload: error
  });
}
