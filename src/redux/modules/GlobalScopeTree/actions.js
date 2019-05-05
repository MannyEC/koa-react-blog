import ActionTypes from './constants';

export function loadScopeTree() {
  return (dispatch) => {
    const params = {};
    dispatch({
      types: [
        ActionTypes.GLOBAL_SCOPE_TREE_LOAD,
        ActionTypes.GLOBAL_SCOPE_TREE_LOAD_SUCCESS,
        ActionTypes.GLOBAL_SCOPE_TREE_LOAD_FAILED
      ],
      promise: client => client.get('/node/tree/', { params }),
    });
  };
}
