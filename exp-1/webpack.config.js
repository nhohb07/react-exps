module.exports = {
  context: __dirname + "/app",
  entry: "./app.js",

  output: {
    filename: "app.js",
    path: __dirname + "/dist",
  },

  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      }
    ],
  },
}