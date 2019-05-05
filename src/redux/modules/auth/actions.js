import { push } from 'connected-react-router';
import ApiClient from 'helpers/ApiClient';
import moment from 'moment';
import { firstScreenPath } from 'helpers/PermissionHelper';
import { USER_ROLE_CUSTOMER } from 'utils/constants';
import * as ActionTypes from './constants';

export function load() {
  return dispatch => dispatch({
    types: [
      ActionTypes.LOAD,
      ActionTypes.LOAD_SUCCESS,
      ActionTypes.LOAD_FAIL,
      ActionTypes.LOAD_PARAMS_ERROR
    ],
    promise: client => client.get('/login/')
  });
}

export function getImageVerificationCode() {
  const client = new ApiClient();
  return (dispatch) => {
    const timestamp = moment().valueOf();
    const requestUrl = `/captcha/?${timestamp}`;
    client.get(requestUrl, { resType: 'blob' })
      .then((res) => {
        const blob = res.body;
        const reader = new FileReader();
        reader.onload = e => dispatch({
          type: ActionTypes.LOAD_IMAGE_VERIFICATION,
          imageVerification: e.target.result
        });
        reader.readAsDataURL(blob);
      });
  };
}

export function checkImageVerificationCode() {
  return (dispatch, getState) => {
    dispatch({
      types: [
        ActionTypes.CHECK_IMAGE_VERIFICATION,
        ActionTypes.CHECK_IMAGE_VERIFICATION_SUCCESS,
        ActionTypes.CHECK_IMAGE_VERIFICATION_FAIL
      ],
      promise: client => client.get('/checkcaptcharequirement/')
    }).then(() => {
      const { needImageVerification } = getState().auth;
      if (needImageVerification) {
        dispatch(getImageVerificationCode());
      }
    });
  };
}

export function login(username, password, captcha) {
  const data = {
    username,
    password,
    captcha
  };
  return (dispatch, getState) => {
    dispatch({
      types: [
        ActionTypes.LOAD,
        ActionTypes.LOGIN_SUCCESS,
        ActionTypes.LOGIN_FAIL,
        ActionTypes.LOGIN_PARAMS_ERROR
      ],
      promise: client => client.post('/login/', {
        data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
    }).then(() => {
      const { user } = getState().auth;
      if (user.username) {
        dispatch(push({
          pathname: firstScreenPath(user),
        }));
      }
    }, () => {
      dispatch(checkImageVerificationCode());
    });
  };
}

export function logout() {
  return dispatch => dispatch({
    types: [
      ActionTypes.LOGOUT,
      ActionTypes.LOGOUT_SUCCESS,
      ActionTypes.LOGOUT_FAIL
    ],
    promise: client => client.post('/logout/')
  }).then(() => dispatch(push('/login/')));
}

export function jumpToFirstPage() {
  return dispatch => dispatch(load()).then((user) => {
    dispatch(push({
      pathname: firstScreenPath(user),
    }));
  });
}

export function clearExpiredError() {
  return dispatch => dispatch({
    type: ActionTypes.CLEAR_EXPIREDERROR
  });
}

export function updateUserInfo(user) {
  return dispatch => dispatch({
    type: ActionTypes.UPDATE_USER_INFO,
    data: user
  });
}