const LOAD_ABOUT_SUCCESS = 'ads-cloud/about/LOAD_ABOUT_SUCCESS';
const LOAD_ABOUT_FAIL = 'ads-cloud/about/LOAD_ABOUT_FAIL';
const LOAD_ABOUT = 'ads-cloud/about/LOAD_ABOUT';
const initialState = {
  aboutData: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_ABOUT_SUCCESS:
      return {
        ...state,
        aboutData: action.result
      };
    case LOAD_ABOUT_FAIL:
      return {
        ...state,
        aboutData: {}
      };
    default:
      return state;
  }
}

export function loadAbout() {
  return dispatch => dispatch({
    types: [LOAD_ABOUT, LOAD_ABOUT_SUCCESS, LOAD_ABOUT_FAIL],
    promise: client => client.get('/about/'),
    isNotLoading: true
  });
}
