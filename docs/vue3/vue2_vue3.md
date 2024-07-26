# [Vue 2 升级 Vue 3 ](https://juejin.cn/post/7221425945240141879)

Vue.js 在前端技术中的地位日益重要。随着 Vue 3 的推出，我们需要了解如何将 Vue 2 项目平滑地升级到 Vue 3。本文将详细介绍如何将 Vue 2 项目升级到 Vue 3，帮助同学们更好地掌握 Vue 3 的新特性和改进。

## 为什么需要升级到 Vue 3？

Vue 3 相较于 Vue 2 有哪些新特性和改进？这些新特性和改进又为什么值得我们去升级呢？在这里，让我们简单概括一下：

- **_更快的渲染速度_**

Vue 3 中使用了 Proxy 对象，使得数据监听更加高效，提高了渲染速度。同时，Vue 3 还引入了静态 Tree-Shaking 技术，可以在编译阶段进行优化，减少运行时的代码量，从而进一步提高了性能。

比如，在 Vue 2 中，当我们修改组件的 props 或者 data 时，整个组件都会重新渲染，包括子组件。而在 Vue 3 中，只会重新渲染修改的部分，从而提高了渲染效率。

- **_更小的体积_**

  Vue 3 的核心库体积比 Vue 2 减少了 30% 左右。这得益于 Vue 3 的模块化设计，可以根据需求进行按需加载。同时，Vue 3 使用了更加先进的 Tree-Shaking 技术，可以在编译阶段进行优化，减少运行时的代码量。

- **_更好的 TypeScript 支持_**

  Vue 3 的类型定义更完善，支持更多的 TypeScript 特性。比如，Vue 3 中支持 Prop 类型推断，能够自动推断出组件 props 的类型，并进行检查。此外，Vue 3 还增加了一些新的 API，如 defineComponent 和 FunctionalComponent 等，可以更方便地使用 TypeScript 来编写 Vue 组件。

- **_更好的组合式 API_**

  Vue 3 提供了更灵活、更易用的组合式 API，使得代码更易于维护和阅读。组合式 API 允许我们将逻辑相关的代码封装到一个函数中，从而提高代码的可读性和可维护性。

  在 Vue 2 中，我们通常使用 mixins 或者 render props 等方式来实现复用逻辑。而在 Vue 3 中，我们可以使用组合式 API 来实现类似的功能。比如，我们可以将复用的逻辑封装到一个函数中，然后在组件内使用 setup 函数进行调用。

- **_更好的性能监控和调试工具_**

  Vue 3 提供了更好的性能监控和调试工具，帮助我们更好地排查问题、分析性能瓶颈。同时，Vue 3 还提供了新的警告机制，以及更友好的错误信息提示，在排查问题时非常实用。

## 升级流程

将 Vue 2 项目升级到 Vue 3 分为以下几个步骤：

- Step1：确认升级条件
  在升级之前，我们需要先进行一些准备工作：

确认当前项目是否可以升级。有些第三方库可能不兼容 Vue 3，需要等待它们更新。
确保项目中没有使用过 $refs，因为 Vue 3 移除了在模板中动态设置 ref 的能力，只允许在 setup() 函数中使用 ref() 函数。
确保项目中没有使用被 Vue 3 移除的 APIs 和全局属性。

- Step2：备份代码
  在进行升级之前，我们需要先备份代码。备份代码可以帮助我们在升级过程中出现问题时快速恢复到之前的状态。 建议将项目备份到一个新的 Git 分支或者独立的文件夹中，以便于管理和恢复。

- Step3：更新依赖
  在升级 Vue 2 到 Vue 3 时，我们需要先更新项目中使用的依赖。具体操作如下：

更新 Vue 依赖
在 package.json 文件中，将 Vue 的版本改为 ^3.0.0，然后运行 npm install 命令进行安装。

```tsx
"dependencies": {
"vue": "^3.0.0"
}
```

