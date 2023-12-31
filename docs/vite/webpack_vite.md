# 选 Vite 还是 Webpack ？

## Webpack

`Webpack` 是一个基于打包器的构建工具，同一个入口文件的代码会打包成一个 `Bundle` 文件。Webpack 长期来的一个痛点是对于大规模应用的**应用启动和热更新**速度很慢。
![Webpack](/images/vite/webpack-vite.png)

当文件发生变动时，**整个 JavaScript Bundle 文件会被 Webpack 重新构建**，这也是为什么使用 Webpack 的大规模应用在应用启动和热更新时速度很慢的原因。

### Webpack 打包过程：

- 从一个入口文件开始，基于代码文件中的所有 `import，export，require` 构建依赖树；
- 编译 JS/CSS 等模块；
- 使用算法排序、重写、连接代码；
- 优化。

开发环境的 Webpack：

- 打包所有代码；(webpack 会将不同的模块打包成不同 bundle 或 chunk 文件)
- 启动 `webpack-dev-server` 托管打包好的代码；
- 启动 `websocket` 处理热更新 `HMR`。(浏览器是通过 websocket 和 webpack-dev-server 进行通信的)

应用规模越大，启动和热更新代码越慢。及时启动了热更新，每次代码变更也需要重新生产 Bundle 文件。

### [HMR 热更新原理](https://www.cnblogs.com/liangyin/p/16579708.html)

`Hot Module Replacement`（以下简称 HMR）是 webpack 发展至今引入的最令人兴奋的特性之一 ，当你对代码进行修改并保存后，webpack 将对代码重新打包，并将新的模块发送到浏览器端，浏览器通过新的模块替换老的模块，这样在不刷新浏览器的前提下就能够对应用进行更新。
![HMR 工作原理流程图](/images/vite/webpack-vite3.png)

- 1. 在`webpack`的 `dev` 模式下，`webpack`会`watch`文件系统的文件修改，一旦监听到文件变化，`webpack`就会对相关模块进行重新打包，打包完之后会将代码保存在内存中。
- 2. `webpack`和`webpack-dev-server`之间的交互，其中，主要是利用`webpack-dev-server`里的`webpack-dev-middleware`这个中间件调用`webpack`暴露给外部的`API`对代码变化进行的监控。
- 3. 第三步是`webpack-dev-server`对静态文件变化的监控，这一步和第一步不同，并不是要监控代码进行重新打包，而是监听配置文件中静态文件的变化，如果发生变化，则会通知浏览器需要重新加载，即`live reload`（刷新），和 `HMR`不一样。具体配置为，在相关配置文件配置 `devServer.watchContentBase`。
- 4. 服务器端的`webpack-dev-server` 利用 `sockjs`在浏览器和服务器之间建立一个`websocket`长链接，将 `webpack` 打包变化信息告诉浏览器端的`webpack-dev-server`，这其中也包括静态文件的改变信息，当然，这里面最重要的就是每次打包生成的不同 `hash` 值。
- 5. 浏览器端的 `webpack-dev-server` 接收到服务器端的请求，他自身并不会进行代码的替换，他只是一个中间商，当接收到的信息有变化时，他会通知 `webpack/hot/dev-server`， 这是 `webpack` 的功能模块，他会根据浏览器端的 `webpack-dev-server` 传递的信息以及 `dev-server` 的配置，决定浏览器是执行刷新操作还是热更新操作。
- 6. 如果是刷新操作，则直接通知浏览器进行刷新。如果是热更新操作，则会通知热加载模块 `HotModuleReplacement.runtime`，这个 `HotModuleReplacement.runtime`是浏览器端 `HMR` 的中枢系统，他负责接收上一步传递过来的 `hash` 值，然后通知并等待下一个模块即 `JsonpMainTemplate.runtime` 向服务器发送请求的结果。
- 7. `HotModuleReplacement.runtime`通知`JsonpMainTemplate.runtime`模块要进行新的代码请求，并等待其返回的代码块。
- 8. `JsonpMainTemplate.runtime`先向服务端发送请求，请求包含 `hash` 值的 `json` 文件。
- 9. 获取到所有要更新模块的 `hash` 值之后，再次向服务端发送请求，通过 `jsonp` 的形式，获取到最新的代码块，并将此代码块发送给 `HotModulePlugin`。
- 10. `HotModulePlugin` 将会对新旧模块进行对比，决定是否需要更新，若需要更新，则会检查其依赖关系，更新模块的同时更新模块间的引用。

## Vite

Vite 是旨在`提升开发者体验`的下一代 JavaScript 构建工具，核心借助了`浏览器的原生 ES Modules` 和像 `esbuild` 这样的将代码编译成 `native code` 的打包工具。

Vite 主要有两方面组成：

- 一个开发服务器，基于 `ESM` 提供丰富的内建能力，比如速度快到惊人的模块热更新（HMR）；
- 一套构建指令，使用 `rollup` 进行代码打包，且零配置即可输出用于生产环境的高度优化的静态代码。

Vite 的核心能力和 webpack + webpack-dev-server 相似，但是在开发者体验上有一些提升：

- 启动应用都只需更少的时间；
- `HMR`（Hot Module Replacing）热更新都可以做到及时响应；
- 按需编译；
- 零配置，开箱即用；
- Esbuild 能力带来的 `Typescript/jsx` 的原生支持。

大型的 JavaScript 项目在开发和生产环境有比较差的性能表现，往往是因为我们使用的构建工具没有充分做到**并行处理、内存优化和缓存**。

### **_核心理念：Bundless 开发环境构建_**

