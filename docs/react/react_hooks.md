# React Hook

## 1. 对 React Hook 的理解，它的实现原理是什么

> Hooks 的本质：一套能够使函数组件更强大，更灵活的“钩子”.**让函数组件可以拥有自己的状态**
> Hooks 的出现解决了俩个问题: 1. 组件的状态逻辑复用 2.class 组件自身的问题

React-Hooks 是 React 团队在 React 组件开发实践中，逐渐认知到的一个改进点，这背后其实涉及对**类组件**和**函数组件**两种组件形式的思考和侧重。

- （1）**类组件**：所谓类组件，就是基于 `ES6 Class` 这种写法，通过继承 `React.Component` 得来的 React 组件。以下是一个类组件：

```tsx
class DemoClass extends React.Component {
  state = {
    text: "",
    this.changeText=this.changeText.bind(this)
  };
  componentDidMount() {
  //...
  }
  changeText = (newText) => {
    this.setState({
      text: newText
    });
  };
  render() {
    return (
      <div className="demoClass">
        <p>{this.state.text}</p>
        <button onClick={()=>this.changeText}>修改</button>
      </div>
    );
  }
}
```

可以看出，React 类组件内部预置了相当多的“现成的东西”等着我们去调度/定制，`state` 和`生命周期`就是这些“现成东西”中的典型。要想得到这些东西，难度也不大，只需要继承一个 `React.Component` 即可。

当然，这也是类组件的一个不便，它太繁杂了，对于解决许多问题来说，编写一个类组件实在是一个过于复杂的姿势。复杂的姿势必然带来高昂的理解成本，这也是我们所不想看到的。除此之外，由于开发者编写的逻辑在封装后是和组件粘在一起的，这就使得**类组件内部的逻辑难以实现拆分和复用**。

- （2）**函数组件**：函数组件就是以函数的形态存在的 React 组件。早期并没有 React-Hooks，函数组件内部无法定义和维护 state，因此它还有一个别名叫“**无状态组件**”。以下是一个函数组件：

```tsx
function DemoFunction(props) {
  const { text } = props
  const [count, setCount] = useState(0)
  return (
    <div className="demoFunction">
      <p>{`函数组件接收的内容：[${text}]`}</p>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        {count}
      </button>
    </div>
  )
}
```

相比于类组件，函数组件肉眼可见的特质自然包括**轻量、灵活、易于组织和维护、较低的学习成本**等。

通过对比，从形态上可以对两种组件做区分，它们之间的区别如下：

- 类组件需要继承 `class`，函数组件不需要；
- 类组件可以访问生命周期方法，函数组件不能；
- 类组件中可以获取到实例化后的 `this`，并基于这个 this 做各种各样的事情，而函数组件不可以；
- 类组件中可以定义并维护 `state`（状态），而函数组件不可以；

除此之外，还有一些其他的不同。通过上面的区别，我们不能说谁好谁坏，它们各有自己的优势。在 ReactHooks 出现之前，**类组件的能力边界明显强于函数组件**。

实际上，类组件和函数组件之间，是**面向对象**和**函数式编程**这两套不同的设计思想之间的差异。而**函数组件更加契合 React 框架的设计理念**：
![](/images/react/react7.png)

React 组件本身的定位就是函数，一个输入数据、输出 UI 的函数。作为开发者，我们编写的是声明式的代码，
而 React 框架的主要工作，就是及时地把声明式的代码转换为命令式的 DOM 操作，把数据层面的描述映射到用户可见的 UI 变化中去。这就意味着从原则上来讲，React 的数据应该总是紧紧地和渲染绑定在一起的，而类组件做不到这一点。**函数组件就真正地将数据和渲染绑定到了一起。函数组件是一个更加匹配其设计理念、也更有利于逻辑拆分与重用的组件表达形式**。

为了能让开发者更好的的去编写函数式组件。于是，React-Hooks 便应运而生。
React-Hooks 是一套能够使函数组件更强大、更灵活的“钩子”。

