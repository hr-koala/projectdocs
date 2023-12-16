## 一、什么是 SPA

SPA（single-page application），翻译过来就是单页应用`SPA`是一种网络应用程序或网站的模型，它通过动态重写当前页面来与用户交互，这种方法避免了页面之间切换打断用户体验在单页应用中，所有必要的代码（`HTML`、`JavaScript`和`CSS`）都通过单个页面的加载而检索，或者根据需要（通常是为响应用户操作）动态装载适当的资源并添加到页面页面在任何时间点都不会重新加载，也不会将控制转移到其他页面举个例子来讲就是一个杯子，早上装的牛奶，中午装的是开水，晚上装的是茶，我们发现，变的始终是杯子里的内容，而杯子始终是那个杯子结构如下图

![](https://static.vue-js.com/df14a5a0-3ac6-11eb-85f6-6fac77c0c9b3.png)

我们熟知的 JS 框架如`react`,`vue`,`angular`,`ember`都属于`SPA`

## 三、实现一个 SPA

#### 原理

1.  监听地址栏中`hash`变化驱动界面变化
2.  用`pushsate`记录浏览器的历史，驱动界面发送变化

![](https://static.vue-js.com/fc95bf60-3ac6-11eb-ab90-d9ae814b240d.png)

#### 实现

##### `hash` 模式

核心通过监听`url`中的`hash`来进行路由跳转

```js
// 定义 Router
class Router {
  constructor() {
    this.routes = {}; // 存放路由path及callback
    this.currentUrl = ""; // 监听路由change调用相对应的路由回调
    window.addEventListener("load", this.refresh, false);
    window.addEventListener("hashchange", this.refresh, false);
  }
  route(path, callback) {
    this.routes[path] = callback;
  }
  push(path) {
    this.routes[path] && this.routes[path]();
  }
}

// 使用 router
window.miniRouter = new Router();
miniRouter.route("/", () => console.log("page1"));
miniRouter.route("/page2", () => console.log("page2"));

miniRouter.push("/"); // page1
miniRouter.push("/page2"); // page2
```

##### history 模式

`history` 模式核心借用 `HTML5 history api`，`api` 提供了丰富的 `router` 相关属性先了解一个几个相关的 api

- `history.pushState` 浏览器历史纪录添加记录
- `history.replaceState`修改浏览器历史纪录中当前纪录
- `history.popState` 当 `history` 发生变化时触发

```js
// 定义 Router
class Router {
  constructor() {
    this.routes = {};
    this.listerPopState();
  }
  init(path) {
    history.replaceState({ path: path }, null, path);
    this.routes[path] && this.routes[path]();
  }
  route(path, callback) {
    this.routes[path] = callback;
  }
  push(path) {
    history.pushState({ path: path }, null, path);
    this.routes[path] && this.routes[path]();
  }
  listerPopState() {
    window.addEventListener("popstate", (e) => {
      const path = e.state && e.state.path;
      this.routers[path] && this.routers[path]();
    });
  }
}

// 使用 Router

window.miniRouter = new Router();
miniRouter.route("/", () => console.log("page1"));
miniRouter.route("/page2", () => console.log("page2"));

// 跳转
miniRouter.push("/page2"); // page2
```

### 四、题外话：如何给 SPA 做 SEO

下面给出基于`Vue`的`SPA`如何实现`SEO`的三种方式

1.  **SSR 服务端渲染**

将组件或页面通过服务器生成 html，再返回给浏览器，如`nuxt.js`

2.  **静态化**

目前主流的静态化主要有两种：（1）一种是通过程序将动态页面抓取并保存为静态页面，这样的页面的实际存在于服务器的硬盘中（2）另外一种是通过 WEB 服务器的 `URL Rewrite`的方式，它的原理是通过 web 服务器内部模块按一定规则将外部的 URL 请求转化为内部的文件地址，一句话来说就是把外部请求的静态地址转化为实际的动态页面地址，而静态页面实际是不存在的。这两种方法都达到了实现 URL 静态化的效果

3.  **使用`Phantomjs`针对爬虫处理**

原理是通过`Nginx`配置，判断访问来源是否为爬虫，如果是则搜索引擎的爬虫请求会转发到一个`node server`，再通过`PhantomJS`来解析完整的`HTML`，返回给爬虫。下面是大致流程图

![](https://static.vue-js.com/25be6630-3ac7-11eb-ab90-d9ae814b240d.png)