浏览器的原生 `ES Modules` 能力允许在不将代码打包到一起的情况下运行 JavaScript 应用。Vite  的核心理念很简单，就是借助浏览器原生  `ES Modules`  能力，当浏览器发出请求时，为浏览器按需提供  ES Module  文件，浏览器获取  ES Module  文件会直接执行。

### **应用启动**

Vite 将应用中的模块分为**依赖和源码**两类，分别进行服务器启动时间的优化。

- **依赖模块**，开发过程中基本不会变化。Vite 对依赖采用了 `esbuild` **预构建**的方式，esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍；
- **源码模块**，是用户自己开发的代码，会经常变动。

Vite 在浏览器请求时按需转换并以原生 `ESM` 方式提供源码，让浏览器接管了打包程序的部分工作。

### **Vite 如何工作**？

Vite 通过原生 ES Modules 托管源代码，本质上是**让浏览器来接管部分打包器的工作**。Vite 只会在浏览器请求发生时，按需将源码转成 `ES Modules` 格式返回给浏览器，由浏览器加载并执行 ES Modules 文件。

![](/images/vite/webpack-vite2.png)

### **热更新**

在基于 Bundle 构建的构建器中，当一个文件变动时，重新构建整个 Bundle 文件是非常低效的，且随着应用规模的上升，构建速度会直线下降。
传统的构建器虽然提供了热更新的能力，但是也会存在随着应用规模上升，热更新速度显著下降的问题。

Vite 基于 `ESM` **按需**提供源码文件，当一个文件被编辑后，Vite 只会重新编译并提供该文件。因此，无论项目规模多大，Vite 的热更新都可以保持快速更新。

此外，Vite 合理**利用浏览器缓存来加速页面加载**，源码模块请求根据 `304 Not Modified` 进行协商缓存；依赖模块请求通过 `Cache-Control: max-age=31536000,immutable` 进行强缓存，因此一旦缓存，不会再次请求。

### **生产环境仍需打包**

在生产环境使用 ESM 会存在大量额外网络请求问题，因此生产环境不太试用 ESM，最好的方式还是代码进行 `tree-shaking`、`懒加载`、和 `chunk 分隔`等。

那么生产环境的构建为什么不直接使用 esbuild，而是使用 `rollup` 呢？这是因为 esbuild 在代码分隔、css 处理等方面的功能仍在开发中，rollup 在应用打包方面更加的成熟且灵活。

### **性能提升**

Vite 依托支持原生 `ESM` 模块的现代浏览器，极大的降低了应用的启动和重新构建时间。Vite 本质上是一个在开发环境为浏览器按需提供文件的 Web Server，这些文件包含源码模块和在第一次运行时使用 esbuild 预构建的依赖模块。

Vite 和 Webpack 的主要不同在于开发环境下对于源码如何被托管以及支持哪种模块规范。

### **依赖预构建**

Vite 在首次启动时，会进行依赖预构建。依赖预构建有两个目的：

- CommonJs 和 UMD 的兼容性：开发阶段，Vite 的 `Dev Server` 将所有代码视为原生 ES 模块。因此，Vite 必须将 CommonJS 或 UMD 发布的依赖项转为 ESM。
- 性能：Vite 将有很多内部模块的依赖视为单个模块，以提升页面加载性能。比如，`lodash-es` 拥有超过 600 个内部模块，当 `import {debounce} from 'lodash-es';` 时，浏览器会同时发起超过 600 个请求，并行请求过多将会显著影响页面加载性能。因此预构建将 `lodash-es` 视为一个模块，浏览器只需要发起一个请求。

### **缓存**

1. 文件系统缓存

Vite 会将预构建的依赖缓存到 `node_modules/.vite` ，它根据几个源决定是否需要重新运行预构建步骤：

- `package.json` 中的 `dependencies` 列表；
- 包管理的 `lockfile`，例如 `package-lock.json`，`yarn.lock` 或者 `pnpm-lock.yaml`
- 可能在 `vite.config.js` 相关字段中配置过的。

只有在上述其中一项发生更改时，才需要重新运行预构建。

如果处于某些原因，你想要强制 Vite 重新构建依赖，你可以用 `--force` 命令选项启动开发服务器，或者手动删除 `node_modules/.vite` 目录。

2. 浏览器缓存

解析后的依赖请求会以 HTTP 头 `max-age=31536000,immutable` 强缓存，以提高开发时的页面重载性能。如果你想通过本地编辑来调试依赖项，可以：

- 通过浏览器调试工具的 `Network` 选项卡暂时禁用缓存；
- 重启 `Vite Dev Server`，并添加 `--force` 命令以重新构建依赖；
- 重新载入页面。

### **Typescript 原生支持**

Vite 天然支持引入 .ts 文件，单仅支持 .ts 文件的转译工作，并不执行任何类型检查。
Vite 使用 `esbuild` 将 TypeScript 转译到 JavaScript，约是 tsc 速度的 20-30 倍，同时 `HMR` 更新到浏览器的时间小于 50 ms。

## 对比 Webpack 和 Vite

- Webpack

  - 支持的模块规范：`ES Modules`，`CommonJS` 和 `AMD Modules`；
  - Dev Server：通过 `webpack-dev-server `托管打包好的模块；
  - 生产环境构建：`webpack`

- Vite

  - 支持的模块规范：`ES Modules`；
  - Dev Server：`原生 ES Modules`；
  - 生产环境构建：`Rollup`

总结

由于**浏览器原生 ES Modules** 的支持，当浏览器发出请求时，Vite 可以在不将源码打包为一个 Bundle 文件的情况下，将源码文件转化为 ES Modules 文件之后返回给浏览器。这样 Vite 的应用启动和热更新 HMR 时的速度都不会随着应用规模的增加而变慢。
