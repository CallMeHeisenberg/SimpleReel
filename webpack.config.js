const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var plugins = [
  new CopyWebpackPlugin([
    {from:'./assets', to:'./assets'}
  ])
]

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|ttf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js']
  },

  
  devServer: {
    contentBase: path.join(__dirname, 'bin'),
    port: 3000
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'bin')
  },
  plugins
};
