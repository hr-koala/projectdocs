## 14 种组件通讯

### 1. props 父传子的属性

```js
// 对象
props:{
 inpVal:{
  type:Number, //传入值限定类型
  // type 值可为String,Number,Boolean,Array,Object,Date,Function,Symbol
  // type 还可以是一个自定义的构造函数，并且通过 instanceof 来进行检查确认
  required: true, //是否必传
  default:200,  //默认值,对象或数组默认值必须从一个工厂函数获取如 default:()=>[]
  validator:(value) {
    // 这个值必须匹配下列字符串中的一个
    return ['success', 'warning', 'danger'].indexOf(value) !== -1
  }
 }
}
```

### 2. $emit 子传父的方法

```js
// 父组件
<home @title="title">
// 子组件
this.$emit('title',[{title:'这是title'}])
```

### 3. vuex 状态管理器

```js
state:定义存贮数据的仓库 ,可通过this.$store.state 或mapState访问
getter:获取 store 值,可认为是 store 的计算属性,可通过this.$store.getter 或
       mapGetters访问
mutation:同步改变 store 值,为什么会设计成同步,因为mutation是直接改变 store 值,
         vue 对操作进行了记录,如果是异步无法追踪改变.可通过mapMutations调用
action:异步调用函数执行mutation,进而改变 store 值,可通过 this.$dispatch或mapActions
       访问
modules:模块,如果状态过多,可以拆分成模块,最后在入口通过...解构引入
```

### 4. $attrs和$listeners

- $attrs
场景:如果父传子有很多值,那么在子组件需要定义多个 props  
解决:$attrs 获取子传父中未在 props 定义的值
- $listeners
场景:子组件需要调用父组件的方法 
解决:父组件的方法可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用
- inheritAttrs 默认值为 true，true 的意思是将父组件中除了 props 外的属性添加到子组件的根节点上(说明，即使设置为 true，子组件仍然可以通过$attr 获取到 props 意外的属性) 将 inheritAttrs:false 后,属性就不会显示在根节点上了

### 5.provide 和 inject

provide 和 inject 主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中;
并且这对选项需要一起使用;
以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。

```js
//父组件:
provide: { //provide 是一个对象,提供一个属性或方法
  foo: '这是 foo',
  fooMethod:()=>{
    console.log('父组件 fooMethod 被调用')
  }
},

// 子或者孙子组件
inject: ['foo','fooMethod'], //数组或者对象,注入到子组件
mounted() {
  this.fooMethod()
  console.log(this.foo)
}
//在父组件下面所有的子组件都可以利用inject
```

provide 和 inject 绑定并不是可响应的。这是官方刻意为之的。
然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的,对象是因为是引用类型

```js
//父组件:
provide: {
  foo: '这是 foo'
},
mounted(){
  this.foo='这是新的 foo'
}

// 子或者孙子组件
inject: ['foo'],
mounted() {
  console.log(this.foo) //子组件打印的还是'这是 foo'
}
```

### 6. $parent和$children

$parent:父实例
$children:子实例

```js
//父组件
mounted(){
  console.log(this.$children)
  //可以拿到 一级子组件的属性和方法
  //所以就可以直接改变 data,或者调用 methods 方法
}

//子组件
mounted(){
  console.log(this.$parent) //可以拿到 parent 的属性和方法
}
```

$children和$parent 并不保证顺序，也不是响应式的
只能拿到一级父组件和子组件

### 7. $refs

```js
// 父组件
<home ref="home"/>

mounted(){
  console.log(this.$refs.home) //即可拿到子组件的实例,就可以直接操作 data 和 methods
}
```

### 8. $root

```js
// 父组件
mounted(){
  console.log(this.$root) //获取根实例,最后所有组件都是挂载到根实例上
  console.log(this.$root.$children[0]) //获取根实例的一级子组件
  console.log(this.$root.$children[0].$children[0]) //获取根实例的二级子组件
}
```

### 9. .sync

```js
在 vue@1.x 的时候曾作为双向绑定功能存在，即子组件可以修改父组件中的值;
在 vue@2.0 的由于违背单项数据流的设计被干掉了;
在 vue@2.3.0+ 以上版本又重新引入了这个 .sync 修饰符;

// 父组件
<home :title.sync="title" />
//编译时会被扩展为
<home :title="title"  @update:title="val => title = val"/>

// 子组件
// 所以子组件可以通过$emit 触发 update 方法改变
mounted(){
  this.$emit("update:title", '这是新的title')
}
```

### 10. v-slot

2.6.0 新增
1.slot,slot-cope,scope 在 2.6.0 中都被废弃,但未被移除 2.作用就是将父组件的 template 传入子组件 3.插槽分类:
A.匿名插槽(也叫默认插槽): 没有命名,有且只有一个;

```js
// 父组件
<todo-list>
    <template v-slot:default>
       任意内容
       <p>我是匿名插槽 </p>
    </template>
</todo-list>

// 子组件
<slot>我是默认值</slot>
//v-slot:default写上感觉和具名写法比较统一,容易理解,也可以不用写
```

B.具名插槽: 相对匿名插槽组件 slot 标签带 name 命名的;

```js
// 父组件
<todo-list>
    <template v-slot:todo>
       任意内容
       <p>我是匿名插槽 </p>
    </template>
</todo-list>

//子组件
<slot name="todo">我是默认值</slot>
```

