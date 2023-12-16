## Function.prototype.bind 的用途是什么？

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```js
Function.prototype.bind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Type Error");
  }
  let self = this; // 保存this的值
  return function F() {
    // 考虑new的情况
    if (this instanceof F) {
      return new self(...args, ...arguments);
    }
    return self.apply(context, [...args, ...arguments]);
  };
};
```

## Function.prototype.apply()

第一个参数是绑定的 this，默认为 window，第二个参数是数组或类数组

```js
Function.prototype.apply = function (context = window, args) {
  if (typeof this !== "function") {
    throw new TypeError("Type Error");
  }
  const fn = Symbol("fn");
  context[fn] = this;

  const res = context[fn](...args);
  delete context[fn];
  return res;
};
```

## Function.prototype.call

于 apply 唯一不同的是，call()方法接受的是一个参数列表

```js
Function.prototype.call = function (context = window, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Type Error");
  }
  const fn = Symbol("fn");
  context[fn] = this;

  const res = context[fn](...args);
  delete context[fn];
  return res;
};
```
