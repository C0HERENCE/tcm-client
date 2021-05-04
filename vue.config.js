module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  devServer: {
    proxy: {
      "/api": {
        // target: "http://81.71.124.182:5000",
        target: "http://localhost:5000",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/files": {
        // target: "http://81.71.124.182:3000",
        target: "http://localhost:3000",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/files": ""
        }
      }
    },
  },
};
