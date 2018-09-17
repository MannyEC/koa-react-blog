import { push } from 'react-router-redux';
import ApiClient from 'helpers/ApiClient';
import moment from 'moment';
import * as ActionTypes from './constants';

export function logout() {
  return (dispatch) => {
    dispatch({
      types: [
        ActionTypes.LOGOUT,
        ActionTypes.LOGOUT_SUCCESS,
        ActionTypes.LOGOUT_FAIL
      ],
      promise: client => client.post('/logout/')
    });
    sessionStorage.clear();
    dispatch(push('/login/'));
  };
}

export function load() {
  return dispatch => dispatch({
    types: [
      ActionTypes.LOAD,
      ActionTypes.LOAD_SUCCESS,
      ActionTypes.LOAD_FAIL,
      ActionTypes.LOAD_PARAMS_ERROR
    ],
    promise: client => client.get('/login/')
  }).then(() => {}, () => {
    dispatch(logout());
  });
}

export function getImageVerificationCode() {
  const client = new ApiClient();
  return (dispatch) => {
    const requestUrl = '/captcha/';
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
    const timestamp = moment().valueOf();
    dispatch({
      types: [
        ActionTypes.CHECK_IMAGE_VERIFICATION,
        ActionTypes.CHECK_IMAGE_VERIFICATION_SUCCESS,
        ActionTypes.CHECK_IMAGE_VERIFICATION_FAIL
      ],
      promise: client => client.get(`/checkcaptcharequirement/?${timestamp}`)
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
      promise: client => client.post('/login/', { data })
    }).then(() => {
      const { user } = getState().auth;
      if (user && user.token) {
        sessionStorage.setItem('userToken', user.token);
        dispatch(push({
          pathname: '/main/dashboards'
        }));
      }
    }, () => {
      dispatch(checkImageVerificationCode());
    });
  };
}

export function clearExpiredError() {
  return dispatch => dispatch({
    type: ActionTypes.CLEAR_EXPIREDERROR
  });
}
