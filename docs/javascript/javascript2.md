---
title: 函数 / 对象
---

### 函数的 3 种定义方法

#### 1.函数声明

```js
//ES5
function getSum(){}
function (){}//匿名函数
//ES6
()=>{}//如果{}内容只有一行{}和return关键字可省,
```

#### 2. 函数表达式(函数字面量)

```js
//ES5
var sum = function () {};
//ES6
let sum = () => {}; //如果{}内容只有一行{}和return关键字可省,
```

#### 3. 构造函数

```js
const sum = new Function("a", "b", "return a + b");
```

三种方法的对比

- 1.函数声明有预解析,而且函数声明的优先级高于变量;
- 2.使用 Function 构造函数定义函数的方式是一个函数表达式,这种方式会导致解析两次代码，影响性能。第一次解析常规的 JavaScript 代码，第二次解析传入构造函数的字符串

### ES5 中函数的 4 种调用

#### 1. 函数调用模式

包括函数名()和匿名函数调用,this 指向 window

```js
function getSum() {
  console.log(this); //这个属于函数名调用，this指向window
}
getSum()(function () {
  console.log(this); //匿名函数调用，this指向window
})();

var getSum = function () {
  console.log(this); //实际上也是函数名调用，window
};
getSum();
```

#### 2. 方法调用

对象.方法名(),this 指向对象

```js
let objList = {
  name: "methods",
  getSum: function () {
    console.log(this); //objList对象
  },
};
objList.getSum();
```

#### 3. 构造器调用

new 构造函数名(),this 指向实例化的对象

```js
function Person() {
  console.log(this); //是构造函数调用，指向实例化的对象personOne
}
var personOne = new Person();
```

#### 4. 间接调用

利用 call 和 apply 来实现,this 就是 call 和 apply 对应的第一个参数,如果不传值或者第一个值为 null,undefined 时 this 指向 window
通过 call/apply 如果第一个参数是 string、number、boolean，call 内部会调用其相应的构造器 String、Numer、Boolean 将其转换为相应的实例对象

```js
function foo() {
  console.log(this);
}
foo.apply("我是apply改变的this值"); //我是apply改变的this值
foo.call("我是call改变的this值"); //我是call改变的this值
```

### ES6 中函数的调用

箭头函数不可以当作构造函数使用，也就是不能用 new 命令实例化一个对象，否则会抛出一个错误
箭头函数的 this 是和定义时有关和调用无关
调用就是函数调用模式

```js
(() => {
  console.log(this); //window
})();

let arrowFun = () => {
  console.log(this); //window
};
arrowFun();

let arrowObj = {
  arrFun: function () {
    (() => {
      console.log(this); //this指向的是arrowObj对象
    })();
  },
};
arrowObj.arrFun();
```

### call,apply 和 bind

- 1.IE5 之前不支持 call 和 apply,bind 是 ES5 出来的;
- 2.call 和 apply 可以调用函数,改变 this,实现继承和借用别的对象的方法;

#### call 和 apply 定义

调用方法,用一个对象替换掉另一个对象(this)
对象.call(新 this 对象,实参 1,实参 2,实参 3.....)
对象.apply(新 this 对象,[实参 1,实参 2,实参 3.....])

#### call 和 apply 用法

1.间接调用函数,改变作用域的 this 值 2.劫持其他对象的方法

```js
var foo = {
  name: "张三",
  logName: function () {
    console.log(this.name);
  },
};
var bar = {
  name: "李四",
};
foo.logName.call(bar); //李四
// 实质是 call 改变了 foo 的 this 指向为 bar,并调用该函数
```

3.两个函数实现继承

```js
function Animal(name) {
  this.name = name;
  this.showName = function () {
    console.log(this.name);
  };
}
function Cat(name) {
  Animal.call(this, name);
}
var cat = new Cat("Black Cat");
cat.showName(); //Black Cat
```

4.为类数组(arguments 和 nodeList)添加数组方法 push,pop

```js
(function () {
  Array.prototype.push.call(arguments, "王五");
  console.log(arguments); //['张三','李四','王五']
})("张三", "李四");
```

5.合并数组

```js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
Array.prototype.push.apply(arr1, arr2); //将arr2合并到了arr1中
```

6.求数组最大值

```js
Math.max.apply(null, arr);
```

7.判断字符类型

```js
Object.prototype.toString.call({});
```

