import React from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { isEmpty, isEqual } from 'lodash';
import { withRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';

export const pageBReducer = {
};

const PageBComponent = (props) => {
  const { name, history } = props;
  return (<div>page B is powered by {name}</div>);
};

const mapStateToProps = state => ({
  name: state.auth.name,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  );

const PageBContainer = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(PageBComponent);

export default PageBContainer;
