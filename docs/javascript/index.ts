/**
重绘/重排
监测数据类：typeof / instanceof / constructor / Object.prototype.toString.call()
闭包：
new:
function newFun(Fun, ...args) {
  let newObj = {}
  newObj.__proto__ = Fun.prototype
  let result = Fun.apply(newObj, args)
  return result instanceof Object ? result : newObj
}
function Proson(name) {
  this.name = name
}
Proson.prototype.say = function () {
  console.log('123456')
}
let p1 = newFun(Proson, 'jack')
console.log(p1, p1.name, p1.say())
继承：
function Parent() {
  this.isShow = true
  this.info = {
    name: 'jack'
  }
}
Parent.prototype.getInfo = function () {
  console.log(this.info, this.isShow)
}
function Child() {
}
Child.prototype = new Parent()
let c1 = new Child()
c1.info.gender = 'man'
c1.getInfo()
console.log(c1)
let c2 = new Child()
c2.isShow = false
c2.getInfo()
console.log(c2)

function Parent(gender) {
  this.info = {
    name: 'jack',
    gender: gender
  }
}
function Child(gender) {
  Parent.call(this, gender)
}
let c1 = new Child('man')
c1.info.nickName = 'tom'
console.log(c1)
let c2 = new Child('woman')
console.log(c2)

function Parent(gender) {
  console.log('执行次数')
  this.info = {
    name: 'jack',
    gender: gender
  }
}
Parent.prototype.getInfo = function () {
  console.log(this.info)
}
function Child(gender) {
  Parent.call(this, gender)
}
Child.prototype = new Parent()
let c1 = new Child('man')
c1.info.nickName = 'tom'
console.log(c1, c1.getInfo())
let c2 = new Child('woman')
console.log(c2, c2.getInfo())

class Parent {
  kind: string;
  constructor(kind: string) {
    this.kind = kind
  }
  getKind() {
    return this.kind
  }
}
class Child extends Parent {
  name: string;
  constructor(kind: string, name: string) {
    super(kind)
    this.name = name
  }
  getCat() {
    console.log(this.name, super.getKind())
  }
}
let c1 = new Child('jack', 'tom')
console.log(c1)
c1.getCat()

setTimeout最小执行时间4ms
setInterval 最小执行时间10ms

es6:
块级作用域(let /const)
类的语法糖class
promise
基本数据类型symbol
解构赋值
扩展运算符
数组增API
函数参数默认值
箭头函数()=> { }
模块化(import,export )
set和map数据结构
generator async / await

// 递归深拷贝
function extend(origin, deep) {
  let obj = {}
  if (origin instanceof Array) {
    obj = []
  }
  for (let key in origin) {
    let value = origin[key]
    obj[key] = (!!deep && typeof value === 'object' && value !== null) ? extend(value, deep) : value
  }
  return obj
}

页面渲染：DNS解析，建立TCP连接，发送http请求，服务器处理请求，渲染页面，断开TCP连接
vue事件修饰符：stop/prevent/capture/self/once/passive/native
按键修饰符：keyup/keydown
系统修饰符：ctrl/alt/meta
鼠标修饰符：left/right/middle
表单修饰符：lazy/trim/number

首屏优化：
1.路由懒加载
2.非首屏组件使用异步组建
3.首屏不重要的组件延迟加载
4.静态资源放在CDN上
5.减少首屏js,css等资源文件大小
6.使用服务端渲染
7.尽量减少DOM的数量和层级
8.使用精灵图请求
9.做一些loading
10.开启Gzip压缩
11.图片懒加载

vue3性能为什么比vue2好？
1.diff算法优化，静态标记
2.静态提升
3.事件侦听缓存
vue3为什么使用proxy ?
1.proxy可以代理整个对象，defineproperty只代理对象上的某个属性
2.proxy对代理对象的监听更加丰富
3.proxy代理对象会生成新的对象，不会修改被代理对象本身
SEO如何优化？
1.ssr
2.预渲染 prerender-spa-plugin

webpack打包和不打包的区别？
1.运行效率
2.对基础的支持不够 webpack五大模块 Entry output loader plugins mode
webpack是怎么打包的，babel是做什么的？
webpack会把js css image 看作一个模块，用import / require引入
找到入口文件，通过入口文件找到关联的依赖文件，把他们打包到一起
把bundle文件，拆分成多个小的文件，异步按需加载所需要的文件
如果一个被多个文件饮用，打包时只会生成一个文件
如果引用的文件没有被调用，不会打包，如果引入的变量和方法没有调用也不会打包
对于多个入口文件，加入引入了相同的代码，可以用插件把他抽离到公共文件中


UI组件
react中只有组件，没有页面，没有控制器，也没用模型
只关心数据与组件
1.声明式 直观也便于组合
2.组件化 降低系统间功能的耦合性 提高功能内部的聚合型
3.通用性 React将DOM抽象为虚拟DOM，开发者并不会直接操作DOM，使得React不再局限于web开发
React是一个网页UI框架，通过组件化的方式解决视图层开发复用的问题，本质是一个组件化框架。
它的核心设计思路有三点，分别是声明式/组件化与通用性。
声明式的优势在于直观与组合。
组件化的优势在于视图的拆分与模块复用，可以更容易做到高内菊低耦合。
通用性在于一次学习，随处编写。如react native等，这里主要靠虚拟DOM来保证实现。
这也使得React的适用范围变得足够广，无论是web，native，vr，甚至shell应用都可以进行开发。这也是React的优势。
但作为一个视图层的框架，React的劣势也十分明显，它并没有提供完整的一揽子解决方案，在开发大型前端应用时，需要向社区寻找并整合解决方案。虽然一定程度上促进了社区的繁荣，但也为开发者在技术选型和学习适用上造成一定的成本。

React需要将组件转化为虚拟DOM树，XML在树结构的描述上天生具有可读性强的优势。
函数组件与类组件：
本质上代表两种不同设计思想与心智模式
类组件的根基是OOP，面向对象编程
函数组件的根基是FP，函数式编程
相较于类组件，函数组件更纯粹，简单易测试
由于根本思考方式不同，类组件通过生命周期包装业务逻辑
提供新的开发模式让组件渲染与业务逻辑更分离
在不使用Recompose或者Hooks的情况下，如需使用生命周期，就用类组件，限定场景是固定的
在Recompose或Hooks的加持下 类组件与函数组件的能力边界完全相同
类组件可以实现继承，函数组件缺少继承能力
类组件优化依靠shouldComponentUpdate函数去阻断渲染
函数组件靠React.memo来优化
函数组件成为了社区未来主推的方案
this的模糊性 2.业务逻辑散落在生命周期中 3.React组件缺少标准的代码拆分方式
把只作展示，独立运行，不额外增加功能的组件，无状态组件、展示组件
把处理业务逻辑与数据状态的组件称为有状态组件、灵巧组件，灵巧组件一定包含至少一个灵巧组件或展示组件
展示组件的复用性更强，灵巧组件更专注于业务本身
一个函数可以接收另一个函数作为参数，且在执行后返回一个函数，这种函数称为高阶函数
diff函数，去计算状态变更前后的虚拟DOM树差异
渲染函数，渲染整个虚拟DOM树或者处理差异点
React主要工作是组件实现、更新调度
ReactDOM提供了在网页上渲染的基础
当React向iOS、Android开发时只需要通过ReactNative提供Native层元素
大量的直接操作DOM容易引起网页性能下降这时React基于虚拟DOM的diff处理与批处理操作可降低DOM的操作范围与频次，提升页面性能
虚拟DOM一定可以规避XSS吗
虚拟DOM内部确保字符转义，确实可以做到这点，但React存在风险，因为React留有dangeroulySetInnerHTML API 绕过转义
没有虚拟DOM不能实现跨平台吗
比如NativeScript没有虚拟DOM层，它是通过提供兼容原声API的JS API 实现跨平台开发
虚拟DOM的优势在哪里？
跨平台的成本更低
缺点：1.内存占用较高 2.无法进行极致优化
diff算法探讨的就是虚拟DOM树发生变化后，生成DOM树更新补丁的方式
1.真实的DOM首先会映射为虚拟DOM
2.当虚拟DOM变化后会根据差异计算生成patch，patch是结构化的数据，包含增加更新移除等
3.根据path去更新真实的DOM，反馈到用户界面上
遍历算法：它的diff算法采用了深度优先遍历算法
保证了组件的生命周期时序不错乱，但传统的diff算法带来了一个严重的性能瓶颈，复杂度为O(n^3)

优化策略：
1.忽略节点跨层级操作场景，提升比对效率
需进行树比对，即对树进行分层比较，两棵树只对同一层次节点进行比较，如发现节点已不存在，则该节点及其子节点会被完全删除，不会用于进一步比较提升了比对效率
2.如果组件的class一致，则默认为相似的树结构，否则默认为不同的树结构
如果组件是同一类型则进行树比对，如果不是则直接放入补丁中
3.同一层级子节点，可通过标记key的方式进行列表对比
元素比对主要发生在同层级中，通过标记节点操作生成补丁，节点操作包含了插入、移动、删除等
通过标记key的方式，React可以直接移动DOM节点，降低内耗
Fiber机制下节点与树分别采用FiberNode与FiberTree进行重构  双链表
Fiber机制下整个更新过程由current与workInProgress两株树双缓冲完成
根据diff算法如何优化代码？
根据diff算法的设计原则，应尽量避免跨层级节点移动，通过设置唯一key进行优化，尽量减少组件层级深度，因为过深的层级会加深遍历深度，带来性能问题，
设置shouldComponentUpdate或者React.pureComponent减少diff次数
ReactHooks设计模式：
1.Hooks整体发展时间不长
2.hooks并不会改变组件本身的设计模式
React.useMemo()
React.useEffect()第二个参数的判断问题，在设计上它同样是进行浅比较，如果传入的是引用类型，那么很容易会判定不相等，所以尽量不要使用引用类型作为判断条件，很容易出错。
React Router ：
实现原理：hash路由，history pushState, react-router, react-router-dom, react-router-native ,  通过history库完成
设计模式：monorepo, context API;

react常用库：
初始化：就初始化新项目工程而言，React官方推荐使用create-react-app，由第三方的react-app-rewired库对create-react-app提供拓展能力
国内还有类似umi和dva这样一站式的解决方案，更适合国内市场
如要初始化一个组件项目，更推荐create-react-library，它针对组件的场景有优化更适合发布组件，
对于维护大规模组件库的场景，更推荐使用storybook，它支持大规模组件开发
路由 react router
样式 css模块化，import css/scss/less   styled-components和emotio
基础组件 AntD
功能组件 react-dnd,react-draggable用于实现拖拽，video-react用于播放视频 react-pdf-viewer用于预览PDF react-window，react-virtualized用于长列表问题的解决
状态管理 Redux / Mobx
支持构建React的工具有Webpack,Rollup,以及esbuild
检查：eslint，代码测试 jest/react-testing-library/react-hooks-testin-library
发布：s3-plugin-webpack

function debounce(fn, time) {
  let timer = null
  return function () {
    let context=this
    let args=arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.call(context, args)
      timer = null
    }, time)
  }
}
// function throttle(fn, time) {
//   let timer = null
//   return function () {
//     if (timer) return
//     timer = setTimeout(() => {
//       fn.call(this, arguments)
//       timer = null
//     }, time)
//   }
// }

跨域：
服务端接收到请求并把请求返回了，浏览器把响应拦截了
浏览器的保护机制：同源策略，(协议 域名 端口号) 限制不同源之间交互，避免攻击
cors(Cross Origin Resource Sharing)策略：跨域资源共享   有一系列http头组成
Spring Boot服务端处理：1.在目标方法上添加 @CorsOrigin注释 2.添加cros过滤器 3.实现WebMvcConfigure接口，重写addCorsMappings方法
1.修改响应头：res.header('Access-Control-Allow-Origin', '*')
2.JSONP ?callback = fn(data){ console.log(data) }
http无状态协议
console.log(document.cookie)
cookie 大小4kb,兼容H4H5，访问任何窗口，手动设置有效期，存储位置浏览器和服务器，与请求一起发送，语法复杂
localstorage 大小10Mb，兼容H5，访问任何窗口，有效期无，存储位置浏览器，不与请求一起发送，语法简单
sessionStorage 大小5Mb，兼容H5，访问同一窗口，有效期浏览器窗口关闭，存储位置浏览器，不与请求一起发送，语法简单

class Commitment {
  static PENDING = 'pending'
  static FUFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  constructor(func) {
    this.status = Commitment.PENDING
    this.result = null
    this.resolveCallback = []
    this.rejectCallback = []
    try {
      func(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }
  resolve(result) {
    setTimeout(() => {
      if (this.status === Commitment.PENDING) {
        this.status = Commitment.FUFILLED
        this.result = result
        this.resolveCallback.forEach(callback => {
          callback(result)
        })
      }
    });
  }
  reject(result) {
    setTimeout(() => {
      if (this.status === Commitment.PENDING) {
        this.status = Commitment.REJECTED
        this.result = result
        this.rejectCallback.forEach(callback => {
          callback(result)
        })
      }
    })
  }
  then(onFUFILLED, onREJECTED) {
    return new Commitment((resolve, reject) => {
      onFUFILLED = typeof onFUFILLED === 'function' ? onFUFILLED : () => { }
      onREJECTED = typeof onREJECTED === 'function' ? onREJECTED : () => { }
      if (this.status === Commitment.PENDING) {
        this.resolveCallback.push(onFUFILLED)
        this.rejectCallback.push(onREJECTED)
      }
      if (this.status === Commitment.FUFILLED) {
        setTimeout(() => { onFUFILLED(this.result) })
      }
      if (this.status === Commitment.REJECTED) {
        setTimeout(() => { onREJECTED(this.result) })
      }
    })

  }
}

let commit = new Commitment((resolve, reject) => {
  resolve('11111')
})
commit.then((res: any) => {
  console.log(res)
}, (error) => {
  console.log(error)
})

// import * as cors from 'cors'
// let corsOptions = {
//   origin：指定哪些源（域名、协议和端口）可以访问资源。默认值为 *，表示任何源都可以访问。
//   methods：指定允许的 HTTP 请求方法。默认值为 GET、HEAD 和 POST。
//   allowedHeaders：指定允许的自定义请求头列表。默认为空数组。
//   exposedHeaders：指定允许客户端访问的响应头列表。默认为空数组。
//   credentials：指定是否允许发送身份凭证（如 cookie、HTTP 认证或客户端 SSL 证书）。默认为 false。
//   maxAge：指定预检请求的有效期（单位为秒），即在此时间段内，浏览器不需要再次发送预检请求进行验证。默认为 0，表示每次请求都需要发送预检请求。
// }
// app.use(cors(corsOptions))
// app.listen(3000, () => { console.log('start') })
// // 代理服务器
// import { createProxyMiddleware } from 'http-proxy-middleware';
// app.get('/api', createProxyMiddleware({
//   target: 'http://localhost:3001', //
//   changeOrigin: true,
// }))

// 修改本地host文件
// 处理跨域9种方法：
// 1.JSONP
// script / img / link / iframe
// 2.cors跨域资源共享： 服务器端设置相关的头部信息
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:8000') //设置 * 不能设置cookie
// })
// 3.基于http proxy实现跨域 => webpack webpack-dev-server
// devServer: {
//   proxy: {
//     '/api': {
//       target: '',
//         changeOrigin: true
//     }
//   }
// }
// 4.ngnix 反向代理：
// server: {
//   listen 80,
//   ...
// }
// 5.postMessage
// window.postMessage('message', 'url')
// window.onmessage = (ev) => {
//   console.log(ev)
//   ev.source.postMessage(ev.data + '@@@', ev.origin)
// }
// 6.webSocket协议跨域:
// socket.io
// let socket = io('url')
// socket.on('connect', function () {
//   socket.on('message', function () { })
//   socket.on('disconnect', function () { })
// })
// socket.send('')
// //服务端
// socket.listen(server).on('connection', function (client) {
//   client.on('message', function (msg) { console.log(msg) })
//   client.on('disconnect', function () { console.log('closed') })
// })
// 7. document.domain + iframe
// 8.window.name + iframe
// 9.location.hash + iframe

*/

