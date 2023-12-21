import{_ as t,r as e,o as p,c as o,a as n,d as s,b as c,e as i}from"./app-lzSeYDl-.js";const l={},u={id:"vue-2-升级-vue-3",tabindex:"-1"},r=n("a",{class:"header-anchor",href:"#vue-2-升级-vue-3","aria-hidden":"true"},"#",-1),d={href:"https://juejin.cn/post/7221425945240141879",target:"_blank",rel:"noopener noreferrer"},k=i(`<p>Vue.js 在前端技术中的地位日益重要。随着 Vue 3 的推出，我们需要了解如何将 Vue 2 项目平滑地升级到 Vue 3。本文将详细介绍如何将 Vue 2 项目升级到 Vue 3，帮助同学们更好地掌握 Vue 3 的新特性和改进。</p><p>为什么需要升级到 Vue 3？ Vue 3 相较于 Vue 2 有哪些新特性和改进？这些新特性和改进又为什么值得我们去升级呢？在这里，让我们简单概括一下：</p><p>更快的渲染速度 Vue 3 中使用了 Proxy 对象，使得数据监听更加高效，提高了渲染速度。同时，Vue 3 还引入了静态 Tree-Shaking 技术，可以在编译阶段进行优化，减少运行时的代码量，从而进一步提高了性能。</p><p>比如，在 Vue 2 中，当我们修改组件的 props 或者 data 时，整个组件都会重新渲染，包括子组件。而在 Vue 3 中，只会重新渲染修改的部分，从而提高了渲染效率。</p><p>更小的体积 Vue 3 的核心库体积比 Vue 2 减少了 30% 左右。这得益于 Vue 3 的模块化设计，可以根据需求进行按需加载。同时，Vue 3 使用了更加先进的 Tree-Shaking 技术，可以在编译阶段进行优化，减少运行时的代码量。</p><p>更好的 TypeScript 支持 Vue 3 的类型定义更完善，支持更多的 TypeScript 特性。比如，Vue 3 中支持 Prop 类型推断，能够自动推断出组件 props 的类型，并进行检查。此外，Vue 3 还增加了一些新的 API，如 defineComponent 和 FunctionalComponent 等，可以更方便地使用 TypeScript 来编写 Vue 组件。</p><p>更好的组合式 API Vue 3 提供了更灵活、更易用的组合式 API，使得代码更易于维护和阅读。组合式 API 允许我们将逻辑相关的代码封装到一个函数中，从而提高代码的可读性和可维护性。</p><p>在 Vue 2 中，我们通常使用 mixins 或者 render props 等方式来实现复用逻辑。而在 Vue 3 中，我们可以使用组合式 API 来实现类似的功能。比如，我们可以将复用的逻辑封装到一个函数中，然后在组件内使用 setup 函数进行调用。</p><p>更好的性能监控和调试工具 Vue 3 提供了更好的性能监控和调试工具，帮助我们更好地排查问题、分析性能瓶颈。同时，Vue 3 还提供了新的警告机制，以及更友好的错误信息提示，在排查问题时非常实用。</p><p>升级流程 将 Vue 2 项目升级到 Vue 3 分为以下几个步骤：</p><p>Step1：确认升级条件 在升级之前，我们需要先进行一些准备工作：</p><p>确认当前项目是否可以升级。有些第三方库可能不兼容 Vue 3，需要等待它们更新。 确保项目中没有使用过 $refs，因为 Vue 3 移除了在模板中动态设置 ref 的能力，只允许在 setup() 函数中使用 ref() 函数。 确保项目中没有使用被 Vue 3 移除的 APIs 和全局属性。 Step2：备份代码 在进行升级之前，我们需要先备份代码。备份代码可以帮助我们在升级过程中出现问题时快速恢复到之前的状态。 建议将项目备份到一个新的 Git 分支或者独立的文件夹中，以便于管理和恢复。</p><p>Step3：更新依赖 在升级 Vue 2 到 Vue 3 时，我们需要先更新项目中使用的依赖。具体操作如下：</p><p>更新 Vue 依赖 在 package.json 文件中，将 Vue 的版本改为 ^3.0.0，然后运行 npm install 命令进行安装。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token string-property property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token string-property property">&quot;vue&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.0.0&quot;</span>
<span class="token punctuation">}</span>
还可以使用 Vue <span class="token constant">CLI</span> 来创建全新的 Vue<span class="token punctuation">.</span>js 项目。 Vue <span class="token constant">CLI</span> 是 Vue<span class="token punctuation">.</span>js 官方提供的一个脚手架工具，可以帮助我们快速创建 Vue<span class="token punctuation">.</span>js 项目，并自动配置 Webpack 等相关工具。在创建 Vue<span class="token punctuation">.</span>js 项目时，可以使用以下命令：

vue create my<span class="token operator">-</span>project
接着，会出现一个提示，询问我们要使用哪个预设选项。在这里，我们需要选择“Manually select features”手动选择需要的功能，然后勾选“Babel”、“Router”、“Vuex”等插件，最后选择“Vue <span class="token number">3.</span><span class="token function">x</span> <span class="token punctuation">(</span>Preview<span class="token punctuation">)</span>”作为 Vue<span class="token punctuation">.</span>js 的版本。

通过这种方式，我们就可以快速创建一个基于 Vue<span class="token punctuation">.</span>js <span class="token number">3.0</span> 的项目，并进行开发。

新项目或者 Vuex 逻辑简单，建议直接使用 Pinia，Vite 更是值得一试，在打包方面带来极致的开发体验。

更新其他相关依赖
在 <span class="token keyword">package</span><span class="token punctuation">.</span>json 文件中，将其他相关依赖的版本号更新至最新稳定版本。

同时，还要注意一些常用的第三方库是否支持 Vue <span class="token number">3</span>，并对其进行更新。比如，vue<span class="token operator">-</span>router 和 vuex 都有对应的 Vue <span class="token number">3</span> 版本。

<span class="token string-property property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token string-property property">&quot;vue-router&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.0.0-0&quot;</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;vuex&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.0.0-0&quot;</span>
<span class="token punctuation">}</span>
新项目或者 Vuex 逻辑简单，建议直接使用 Pinia。

Step4：更新代码
在更新依赖后，我们需要对项目中的代码进行更新。具体操作如下：

更新组件注册方式
在 Vue <span class="token number">2</span> 中，我们通常使用 Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法进行组件注册，而在 Vue <span class="token number">3</span> 中，推荐使用 app<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法进行组件注册。具体步骤如下： 原先的组件注册代码：

Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;my-component&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
<span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
改为：

<span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> MyComponent <span class="token keyword">from</span> <span class="token string">&#39;./MyComponent.vue&#39;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;my-component&#39;</span><span class="token punctuation">,</span> MyComponent<span class="token punctuation">)</span>
更新钩子函数
在 Vue <span class="token number">2</span> 中，我们可以使用以下钩子函数：

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
<span class="token function">beforeCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token function">beforeMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token function">beforeUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token function">updated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token function">beforeDestroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token function">destroyed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
而在 Vue <span class="token number">3</span> 中，一些钩子函数已经被移除，如 beforeCreate 和 beforeMount。同时，也新增了一些钩子函数，如 onBeforeMount 和 onUnmounted。具体变化如下：

Vue <span class="token number">2</span> Vue <span class="token number">3</span>
beforeCreate setup
beforeMount <span class="token operator">-</span>
beforeUpdate <span class="token operator">-</span>
beforeDestroy unmounted
activated onActivated
deactivated onDeactivated
更新过滤器
在 Vue <span class="token number">3</span> 中，过滤器已经被移除，推荐使用计算属性或者方法替代。比如原先的代码：

Vue<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token string">&#39;reverse&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">return</span> value<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
可以改为：

computed<span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token function">reversedValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
更新 v<span class="token operator">-</span><span class="token keyword">for</span> 中的 Ref 数组
在 Vue <span class="token number">2</span> 中，使用 v<span class="token operator">-</span><span class="token keyword">for</span> 的 ref 属性会在相应的 $refs 属性中填充 ref 数组。然而，当使用嵌套的 v<span class="token operator">-</span><span class="token keyword">for</span> 时，这种行为会变得不明确且效率低下。 而在 Vue <span class="token number">3</span> 中，这样的用法将不再在 $ref 中自动创建数组。如果要从单个绑定中获取多个 ref，请将 ref <span class="token function">绑定到一个更灵活的函数上</span><span class="token punctuation">(</span>这是一个新特性<span class="token punctuation">)</span>：

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item in list<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>setItemRef<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      itemRefs<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">setItemRef</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>itemRefs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">beforeUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>itemRefs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">updated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>itemRefs<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> onBeforeUpdate<span class="token punctuation">,</span> onUpdated <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
<span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">let</span> itemRefs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> <span class="token function-variable function">setItemRef</span> <span class="token operator">=</span> el <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
itemRefs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">onBeforeUpdate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
itemRefs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">onUpdated</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>itemRefs<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">return</span> <span class="token punctuation">{</span>
itemRefs<span class="token punctuation">,</span>
setItemRef
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
itemRefs 可以是对象，其 ref 会通过迭代的 key 被设置。 如果需要，itemRef 也可以是响应式的且可以被监听。

更新函数式组件
Vue <span class="token number">3</span> 中的函数式组件需要用 defineComponent 函数来定义，并使用 setup 函数来声明组件的逻辑：

<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
name<span class="token operator">:</span> <span class="token string">&#39;MyFunctionalComponent&#39;</span><span class="token punctuation">,</span>
props<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;msg&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token function">setup</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
<span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span> props<span class="token punctuation">.</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
其中，h 是创建虚拟节点的函数，不再像 Vue <span class="token number">2</span> 中默认导入，需要手动从 vue 包中引入：

<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent<span class="token punctuation">,</span> h <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
在 setup 函数中，我们可以直接返回一个渲染函数，并使用 props 参数来访问传入的属性值。 注意，在 Vue <span class="token number">3</span> 中，函数式组件必须使用 defineComponent 来定义，否则会被视为普通组件而报错。

更新异步组件
异步组件是指在需要使用某个组件时才会被加载，而不是在页面初始化时就加载所有组件。在 Vue <span class="token number">2</span> 中，我们可以通过 Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 和 <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 来定义和引入异步组件。然而，在 Vue <span class="token number">3</span> 中，这些方法已经被废弃，取而代之的是新的 <span class="token function">defineAsyncComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 和 <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 函数。

下面是一个栗子，展示了异步组件如何从 Vue <span class="token number">2</span> 迁移到 Vue <span class="token number">3</span>：

<span class="token comment">// Vue 2</span>
Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;my-component&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;./MyComponent.vue&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">// Vue 3</span>
<span class="token keyword">const</span> MyComponent <span class="token operator">=</span> <span class="token function">defineAsyncComponent</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;./MyComponent.vue&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
在 Vue <span class="token number">3</span> 中，我们不再需要使用 Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 来定义组件，而是使用 <span class="token function">defineAsyncComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 函数来定义异步组件。该函数接受一个返回 <span class="token builtin">Promise</span> 对象的函数作为参数，这个 <span class="token builtin">Promise</span> 对象最终会 resolve 为一个组件定义。

除了上述变化外，Vue <span class="token number">3</span> 还提供了一些其他功能来优化异步组件的性能。例如，Vue <span class="token number">3</span> 可以将异步组件缓存起来，避免重复加载；它还可以将异步组件视为 Suspense 的一部分，从而更好地管理组件之间的加载顺序和错误处理。

更新组件通讯
在 Vue<span class="token punctuation">.</span>js <span class="token number">2</span><span class="token punctuation">.</span>x 版本中，组件通讯主要通过 props、emit、parent<span class="token operator">/</span>$children、provide<span class="token operator">/</span>inject 等方式实现。但是，在 Vue<span class="token punctuation">.</span>js <span class="token number">3</span><span class="token punctuation">.</span>x 版本中，组件通讯方式有了一些变化。

首先，Vue<span class="token punctuation">.</span>js <span class="token number">3</span><span class="token punctuation">.</span>x 版本中使用 Composition <span class="token constant">API</span> 代替了 Options <span class="token constant">API</span>。Composition <span class="token constant">API</span> 是一种全新的 <span class="token constant">API</span>，它允许开发者将功能逻辑封装在组合函数中，这些组合函数可以被多个组件共享。在 Vue<span class="token punctuation">.</span>js <span class="token number">3</span><span class="token punctuation">.</span>x <span class="token function">版本中，setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 函数是组件中的入口函数，它返回一个对象，其中包括组件所需的所有响应式状态和方法。

其次，在 Vue<span class="token punctuation">.</span>js <span class="token number">3</span><span class="token punctuation">.</span>x 版本中引入了 Teleport 组件，它可以帮助我们更好地处理跨组件的元素传送问题。Teleport 组件可以将一个组件的内容传送到 <span class="token constant">DOM</span> 树的另一个位置。例如，在某些情况下，我们需要在组件外部渲染一个菜单，并且需要将菜单与组件进行绑定。此时，我们可以使用 Teleport 组件来实现这个功能。

Vue<span class="token punctuation">.</span>js <span class="token number">3</span><span class="token punctuation">.</span>x 版本还引入了一个新的 <span class="token constant">API</span> emits，它允许开发者在组件中声明其所发出的所有事件，这样可以帮助我们更好地管理组件之间的通信。与 Vue<span class="token punctuation">.</span>js <span class="token number">2</span><span class="token punctuation">.</span>x 版本不同，现在我们需要在组件的选项中明确声明该组件可发出的所有事件。这样做有助于提高代码的可读性和维护性。

Vue<span class="token punctuation">.</span>js <span class="token number">3</span><span class="token punctuation">.</span>x 版本也将 provide<span class="token operator">/</span>inject <span class="token constant">API</span> 进行了一些改进。在 Vue<span class="token punctuation">.</span>js <span class="token number">2</span><span class="token punctuation">.</span>x 版本中，provide<span class="token operator">/</span>inject <span class="token constant">API</span> 是一种父子组件之间进行依赖注入的方式。但是，在 Vue<span class="token punctuation">.</span>js <span class="token number">3</span><span class="token punctuation">.</span>x 版本中，provide<span class="token operator">/</span>inject <span class="token constant">API</span> 现在也支持跨组件依赖注入，并且提供了更好的类型检查机制。

更新过度效果的 <span class="token keyword">class</span> <span class="token class-name">名</span>
<span class="token operator">/</span>_ Vue <span class="token number">2</span> _<span class="token operator">/</span>
<span class="token punctuation">.</span>v<span class="token operator">-</span>enter<span class="token punctuation">,</span>
<span class="token punctuation">.</span>v<span class="token operator">-</span>leave<span class="token operator">-</span>to <span class="token punctuation">{</span>
opacity<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token punctuation">.</span>v<span class="token operator">-</span>leave<span class="token punctuation">,</span>
<span class="token punctuation">.</span>v<span class="token operator">-</span>enter<span class="token operator">-</span>to <span class="token punctuation">{</span>
opacity<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">_ Vue 3 _</span><span class="token regex-delimiter">/</span></span>
<span class="token punctuation">.</span>v<span class="token operator">-</span>enter<span class="token operator">-</span>from<span class="token punctuation">,</span>
<span class="token punctuation">.</span>v<span class="token operator">-</span>leave<span class="token operator">-</span>to <span class="token punctuation">{</span>
opacity<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token punctuation">.</span>v<span class="token operator">-</span>leave<span class="token operator">-</span>from<span class="token punctuation">,</span>
<span class="token punctuation">.</span>v<span class="token operator">-</span>enter<span class="token operator">-</span>to <span class="token punctuation">{</span>
opacity<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token entity named-entity" title="&lt;">&amp;lt;</span>transition<span class="token operator">&gt;</span> 组件相关属性名也发生了变化：

leave<span class="token operator">-</span><span class="token keyword">class</span> <span class="token class-name">已经被重命名为</span> leave<span class="token operator">-</span>from<span class="token operator">-</span><span class="token keyword">class</span> <span class="token punctuation">(</span>在渲染函数或 <span class="token constant">JSX</span> 中可以写为：leaveFromClass<span class="token punctuation">)</span>
enter<span class="token operator">-</span><span class="token keyword">class</span> <span class="token class-name">已经被重命名为</span> enter<span class="token operator">-</span>from<span class="token operator">-</span><span class="token keyword">class</span> <span class="token punctuation">(</span>在渲染函数或 <span class="token constant">JSX</span> 中可以写为：enterFromClass<span class="token punctuation">)</span>
更新<span class="token operator">/</span>升级 Watch
在 Vue <span class="token number">3</span> 中，watch 这个 <span class="token constant">API</span> 与 Vue <span class="token number">2</span> 有所不同，它在语法和用法上进行了改动。为了让代码更加清晰、简洁，我们需要对 watch 进行升级。

Vue <span class="token number">2</span> 中的 Watch
在 Vue <span class="token number">2</span> 中，我们可以使用以下方式来监听一个变量：

<span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">return</span> <span class="token punctuation">{</span>
message<span class="token operator">:</span> <span class="token string">&#39;Hello, World!&#39;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
watch<span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token function">message</span><span class="token punctuation">(</span>newValue<span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;New Value:&#39;</span><span class="token punctuation">,</span> newValue<span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Old Value:&#39;</span><span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
我们要在 watch 选项中定义一个函数，并通过该函数来监听数据变化。这种方式比较繁琐，而且不够直观。

Vue <span class="token number">3</span> 中的 Watch
在 Vue <span class="token number">3</span> 中，我们可以使用新的 watchEffect <span class="token constant">API</span> 来监听一个变量：

<span class="token keyword">import</span> <span class="token punctuation">{</span> watchEffect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">const</span> message <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">&#39;Hello, World!&#39;</span><span class="token punctuation">)</span>

<span class="token function">watchEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Value:&#39;</span><span class="token punctuation">,</span> message<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">return</span> <span class="token punctuation">{</span>
message
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
我们可以使用 watchEffect <span class="token constant">API</span> 来监听响应式变量。我们只需将变量放在 watchEffect 函数中即可，Vue 会自动追踪变量的依赖，并在变量发生变化时重新运行该函数。这就相当于将 Vue <span class="token number">2</span> 的 watch 选项和 computed 选项合并到了一起。

监听多个变量
在 Vue <span class="token number">3</span> 中，我们可以使用 watch 函数来监听多个变量：

<span class="token keyword">import</span> <span class="token punctuation">{</span> watch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">const</span> message <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">&#39;Hello, World!&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">&#39;Vue 3&#39;</span><span class="token punctuation">)</span>

<span class="token function">watch</span><span class="token punctuation">(</span><span class="token punctuation">[</span>message<span class="token punctuation">,</span> name<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">[</span>newVal1<span class="token punctuation">,</span> newVal2<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>oldVal1<span class="token punctuation">,</span> oldVal2<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Message:&#39;</span><span class="token punctuation">,</span> newVal1<span class="token punctuation">,</span> oldVal1<span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Name:&#39;</span><span class="token punctuation">,</span> newVal2<span class="token punctuation">,</span> oldVal2<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">return</span> <span class="token punctuation">{</span>
message<span class="token punctuation">,</span>
name
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
在 Vue <span class="token number">3</span> 中，我们可以将多个响应式变量放在一个数组中传递给 watch 函数。当其中任意一个变量发生变化时，watch 函数都会重新运行。与 Vue <span class="token number">2</span> 不同的是，在 Vue <span class="token number">3</span> 中，watch 函数需要接收两个参数：新值和旧值。

懒执行
在 Vue <span class="token number">3</span> 中，我们可以通过将 lazy 选项设置为 <span class="token boolean">true</span> 来使 watchEffect 函数变为懒执行：

<span class="token keyword">import</span> <span class="token punctuation">{</span> watchEffect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">const</span> message <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">&#39;Hello, World!&#39;</span><span class="token punctuation">)</span>

<span class="token function">watchEffect</span><span class="token punctuation">(</span>
<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span> lazy<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token keyword">return</span> <span class="token punctuation">{</span>
message
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
在 Vue <span class="token number">3</span> 中，我们可以通过将 lazy 选项设置为 <span class="token boolean">true</span> 来使 watchEffect 函数变为懒执行。这意味着只有在依赖项发生变化时才会运行该函数。

取消监听
在 Vue <span class="token number">3</span> 中，我们可以通过调用 watchEffect 函数返回的句柄来取消监听：

<span class="token keyword">import</span> <span class="token punctuation">{</span> watchEffect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">const</span> message <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">&#39;Hello, World!&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> stop <span class="token operator">=</span> <span class="token function">watchEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">return</span> <span class="token punctuation">{</span>
message
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
在 Vue <span class="token number">3</span> 中，我们可以通过调用 watchEffect 函数返回的句柄来取消监听。这意味着当我们不再需要监听变量时，可以随时停止监听。

在 Vue <span class="token number">3</span> 中，watch <span class="token constant">API</span> 进行了升级，语法和用法都比 Vue <span class="token number">2</span> 更为直观、简洁。我们可以使用 watchEffect 函数来监听响应式变量，并使用 watch 函数来监听多个变量。而且，在 Vue <span class="token number">3</span> 中，我们还可以将 watchEffect 函数变为懒执行，并且随时取消。

小拓展： Watch 和 WatchEffect 的区别

更新全局属性挂载
在 Vue <span class="token number">2</span> 中，我们可以很方便地将属性或方法挂载到 Vue 实例上，以便在组件中进行全局访问。但是，在 Vue <span class="token number">3</span> 中，由于架构的变化，这种方法已经被淘汰了。现在，我们需要使用新的 <span class="token constant">API</span> 和技巧来实现类似的功能。

Vue <span class="token number">2</span> 中的全局属性挂载
在 Vue <span class="token number">2</span> 中，我们可以通过 Vue<span class="token punctuation">.</span>prototype 来挂载属性、方法、甚至是插件，以便在组件中进行全局访问。

<span class="token comment">// main.js</span>
<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>

Vue<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$appName <span class="token operator">=</span> <span class="token string">&#39;MyApp&#39;</span>

<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
<span class="token function-variable function">render</span><span class="token operator">:</span> h <span class="token operator">=&gt;</span> <span class="token function">h</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>
在上面的代码中，我们将 appName 属性挂载到 Vue 原型上，并将其设置为 MyApp。因此，在应用程序中的任何组件中，我们都可以通过 <span class="token keyword">this</span><span class="token punctuation">.</span>appName 来访问它：

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span><span class="token punctuation">{</span> $appName <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
export default {
  mounted() {
    console.log(this.$appName) // &#39;MyApp&#39;
  }
}
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

虽然这种方法非常简单易用，但在 Vue <span class="token number">3</span> 中已不再适用。

Vue <span class="token number">3</span> 中的全局属性挂载
在 Vue <span class="token number">3</span> 中，Vue<span class="token punctuation">.</span>prototype 已经被删除，而且在组件内部也不再支持 <span class="token keyword">this</span><span class="token punctuation">.</span>$property 语法。所以我们需要使用其他技巧来实现类似的功能。

一种替代方法是使用 provide<span class="token operator">/</span>inject。在父级组件中，我们可以提供一个属性或方法，并通过 inject 注入到子组件中。

<span class="token comment">// main.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createApp<span class="token punctuation">,</span> provide <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">provide</span><span class="token punctuation">(</span><span class="token string">&#39;appName&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;MyApp&#39;</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>
在上面的代码中，我们使用 createApp 方法创建 Vue 应用程序实例，并使用 provide 方法将 appName 属性提供给它。现在，在任何后代组件中，我们都可以使用 inject 来访问它：

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span><span class="token punctuation">{</span> appName <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
import { inject } from &#39;vue&#39;

export default {
  setup() {
    const appName = inject(&#39;appName&#39;)
    console.log(appName) // &#39;MyApp&#39;

    return {
      appName
    }
  }
}
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

虽然这种方法看起来有些麻烦，但它确实提供了更好的可维护性和灵活性。在大型应用程序中，我们可以使用这种方法来传递多个属性和方法，并且可以在各个组件之间轻松地进行更改和更新。

尽管这些方法可能会比 Vue <span class="token number">2</span> 中的简单方法更加复杂，但它们确实提供了更好的可维护性和灵活性，特别是在大型应用程序中。

更新<span class="token operator">/</span>升级 Slot
Vue <span class="token number">2</span> 中的插槽有两种类型：作用域插槽（scoped slot）和普通插槽（slot）。在 Vue <span class="token number">3</span> 中，这两个概念被统一成了一个新的类型：<span class="token operator">&lt;</span> slot<span class="token operator">&gt;</span> 元素。

首先，让我们来看一下 Vue <span class="token number">2</span> 中普通插槽的用法：

<span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> parent component <span class="token operator">--</span><span class="token operator">&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> child component <span class="token operator">--</span><span class="token operator">&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">Child Component</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">This will be inserted into the parent&#39;s slot</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
在上面的代码中，父组件包含一个 <span class="token entity named-entity" title="&lt;">&amp;lt;</span>slot<span class="token operator">&gt;</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string"> 元素，它允许子组件将内容插入到该元素中。子组件可以像这样使用该插槽：

&lt;template&gt;
  &lt;parent-component&gt;
    &lt;h2&gt;Inserted Content&lt;/h2&gt;
  &lt;/parent-component&gt;
&lt;/template&gt;
在 Vue 3 中，   </span><span class="token template-punctuation string">\`</span></span><span class="token entity named-entity" title="&lt;">&amp;lt;</span> slot <span class="token operator">&gt;</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">   元素仍然存在，但是它不再具有作用域功能。相反，你需要使用 v-bind 指令来传递 props 到插槽内容中。

&lt;!-- parent component --&gt;
&lt;div&gt;
  &lt;slot msg=&quot;Hello from Parent&quot;&gt;&lt;/slot&gt;
&lt;/div&gt;

&lt;!-- child component --&gt;
&lt;template&gt;
  &lt;div&gt;
    &lt;h1&gt;Child Component&lt;/h1&gt;
    &lt;p&gt;{{ $slots.default({msg: &#39;Hello from Child&#39;}) }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;
在上面的代码中，父组件将一个名为 msg 的 props 传递给了插槽。子组件使用 $slots.default 访问该插槽，并将一个对象作为参数传递给它。

父组件和子组件都可以访问 msg 这个 prop。在父组件中，你可以这样访问：

&lt;template&gt;
  &lt;parent-component&gt;
    &lt;template #default=&quot;slotProps&quot;&gt;
      &lt;h2&gt;{{ slotProps.msg }}&lt;/h2&gt;
    &lt;/template&gt;
  &lt;/parent-component&gt;
&lt;/template&gt;
在子组件中，你可以这样访问：

&lt;template&gt;
  &lt;div&gt;
    &lt;h1&gt;Child Component&lt;/h1&gt;
    &lt;p&gt;{{ $slots.default({msg: &#39;Hello from Child&#39;}) }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;
需要注意的是，在 Vue 3 中，你必须使用具名插槽（named slot）来传递 props 到插槽内容中。如果你没有给插槽命名，那么在实践中就会出现问题。

在 Vue 3 中，插槽的用法发生了变化。你需要使用 &lt; slot&gt; 元素来定义插槽，并使用 v-bind 指令传递 props 到插槽内容中。需要注意的是，你必须使用具名插槽来传递 props，否则会出现问题。

更新/升级 v-model
在 Vue 2 中，v-model 是一个非常有用的指令，它允许我们在表单元素中创建双向绑定。而在 Vue 3 中，v-model 指令经过了很多改进和升级。

一些重要的改变包括：

组件 v-model 默认行为
在 Vue 2 中，使用 v-model 需要在组件中明确定义 prop 和事件。而在 Vue 3 中，组件的 v-model 默认行为被彻底重构了。

现在，如果在组件上使用 v-model 指令，Vue 会自动推断出默认的 prop 和事件，并且将它们用于双向绑定。这意味着在许多情况下，你不再需要在组件中手动定义 prop 和事件。

例如，如果你有一个名为 MyComponent 的组件并想使用 v-model 实现双向绑定，那么你只需在组件上添加 v-model 即可：

</span><span class="token template-punctuation string">\`</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-component</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>myData<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
在这个栗子中，Vue 会自动将 myData 作为 prop 和 update:modelValue 事件用于双向绑定。

自定义 v-model 修饰符
在 Vue 2 中，可以使用 v-model 指令的修饰符来更改绑定的值。而在 Vue 3 中，你还可以创建自定义 v-model 修饰符。

例如，假设你有一个名为 trim 的自定义修饰符，用于删除表单输入的前导和尾随空格。在 Vue 3 中，你可以将这个修饰符添加到 v-model 指令中，以便自动应用该修饰符：

</span><span class="token template-punctuation string">\`</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">v-model.trim</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>myData<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
v-model 绑定多个值
在 Vue 2 中，v-model 只能绑定一个值。而在 Vue 3 中，你可以使用 v-model 来同时绑定多个值。

例如，假设你有一个名为 myData 的对象，其中包含名字和年龄两个属性。你可以使用 v-model 指令来同时绑定这两个属性：

</span><span class="token template-punctuation string">\`</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name"><span class="token namespace">v-model:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>myData.name<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">v-model:</span>age</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>myData.age<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\`
在这个栗子中，name 和 age 是 v<span class="token operator">-</span>model 指令的自定义修饰符，用于指定要绑定的属性名称。

Vue <span class="token number">3</span> 中的 v<span class="token operator">-</span>model 指令经过了很多改进，这些改进使得双向绑定更加强大且易于使用。

更新 Vue Router
Vue <span class="token number">3</span> 中没有 $route 和 $router 对象，而是使用 <span class="token function">useRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 和 <span class="token function">useRoute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 函数来获取当前的路由信息。因此，在路由文件中需要做出如下修改：

<span class="token keyword">import</span> <span class="token punctuation">{</span> createRouter<span class="token punctuation">,</span> createWebHistory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>

<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">createRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
history<span class="token operator">:</span> <span class="token function">createWebHistory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
routes<span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token comment">// 路由规则</span>
<span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> router
在组件中使用 $route 和 $router 时，需要修改为使用 <span class="token function">useRoute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 和 <span class="token function">useRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 获取当前的路由信息和路由对象。例如：

<span class="token keyword">import</span> <span class="token punctuation">{</span> useRoute<span class="token punctuation">,</span> useRouter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
<span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">const</span> route <span class="token operator">=</span> <span class="token function">useRoute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">useRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 使用 route 和 router 对象</span>

<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
更新 Vuex
Vuex <span class="token number">4</span> 中使用 <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 函数来创建 Store 实例，同时在 setup 函数中使用 <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 函数获取 Store 对象。因此，在 store 文件中需要做出如下修改：

<span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuex&#39;</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
state<span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token comment">// 状态数据</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
mutations<span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token comment">// 修改状态的方法</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
actions<span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token comment">// 异步操作</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
modules<span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token comment">// 子模块</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> store
在组件中使用 Vuex 时，需要使用 <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 函数获取 Store 对象。例如：

<span class="token keyword">import</span> <span class="token punctuation">{</span> useStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuex&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
<span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 使用 store 对象</span>

<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
更新<span class="token operator">/</span>升级 Pinia
Vue <span class="token number">2</span> 中的 Vuex 是 Vue<span class="token punctuation">.</span>js 官方提供的状态管理工具，而 Vue <span class="token number">3</span> 推荐使用 Pinia 作为状态管理库。在将 Vue <span class="token number">2</span> 的 Vuex 升级为 Vue <span class="token number">3</span> 的 Pinia 时，需要了解 Pinia 的 <span class="token constant">API</span> 和一些概念。以下是一些步骤和注意事项：

安装 Pinia
在项目目录下运行以下命令来安装 Pinia：

npm install pinia
创建 Pinia 实例
在 src 目录下创建一个名为 store<span class="token punctuation">.</span>js 的文件，并创建一个名为 createStore 的函数，用于创建 Pinia 实例。该函数应返回一个带有所有模块的对象。

<span class="token keyword">import</span> <span class="token punctuation">{</span> createPinia <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createPinia</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">return</span> store
<span class="token punctuation">}</span>
重构模块文件
对于每个 Vuex 模块，在单独的文件中定义一个对象，该对象包含状态、操作、getters 等属性。在这些对象中使用 defineStore 函数替换原有的 Vuex<span class="token punctuation">.</span>Store 构造函数，详细参数的使用方法可以参考官方文档。

<span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> useCounterStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
id<span class="token operator">:</span> <span class="token string">&#39;counter&#39;</span><span class="token punctuation">,</span>
<span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
count<span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
actions<span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token function">decrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">--</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
getters<span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token function">doubleCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>count \\<span class="token operator">*</span> <span class="token number">2</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
导入和使用 store
在 main<span class="token punctuation">.</span>js 中导入 createStore 函数，并在 Vue 根实例中使用它。可以使用 app<span class="token punctuation">.</span>config<span class="token punctuation">.</span>globalProperties<span class="token punctuation">.</span>$store 将 Pinia 实例挂载到全局，以便于在组件中访问。

<span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./store&#39;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>

<span class="token comment">// 注册 Pinia 实例</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">createStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">// 挂载 Pinia 实例到全局</span>
app<span class="token punctuation">.</span>config<span class="token punctuation">.</span>globalProperties<span class="token punctuation">.</span>$store <span class="token operator">=</span> store

app<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>
组件中使用 Pinia
在组件中可以通过 <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 函数来获取 Pinia 实例。然后可以像 Vuex 一样使用状态、操作、getters 等属性。

<span class="token keyword">import</span> <span class="token punctuation">{</span> useStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
<span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 获取状态</span>
<span class="token keyword">const</span> count <span class="token operator">=</span> store<span class="token punctuation">.</span>state<span class="token punctuation">.</span>count

<span class="token comment">// 调用操作</span>
store<span class="token punctuation">.</span>actions<span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 计算属性</span>
<span class="token keyword">const</span> doubleCount <span class="token operator">=</span> store<span class="token punctuation">.</span>getters<span class="token punctuation">.</span>doubleCount

<span class="token keyword">return</span> <span class="token punctuation">{</span>
count<span class="token punctuation">,</span>
doubleCount
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
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
Vue <span class="token number">3</span> 的推出为前端开发者带来了更多的可能性。通过本文的介绍，我们可以清晰地了解到 Vue <span class="token number">3</span> 相较于 Vue <span class="token number">2</span> 的新特性和改进，以及如何将 Vue <span class="token number">2</span> 项目升级到 Vue <span class="token number">3</span>。

在升级过程中，我们需要先确认升级条件、备份代码并更新依赖。然后，对项目中的代码进行更新，并进行测试和调试。最后，我们还需要更新文档和注释，以便于其他开发人员能够快速了解项目的变化和特性。

Vue <span class="token number">3</span> 的升级需要谨慎对待，但也是值得尝试的。希望本文的介绍可以帮助大家更好地掌握升级方法和技巧，从而在项目早日迁移到 Vue <span class="token number">3</span> 上享受更多的优势。

文中列举的更新栗子都是目前在升级项目中接触到的，若对 Vue <span class="token number">2</span> 升级 Vue <span class="token number">3</span> 其它升级方面感兴趣的可以分享交流，我也会同步更新此文档。

<span class="token punctuation">[</span>gogocode<span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>gogocode<span class="token punctuation">.</span>io<span class="token operator">/</span>zh<span class="token operator">/</span>docs<span class="token operator">/</span>vue<span class="token operator">/</span>element<span class="token operator">-</span>ui<span class="token operator">-</span>to<span class="token operator">-</span>element<span class="token operator">-</span>plus<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15);function v(m,b){const a=e("ExternalLinkIcon");return p(),o("div",null,[n("h1",u,[r,s(),n("a",d,[s("Vue 2 升级 Vue 3 "),c(a)])]),k])}const f=t(l,[["render",v],["__file","vue2_vue3.html.vue"]]);export{f as default};
