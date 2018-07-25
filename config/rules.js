const path = require('path');
const plugins = require('./plugins');

module.exports = {
  /* config.module.rule('js') */
  // JSX: {
  //   test: /\.jsx?$/,
  //   use: 'babel-loader'
  // },
  CSS: {
    test: /\.css$/,
    use: plugins.extractLess.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
          }
        }
      ],
      fallback: 'style-loader'
    })
  },

  LESS: {
    test: /\.less$/,
    use: plugins.extractLess.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
          }
        },
        {
          loader: 'less-loader'
        }
      ],
      fallback: 'style-loader'
    })
  },

  FILE:{
    //文件加载器，处理文件静态资源
    test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: 'file-loader?name=./fonts/[name].[ext]'
  },

  IMG:{
    //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
    //如下配置，将小于8192byte的图片转成base64码
    test: /\.(png|jpg|gif)$/,
    use: 'url-loader?limit=8192&name=./img/[hash].[ext]'
  },

  TS: {
    // typescript 加载器
    test: /\.tsx?$/,
    use: 'ts-loader'
  }
}