module.exports = {
  publicPath:'./', //资源打包后使用相对路径，因为默认的是相对站点的根路径 img js css
  chainWebpack: config => {
    // 这里是对环境的配置，不同环境对应不同.env配置
    config.plugin('define').tap(args => {
      args[0]['process.env'] = JSON.stringify(process.env)
      return args
    })
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  }
}