#### bind

bind 是 function 的一个函数扩展方法，
bind 以后代码重新绑定了 func 内部的 this 指向,返回一个函数,不会调用方法,不兼容 IE8

```js
let name = "李四";
let foo = {
  name: "张三",
  logName: function (age) {
    console.log(this.name, age);
  },
};
let fooNew = foo.logName;
let fooNewBind = foo.logName.bind(foo);
fooNew(10); //李四,10
fooNewBind(11); //张三,11  因为bind改变了fooNewBind里面的this指向
```

#### call,apply 和 bind 原生实现

call 实现:

```js
Function.prototype.newCall = function (context, ...parameter) {
  if (typeof context === "object" || typeof context === "function") {
    context = context || window;
  } else {
    context = Object.create(null);
  }
  let fn = Symbol();
  context[fn] = this;
  const res = context[fn](...parameter);
  delete context.fn;
  return res;
};
let person = {
  name: "Abiel",
};
function sayHi(age, sex) {
  console.log(this.name, age, sex);
}
sayHi.newCall(person, 25, "男"); // Abiel 25 男
```

#### apply 实现:

```js
Function.prototype.newApply = function (context, parameter) {
  if (typeof context === "object" || typeof context === "function") {
    context = context || window;
  } else {
    context = Object.create(null);
  }
  let fn = Symbol();
  context[fn] = this;
  const res = context[fn](...parameter);
  delete context[fn];
  return res;
};
let person = {
  name: "Abiel",
};
function sayHi(age, sex) {
  console.log(this.name, age, sex);
}
sayHi.newApply(person, [25, "男"]); //Abiel 25 男
```

call 和 apply 封装对比:其实核心代码是一样的,只不过 call 需要对第二个形参解构

#### bind 实现:

```js
Function.prototype.bind = function (context, ...innerArgs) {
  var me = this;
  return function (...finnalyArgs) {
    return me.call(context, ...innerArgs, ...finnalyArgs);
  };
};
let person = {
  name: "Abiel",
};
function sayHi(age, sex) {
  console.log(this.name, age, sex);
}
let personSayHi = sayHi.bind(person, 25);
personSayHi("男");
```

#### 三者异同

同:都是改变 this 指向,都可接收参数
异:bind 和 call 是接收单个参数,apply 是接收数组

### 函数的节流和防抖

| 类型 | 概念                                      | 应用                                   |
| ---- | ----------------------------------------- | -------------------------------------- |
| 节流 | 事件触发后每隔一段时间触发一次,可触发多次 | scroll,resize 事件一段时间触发多次     |
| 防抖 | 事件触发动作完成后一段时间触发一次        | scroll,resize 事件触发完后一段时间触发 |

#### 节流

```js
const throttle = (func, delay) => {
  let timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, arguments);
        timer = null;
      }, delay);
    }
  };
};
```

#### 防抖

```js
const debounce = (func, delay) => {
  let timer = null;
  return function () {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
      timer = null;
    }, delay);
  };
};
```

### 原型链

#### 定义

对象继承属性的一个链条

#### 构造函数,实例与原型对象的关系

![__proto__](/images/javascript/javascript1.png)

```js
let Person = function (name) {
  this.name = name;
}; //Person是构造函数
var o3personTwo = new Person("personTwo"); //personTwo是实例
```

![new Person](/images/javascript/javascript2.png)
原型对象都有一个默认的 constructor 属性指向构造函数

### 创建实例的方法

- 1.字面量

```js
let obj = { name: "kobe" };
```

- 2.Object 构造函数创建

```js
let obj = new Object();
obj.name = "kobe";
```

- 3.使用工厂模式创建对象

```js
function createPerson(name) {
  let obj = new Object();
  obj.name = name;
  return obj;
}
let person = createPerson("kobe");
```

- 4.使用构造函数创建对象

```js
function Person(name) {
  this.name = name;
}
let obj = new Person("kobe");
```

### new 运算符

1.创了一个新对象;
2.this 指向构造函数;  
3.构造函数有返回,会替换 new 出来的对象,如果没有就是 new 出来的对象  
4.手动封装一个 new 运算符

```js
const new2 = function (func) {
  let obj = Object.create(func.prototype); //创建对象
  let res = func.call(obj); //改变this指向，把结果付给res
  if (res && res instanceof Object) {
    //判断res的类型是不是对象
    return res; //是，返回res
  } else {
    return obj; //不是返回返回构造函数的执行结果
  }
};
```

