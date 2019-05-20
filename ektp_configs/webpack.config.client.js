const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const debug = require('debug');
// const config = require('../config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const newDebug = debug('app:webpack:config');
// const paths = config.utils_paths;

newDebug('Create configuration.');
const webpackConfig = {
  mode: 'development',
  name: 'client',
  target: 'web',
  resolve: {
    modules: [path.resolve(__dirname, '../ektp_src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json']
  },
  module: {}
};
// ------------------------------------
// Entry Points
// ------------------------------------

const APP_ENTRY_PATHS = [
  path.resolve(__dirname, '../ektp_src/index.js')
];

webpackConfig.entry = {
  'babel-polyfill': '@babel/polyfill',
  'react': 'react',
  'react-dom': 'react-dom',
  app: APP_ENTRY_PATHS
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: `[name].[aaa].js`,
  path: path.resolve(__dirname, '../ektp_site'),
  // publicPath: config.compiler_public_path,
  globalObject: 'this'
};

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  // new webpack.DefinePlugin(config.globals),
  // new HtmlWebpackPlugin({
  //   template: paths.client('index.html'),
  //   hash: false,
  //   favicon: paths.client('static/favicon.ico'),
  //   filename: 'index.html',
  //   inject: 'body',
  //   chunksSortMode: 'dependency',
  //   minify: {
  //     removeComments: true,
  //     collapseWhitespace: true,
  //     removeRedundantAttributes: true,
  //     useShortDoctype: true,
  //     removeEmptyAttributes: true,
  //     removeStyleLinkTypeAttributes: true,
  //     keepClosingSlash: true,
  //     minifyJS: true,
  //     minifyCSS: true,
  //     minifyURLs: true,
  //   }
  // })
];

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
// Add any packge names here whose styles need to be treated as CSS modules.
// These paths will be combined into a single regex.
const PATHS_TO_TREAT_AS_CSS_MODULES = [
  // 'react-toolbox', (example)
];

// If config has CSS modules enabled, treat this project's styles as CSS modules.
// if (config.compiler_css_modules) {
//   PATHS_TO_TREAT_AS_CSS_MODULES
//     .push(paths.client().replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&')); // eslint-disable-line
// }

const isUsingCSSModules = !!PATHS_TO_TREAT_AS_CSS_MODULES.length;
// const cssModulesRegex = new RegExp(`(${PATHS_TO_TREAT_AS_CSS_MODULES.join('|')})`);
const cssModulesRegex = [];
// Loaders for files that should not be treated as CSS modules.
const excludeCSSModules = isUsingCSSModules ? cssModulesRegex : false;

webpackConfig.module.rules = [{
  test: /\.(js|jsx)$/,
  include: /(\\|\/)ektp_src/,
  exclude: /\.worker\.js$/,
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    babelrc: true
  }
}, {
  // 匹配 *.worker.js
  test: /\.worker\.js$/,
  use: [{
    loader: 'worker-loader',
    options: {
      inline: true
    }
  }, {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      babelrc: true
    }
  }]
}, {
  test: /\.less$/,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1
      }
    },
    {
      loader: 'less-loader',
      options: {
        modifyVars: {
        },
        javascriptEnabled: true,
      },
    }
  ]
}, {
  test: /\.scss$/,
  // exclude: excludeCSSModules,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: [
          // require('autoprefixer')({ broswer: 'last 5 versions' }), // 处理CSS前缀问题，自动添加前缀
        ]
      }
    },
    { loader: 'sass-loader' }
  ]
}, {
  test: /\.css$/,
  // exclude: excludeCSSModules,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: [
          require('autoprefixer')({ broswer: 'last 5 versions' }), // 处理CSS前缀问题，自动添加前缀
        ]
      }
    }
  ]
}, {
  test: /\.woff(\?.*)?$/,
  loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
}, {
  test: /\.woff2(\?.*)?$/,
  loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
}, {
  test: /\.otf(\?.*)?$/,
  loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'
}, {
  test: /\.ttf(\?.*)?$/,
  loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
}, {
  test: /\.eot(\?.*)?$/,
  loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]'
}, {
  test: /\.svg(\?.*)?$/,
  loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=500000&mimetype=image/svg+xml'
}, {
  test: /\.(png|jpg|gif)$/,
  loader: 'url-loader?limit=8192'
}];

// Don't split bundles during testing, since we only want import one bundle

webpackConfig.optimization = {
  splitChunks: {
    chunks: 'all',
    name: 'vendor',
  }
};


if (isUsingCSSModules) {
  const getCssModulesLoader = importLoaders => ({
    loader: 'css-loader',
    options: {
      modules: true,
      importLoaders,
      localIdentName: '[name]__[local]___[hash:base64:5]'
    }
  });
  webpackConfig.module.rules.push({
    test: /\.scss$/,
    include: cssModulesRegex,
    use: [
      { loader: 'style-loader' },
      getCssModulesLoader(2),
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: [
            require('autoprefixer')({ broswer: 'last 5 versions' }), // 处理CSS前缀问题，自动添加前缀
          ]
        }
      },
      { loader: 'sass-loader' }
    ]
  }, {
    test: /\.css$/,
    include: cssModulesRegex,
    use: [
      { loader: 'style-loader' },
      getCssModulesLoader(1),
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: [
            require('autoprefixer')({ broswer: 'last 5 versions' }), // 处理CSS前缀问题，自动添加前缀
          ]
        }
      }
    ]
  });
}

webpackConfig.plugins.push(
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css'
  }),
);

webpackConfig.optimization = {
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        priority: -10,
        chunks: 'initial',
        enforce: true
      },
      common: {
        name: 'common',
        chunks: 'initial',
        priority: 10,
        reuseExistingChunk: true,
        minChunks: 2,
      },
    }
  },
  runtimeChunk: false,
  minimize: true,
  minimizer: [
    new TerserPlugin({
      exclude: /\.min\.js$/,
      cache: true,
      parallel: true,
      extractComments: false, // 移除注释
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorOptions: {
        safe: true,
        autoprefixer: { disable: true }, // 这里是个大坑，稍后会提到
        mergeLonghand: false,
        discardComments: {
          removeAll: true // 移除注释
        }
      },
      canPrint: true
    })
  ]
};

module.exports = webpackConfig;
