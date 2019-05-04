import 'moment/locale/zh-cn';
import 'theme/antd.overrides.less';
import 'theme/iconfont.less';
import 'theme/core.scss';

import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { withRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import asyncProvider from 'providers/asyncProvider';
import { message } from 'antd';

import MainContainer, { mainReducer } from './Main';
import NotFound from './NotFound';

export const rootReducer = {
  ...mainReducer,
};

const antdMessageConfig = () => {
  message.config({
    duration: 2
  });
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  );

class ApplicationContainer extends React.Component {
  componentDidMount() {
    antdMessageConfig();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={MainContainer} />
        <Route path="/main/:mainKey" component={MainContainer} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default compose(
  withRouter,
  asyncProvider({
    async: ({ state, params }) => {
    },
    mapActions: {
    }
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(ApplicationContainer);
