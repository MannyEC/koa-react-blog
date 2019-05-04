import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import store, { history } from './redux/store';
import RootRoute from './routes';


const MOUNT_NODE = document.querySelector('#root');

let RootRender = (RootRoutes) => {

  const { dispatch } = store;

  render(
    <AppContainer>
      <LocaleProvider locale={zhCN}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <RootRoutes />
          </ConnectedRouter>
        </Provider>
      </LocaleProvider>
    </AppContainer>,
    MOUNT_NODE
  );
};

RootRender(RootRoute);
// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {
  const RenderApp = RootRender;
  const RenderError = (error) => {
    const RedBox = require('redbox-react');
    render(<RedBox error={error} />, MOUNT_NODE);
  };
  RootRender = (RootRoute) => {
    try {
      RenderApp(RootRoute);
    } catch (error) {
      RenderError(error);
    }
  };
  // module.hot.accept(['./routes'], () => {
  //   rootRender(RootRoute)
  // });
  module.hot.accept();
  // Enable Webpack hot module replacement for reducers
  module.hot.accept(['./redux/modules'], () => {
    const nextRootReducer = require('./redux/modules/index');
    store.replaceReducer(nextRootReducer);
  });
}