还可以使用 Vue CLI 来创建全新的 Vue.js 项目。 Vue CLI 是 Vue.js 官方提供的一个脚手架工具，可以帮助我们快速创建 Vue.js 项目，并自动配置 Webpack 等相关工具。在创建 Vue.js 项目时，可以使用以下命令：

vue create my-project
接着，会出现一个提示，询问我们要使用哪个预设选项。在这里，我们需要选择“Manually select features”手动选择需要的功能，然后勾选“Babel”、“Router”、“Vuex”等插件，最后选择“Vue 3.x (Preview)”作为 Vue.js 的版本。

通过这种方式，我们就可以快速创建一个基于 Vue.js 3.0 的项目，并进行开发。

新项目或者 Vuex 逻辑简单，建议直接使用 Pinia，Vite 更是值得一试，在打包方面带来极致的开发体验。

更新其他相关依赖
在 package.json 文件中，将其他相关依赖的版本号更新至最新稳定版本。

同时，还要注意一些常用的第三方库是否支持 Vue 3，并对其进行更新。比如，vue-router 和 vuex 都有对应的 Vue 3 版本。

```tsx
"dependencies": {
"vue-router": "^4.0.0-0",
"vuex": "^4.0.0-0"
}
```

新项目或者 Vuex 逻辑简单，建议直接使用 Pinia。

Step4：更新代码
在更新依赖后，我们需要对项目中的代码进行更新。具体操作如下：

更新组件注册方式
在 Vue 2 中，我们通常使用 Vue.component() 方法进行组件注册，而在 Vue 3 中，推荐使用 app.component() 方法进行组件注册。具体步骤如下： 原先的组件注册代码：

```tsx
Vue.component("my-component", {
  // ...
})
// 改为：

import { createApp } from "vue"
import MyComponent from "./MyComponent.vue"

const app = createApp({})
app.component("my-component", MyComponent)
```

更新钩子函数
在 Vue 2 中，我们可以使用以下钩子函数：

```tsx
export default {
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
}
```

而在 Vue 3 中，一些钩子函数已经被移除，如 beforeCreate 和 beforeMount。同时，也新增了一些钩子函数，如 onBeforeMount 和 onUnmounted。具体变化如下：

| Vue 2         | Vue 3         |
| ------------- | ------------- |
| beforeCreate  | setup         |
| beforeMount   | -             |
| beforeUpdate  | -             |
| beforeDestroy | unmounted     |
| activated     | onActivated   |
| deactivated   | onDeactivated |

更新过滤器
在 Vue 3 中，过滤器已经被移除，推荐使用计算属性或者方法替代。比如原先的代码：

```tsx
Vue.filter('reverse', function (value) {
return value.split('').reverse().join('')
})
// 可以改为：

computed: {
reversedValue() {
return this.value.split('').reverse().join('')
}
}
```

更新 v-for 中的 Ref 数组
在 Vue 2 中，使用 v-for 的 ref 属性会在相应的 $refs 属性中填充 ref 数组。然而，当使用嵌套的 v-for 时，这种行为会变得不明确且效率低下。 而在 Vue 3 中，这样的用法将不再在 $ref 中自动创建数组。如果要从单个绑定中获取多个 ref，请将 ref 绑定到一个更灵活的函数上(这是一个新特性)：

```tsx
<div v-for="item in list" :ref="setItemRef"></div>
export default {
  data() {
    return {
      itemRefs: []
    }
  },
  methods: {
    setItemRef(el) {
      this.itemRefs.push(el)
    }
  },
  beforeUpdate() {
    this.itemRefs = []
  },
  updated() {
    console.log(this.itemRefs)
  }
}
import { ref, onBeforeUpdate, onUpdated } from 'vue'

export default {
setup() {
let itemRefs = []
const setItemRef = el => {
itemRefs.push(el)
}
onBeforeUpdate(() => {
itemRefs = []
})
onUpdated(() => {
console.log(itemRefs)
})
return {
itemRefs,
setItemRef
}
}
}
```