// for (var i = 0; i < 5; i++) {
//   (function (x) {
//     setTimeout(() => {
//       console.log(x++)
//     }, 1000);
//   })(i)
// }
// console.log(i)
// for (let i = 1; i < 10; i++) {
//   for (let j = 1; j <= i; j++) {
//     console.log(i + '*' + j + '=' + i * j)
//   }
// }
// // 二分法查数组
// function searching(array, target) {
//   let arr = [...new Set(array)]
//   let start = 0, end = arr.length - 1, middle, element
//   while (start <= end) {
//     middle = Math.floor((start + end) / 2)
//     element = arr[middle]
//     if (target === element) {
//       return middle
//     } else if (target < element) {
//       end = middle - 1
//     } else {
//       start = middle + 1
//     }
//   }
//   return -1
// }
// // 打乱数组内元素顺序
// function rd(arr) {
//   let length = arr.length, index
//   for (let point = length - 1; point >= 0; point--) {
//     index = Math.floor(Math.random() * point)
//     [arr[index], arr[point]] = [arr[point], arr[index]]
//   }
//   return arr
// }

// typeof / instanceof
// typeof: 检测数据类型，返回小写字母字符串，操作数 - 简单数据类型、函数、对象，操作数量一个
// instanceof: 检测对象之间的关联性，返回布尔值，操作数 - 左边必须是引用数据，右边必须是函数，操作数量两个
// instanceof 可以准确判断引用数据类型，但是不能正确判断原始数据类型
// typeof Symbol() // symbol
// typeof null / [] / {} // object
// console.log(1 instanceof Number)//false
// console.log(new Number(1) instanceof Number) // true

let set = new Set()
set.add(1).add(2)
set.delete(1)
console.log(set, set.has(1))


