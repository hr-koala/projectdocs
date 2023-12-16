### preventDefault 方法有什么用?

如果事件是可取消的,则 `preventDefault()`方法会取消事件,这意味着属于该事件的默认操作或行为将不会发生。
**_注意_** 请记住，并非所有的事件都可以取消

```js
document.getElementById("btn").addEventListener("click", function (event) {
  event.preventDefault();
});
```

### stopPropagation 方法有什么用?

`stopPropagation` 方法用于阻止事件在事件链中向上冒泡

### return false 涉及哪些步骤?

事件处理程序中的 `return false` 语句执行以下步骤，

- 1. 首先它停止浏览器的默认操作或行为。
- 2. 它阻止事件传播 DOM。
- 3. 停止回调执行并在调用时立即返回。

### 什么是 BOM (浏览器对象模型)?

**浏览器对象模型(BOM)** 允许 JavaScript 与浏览器"对话"。它由作为窗口子项的对象导航器、历史记录、屏幕、位置和文档组成。浏览器对象模型不是标准化的，可以根据不同的浏览器而变化。

### setTimeout 有什么用？

`setTimeout()` 方法用于在指定的毫秒数后调用函数或计算表达式。
`clearTimeout()` 函数来清除之前由 setTimeout() 函数设置的超时

### setInterval 有什么用？

`setInterval()` 方法用于以指定的时间间隔（以毫秒为单位）调用函数或计算表达式。
`clearInterval()` 函数清除 `setInterval()` 函数设置的间隔。

### 什么是 event delegation（事件委托）？

事件委托是一种侦听事件的技术，您可以委托一个父元素作为其内部发生的所有事件的侦听器。

### JSON 字符串化的目的是什么？如何解析 JSON 字符串？

向 Web 服务器发送数据时，数据必须采用字符串格式。您可以通过使用 `stringify()` 方法将 JSON 对象转换为字符串来实现此目的。

从 Web 服务器接收数据时，数据始终为字符串格式。但是您可以使用 `parse()` 方法将此字符串值转换为 javascript 对象。

### 什么是 JSON？JSON 的语法规则是什么？

JSON（JavaScript Object Notation）是一种用于数据交换的轻量级格式。它基于 JavaScript 语言的一个子集，对象是在 JavaScript 中构建的。

JSON 的语法规则： 1.数据在名称/值对中 2.数据以逗号分隔 3.花括号容纳对象 4.方括号保存数组

### 为什么需要 JSON？

在浏览器和服务器之间交换数据时，数据只能是文本。由于 JSON 仅为文本，因此它可以轻松地与服务器之间发送，并可用作任何编程语言的数据格式。

- 1.其实用 JSON 主要是因为它轻量，各个平台语言都支持 JSON 交互、JSON 解析和存储。
- 2.JSON 常用于我们接口交互，前后端交互中，有解析速度快，方便的特点。
- 3.JSON 常用于我们一些配置文件也是因为解析方便，JSON 存储数据体积小等特征，而不像 XML、PList（也是 xml 的一种）等格式，定义各种 Dom 节点（当然复杂的格式还是建议 XML）。

### location 对象的各种 url 属性是什么？

以下 `Location` 对象属性可用于访问页面的 URL 组件，

1. href - 整个 URL
2. protocol - URL 的协议
3. host - URL 的主机名和端口
4. hostname - URL 的主机名
5. port - URL 中的端口号
6. pathname - URL 的路径名
7. search - URL 的查询部分
8. hash - URL 的锚点部分

### 如何测试一个空对象？

```js{2,4,7-9}
// 1.使用对象条目长度和构造函数类型
Object.entries(obj).length === 0 && obj.constructor === Object;
// 2.使用对象键长度和构造函数类型
Object.keys(obj).length === 0 && obj.constructor === Object;
// 3.将for-in 循环与hasOwnProperty一起使用
function isEmpty(obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return fasle;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
}
```

### 使字符串的第一个字母大写？

```js
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
```

### 什么是 app shell model？

application shell (或者是 app shell)架构是构建渐进式 Web 应用程序的一种方式，该应用程序可以可靠且即时地加载到用户的屏幕上，类似于您在本机应用程序中看到的内容。这对于在没有网络的情况下快速将一些初始 HTML 显示到屏幕上很有用。

### 什么是 polyfill？

polyfill 是一段 JS 代码，用于在本身不支持它的旧浏览器上提供现代功能。例如，Silverlight 插件 polyfill 可用于模拟 Microsoft Internet Explorer 7 上的 HTML Canvas 元素的功能。

### 什么是 tree shaking（摇树）？tree shaking（摇树）需要什么？

tree shaking（摇树）是消除死代码的一种形式。这意味着在构建过程中未使用的模块不会包含在包中，因此它依赖于 ES2015 模块语法的静态结构，（即导入和导出）。最初这已被 ES2015 模块捆绑器推广 rollup。

