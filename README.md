# my-project

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

### electron-vue 使用指南

> 文档地址： https://simulatedgreg.gitbooks.io/electron-vue/content/cn/

##### 开发指南

* 启动后页面报错： Uncaught TypeError: Object.fromEntries is not a function

  >```shell
  >npm i polyfill-object.fromentries
  >```
  >
  >在  /.electron-vue/dev-client.js 文件中引入
  >
  >```js
  >import 'polyfill-object.fromentries';
  >```

* 终端提示： Unable to install `vue-devtools`:

  > 文件： src/main/index.dev.js，暂时注释

* 报错： GET http://localhost:9080/__webpack_hmr 404 (Not Found)

  > 在文件 .electron-vue/dev-runner.js中
  >
  > ```js
  >  const server = new WebpackDevServer(
  >       compiler,
  >       {
  >         contentBase: path.join(__dirname, '../'),
  >         quiet: true,
  >         hot: true,
  >         before (app, ctx) {
  >           // 放开此处的注释
  >           app.use(hotMiddleware)
  >           ctx.middleware.waitUntilValid(() => {
  >             resolve()
  >           })
  >         }
  >       }
  >     )
  > ```
  >
  > 

##### 关于build报错处理

* .electron-vue 文件夹中build.js  中 tasks命名重复问题

  > ```js
  > // 将其中的一个声明更改
  > const tasks1 = ['main', 'renderer']
  >   const m = new Multispinner(tasks1, {
  >     preText: 'building',
  >     postText: 'process'
  >   })
  > ```

* 在mac上报错：Can't locate Mac/Finder/DSStore.pm in @INC (you may need to i

  >* 删除原 electron-builder 重新安装即可
  >* 可用版本： electron-builder": "^22.11.7