#### 对象的原型链

![原型链](/images/javascript/javascript3.png)

### 继承的方式

JS 是一门弱类型动态语言,封装和继承是他的两大特性

#### 1. 原型链继承

将父类的实例作为子类的原型

```js
// 定义父类:
// 定义一个动物类
function Animal(name) {
  // 属性
  this.name = name || "Animal";
  // 实例方法
  this.sleep = function () {
    console.log(this.name + "正在睡觉！");
  };
}
// 原型方法
Animal.prototype.eat = function (food) {
  console.log(this.name + "正在吃：" + food);
};

// 子类:
function Cat() {}
Cat.prototype = new Animal();
Cat.prototype.name = "cat";

//　Test Code
var cat = new Cat();
console.log(cat.name); //cat
console.log(cat.eat("fish")); //cat正在吃：fish  undefined
console.log(cat.sleep()); //cat正在睡觉！ undefined
console.log(cat instanceof Animal); //true
console.log(cat instanceof Cat); //true
```

2.优缺点
简单易于实现,但是要想为子类新增属性和方法，必须要在 new Animal()这样的语句之后执行,无法实现多继承

#### 构造继承

实质是利用 call 来改变 Cat 中的 this 指向

```js
// 子类:
function Cat(name) {
  Animal.call(this);
  this.name = name || "Tom";
}
let cat = new Cat("kobe"); // 可以 name,sleep,不可eat();
// cat instanceof Animal false, cat instanceof Cat true
```

2.优缺点
可以实现多继承,不能继承原型属性/方法

#### 实例继承

为父类实例添加新特性，作为子类实例返回

```js
// 子类
function Cat(name) {
  var instance = new Animal();
  instance.name = name || "Tom";
  return instance;
}
let cat = new Cat("kobe"); // 可以 name,sleep(),eat();
// cat instanceof Animal true, cat instanceof Cat false
```

优缺点: 不限制调用方式,但不能实现多继承

#### 拷贝继承

将父类的属性和方法拷贝一份到子类中

```js
//子类:
function Cat(name) {
  let animal = new Animal();
  for (let p in animal) {
    Cat.prototype[p] = animal[p];
  }
  Cat.prototype.name = name || "Tom";
}
let cat = new Cat("kobe"); // 可以 name,sleep(),eat();
// cat instanceof Animal false, cat instanceof Cat true
```

优缺点: 支持多继承,但是效率低占用内存

#### 组合继承

通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用

```js
//子类:
function Cat(name) {
  Animal.call(this);
  this.name = name || "Tom";
}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
let cat = new Cat("kobe"); // 可以 name,sleep(),eat();
// cat instanceof Animal true, cat instanceof Cat true
```

#### 寄生组合继承

```js
function Cat(name) {
  Animal.call(this);
  this.name = name || "Tom";
}
(function () {
  // 创建一个没有实例方法的类
  var Super = function () {};
  Super.prototype = Animal.prototype;
  //将实例作为子类的原型
  Cat.prototype = new Super();
})();
let cat = new Cat("kobe"); // 可以 name,sleep(),eat();
// cat instanceof Animal true, cat instanceof Cat true
```

#### ES6 的 extends 继承

ES6 的继承机制是先创造父类的实例对象 this（所以必须先调用 super 方法），然后再用子类的构造函数修改 this

```js
//父类
class Person {
  //constructor是构造方法
  constructor(skin, language) {
    this.skin = skin;
    this.language = language;
  }
  say() {
    console.log(this.name + " 我是父类");
  }
}
//子类
class Chinese extends Person {
  constructor(skin, language, positon) {
    //console.log(this);//报错
    super(skin, language);
    //super();相当于父类的构造函数
    //console.log(this);调用super后得到了this，不报错，this指向子类，相当于调用了父类.prototype.constructor.call(this)
    this.positon = positon;
  }
  aboutMe() {
    console.log(`${this.skin} ${this.language}  ${this.positon}`);
  }
}
//调用只能通过new的方法得到实例,再调用里面的方法
let obj = new Chinese("红色", "中文", "香港");
obj.aboutMe();
obj.say();
// obj instanceof Person true, obj instanceof Chinese true
```

### 高阶函数

#### 定义

函数的参数是函数或返回函数

