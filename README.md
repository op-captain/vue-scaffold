# people-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
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

### npm

npm run local 调用的是：.env.local配置; 开发环境（本机）

npm run dev 调用的是：.env.dev配置; 开发环境

npm run test 调用的是：.env.test配置; 测试环境

npm run prod 调用的是：.env.production配置; 生产环境

### 工具和插件

- lodash 工具库

- amfe-flexible 布局插件

    postcss.config 文件中定义基准的rem计算单位

- axios 异步工具


### vue-cli的webpack自定义配置

- 在根目录下的 vue.config.js 文件中自定义配置用以覆盖默认打包配置项


### 目录说明

- 全局组件  components/global

  存放全局组件的地方，主要有两部分内容:

  1. 将第三方UI组件库 按需引入组件 cubeUi.js 
  2. 存放自定义的全局组件 使用 components/global/main.js 自动化方式载入

- 页面组件 views

- 路由配置 router

    根据不同的业务模块进行拆分路由

    1. deputyInformation 代表信息

- 插件或工具方法 utils

    localStorage.js ： localStorage的有效期封装

- 状态管理 store
  
- 混入的统一管理 mixins
  
  pageList： 翻页功能的列表

- 静态资源 assets

    图片，icon, css ,字体文件

### 重要文件

- assets/common.css 共用样式
- App.vue   入口页面
- main.js   入口js
- /router/index.js 路由的入口配置

### 配置

- 环境变量 .env

  cli-3.0总共提供了四种方式来制定环境变量：
  https://www.cnblogs.com/heroljy/p/9305263.html

- 打包构建时的配置

    全局的配置，都要放到.env文件中。根据不同的环境修改里面的配置

    .env.dev ,  开发

    .env.production , 生产

    .env.test 测试

    .env.local 本地开发，不要提交代码托管服务器（SVN 或 git）

- axios

    api/index.js全局配置了 ajax的相关设置




