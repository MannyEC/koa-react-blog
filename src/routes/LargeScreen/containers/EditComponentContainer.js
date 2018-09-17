import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import asyncProvider from 'providers/asyncProvider';
import { push } from 'react-router-redux';
import withFormProvider from 'providers/withFormProvider';
import withMessage from 'providers/withMessageProvider';
import { LARGESCREEN_COMPONENT_FORM } from '../module/constants';
import {
  initComponentForm,
  loadCurrentModule,
  loadDashboard,
  modCurrentModule
} from '../module/actions';
import EditComponent from '../components/EditComponent';


const mapStateToProps = state => ({
  dashboard: state.LargeScreen.dashboard,
  currentModule: state.LargeScreen.currentModule
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      push,
      initComponentForm,
      loadCurrentModule,
      loadDashboard,
      modCurrentModule
    },
    dispatch
  );

export default compose(
  withRouter,
  asyncProvider({
    async: ({ state, params }) => {
      const actionParams = {
      };
      return actionParams;
    },
    mapActions: {
    }
  }),
  connect(mapStateToProps, mapDispatchToProps),
  withMessage,
  withFormProvider({
    form: LARGESCREEN_COMPONENT_FORM
  })
)(EditComponent);

