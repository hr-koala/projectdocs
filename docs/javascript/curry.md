---
title: 什么是柯里化？怎样实现柯里化？
---

## 一、什么是函数柯里化

柯里化（`Currying`）是把接受`多个参数`的函数变换成`接受一个单一参数`(最初函数的第一个参数)的函数，并且返回`接受余下的参数且返回结果`的新函数的技术。  
经典的面试题：实现 `add(1)(2)(3)` 求和

```js
// 第一步：接收三个参数
function add(a, b, c) {
  return a + b + c;
}
// add(1, 2, 3)

// 第二步：接收两个参数
function add(a, b) {
  return function (c) {
    return a + b + c;
  };
}
// add(1,2)(3)

// 第三步：每个函数都接收一个参数
function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
// add(a)(b)(c)
```

es6 更简单

```js
const add1 = (a, b) => a + b;
const add2 = (a) => (b) => a + b;
const add3 = (a) => (b) => (c) => a + b + c;
```

看到这咱们就大致明白前文的解释了，将多个参数函数变为接受一个单一参数的函数。

但是假如面试官让你用一个函数同时支持 add(1,2,3), add(1,2)(3), add(1)(2)(3)怎么办？

先补充个概念，`函数的长度`

```js
function test(a) {}
console.log(test.length); // 1
function test(a, b) {}
console.log(test.length); // 2
```

由此得知 函数的长度 就是 形参的个数

**思路：**
判断当前传入函数的参数个数 (args.length) 是否大于等于原函数所需参数个数 (fn.length) ，如果是，则执行当前函数；如果是小于，则返回一个函数。

```js
const curry = (fn, ...args) => {
    if (args.length >= fn.length) {
        return fn(...args) // 执行当前函数
    } else {
        return (...\_args) => { // 返回一个函数
            return curry(fn, ...args, ...\_args)
        }
    }
}
```

```js
function addCurry() {
    let arr = [...arguments]
    let fn = function () {
        if(arguments.length === 0) {
            return arr.reduce((a, b) => a + b)
        } else {
            arr.push(...arguments) return fn
        }
    }
    return fn
}
let res =  addCurry(1)(2)(3)()
console.log(res) // 6
// 上述写法，又总是要以 ‘( )’ 空括号结尾
```

```js
// 改进为隐式转换 .toString 写法：
function addCurry() {
  let arr = [...arguments];
  // 利用闭包的特性收集所有参数值
  var fn = function () {
    arr.push(...arguments);
    return fn;
  };
  // 利用 toString 隐式转换
  fn.toString = function () {
    return arr.reduce(function (a, b) {
      return a + b;
    });
  };
  return fn;
}
```

### 缓存传参

柯里化最基础的用法是缓存传参。

### 缓存判断

假设有一个 handleOption 函数，当符合条件 'conA'，执行语句：console.log('conA')；不符合时，则执行语句：console.log('others')

```js
const handleOption = (param) => {
  console.log("每次调用 handleOption 都要执行 if...else...");
  if (param === "conA") console.log("conA");
  else console.log("others");
};
handleOption("conA");
handleOption("conA");
handleOption("conA");
// 控制台打印：多次调用 handleOption('A')
```

有没有什么办法，多次调用 handleOption('A')，却只走一次 if...else...？

```js
const handleOption = (param) => {
  console.log("从始至终只用执行一次 if...else...");
  if (param === "conA") console.log("conA");
  else console.log("others");
};
let tmp = handleOption("conA");
tmp();
tmp();
tmp();
```

### 缓存计算

设想这样一个场景，现在有一个函数是来做大数计算的：

```js
const calculateFn = (num) => {
  const startTime = new Date();
  for (let i = 0; i < num; i++) {} // 大数计算
  const endTime = new Date();
  console.log(endTime - startTime);
  return "Calculate big numbers";
};

calculateFn(10_000_000_000);
```

