import { cloneDeep } from 'lodash';
import { push } from 'react-router-redux';
import { getSimpleFormValues } from 'helpers/FormHelper';
import { getUsefulParams } from 'utils/common';
import { initialFormData } from 'redux/modules/SimpleForm/actions';
import ActionTypes, { LARGESCREEN_DASHBOARD_NAME_FORM, LARGESCREEN_COMPONENT_FORM } from './constants';

export function initDashboardNameForm(value) {
  return dispatch =>
    dispatch(initialFormData(LARGESCREEN_DASHBOARD_NAME_FORM, {
      name: value
    }));
}

export function initComponentForm(formData = {}) {
  return dispatch =>
    dispatch(initialFormData(LARGESCREEN_COMPONENT_FORM, formData));
}

export function clearDashboard() {
  return dispatch => dispatch({
    type: ActionTypes.LARGESCREEN_DASHBOARD_CLEAR
  });
}

export function loadDashboard(id) {
  return (dispatch, getState) => dispatch({
    types: [
      ActionTypes.LARGESCREEN_DASHBOARD_LOAD,
      ActionTypes.LARGESCREEN_DASHBOARD_LOAD_SUCCESS,
      ActionTypes.LARGESCREEN_DASHBOARD_LOAD_FAILED
    ],
    promise: client => client.get(`/dashboards/${id}/`)
  }).then(() => {
    const { dashboard: { name } } = getState().LargeScreen;
    dispatch(initDashboardNameForm(name));
  });
}

export function loadDashboardModules(id) {
  const params = {
    dashboard: id
  };
  return dispatch => dispatch({
    types: [
      ActionTypes.LARGESCREEN_DASHBOARD_MODULES_LOAD,
      ActionTypes.LARGESCREEN_DASHBOARD_MODULES_LOAD_SUCCESS,
      ActionTypes.LARGESCREEN_DASHBOARD_MODULES_LOAD_FAILED
    ],
    promise: client => client.get('/dashboardmodules/', { params })
  });
}

export function modDashboardName() {
  return (dispatch, getState) => {
    const formData = getSimpleFormValues(getState(), LARGESCREEN_DASHBOARD_NAME_FORM);
    const { dashboard: { id } } = getState().LargeScreen;
    const data = {
      name: formData.name
    };
    dispatch({
      types: [
        ActionTypes.LARGESCREEN_DASHBOARD_NAME_MOD,
        ActionTypes.LARGESCREEN_DASHBOARD_NAME_MOD_SUCCESS,
        ActionTypes.LARGESCREEN_DASHBOARD_NAME_MOD_FAILED,
        ActionTypes.LARGESCREEN_DASHBOARD_NAME_MOD_PARAMS_ERROR
      ],
      promise: client => client.patch(`/dashboards/${id}/`, { data }),
      simpleForm: LARGESCREEN_DASHBOARD_NAME_FORM
    }).then(() => {
      dispatch(loadDashboard(id));
    });
  };
}

export function loadCurrentModule(moduleId) {
  return (dispatch, getState) => dispatch({
    types: [
      ActionTypes.LARGESCREEN_CURRENT_MODULE_LOAD,
      ActionTypes.LARGESCREEN_CURRENT_MODULE_LOAD_SUCCESS,
      ActionTypes.LARGESCREEN_CURRENT_MODULE_LOAD_FAILED
    ],
    promise: client => client.get(`/dashboardmodules/${moduleId}/`)
  }).then(() => {
    const { currentModule } = getState().LargeScreen;
    const { datasource } = currentModule;
    const formData = cloneDeep(currentModule);
    let content = null;
    if (datasource && datasource.type === 'json') {
      content = JSON.stringify(datasource.formated_content, null, 4);
    } else {
      content = datasource ? datasource.content : null;
    }
    dispatch(initComponentForm({
      ...formData,
      refresh_interval: formData.refresh_interval ? formData.refresh_interval / 1000 : undefined,
      datasource_content: content,
      datasource_id: datasource ? datasource.id : null
    }));
  });
}

export function modCurrentModule() {
  return (dispatch, getState) => {
    const { id, ...formData } = getSimpleFormValues(getState(), LARGESCREEN_COMPONENT_FORM);
    const data = getUsefulParams({
      title: formData.title,
      datasource_url: formData.datasource_url,
      refresh_interval: formData.refresh_interval ? formData.refresh_interval * 1000 : undefined,
      datasource_content: formData.datasource_content,
      datasource: formData.datasource && formData.datasource.id,
      display_type: formData.display_type
    });
    dispatch({
      types: [
        ActionTypes.LARGESCREEN_CURRENT_MODULE_MOD,
        ActionTypes.LARGESCREEN_CURRENT_MODULE_MOD_SUCCESS,
        ActionTypes.LARGESCREEN_CURRENT_MODULE_MOD_FAILED,
        ActionTypes.LARGESCREEN_CURRENT_MODULE_MOD_PARAMS_ERROR
      ],
      promise: client => client.patch(`/dashboardmodules/${id}/`, { data }),
      simpleForm: LARGESCREEN_COMPONENT_FORM
    }).then(() => {
      dispatch(loadCurrentModule(id));
    });
  };
}

export function deployDashboard(id) {
  return dispatch => dispatch({
    types: [
      ActionTypes.LARGESCREEN_DASHBOARD_DEPLOY,
      ActionTypes.LARGESCREEN_DASHBOARD_DEPLOY_SUCCESS,
      ActionTypes.LARGESCREEN_DASHBOARD_DEPLOY_FAILED
    ],
    promise: client => client.post(`/dashboards/${id}/release/`)
  }).then(() => {
    dispatch(loadDashboard(id));
    dispatch(push(`/largescreen/deploy/${id}`));
  });
}
