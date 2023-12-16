---
title: javascript-questions
---

### 下面代码的输出是什么?

```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person("Lydia", "Hallie");
Person.getFullName = () => this.firstName + this.lastName;

console.log(member.getFullName());
```

您不能像使用常规对象那样向构造函数添加属性。 如果要一次向所有对象添加功能，则必须使用原型。 所以在这种情况下应该这样写：

```js
Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};
```

这样会使 member.getFullName()是可用的，为什么样做是对的？ 假设我们将此方法添加到构造函数本身。 也许不是每个 Person 实例都需要这种方法。这会浪费大量内存空间，因为它们仍然具有该属性，这占用了每个实例的内存空间。 相反，如果我们只将它添加到原型中，我们只需将它放在内存中的一个位置，但它们都可以访问它！

#### 下面代码的输出是什么?

```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person("Lydia", "Hallie");
const sarah = Person("Sarah", "Smith");

console.log(lydia);
console.log(sarah);
//Person {firstName: "Lydia", lastName: "Hallie"} and undefined
```

对于 sarah，我们没有使用 new 关键字。 使用 new 时，它指的是我们创建的新空对象。 但是，如果你不添加 new 它指的是全局对象！
我们指定了 this.firstName 等于'Sarah 和 this.lastName 等于 Smith。 我们实际做的是定义 global.firstName ='Sarah'和 global.lastName ='Smith。 sarah 本身的返回值是 undefined。

#### 所有对象都有原型.

A: 对
B: 错误
答案: B  
除基础对象外，所有对象都有原型。 基础对象可以访问某些方法和属性，例如.toString。 这就是您可以使用内置 JavaScript 方法的原因！ 所有这些方法都可以在原型上找到。 虽然 JavaScript 无法直接在您的对象上找到它，但它会沿着原型链向下寻找并在那里找到它，这使您可以访问它。
译者注：基础对象指原型链终点的对象。基础对象的原型是 null。

#### 下面代码的输出是什么?

```js
function getAge(...args) {
  console.log(typeof args);
}
getAge(21); //  "object"

// 扩展运算符（... args）返回一个带参数的数组。 数组是一个对象，因此typeof args返回object。
```

#### 下面代码的输出是什么?

```js
const obj = { 1: "a", 2: "b", 3: "c" };
const set = new Set([1, 2, 3, 4, 5]);

obj.hasOwnProperty("1");
obj.hasOwnProperty(1);
set.has("1");
set.has(1);
// true true false true
```

所有对象键（不包括 Symbols）都会被存储为字符串，即使你没有给定字符串类型的键。 这就是为什么 obj.hasOwnProperty（'1'）也返回 true。
上面的说法不适用于 Set。 在我们的 Set 中没有“1”：set.has（'1'）返回 false。 它有数字类型 1，set.has（1）返回 true。

#### 下面代码的输出是什么?

```js
const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]); // 456
```

对象键自动转换为字符串。我们试图将一个对象设置为对象 a 的键，其值为 123。
但是，当对象自动转换为字符串化时，它变成了[Object object]。 所以我们在这里说的是 a["Object object"] = 123。 然后，我们可以尝试再次做同样的事情。 c 对象同样会发生隐式类型转换。那么，a["Object object"] = 456。
然后，我们打印 a[b]，它实际上是 a["Object object"]。 我们将其设置为 456，因此返回 456。

#### 下面代码的输出是什么?

```js
const person = { name: "Lydia" };
function sayHi(age) {
  console.log(`${this.name} is ${age}`);
}

sayHi.call(person, 21);
sayHi.bind(person, 21);
// Lydia is 21 function
// 使用两者，我们可以传递我们想要this关键字引用的对象。 但是，.call方法会立即执行！
// .bind方法会返回函数的拷贝值，但带有绑定的上下文！ 它不会立即执行。
```

#### 下面这些值哪些是假值?

```js
0;
new Number(0);
("");
(" ");
new Boolean(false);
undefined;
// 0, '', undefined
```

JavaScript 中只有 6 个假值：
**_undefined_**  
**_null_**  
**_NaN_**  
**_0_**  
**_'' (empty string)_**  
**_false_**

函数构造函数，如 new Number 和 new Boolean 都是真值。

#### 下面代码的输出是什么?

```js
(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();
// 1 undefined 2

// catch块接收参数x。当我们传递参数时，这与变量的x不同。这个变量x是属于catch作用域的。
// 之后，我们将这个块级作用域的变量设置为1，并设置变量y的值。 现在，我们打印块级作用域的变量x，它等于1。
// 在catch块之外，x仍然是undefined，而y是2。 当我们想在catch块之外的console.log(x)时，它返回undefined，而y返回2。
```

#### setInterval 方法的返回值什么?

```js
setInterval(() => console.log("Hi"), 1000);
// 一个唯一的id

// 它返回一个唯一的id。 此id可用于使用clearInterval()函数清除该定时器。
```

####

```js
function Foo() {
  getName = function () {
    alert(1);
  };
  return this;
}
Foo.getName = function () {
  alert(2);
};
Foo.prototype.getName = function () {
  alert(3);
};
var getName = function () {
  alert(4);
};
function getName() {
  alert(5);
}

//请写出以下输出结果：
Foo.getName(); //2
getName(); //4
Foo().getName(); //1
getName(); //1
new Foo.getName(); //2
new Foo().getName(); //3
new new Foo().getName(); //3
```