这是一个非常耗时的函数，复制代码在控制台看看，需要 10s+  
如果业务代码中需要多次用到这个大数计算结果，多次调用 calculateFn(10_000_000_000) 肯定是不明智的，太费时。  
一般的做法就是声明一个全局变量，把运算结果保存下来:  
比如 const resNums = calculateFn(10_000_000_000)  
如果有多个大数运算呢？沿着这个思路，即声名多个变量：

```js
const resNumsA = calculateFn(10_000_000_000);
const resNumsB = calculateFn(20_000_000_000);
const resNumsC = calculateFn(30_000_000_000);
```

我们讲就是说：奥卡姆剃刀原则 —— **_如无必要、勿增实体_**。  
申明这么多全局变量，先不谈占内存、占命名空间这事，就把 calculateFn() 函数的参数和声名的常量名一一对应，都是一个麻烦事。

有没有什么办法？只用函数，不增加多个全局常量，就实现多次调用，只计算一次？
**柯里化**。

```js
function cached(fn) {
  const cacheObj = Object.create(null); // 创建一个对象
  return function cachedFn(str) {
    // 返回回调函数
    if (!cacheObj[str]) {
      // 在对象里面查询，函数结果是否被计算过
      let result = fn(str);
      cacheObj[str] = result; // 没有则要执行原函数，并把计算结果缓存起来
    }
    return cacheObj[str]; // 被缓存过，直接返回
  };
}

const calculateFn = (num) => {
  console.log("计算即缓存");
  const startTime = new Date();
  for (let i = 0; i < num; i++) {} // 大数计算
  const endTime = new Date();
  console.log(endTime - startTime); // 耗时
  return "Calculate big numbers";
};

let cashedCalculate = cached(calculateFn);

console.log(cashedCalculate(10_000_000_000)); // 计算即缓存 // 9944 // Calculate big numbers
console.log(cashedCalculate(10_000_000_000)); // Calculate big numbers

console.log(cashedCalculate(20_000_000_000)); // 计算即缓存 // 22126 // Calculate big numbers
console.log(cashedCalculate(20_000_000_000)); // Calculate big numbers
```

这样只用通过一个 cached 缓存函数的处理，所有的大数计算都能保证：**输入参数相同的情况下，全局只用计算一次**，后续可直接使用更加语义话的函数调用来得到之前计算的结果。  
此处也是柯里化的应用，在 cached 函数中先传需要处理的函数参数，后续再传入具体需要操作得值，将多参转化为单个参数逐一传入。

### 缓存函数

柯里化的思想不仅可以缓存判断条件，缓存计算结果、缓存传参，还能缓存“函数”。
设想，我们有一个数字 5 要经过两个函数的计算，先乘以 10 ，再加 100，写法如下：

```js
const multi10 = function (x) {
  return x * 10;
};
const add100 = function (x) {
  return x + 100;
};
add100(multi10(5));
```

用柯里化处理后，即变成：

```js
const multi10 = function (x) {
  return x * 10;
};
const add100 = function (x) {
  return x + 100;
};
const compose = function (f, g) {
  return function (x) {
    return f(g(x));
  };
};
compose(add100, multi10)(5);
```

前者写法有两个传参是写在一起的，而后者则逐一传参。把最后的执行函数改写：

```js
let compute = compose(add100, multi10);
compute(5);
```

所以，这里的柯里化直接把函数处理给缓存了，当声明 compute 变量时，并没有执行操作，只是为了拿到 ()=> f(g(x))，最后执行 compute(5)，才会执行整个运算；

我们对闭包的解释：“**闭包是一个函数内有另外一个函数，内部的函数可以访问外部函数的变量**，这样的语法结构是闭包。”与我们对柯里化的解释“把接受多个参数的函数变换成接受一个单一参数（或部分）的函数，并且返回接受余下的参数和返回结果的新函数的技术”，这两种说法几乎是“等效的”，只是从不同角度对 同一问题 作出的解释

