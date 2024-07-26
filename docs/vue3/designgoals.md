---
# sidebar: "auto"
# navbar: true
# sidebarDepth: 4
article: true
---

# Vue3.0 的设计目标是什么？做了哪些优化?

## 一、设计目标

不以解决实际业务痛点的更新都是耍流氓，下面我们来列举一下 Vue3 之前我们或许会面临的问题

1. 随着功能的增长，复杂组件的代码变得越来越难以维护
2. 缺少一种比较「干净」的在多个组件之间提取和复用逻辑的机制
3. 类型推断不够友好
4. `bundle` 的时间太久了
5. `vue2` 响应式的缺点是:无法监听到对象属性的动态添加和删除,无法监听到数组下标和 `length` 长度的变化;

Vue2 不允许在已经创建的实例上动态添加新的响应式属性.  
三种解决方案（**Vue.set() / Object.assign() / $forcecUpdated()**）

### 而 Vue3 经过长达两三年时间的筹备，做了哪些事情？

1. 更小
2. 更快
3. TypeScript 支持
4. API 设计一致性
5. 提高自身可维护性
6. 开放更多底层功能  
   一句话概述，就是 **更小更快更友好** 了

- `diff` 算法的优化；
- `hoistStatic` 静态提升；
- `cacheHandlers` 事件侦听器缓存；
- `ssr` 渲染；更好的 `Ts` 支持；
- `Compostion API`: 组合 API/注入 API；
- 更先进的组件；
- 自定义渲染 `API`；
- 按需编译，体积比 vue2.x 更小；
- 支持多根节点组件等

### 1.diff 算法的优化

`vue2` 中的虚拟 dom 是全量的对比（每个节点不论写死的还是动态的都会一层一层比较，这就浪费了大部分事件在对比静态节点上）

`vue3` 新增了`静态标记`（patchflag）与上次虚拟节点对比时，只对比带有 `patch flag` 的节点（动态数据所在的节点）；可通过 `flag` 信息得知当前节点要对比的具体内容。

当视图更新时，只对动态节点部分进行 diff 运算，减少了资源的损耗。`Patchflag` 是个枚举，取值为 **1** 代表这个元素的文本是动态绑定的，取值为 **2** 代表元素的 class 是动态绑定的。

### 2：hoistStatic 静态提升

`vue2` 无论元素是否参与更新，每次都会重新创建然后再渲染。

`vue3` 对于不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用即可。

```js
//例：下面我们利用Vue 3 Template Explorer,来直观的感受一下：
<div>
    <div>盒子1</div>
    <div>盒子2</div>
    <div>{{name}}</div>
</div>
// 静态提升之前
export function render(...) {
    return (
        _openBlock(),
        _createBlock('div', null, [
            _createVNode('div', null, '盒子1'),
            _createVNode('div', null, '盒子2'),
            _createVNode(
                'div',
                null,
                _toDisplayString(_ctx.name),
                1 /* TEXT */ /* 1 代表这个元素的文本是动态绑定的，取值为 2 代表元素的 class 是动态绑定*/
            ),
        ])
    )
}
// 静态提升之后
const _hoisted_1 = /*#__PURE__*/ _createVNode(
    'div',
    null,
    '盒子1',
    -1 /* HOISTED */
)
const _hoisted_2 = /*#__PURE__*/ _createVNode(
    'div',
    null,
    '盒子2',
    -1 /* HOISTED */
)
export function render(...) {
    return (
        _openBlock(),
        _createBlock('div', null, [
            _hoisted_1,
            _hoisted_2,
            _createVNode(
                'div',
                null,
                _toDisplayString(_ctx.name),
                1 /* TEXT */
            ),
        ])
    )
}
// 从以上代码中我们可以看出，_hoisted_1 和_hoisted_2 两个方法被提升到了渲染函数 render 之外，也就是我们说的静态提升。通过静态提升可以避免每次渲染的时候都要重新创建这些对象，从而大大提高了渲染效率。
```

### 3：cacheHandlers 事件侦听器缓存

