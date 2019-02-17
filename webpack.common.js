const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
  },
  output: {
    path: resolve(__dirname, 'docs'),
    filename: '[name]-bundle.js',
    chunkFilename: '[name]-chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          interpolate: true,
        },
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '../fonts/',
          outputPath: 'fonts/',
        },
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: './assets/[name].[ext]',
              include: 'file-loader',
              fallback: 'file-loader',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          // Images larger than 10 KB won’t be inlined
          limit: 10 * 1024,
          // Remove quotes around the encoded URL –
          // they’re rarely useful
          noquotes: true,
        },
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        // Specify enforce: 'pre' to apply the loader
        // before url-loader/svg-url-loader
        // and not duplicate it in rules with them
        enforce: 'pre',
      },
      {
        test: /\.js$/,
        include: resolve(__dirname, 'src/'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ '@babel/env' ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([ { from: 'assets' } ]),
    new HtmlWebpackPlugin({
      template: '../index.html',
    }),
    new webpack.ProvidePlugin({
      m: 'mithril', //Global access
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}
