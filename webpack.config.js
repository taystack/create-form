const { makeConfig } = require('@anansi/webpack-config');
const nodeExternals = require('webpack-node-externals');

const options = {
  basePath: 'src',
  buildDir: 'dist/',
  serverDir: 'dist-server/',

  htmlOptions: {
    title: 'use-form',
    scriptLoading: 'defer',
    template: 'index.ejs',
  },
  globalStyleDir: 'style',
};

const generateConfig = makeConfig(options);

module.exports = (env, argv) => {
  const config = generateConfig(env, argv);
  if (!config.experiments) config.experiments = {};
  config.experiments.backCompat = false;

  if (argv?.target?.includes('node')) {
    config.externals = [
      nodeExternals({
        allowlist: [/^@anansi\/core\/server/, /^path-to-regexp/, /\.css$/],
      }),
    ];
  }
  return config;
};

module.exports.options = options;