`vue2.x` 中，绑定事件每次触发都要重新生成全新的 function 去更新，`cacheHandlers` 是 Vue3 中提供的事件缓存对象，当 `cacheHandlers` 开启，会自动生成一个内联函数，同时生成一个静态节点。当事件再次触发时，只需从缓存中调用即可，无需再次更新。

默认情况下 `onClick` 会被视为动态绑定，所以每次都会追踪它的变化，但是同一个函数没必要追踪变化，直接缓存起来复用即可。

```js
// 例：下面我们同样是通过Vue 3 Template Explorer，来看一下事件监听器缓存的作用：
<div>
    <div @click="todo">做点有趣的事</div>
</div>
// 该段 html 经过编译后变成我们下面的结构(未开启事件监听缓存)：
export function render(...) {
    return (_openBlock(),_createBlock('div', null, [
            _createVNode('div',{ onClick: _ctx.todo}, '做点有趣的事', 8 /* PROPS */,
                ['onClick']),
        ])
    )
}
// 当我们开启事件监听器缓存后：
export function render(...) {
    return (_openBlock(),_createBlock('div', null, [
            _createVNode('div',{
                    onClick:    //开启监听后
                        _cache[1] || (_cache[1] = (...args) =>_ctx.todo(...args)),
                },'做点有趣的事'),
        ])
    )
}
// 我们可以对比开启事件监听缓存前后的代码，转换之后的代码, 我们只需要观察有没有静态标记即可，**在Vue3的diff算法中, 只有有静态标记的才会进行比较, 才会进行追踪。**
```

### 4：ssr 渲染

`Vue2` 中也是有 `SSR` 渲染的，但是 `Vue3` 中的 `SSR` 渲染相对于 Vue2 来说，性能方面也有对应的提升。

当存在大量静态内容时，这些内容会被当作纯字符串推进一个 `buffer` 里面，即使存在动态的绑定，会通过模版插值潜入进去。这样会比通过虚拟 `dom` 来渲染的快上很多。

当静态内容大到一个量级的时候，会用\_createStaticVNode 方法在客户端去生成一个 `static node`，这些静态 `node`，会被直接 `innerHtml`，就不需要再创建对象，然后根据对象渲染。

### 5：更好的 Ts 支持

vue2 不适合使用 `ts`，原因在于 vue2 的 `Option API` 风格。options 是个简单对象，而 ts 是一种类型系统、面向对象的语法。两者有点不匹配。

在 vue2 结合 `ts` 的具体实践中，要用 `vue-class-component` 强化 vue 组件，让 `Script` 支持 `TypeScript` 装饰器，用 `vue-property-decorator` 来增加更多结合 Vue 特性的装饰器，最终搞的 ts 的组件写法和 js 的组件写法差别挺大。

在 vue3 中，量身打造了 `defineComponent` 函数，使组件在 ts 下，更好的利用参数类型推断 。`Composition API` 代码风格中，比较有代表性的 api 就是 `ref` 和 `reactive`，也很好的支持了类型声明。

```js
import { defineComponent, ref } from 'vue'
const Component = defineComponent({
    props: {
        success: { type: String },
        student: {
          type: Object as PropType<Student>,
          required: true
       }
    },
    setup() {
      const year = ref(2022)
      const month = ref<string | number>('9')
      month.value = 9 // OK
     const result = year.value.split('')
 }
```

### 6：Compostion API: 组合 API/注入 API

传统的网页是 Html/Css/Javascript（结构/样式/逻辑）分离。vue 通过组件化的方式，将联系紧密的结构/样式/逻辑放在一起，有利于代码的维护。Compostion api 更进一步，着力于 JS（逻辑）部分，将逻辑相关的代码放在一起，这样更有利于代码的维护。

在 vue2 的组件内使用的是 Option API 风格(data/methods/mounted)来组织的代码，这样会让逻辑分散，举个例子就是我们完成一个计数器功能，要在 `data` 里声明变量，在 `methods` 定义响应函数，在 `mounted` 里初始化变量，如果在一个功能比较多、代码量比较大的组件里，你要维护这样一个功能，就需要在 data/methods/mounted 反复的切换到对应位置，然后进行代码的更改。