#### 常见高阶函数

`reduce filter map sort`

#### 柯里化

定义：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数
`fn(a,b,c,d)=>fn(a)(b)(c)(d)`

```js
const currying = (fn) => {
  const len = fn.length;
  return function curr(...args) {
    if (args.length >= len) {
      return fn(...args);
    }
    return (...args2) => curr(...args, ...args2);
  };
};
```

#### 反柯里化

定义：`obj.func(arg1,arg2)=>func(obj,arg1,arg2)`

```js
Function.prototype.unCurrying = function () {
  let that = this;
  return function () {
    return Function.prototype.call.apply(that, arguments);
  };
};
function say() {
  return "Hello " + this.value + " " + [].slice.call(arguments);
}
let sayunCurrying = say.unCurrying();
console.log(sayunCurrying({ value: "world" }, "a", "b", "c"));
```

#### 偏函数

定义：指定部分参数来返回一个新的定制函数的形式

```js
function fn(a, b, c) {
  return a + b + c;
}
function func(a, b) {
  return fn(a, b, 5);
}
```

## 对象

### 对象的声明方法

#### 字面量

```js
let test = { x: 123, y: 345 };
console.log(test); //{x:123,y:345};
console.log(test.x); //123
console.log(test.__proto__.x); //undefined
console.log(test.__proto__.x === test.x); //false
```

#### 构造函数

```js
let test = new Object({ x: 123, y: 345 });
console.log(test); //{x:123,y:345}
console.log(test.x); //123
console.log(test.__proto__.x); //undefined
console.log(test.__proto__.x === test.x); //false
```

new 的作用: 1.创了一个新对象;
2.this 指向构造函数; 3.构造函数有返回,会替换 new 出来的对象,如果没有就是 new 出来的对象

#### 内置方法

Obejct.create(obj,descriptor),obj 是对象,describe 描述符属性(可选)

```js
let test = Object.create({ x: 123, y: 345 });
console.log(test); //{}
console.log(test.x); //123
console.log(test.__proto__.x); //123 / test.__proto__:{x:123,y:345}
console.log(test.__proto__.x === test.x); //true
```

##### 三种方法的优缺点

1.功能:都能实现对象的声明,并能够赋值和取值  
2.继承性:内置方法创建的对象继承到**proto**属性上  
3.隐藏属性:三种声明方法会默认为内部的每个成员（属性或方法）生成一些隐藏属性，这些隐藏属性是可以读取和可配置的,属性分类见下面  
4.属性读取:Object.getOwnPropertyDescriptor()或 getOwnPropertyDescriptor()  
5.属性设置:Object.definePropertype 或 Object.defineProperties

### 对象的属性

#### 属性分类

1.数据属性 4 个特性:
configurable(可配置),enumerable(可枚举),writable(可修改),value(属性值)  
2.访问器属性 2 个特性:
get(获取),set(设置)  
3.内部属性
由 JavaScript 引擎内部使用的属性;
不能直接访问,但是可以通过对象内置方法间接访问,如:[[Prototype]]可以通过 Object.getPrototypeOf()访问;
内部属性用[[]]包围表示,是一个抽象操作,没有对应字符串类型的属性名,如[[Prototype]].

#### 属性描述符

1.定义:将一个属性的所有特性编码成一个对象返回  
2.描述符的属性有:数据属性和访问器属性  
3.使用范围:
作为方法 Object.defineProperty, Object.getOwnPropertyDescriptor, Object.create 的第二个参数,

#### 属性描述符的默认值

1.访问对象存在的属性
|特性名|默认值|
|---|---|
|value|对应属性值|
|get|对应属性值|
|set|undefined|
|writable|true|
|enumerable|true|
|configurable|true|
所以通过上面三种声明方法已存在的属性都是有这些默认描述符

2.访问对象不存在的属性
|特性名|默认值|
|---|---|
|value|undefined|
|get|undefined|
|set|undefined|
|writable|false|
|enumerable|false|
|configurable|false|

#### 描述符属性的使用规则

get,set 与 wriable,value 是互斥的,如果有交集设置会报错

#### 属性定义

1.定义属性的函数有两个:Object.defineProperty 和 Object.defineProperties.例如:
Object.defineProperty(obj, propName, desc)  
2.在引擎内部,会转换成这样的方法调用:
obj.[[DefineOwnProperty]](propName, desc, true)

