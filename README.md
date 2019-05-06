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

### 配置

- 环境变量
  
  cli-3.0总共提供了四种方式来制定环境变量：

    1. 在根目录添加.env文件，配置所有情况下都会用到的配置（不知道这个存在的意义，所有的都需要的也就不需要配置了 吧）。
    2. 在根目录添加.env.local 文件，配置所有情况下都会用到的配置，与.env的区别是只会在本地，该文件不会被git跟踪。
    3. 在根目录添加.env.[mode] 文件，配置对应某个模式下的配置,比如：.env.development来配置开发环境的配置。
    4. 在根目录添加.env.[mode].local文件，配置对应某个模式下的配置,与.env.[mode]的区别也只是会在本地生效，该文件不会被git跟踪。

- 打包构建时的配置

    .env ,  开发

    .env.prod , 生产

    .env.test 测试

    .env.local 本地，不要提交

- axios

    api/index.js全局配置了 ajax的相关设置




