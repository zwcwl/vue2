const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy: {
      '/api': {         //代理名称,这里最好有一个 
        target: 'http://localhost:3000',  // 后台接口域名
        changeOrigin: true, 
        pathRewrite:{
          '^/api':''//路径重写
        }
      }
    }
  }
})
