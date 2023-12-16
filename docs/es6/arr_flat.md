## 数组扁平化 (几种方案)

数组扁平化是指将一个多维数组变为一个一维数组

- flat()

flat(depth)
depth 可选 // 指定要提取嵌套数组的结构深度，默认值为 1。

```js
const res1 = arr.flat(Infinity);
```

- 利用正则

```js
let res = JSON.stringify(arr).replace(/\[|\]/g, "").split(","); // 但数据类型都会变为字符串
let res = JSON.parse("[" + JSON.stringify(arr).replace(/\[|\]/g) + "]");
```

- 使用 reduce

```js
const flatten = (arr) => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
};
let res = flatten(arr);
```

- 函数递归

```js
let saveRes = [];
const fn = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      fn(arr[i]);
    } else {
      saveRes.push(arr[i]);
    }
  }
};
let res = fn(arr);
```

## 数组去重的方法（6 种）

`let arr = [1,1,'true','true',true,true,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];`

- **利用 Set**

```js
let res = Array.from(new Set(arr)); // [...new Set(arr)]
// 不考虑兼容性，这种去重的方法代码最少。这种方法还无法去掉 {} 空对象
```

- **两层 for 循环+`splice`**

```js
// 外层循环元素，内层循环时比较值。值相同时，则删去这个值
const unique = (arr) => {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        len--;
        j--;
      }
    }
  }
  return arr;
};
```

- **利用 `indexof` 也可以用 `include`、`filter`**

```js
// 新建一个空的结果数组，for 循环原数组，判断结果数组是否存在当前元素，如果有相同的值则跳过，不相同则 push 进数组
const unique = (arr) => {
  if (!Array.isArray(arr)) return;
  let saveRes = [];
  for (let i = 0; i < arr.length; i++) {
    if (saveRes.indexof(arr[i]) === -1) {
      saveRes.push(arr[i]);
    }
  }
  return saveRes;
};
const unique = (arr) => {
  let saveRes = [];
  for (let i = 0; i < arr.length; i++) {
    if (!saveRes.indlude(arr[i])) {
      saveRes.push(arr[i]);
    }
  }
  return saveRes;
};
const unique = (arr) => arr.filter((val, ind) => arr.indexof(val) === index);
const unique = (arr) => {
  let obj = {};
  return arr.filter((item, index, arr) =>
    obj.hasOwnProperty(typeof item + item)
      ? false
      : (obj[typeof item + item] = true)
  );
};
```

- 利用 sort

```js
const unique = (arr) => {
  if (!Array.isArray(arr)) return;
  arr = arr.sort();
  let saveRes = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i + 1]) {
      saveRes.push(arr[i]);
    }
  }
  return saveRes;
};
```

- **利用 Map**

```js
const unique = (arr) => {
  let map = new Map();
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], true);
      res.push(arr[i]);
    }
  }
  return res;
};
```

- **利用 reduce+includes**

```js
const unique = (arr) =>
  arr.reduce((prev, cur) => (prev.includes(cur) ? prev : [...prev, cur]), []);
```

## 类数组转化为数组

类数组是具有 length 属性，但不具有数组原型上的方法。常见的类数组有 arguments、DOM 操作方法返回的结果。

- Array.from

```js
Array.from(document.querySelectorAll("div"));
```

- Array.prototype.slice.call()

```js
Array.prototype.slice.call(document.querySelectorAll("div"));
```

- 扩展运算符

```js
[...document.querySelectorAll("div")];
```

- 利用 concat

```js
Array.prototype.concat.apply([], document.querySelectorAll("div"));
```

## Array.prototype.filter()

```js
Array.prototype.filter = function (callback, thisArg) {
  if (this == undefined) {
    throw new TypeError("this is null or not undefined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + "is not a function");
  }
  const res = [];
  // 让O成为回调函数的对象传递（强制转换对象）
  const O = Object(this);
  // >>>0 保证len为number，且为正整数
  const len = O.length >>> 0;
  for (let i = 0; i < len; i++) {
    // 检查i是否在O的属性（会检查原型链）
    if (i in O) {
      // 回调函数调用传参
      if (callback.call(thisArg, O[i], i, O)) {
        res.push(O[i]);
      }
    }
  }
  return res;
};
```

## Array.prototype.map()

```js
Array.prototype.map = function (callback, thisArg) {
  if (this == undefined) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const res = [];
  // 同理
  const O = Object(this);
  const len = O.length >>> 0;
  for (let i = 0; i < len; i++) {
    if (i in O) {
      // 调用回调函数并传入新数组
      res[i] = callback.call(thisArg, O[i], i, this);
    }
  }
  return res;
};
```

## Array.prototype.forEach()

forEach 跟 map 类似，唯一不同的是 forEach 是没有返回值的。

```js
Array.prototype.forEach = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  let k = 0;
  while (k < len) {
    if (k in O) {
      callback.call(thisArg, O[k], k, O);
    }
    k++;
  }
};
```

## Array.prototype.reduce()

```js
Array.prototype.reduce = function (callback, initialValue) {
  if (this == undefined) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callbackfn + " is not a function");
  }
  const O = Object(this);
  const len = this.length >>> 0;
  let accumulator = initialValue;
  let k = 0;
  // 如果第二个参数为undefined的情况下
  // 则数组的第一个有效值作为累加器的初始值
  if (accumulator === undefined) {
    while (k < len && !(k in O)) {
      k++;
    }
    // 如果超出数组界限还没有找到累加器的初始值，则TypeError
    if (k >= len) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = O[k++];
  }
  while (k < len) {
    if (k in O) {
      accumulator = callback.call(undefined, accumulator, O[k], k, O);
    }
    k++;
  }
  return accumulator;
};
```
