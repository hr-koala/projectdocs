---
title: "vue"
author: htong
---

## Vue 修改数据后怎么让数据更新

在 Vue 中，如果你修改了组件里的数据，Vue 会自动帮你更新视图。这是因为 Vue 采用了`数据驱动的视图更新机制`。具体来说，Vue 通过建立数据的单向绑定关系，将数据与视图绑定在一起。当数据发生改变时，Vue 会自动更新视图，反之亦然。

但是，如果你修改的是数组或对象中的某个元素，而并非直接修改整个数组或对象，那么 Vue 会有些迟疑，因为这种情况对 Vue 来说是不可知的。为了解决这个问题，Vue 提供了一些特殊的方法来处理这种数组或对象的修改，如 `Vue.set()`、`Vue.delete()`、`Array.prototype.splice()` 等。

## MVVM、MVC 有什么区别

1. MVC 通过分离 `Model`、`View` 和 `Controller` 的方式来组织代码结构。

- 其中 View 负责页面的显示逻辑，
- Model 负责存储页面的业务数据，以及对相应数据的操作。
- Controller 层是 View 层和 Model 层的纽带，它主要负责用户与应用的响应操作，当用户与页面产生交互的时候，Controller 中的事件触发器就开始工作了，通过调用 Model 层，来完成对 Model 的修改，然后 Model 层再去通知 View 层更新。

2. MVVM 分为 `Model`、`View`、`ViewModel`。

- Model 代表数据模型，数据和业务逻辑都在 Model 层中定义；
- View 代表 UI 视图，负责数据的展示；
- ViewMode 负责监听 Model 中数据的改变并且控制视图的更新，处理用户交互操作；

Model 和 View 并无直接关联，而是通过 ViewModel 来进行联系的，Model 和 ViewModel 之间有着双向数据绑定的联系。因此当 Model 中的数据改变时会触发 View 层的刷新，View 中由于用户交互操作而改变的数据也会在 Model 中同步。 这种模式实现了 Model 和 View 的数据自动同步，因此开发者只需要专注于数据的维护操作即可，而不需要自己操作 DOM。

### Vue 并没有完全遵循 MVVM 思想呢？

严格的 MVVM 要求 View 不能和 Model 直接通信，而 Vue 提供了 `$refs` 这个属性，让 Model 可以直接操作 View，违反了这一规定，所以说 Vue 没有完全遵循 MVVM。

## Vue 和 React 对比

这里就做几个简单的类比吧，当然没有好坏之分，只是使用场景不同

### 相同点

- 都有组件化思想
- 都支持服务器端渲染
- 都有 Virtual DOM（虚拟 dom）
- 数据驱动视图
- 都有支持 native 的方案：`Vue`的`weex`、`React`的`React native`
- 都有自己的构建工具：`Vue`的`vue-cli`、`React`的`Create React App`

### 区别

- 数据流向的不同。`react`从诞生开始就推崇单向数据流，而`Vue`是双向数据流
- 数据变化的实现原理不同。`react`使用的是不可变数据，而`Vue`使用的是可变的数据
- 组件化通信的不同。`react`中我们通过使用回调函数来进行通信的，而`Vue`中子组件向父组件传递消息有两种方式：事件和回调函数
- diff 算法不同。`react`主要使用 diff 队列保存需要更新哪些 DOM，得到 patch 树，再统一操作批量更新 DOM。`Vue` 使用双向指针，边对比，边更新 DOM

## vue 中 data 改变后让视图同步更新

