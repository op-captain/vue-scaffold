# people-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


<hr>
<hr>

# people-app 开发相关说明

### 工具和插件

- lodash 工具库

- amfe-flexible 布局插件

    postcss.config 文件中定义基准的rem计算单位
- 

### vue-cli的webpack自定义配置

- 在根目录下的 vue.config.js 文件中自定义配置用以覆盖默认打包配置项


### 目录说明

- 全局组件  components/global

  存放全局组件的地方，主要有两部分内容:

  1. 将第三方UI组件库 按需引入组件 cubeUi.js 
  2. 存放自定义的全局组件 使用 components/global/main.js 自动化方式载入

- 路由页面 views



