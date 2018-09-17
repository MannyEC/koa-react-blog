import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withMessage from 'providers/withMessageProvider';
import { push } from 'react-router-redux';
import {
  downloadDashboard,
  copyDashboard,
  deleteDashboard,
  exportModalSet,
  setDeleteModal
} from 'redux/modules/Dashboards/actions';
import Article from '../components/ArticleComponent';


const mapStateToProps = state => ({
  dashboards: state.Dashboards.dashboards,
  visible: state.Dashboards.exportModalVisible,
  modalObject: state.Dashboards.exportModalObject,
  downloading: state.Dashboards.downloading,
  deleteVisible: state.Dashboards.deleteVisible,
  deleteObject: state.Dashboards.deleteObject
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      push,
      downloadDashboard,
      copyDashboard,
      deleteDashboard,
      exportModalSet,
      setDeleteModal
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withMessage
)(Article);