```js
const curry = (fn, args) => {
  let len = fn.length;
  let arr = args || [];
  return function () {
    let newArgs = arr.concat(Array.prototype.slice.call(arguments));
    if (newsArgs.length < length) {
      return curry.call(this, fn, newsArgs);
    } else {
      return fn.apply(this, newArgs);
    }
  };
};
function multiFn(a, b, c) {
  return a + b + c;
}
let multi = curry(multiFn);
multi(2)(3)(4);
multi(2, 3, 4);
multi(2)(3, 4);
multi(2, 3)(4);
```

```js
const curry =
  (fn, arr = []) =>
  (...args) =>
    ((arg) => (arg.length === fn.length ? fn(...arg) : curry(fn, arg)))([
      ...arr,
      ...args,
    ]);
let curryTest = curry((a, b, c, d) => a + b + c + d);
curryTest(1, 2, 3)(4); //返回10
curryTest(1, 2)(4)(3); //返回10
curryTest(1, 2)(3, 4); //返回10
```

## 防抖/节流

再来看看除了其它高阶函数中闭包思想（柯里化思想）的应用。首先是最最常用的防抖与节流函数。
**_防抖_**

```js
function debounce(fn, delay) {
  delay = delay || 200;
  let timer = null;
  return function () {
    let arg = arguments;
    // 每次操作时，清除上次的定时器
    clearTimeout(timer);
    timer = null;
    // 定义新的定时器，一段时间后进行操作
    timer = setTimeout(() => {
      fn.apply(this, arg);
    }, delay);
  };
}
let count = 0;
window.onScroll = debounce((e) => {
  console.log(e.type, ++count);
}, 500);
```

**_节流_**

```js
// 函数节流，频繁操作中间隔 delay 的时间才处理一次
function throttle(fn, delay) {
  delay = delay || 200;
  let timer = null;
  // 每次滚动初始的标识
  let timestamp = 0;
  return function () {
    let arg = arguments;
    let now = Date.now();
    // 设置开始时间
    if (timestamp === 0) timestamp = now;
    clearTimeout(timer);
    timer = null;
    // 已经到了delay的一段时间，进行处理
    if (now - timestamp >= delay) {
      fn.apply(this, arg);
      timestamp = now;
    } else {
      // 添加定时器，确保最后一次的操作也能处理
      timer = setTimeout(() => {
        fn.apply(this, arg);
        // 恢复标识
        timestamp = 0;
      }, delay);
    }
  };
}
```

## lodash 高阶函数

lodash 大家肯定不陌生，它是最流行的 JavaScript 库之一，透过函数式编程模式为开发者提供常用的函数。

其中有一些封装的高阶函数，让一些平平无奇的普通函数也能有相应的高阶功能。  
举几个例子：

```js
// 防抖动
_.debounce(func, [(wait = 0)], [(options = {})]);
// 节流
_.throttle(func, [(wait = 0)], [(options = {})]);

// 将一个断言函数结果取反
_.negate(predicate);
// 柯里化函数
_.curry(func, [(arity = func.length)]);
// 部分应用
_.partial(func, [partials]);

// 返回一个带记忆的函数
_.memoize(func, [resolver]);
// 包装函数
_.wrap(value, [(wrapper = identity)]);
```

再举一个例子：
现在要求一个函数在达到 n 次之前，每次都正常执行，第 n 次不执行。

```js
function before(n, func) {
  let result,
    count = n;
  return function (...args) {
    count = count - 1;
    if (count > 0) result = func.apply(this, args);
    if (count <= 1) func = undefined;
    return result;
  };
}

const fn = before(3, (x) => console.log(x));
fn(1); // 1
fn(2); // 2
fn(3); // 不执行
```

反过来：函数只有到 n 次的时候才执行，n 之前的都不执行。

```js
function after(n, func) {
  let count = n || 0;
  return function (...args) {
    count = count - 1;
    if (count < 1) return func.apply(this, args);
  };
}

const fn = after(3, (x) => console.log(x));
fn(1); // 不执行
fn(2); // 不执行
fn(3); // 3
```

全是“闭包”、全是把参数“柯里化”。