#### 属性赋值

1.赋值运算符(=)就是在调用[[Put]].比如:
obj.prop = v;  
2.在引擎内部,会转换成这样的方法调用:
obj.[[Put]]("prop", v, isStrictModeOn)

#### 判断对象的属性

| 名称             | 含义                                                          | 用法                                   |
| ---------------- | ------------------------------------------------------------- | -------------------------------------- |
| in               | 如果指定的属性在指定的对象或其原型链中，则 in 运算符返回 true | 'name' in test //true                  |
| hasOwnProperty() | 只判断自身属性                                                | test.hasOwnProperty('name') //true     |
| .或[]            | 对象或原型链上不存在该属性，则会返回 undefined                | test.name //"lei" test["name"] //"lei" |

### Symbol

概念：是一种数据类型;不能 new,因为 Symbol 是一个原始类型的值，不是对象。

#### 定义方法

Symbol(),可以传参
let s1 = Symbol();
let s2 = Symbol();
s1 === s2 // false

```js
// 有参数的情况
let s1 = Symbol("foo");
let s2 = Symbol("foo");
s1 === s2; // false
```

#### 用法

1.不能与其他类型的值进行运算; 2.作为属性名

```js
let mySymbol = Symbol();
// 第一种写法
var a = {};
a[mySymbol] = "Hello!";
// 第二种写法
var a = {
  [mySymbol]: "Hello!",
};
// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: "Hello!" });

// 以上写法都得到同样结果
a[mySymbol]; // "Hello!"
```

3.作为对象属性名时，不能用点运算符,可以用[]

```js
let a = {};
let name = Symbol();
a.name = "lili";
a[name] = "lucy";
console.log(a.name, a[name]); // { name: 'lili', [Symbol()]: 'lucy' }
```

4.遍历不会被 for...in、for...of 和 Object.keys()、Object.getOwnPropertyNames()取到该属性

#### Symbol.for

1.定义:在全局中搜索有没有以该参数作为名称的 Symbol 值，如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值

```js
let s1 = Symbol.for("foo");
let s2 = Symbol.for("foo");
s1 === s2; // true
```

#### Symbol.keyFor

1.定义:返回一个已登记的 Symbol 类型值的 key

```js
let s1 = Symbol.for("foo");
Symbol.keyFor(s1); // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2); // undefined
```

### 遍历

#### 一级对象遍历方法

| 方法                                                                                     | 特性                                                                          |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| for ... in                                                                               | 遍历对象自身的和继承的可枚举属性(不含 Symbol 属性)                            |
| Object.keys(obj)                                                                         | 返回一个数组,包括对象自身的(不含继承的)所有可枚举属性(不含 Symbol 属性)       |
| Object.getOwnPropertyNames(obj)                                                          | 返回一个数组,包括对象自身的所有可枚举和不可枚举属性(不含 Symbol 属性)         |
| Object.getOwnPropertySymbols(obj)                                                        | 返回一个数组,包含对象自身的所有 Symbol 属性                                   |
| Reflect.ownKeys(obj)                                                                     | 返回一个数组,包含对象自身的所有(不枚举、可枚举和 Symbol)属性                  |
| Reflect.enumerate(obj)                                                                   | 返回一个 Iterator 对象,遍历对象自身的和继承的所有可枚举属性(不含 Symbol 属性) |
| 总结:1.只有 Object.getOwnPropertySymbols(obj)和 Reflect.ownKeys(obj)可以拿到 Symbol 属性 |
| 2.只有 Reflect.ownKeys(obj)可以拿到不可枚举属性                                          |

### 深度拷贝

#### Object.assign

定义:将源对象（source）的所有可枚举属性，复制到目标对象（target）

```js
// 合并多个对象
let target = { a: 1, b: 1 };
let source1 = { b: 2, c: 2 };
let source2 = { c: 3 };
let source = Object.assign(target, source1, source2);
```

注意: 这个是伪深度拷贝,只能拷贝第一层

#### JSON.stringify

原理:是将对象转化为字符串,而字符串是简单数据类型

#### 递归拷贝

```js
function deepClone(source) {
  const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
  for (let keys in source) {
    // 遍历目标
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === "object") {
        // 如果值是对象，就递归一下
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else {
        // 如果不是，就直接赋值
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}
```

### 数据拦截