而在 vue3 中，使用 `setup` 函数。如下所示跟 count 相关的逻辑，都放到 counter.ts 文件里，跟 todo 相关的逻辑放到 todos.ts 里。

```js
import useCounter from './counter'
import useTodo from './todos'
setup(){
    let { val, todos, addTodo } = useTodo()
    let {count,add} = useCounter()
    return {
        val, todos, addTodo,count,add,
    }
}
```

### 7：更先进的组件

vue2 是不允许这样写的，组件必须有一个跟节点，现在可以这样写，vue 将为我们创建一个虚拟的 `Fragment` 节点。

```js
<template>
  <div>根节点1</div>
  <div>根结点2</div>
</template>
```

在 `Suspended-component` 完全渲染之前，备用内容会被显示出来。如果是异步组件，Suspense 可以等待组件被下载，或者在设置函数中执行一些异步操作。

### 8：自定义渲染 API

vue2.x 项目架构对于 `weex`（移动端跨平台方案）和 `myvue`（小程序上使用）等渲染到不同平台不太友好，vue3.0 推出了自定义渲染 API 解决了该问题。下面我们先看 vue2 和 vue3 的入口写法有哪些不同。

```js
// vue2
import Vue from 'vue'
import App from './App.vue'
new Vue({ h=> h(App)}).$mount('#app')
// vue3
const { createApp } from 'vue'
import App from "./src/App"
createApp(App).mount('#app')
```

vue 官方实现的 `createApp` 会给我们的 template 映射生成 html 代码，但是要是你不想渲染生成到 html ，而是要渲染生成到 `canvas` 之类的不是 html 的代码的时候，那就需要用到 `Custom Renderer API` 来定义自己的 render 渲染生成函数了。

```js
import { createApp } from './runtime-render'
import App from './src/App' // 根组件
createApp(App).mount('#app')
```

使用自定义渲染 API，如 `weex` 和 `myvue` 这类方案的问题就得到了完美解决。只需重写 `createApp` 即可。

### 9：按需编译，体积比 vue2.x 更小

框架的大小也会影响其性能。这是 Web 应用程序的唯一关注点，因为需要即时下载资源，在浏览器解析必要的 JavaScript 之前该应用程序是不可交互的。对于单页应用程序尤其如此。尽管 Vue 一直是相对轻量级的（Vue 2 的运行时大小压缩为 23 KB）。

在 Vue 3 中，通过将大多数全局 API 和内部帮助程序移至 ES 模块导出来，实现了这一目标。这使现代的打包工具可以静态分析模块依赖性并删除未使用的导出相关的代码。模板编译器还会生成友好的 `Tree-shaking` 代码，在模板中实际使用了该功能时才导入该功能的帮助程序。
Vue3 移除一些不常用的 API; 引入 `tree-shaking`，可以将无用模块“剪辑”，仅打包需要的，使打包的整体体积变小了

框架的某些部分永远不会 `Tree-shaking`，因为它们对于任何类型的应用都是必不可少的。我们将这些必不可少的部分的度量标准称为基准尺寸。尽管增加了许多新功能，但 Vue 3 的基准大小压缩后约为 10 KB，还不到 Vue 2 的一半。

### 10：支持多根节点组件

Vue3 一个模板不再限制有多个根节点，(多个根节点上的 `Attribute` 继承) 需要显式定义 `attribute` 应该分布在哪里。否则控制台会给出警告提示。

在 Vue 3 中，组件现在正式支持多根节点组件，即片段！

