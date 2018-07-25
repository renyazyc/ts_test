const chokidar = require('chokidar'); // 文件变化监视插件

const chalk = require('chalk');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./config/devServerConfig');
const openBrowser = require('./openBrowser');

let isFirstCompile = true;
const DEFAULT_PORT = 8080;
const DEFAULT_HOST = 'localhost';
const env = process.env;
const port = env.PORT || DEFAULT_PORT;
const host = env.HOST || DEFAULT_HOST;
const url = `http://${host}:${port}`

webpackConfig.devServer.host = host;
webpackConfig.devServer.port = port;


webpackDevServer.addDevServerEntrypoints(webpackConfig, webpackConfig.devServer); // 增加热加载时的入口 相当于将entry改为： ['webpack-dev-server/client?http://host:port','webpack/hot/dev-server','./src/index.ts']
const compiler = webpack(webpackConfig);

const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  // 自定义配置
  stats: {
    colors: true,
    children: false,
    chunks: false,
    assetsSort: 'size'
  }
})
console.log();
console.log('Starting development server...');
console.log();
const server = new webpackDevServer(compiler, devServerOptions);


// 通过webpack提供的钩子函数控制
compiler.hooks.done.tap('sever', stats => {
  if (stats.hasErrors()) {
    return console.error(stats.toString({
      // 增加控制台颜色开关
      colors: true
    }))
  }
  console.log([
    `  App running at:`,
    `  - Local:   ${chalk.cyan(url)} `
  ].join('\n'))
  if (isFirstCompile) {
    isFirstCompile = false; // 判断是否是第一次启动服务
    openBrowser(url)
  }else {
    console.log('App updated')
  }
})

server.listen(port, host, err => {
  if (err) {
    console.log(chalk.red(err))
    server.close(() => {
      process.exit(0)
    })
  }
})

// // 监听配置文件变化，重启服务
//
// const watcher = chokidar.watch(['config/','./server.js'], {
//   ignored: 'config/buildConfig.js',
//   persistent: true
// });
//
// watcher.on('change', path => {
//
// })