itemRefs 可以是对象，其 ref 会通过迭代的 key 被设置。 如果需要，itemRef 也可以是响应式的且可以被监听。

更新函数式组件
Vue 3 中的函数式组件需要用 defineComponent 函数来定义，并使用 setup 函数来声明组件的逻辑：

```tsx
import { defineComponent } from "vue"

export default defineComponent({
  name: "MyFunctionalComponent",
  props: ["msg"],
  setup(props) {
    return () => {
      return h("div", props.msg)
    }
  },
})
```

其中，h 是创建虚拟节点的函数，不再像 Vue 2 中默认导入，需要手动从 vue 包中引入：

`import { defineComponent, h } from 'vue';`
在 setup 函数中，我们可以直接返回一个渲染函数，并使用 props 参数来访问传入的属性值。 注意，在 Vue 3 中，函数式组件必须使用 defineComponent 来定义，否则会被视为普通组件而报错。

更新异步组件
异步组件是指在需要使用某个组件时才会被加载，而不是在页面初始化时就加载所有组件。在 Vue 2 中，我们可以通过 Vue.component() 和 import() 来定义和引入异步组件。然而，在 Vue 3 中，这些方法已经被废弃，取而代之的是新的 defineAsyncComponent() 和 import() 函数。

下面是一个栗子，展示了异步组件如何从 Vue 2 迁移到 Vue 3：

