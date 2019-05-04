const webpack = require('webpack');
const debug = require('debug');
const config = require('../config');

const newDebug = debug('app:build:webpack-compiler');
const DEFAULT_STATS_FORMAT = config.compiler_stats;

module.exports = function webpackCompiler(webpackConfig, statsFormat = DEFAULT_STATS_FORMAT) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);

    compiler.run((err, stats) => {
      const jsonStats = stats.toJson();

      newDebug('Webpack compile completed.');
      newDebug(stats.toString(statsFormat));

      if (err) {
        newDebug('Webpack compiler encountered a fatal error.', err);
        return reject(err);
      } else if (jsonStats.errors.length > 0) {
        newDebug('Webpack compiler encountered errors.');
        newDebug(jsonStats.errors.join('\n'));
        return reject(new Error('Webpack compiler encountered errors'));
      } else if (jsonStats.warnings.length > 0) {
        newDebug('Webpack compiler encountered warnings.');
        newDebug(jsonStats.warnings.join('\n'));
      } else {
        newDebug('No errors or warnings encountered.');
      }
      resolve(jsonStats);
    });
  });
};
