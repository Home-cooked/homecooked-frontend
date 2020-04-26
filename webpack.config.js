const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist/'),
    port: 9000,
    publicPath: '/',
    proxy: {
        '/': {
            target: `http://localhost:${process.env.PORT || 9090}`,
            secure: false
        }
    }
  },
  entry: {
    index: './src/index.jsx'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(css|png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Homecooked',
      filename: 'index.html',
      template: './src/index.html'
    }),
    new Dotenv()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    mainFiles: ['index']
  }
};
