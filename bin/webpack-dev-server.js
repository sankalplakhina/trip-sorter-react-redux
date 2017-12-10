// Root directory(NODE_PATH) for this server is defined in package.json
// "NODE_PATH": "./" from root folder
require('server.babel'); // babel registration (runtime transpilation for node)
const express = require('express');
const compression = require('compression');
const webpack = require('webpack');

const { host, port, webpackPort } = require('config/env');

const webpackConfig = require('webpack/dev.config');

const compiler = webpack(webpackConfig);

const serverOptions = {
  contentBase: `http://${host}:${port}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
};

const app = express();

app.use(compression());
app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(webpackPort, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Webpack development server listening on port ${webpackPort}`);
  }
});