函数组件比起类组件少了很多东西，比如`生命周期`、`对 state 的管理`等。这就给函数组件的使用带来了非常多的局限性，导致我们并不能使用函数这种形式，写出一个真正的全功能的组件。而 React-Hooks 的出现，就是为了帮助函数组件补齐这些（相对于类组件来说）缺失的能力。

如果说函数组件是一台轻巧的快艇，那么 `React-Hooks` 就是一个内容丰富的零部件箱。“重装战舰”所预置的那些设备，这个箱子里基本全都有，同时它还不强制你全都要，而是允许你自由地选择和使用你需要的那些能力，然后将这些能力以 `Hook`（钩子）的形式“钩”进你的组件里，从而定制出一个最适合你的“专属战舰”。

## 2. 为什么 useState 要使用数组而不是对象

`useState` 的用法：

```tsx
const [count, setCount] = useState(0)
```

可以看到 useState 返回的是一个**数组**，那么为什么是返回数组而不是返回对象呢？

这里用到了解构赋值，所以先来看一下 ES6 的解构赋值：

数组的解构赋值

```tsx
const foo = [1, 2, 3]
const [one, two, three] = foo
console.log(one) // 1
console.log(two) // 2
console.log(three) // 3
```

对象的解构赋值

```tsx
const user = {
  id: 888,
  name: 'xiaoxin',
}
const { id, name } = user
console.log(id) // 888
console.log(name) // "xiaoxin"
```

看完这两个例子，答案应该就出来了：

- 如果 `useState` 返回的是数组，那么使用者可以对数组中的元素命名，代码看起来也比较干净
- 如果 `useState` 返回的是对象，在解构对象的时候必须要和 useState 内部实现返回的对象同名，想要使用多次的话，必须得设置别名才能使用返回值

下面来看看如果 useState 返回对象的情况：

```tsx
// 第一次使用
const { state, setState } = useState(false)
// 第二次使用
const { state: counter, setState: setCounter } = useState(0)
```

这里可以看到，返回对象的使用方式还是挺麻烦的，更何况实际项目中会使用的更频繁。

**总结**：`useState` 返回的是 `array` 而不是 object 的原因就是为了**降低使用的复杂度**，返回数组的话可以直接根据
顺序解构，而返回对象的话要想使用多次就需要定义别名了。

## 3. React Hooks 解决了哪些问题？

React Hooks 主要解决了以下问题：

（1）**在组件之间复用状态逻辑很难**

React 没有提供将可复用性行为“附加”到组件的途径（例如，把组件连接到 store）解决此类问题可以使用`render props` 和 高阶组件。但是这类方案需要重新组织组件结构，这可能会很麻烦，并且会使代码难以理解。
由 `providers`，`consumers`，`高阶组件`，`render props` 等其他抽象层组成的组件会形成“嵌套地狱”。尽管可以在 `DevTools` 过滤掉它们，但这说明了一个更深层次的问题：React 需要为共享状态逻辑提供更好的原生途径。

可以使用 `Hook` 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。Hook 使我们在无需修改组件结构的情况下复用状态逻辑。 这使得在组件间或社区内共享 Hook 变得更便捷。

（2）**复杂组件变得难以理解**

在组件中，每个生命周期常常包含一些不相关的逻辑。例如，组件常常在 `componentDidMount` 和`componentDidUpdate` 中获取数据。但是，同一个 `componentDidMount` 中可能也包含很多其它的逻辑，如设置事件监听，而之后需在 `componentWillUnmount` 中清除。相互关联且需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起。如此很容易产生 bug，并且导致逻辑不一致。

在多数情况下，不可能将组件拆分为更小的粒度，因为状态逻辑无处不在。这也给测试带来了一定挑战。同时，这也是很多人将 React 与状态管理库结合使用的原因之一。但是，这往往会引入了很多抽象概念，需要你在不同的文件之间来回切换，使得复用变得更加困难。