定义：利用对象内置方法，设置属性，进而改变对象的属性值

#### Object.defineProperty

1.ES5 出来的方法; 2.三个参数:对象(必填),属性值(必填),描述符(可选); 3.defineProterty 的描述符属性

```js
数据属性: value, writable, configurable, enumerable;
访问器属性: get, set;
注: 不能同时设置value和writable, 这两对属性是互斥的;
```

4.拦截对象的两种情况:

```js
let obj = { name: "", skin: "", language: "" };
let defaultName = ["这是默认值1", "这是默认值2", "这是默认值3"];
Object.keys(obj).forEach((key) => {
  Object.defineProperty(obj, key, {
    get() {
      return defaultName;
    },
    set(value) {
      defaultName = value;
    },
  });
});

console.log(obj.name);
console.log(obj.age);
console.log(obj.sex);
obj.name = "这是改变值1";
console.log(obj.name);
console.log(obj.age);
console.log(obj.sex);

let objOne = {};
let defaultNameOne = "这是默认值2";
Object.defineProperty(objOne, "name", {
  get() {
    return defaultNameOne;
  },
  set(value) {
    defaultNameOne = value;
  },
});
console.log(objOne.name);
objOne.name = "这是改变值2";
console.log(objOne.name);
```

5.拦截数组变化的情况

```js
let a = {};
bValue = 1;
Object.defineProperty(a, "b", {
  set: function (value) {
    bValue = value;
    console.log("setted");
  },
  get: function () {
    return bValue;
  },
});
a.b; //1
a.b = []; //setted
a.b = [1, 2, 3]; //setted
a.b[1] = 10; //无输出
a.b.push(4); //无输出
a.b.length = 5; //无输出
a.b; //[1,10,3,4,undefined];
```

结论:defineProperty 无法检测数组索引赋值,改变数组长度的变化; 但是通过数组方法来操作可以检测到

##### 多级嵌套对象监听

```js
let info = {};
function observe(obj) {
  if (!obj || typeof obj !== "object") {
    return;
  }
  for (var i in obj) {
    definePro(obj, i, obj[i]);
  }
}

function definePro(obj, key, value) {
  observe(value);
  Object.defineProperty(obj, key, {
    get: function () {
      return value;
    },
    set: function (newval) {
      console.log("检测变化", newval);
      value = newval;
    },
  });
}
definePro(info, "friends", { name: "张三" });
info.friends.name = "李四";
```

6.存在的问题

- 1.不能监听数组索引赋值和改变长度的变化
- 2.必须深层遍历嵌套的对象,因为 defineProterty 只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历，如果属性值也是对象那么需要深度遍历,显然能劫持一个完整的对象是更好的选择

#### proxy

1.ES6 出来的方法,实质是对对象做了一个拦截,并提供了 13 个处理方法 2.两个参数:对象和行为函数

```js
let handler = {
  get(target, key, receiver) {
    console.log("get", key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set", key, value);
    return Reflect.set(target, key, value, receiver);
  },
};
let proxy = new Proxy(obj, handler);
proxy.name = "kobe";
proxy.age = 24;
```

涉及到多级对象或者多级数组

```js
//这是proxy的handler
let handler = {
  get(target, property) {
    console.log("get:" + property);
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    console.log("set:" + property + "=" + value);
    return Reflect.set(target, property, value);
  },
};
//传递两个参数，一个是object, 一个是proxy的handler
//如果是不是嵌套的object，直接加上proxy返回，如果是嵌套的object，那么进入addSubProxy进行递归。
function toDeepProxy(object, handler) {
  if (!isPureObject(object)) addSubProxy(object, handler);
  return new Proxy(object, handler);
  //这是一个递归函数，目的是遍历object的所有属性，如果不是pure object,那么就继续遍历object的属性的属性，如果是pure object那么就加上proxy
  function addSubProxy(object, handler) {
    for (let prop in object) {
      if (typeof object[prop] == "object") {
        if (!isPureObject(object[prop])) addSubProxy(object[prop], handler);
        object[prop] = new Proxy(object[prop], handler);
      }
    }
    object = new Proxy(object, handler);
  }

  //是不是一个pure object,意思就是object里面没有再嵌套object了
  function isPureObject(object) {
    if (typeof object !== "object") {
      return false;
    } else {
      for (let prop in object) {
        if (typeof object[prop] == "object") {
          return false;
        }
      }
    }
    return true;
  }
}
let object = {
  name: {
    first: {
      four: 5,
      second: {
        third: "ssss",
      },
    },
  },
  class: 5,
  arr: [1, 2, { arr1: 10 }],
  age: {
    age1: 10,
  },
};
//这是一个嵌套了对象和数组的数组
let objectArr = [{ name: { first: "ss" }, arr1: [1, 2] }, 2, 3, 4, 5, 6];

//变成监听对象
object = toDeepProxy(object, handler);
objectArr = toDeepProxy(objectArr, handler);

//进行一系列操作
console.time("pro");
objectArr.length;
objectArr[3];
objectArr[2] = 10;
objectArr[0].name.first = "ss";
objectArr[0].arr1[0];
object.name.first.second.third = "yyyyy";
object.class = 6;
object.name.first.four;
object.arr[2].arr1;
object.age.age1 = 20;
console.timeEnd("pro");
```

