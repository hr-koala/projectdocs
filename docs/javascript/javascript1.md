---
---

## 实现一个 new 操作符

new 操作符做了这些事：

- 它创建了一个全新的对象。
- 它会被执行[[Prototype]]（也就是**proto**）链接。
- 它使 this 指向新创建的对象。。
- 通过 new 创建的每个对象将最终被[[Prototype]]链接到这个函数的 prototype 对象上。
- 如果函数没有返回对象类型 Object(包含 Functoin, Array, Date, RegExg, Error)，那么 new 表达式中的函数调用将返回该对象引用。

```js
function New(func){
    let res={}
    if(func.prototype!==null){
        res.prototype=func.__proto__
    }
    let ret=func.apply(res,Array.prototype.slice.call(arguments,1))
    if((typeof ret==='object'||typeof ret==='function')&&ret!===null){
        return ret
    }
    return res
}
let obj = New(A, 1, 2);
// equals to
let obj = new A(1, 2);
console.log(obj)
```

## 实现一个 JSON.stringify

JSON.stringify(value[, replacer [, space]])：

- Boolean | Number| String 类型会自动转换成对应的原始值。
- undefined、任意函数以及 symbol，会被忽略（出现在非数组对象的属性值中时），或者被转换成 null（出现在数组中时）。
- 不可枚举的属性会被忽略
- 如果一个对象的属性值通过某种间接的方式指回该对象本身，即循环引用，属性也会被忽略。

```js
function jsonStringify(obj) {
  let type = typeof obj;
  if (type !== "object") {
    if (/string|undefined|function/.test(type)) {
      obj = '"' + obj + '"';
    }
    return String(obj);
  } else {
    let json = [];
    let arr = Array.isArray(obj);
    for (let k in obj) {
      let v = obj[k];
      let type = typeof v;
      if (/string|undefined|function/.test(type)) {
        v = '"' + v + '"';
      } else if (type === "object") {
        v = jsonStringify(v);
      }
      json.push((arr ? "" : '"' + k + '":') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
  }
}
jsonStringify({ x: 5 }); // "{"x":5}"
jsonStringify([1, "false", false]); // "[1,"false",false]"
jsonStringify({ b: undefined }); // "{"b":"undefined"}"
```

## 实现一个 JSON.parse

JSON.parse(text[, reviver])

- 用来解析 JSON 字符串，构造由字符串描述的 JavaScript 值或对象。提供可选的 reviver 函数用以在返回之前对所得到的对象执行变换(操作)。

```js
//第一种：直接调用 eval
function jsonParse(opt) {
  return eval("(" + opt + ")");
}
jsonParse(jsonStringify({ x: 5 }));
// Object { x: 5}
jsonParse(jsonStringify([1, "false", false]));
// [1, "false", falsr]
jsonParse(jsonStringify({ b: undefined }));
// Object { b: "undefined"}
```

避免在不必要的情况下使用 eval，eval() 是一个危险的函数， 他执行的代码拥有着执行者的权利。如果你用 eval()运行的字符串代码被恶意方（不怀好意的人）操控修改，您最终可能会在您的网页/扩展程序的权限下，在用户计算机上运行恶意代码。

它会执行 JS 代码，有 XSS 漏洞。
如果你只想记这个方法，就得对参数 json 做校验。

```js
let rx_one = /^[\],:{}\s]*$/;
var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
var rx_three =
  /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
if (
  rx_one.test(
    json.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, "")
  )
) {
  var obj = eval("(" + json + ")");
}
```

```js
// 第二种：Function
// 来源 神奇的eval()与new Function()
// 核心：Function与eval有相同的字符串参数特性。
// let func = new Function(arg1, arg2, ..., functionBody);
// 在转换JSON的实际应用中，只需要这么做。
var jsonStr = '{ "age": 20, "name": "jack" }';
var json = new Function("return " + jsonStr)();
// eval 与 Function 都有着动态编译js代码的作用，但是在实际的编程中并不推荐使用。
```

## 实现一个 call 或 apply

- call 语法：  
  fun.call(thisArg, arg1, arg2, ...)，调用一个函数, 其具有一个指定的 this 值和分别地提供的参数(参数的列表)。

- apply 语法：  
  func.apply(thisArg, [argsArray])，调用一个函数，以及作为一个数组（或类似数组对象）提供的参数。

Function.call 按套路实现
call 核心：

- 将函数设为对象的属性
- 执行&删除这个函数
- 指定 this 到函数并传入给定参数执行函数
- 如果不传入参数，默认指向为 window

```js
Function.prototype.myCall = function (content = window) {
  content.fn = this;
  let args = [...arguments].slice(1);
  let result = content.fn(...args);
  delete content.fn;
  return result;
};
let foo = {
  value: 1,
};
function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}
bar.call2(foo, "black", "18"); // black 18 1
```

### Function.apply 的模拟实现

apply()的实现和 call()类似，只是参数形式不同。代码：

```js
Function.prototype.apply2 = function (context = window) {
  context.fn = this;
  let result;
  // 判断是否有第二个参数
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
```

### 实现一个 Function.bind()

bind()方法:
`会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。`

```js
Function.prototype.bind2 = function (content) {
  if (typeof this != "function") {
    throw Error("not a function");
  }
  // 若没问参数类型则从这开始写
  let fn = this;
  let args = [...arguments].slice(1);

  let resFn = function () {
    return fn.apply(
      this instanceof resFn ? this : content,
      args.concat(...arguments)
    );
  };
  function tmp() {}
  tmp.prototype = this.prototype;
  resFn.prototype = new tmp();

  return resFn;
};
```

## 实现一个继承

### 寄生组合式继承

核心实现是：用一个 F 空的构造函数去取代执行了 Parent 这个构造函数。

```js
function Parent(name) {
  this.name = name;
}
Parent.prototype.sayName = function () {
  console.log("parent name:", this.name);
};
function Child(name, parentName) {
  Parent.call(this, parentName);
  this.name = name;
}
function create(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}
Child.prototype = create(Parent.prototype);
Child.prototype.sayName = function () {
  console.log("child name:", this.name);
};
Child.prototype.constructor = Child;

var parent = new Parent("father");
parent.sayName(); // parent name: father

var child = new Child("son", "father");
```
