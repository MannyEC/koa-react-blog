import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { matchPath } from 'react-router-dom';
import { RouterConfigs } from '../../src/routes';
import App from '../../src/routes';
import { layout } from './layout';
import getCreateStore from './store';

const getLoader = (RouterConfigs, url) => {
  let loader = [];
  RouterConfigs.forEach((routerConf) => {
    if (routerConf.routes) {
      const tmpLoader = getLoader(routerConf.routes, url)
      loader = loader.concat(tmpLoader);
    }
    if (routerConf.path === url) {
      if (!routerConf.loadData) return false;
      routerConf.loadData.forEach((item) => {
        const { action, params } = item;
        const wrappedAction = (store) => store.dispatch(action())
        loader.push(wrappedAction);
      });
    }
  });
  return loader;
};

export const render = async (ctx, next) => {
  const { store, history } = getCreateStore(ctx);

  const loaders = getLoader(RouterConfigs, ctx.req.url);
  await Promise.all(loaders.map(async (loader) => {
    const contents = await loader(store);
  }));

  let isMatch = true;
  if (!isMatch) {
    await next();
  } else {
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter
          location={ctx.url}
          context={{}}
        >
          <App />
        </StaticRouter>
      </Provider>
    );

    const initState = store.getState();
    const body = layout(html, initState);
    ctx.body = body;
  }
};
