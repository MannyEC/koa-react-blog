require('theme/antd.overrides.less');
require('theme/iconfont.less');
import 'ant-design-pro/dist/ant-design-pro.css';

import React from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { isEmpty, isEqual } from 'lodash';
import { withRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import asyncProvider from 'providers/asyncProvider';
import ReactHighcharts from 'react-highcharts';
// import highchartsNoData from 'highcharts-no-data-to-display';
import { message } from 'antd';

import MainContainer, { mainReducer } from './Main';
import NotFound from './NotFound';

export const rootReducer = {
  ...mainReducer
};

const antdMessageConfig = () => {
  message.config({
    duration: 2
  });
};

const mapStateToProps = state => ({
  user: state.auth.user,
  license: state.License.license,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  );

class ApplicationContainer extends React.Component {
  static propTypes = {
    language: PropTypes.string
  }

  componentDidMount() {
    antdMessageConfig();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/"  component={MainContainer} />
        <Route path="/main/:mainKey" component={MainContainer} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default compose(
  hot(module),
  withRouter,
  asyncProvider({
    async: ({ state, params }) => {
      let actionParams = {};
      const { user } = state.auth;
      if (isEmpty(user)) {
        actionParams = {
        };
      }
      return actionParams;
    },
    mapActions: {
    }
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(ApplicationContainer);
