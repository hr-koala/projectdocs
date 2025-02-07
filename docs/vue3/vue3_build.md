# vue3.x 搭建

## 1. 基于 vite 创建 vue3

- `normalize.css` 重置样式文件并在 `main.js` 中引入
- 图片和项目中的公共样式添加到 assets 目录下(静态资源)
- tsconfig.json 配置别名路径
- 安装 elementPlus 和自动导入插件
- 安装 sass ; 样式资源 - 把 common.scss 文件放到 styles 目录下
- 安装 axios

```tsx
const app = createApp(App) //表示：创建一个应用，渲染指定的组件App.vue
app.mount("#root") // 表示：将组件挂载到页面指定位置（App.vue中id为 root 的标签）
// 在 vue 3.x 的版本中，<template> 节点内的 DOM 结构支持多个根节点。
// 注意：<template> 是 vue 提供的容器标签，只起到包裹性质的作用，它不会被渲染为真正的 DOM 元素。
```

```tsx
// tsconfig.json
{
  "compilerOptions" : {
    "baseUrl" : "./",
    "paths" : {
      "@/*":["src/*"]
    }
  }
}
```

```tsx
// vite.config.ts
import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
// elementPlus和自动导入插件 `npm install -D unplugin-vue-components unplugin-auto-import`
import AutoImport from "unplugin-auto-import/vite"
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
// 按需定制主题配置 （需要安装 unplugin-element-plus）
import ElementPlus from "unplugin-element-plus/vite"
export default defineConfig({
  plugins: [
    vue(),
    // 配置插件
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(), // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox...
        IconsResolver({ prefix: 'Icon' }),// 自动导入图标组件
      ],
      // 配置文件生成位置，默认是根目录 /auto-imports.d.ts
      // dts: 'src/auto-imports.d.ts',
    }),
    Components({
      // 指定自动导入的组件位置，默认是 src/components
      // dirs: ['src/components'],
      resolvers: [
        ElementPlusResolver(),// 自动导入 Element Plus 组件
        // ElementPlusResolver({importStyle:"sass"}) // 1.配置elementPlus采用sass样式配色系统
         IconsResolver({
          enabledCollections: ['ep'], // element-plus 图标库
        }),// 自动注册图标组件
      ],
      // 配置文件生成位置，默认是根目录 /components.d.ts  
      // dts: 'src/components.d.ts',
    }),
    // 按需定制主题配置
    ElementPlus({
      useSource: true,
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // 加载 assets 图片资源，这个别名必须用 / 开头
      '/images': resolve(__dirname, 'src/assets/img'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `,
      },
    },
  },
  server: {
    open: true,
  },
})
```

```tsx
// 安装sass `npm i sass -D`
// styles/element/index.scss
/* 只需要重写你需要的即可 */
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      // 主色
      'base': #27ba9b,
    ),
    'success': (
      // 成功色
      'base': #1dc779,
    ),
    'warning': (
      // 警告色
      'base': #ffb302,
    ),
    'danger': (
      // 危险色
      'base': #e26237,
    ),
    'error': (
      // 错误色
      'base': #cf4444,
    ),
  )
)
```

```scss
// var.scss
$xtxColor: #27ba9b;
$helpColor: #e26237;
$sucColor: #1dc779;
$warnColor: #ffb302;
$priceColor: #cf4444;
```

```tsx
// utils/http.js
import axios from "axios"