为了解决这个问题，Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），而并非强
制按照生命周期划分。你还可以使用 `reducer` 来管理组件的内部状态，使其更加可预测。

（3）**难以理解的 class**

除了代码复用和代码管理会遇到困难外，class 是学习 React 的一大屏障。我们必须去理解 JavaScript 中 `this` 的工作方式，这与其他语言存在巨大差异。还不能忘记绑定事件处理器。没有稳定的语法提案，这些代码非常冗余。
大家可以很好地理解 `props`，`state` 和`自顶向下的数据流`，但对 class 却一筹莫展。即便在有经验的 React 开发者之间，对于函数组件与 class 组件的差异也存在分歧，甚至还要区分两种组件的使用场景。

为了解决这些问题，Hook 使你在非 class 的情况下可以使用更多的 React 特性。 从概念上讲，React 组件一直更像是函数。而 `Hook` 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案，无需学习复杂的函数式或响应式编程技术

## 4. React Hook 的使用限制有哪些？

React Hooks 的限制主要有两条：

- 不要在**循环、条件或嵌套函数**中调用 Hook；
- 在 React 的函数组件中调用 `Hook`。

那为什么会有这样的限制呢？Hooks 的设计初衷是为了改进 React 组件的开发模式。在旧有的开发模式下遇到了三个问题。

- **组件之间难以复用状态逻辑**。过去常见的解决方案是高阶组件、render props 及状态管理框架。
- **复杂的组件变得难以理解**。生命周期函数与业务逻辑耦合太深，导致关联部分难以拆分。
- **人和机器都很容易混淆类 class**。常见的有 this 的问题，但在 React 团队中还有类难以优化的问题，希望在编译优化层面做出一些改进。

这三个问题在一定程度上阻碍了 React 的后续发展，所以为了解决这三个问题，**Hooks 基于函数组件**开始设计。然而第三个问题决定了 Hooks 只支持函数组件。

那为什么不要在循环、条件或嵌套函数中调用 Hook 呢？因为 Hooks 的设计是**基于数组**实现。在调用时按顺序加入数组中，如果使用循环、条件或嵌套函数很有可能导致数组取值错位，执行错误的 Hook。当然，实质上 React 的源码里不是数组，是**链表**。

这些限制会在编码上造成一定程度的心智负担，新手可能会写错，为了避免这样的情况，可以引入 ESLint 的 Hooks 检查插件进行预防。

## 5. useEffect 与 useLayoutEffect 的区别

> 什么是副作用(`useEffect`)
> 副作用是相对于主作用来说的，一个函数除了主作用，其他的作用就是副作用。对于 React 组件来说，主作用就是根据数据（state/props）渲染 UI，除此之外都是副作用（比如，手动修改 DOM）
> 常见的副作用: 1. 数据请求 ajax 发送 2. 手动修改 dom 3. localstorage 操作

> 执行时机:
>
> 1. **不添加依赖项**: 组件首次渲染执行一次，以及不管是哪个状态更改引起组件更新时都会重新执行 `useEffect(()=>{ })`
> 2. **添加空数组**: 组件只在首次渲染时执行一次 `useEffect(()=>{ },[])`
> 3. **添加特定依赖项**: 副作用函数在首次渲染时执行，在依赖项发生变化时重新执行 `useEffect(()=>{},[count])`
> 4. **清理副作用**: 想要清理副作用 可以在副作用函数中的末尾 return 一个新的函数，在新的函数中编写清理副作用的逻辑 `useEffect(()=>{return()=>{}},[count])`

（1）**共同点**

- **运用效果**：`useEffect` 与 `useLayoutEffect` 两者都是用于处理副作用，这些副作用包括改变 DOM、设置订阅、操作定时器等。
  在函数组件内部操作副作用是不被允许的，所以需要使用这两个函数去处理。<br/>
- **使用方式**：useEffect 与 useLayoutEffect 两者底层的函数签名是完全一致的，都是调用的 `mountEffectImpl` 方法，在使用上也没什么差异，基本可以直接替换。