###### 3.问题和优点

reflect 对象没有构造函数
可以监听数组索引赋值,改变数组长度的变化,
是直接监听对象的变化,不用深层遍历

##### defineProterty 和 proxy 的对比

- 1.defineProterty 是 es5 的标准,proxy 是 es6 的标准;
- 2.proxy 可以监听到数组索引赋值,改变数组长度的变化;
- 3.proxy 是监听对象,不用深层遍历,defineProterty 是监听属性;
- 4.利用 defineProterty 实现双向数据绑定(vue2.x 采用的核心)
- 4.利用 proxy 实现双向数据绑定(vue3.x 会采用)

## HTTP

### 什么是 HTTP?

HTTP 是一个连接客户端，网关和服务器的一个协议。

### 特点

- 支持客户/服务器模式：可以连接客户端和服务端；
- 简单快速：请求只需传送请求方法，路径和请求主体；
- 灵活：传输数据类型灵活；
- 无连接：请求结束立即断开；
- 无状态：无法记住上一次请求。

### 怎么解决无状态和无连接

无状态：HTTP 协议本身无法解决这个状态，只有通过 cookie 和 session 将状态做贮存，常见的场景是登录状态保持；  
无连接：可以通过自身属性 Keep-Alive。

### 请求过程

HTTP(S) 请求地址 → DNS 解析 → 三次握手 → 发送请求 → 四次挥手

三次握手过程  
![三次握手过程](/images/javascript/javascript4.png)

四次挥手过  
![四次挥手过](/images/javascript/javascript5.png)

### HTTP 0.9~3.0 对比

#### HTTP 0.9

只允许客户端发送 GET 这一种请求；  
且不支持请求头，协议只支持纯文本；  
无状态性，每个访问独立处理，完成断开；  
无状态码。

#### HTTP 1.0

有身份认证，三次握手；
请求与响应支持头域；
请求头内容；
|属性名|含义|
|--|--|--|
|Accept |可接受的 MIME 类型|
|Accept-Encoding| 数据可解码的格式|
|Accept-Language| 可接受语言|
|Connection| 值 keep-alive 是长连接|
|Host| 主机和端口|
|Pragma| 是否缓存,指定 no-cache 返回刷新|
|Referer| 页面路由|
|If-Modified-Since| 值为时间|
响应头内容；
|属性名| 含义|
|-|-|-|
|Connection| 值 keep-alive 是长连接|
|Content-Type| 返回文档类型,常见的值有 text/plain,text/html,text/json|
|Date| 消息发送的时间|
|Server| 服务器名字|
|Last-Modified| 值为时间,s 返回的最后修改时间|
|Expires| 缓存过期时间,b 和 s 时间做对比|
注意
expires 是响应头内容，返回一个固定的时间,缺陷是时间到了服务器要重新设置;
请求头中如果有 If-Modified-Since，服务器会将时间与 last-modified 对比，相同返回 304;
响应对象以一个响应状态行开始;
响应对象不只限于超文本;
支持 GET、HEAD、POST 方法;
有状态码;
支持长连接（但默认还是使用短连接）、缓存机制以及身份认证。

#### HTTP 1.1

