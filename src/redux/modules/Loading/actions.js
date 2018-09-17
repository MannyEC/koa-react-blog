import ActionTypes from './constants';

export function loading() {
  return {
    type: ActionTypes.LOADING_GLOBAL_SHOW
  };
}

export function loaded() {
  return {
    type: ActionTypes.LOADING_GLOBAL_HIDE
  };
}