// 创建axios实例
const instance = axios.create({
  baseURL: "http://pcapi-front-devtest.net",
  timeout: 5000,
})
// axios请求拦截器
instance.interceptors.request.use(
  (config) => {
    return config
  },
  (e) => Promise.reject(e)
)
// axios响应式拦截器
instance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    return Promise.reject(e)
  }
)
export default instance
// function getAPI () {  return http({    url: 'api/xx'  })}
```

```tsx
// router/index.js
import { createRouter, createWebHistory } from "vue-router"
// createRouter：创建router实例对象
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // createWebHistory：创建history模式的路由
  // path和component对应关系的位置
  routes: [
    {
      path: "/",
      name: "Layout",
      component: () => import("@/views/Layout/index.vue"),
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("@/views/Home/index.vue"),
        },
        {
          path: "category",
          name: "Category",
          component: () => import("@/views/Category/index.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login/index.vue"),
    },
  ],
  // 路由滚动行为定制
  scrollBehavior() {
    return {
      top: 0,
    }
  },
})
export default router
```

- 路由缓存问题解决

> 缓存问题：当路由 path 一样，参数不同的时候会选择直接复用路由对应的组件
> 解决方案：
>
> 1. 给 routerv-view 添加 `key` 属性，破坏缓存
> 2. 使用 `onBeforeRouteUpdate` 钩子函数，做精确更新

- `useIntersectionObserver`

```tsx
// 定义懒加载插件
import { useIntersectionObserver } from "@vueuse/core"
export const lazyPlugin = {
  install(app) {
    // 懒加载指令逻辑
    app.directive("img-lazy", {
      mounted(el, binding) {
        // el: 指令绑定的那个元素 img
        // binding: binding.value  指令等于号后面绑定的表达式的值  图片url
        console.log(el, binding.value)
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 进入视口区域
            el.src = binding.value
            stop()
          }
        })
      },
    })
  },
}
```

- 全局组件统一插件化

```tsx
// 把components中的所组件都进行全局化注册
// 通过插件的方式
import ImageView from "./ImageView/index.vue"
import XXX from "./XXX/index.vue"
export const componentPlugin = {
  install(app) {
    // app.component('组件名字'，组件配置对象)
    app.component("XtxImageView", ImageView)
    app.component("XXX", XXX)
  },
}
// 引入全局组件插件
import { componentPlugin } from "@/components"
app.use(componentPlugin)
```

### 2. setup()

![](/images/vue3/vue3-3.png)

- 1. setup 是**自动触发**的钩子函数 <br/>
- 2. setup 函数在生命周期函数 `beforeCreate`(组件实例创建之前)**之前**触发，**this 是 undefined**,所有无法获取一 this,意味着 setup 函数中是无法 使用 `data` 和 `methods` 中的数据和方法的；
- 3. 在 setup 函数中定义的属性和方法最后都是需要 `return` 出去的，这样我们就可以在**模板**中直接访问该对象中的属性和方法
- setup 函数的返回值返回一个**对象**
- 4. setup 中定义响应式数据
  - `ref` 常用于**简单数据类型**定义为响应式，也可以是对象类型
  - `reactive` 定义**对象类型**的响应式数据
- 5. setup(props,context)函数的参数
  - `prop` 父传子的数据，并且获取到的数据将**保持响应性**
  - `context` 是一个 JavaScript 对象，这个对象暴露了三个组件的属性
    - `attrs`： 绑定到组件中的`非props`数据(没有用 props 接收的值),并且是**非响应式**的，后期需要对这个值进行处理需要变成响应式数据
    - `slots`： 是组件的插槽，同样**非响应式**的
    - `emit`：是一个方法，相当于 vue2 中的 this.$emit 方法，可用于实现子传父
- 在 vue3 的配置中不能读取 vue2 配置中的属性和方法(data,methods,computed)
- 如果 vue2 和 vue3 的配置有冲突，则 vue3 的 `setup` 优先

3. `<script setup>`

`<script setup>`是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖。相比于普通的 `<script>` 语法，它具有更多优势

- 更少的样板内容，更简洁的代码
- 能够使用纯 `Typescript` 声明 props 和抛出事件。
- 更好的运行时性能 (其模板会被编译成与其同一作用域的渲染函数，没有任何的中间代理)。
- 更好的 IDE 类型推断性能 (减少语言服务器从代码中抽离类型的工作)。

基本语法

- 1. 要使用这个语法，需要将 setup attribute 添加到 `<script>` 代码块上
- 2. 里面的代码会被编译成组件 setup() 函数的内容。这意味着与普通的 `<script>` 只在组件被首次引入的时候执行一次不同，`<script setup>`中的代码会**在每次组件实例被创建的时候执行**<br/>
     顶层的绑定会被暴露给模板
     - 当使用 `<script setup>` 的时候，任何在 `<script setup>` 声明的顶层的绑定 (包括变量，函数声明，以及 `import` 引入的内容) 都能在模板中直接使用
- 3. 使用自定义指令:这里有一个需要注意的**限制**：必须以 `vNameOfDirective` 的形式来命名本地自定义指令，以使得它们可以直接在模板中使用

### 3. defineProps 和 defineEmits

- 1. 必须使用 `defineProps` 和 `defineEmits` API 来声明 `props` 和 `emits`
- `defineProps` 接收与 props 选项相同的值，`defineEmits` 也接收 emits 选项相同的值
- `defineProps` 和 `defineEmits` 在选项传入后，会提供恰当的类型推断
- 传入到 `defineProps` 和 `defineEmits` 的选项会从 setup 中提升到模块的范围。因此，传入的选项不能引用在 `setup` 范围中声明的局部变量。这样做会引起编译错误。但是，它可以引用导入的绑定，因为它们也在模块范围内

### ref 函数

- `ref` 函数，常用于**简单数据类型**定义为**响应式**数据, 在修改值，获取值的时候，需要`.value`
- 语法规则：
  - 创建一个包含**响应式数据的引用对象**（`reference对象`，简称 ref 对象）;接收的数据可以是：基本类型、也可以是对象类型
  - JS 中操作数据： `xxx.value`
  - 模板中读取数据: 不需要`.value`，直接：`<div>{{xxx}}</div>`
- **ref 的本质**：ref 底层其实还是 `reactive`,所以当运行时系统会自动根据传入的 ref 转换成 reactive
- ref 获取元素 `let boxRef = ref(null)`; //本质是 `reactive({value:null})`, vue3 中没有$和 refs

### watch

> 参数 immediate 控制立刻执行，deep 开启深度侦听
> immediate 在侦听器创建时立即出发回调，响应式数据变化之后继续执行回调
> watch 监听的 ref 对象默认是浅层侦听的，直接修改嵌套的对象属性不会触发回调执行，需要开启 deep

**监听复杂类型**

1. **监听整个对象** `watch(obj, (newValue, oldValue) => {})`

- 第一个参数是直接传入要监听的对象。当监听整个对象时，只要这个对象(无论层级)有任何修改，那么就会触发 watch 方法

2. **监听对象中的某个属性** `watch(() => obj.name, (newValue, oldValue) => { })`

- 只有当 obj 对象的 name 属性发生变更时，才会触发 watch 方法，其他属性变更不会触发 watch 方法

3. **只监听对象的子属性** `watch(() => ({ ...obj }), (newValue, oldValue) => { })`

- 只有当 obj 的**子属性**发生变更时才会触发 watch 方法。孙属性，曾孙属性... 发生变更都不会触发 watch 方法。修改 obj.xxx.name 时是不会触发 watch 方法的。

4. **监听对象的所有属性** `watch(() => obj, (newValue, oldValue) => { }, { deep: true })`

- 相当于监听整个对象。但是实现方式与上面第 1 种是不一样的，这里可以看到，第一个参数是**箭头函数**，并且还多了第三个参数 `{ deep: true }`

5. **组合监听** `watch([() => obj.name, nums], ([newName, newNums], [oldName, oldNums]) => { })`

- 此时的第一个参数是一个**数组**，且第二参数箭头函数的参数也是数组的形式

### defineExpose

> 默认情况下在 `<script setup>`语法糖下组件内部的属性和方法是不开放给父组件访问的，可以通过 `defineExpose` 编译宏指定哪些属性和方法容许访问
> 说明：指定 testMessage 属性可以被访问到
> ![](/images/vue3/vue3-4.png)

### provide 和 inject

>在Vue中,inject和provide是实现组件之间依赖共享。允许祖先组件通过provide提供依赖，后代组件通过inject注入依赖，实现跨组件通信。

> 顶层组件向任意的底层组件传递数据和方法，实现跨层组件通信
>
> 1. 顶层组件通过 provide 函数提供数据 `provide('key',顶层组件中的数据)`
> 2. 底层组件通过 inject 函数提供数据 `inject('key')`
> 3. 在调用 provide 函数时，第二个参数设置为 ref 对象 `provide('key',ref对象)`
> 4. 顶层组件可以向底层组件传递方法，底层组件调用方法修改顶层组件的数据 `const setCount=()=>{}; provide('key',setCount)`

>inject和provide共享的数据是否具备响应式能力？ 
- provide和inject并不会破坏Vue的响应式系统，如果传递的是响应式对象(如ref或reactive),后代组件会直接引用该响应式对象,自然具备响应式能力。
- provide 传递的是一个普通值,后代组件只是接收了该值的引用.由于这个值没有被 Vue 的响应式系统追踪，任何变更都不会触发视图更新.
- inject 和 provide 本身并不自动添加响应式能力，响应式取决于提供的值是否是响应式对象。
  
```tsx
// 为了增加 provide 值和 inject 值之间的响应性，我们可以在 provide 值时使用 ref 或 reactive。
const count = 0; // 非响应式数据
const reactiveCount = computed(() => count); // 转换为响应式
const reactiveCount = ref(count); // 创建响应式包装