（2）**不同点**

- **使用场景**：`useEffect` 在 React 的渲染过程中是被**异步**调用的，用于绝大多数场景；而 `useLayoutEffect` 会在所有的 DOM 变更之后**同步**调用，主要用于处理 DOM 操作、调整样式、避免页面闪烁等问题。
  也正因为是**同步**处理，所以需要避免在 `useLayoutEffect` 做计算量较大的耗时任务从而造成阻塞。
- **使用效果**：`useEffect` 是按照顺序执行代码的，改变屏幕像素之后执行（先渲染，后改变 DOM），当改变屏幕内容时可能会产生闪烁；
  `useLayoutEffect` 是改变屏幕像素之前就执行了（会推迟页面显示的事件，先改变 DOM 后渲染），不会产生闪烁。
  **useLayoutEffect 总是比 useEffect 先执行**。
  `useEffect` 是**异步**执行，**执行时机**是浏览器渲染完成之后，`useLayoutEffect` 是**同步**执行的，在 DOM 更新后马上同步调用的代码，相当于 componentDidMount

在未来的趋势上，两个 API 是会长期共存的，暂时没有删减合并的计划，需要开发者根据场景去自行选择。
React 团队的建议非常实用，如果实在分不清，先用 useEffect，一般问题不大；如果页面有异常，再直接替换为 useLayoutEffect 即可。

## 6. React Hooks 在平时开发中需要注意的问题和原因

（1）**不要在循环，条件或嵌套函数中调用 Hook，必须始终在 React 函数的顶层使用 Hook**

这是因为 React 需要利用调用顺序来正确更新相应的状态，以及调用相应的钩子函数。一旦在循环或条件分支语句中调用 Hook，就容易导致调用顺序的不一致性，从而产生难以预料到的后果。

（2）**使用 useState 时候，使用 push，pop，splice 等直接更改数组对象的坑**

使用 push 直接更改数组无法获取到新值，应该采用**析构方式**，但是在 class 里面不会有这个问题。代码示例：

```tsx
function Indicatorfilter() {
  let [num, setNums] = useState(() => {
    return [0, 1, 2, 3]
  })
  const test = () => {
    // 这里坑是直接采用 push 去更新 num
    // setNums(num)是无法更新 num 的
    // 必须使用 num = [...num ,1]
    num.push(1)
    // num = [...num ,1]
    setNums(num)
  }
  return (
    <div className="filter">
      <div onClick={test}>测试</div>
      <div>
        {num.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  )
}
class Indicatorfilter extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      nums: [1, 2, 3],
    }
    this.test = this.test.bind(this)
  }
  test() {
    // class采用同样的方式是没有问题的
    this.state.nums.push(1)
    this.setState({
      nums: this.state.nums,
    })
  }
  render() {
    let { nums } = this.state
    return (
      <div>
        <div onClick={this.test}>测试2</div>
        <div>
          {nums.map((item: any, index: number) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
    )
  }
}
```

（3）**useState 设置状态的时候，只有第一次生效，后期需要更新状态，必须通过 `useEffect`**

TableDeail 是一个公共组件，在调用它的父组件里面，我们通过 `set` 改变 `columns` 的值，以为传递给 TableDeail 的`columns` 是最新的值，所以 tabColumn 每次也是最新的值，但是实际 tabColumn 是最开始的值，不会随着 columns 的更新而更新：

```tsx
const TableDeail = ({ columns }: TableData) => {
  const [tabColumn, setTabColumn] = useState(columns)
}
// 正确的做法是通过 useEffect 改变这个值
const TableDeail = ({ columns }: TableData) => {
  const [tabColumn, setTabColumn] = useState(columns)
  useEffect(() => {
    setTabColumn(columns)
  }, [columns])
}
```

（4）**善用 `useCallback`**

父组件传递给子组件事件句柄时，如果我们没有任何参数变动可能会选用 `useMemo`。但是每一次父组件渲染子组件即使没变化也会跟着渲染一次。