请求头增加 Cache-Control
|属性名| 含义|
|-|-|-|
|Cache-Control| 在 1.1 引入的方法,指定请求和响应遵循的缓存机制,值有:public(b 和 s 都缓存),private(b 缓存),no-cache(不缓存),no-store(不缓存),max-age(缓存时间,s 为单位),min-fresh(最小更新时间),max-age=3600|
|If-None-Match | 上次请求响应头返回的 etag 值响应头增加 Cache-Control，表示所有的缓存机制是否可以缓存及哪种类型 etag 返回的哈希值,第二次请求头携带去和服务器值对比|
注意
Cache-Control 的 max-age 返回是缓存的相对时间
Cache-Control 优先级比 expires 高
缺点：不能第一时间拿到最新修改文件

#### HTTP 2.0

采用二进制格式传输;
多路复用，其实就是将请求数据分成帧乱序发送到 TCP 中。TCP 只能有一个 steam，所以还是会阻塞;
报头压缩;
服务器推送主动向 B 端发送静态资源，避免往返延迟。

#### HTTP 3.0

1.是基于 QUIC 协议，基于 UDP 2.特点:
自定义连接机制：TCP 以 IP/端口标识,变化重新连接握手，UDP 是一 64 位 ID 标识，是无连接；
自定义重传机制：TCP 使用序号和应答传输，QUIC 是使用递增序号传输； 无阻塞的多路复用：同一条 QUIC 可以创建多个 steam。

#### HTTPS

1.https 是在 http 协议的基础上加了个 SSL；  
2.主要包括 ：握手(凭证交换和验证)和记录协议(数据进行加密)。

#### 缓存

1.按协议分：协议层缓存和非 http 协议缓存：

- 1.1 协议层缓存：利用 http 协议头属性值设置；
- 1.2 非协议层缓存：利用 meta 标签的 http-equiv 属性值 Expires,set-cookie。  
  2.按缓存分：强缓存和协商缓存：
- 2.1 强缓存：利用 cache-control 和 expires 设置，直接返回一个过期时间，所以在缓存期间不请求，If-modify-since；
- 2.2 协商缓存：响应头返回 etag 或 last-modified 的哈希值，第二次请求头 If-none-match 或 IF-modify-since 携带上次哈希值，一致则返回 304。  
  3.协商缓存对比： etag 优先级高于 last-modified；  
  4.etag 精度高，last-modified 精度是 s，1s 内 etag 修改多少次都会被记录； last-modified 性能好，etag 要得到 hash 值。  
  5.浏览器读取缓存流程：
  会先判断强缓存；再判断协商缓存 etag(last-modified)是否存在；
  存在利用属性 If-None-match(If-Modified-since)携带值；
  请求服务器,服务器对比 etag(last-modified)，生效返回 304。
  F5 刷新会忽略强缓存不会忽略协商缓存，ctrl+f5 都失效

#### 状态码

| 序列            | 详情                                                                                                              |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| 1XX(通知)       |                                                                                                                   |
| 2XX(成功)       | 200(成功)、201(服务器创建)、202(服务器接收未处理)、203(非授权信息)、204(未返回内容)、205(重置内容)、206(部分内容) |
| 3XX(重定向)     | 301(永久移动)、302(临时移动)、303(查看其他位置)、304(未修改)、305(使用代理)、307(临时重定向)                      |
| 4XX(客户端错误) | 400(错误请求)、401(未授权)、403(禁止)、404(未找到)、405(方法禁用)、406(不接受)、407（需要代理授权）               |
| 5XX(服务器错误) | 500(服务器异常)、501（尚未实施）、502（错误网关）、503（服务不可用）、504（网关超时）、505（HTTP 版本不受支持）   |

#### 浏览器请求分析

![浏览器请求分析](/images/javascript/javascript6.png)

#### 总结

协议
|版本 |内容|
|-|-|-|
|http0.9| 只允许客户端发送 GET 这一种请求;且不支持请求头,协议只支持纯文本;无状态性,每个访问独立处理,完成断开;无状态码
http1.0 解决 0.9 的缺点,增加 If-modify-since(last-modify)和 expires 缓存属性|
|http1.x| 增加 cache-control 和 If-none-match(etag)缓存属性|
|http2.0| 采用二进制格式传输;多路复用;报头压缩;服务器推送|
|http3.0| 采用 QUIC 协议,自定义连接机制;自定义重传机制;无阻塞的多路复用|
缓存
|类型| 特性|
|-|-|-|
|强缓存| 通过 If-modify-since(last-modify)、expires 和 cache-control 设置，属性值是时间，所以在时间内不用请求|
