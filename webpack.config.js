var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var extractScssPlugin = new ExtractTextPlugin({
    filename: 'css/main.css'
});

const fileAsset = `name=assets/[name].[hash].[ext]`;

var extractCssPlugin = new ExtractTextPlugin({
    filename: 'vendor.css'
});

module.exports = {
  devtool: "source-map",
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    // publicPath: '/dist'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }]
    }, {
      test: /\.css$/,
      loader: extractCssPlugin.extract({
        loader: 'css-loader?modules&importLoaders=1&localIdentName=[local]_[hash:base64:6]',
      }),
    }, {
      test: /\.scss$/,
      use: extractScssPlugin.extract({
        use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            }, /*{
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('autoprefixer')({
                  'browsers': ['> 1%', 'last 2 versions']
                })],
              }
            },*/ {
              loader: 'sass-loader',
              options: { sourceMap: true }

            }
          ]
      })
    }, {
      test: /\.html$/,
      use: ['html-loader?interpolate']
    }, {
      test: /\.(jpg|png)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img/',
          publicPath: 'img/'
        }
      }]
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: `url-loader?limit=10000&mimetype=image/svg+xml&${fileAsset}`
    }]
  },
  plugins: [
    extractCssPlugin,
    extractScssPlugin,
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: 'shared', to: 'shared' }
    ])
  ]
};
