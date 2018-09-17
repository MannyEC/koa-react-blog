import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import asyncProvider from 'providers/asyncProvider';
import withFormProvider from 'providers/withFormProvider';
import withMessage from 'providers/withMessageProvider';
import { push } from 'react-router-redux';
import {
  setUserMode,
  initDashboardBaseForm,
  loadTemplates,
  modDashboardBase
} from 'redux/modules/Dashboards/actions';
import { CREATE_DASHBOARD_FORM } from 'redux/modules/Dashboards/constants';
import CreateDashboard from '../components/CreateDashboard';


const mapStateToProps = state => ({
  templateGroups: state.Dashboards.templateGroups,
  userMode: state.Dashboards.userMode
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      push,
      setUserMode,
      modDashboardBase
    },
    dispatch
  );

export default compose(
  withRouter,
  asyncProvider({
    async: ({ state, params }) => {
      const actionParams = {
        setUserMode: [''],
        initDashboardBaseForm: [{ size: '1920*1080', industry: '运营商' }],
        loadTemplates: []
      };
      return actionParams;
    },
    mapActions: {
      setUserMode,
      initDashboardBaseForm,
      loadTemplates
    }
  }),
  connect(mapStateToProps, mapDispatchToProps),
  withMessage,
  withFormProvider({
    form: CREATE_DASHBOARD_FORM
  })
)(CreateDashboard);