```tsx
// Vue 2
Vue.component('my-component', () => import('./MyComponent.vue'))

// Vue 3
const MyComponent = defineAsyncComponent(() => import('./MyComponent.vue'))
在 Vue 3 中，我们不再需要使用 Vue.component() 来定义组件，而是使用 defineAsyncComponent() 函数来定义异步组件。该函数接受一个返回 Promise 对象的函数作为参数，这个 Promise 对象最终会 resolve 为一个组件定义。

除了上述变化外，Vue 3 还提供了一些其他功能来优化异步组件的性能。例如，Vue 3 可以将异步组件缓存起来，避免重复加载；它还可以将异步组件视为 Suspense 的一部分，从而更好地管理组件之间的加载顺序和错误处理。

更新组件通讯
在 Vue.js 2.x 版本中，组件通讯主要通过 props、emit、parent/$children、provide/inject 等方式实现。但是，在 Vue.js 3.x 版本中，组件通讯方式有了一些变化。

首先，Vue.js 3.x 版本中使用 Composition API 代替了 Options API。Composition API 是一种全新的 API，它允许开发者将功能逻辑封装在组合函数中，这些组合函数可以被多个组件共享。在 Vue.js 3.x 版本中，setup() 函数是组件中的入口函数，它返回一个对象，其中包括组件所需的所有响应式状态和方法。

其次，在 Vue.js 3.x 版本中引入了 Teleport 组件，它可以帮助我们更好地处理跨组件的元素传送问题。Teleport 组件可以将一个组件的内容传送到 DOM 树的另一个位置。例如，在某些情况下，我们需要在组件外部渲染一个菜单，并且需要将菜单与组件进行绑定。此时，我们可以使用 Teleport 组件来实现这个功能。

Vue.js 3.x 版本还引入了一个新的 API emits，它允许开发者在组件中声明其所发出的所有事件，这样可以帮助我们更好地管理组件之间的通信。与 Vue.js 2.x 版本不同，现在我们需要在组件的选项中明确声明该组件可发出的所有事件。这样做有助于提高代码的可读性和维护性。

Vue.js 3.x 版本也将 provide/inject API 进行了一些改进。在 Vue.js 2.x 版本中，provide/inject API 是一种父子组件之间进行依赖注入的方式。但是，在 Vue.js 3.x 版本中，provide/inject API 现在也支持跨组件依赖注入，并且提供了更好的类型检查机制。

更新过度效果的 class 名
/_ Vue 2 _/
.v-enter,
.v-leave-to {
opacity: 0;
}

.v-leave,
.v-enter-to {
opacity: 1;
}

/_ Vue 3 _/
.v-enter-from,
.v-leave-to {
opacity: 0;
}

.v-leave-from,
.v-enter-to {
opacity: 1;
}
&lt;transition> 组件相关属性名也发生了变化：

leave-class 已经被重命名为 leave-from-class (在渲染函数或 JSX 中可以写为：leaveFromClass)
enter-class 已经被重命名为 enter-from-class (在渲染函数或 JSX 中可以写为：enterFromClass)
更新/升级 Watch
在 Vue 3 中，watch 这个 API 与 Vue 2 有所不同，它在语法和用法上进行了改动。为了让代码更加清晰、简洁，我们需要对 watch 进行升级。

Vue 2 中的 Watch
在 Vue 2 中，我们可以使用以下方式来监听一个变量：

data() {
return {
message: 'Hello, World!'
}
},
watch: {
message(newValue, oldValue) {
console.log('New Value:', newValue)
console.log('Old Value:', oldValue)
}
}
我们要在 watch 选项中定义一个函数，并通过该函数来监听数据变化。这种方式比较繁琐，而且不够直观。

Vue 3 中的 Watch
在 Vue 3 中，我们可以使用新的 watchEffect API 来监听一个变量：

import { watchEffect } from 'vue'

setup() {
const message = ref('Hello, World!')

watchEffect(() => {
console.log('Value:', message.value)
})

return {
message
}
}
我们可以使用 watchEffect API 来监听响应式变量。我们只需将变量放在 watchEffect 函数中即可，Vue 会自动追踪变量的依赖，并在变量发生变化时重新运行该函数。这就相当于将 Vue 2 的 watch 选项和 computed 选项合并到了一起。

监听多个变量
在 Vue 3 中，我们可以使用 watch 函数来监听多个变量：

import { watch } from 'vue'

setup() {
const message = ref('Hello, World!')
const name = ref('Vue 3')

watch([message, name], ([newVal1, newVal2], [oldVal1, oldVal2]) => {
console.log('Message:', newVal1, oldVal1)
console.log('Name:', newVal2, oldVal2)
})

return {
message,
name
}
}
在 Vue 3 中，我们可以将多个响应式变量放在一个数组中传递给 watch 函数。当其中任意一个变量发生变化时，watch 函数都会重新运行。与 Vue 2 不同的是，在 Vue 3 中，watch 函数需要接收两个参数：新值和旧值。

懒执行
在 Vue 3 中，我们可以通过将 lazy 选项设置为 true 来使 watchEffect 函数变为懒执行：

import { watchEffect } from 'vue'

setup() {
const message = ref('Hello, World!')

watchEffect(
() => console.log(message.value),
{ lazy: true }
)

return {
message
}
}
在 Vue 3 中，我们可以通过将 lazy 选项设置为 true 来使 watchEffect 函数变为懒执行。这意味着只有在依赖项发生变化时才会运行该函数。

取消监听
在 Vue 3 中，我们可以通过调用 watchEffect 函数返回的句柄来取消监听：

import { watchEffect } from 'vue'

setup() {
const message = ref('Hello, World!')

const stop = watchEffect(() => console.log(message.value))

stop()

return {
message
}
}
在 Vue 3 中，我们可以通过调用 watchEffect 函数返回的句柄来取消监听。这意味着当我们不再需要监听变量时，可以随时停止监听。

在 Vue 3 中，watch API 进行了升级，语法和用法都比 Vue 2 更为直观、简洁。我们可以使用 watchEffect 函数来监听响应式变量，并使用 watch 函数来监听多个变量。而且，在 Vue 3 中，我们还可以将 watchEffect 函数变为懒执行，并且随时取消。

小拓展： Watch 和 WatchEffect 的区别

更新全局属性挂载
在 Vue 2 中，我们可以很方便地将属性或方法挂载到 Vue 实例上，以便在组件中进行全局访问。但是，在 Vue 3 中，由于架构的变化，这种方法已经被淘汰了。现在，我们需要使用新的 API 和技巧来实现类似的功能。

Vue 2 中的全局属性挂载
在 Vue 2 中，我们可以通过 Vue.prototype 来挂载属性、方法、甚至是插件，以便在组件中进行全局访问。

// main.js
import Vue from 'vue'
import App from './App.vue'

Vue.prototype.$appName = 'MyApp'

new Vue({
render: h => h(App),
}).$mount('#app')
在上面的代码中，我们将 appName 属性挂载到 Vue 原型上，并将其设置为 MyApp。因此，在应用程序中的任何组件中，我们都可以通过 this.appName 来访问它：

<template>
  <div>{{ $appName }}</div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$appName) // 'MyApp'
  }
}
</script>

虽然这种方法非常简单易用，但在 Vue 3 中已不再适用。

Vue 3 中的全局属性挂载
在 Vue 3 中，Vue.prototype 已经被删除，而且在组件内部也不再支持 this.$property 语法。所以我们需要使用其他技巧来实现类似的功能。

一种替代方法是使用 provide/inject。在父级组件中，我们可以提供一个属性或方法，并通过 inject 注入到子组件中。

// main.js
import { createApp, provide } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.provide('appName', 'MyApp')

app.mount('#app')
在上面的代码中，我们使用 createApp 方法创建 Vue 应用程序实例，并使用 provide 方法将 appName 属性提供给它。现在，在任何后代组件中，我们都可以使用 inject 来访问它：

<template>
  <div>{{ appName }}</div>
</template>

<script>
import { inject } from 'vue'

export default {
  setup() {
    const appName = inject('appName')
    console.log(appName) // 'MyApp'

    return {
      appName
    }
  }
}
</script>

虽然这种方法看起来有些麻烦，但它确实提供了更好的可维护性和灵活性。在大型应用程序中，我们可以使用这种方法来传递多个属性和方法，并且可以在各个组件之间轻松地进行更改和更新。

尽管这些方法可能会比 Vue 2 中的简单方法更加复杂，但它们确实提供了更好的可维护性和灵活性，特别是在大型应用程序中。

更新/升级 Slot
Vue 2 中的插槽有两种类型：作用域插槽（scoped slot）和普通插槽（slot）。在 Vue 3 中，这两个概念被统一成了一个新的类型：< slot> 元素。

首先，让我们来看一下 Vue 2 中普通插槽的用法：

<!-- parent component -->
<div>
  <slot></slot>
</div>

<!-- child component -->
<template>
  <div>
    <h1>Child Component</h1>
    <p>This will be inserted into the parent's slot</p>
  </div>
</template>
在上面的代码中，父组件包含一个 &lt;slot>` 元素，它允许子组件将内容插入到该元素中。子组件可以像这样使用该插槽：

