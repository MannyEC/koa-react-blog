const WebpackDevMiddleware = require('webpack-dev-middleware');
const applyExpressMiddleware = require('../lib/apply-express-middleware');
const debug = require('debug');
const config = require('../../config');

const paths = config.utils_paths;
const newDebug = debug('app:server:webpack-dev');

module.exports = function (compiler, publicPath) {
  newDebug('Enable webpack dev middleware.');

  const middleware = WebpackDevMiddleware(compiler, {
    publicPath,
    contentBase: paths.client(),
    hot: true,
    quiet: config.compiler_quiet,
    noInfo: config.compiler_quiet,
    lazy: false,
    stats: config.compiler_stats
  });

  return async function koaWebpackDevMiddleware(ctx, next) {
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, {
      end: (content) => (ctx.body = content),
      setHeader: function () {
        ctx.set.apply(ctx, arguments);
      }
    });

    if (hasNext) {
      await next();
    }
  };
}
