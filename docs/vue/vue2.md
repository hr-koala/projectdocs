## 1. “new Vue()做了什么？”

new 关键字代表实例化一个对象, 而 Vue 实际上是一个类, 源码位置是/src/core/instance/index.js。

```js
function Vue(options) {
  if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword");
  }
  this._init(options);
}
```

接着我们跳转追踪至 this.\_init()，即 Vue.prototype.\_init,位于 src\core\instance\init.js
在\_init()方法的内部有一系列 init\* 的方法

```js
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // ...忽略，从第45行看起
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
    // ...忽略
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```

- initProxy，作用域代理，拦截组件内访问其它组件的数据。
- initLifecycle, 建立父子组件关系，在当前实例上添加一些属性和生命周期标识。如：$children、$refs、\_isMounted 等。
- initEvents，用来存放除@hook:生命周期钩子名称="绑定的函数"事件的对象。如：$on、$emit 等。
- initRender，用于初始化$slots、$attrs、$listeners
- initInjections，初始化 inject，一般用于更深层次的组件通信，相当于加强版的 props。用于组件库开发较多。
  `只要在上一层级的声明的provide，那么下一层级无论多深都能够通过inject来访问到provide的数据。这么做也是有明显的缺点：在任意层级都能访问，导致数据追踪比较困难，不知道是哪一个层级声明了这个或者不知道哪一层级或若干个层级使用。`
- initState，是很多选项初始化的汇总，包括：props、methods、data、computed 和 watch 等。
- initProvide，初始化 provide。
- vm.$mount，挂载实例。

## 2. “什么阶段才能访问 DOM？”

可以从 beforeCreate 以及 created 的调用时机谈起，我们根据上面的概述，来简化下代码:

```js
callHook(vm, "beforeCreate");
// 初始化 inject
// 初始化 props、methods、data、computed 和 watch
// 初始化 provide
callHook(vm, "created");
// 挂载实例 vm.$mount(vm.$options.el)
```

- beforeCreate 以及 created 调用时，哪些数据能用与否？
- 什么阶段才能访问 DOM？
- 为什么 created 之后才挂载实例？

## “Vue-router 路由模式有几种？”

三种 "hash" | "history" | "abstract"，一般人只知道两种"hash" | "history"。
这里贴出源码：

```js
switch (mode) {
  case "history":
    this.history = new HTML5History(this, options.base);
    break;
  case "hash":
    this.history = new HashHistory(this, options.base, this.fallback);
    break;
  case "abstract":
    this.history = new AbstractHistory(this, options.base);
    break;
  default:
    if (process.env.NODE_ENV !== "production") {
      assert(false, `invalid mode: ${mode}`);
    }
}
```

#### mode

类型: string
默认值: "hash" (浏览器环境) | "abstract" (Node.js 环境)
可选值: "hash" | "history" | "abstract"
配置路由模式:

- hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。
- history: 依赖 HTML5 History API 和服务器配置。查看 HTML5 History 模式。
- abstract: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.

##

#### inBrowser: 检测当前宿主环境是否是浏览器

```js
// 通过判断 `window` 对象是否存在即可
export const inBrowser = typeof window !== "undefined";
```

#### hasProto:检查当前环境是否可以使用对象的 **proto** 属性

```js
// 一个对象的 __proto__ 属性指向了其构造函数的原型
// 从一个空的对象字面量开始沿着原型链逐级检查。
export const hasProto = "__proto__" in {};
```

#### 获取当浏览器的 user Agent

```js
// toLowerCase目的是 为了后续的各种环境检测
export const UA = inBrowser && window.navigator.userAgent.toLowerCase();
```

#### IE 浏览器判断

```js
export const isIE = UA && /msie|trident/.test(UA)
解析：使用正则去匹配 UA 中是否包含'msie'或者'trident'这两个字符串即可判断是否为 IE 浏览器
```

### IE9| Edge | Chrome 判断

```js
export const isIE9 = UA && UA.indexOf("msie 9.0") > 0;
export const isEdge = UA && UA.indexOf("edge/") > 0;
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
```

#### isReserved：检测字符串是否以 $ 或者 \_ 开头

```js
// charCodeAt() 方法可返回指定位置的字符的 Unicode 编码
export function isReserved(str: string): boolean {
  const c = (str + "").charCodeAt(0);
  return c === 0x24 || c === 0x5f;
}
```

解析： 获得该字符串第一个字符的 unicode，然后与 0x24 和 0x5F 作比较。

#### Javascript 中级算法之 charCodeAt

从传递进来的字母序列中找到缺失的字母并返回它。
如：fearNotLetter("abce") 应该返回 "d"。

```js
function fearNotLetter(str) {
  //将字符串转为ASCII码，并存入数组
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    arr.push(str.charCodeAt(i));
  }
  for (let j = 1; j < arr.length; j++) {
    let num = arr[j] - arr[j - 1];
    //判断后一项减前一项是否为1，若不为1，则缺失该字符的前一项
    if (num != 1) {
      //将缺失字符ASCII转为字符并返回
      return String.fromCharCode(arr[j] - 1);
    }
  }
  return undefined;
}
fearNotLetter("abce"); // "d"
```

#### camelize: 连字符转驼峰

```js
const camelizeRE = /-(\w)/g;
export const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
});
```

解析： 定义正则表达式：/-(\w)/g，用来全局匹配字符串中 中横线及连字符后的一个字符。若捕获到，则将字符以 toUpperCase 大写替换，否则以''替换。
如：camelize('aa-bb') // aaBb