Tree Shaking 可以显着减少任何应用程序中的代码大小。即，我们通过网络发送的代码越少，应用程序的性能就越高。例如，如果我们只想使用 SPA 框架创建一个“Hello World”应用程序，那么它大约需要几 MB，但是通过 treeShaking，它可以将大小降低到几百 KB。摇树在 Rollup 和 Webpack 打包器中实现。

### 如何检测移动浏览器？

您可以使用正则表达式，它会根据用户是否使用手机浏览来返回 true 或 false 值。

```js
window.mobilecheck = function () {
  var mobileCheck = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      mobileCheck = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return mobileCheck;
};
```

### 用于获取窗口大小的属性是什么？

你可以使用窗口、文档元素和文档正文对象的 innerWidth、innerHeight、clientWidth、clientHeight 属性来查找窗口的大小。

```js
let width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
let height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;
```

### proto 和 prototype 有什么区别?

该**proto**对象是在查找链中用于解析方法等的实际对象。而当你使用 new 创建对象时 prototype，用于构建**proto**的对象是

```js
(new Employee().__proto__ === Employee.prototype(new Employee()).prototype) ===
  undefined;
```

### freeze 和 seal 方法有什么区别？

Object.freeze() 方法冻结对象; 1.它用于冻结对象和数组。 2.它用于使对象不可变。  
Object.seal() 方法密封对象; 1.它用于密封对象和数组。2.它用于使对象不可变。  
Object.isFrozen() 方法用于确定对象是否被冻结  
Object.isSealed() 方法用于确定对象是否已密封

### 什么是 WeakSet?

WeakSet 用于存储弱（弱引用）持有对象的集合。语法如下，
**_new WeakSet([iterable])_**
WeakSet 上可用的方法列表:
1.add(value)：将给定值附加到弱集的新对象  
2.delete(value)：从 WeakSet 集合中删除值。  
3.has(value)：如果 WeakSet 集合中存在该值，则返回 true，否则返回 false。  
4.length()：它返回 weakSetObject 的长度

```js
let ws = new WeakSet();
let user = {};
ws.add(user);
ws.has(user); // true
ws.length(); // 1
ws.delete(user); // 从集合中删除user
ws.has(user); // false, user 已被删除
```

### 什么是 WeakMap？

WeakMap 对象是键/值对的集合，其中的键被弱引用。在这种情况下，键必须是对象，值可以是任意值。语法如下所示，
**_ new WeakMap([iterable]) _**
WeakMap 上可用的方法列表，
1.set(key, value)：设置 WeakMap 对象中键的值。返回 WeakMap 对象。
2.delete(key)：删除与键关联的任何值。
3.has(key)：返回一个布尔值，断言一个值是否与 WeakMap 对象中的键相关联。
4.get(key)：返回与键关联的值，如果没有则返回 undefined

```js
let ws = new WeakMap();
let user = {};
ws.set(user);
ws.has(user); // true
ws.get(user);
ws.delete(user); // 从 map 中删除用户
ws.has(user); // false, user 已被删除
```

### WeakSet 和 Set 有什么区别？WeakMap 和 Map 有什么区别？

主要区别在于 Set 中对象的引用是强引用，而 WeakSet 中对象的引用是弱引用。即，如果没有其他引用 Wea​​kSet 中的对象可以被垃圾回收。
其他区别是:  
1.Sets 可以存储任何值而 WeakSets 只能存储对象的集合
2.WeakSet 没有与 Set 不同的 size 属性
3.WeakSet 没有 clear、keys、values、entries、forEach 等方法。
4.WeakSet 不可迭代。

主要区别在于 Map 中关键对象的引用是强引用，而 WeakMap 中关键对象的引用是弱引用。即，如果没有其他引用 Wea​​kMap 中的键对象可以被垃圾收集。  
其他区别是:  
1.Maps 可以存储任何类型的键，而 WeakMaps 只能存储键对象的集合 2.与 Map 不同，WeakMap 没有 size 属性
3.WeakMap 没有 clear、keys、values、entries、forEach 等方法。
4.WeakMap 不可迭代。

### 什么是原始数据类型？

原始数据类型是具有原始值（没有属性或方法）的数据。有 7 种原始数据类型。

1.string 2.number 3.boolean 4.null 5.undefined 6.bigint 7.symbol

### 什么是构造方法？

构造函数方法是用于创建和初始化在类中创建的对象的特殊方法。如果未指定构造函数方法，则使用默认构造函数。

