const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 针对webpack4 不适用css, 升级到beta版可用
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 充分利用多核来压缩
const ProgressBar = require('progress-bar-webpack-plugin');




// 将less提取到独立的文件，而不是在js文件中
const extractLess = new ExtractTextPlugin({
  filename: '[name].[chunkhash:8].css',
  disable: process.env.NODE_ENV === 'development'
});

// // 提取并压缩css
// const extractCss = new MiniCssExtractPlugin({
//   fileName: "[name].[chunkhash:8].css",
//   chunkFilename: "[name].[chunkhash:8].css"
// })


// 模板加载器
const html = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './src/index.ejs',
  templateParameters: {
    BASE_URL: 'hahah'
  }
});


// 压缩js
const uglify = () => new UglifyJsPlugin({
  parallel: true, // 是否启动多线程
  uglifyOptions: {
    compress: {
      warnings: false,
      drop_console: true,
      drop_debugger: true
    },
    mangle: false,
    output: {
      comments: false,
      ascii_only: false
    }
  },
});

// 定义全局变量
const define = (option) => new webpack.DefinePlugin(option)

// 显示编译进程
const progress = () => new ProgressBar();

// const defaultOpenBrowserOptions = {
//   url: 'http://localhost:8080',
//   delay: 1000
// };

// // 打开浏览器
// const openBrowser = function (options) {
//   const openBrowserOptions = Object.assign(
//     {}, defaultOpenBrowserOptions, options
//   );
//   return new OpenBrowserPlugin(openBrowserOptions);
// };



module.exports = {
  extractLess,
  // extractCss,
  html,
  uglify,
  define,
  progress,
  // MiniCssExtractPlugin,
  // openBrowser
};