```js
// 在 2.x 中，不支持多根组件，当用户意外创建多根组件时会发出警告，因此，为了修复此错误，许多组件被包装在一个中。如下
<template>
  <div>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </div>
</template>
// 在 3.x 中，组件现在可以有多个根节点！但是，这确实要求开发者明确定义属性应该分布在哪里。
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

Vue 是国内最火的前端框架之一。性能提升，**运行速度**是 vue2.x 的 1.2-2 倍。
体积更小，**按需编译**体积 vue2 要更小。
类型推断，更好的支持 `ts` 这个也是趋势。
高级给予，暴露了更底层的 API 和提供更先进的内置组件。
组合 API，能够更好的组织逻辑，封装逻辑，复用逻辑

## 二、优化方案

vue3 从很多层面都做了优化，可以分成三个方面：

1. 源码
2. 性能
3. 语法 API

### 源码

源码可以从两个层面展开：

1. 源码管理
2. `TypeScript`

#### 源码管理

`vue3`整个源码是通过 `monorepo `的方式维护的，根据功能将不同的模块拆分到`packages `目录下面不同的子目录中

![](https://static.vue-js.com/d7c32520-5c58-11eb-ab90-d9ae814b240d.png)

这样使得模块拆分更细化，职责划分更明确，模块之间的依赖关系也更加明确，开发人员也更容易阅读、理解和更改所有模块源码，提高代码的可维护性
另外一些 `package`（比如 `reactivity` 响应式库）是可以独立于 Vue 使用的，这样用户如果只想使用 Vue3 的响应式能力，可以单独依赖这个响应式库而不用去依赖整个 Vue

#### TypeScript

`Vue3`是基于`typeScript`编写的，提供了更好的类型检查，能支持复杂的类型推导

### 性能

1. 体积优化
2. 编译优化
3. 数据劫持优化

```js
// 在vue2中，数据劫持是通过Object.defineProperty，这个 API 有一些缺陷，并不能检测对象属性的添加和删除
Object.defineProperty(data, 'a',{
  get(){
    // track
  },
  set(){
    // trigger
  }
})
// 尽管Vue为了解决这个问题提供了 set和delete实例方法，但是对于用户来说，还是增加了一定的心智负担
// 同时在面对嵌套层级比较深的情况下，就存在性能问题
default {
  data: {
    a: {
      b: {
          c: {
          d: 1
        }
      }
    }
  }
}
// 相比之下，vue3是通过proxy监听整个对象，那么对于删除还是监听当然也能监听到
// 同时Proxy 并不能监听到内部深层次的对象变化，而 Vue3 的处理方式是在getter 中去递归响应式，这样的好处是真正访问到的内部对象才会变成响应式，而不是无脑递归
```

`Proxy API` 并不能监听到对象内部深层次的属性变化，因此它的处理方式是`在 getter 中去递归响应式`，这样做的好处是`真正访问到的内部属性才会变成响应式`，简单的可以说是`按需实现响应式，减少性能消耗`。

### 语法 API

composition API，其两大显著的优化：

1. 优化逻辑组织
2. 优化逻辑复用

#### 逻辑组织

一张图，我们可以很直观地感受到 `Composition API `在逻辑组织方面的优势

![](https://static.vue-js.com/e5804bc0-5c58-11eb-85f6-6fac77c0c9b3.png)

相同功能的代码编写在一块，而不像`options API`那样，各个功能的代码混成一块

#### 逻辑复用

在`vue2`中，我们是通过`mixin`实现功能混合，如果多个`mixin`混合，会存在两个非常明显的问题：`命名冲突和数据来源不清晰`

而通过`composition`这种形式，可以将一些复用的代码抽离出来作为一个函数，只要的使用的地方直接进行调用即可

```js
import { toRefs, reactive, onUnmounted, onMounted } from 'vue'
function useMouse() {
  const state = reactive({ x: 0, y: 0 })
  const update = (e) => {
    state.x = e.pageX
    state.y = e.pageY
  }
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return toRefs(state)
}
// 组件使用
import useMousePosition from './mouse'
export default {
  setup() {
    const { x, y } = useMousePosition()
    return { x, y }
  },
}
```

可以看到，整个数据来源清晰了，即使去编写更多的`hook`函数，也不会出现命名冲突的问题
