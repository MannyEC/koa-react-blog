import ActionTypes from './constants';

const initialState = {};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.UI_MESSAGE_HIDE:
      return {
        ...state,
        message: undefined,
        messageType: undefined
      };
    case ActionTypes.UI_MESSAGE_SHOW:
      return {
        ...state,
        message: action.payload.message,
        messageType: action.payload.messageType
      };
    default:
      return state;
  }
}
