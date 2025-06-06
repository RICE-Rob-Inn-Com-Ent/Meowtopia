// webpack.admin.ts (to samo w user.ts, tylko entry, html i port inne)
import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { merge } from "webpack-merge";
import common from "../webpack.common";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(common, {
  entry: {
    main: path.resolve(__dirname, "../src/apps/admin.tsx"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/admin.html"),
      filename: "admin.html",
      chunks: ["main", "vendors", "runtime"],
    }),
  ],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "../public"),
    },
    port: 7000,
    hot: true,
    compress: true,
    open: true,
    historyApiFallback: {
      index: "/admin.html",
      disableDotRule: true,
    },
    server: {
      type: "http",
    },
  },
});
