import React from 'react';
import MainContainer from './containers/MainContainer';
import MainRoutes, { mainrouterReducer, mainrouterInitLoader } from './routes';

export const mainReducer = {
  ...mainrouterReducer,
};

export const mainInitLoader = [
  ...mainrouterInitLoader,
];

const Container = props => (
  <MainContainer>
    <MainRoutes {...props} />
  </MainContainer>
);

export default Container;
