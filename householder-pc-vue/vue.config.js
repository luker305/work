// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  // 在vue.config.js里：
  devServer: {
    // proxy: 'http://localhost:7001', //反向代理

    proxy: {
      '/': {
        target: "http://localhost:7001",
        changeOrigin: true,
        ws: false
      }
    },
    host: 'localhost',
    // host: 'local-ip', 
    open: true, //自动打开浏览器
    // disableHostCheck: true, //取消检查host
    allowedHosts: "all"
  },



  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/variables.scss";',//全局scss
      }
    }
  }
}