import React from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import PageAContainer, { pageAReducer, PageAinitLoader } from './PageA';
import PageBContainer, { pageBReducer } from './PageB';
import Article, { articleReducer, ArticleInitLoader } from './Article';
import ArticleList, { articleListReducer, ArticleListInitLoader } from './ArticleList';

export const mainrouterReducer = {
  ...pageAReducer,
  ...pageBReducer,
  ...articleReducer,
  ...articleListReducer,
};

const mapStateToProps = state => ({
  name: state.auth.name,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  );

const renderRoutes = (routes) => {
  const ret = [];
  routes.forEach((routeConfig, index) => {
    ret.push(
      <Route
        key={index.toString()}
        path={routeConfig.path}
        component={routeConfig.component}
      />
    );
  });
  return ret;
};

export const RouterConfigs = [{
  path: '/main/rootA',
  component: PageAContainer,
  loadData: PageAinitLoader,
  routes: []
}, {
  path: '/main/rootB',
  component: PageBContainer,
  loadData: null,
  routes: []
}, {
  path: '/main/article/:articleId',
  component: Article,
  loadData: ArticleInitLoader,
  routes: []
}, {
  path: '/main/articleList',
  component: ArticleList,
  loadData: ArticleListInitLoader,
  routes: []
}];

function MainRoutes(props) {
  const routeCom = renderRoutes(RouterConfigs);
  return (
    <Switch>
      {routeCom}
    </Switch>
  );
}
export default MainRoutes;
