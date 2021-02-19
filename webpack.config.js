module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    loaders: [{ exclude: ['node_modules'], loader: 'babel', test: /\.js?$/ }],
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
