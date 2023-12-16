## 防抖 (debounce)

触发高频时间后 n 秒内函数只会执行一次,如果 n 秒内高频时间再次触发,则重新计算时间。  
防抖常应用于用户进行搜索输入节约请求资源，window 触发 resize 事件时进行防抖只触发一次。

```js
function debounce(func, delay) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
      timer = null;
    }, delay);
  };
}
```

## 节流 (throttle)

高频时间触发,但 n 秒内只会执行一次,所以节流会稀释函数的执行频率。  
节流常应用于鼠标不断点击触发、监听滚动事件。

```js
function throttle(func, delay) {
  let pre = 0;
  return function () {
    let context = this;
    let args = arguments;
    let now = Date.now();
    if (now - pre > delay) {
      func.apply(context, args);
      pre = now;
    }
  };
}
```

## 随机打乱数组

```js
function rd(arr) {
  let ind, temp;
  for (let point = arr.length - 1; point >= 0; point--) {
    ind = Math.floor(Math.random() * point);
    temp = arr[ind];
    arr[ind] = arr[point];
    arr[point] = temp;
  }
  return arr;
}
console.log(rd([1, 3, 5, "poi", 2, 4, 6, 7, 9, 8]));
```

## 函数珂里化

指的是将一个接受多个参数的函数 变为 接受一个参数返回一个函数的固定形式，这样便于再次调用，例如 f(1)(2)  
经典面试题：实现 add(1)(2)(3)(4)=10; 、 add(1)(1,2,3)(2)=9;

```js
const add = () => {
  let _args = [...arguments];
  function fn() {
    _args.push(...arguments);
    return fn;
  }
  fn.toString = function () {
    return _args.reduce((sum, cur) => sum + cur);
  };
  return fn;
};
```

## 模拟 new 操作

3 个步骤：

- 以 ctor.prototype 为原型创建一个对象。
- 执行构造函数并将 this 绑定到新创建的对象上。
- 判断构造函数执行返回的结果是否是引用数据类型，若是则返回构造函数执行的结果，否则返回创建的对象。

```js
function newOperator(ctor, ...args) {
  if (typeof ctor !== "function") {
    throw new TypeError("Type Error");
  }
  const obj = Object.create(ctor.prototype);
  const res = ctor.apply(obj, args);

  const isObject = typeof res === "object" && res !== null;
  const isFunction = typeof res === "function";
  return isObject || isFunction ? res : obj;
}
```

## instanceof

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

```js
const myInstanceof = (left, right) => {
  // 基本数据类型都返回false
  if (typeof left !== "object" || left === null) return false;
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
};
```

## 原型继承

寄生组合继承

```js
function Parent() {
  this.name = "parent";
}
function Child() {
  Parent.call(this);
  this.type = "children";
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
```

## Object.is

Object.is 解决的主要是这两个问题：

```js
+0 === -0; // true
NaN === NaN; // false
```

```js
const is = (x, y) => {
  if (x === y) {
    // +0和-0应该不相等
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
};
```

## Object.assign

Object.assign()方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象（请注意这个操作是浅拷贝）

```js
Object.defineProperty(Object, "assign", {
  value: function (target, ...args) {
    if (target == null) {
      return new TypeError("Cannot convert undefined or null to object");
    }

    // 目标对象需要统一是引用数据类型，若不是会自动转换
    const to = Object(target);

    for (let i = 0; i < args.length; i++) {
      // 每一个源对象
      const nextSource = args[i];
      if (nextSource !== null) {
        // 使用for...in和hasOwnProperty双重判断，确保只拿到本身的属性、方法（不包含继承的）
        for (const nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  },
  // 不可枚举
  enumerable: false,
  writable: true,
  configurable: true,
});
```

## 深拷贝

`深拷贝`是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象。

- 1. **_JSON.parse(JSON.stringify( obj ))_**

```tsx
let a = {
  name: "Jack",
  age: 18,
  hobbit: ["sing", { type: "sports", value: "run" }],
  score: { math: "A" },
  run: function () {},
  walk: undefined,
  fly: NaN,
  cy: null,
  date: new Date(),
};
let b = JSON.parse(JSON.stringify(a));
```

取不到值为 `undefined` 的 key；如果对象里有函数，**函数无法被拷贝**下来；无法拷贝 copyObj **对象原型链上的属性和方法**；对象转变为 `date` 字符串。

- 2. **递归函数实现深拷贝**

递归的完整版本（考虑到了 Symbol 属性）：

```js
const cloneDeep = (target, hash = new WeakMap()) => {
  // 对于传入参数处理
  if (typeof target !== "object" || target === null) {
    return target;
  }
  // 哈希表中存在直接返回
  if (hash.has(target)) return hash.get(target);

  const cloneTarget = Array.isArray(target) ? [] : {};
  hash.set(target, cloneTarget);

  // 针对Symbol属性
  const symKeys = Object.getOwnPropertySymbols(target);
  if (symKeys.length) {
    symKeys.forEach((symKey) => {
      if (typeof target[symKey] === "object" && target[symKey] !== null) {
        cloneTarget[symKey] = cloneDeep(target[symKey]);
      } else {
        cloneTarget[symKey] = target[symKey];
      }
    });
  }

  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      cloneTarget[key] =
        typeof target[key] === "object" && target[key] !== null
          ? cloneDeep(target[key], hash)
          : target[key];
    }
  }
  return cloneTarget;
};
```

