import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Article, { articleReducer, ArticleInitLoader } from './Article';
import ArticleList, { articleListReducer, ArticleListInitLoader } from './ArticleList';

export const mainrouterReducer = {
  ...articleReducer,
  ...articleListReducer,
};

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
