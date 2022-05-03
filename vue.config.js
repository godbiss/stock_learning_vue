module.exports = {

  // lintOnSave: false,
  devServer: {
    proxy: {
      // 名字可以自定义，这里我用的是api
      '/api': {
        target: 'http://localhost:8081', // 设置你调用的接口域名和端口号
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      // 名字可以自定义，这里我用的是api
      '/stockWord': {
        target: 'http://api.tianapi.com/shares/index', // 设置你调用的接口域名和端口号
        changeOrigin: true,
        pathRewrite: {
          '^/stockWord': ''
        }
      },
      // 名字可以自定义，这里我用的是api
      '/stockFinance': {
        target: 'http://api.tianapi.com/finance/index', // 设置你调用的接口域名和端口号
        changeOrigin: true,
        pathRewrite: {
          '^/stockFinance': ''
        }
      },
      // 名字可以自定义，这里我用的是api
      '/sinajs': {
        target: 'http://image.sinajs.cn/newchart', // 设置你调用的接口域名和端口号
        changeOrigin: true,
        pathRewrite: {
          '^/sinajs': ''
        }
      }
    }

  }

}
