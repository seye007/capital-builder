const path = require("path");

module.exports = (env) => {
  const isDev = env.development ? true : false;
  const config = {};

  config.entry = './src/index.js';
  config.output = {
    path: path.resolve(__dirname, `./dist/${env.productName}`),
    filename: "index.js",
    library: "productService",
  };

  config.mode = isDev ? "development" : "production";
  config.resolve = {
    extensions: [".js"],
  };

  config.module = {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.handlebars$/,
        use: [
          {
            loader: "handlebars-loader",
            options: {
              runtime: path.resolve(__dirname, "./src/common/myhbs.js"),
              precompileOptions: {
                knownHelpersOnly: false,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  };

  return config;
};
