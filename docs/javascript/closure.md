# 说说你对闭包的理解？闭包使用场景

`<img src="/images/javascript/closure1.png" alt="闭包" height="230" />`

## 一、什么是闭包

**闭包（Closure）** 是指一个函数包含了对其外部作用域中变量的引用，即使在该函数外部作用域执行完毕后仍然可以访问这些变量。闭包允许你在一个函数内部访问另一个函数的变量，这在许多编程语言中是一种强大的特性。

一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）

也就是说，**闭包让你可以在一个内层函数中访问到其外层函数的作用域**

1. **保护私有变量**：闭包允许你创建一个包含私有数据的函数，这些数据对外部是不可见的。这在模块化编程中非常有用，可以防止外部代码直接访问和修改内部状态。

```js
function counter() {
  let count = 0; // count 是一个被 counter 创建的局部变量
  return function () {
    // 内部函数，一个闭包
    count++; // 使用了父函数中声明的变量
    console.log(count);
  };
}
const increment = counter();
increment(); // 输出 1
increment(); // 输出 2
```

2. **实现数据封装**：闭包可以用于创建类似于面向对象编程中的对象实例。你可以**定义一个包含内部状态和方法的函数**，然后通过闭包来访问和操作这些数据。这种方式被称为 "模块模式"：

```ts
function createPerson(name) {
  let age = 0; // age 是一个被 createPerson 创建的局部变量
  return {
    getName: function () {
      return name;
    },
    getAge: function () {
      //getAge() 是内部函数，一个闭包
      return age; // 使用了父函数中声明的变量
    },
    setAge: function (newAge) {
      if (newAge >= 0) {
        age = newAge;
      }
    },
  };
}
const person = createPerson("Alice");
console.log(person.getName()); // 输出 "Alice"
console.log(person.getAge()); // 输出 0
person.setAge(30);
console.log(person.getAge()); // 输出 30
// `getAge()` 没有自己的局部变量。然而，由于闭包的特性，它可以访问到外部函数的变量
```

3. **实现回调函数**：闭包经常用于创建回调函数，将函数作为参数传递给其他函数。这些回调函数可以访问外部函数的局部变量，以便在异步操作完成后执行特定的逻辑。

```tsx
function fetchData(url, callback) {
  // 模拟异步请求
  setTimeout(function () {
    const data = "Some data from " + url;
    callback(data);
  }, 1000);
}
fetchData("https://example.com/api", function (response) {
  console.log("Received data: " + response);
});
```

4. **实现函数工厂**：闭包可以用于创建定制的函数，这些函数可以生成特定的行为或配置。这在某些库和框架中很常见。

```ts
function createMultiplier(factor) {
  return function (x) {
    return x * factor;
  };
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5)); // 2*5 输出 10
console.log(triple(5)); // 3*5 输出 15
```

总之，闭包是一种强大的编程工具，它可以用于许多不同的应用场景，包括**数据封装**、**模块化编程**、**回调函数**等。它使得 JavaScript 等语言更加灵活和功能强大。

## 二、使用场景

任何闭包的使用场景都离不开这两点：

- 创建私有变量
- 延长变量的生命周期

> 一般函数的词法环境在函数返回后就被销毁，但是闭包会保存对创建时所在词法环境的引用，即便创建时所在的执行上下文被销毁，但创建时所在词法环境依然存在，以达到延长变量的生命周期的目的

下面举个例子：

在页面上添加一些可以调整字号的按钮

```js{2-4,7}
function makeSizer(size) {
  return function () {
    document.body.style.fontSize = size + "px";
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

document.getElementById("size-12").onclick = size12;
document.getElementById("size-14").onclick = size14;
document.getElementById("size-16").onclick = size16;
```

### 柯里化函数

柯里化的目的在于避免频繁调用具有相同参数函数的同时，又能够轻松的重用

```js{12-14,17,19}
// 假设我们有一个求长方形面积的函数
function getArea(width, height) {
  return width * height;
}
// 如果我们碰到的长方形的宽老是10
const area1 = getArea(10, 20);
const area2 = getArea(10, 30);
const area3 = getArea(10, 40);

// 我们可以使用闭包柯里化这个计算面积的函数
function getArea(width) {
  return (height) => {
    return width * height;
  };
}

const getTenWidthArea = getArea(10);
// 之后碰到宽度为10的长方形就可以这样计算面积
const area1 = getTenWidthArea(20);

// 而且如果遇到宽度偶尔变化也可以轻松复用
const getTwentyWidthArea = getArea(20);
```

### 使用闭包模拟私有方法

在`JavaScript`中，没有支持声明私有变量，但我们可以使用闭包来模拟私有方法

下面举个例子：

```js
const Counter = (function () {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function () {
      changeBy(1);
    },
    decrement: function () {
      changeBy(-1);
    },
    value: function () {
      return privateCounter;
    },
  };
})();
console.log(Counter.value());

const makeCounter = function () {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function () {
      changeBy(1);
    },
    decrement: function () {
      changeBy(-1);
    },
    value: function () {
      return privateCounter;
    },
  };
};
const Counter1 = makeCounter();
const Counter2 = makeCounter();
console.log(Counter1.value()); /* logs 0 */
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); /* logs 2 */
Counter1.decrement();
console.log(Counter1.value()); /* logs 1 */
console.log(Counter2.value()); /* logs 0 */
```

上述通过使用闭包来定义公共函数，并令其可以访问私有函数和变量，这种方式也叫**模块方式**

注意两个计数器 `Counter1` 和 `Counter2` 是如何维护它们各自的独立性的。每个闭包都是引用各自的词法作用域内的变量 `privateCounter` 。
每次调用其中一个计数器时，通过改变这个变量的值，会改变这个闭包的词法环境。然而在这个闭包内对变量的修改，不会影响到另外一个的变量。

### 其他

例如计数器、延迟调用、回调等闭包的应用，其核心思想还是创建私有变量和延长变量的生命周期

## 三、注意事项

如果不是某些特定任务需要使用闭包，在其它函数中创建函数是不明智的，因为闭包在处理速度和内存消耗方面对脚本性能具有负面影响

例如，在创建新的对象或者类时，方法通常应该**关联于对象的原型**，而不是定义到对象的构造器中。

原因在于每个对象的创建，方法都会被重新赋值

```js
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
  this.getName = function () {
    return this.name;
  };

  this.getMessage = function () {
    return this.message;
  };
}
```

上面的代码中，我们并没有利用到闭包的好处，因此可以避免使用闭包。修改成如下：

```js
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}
MyObject.prototype.getName = function () {
  return this.name;
};
MyObject.prototype.getMessage = function () {
  return this.message;
};
```