<template>
  <parent-component>
    <h2>Inserted Content</h2>
  </parent-component>
</template>
在 Vue 3 中，   `&lt; slot >`   元素仍然存在，但是它不再具有作用域功能。相反，你需要使用 v-bind 指令来传递 props 到插槽内容中。

<!-- parent component -->
<div>
  <slot msg="Hello from Parent"></slot>
</div>

<!-- child component -->
<template>
  <div>
    <h1>Child Component</h1>
    <p>{{ $slots.default({msg: 'Hello from Child'}) }}</p>
  </div>
</template>
在上面的代码中，父组件将一个名为 msg 的 props 传递给了插槽。子组件使用 $slots.default 访问该插槽，并将一个对象作为参数传递给它。

父组件和子组件都可以访问 msg 这个 prop。在父组件中，你可以这样访问：

<template>
  <parent-component>
    <template #default="slotProps">
      <h2>{{ slotProps.msg }}</h2>
    </template>
  </parent-component>
</template>
在子组件中，你可以这样访问：

<template>
  <div>
    <h1>Child Component</h1>
    <p>{{ $slots.default({msg: 'Hello from Child'}) }}</p>
  </div>
</template>
需要注意的是，在 Vue 3 中，你必须使用具名插槽（named slot）来传递 props 到插槽内容中。如果你没有给插槽命名，那么在实践中就会出现问题。

