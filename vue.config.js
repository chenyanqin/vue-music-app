const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const IS_LIB = process.env.VUE_APP_MODE === "production";

const APP_PUBLIC_PATH = process.argv[process.argv.length - 1].startsWith("--")
  ? "https://websitedn.yiautos.com/toutiao/" +
    process.argv[process.argv.length - 1].substring(2)
  : "./";

console.log("APP_PUBLIC_PATH==>", APP_PUBLIC_PATH);

module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      template: IS_LIB ? "public/index.html" : "public/test.html",
      filename: "index.html"
    }
  },
  publicPath: APP_PUBLIC_PATH,
  css: {
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 75,
            propList: ["*"]
          })
        ]
      }
    }
  },
  configureWebpack: config => {
    if (IS_LIB) {
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true
            },
            sourceMap: false,
            parallel: true
          }
        })
      );
      return {};
    } else {
      return {};
    }
  }
};
