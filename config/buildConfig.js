const path = require('path');
const commonConfig = require('./common');
const plugins = require('./plugins');

module.exports = Object.assign(commonConfig, {
  output: {
    path:path.resolve(__dirname,'../build'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js'
  },
  mode: 'production',
  plugins: [
    plugins.progress({
      summary: true,
    }),
    plugins.uglify(),
    plugins.extractLess,
    plugins.html
  ]
})