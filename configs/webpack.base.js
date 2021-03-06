module.exports = {
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        "presets": ["@babel/preset-env", "@babel/preset-react"],
        "plugins": [
          ["@babel/plugin-transform-runtime"],
          ["@babel/plugin-proposal-decorators", { "legacy": true }],
          ["@babel/plugin-proposal-class-properties", { "loose" : true }],
          "react-hot-loader/babel",
        ]
      }
    }]
  }
};