在 Vue 3 中，插槽的用法发生了变化。你需要使用 < slot> 元素来定义插槽，并使用 v-bind 指令传递 props 到插槽内容中。需要注意的是，你必须使用具名插槽来传递 props，否则会出现问题。

更新/升级 v-model
在 Vue 2 中，v-model 是一个非常有用的指令，它允许我们在表单元素中创建双向绑定。而在 Vue 3 中，v-model 指令经过了很多改进和升级。

一些重要的改变包括：

组件 v-model 默认行为
在 Vue 2 中，使用 v-model 需要在组件中明确定义 prop 和事件。而在 Vue 3 中，组件的 v-model 默认行为被彻底重构了。

现在，如果在组件上使用 v-model 指令，Vue 会自动推断出默认的 prop 和事件，并且将它们用于双向绑定。这意味着在许多情况下，你不再需要在组件中手动定义 prop 和事件。

例如，如果你有一个名为 MyComponent 的组件并想使用 v-model 实现双向绑定，那么你只需在组件上添加 v-model 即可：

`<my-component v-model="myData" />`
在这个栗子中，Vue 会自动将 myData 作为 prop 和 update:modelValue 事件用于双向绑定。

自定义 v-model 修饰符
在 Vue 2 中，可以使用 v-model 指令的修饰符来更改绑定的值。而在 Vue 3 中，你还可以创建自定义 v-model 修饰符。

例如，假设你有一个名为 trim 的自定义修饰符，用于删除表单输入的前导和尾随空格。在 Vue 3 中，你可以将这个修饰符添加到 v-model 指令中，以便自动应用该修饰符：

`<input v-model.trim="myData" />`
v-model 绑定多个值
在 Vue 2 中，v-model 只能绑定一个值。而在 Vue 3 中，你可以使用 v-model 来同时绑定多个值。

例如，假设你有一个名为 myData 的对象，其中包含名字和年龄两个属性。你可以使用 v-model 指令来同时绑定这两个属性：

`<input v-model:name="myData.name" v-model:age="myData.age" />`
在这个栗子中，name 和 age 是 v-model 指令的自定义修饰符，用于指定要绑定的属性名称。

Vue 3 中的 v-model 指令经过了很多改进，这些改进使得双向绑定更加强大且易于使用。

更新 Vue Router
Vue 3 中没有 $route 和 $router 对象，而是使用 useRouter() 和 useRoute() 函数来获取当前的路由信息。因此，在路由文件中需要做出如下修改：

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
history: createWebHistory(),
routes: [
// 路由规则
]
})

export default router
在组件中使用 $route 和 $router 时，需要修改为使用 useRoute() 和 useRouter() 获取当前的路由信息和路由对象。例如：

import { useRoute, useRouter } from 'vue-router'

export default {
setup() {
const route = useRoute()
const router = useRouter()

    // 使用 route 和 router 对象

}
}
更新 Vuex
Vuex 4 中使用 createStore() 函数来创建 Store 实例，同时在 setup 函数中使用 useStore() 函数获取 Store 对象。因此，在 store 文件中需要做出如下修改：

import { createStore } from 'vuex'

const store = createStore({
state: {
// 状态数据
},
mutations: {
// 修改状态的方法
},
actions: {
// 异步操作
},
modules: {
// 子模块
}
})

export default store
在组件中使用 Vuex 时，需要使用 useStore() 函数获取 Store 对象。例如：

import { useStore } from 'vuex'

export default {
setup() {
const store = useStore()

    // 使用 store 对象

}
}
更新/升级 Pinia
Vue 2 中的 Vuex 是 Vue.js 官方提供的状态管理工具，而 Vue 3 推荐使用 Pinia 作为状态管理库。在将 Vue 2 的 Vuex 升级为 Vue 3 的 Pinia 时，需要了解 Pinia 的 API 和一些概念。以下是一些步骤和注意事项：