```tsx
//兼容多种数据类型
const cloneDeep = (target, cache) => {
  if (!cache) {
    cache = new Map();
  }
  if (target instanceof Object) {
    // 不考虑跨 iframe
    if (cache.get(target)) {
      return cache.get(target);
    }
    let result;
    if (target instanceof Function) {
      if (target.prototype) {
        // 有 prototype 就是普通函数
        result = function () {
          return target.apply(this, arguments);
        };
      } else {
        result = (...args) => {
          return target.call(undefined, ...args);
        };
      }
    } else if (target instanceof Array) {
      result = [];
    } else if (target instanceof Date) {
      result = new Date(target - 0);
    } else if (target instanceof RegExp) {
      result = new RegExp(target.source, target.flags);
    } else {
      result = {};
    }
    cache.set(target, result);
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        result[key] = deepClone(source[key], cache);
      }
    }
    return result;
  } else {
    return target;
  }
};
```

## Promise.all

Promise.all 是支持链式调用的，本质上就是返回了一个 Promise 实例，通过 resolve 和 reject 来改变实例状态。

```js
Promise.myAll = (promiseArr) => {
  let len = promsieArr.length;
  let values = new Array(len);
  let count = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; i++) {
      Promise.resolve(promsieArr[i]).then(
        (res) => {
          values[i] = res;
          count++;
          if (count === len) resolve(values);
        },
        (err) => reject(err)
      );
    }
  });
};
```

## Promise.race

```js
Promise.myRace = (promiseArr) => {
  return new Promise((resolve, reject) => {
    promiseArr.forEach((p) => {
      // 如果不是Promise实例需要转化为Promise实例
      Promise.resolve(p).then(
        (val) => resolve(val),
        (err) => reject(err)
      );
    });
  });
};
```

## Promise 并行限制

就是实现有并行限制的 Promise 调度器问题。

```js
class Scheduler {
  constructor() {
    this.queue = [];
    this.maxCount = 2;
    this.runCounts = 0;
  }
  add(promiseCreator) {
    this.queue.push(promiseCreator);
  }
  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }
  request() {
    if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
      return;
    }
    this.runCounts++;

    this.queue
      .shift()()
      .then(() => {
        this.runCounts--;
        this.request();
      });
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart();
// 2
// 3
// 1
// 4
```

## JSONP

script 标签不遵循同源协议，可以用来进行跨域请求，优点就是兼容性好但仅限于 GET 请求

```js
const jsonp = ({ url, params, callbackName }) => {
  const generateUrl = () => {
    let dataSrc = "";
    for (let key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        dataSrc += `${key}=${params[key]}&`;
      }
    }
    dataSrc += `callback=${callbackName}`;
    return `${url}?${dataSrc}`;
  };
  return new Promise((resolve, reject) => {
    const scriptEle = document.createElement("script");
    scriptEle.src = generateUrl();
    document.body.appendChild(scriptEle);
    window[callbackName] = (data) => {
      resolve(data);
      document.removeChild(scriptEle);
    };
  });
};
```

## AJAX

```js
const getJSON = function (url) {
  return new Promise((resolve, reject) => {
    const xhr = XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Mscrosoft.XMLHttp");
    xhr.open("GET", url, false);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    };
    xhr.send();
  });
};
```

## event 模块

实现 node 中回调函数的机制，node 中回调函数其实是内部使用了观察者模式。

`观察者模式：定义了对象间一种一对多的依赖关系，当目标对象Subject发生改变时，所有依赖它的对象Observer都会得到通知。`

```js
function EventEmitter() {
  this.events = new Map();
}

// 需要实现的一些方法：
// addListener、removeListener、once、removeAllListeners、emit

// 模拟实现addlistener方法
const wrapCallback = (fn, once = false) => ({ callback: fn, once });
EventEmitter.prototype.addListener = function (type, fn, once = false) {
  const hanlder = this.events.get(type);
  if (!hanlder) {
    // 没有type绑定事件
    this.events.set(type, wrapCallback(fn, once));
  } else if (hanlder && typeof hanlder.callback === "function") {
    // 目前type事件只有一个回调
    this.events.set(type, [hanlder, wrapCallback(fn, once)]);
  } else {
    // 目前type事件数>=2
    hanlder.push(wrapCallback(fn, once));
  }
};
// 模拟实现removeListener
EventEmitter.prototype.removeListener = function (type, listener) {
  const hanlder = this.events.get(type);
  if (!hanlder) return;
  if (!Array.isArray(this.events)) {
    if (hanlder.callback === listener.callback) this.events.delete(type);
    else return;
  }
  for (let i = 0; i < hanlder.length; i++) {
    const item = hanlder[i];
    if (item.callback === listener.callback) {
      hanlder.splice(i, 1);
      i--;
      if (hanlder.length === 1) {
        this.events.set(type, hanlder[0]);
      }
    }
  }
};
// 模拟实现once方法
EventEmitter.prototype.once = function (type, listener) {
  this.addListener(type, listener, true);
};
// 模拟实现emit方法
EventEmitter.prototype.emit = function (type, ...args) {
  const hanlder = this.events.get(type);
  if (!hanlder) return;
  if (Array.isArray(hanlder)) {
    hanlder.forEach((item) => {
      item.callback.apply(this, args);
      if (item.once) {
        this.removeListener(type, item);
      }
    });
  } else {
    hanlder.callback.apply(this, args);
    if (hanlder.once) {
      this.events.delete(type);
    }
  }
  return true;
};
EventEmitter.prototype.removeAllListeners = function (type) {
  const hanlder = this.events.get(type);
  if (!hanlder) return;
  this.events.delete(type);
};
```