（5）**不要滥用 useContext**

可以使用基于 `useContext` 封装的状态管理工具。

```tsx
import { createContext, useContext } from 'react'
// 创建Context对象
const Context = createContext()
// 底层组件通过useContext函数获取数据
const name = useContext(Context)
// 顶层组件通过Provider 提供数据
<Context.Provider value={'this is name'}>
  <div><Foo/></div>
</Context.Provider>
```

## useCallback 和 useMemo 区别

React 中的`useMemo`和`useCallback`是两个重要的 Hooks。常常被用于优化组件的性能。虽然这两个 Hooks 看起来很相似，但它们彼此之间还是有很大的区别的。

#### `useMemo`

是用来**缓存计算结果**，确保只有在依赖项发生变化时才会重新计算。`useMemo` 的实现方式是通过缓存计算结果，当依赖项发生变化时，重新计算结果并返回。

useMemo

- useMemo：允许通过记住上一个结果的方式在多次渲染的之间**缓存计算结果**,使得控制具体子节点何时更新变得更容易
- 使用对象：**变量**
- 使用条件：父组件传给子组件的变量
- 优点：`useMemo` 包裹的变量，**相当于对变量做了缓存**，当父组件重新渲染时，变量不会改变==》子组件不会重渲染
- useMemo 执行的几种情况：
  - 首次渲染
  - 非首次渲染
    - 依赖发生改变
    - 为空数组时

举个例子

- 现在我们有个 Tree 组件，他会渲染一个很耗性能的大组件 `ExpensiveTree`

```tsx
function Tree() {
  let appContextValue = useContext(AppContext)
  let theme = appContextValue.theme
  return <ExpensiveTree className={theme} />
}
```

- 由于 AppContext 中包含很多与 theme 无关的 state，导致每次其他无关的 state 更新，Tree 都会重新 render，进而 ExpensiveTree 组件也重新 render。
- useMemo 就能派上用场

```tsx
function Tree() {
  let appContextValue = useContext(AppContext)
  let theme = appContextValue.theme
  return useMemo(() => {
    return <ExpensiveTree className={theme} />
  }, [theme])
}
```

- 即使 AppContext 改变导致 Tree 反复 render，ExpensiveTree 也只会在 theme 改变后 render。

#### `useCallback`

是用于**缓存函数**，确保只有在依赖项发生变化时才会重新创建函数。useCallback 的实现方式是**缓存函数本身**，当依赖项发生变化时，重新创建函数并返回。

- 使用对象：**函数**<br/>
- 使用条件：父组件传给子组件的函数<br/>
- 优点： `useCallback`包裹的函数，相当于对函数做了缓存，当父组件重新渲染时，函数不会重新定义==>子组件不会重新渲染<br/>
- 注意：依赖项数组不会作为参数传给回调函数。虽然从概念上来说它表现为：所有回调函数中引用的值都应该出现在依赖项数组中。<br/>
- 使用场景：有一个父组件，其中包含子组件，子组件接收一个函数作为 props；通常而言，如果父组件更新了，子组件也会执行更新；但是大多数场景下，更新是没有必要的，我们可以借助`useCallback`来返回函数，然后把这个函数作为 props 传递给子组件；这样，子组件就能避免不必要的更新
- useCallback 不能滥用，否则只会消耗性能,如果你需要**将该函数传递给子组件**，那么可以使用`useCallback`进行函数的缓存
- 真正有助于性能改善的，有 2 种场景
  - 函数定义时需要进行大量运算， 这种场景极少
  - 需要比较引用的场景，`useEffect`，又或者是配合`React.Memo`使用
- 同样的场景，如果该组件一定只会渲染一次，那么使用`useCallback`就完全没有必要。
- **总结**：
  - 利用闭包缓存上次结果
  - 成本：额外的缓存，与比较逻辑
  - 不是绝对的优化，而是一种成本的交换，并非使用所有场景

