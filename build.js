const webpack = require('webpack');
const chalk = require('chalk');
const webpackConfig = require('./config/buildConfig');

webpack(webpackConfig,(err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(chalk.red(err));
    process.exit(1);
  }
  console.log(stats.toString({
    colors: true
  }))
})