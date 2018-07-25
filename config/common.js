const path = require('path');

const plugins = require('./plugins');
const Rule = require('./rules');

module.exports = {
  cache: true,
  entry: {
    index: './src/index.ts'
  },
  module: {
    rules: [
      Rule.CSS,
      Rule.LESS,
      Rule.FILE,
      Rule.IMG,
      Rule.TS
    ]
  },
  plugins: [
    plugins.html,
    plugins.define
  ]
}