```tsx
const { useCallback, useState, useEffect } = React
const set = new Set()
const Child = ({ callback }) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log('09')
    setCount(callback())
  }, [callback]) //当callback更新时执行callback函数，得到parent组件最新的count

  return <div> child count:{count} </div>
}
const App = () => {
  const [count, setCount] = useState(1)
  const [val, setVal] = useState('')

  const callback = useCallback(() => {
    console.log(count, 8)
    return count
  }, [count]) //count更新时执行

  set.add(callback) //借助ES6新增的数据类型Set来判断当依赖count变更时是否返回新的函数
  console.log(set, 9)

  return (
    <div>
      <h4>parent count:{count}</h4>
      <h4>set size:{set.size}</h4>
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <input value={val} onChange={(event) => setVal(event.target.value)} />
      </div>

      <Child callback={callback} />
    </div>
  )
}
```

#### [对比](https://juejin.cn/post/7146107198215553055?searchId=202312112248122D0157A90ECD11B446D2)

```tsx
import React, { useState, useMemo, useCallback } from 'react'
function MyComponent(props) {
  const [count, setCount] = useState(0);
  const expensiveFunction = useMemo(() => {
    console.log('calculating...');
    let result = 0;
    for(let i = 0; i &lt; count * 100000; i++) {
      result += i;
    }
    return result;
  }, [count])
  const handleClick = useCallback(() => {
    console.log('clicked...' );
    setCount(count + 1);
  }, [count]);
  return( <div>
    <p>count: {count}</p>
    <p>expensiveFunction: {expensiveFunction}</p>
    <button onClick={handleClick}>Click me</button>
  </div>)
}
```

例子中，定义了一个 MyComponent 组件，其中包含了一个状态值 `count` 和一个计算量很大的函数 `expensiveFunction`。
使用 `useMemo` 对 `expensiveFunction` 进行了缓存，在 count 发生变化时才会重新计算 `expensiveFunction`。
使用 useCallback 对 `handleClick` 进行了缓存，在 count 发生变化时才会重新创建 `handleClick` 函数。

**总结**：

- 相同点：

  - useCallback 和 useMemo **参数相同**，第一个参数是函数，第二个参数是依赖项的数组。
  - useMemo、useCallback 都是使参数（函数）不会因为其他不相关的参数变化而重新渲染。
  - 与 useEffect 类似，[] 内可以放入你改变数值就重新渲染参数（函数）的对象。如果 [] 为空就是只渲染一次，之后都不会渲染

- 区别：

  - 主要区别是 `React.useMemo` 将调用 fn 函数并返回其结果，而 `React.useCallback` 将返回 fn 函数而不调用它。
  - useMemo 用于缓存计算结果，确保只有在依赖项发生变化时才会重新计算。
  - useCallback 用于缓存函数，确保只有在依赖项发生变化时才会重新创建函数。
  - `useMemo` 优化的是计算结果的缓存，而 `useCallback` 优化的是函数的缓存。

  如果需要经常使用某个函数，而这个函数的计算量很大，那么可以使用 `useMemo` 进行函数的缓存，而如果需要将该函数传递给子组件，那么可以使用 `useCallback` 进行函数的缓存。

## 7. React Hooks 和生命周期的关系？

**函数组件** 的本质是函数，没有 `state` 的概念的，因此**不存在生命周期**一说，仅仅是一个 **render 函数**而已。
但是引入 Hooks 之后就变得不同了，它能让组件在不使用 class 的情况下拥有 `state`，所以就有了生命周期的概念，所谓的生命周期其实就是 `useState` 、 `useEffect()` 和 `useLayoutEffect()` 。

即：**Hooks 组件（使用了 Hooks 的函数组件）有生命周期，而函数组件（未使用 Hooks 的函数组件）是没有生命周期的**。

下面是具体的 `class` 与 `Hooks` 的**生命周期**对应关系：

