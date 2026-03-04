const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    watchOptions: {
      poll: 1000,            // toutes les 1s (tu peux mettre 500)
      aggregateTimeout: 300, // regroupe les changements
      ignored: /node_modules/,
    },
  },
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    allowedHosts: "all",
    client: {
      webSocketURL: "ws://localhost:8080/ws",
    },
  },
});