import { isPlainObject } from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default action => (AsyncComponent) => {
  class Async extends Component {
    componentWillMount() {
      const { state, match: { params }, dispatch } = this.props;
      const actionParams = action.async({
        state, params, dispatch, match: this.props.match
      });
      if (isPlainObject(actionParams)) {
        Object.keys(actionParams).forEach((action) => {
          const dispatchAction = this.props[action];
          dispatchAction(...actionParams[action]);
        });
      }
      if (action.push && action.push !== '') {
        const pushPath = action.push({ state, params });
        this.props.history.push(pushPath);
      }
    }

    render() {
      return <AsyncComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({ state });

  const mapDispatchToProps = action.mapActions;

  return connect(mapStateToProps, mapDispatchToProps)(Async);
};