C.作用域插槽: 子组件内数据可以被父页面拿到(解决了数据只能从父页面传递给子组件)

```js
// 父组件
<todo-list>
 <template v-slot:todo="slotProps" >
   {{slotProps.user.firstName}}
 </template>
</todo-list>
//slotProps 可以随意命名
//slotProps 接取的是子组件标签slot上属性数据的集合所有v-bind:user="user"

// 子组件
<slot name="todo" :user="user" :test="test">
    {{ user.lastName }}
 </slot>
data() {
    return {
      user:{
        lastName:"Zhang",
        firstName:"yue"
      },
      test:[1,2,3,4]
    }
  },
// {{ user.lastName }}是默认数据  v-slot:todo 当父页面没有(="slotProps")
```

### 11. EventBus

1.就是声明一个全局 Vue 实例变量 EventBus , 把所有的通信数据，事件监听都存储到这个变量上; 2.类似于 Vuex。但这种方式只适用于极小的项目 3.原理就是利用$on和$emit 并实例化一个全局 vue 实现数据共享

```js
// 在 main.js
Vue.prototype.$eventBus = new Vue();

// 传值组件
this.$eventBus.$emit("eventTarget", "这是eventTarget传过来的值");

// 接收组件
this.$eventBus.$on("eventTarget", (v) => {
  console.log("eventTarget", v); //这是eventTarget传过来的值
});
```

4.可以实现平级,嵌套组件传值,但是对应的事件名 eventTarget 必须是全局唯一的

### 12. broadcast 和 dispatch

vue 1.x 有这两个方法,事件广播和派发,但是 vue 2.x 删除了
下面是对两个方法进行的封装

```js
function broadcast(componentName, eventName, params) {
  this.$children.forEach((child) => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      var parent = this.$parent;
      var name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
  },
};
```

### 13. 路由传参

```js
// 1.方案一

// 路由定义
{
  path: '/describe/:id',
  name: 'Describe',
  component: Describe
}
// 页面传参
this.$router.push({
  path: `/describe/${id}`,
})
// 页面获取
this.$route.params.id
// 2.方案二

// 路由定义
{
  path: '/describe',
  name: 'Describe',
  omponent: Describe
}
// 页面传参
this.$router.push({
  name: 'Describe',
  params: {
    id: id
  }
})
// 页面获取
this.$route.params.id
// 3.方案三

// 路由定义
{
  path: '/describe',
  name: 'Describe',
  component: Describe
}
// 页面传参
this.$router.push({
  path: '/describe',
    query: {
      id: id
  `}
)
// 页面获取
this.$route.query.id

// 4.三种方案对比
// 方案二参数不会拼接在路由后面,页面刷新参数会丢失
// 方案一和三参数拼接在后面,丑,而且暴露了信息
```

### 14. Vue.observable

2.6.0 新增
用法:让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象;

返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新;
也可以作为最小化的跨组件状态存储器，用于简单的场景。
通讯原理实质上是利用 Vue.observable 实现一个简易的 vuex

```js
// 文件路径 - /store/store.js
import Vue from 'vue'

export const store = Vue.observable({ count: 0 })
export const mutations = {
  setCount (count) {
    store.count = count
  }
}

//使用
<template>
    <div>
        <label for="bookNum">数 量</label>
            <button @click="setCount(count+1)">+</button>
            <span>{{count}}</span>
            <button @click="setCount(count-1)">-</button>
    </div>
</template>

<script>
import { store, mutations } from '../store/store' // Vue2.6新增API Observable

export default {
  name: 'Add',
  computed: {
    count () {
      return store.count
    }
  },
  methods: {
    setCount: mutations.setCount
  }
}
</script>
```

## 异步组件

场景:项目过大就会导致加载缓慢,所以异步组件实现按需加载就是必须要做的事啦 1.异步注册组件
3 种方法

```js
// 工厂函数执行 resolve 回调
Vue.component("async-webpack-example", function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包, 这些包
  // 会通过 Ajax 请求加载
  require(["./my-async-component"], resolve);
});

// 工厂函数返回 Promise
Vue.component(
  "async-webpack-example",
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import("./my-async-component")
);

// 工厂函数返回一个配置化组件对象
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import("./MyComponent.vue"),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000,
});
```

异步组件的渲染本质上其实就是执行 2 次或者 2 次以上的渲染, 先把当前组件渲染为注释节点, 当组件加载成功后, 通过 forceRender 执行重新渲染。或者是渲染为注释节点, 然后再渲染为 loading 节点, 在渲染为请求完成的组件

2.路由的按需加载

```js
webpack< 2.4 时
{
  path:'/',
  name:'home',
  components:resolve=>require(['@/components/home'],resolve)
}

webpack> 2.4 时
{
  path:'/',
  name:'home',
  components:()=>import('@/components/home')
}
import()方法由es6提出，import()方法是动态加载，返回一个Promise对象，then方法的参数是加载到的模块。类似于Node.js的require方法，主要import()方法是异步加载的。
```

## Vue.version

场景:有些开发插件需要针对不同 vue 版本做兼容,所以就会用到 Vue.version
用法:Vue.version()可以获取 vue 版本

```js
var version = Number(Vue.version.split(".")[0]);

if (version === 2) {
  // Vue v2.x.x
} else if (version === 1) {
  // Vue v1.x.x
} else {
  // Unsupported versions of Vue
}
```
