const WebpackHotMiddleware = require('webpack-hot-middleware');
const applyExpressMiddleware = require('../lib/apply-express-middleware');
const debug = require('debug');

const newDebug = debug('app:server:webpack-hmr');

module.exports = function (compiler, opts) {
  newDebug('Enable Webpack Hot Module Replacement (HMR).');

  const middleware = WebpackHotMiddleware(compiler, opts);
  return async function koaWebpackHMR(ctx, next) {
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, ctx.res);

    if (hasNext && next) {
      await next();
    }
  };
}
