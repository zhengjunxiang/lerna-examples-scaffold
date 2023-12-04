const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const BUILD_ENV = process.env.BUILD_ENV;
let proxtConfig = {
  // 默认本地mock走yapi
  // '/api/openapi': {
  //   target: 'https://i18n.mykeeta.com',
  //   changeOrigin: true,
  // },
};

if (BUILD_ENV === 'dev') {
  // proxtConfig = {
  //   // 默认本地mock走yapi
  //   '/api/openapi': {
  //     target: 'http://ocean.waimai.test.sankuai.com',
  //     changeOrigin: true,
  //   },
  // };
}
module.exports = {
  entry: {
    app: './src/index.tsx',
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
  },
  optimization: {
    runtimeChunk: 'single',
  },
  devServer: {
    static: './dist',
    hot: true,
    allowedHosts: 'all',
    proxy: proxtConfig,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
    }),
  ],
};
