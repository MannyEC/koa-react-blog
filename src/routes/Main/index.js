import React from 'react';
import MainContainer from './containers/MainContainer';
import MainRoutes, { mainrouterReducer, RouterConfigs } from './routes';

export const mainReducer = {
  ...mainrouterReducer,
};

export const mainRouterConfigs = RouterConfigs;

const Container = props => (
  <MainContainer>
    <MainRoutes {...props} />
  </MainContainer>
);

export default Container;
