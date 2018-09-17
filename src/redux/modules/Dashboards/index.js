import ActionTypes from './constants';

const initialState = {
  downloading: false,
  exportModalVisible: false,
  deleteVisible: false,
  exportModalObject: {},
  deleteObject: {},
  userMode: '',
  dashboards: [],
  templateGroups: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.DASHBOARD_USERMODE_SET:
      return { ...state, userMode: action.userMode };
    case ActionTypes.DASHBOARD_LIST_LOAD_SUCCESS:
      return { ...state, dashboards: action.result };
    case ActionTypes.DASHBOARD_TEMPLATES_LOAD_SUCCESS:
      return { ...state, templateGroups: action.result };
    case ActionTypes.DASHBOARD_EXPORT_MODAL_SET:
      return { ...state, exportModalVisible: action.visible, exportModalObject: action.object };
    case ActionTypes.DASHBOARD_DELETE_MODAL_SET:
      return { ...state, deleteVisible: action.visible, deleteObject: action.object };
    case ActionTypes.DASHBOARD_DOWNLOAD:
      return { ...state, downloading: true };
    case ActionTypes.DASHBOARD_DOWNLOAD_FAILED:
    case ActionTypes.DASHBOARD_DOWNLOAD_SUCCESS:
      return { ...state, downloading: false };
    default:
      return state;
  }
}
