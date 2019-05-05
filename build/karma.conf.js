import { argv } from 'yargs'
import config from '../config'
import webpackConfig from './webpack.config'
import _debug from 'debug'

const debug = _debug('app:karma')
debug('Create configuration.')

const karmaConfig = {
  basePath: '../', // project root in relation to bin/karma.js
  files: [
    {
      pattern: `./${config.dir_test}/test-bundler.js`,
      watched: false,
      served: true,
      included: true
    }
  ],
  singleRun: !argv.watch,
  frameworks: ['mocha', 'sinon'],
  reporters: ['mocha', 'html'],
  htmlReporter: {
    outputFile: 'unittest-report.html',
    groupSuites: true
  },
  preprocessors: {
    [`${config.dir_test}/test-bundler.js`]: ['webpack']
  },
  browsers: ['PhantomJS'],
  logLevel: config.LOG_DEBUG,
  client: {
    captureConsole: true,
    mocha: {
      reporter: 'html'
    }
  },
  webpack: {
    entry: webpackConfig.entry,
    devtool: 'cheap-module-source-map',
    resolve: webpackConfig.resolve,
    plugins: webpackConfig.plugins,
    module: {
      noParse: [
        /\/sinon\.js/
      ],
      loaders: webpackConfig.module.rules.concat([
        {
          test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader: 'imports?define=>false,require=>false'
        }
      ])
    },
    // Enzyme fix, see:
    // https://github.com/airbnb/enzyme/issues/47
    externals: {
      ...webpackConfig.externals,
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window'
    },
    // sassLoader: webpackConfig.sassLoader
  },
  webpackMiddleware: {
    noInfo: true,
    stats: {
      colors: true,
      children: false
    }
  },
  coverageReporter: {
    reporters: config.coverage_reporters,
    instrumenters: { isparta: require('isparta') },
    instrumenter: {
      '**/*.js': 'isparta'
    }
  }
}

// if (config.globals.__COVERAGE__) {
//   karmaConfig.reporters.push('coverage')
//   karmaConfig.webpack.module.preLoaders = [{
//     test: /\.(js|jsx)$/,
//     include: new RegExp(config.dir_client),
//     loader: 'isparta',
//     exclude: /node_modules/
//   }]
// }

// cannot use `export default` because of Karma.
module.exports = (cfg) => cfg.set(karmaConfig)
