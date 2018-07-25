const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./common');
const plugins = require('./plugins');

const DEFAULT_PUBLIC_PATH = '/';
const env = process.env;

const publicPath = env.BASE_URL || DEFAULT_PUBLIC_PATH;

module.exports = Object.assign(commonConfig, {
  output: {
    path:path.resolve(__dirname,'../build'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash:8].js'
  },
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    publicPath,
    hot: true,
    open: true,
    quiet: true,
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        { from: /./, to: path.join(publicPath, 'index.html') }
      ]
    },
  },
  plugins: [
    ...(commonConfig.plugins || []),
    plugins.progress(),
    new webpack.HotModuleReplacementPlugin()
    // plugins.openBrowser({ url: devServer.url })
  ],
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.vue',
      '.json']
  },
})