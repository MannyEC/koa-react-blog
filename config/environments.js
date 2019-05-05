// Here is where you can define configuration overrides based on the execution environment.
// Supply a key to the default export matching the NODE_ENV that you wish to target, and
// the base configuration will apply your overrides before exporting itself.
module.exports = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  // NOTE: In development, we use an explicit public path when the assets
  // are served webpack by to fix this issue:
  // http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
  development: config => ({
    compiler_public_path: `http://${config.server_host}:${config.server_port}/`,
    proxy: {
      enabled: true,
      options: {
        host: `${config.protocol}://${config.api_server}:${config.api_port}`,
        https: config.protocol === 'https',
        originUrl: '/api',
        match: /(^\/api\/.*|^\/images\/.*)/,
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
      }
    }
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production: () => ({
    compiler_public_path: '/',
    compiler_fail_on_warning: false,
    compiler_hash_type: 'chunkhash',
    compiler_devtool: false,
    compiler_stats: {
      chunks: true,
      chunkModules: true,
      colors: true,
      children: false
    }
  })
};
