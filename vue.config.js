module.exports = {
  publicPath:'./', //资源打包后使用相对路径，因为默认的是相对站点的根路径 img js css
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