```js
class Employee {
  constructor(name) {
    this.name = name;
  }
  //一个类中多次编写构造函数方法，它将抛出SyntaxError错误
  // constructor() {// Uncaught SyntaxError: A class may only have one constructor(未捕获的语法错误:一个类可能只有一个构造函数)
  //   this.age = 10;
  // }
}
let employeeObject = new Employee("kobe");
console.log(employeeObject.name);
```

### 如何调用父类的构造函数？

您可以使用 super 关键字来调用父类的构造函数。请记住，super()必须在使用“this”引用之前调用。否则会导致引用错误。让我们使用它，

```js
class Square extends Rectangle {
  constructor(length) {
    super(length, length);
    this.name = "Square";
  }
  get area() {
    return this.width * this.height;
  }
  set area(value) {
    this.area = value;
  }
}
```

### 检查一个对象是否可以扩展？如何防止对象扩展？

Object.isExtensible()方法用于确定对象是否可扩展。即，它是否可以添加新属性。  
Object.preventExtensions()方法用于防止向对象添加新属性

```js
const newObject = {};
console.log(Object.isExtensible(newObject)); //true
// ***==注意==：*** 默认情况下，所有对象都是可扩展的。即，可以添加或修改新属性。

Object.preventExtensions(newObject); // 不可扩展
try {
  Object.defineProperty(newObject, "newProperty", {
    // 添加新属性
    value: 100,
  });
} catch (e) {
  console.log(e); // 类型错误：无法定义属性 newProperty，对象不可扩展
}
```

### 什么是 javascript 中的混淆？为什么需要混淆？

混淆是故意创建人类难以理解的混淆 javascript 代码（即源代码或机器代码）的行为。它类似于加密，但机器可以理解代码并执行它。

混淆的几个原因:  
1.代码大小将减少。所以服务器和客户端之间的数据传输会很快。 2.它对外界隐藏业务逻辑并保护代码不受他人影响 3.逆向工程难度很大 4.下载时间将减少

### 常用的缩小工具有哪些？

有许多在线/离线工具可以缩小 javascript 文件

- 谷歌的 Closure 编译器
- jsmin
- javascript-minifier.com
- Prettydiff.com

### 可用于约束验证的 DOM 方法有哪些？

以下 DOM 方法可用于对无效输入进行约束验证:  
1.checkValidity()：如果输入元素包含有效数据，则返回 true。
2.setCustomValidity()：用于设置输入元素的 validationMessage 属性。让我们使用带有 DOM 验证的用户登录表单

什么是可用的约束验证 DOM 属性？  
下面是一些可用的约束验证 DOM 属性的列表:  
1.validity：它提供与输入元素有效性相关的布尔属性列表。
2.validationMessage：当有效性为假时显示消息。
3.willValidate：指示输入元素是否将被验证。

什么是有效性属性列表？  
输入元素的有效性属性提供一组与数据有效性相关的属性:  
1.customError：如果设置了自定义有效性消息，则返回 true。
2.patternMismatch：如果元素的值与其模式属性不匹配，则返回 true。
3.rangeOverflow：如果元素的值大于其 max 属性，则返回 true。
4.rangeUnderflow：如果元素的值小于其 min 属性，则返回 true。
5.stepMismatch：如果元素的值根据 step 属性无效，则返回 true。
6.tooLong：如果元素的值超过其 maxLength 属性，则返回 true。
7.typeMismatch：如果元素的值根据 type 属性无效，则返回 true。
8.valueMissing：如果具有必需属性的元素没有值，则返回 true。
9.valid：如果元素的值有效，则返回 true。

```js
<input id="num" type="number" min="10" max="100" />;
if (
  document.getElementById("num").validity.rangeUnderflow ||
  document.getElementById("num").validity.rangeOverflow
) {
  console.loh("number is not allowed");
}
```

### 如何用逗号作为千位分隔符打印数字？

```js
function convertToThousandFormat(num) {
  return num.toLocaleString();
}
console.log(convertToThousandFormat(1234567.89)); // 1,234,567.89
```

### 什么是 V8 JavaScript 引擎？

V8 是 Google Chrome 浏览器使用的开源高性能 JavaScript 引擎，用 C++ 编写。它也在 node.js 项目中使用。它实现了 ECMAScript 和 WebAssembly，并在 Windows 7 或更高版本、macOS 10.12+ 和使用 x64、IA-32、ARM 或 MIPS 处理器的 Linux 系统上运行。
**_==注意==：_** 它可以独立运行，也可以嵌入到任何 C++ 应用程序中。

### 如何创建复制到剪贴板按钮？

您需要选择输入元素的内容（使用 .select() 方法）并使用 execCommand 执行复制命令（即 execCommand('copy')）。您还可以执行其他系统命令，如剪切和粘贴。

```js
document.querySelector("#copy-button").onclick = function () {
  // 选择内容
  document.querySelector("#copy-input").select();
  // 复制到剪贴板
  document.execCommand("copy");
};
```