安装 Pinia
在项目目录下运行以下命令来安装 Pinia：

npm install pinia
创建 Pinia 实例
在 src 目录下创建一个名为 store.js 的文件，并创建一个名为 createStore 的函数，用于创建 Pinia 实例。该函数应返回一个带有所有模块的对象。

import { createPinia } from 'pinia'

const store = createPinia()

export function createStore() {
return store
}
重构模块文件
对于每个 Vuex 模块，在单独的文件中定义一个对象，该对象包含状态、操作、getters 等属性。在这些对象中使用 defineStore 函数替换原有的 Vuex.Store 构造函数，详细参数的使用方法可以参考官方文档。

import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
id: 'counter',
state: () => ({
count: 0
}),
actions: {
increment() {
this.count++
},
decrement() {
this.count--
}
},
getters: {
doubleCount() {
return this.count \* 2
}
}
})
导入和使用 store
在 main.js 中导入 createStore 函数，并在 Vue 根实例中使用它。可以使用 app.config.globalProperties.$store 将 Pinia 实例挂载到全局，以便于在组件中访问。

import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from './store'

const app = createApp(App)

// 注册 Pinia 实例
app.use(createStore())

// 挂载 Pinia 实例到全局
app.config.globalProperties.$store = store

app.mount('#app')
组件中使用 Pinia
在组件中可以通过 useStore() 函数来获取 Pinia 实例。然后可以像 Vuex 一样使用状态、操作、getters 等属性。

import { useStore } from 'pinia'

export default {
setup() {
const store = useStore()

// 获取状态
const count = store.state.count

// 调用操作
store.actions.increment()

// 计算属性
const doubleCount = store.getters.doubleCount

return {
count,
doubleCount
}
}
}
Step5：测试和调试
升级完成后，我们需要对项目进行测试和调试，以确保项目在新版本的 Vue 中能够正常运行 。具体操作如下：

运行项目，查看是否有报错信息。
在运行项目时，需要关注控制台中是否有报错信息。如果有报错信息，需要逐一排查并解决问题。

针对性测试项目中的组件和功能。
在升级完成后，可以对项目中常用的功能进行针对性测试，确保能够正常运行。比如，我们可以测试路由、Vuex 状态管理、表单验证等功能。

使用 Vue Devtools 进行调试。
Vue Devtools 是一款非常实用的调试工具，可以帮助我们更好地理解项目中的数据流动和组件结构。在升级完成后，我们可以使用 Vue Devtools 对项目进行调试，以便于发现问题和优化代码。

Step6：更新文档和注释
在升级完成后，我们还需要更新项目中的文档和注释，以确保其他开发人员能够快速了解项目的变化和特性。

建议在代码中加入详细的注释，包括组件的用途、函数的参数和返回值等信息。同时，也要及时更新项目中的文档，以便于其他人员可以快速上手。

总结
Vue 3 的推出为前端开发者带来了更多的可能性。通过本文的介绍，我们可以清晰地了解到 Vue 3 相较于 Vue 2 的新特性和改进，以及如何将 Vue 2 项目升级到 Vue 3。

在升级过程中，我们需要先确认升级条件、备份代码并更新依赖。然后，对项目中的代码进行更新，并进行测试和调试。最后，我们还需要更新文档和注释，以便于其他开发人员能够快速了解项目的变化和特性。

Vue 3 的升级需要谨慎对待，但也是值得尝试的。希望本文的介绍可以帮助大家更好地掌握升级方法和技巧，从而在项目早日迁移到 Vue 3 上享受更多的优势。

文中列举的更新栗子都是目前在升级项目中接触到的，若对 Vue 2 升级 Vue 3 其它升级方面感兴趣的可以分享交流，我也会同步更新此文档。

[gogocode](https://gogocode.io/zh/docs/vue/element-ui-to-element-plus)

```

```

```
