import { push } from 'react-router-redux';
import { getSimpleFormValues } from 'helpers/FormHelper';
import { initialFormData } from 'redux/modules/SimpleForm/actions';
import { showUiMessage } from 'redux/modules/UiMessage/actions';
import { dealExportFileResponse } from 'utils/common';
import ActionTypes, { CREATE_DASHBOARD_FORM } from './constants';

export function initDashboardBaseForm(formData = {}) {
  return dispatch => dispatch(initialFormData(CREATE_DASHBOARD_FORM, formData));
}

export function setUserMode(userMode) {
  return dispatch => dispatch({
    type: ActionTypes.DASHBOARD_USERMODE_SET,
    userMode
  });
}

export function loadDashboards() {
  return (dispatch, getState) => dispatch({
    types: [
      ActionTypes.DASHBOARD_LIST_LOAD,
      ActionTypes.DASHBOARD_LIST_LOAD_SUCCESS,
      ActionTypes.DASHBOARD_LIST_LOAD_FAILED
    ],
    promise: client => client.get('/dashboards/')
  }).then(() => {
    const { dashboards } = getState().Dashboards;
    if (dashboards.some(dashboard =>
      dashboard.release && ['RELEASE_STATE_WAITING', 'RELEASE_STATE_DOING'].includes(dashboard.release.state))) {
      setTimeout(() => {
        dispatch(loadDashboards());
      }, 5000);
    }
  });
}

export function modDashboardBase() {
  return (dispatch, getState) => {
    const { userMode } = getState().Dashboards;
    const { id, ...formData } = getSimpleFormValues(getState(), CREATE_DASHBOARD_FORM);
    const data = {
      name: formData.name,
      template: formData.template,
      applicable_crowd: userMode
    };
    if (id) {
      data.id = id;
    }
    dispatch({
      types: [
        ActionTypes.DASHBOARD_BASE_MOD,
        ActionTypes.DASHBOARD_BASE_MOD_SUCCESS,
        ActionTypes.DASHBOARD_BASE_MOD_FAILED,
        ActionTypes.DASHBOARD_BASE_MOD_PARAMS_ERROR
      ],
      promise: client => (id
        ? client.put(`/dashboards/${id}/`, { data })
        : client.post('/dashboards/', { data })),
      simpleForm: CREATE_DASHBOARD_FORM
    }).then((res) => {
      dispatch(loadDashboards());
      if (res.id) {
        dispatch(push(`/largescreen/show/${res.id}`));
      } else {
        dispatch(push('/main/dashboards'));
      }
    });
  };
}

export function setDeleteModal(visible, object = {}) {
  return dispatch => dispatch({
    type: ActionTypes.DASHBOARD_DELETE_MODAL_SET,
    visible: !!visible,
    object: !visible ? {} : object
  });
}

export function deleteDashboard(id) {
  return dispatch => dispatch({
    types: [
      ActionTypes.DASHBOARD_DELETE,
      ActionTypes.DASHBOARD_DELETE_SUCCESS,
      ActionTypes.DASHBOARD_DELETE_FAILED
    ],
    promise: client => client.del(`/dashboards/${id}/`)
  }).then(() => {
    dispatch(showUiMessage({
      message: '删除成功',
      messageType: 'success'
    }));
    dispatch(setDeleteModal(false, {}));
    dispatch(loadDashboards());
  }, () => {
    dispatch(showUiMessage({
      message: '删除失败',
      messageType: 'error'
    }));
    dispatch(setDeleteModal(false, {}));
  });
}

export function copyDashboard(id) {
  return dispatch => dispatch({
    types: [
      ActionTypes.DASHBOARD_COPY,
      ActionTypes.DASHBOARD_COPY_SUCCESS,
      ActionTypes.DASHBOARD_COPY_FAILED
    ],
    promise: client => client.post(`/dashboards/${id}/copy/`)
  });
}

export function deployDashboard(id) {
  return (dispatch) => {
    dispatch({
      types: [
        ActionTypes.DASHBOARD_DEPLOY,
        ActionTypes.DASHBOARD_DEPLOY_SUCCESS,
        ActionTypes.DASHBOARD_DEPLOY_FAILED
      ],
      promise: client => client.post(`/dashboards/${id}/release/`)
    }).then(() => {
      dispatch(push(`/largescreen/deploy/${id}`));
    });
  };
}

export function exportModalSet(visible, object = {}) {
  return dispatch => dispatch({
    type: ActionTypes.DASHBOARD_EXPORT_MODAL_SET,
    visible: !!visible,
    object: !visible ? {} : object
  });
}

export function downloadDashboard(id) {
  return dispatch => dispatch({
    types: [
      ActionTypes.DASHBOARD_DOWNLOAD,
      ActionTypes.DASHBOARD_DOWNLOAD_SUCCESS,
      ActionTypes.DASHBOARD_DOWNLOAD_FAILED
    ],
    promise: client => client.post(`/dashboards/${id}/downlaod/`, {
      resType: 'blob'
    })
  }).then((res) => {
    if (res.body) {
      dealExportFileResponse(res);
      dispatch(showUiMessage({
        message: '下载成功',
        messageType: 'success'
      }));
    }
    dispatch(exportModalSet(false, {}));
  }, () => {
    dispatch(showUiMessage({
      message: '下载失败',
      messageType: 'error'
    }));
    dispatch(exportModalSet(false, {}));
  });
}

export function loadTemplates() {
  return dispatch => dispatch({
    types: [
      ActionTypes.DASHBOARD_TEMPLATES_LOAD,
      ActionTypes.DASHBOARD_TEMPLATES_LOAD_SUCCESS,
      ActionTypes.DASHBOARD_TEMPLATES_LOAD_FAILED
    ],
    promise: client => client.get('/templategroups/')
  });
}