## 图片懒加载

可以给 img 标签统一自定义属性 data-src='default.png'，当检测到图片出现在窗口之后再补充 src 属性，此时才会进行图片资源加载。

```js
function lazyload() {
  const imgs = document.getElementsByTagName("img");
  const len = imgs.length;
  // 视口的高度
  const viewHeight = document.documentElement.clientHeight;
  // 滚动条高度
  const scrollHeight =
    document.documentElement.scrollTop || document.body.scrollTop;
  for (let i = 0; i < len; i++) {
    const offsetHeight = imgs[i].offsetTop;
    if (offsetHeight < viewHeight + scrollHeight) {
      const src = imgs[i].dataset.src;
      imgs[i].src = src;
    }
  }
}
// 可以使用节流优化一下
window.addEventListener("scroll", lazyload);
```

## 滚动加载

原理就是监听页面滚动事件，分析 clientHeight、scrollTop、scrollHeight 三者的属性关系。

```js
window.addEventListener(
  "scroll",
  function () {
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    if (clientHeight + scrollTop >= scrollHeight) {
      // 检测到滚动至页面底部，进行后续操作
      // ...
    }
  },
  false
);
```

## 渲染几万条数据不卡住页面

渲染大数据时，合理使用 createDocumentFragment 和 requestAnimationFrame，将操作切分为一小段一小段执行。

```js
const fn = () => {
  let timer = setTimeout(() => {
    // 插入十万条数据
    const total = 100000;
    // 一次插入的数据
    const once = 20;
    // 插入数据需要的次数
    const loopCount = Math.ceil(total / once);
    let countOfRender = 0;
    const ul = document.querySelector("ul");
    // 添加数据的方法
    function add() {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < once; i++) {
        const li = document.createElement("li");
        li.innerText = Math.floor(Math.random() * total);
        fragment.appendChild(li);
      }
      ul.appendChild(fragment);
      countOfRender += 1;
      loop();
    }
    function loop() {
      if (countOfRender < loopCount) {
        window.requestAnimationFrame(add);
      }
    }
    loop();
  }, 0);
};
```

## 打印出当前网页使用了多少种 HTML 元素

一行代码可以解决：

```js
const fn = () => {
  return [
    ...new Set([...document.querySelectorAll("*")].map((el) => el.tagName)),
  ].length;
};
```

值得注意的是：DOM 操作返回的是类数组，需要转换为数组之后才可以调用数组的方法。

## 将 VirtualDom 转化为真实 DOM 结构

这是当前 SPA 应用的核心概念之一

```js
// vnode结构：
// {
//   tag,
//   attrs,
//   children,
// }

//Virtual DOM => DOM
function render(vnode, container) {
  container.appendChild(_render(vnode));
}
function _render(vnode) {
  // 如果是数字类型转化为字符串
  if (typeof vnode === "number") {
    vnode = String(vnode);
  }
  // 字符串类型直接就是文本节点
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  // 普通DOM
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    // 遍历属性
    Object.keys(vnode.attrs).forEach((key) => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    });
  }
  // 子数组进行递归操作
  vnode.children.forEach((child) => render(child, dom));
  return dom;
}
```

## 字符串解析问题

```js
var a = {
  b: 123,
  c: "456",
  e: "789",
};
var str = `a{a.b}aa{a.c}aa {a.d}aaaa`;
// => 'a123aa456aa {a.d}aaaa'
```

实现函数使得将 str 字符串中的{}内的变量替换，如果属性不存在保持原样（比如{a.d}）
类似于模版字符串，但有一点出入，实际上原理大差不差

```js
const fn1 = (str, obj) => {
  let res = "";
  // 标志位，标志前面是否有{
  let flag = false;
  let start;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "{") {
      flag = true;
      start = i + 1;
      continue;
    }
    if (!flag) res += str[i];
    else {
      if (str[i] === "}") {
        flag = false;
        res += match(str.slice(start, i), obj);
      }
    }
  }
  return res;
};
// 对象匹配操作
const match = (str, obj) => {
  const keys = str.split(".").slice(1);
  let index = 0;
  let o = obj;
  while (index < keys.length) {
    const key = keys[index];
    if (!o[key]) {
      return `{${str}}`;
    } else {
      o = o[key];
    }
    index++;
  }
  return o;
};
```