const location=ref('North')
const geolocation=reactive({longitude:90})
const updateLocation=()=>{}
provide('location',location)
provide('geolocation',geolocation)
provide('updateLocation',updateLocation)  //传入一个方法
const useGeolocation=inject('geolocation')
const useLocation =inject('location')
const useUpdateLocation =inject('updateLocation')  //执行该方法，触发祖先组件方法执行，从而改变数据
// 使用readonly，数据只读
provide('location', readonly(location))
provide('geolocation', readonly(geolocation))
```
### 深入理解 inject 和 provide 的响应式特性
1. provide 的实现原理
provide 的本质是将一个键值对存储到当前组件实例的 provides 对象中。代码如下：
```tsx
function provide(key, value) {
  const instance = getCurrentInstance(); // 获取当前组件实例
  if (instance) {
    instance.provides[key] = value;
  }
}
```
其中,provides 是一个普通的 JavaScript 对象，存储所有通过 provide 提供的依赖。
2. inject 的实现原理
  inject 的本质是从当前组件的父组件中查找 provides 对象对应的值：
```tsx
function inject(key) {
  const instance = getCurrentInstance(); // 获取当前组件实例
  if (instance) {
    const parentProvides = instance.parent?.provides; // 获取父组件的 provides
    return parentProvides[key]; // 返回对应的值
  }
}
```
3. 关键点：
- `inject` 返回的是 provides[key] 中存储的值。
- 如果存储的值是响应式对象( ref 或 reactive),则后代组件可以直接享受到响应式能力。
- 如果存储的值是普通值，则后代组件接收的只是一个静态引用。
4. 核心
inject 和 provide 本身不负责响应式：
- 它们只是用来传递依赖，是否具备响应式能力取决于提供的值。
- 如果提供的是响应式对象，后代组件也能享受响应式能力。
- 如果提供的是普通值，后代组件将无法响应变化。