- `constructor` ：函数组件不需要构造函数，可以通过调用 `useState` 来初始化 `state` 。如果计算的代价比较昂贵，也可以传一个函数给 `useState`

```tsx
const [num, UpdateNum] = useState(0)
// useEffect - 发送网络请求 不可以直接在useEffect的回调函数外层直接包裹 await ，因为异步会导致清理函数无法立即返回
useEffect(() => {
  async function fetchData() {
    const res = await axios.get('http://geek.itheima.net/channels')
    console.log(res)
  }
}, [])
// useRef 使用useRef获取真实dom或组件实例的方法
const h1Ref = useRef(null)
return (
  <>
    <h1 ref={h1Ref}>this is h1</h1>
  </>
)
// 底层组件通过useContext函数获取数据
const name = useContext(Context)
```

- `getDerivedStateFromProps` ：一般情况下，我们不需要使用它，可以在渲染过程中更新 state，以达到实现 `getDerivedStateFromProps` 的目的。

```tsx
function ScrollView({ row }) {
  let [isScrollingDown, setIsScrollingDown] = useState(false)
  let [prevRow, setPrevRow] = useState(null)
  if (row !== prevRow) {
    // Row 自上次渲染以来发生过改变。更新 isScrollingDown。
    setIsScrollingDown(prevRow !== null && row > prevRow)
    setPrevRow(row)
  }
  return `Scrolling down: ${isScrollingDown}`
}
```

React 会立即退出第一次渲染并用更新后的 state 重新运行组件以避免耗费太多性能。

- `shouldComponentUpdate` ：可以用 `React.memo` 包裹一个组件来对它的 **`props` 进行浅比较**

```tsx
const Button = React.memo((props) => {
  // 具体的组件
})
```

**注意**： `React.memo` 等效于 `PureComponent` ，它只**浅比较 `props`**。这里也可以使用 `useMemo` 优化每一个节点。

- `render` ：这是函数组件体本身。
- `componentDidMount` , `componentDidUpdate` ： `useLayoutEffect` 与它们两的调用阶段是一样的。
  但是，我们推荐你一开始先用 `useEffect`，只有当它出问题的时候再尝试使用 `useLayoutEffect` 。 `useEffect` 可以表达所有这些的组合。

```tsx{9-11}
// componentDidMount
useEffect(() => {
  // 需要在 componentDidMount 执行的内容
}, []);
useEffect(() => {
  // 在 componentDidMount，以及 count 更改时 componentDidUpdate 执行的内容
  document.title = `You clicked ${count} times`;
  return () => {
    // 需要在 count 更改时 componentDidUpdate（先于 document.title = ... 执行，遵守先清理后更新）
    // 以及 componentWillUnmount 执行的内容
  }; // 当函数中 Cleanup 函数会按照在代码中定义的顺序先后执行，与函数本身的特性无关
}, [count]); // 仅在 count 更改时更新
```

请记得 React 会等待浏览器完成画面渲染之后才会延迟调用 ，因此会使得额外操作很方便 `componentWillUnmount` ：相当于 `useEffect` 里面返回的 `cleanup` 函数

```tsx
// componentDidMount/componentWillUnmount
useEffect(() => {
  // 需要在 componentDidMount 执行的内容
  return function cleanup() {
    // 需要在 componentWillUnmount 执行的内容
  }
}, [])
```

- `componentDidCatch` and `getDerivedStateFromError` ：目前还没有这些方法的 Hook 等价写法，但很快会加上。

| class 组件                 | Hooks 组件                  |
| -------------------------- | --------------------------- |
| `constructor`              | `useState`                  |
| `getDerivedStateFromProps` | `useState` 里面 update 函数 |
| `shouldComponentUpdate`    | `useMemo`                   |
| render                     | 函数本身                    |
| `componentDidMount`        | `useEffect`                 |
| `componentDidUpdate`       | `useEffect`                 |
| componentWillUnmount       | useEffect 里面返回的函数    |
| componentDidCatch          | 无                          |
| getDerivedStateFromError   | 无                          |