我们都知道，在 vue 中改变数据后，视图并不是同步更新的。
::: tip vue
在 vue 实例初始化后，会将 data 中属性设置为`响应式对象`，当 data 中属性改变时，会触发这个响应式对象的 setter。在 setter 中，会触发更新，通知所有订阅了该属性的订阅者。但是这个触发更新并不是同步的，它会将所有的 watcher 都添加到一个队列，并在 nextTick 之后去更新视图。`
:::
这就是 vue 不能同步更新视图的原因。

解决方法：  
既然是在 nextTick 的时候去更新视图，这个时候，必然会去执行一个更新视图的方法，那么我们手动在数据改变的时候去执行这个方法，就达到了同步更新视图的目的。

在了解源码后，我们可以发现执行的是 `watcher.run()`这个方法  
打印 this，可以在\_watcher 这个对象的原型上找到 run 这个方法

```js
this._watcher.run()
```

## Computed 和 Watch 有什么区别？

对于 Computed：

- 它支持缓存，只有依赖的数据发生了变化，才会重新计算
- 不支持异步，当 Computed 中有异步操作时，无法监听数据的变化
- 如果一个属性是由其他属性计算而来的，这个属性依赖其他的属性，一般会使用 computed
- 如果 computed 属性的属性值是函数，那么默认使用 get 方法，函数的返回值就是属性的属性值；在 computed 中，属性有一个 get 方法和一个 set 方法，当数据发生变化时，会调用 set 方法。

对于 Watch：

- 它不支持缓存，当一个属性发生变化时，它就会触发相应的操作
- 支持异步监听
- 监听的函数接收两个参数，第一个参数是最新的值，第二个是变化之前的值
- 监听数据必须是 data 中声明的或者父组件传递过来的 props 中的数据，当发生变化时，会触发其他操作
- 函数有两个的参数：immediate：组件加载立即触发回调函数 deep：深度监听，发现数据内部的变化，在复杂数据类型中使用，例如数组中的对象发生变化。

## 事件有哪些修饰符？

::: details 「事件修饰符」

- .stop 阻止事件继续传播
- .prevent 阻止标签默认行为
- .capture 使用事件捕获模式,即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理
- .self 只当在 event.target 是当前元素自身时触发处理函数
- .once 事件将只会触发一次
- .passive 告诉浏览器你不想阻止事件的默认行为
  :::

::: details 「v-model 的修饰符」

- .lazy 通过这个修饰符，转变为在 change 事件再同步
- .number 自动将用户的输入值转化为数值类型
- .trim 自动过滤用户输入的首尾空格

::: details 「键盘事件的修饰符」

- .enter
- .tab
- .delete (捕获“删除”和“退格”键)
- .esc
- .space
- .up
- .down
- .left
- .right
  :::

::: details 「系统修饰键」

- .ctrl
- .alt
- .shift
- .meta
  :::

::: details 「鼠标按钮修饰符」

- .left
- .right
- .middle
  :::

## assets 和 static 的区别

- 相同点： assets 和 static 两个都是存放静态资源文件。项目中所需要的资源文件图片，字体图标，样式文件等都可以放在这两个文件下，这是相同点
- 不相同点： assets 中存放的静态资源文件在项目打包时，也就是运行 npm run build 时会将 assets 中放置的静态资源文件进行打包上传，所谓打包简单点可以理解为压缩体积，代码格式化。而压缩后的静态资源文件最终也都会放置在 static 文件中跟着 index.html 一同上传至服务器。static 中放置的静态资源文件就不会要走打包压缩格式化等流程，而是直接进入打包好的目录，直接上传至服务器。因为避免了压缩直接进行上传，在打包时会提高一定的效率，但是 static 中的资源文件由于没有进行压缩等操作，所以文件的体积也就相对于 assets 中打包后的文件提交较大点。在服务器中就会占据更大的空间。

建议： 将项目中 template 需要的样式文件 js 文件等都可以放置在 assets 中，走打包这一流程。减少体积。而项目中引入的第三方的资源文件如 iconfoont.css 等文件可以放置在 static 中，因为这些引入的第三方文件已经经过处理，我们不再需要处理，直接上传。

## Vue 的性能优化有哪些

（1）**代码层面的优化**

- v-if 和 v-show 区分使用场景
- computed 和 watch 区分使用场景
- v-for 遍历必须为 item 添加 key,且避免同时使用 v-if
- 长列表性能优化
- 事件的销毁
- 图片资源懒加载
- 路由懒加载
- 第三方插件的按需引入
- 优化无限列表性能
- 服务端渲染

（2）**Webpack 层面的优化**

- Webpack 对图片进行压缩
- 减少 ES6 转为 ES5 的冗余代码
- 获取公共代码
- 模板预编译
- 提取组件的 CSS
- 优化 SourceMap
- 构建结果输出分析
- Vue 项目的编译优化

（3）**基础的 Web 技术的优化**

- 开启 Gizp 压缩
- 浏览器缓存
- CDN 的使用
- 使用 **Chrome Performance** 查找性能瓶颈优化

## Vue 的首屏加载性能优化有哪些

1. 图片优化

之前为了方便 背景图片直接在 assets 里面，导致加载图片时候就用了十几秒， 把图片上传空间了， 然后改用网络地址。

2. 禁止生成.map 文件

build 出来的 dist 文件夹里面有很多的 .map 文件,这些文件主要是帮助线上调试代码，禁止生成这些文件.
在 vue.config.js 里面加上这句 `productionSource`。

3. 路由懒加载
4. cdn 引入公共库 `externals: {} `//配置 cdn
5. 配置 GZIP 压缩

```js
// gzip 压缩
plugins: [
  new CompressionWebpackPlugin({
    test: new RegExp('\.(js|css)$'),
    threshold: 10240,
    minRatio: 0.8
  })
],
```

//服务端也要配，不然不认识 GZIP 文件。

```js
//配置 GZIP 压缩模块
const compression = require("compression")
//在所有中间件之前引入
app.use(compression())
```

## Vue 有哪些生命周期钩子?

Vue 的生命周期钩子核心实现是利用**发布订阅模式**先把用户传入的的生命周期钩子订阅好（内部采用**数组**的方式存储）然后在创建组件实例的过程中会一次执行对应的钩子方法（发布）。

- beforeCreate：是 `new Vue() `之后触发的第一个钩子，在当前阶段 data、methods、computed 以及 watch 上的数据和方法都不能被访问。
- created：在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发 `updated` 函数。可以做一些初始数据的获取，在当前阶段无法与 `Dom` 进行交互，如果非要想，可以通过 `vm.$nextTick` 来访问 Dom。
- beforeMount：发生在挂载之前，在这之前 template 模板已导入渲染函数编译。而当前阶段`虚拟 Dom` 已经创建完成，即将开始渲染。在此时也可以对数据进行更改，不会触发 `updated`。
- mounted：在挂载完成后发生，在当前阶段，`真实的 Dom` 挂载完毕，数据完成双向绑定，可以访问到 `Dom` 节点，使用 `$refs` 属性对 Dom 进行操作。
  如果需要发送异步请求，可以在钩子函数 `created、beforeMount、mounted` 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。  
  **_推荐在 created 钩子函数中调用异步请求_**，有以下优点：

  - 能更快获取到服务端数据，减少页面 loading 时间；
  - ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

- beforeUpdate：发生在更新之前，也就是响应式数据发生更新，`虚拟 dom` 重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染。
- updated：发生在更新完成之后，当前阶段组件 `Dom` 已完成更新。要**注意**的是避免在此期间更改数据，因为这可能会导致无限循环的更新。
- beforeDestroy：发生在实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器。
- destroyed：发生在实例销毁之后，这个时候只剩下了 dom 空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。
  ![](/images/vue3/vue3-2.png)

## 什么是自定义指令？有哪些生命周期？

是 vue 对 HTML 元素的扩展，给 HTML 元素增加自定义功能。vue 编译 DOM 时，会找到指令对象，执行指令的相关方法。

自定义指令有五个生命周期

- bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- update：被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
- componentUpdated：被绑定元素所在模板完成一次更新周期时调用。
- unbind：只调用一次，指令与元素解绑时调用。

## Vue 初始化时都做了什么？

第一部分

- ⭐ 每个 vue 实例都有一个 \_uid，并且是依次递增的，确保唯一性。
- ⭐ vue 实例不应该是一个响应式的，做个标记。

第二部分

- ⭐ 如果是子组件,将组件配置对象上的一些深层次属性放到 vm.$options 选项中，以提高代码的执行效率。
- ⭐ 如果是根组件，对 options 进行合并，vue 会将相关的属性和方法都统一放到 vm.$options 中。vm.$options 的属性来自两个方面，一个是 Vue 的构造函数 vm.constructor 预先定义的，一个是 new Vue 时传入的入参对象。

第三部分

- ⭐ initProxy / vm.\_renderProxy 在非生产环境下执行了 initProxy 函数,参数是实例;在生产环境下设置了实例的 \_renderProxy 属性为实例自身。
- ⭐ 设置了实例的 \_self 属性为实例自身。
- ⭐ initLifecycle 初始化组件实例关系属性 , 比如 $parent、$children、$root、$refs 等 （不是组件生命周期 mounted , created...）
- ⭐ initEvents 初始化自定义事件。
- ⭐ initRender 初始化插槽 , 获取 this.slots , 定义 this.\_c , 也就是 createElement 方法 , 平时使用的 h 函数。
- ⭐ callHook 执行 beforeCreate 生命周期函数。
- ⭐ initInjections 初始化 inject 选项
- ⭐ initState 响应式原理的核心 , 处理 props、methods、computed、data、watch 等。
- ⭐ initProvide 解析组件配置项上的 provide 对象，将其挂载到 vm.\_provided 属性上。
- ⭐ callHook 执行 created 生命周期函数。

第四部分

- ⭐ 如果有 el 属性，则调用 vm.$mount 方法挂载 vm ，挂载的目标就是把模板渲染成最终的 DOM。
- ⭐ 不存在 el 的时候不挂载 , 需要手动挂载。

## 数据响应式的原理

Vue.js 是采用 **_数据劫持 结合 发布者-订阅者模式_** 的方式，通过 `Object.defineProperty()` `proxy` 来劫持各个属性的 `setter`，`getter`，在数据变动时发布消息给订阅者，触发相应的监听回调。主要分为以下几个步骤：

1. 使用 `observe` 对需要响应式的数据进行**递归**，将对像的所有属性及其子属性，都加上 setter 和 getter 这样的话，给这个对象的某个属性赋值的时候，就会触发 setter，那么就能监听到了数据变化。
2. `compile` 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图。
3. Watcher 订阅者是 `Observer` 和 `Compile` 之间通信的桥梁，主要做的事情是:

- 在自身实例化时往`属性订阅器(dep)`里面添加自己
- 自身必须有一个 `update()` 方法
- 待属性变动触发 `dep.notice()` 通知时，能调用自身的 update() 方法，并触发 Compile 中绑定的回调，完成视图更新。

总结：通过 `Observer` 来监听自己的 model 数据变化，通过 `Compile` 来解析编译模板指令，最终利用 `Watcher` 搭起 `Observer` 和 `Compile` 之间的通信桥梁，达到一个 **数据响应式** 的效果。

![数据响应式](/images/vue/vue1.png)

## v-if、v-show、v-html 的原理

- v-if 会调用 addIfCondition 方法，生成 vnode 的时候会忽略对应节点，render 的时候就不会渲染；
- v-show 会生成 vnode，render 的时候也会渲染成真实节点，只是在 render 过程中会在节点的属性中修改 show 属性值，也就是常说的 display；
- v-html 会先移除节点下的所有节点，设置 innerHTML 为 v-html 的值。

## 说一下什么是 Virtual DOM

Virtual DOM 是 DOM 节点在 JavaScript 中的一种抽象数据结构，之所以需要虚拟 DOM，是因为浏览器中操作 DOM 的代价比较昂贵，频繁操作 DOM 会产生性能问题。虚拟 DOM 的作用是在每一次响应式数据发生变化引起页面重渲染时，Vue 对比更新前后的虚拟 DOM，匹配找出尽可能少的需要更新的真实 DOM，从而达到提升性能的目的。

## Vue data 中某一个属性的值发生改变后，视图会立即同步执行重新渲染吗？

- Vue 是异步执行 DOM 更新。
- 只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。
- 如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。
- 然后，在下一个的事件循环 tick 中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部尝试对异步队列使用原生的 Promise.then 和 MessageChannel，如果执行环境不支持，会采用 setTimeout(fn, 0) 代替。

例如，当你设置 vm.someData = 'new value' ，该组件不会立即重新渲染。

- 当刷新队列时，组件会在事件循环队列清空时的下一个 tick 更新。
- 多数情况我们不需要关心这个过程，但是如果你想在 DOM 状态更新后做点什么，这就可能会有些棘手。
- 虽然 Vue.js 通常鼓励开发人员沿着 “数据驱动” 的方式思考，避免直接接触 DOM，但是有时我们确实要这么做。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。

## 虚拟 dom 和真实 dom 的区别

- 虚拟 DOM 不会进行排版与重绘操作
- 虚拟 DOM 就是把真实 DOM 转换为 Javascript 代码
- 虚拟 DOM 进行频繁修改，然后一次性比较并修改真实 DOM 中需要改的部分，最后并在真实 DOM 中进行排版与重绘，减少过多 DOM 节点排版与重绘损耗

虚拟 DOM 的实现原理主要包括以下 3 部分：

- 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
- diff 算法 — 比较两棵虚拟 DOM 树的差异；
- pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

## 路由的 hash 和 history 模式的区别

（1）hash 模式的实现原理

早期的前端路由的实现就是基于 location.hash 来实现的。其实现原理很简单，location.hash 的值就是 URL 中 # 后面的内容。比如下面这个网站，它的 location.hash 的值为 #search：`https://www.word.com#search`

hash 路由模式的实现主要是基于下面几个特性：

- URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
- hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制 hash 的切换；
- 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用 JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；
- 我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。

（2）history 模式的实现原理

HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：

```js
window.history.pushState(null, null, path)
window.history.replaceState(null, null, path)
```

history 路由模式的实现主要基于存在下面几个特性：

- pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
- 我们可以使用 popstate 事件来监听 url 的变化，从而对页面进行跳转（渲染）；
- history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。

## Vuex 页面刷新数据丢失怎么解决

1. 在 created 周期中读取 sessionstorage 中的数据存储在 store 中，此时用 vuex.store 的 replaceState 方法，替换 store 的根状态
2. 在 beforeunload 方法中将 store.state 存储到 sessionstorage 中。

```js
export default {
  name: "App",
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      )
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  },
}
```

[参考文献](https://xie.infoq.cn/article/10652fd79635f1e4fc6e45673)
