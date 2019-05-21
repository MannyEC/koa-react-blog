import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store, { history } from './redux/store';
import RootRoute from './routes';

const MOUNT_NODE = document.querySelector('#root');

const RootRender = (RootRoutes) => {
  render(
    <Provider store={store}>
      <BrowserRouter history={history}>
        <RootRoutes />
      </BrowserRouter>
    </Provider>,
    MOUNT_NODE
  );
};

RootRender(RootRoute);
