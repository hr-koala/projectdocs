# React 组件 的理解

## React 介绍

React 一个专注于`构建用户界面`的 JS 库.特点：1.声明式 UI(JSX)；2.组件化；3.跨平台(react-native)。
核心库：`React, React-dom`;
<br/>
概念：`JSX`是 JavaScript XML（HTML）的缩写，表示在 JS 代码中书写 HTML 结构.
作用：在 React 中创建 HTML 结构（页面 UI 结构）<br/>
优势：

1. 采用类似于 HTML 的语法，降低学习成本，会 HTML 就会 JSX
2. 充分利用 JS 自身的可编程能力创建 HTML 结构

注意：JSX 并不是标准的 JS 语法，是 JS 的语法扩展，浏览器默认是不识别的，脚手架中内置的 `@babel/plugin-transform-react-jsx` 包，用来解析该语法

语法:`{ JS 表达式 }`<br/>
可以使用的表达式

1. 字符串、数值、布尔值、null、undefined、object（ [] / {} ）
2. 1 + 2、'abc'.split('')、['a', 'b'].join('-')
3. fn()

特别注意: **if 语句/ switch-case 语句/ 变量声明语句，这些叫做语句，不是表达式，不能出现在 {} 中！！**

1. JSX 必须有`一个根节点`，如果没有根节点，可以使用<></>（幽灵节点）替代
2. 所有标签必须形成`闭合`，成对闭合或者自闭合都可以
3. JSX 中的语法更加贴近 JS 语法，属性名采用`驼峰命名`法 class -> className for -> htmlFor
4. JSX 支持多行（换行），如果需要换行，需使用`()` 包裹，防止 bug 出现

## React 事件机制

```jsx
<div onClick={this.handleClick.bind(this)}> 点我 </div>
```

React 并不是将 `click` 事件绑定到了 div 的**真实 `DOM`** 上，而是通过**事件代理**的方式在 `document` 处监听了**所有的事件**，当事件发生并且冒泡到 `document` 处的时候，React 将事件内容**封装**并交由真正的处理函数运行。这样的方式不仅仅减少了内存的消耗，还能在组件挂载销毁时统一订阅和移除事件。

另外，冒泡到 `document` 上的事件也不是原生的浏览器事件，而是由 react 自己实现的**合成事件(SyntheticEvent)**。因此如果不想要事件冒泡的话，调用 `event.stopProppagation()` 方法是无效的，而是调用 `event.preventDefault()` 方法。
![React 事件机制](/images/react/react1.jpg)

`JSX` 上写的事件并没有绑定在对应的真实 `DOM` 上，而是通过**事件代理**的方式，将所有的事件都**统一**绑定在了 `document` 上。这样的方式不仅减少了内存消耗，还能在组件挂载销毁时统一订阅和移除事件。

实现**合成事件**的目的如下：

- 合成事件首先抹平了浏览器之间的**兼容**问题，另外这是一个跨浏览器原生事件包装器，赋予了**跨浏览器**开发的能力；
- 对于原生浏览器事件来说，浏览器会给监听器创建一个事件对象。如果你有很多的事件监听，那么就需要分配很多的事件对象，造成高额的内存分配问题。但是对于合成事件来说，有一个**事件池**专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次复用事件对象。

## React 组件中怎么做事件代理？它的原理是什么？

React 基于 **Virtual DOM** 实现了一个 `SyntheticEvent` 层（合成事件层），定义的事件处理器会接收到一个 **合成事件对象的实例**，它符合 W3C 标准，且与原生的浏览器事件拥有同样的接口，支持冒泡机制，所有的事件都自动绑定在最外层上。

在 React 底层，主要对合成事件做了两件事：

- **事件委派**：React 会把所有的事件绑定到结构的最外层，**使用统一的事件监听器**，这个事件监听器上维持了一个映射来保存所有组件内部事件监听和处理函数。
- **自动绑定**：React 组件中，每个方法的上下文都会指向该组件的实例，即自动绑定 `this` 为当前组件。

## 对 React-Fiber 的理解，它解决了什么问题？

React V15 在渲染时，会递归比对 `VirtualDOM` 树，找出需要变动的节点，然后同步更新它们， 一气呵成。这个过程期间， React 会占据浏览器资源，这会导致用户触发的事件得不到响应，并且会导致掉帧，导致用户感觉到卡顿。

为了给用户制造一种应用很快的“假象”，**不能让一个任务长期霸占着资源**。 可以将浏览器的渲染、布局、绘制、资源加载(例如 HTML 解析)、事件响应、脚本执行视作操作系统的“**进程**”，需要通过某些调度策略合理地分配 `CPU` 资源，从而提高浏览器的用户响应速率, 同时兼顾任务执行效率。

所以 React 通过 `Fiber` 架构，让这个执行过程变成可被中断。“适时”地让出 `CPU` 执行权，除了可以让浏览器及时地响应用户的交互，还有其他好处:

- **分批延时对 DOM 进行操作**，避免一次性操作大量 DOM 节点，可以得到更好的用户体验；
- 给浏览器一点喘息的机会，它会对代码进行编译优化（JIT）及进行热代码优化，或者对 reflow 进行修正。

**核心思想：**
`Fiber` 也称协程或者纤程。它和线程并不一样，协程本身是没有并发或者并行能力的（需要配合线程），它只是**一种控制流程的让出机制**。让出 `CPU` 的执行权，让 `CPU` 能在这段时间执行其他的操作。渲染的过程可以被中断，可以将控制权交回浏览器，让位给高优先级的任务，浏览器空闲后再恢复渲染。

## React.Component 和 React.PureComponent 的区别

`PureComponent` 表示一个纯组件，可以用来优化 React 程序，减少 `render` 函数执行的次数，从而提高组件的性能。

在 React 中，当 `prop` 或者 `state` 发生变化时，可以通过在 `shouldComponentUpdate` 生命周期函数中执行 `return false` 来阻止页面的更新，从而减少不必要的 `render` 执行。`React.PureComponent` 会自动执行  `shouldComponentUpdate`。

不过，`pureComponent` 中的 `shouldComponentUpdate()`  进行的是**浅比较**，也就是说如果是引用数据类型的数据，只会比较不是同一个地址，而不会比较这个地址里面的数据是否一致。**浅比较会忽略属性或状态突变的情况**，其实也就是数据引用指针没有变化，而数据发生改变的时候 `render` 是不会执行的。如果需要重新渲染那么就需要重新开辟空间引用数据。`PureComponent` 一般会用在一些纯展示组件上。

使用 `pureComponent` 的好处：当组件更新时，如果组件的 `props` 或者 `state` 都没有改变，`render` 函数就不会触发。省去`虚拟 DOM` 的生成和对比过程，达到提升性能的目的。这是因为 react 自动做了一层**浅比较**。

```jsx
shouldComponentUpdate(nextProps, nextState) {//接受两个参数
   //返回true则表示通过比较新返回的元素和之前渲染的元素，两者不相等，此时更新DOM
   return true;
}
//该方法在继承PureComponent类时则默认就存在，因此不需要自定义。
//该方法可以在继承Component类时自定义代码如下：
class CounterButton extends React.Component { //继承Component类
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }
  //自定义shouldComponentUpdate方法
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

与 PureComponent 不同的是，`React.memo()`是一个高阶组件，用于函数组件，通过对前后`props`进行**浅比较**，如果前后`props`不一致，该组件将重新渲染，反之，不进行渲染，使用缓存中的组件。

## React 高阶组件是什么，和普通组件有什么区别，适用什么场景

官方解释 ∶  
高阶组件（`HOC`）是 React 中用于**复用组件逻辑**的一种高级技巧。`HOC` 自身不是 `React API` 的一部分，它是一种基于 `React` 的组合特性而形成的**设计模式**。

高阶组件（`HOC`）就是一个**函数**，且该函数接受一个组件作为参数，并返回一个新的组件，它**只是一种组件的设计模式**，这种设计模式是由 react 自身的组合性质必然产生的。我们将它们称为纯组件，因为它们可以接受任何动态提供的子组件，但它们不会修改或复制其输入组件中的任何行为。

```js
// hoc的定义
function withSubscription(WrappedComponent, selectData) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: selectData(DataSource, props)
            };
        }
        // 一些通用的逻辑处理
        render() {
        // ... 并使用新数据渲染被包装的组件!
        return <WrappedComponent data={this.state.data} {...this.props} />;
    }
};
// 使用
const BlogPostWithSubscription = withSubscription(BlogPost, (DataSource, props) => DataSource.getBlogPost(props.id));
```

1. `HOC` 的优缺点

- **优点** ∶ 逻辑复用、不影响被包裹组件的内部逻辑。
- **缺点** ∶`hoc` 传递给被包裹组件的 `props` 容易和被包裹后的组件**重名**，进而被覆盖

2. 适用场景

- 代码复用，逻辑抽象
- 渲染劫持
- `State` 抽象和更改
- `Props` 更改

3. 具体应用例子

- **权限控制：** 利用高阶组件的 **条件渲染** 特性可以对页面进行权限控制，权限控制一般分为两个维度：页面级别和 页面元素级别

```js
// HOC.js
function withAdminAuth(WrappedComponent) {
  return class extends React.Component {
    state = {
      isAdmin: false,
    }
    async UNSAFE_componentWillMount() { // 如果你定义了 UNSAFE_componentWillMount，React 会在 constructor 之后就立即调用它
      const currentRole = await getCurrentUserRole();
      this.setState({
        isAdmin: currentRole === 'Admin',
      });
    }
    render() {
      if (this.state.isAdmin) {
        return <WrappedComponent {...this.props} />;
      } else {
        return (<div>您没有权限查看该页面，请联系管理员！</div>);
      }
    }
  };
}
// pages/page-a.js
class PageA extends React.Component {
    constructor(props) {
        super(props);
        // something here...
    }
    UNSAFE_componentWillMount() {
    // fetching data
    }
    render() {
    // render page with data
    }
}
export default withAdminAuth(PageA);
// pages/page-b.js
class PageB extends React.Component {
    constructor(props) {
        super(props);
        // something here...
    }
    UNSAFE_componentWillMount() {
    // fetching data
    }
    render() {
    // render page with data
    }
}
export default withAdminAuth(PageB);
```

**组件渲染性能追踪：** 借助父组件子组件生命周期规则捕获子组件的生命周期，可以方便的对某个组件的渲染时间进行记录 ∶

```js
class Home extends React.Component {
  render() {
    return <h1>Hello World.</h1>
  }
}
function withTiming(WrappedComponent) {
  return class extends WrappedComponent {
    constructor(props) {
      super(props)
      this.start = 0
      this.end = 0
    }
    UNSAFE_componentWillMount() {
      super.componentWillMount && super.componentWillMount()
      this.start = Date.now()
    }
    componentDidMount() {
      super.componentDidMount && super.componentDidMount()
      this.end = Date.now()
      console.log(
        `${WrappedComponent.name} 组件渲染时间为 ${this.end - this.start} ms`
      )
    }
    render() {
      return super.render()
    }
  }
}
export default withTiming(Home)
```

注意：`withTiming` 是利用 **反向继承** 实现的一个高阶组件，功能是计算被包裹组件（这里是 Home 组件）的渲染时间。

- **页面复用**

```js
const withFetching = fetching => WrappedComponent => {
    return class extends React.Component {
        state = {
            data: [],
        }
        async UNSAFE_componentWillMount() {
            const data = await fetching();
            this.setState({
                data,
            });
        }
        render() {
            return <WrappedComponent data={this.state.data} {...this.props} />;
        }
    }
}
// pages/page-a.js
export default withFetching(fetching('science-fiction'))(MovieList);
// pages/page-b.js
export default withFetching(fetching('action'))(MovieList);
// pages/page-other.js
export default withFetching(fetching('some-other-type'))(MovieList);
```

## 对 componentWillReceiveProps 的理解

该方法当 `props` 发生变化时执行，初始化 `render` 时不执行，在这个回调函数里面，你可以根据**属性**的变
化，通过调用 `this.setState()` 来更新你的组件状态，旧的属性还是可以通过 `this.props` 来获取,这里调
用更新状态是安全的，并不会触发额外的 `render` 调用。

**使用好处**：在这个生命周期中，可以在子组件的 `render` 函数执行前获取新的 `props`，从而更新子组件自己的
`state`。 可以将数据请求放在这里进行执行，需要传的参数则从 `componentWillReceiveProps(nextProps)`中获
取。而不必将所有的请求都放在父组件中。于是该请求只会在该组件渲染时才会发出，从而减轻请求负担。
`componentWillReceiveProps` 在初始化 `render` 的时候不会执行，它会在 `Component` 接受到新的状态(`Props`)时被
触发，一般用于父组件状态更新时子组件的重新渲染。

## 哪些方法会触发 React 重新渲染？重新渲染 render 会做些什么？

（1）**哪些方法会触发 react 重新渲染?**

- `setState()`方法被调用

`setState` 是 React 中最常用的命令，通常情况下，执行 `setState` 会触发 `render`。但是这里有个点值得关注，执
行 `setState` 的时候不一定会重新渲染。当 `setState` 传入 `null` 时，并不会触发 `render`。

```js
class App extends React.Component {
  state = {
    a: 1,
  }
  render() {
    console.log('render')
    return (
      <React.Fragement>
        <p>{this.state.a}</p>
        <button
          onClick={() => {
            this.setState({ a: 1 }) // 这里并没有改变 a 的值
          }}
        >
          Click me
        </button>
        <button onClick={() => this.setState(null)}>setState null</button>
        <Child />
      </React.Fragement>
    )
  }
}
```

- **父组件重新渲染**
  只要父组件重新渲染了，即使传入子组件的 `props` 未发生变化，那么子组件也会重新渲染，进而触发 `render`

（2）**重新渲染 render 会做些什么?**

- 会对新旧 `VNode` 进行对比，也就是我们所说的 `Diff` 算法。
- 对新旧两棵树进行一个**深度优先遍历**，这样每一个节点都会一个标记，在到深度遍历的时候，每遍历到一
  和个节点，就把该节点和新的节点树进行对比，如果有差异就放到一个**对象**里面
- 遍历差异对象，根据差异的类型，根据对应对规则更新 `VNode`

React 的处理 `render` 的基本思维模式是每次一有变动就会去**重新渲染整个应用**。在 `Virtual DOM` 没有出现之
前，最简单的方法就是直接调用 `innerHTML`。`Virtual DOM` 厉害的地方并不是说它比直接操作 `DOM` 快，而是说
不管数据怎么变，都会尽量以**最小的代价**去更新 `DOM`。React 将 `render` 函数返回的虚拟 `DOM` 树与老的进行比
较，从而确定 `DOM` 要不要更新、怎么更新。当 `DOM` 树很大时，遍历两棵树进行各种比对还是相当耗性能
的，特别是在顶层 `setState` 一个微小的修改，默认会去遍历整棵树。尽管 React 使用高度优化的 `Diff` 算法，但
是这个过程仍然会损耗性能.

## React 如何判断什么时候重新渲染组件？

组件状态的改变可以因为 `props` 的改变，或者直接通过 `setState` 方法改变。组件获得新的状态，
然后 React 决定是否应该重新渲染组件。只要组件的 `state` 发生变化，React 就会对组件进行重新渲
染。这是因为 React 中的 `shouldComponentUpdate` 方法默认返回 `true` ，这就是导致每次更新都重
新渲染的原因。

当 React 将要渲染组件时会执行 `shouldComponentUpdate` 方法来看它是否返回 `true` （组件应该更
新，也就是重新渲染）。所以需要重写 `shouldComponentUpdate` 方法让它根据情况返回 `true` 或
者 `false` 来告诉 React 什么时候重新渲染什么时候跳过重新渲染。

## React 声明组件有哪几种方法，有什么不同？

React 声明组件的**三种**方式：

- 函数式定义的 `无状态组件`
- ES5 原生方式 `React.createClass` 定义的组件
- ES6 形式的 `extends React.Component` 定义的组件

（1）**无状态函数式组件**

它是为了创建纯展示组件，这种组件只负责根据传入的 `props`来展示，不涉及到 `state`状态的操作
组件不会被实例化，整体渲染性能得到提升，不能访问`this`对象，不能访问**生命周期的方法**

（2）**ES5 原生方式 React.createClass // RFC**

`React.createClass`会自绑定函数方法，导致不必要的性能开销，增加代码过时的可能性。

（3）**E6 继承形式 React.Component // RCC**

目前极为推荐的创建**有状态组件**的方式，最终会取代 React.createClass 形式；相对于 React.createClass 可
以更好实现代码复用。

**无状态组件相对于于后者的区别**：

与无状态组件相比，`React.createClass` 和 `React.Component` 都是创建有状态的组件，这些组件是要被实例
化的，并且可以访问组件的生命周期方法。

**React.createClass 与 React.Component 区别**：

1. 函数 `this` 自绑定

- `React.createClass` 创建的组件，其每一个成员函数的`this`都有 React 自动绑定，函数中的 `this` 会被正确设
  置。
- `React.Component` 创建的组件，其成员函数不会自动绑定 `this`，需要开发者手动绑定，否则 `this` 不能获
  取当前组件实例对象。

2. 组件属性类型 `propTypes` 及其默认 `props` 属性 `defaultProps` 配置不同

```tsx
class List extends Component {
  static defaultProps = {}
}
```

- `React.createClass` 在创建组件时，有关组件 `props` 的属性类型及组件默认的属性会作为**组件实例的属性**
  来配置，其中 `defaultProps` 是使用 `getDefaultProps` 的方法来获取默认组件属性的
- React.Component 在创建组件时配置这两个对应信息时，他们是作为**组件类的属性**，不是组件实例的
  属性，也就是所谓的类的静态属性来配置的。

3. 组件初始状态 `state` 的配置不同

- `React.createClass` 创建的组件，其状态 `state` 是通过 `getInitialState` 方法来配置组件相关的状态；
- `React.Component` 创建的组件，其状态 `state` 是在 `constructor` 中像初始化组件属性一样声明的。

## 对有状态组件和无状态组件的理解及使用场景

（1）**有状态组件**

```tsx
class Bar from React.Component{
  state:{
    compType:'类组件',
    count:0
  }
  setCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render(){
    return (<div>{this.state.compType}</div>)
  }
}
```

特点：

- 是类组件
- 有继承
- 可以使用`this`
- 可以使用 react 的生命周期
- 使用较多，容易频繁触发生命周期钩子函数，影响性能
- 内部使用 `state`，维护自身状态的变化，有状态组件根据外部组件传入的 `props` 和自身的 `state`进行渲
  染。

使用场景：

- 需要使用到状态的。
- 需要使用状态操作组件的（无状态组件的也可以实现新版本 `react hooks` 也可实现）

总结：

类组件可以维护自身的状态变量，即组件的 `state` ，类组件还有不同的`生命周期方法`，可以让开发者能够
在组件的不同阶段（挂载、更新、卸载），对组件做更多的控制。类组件则既可以充当无状态组件，也可
以充当有状态组件。当一个类组件不需要管理自身状态时，也可称为无状态组件。

（2）**无状态组件**

```tsx
const Bar = (props) => {
  const [compType, setCompType] = useState('类组件')
  const [count, setCount] = useState(0)
  const [list, setList] = useState([])
  const handler = () => {
    setCount(count + 1)
  }
  return (
    <>
      <div>{compType}</div>
      <div onClick={handler}>{count}</div>
      {list.map((item) => (
        <div key={item.id}>{item.id}</div>
      ))}
    </>
  )
}
```

特点：

- 不依赖自身的状态 `state`
- 可以是类组件或者函数组件。
- 可以完全避免使用 `this` 关键字。（由于使用的是箭头函数事件无需绑定）
- 有更高的性能。当不需要使用生命周期钩子时，应该首先使用无状态函数组件
- 组件内部不维护 `state` ，只根据外部组件传入的 `props` 进行渲染的组件，当 `props` 改变时，组件重新
  渲染。

使用场景：

- 组件不需要管理 `state`，**纯展示**

优点：

- 简化代码、专注于 `render`
- 组件不需要被实例化，无生命周期，提升性能。 输出（渲染）只取决于输入（属性），无副作用
- 视图和数据的解耦分离

缺点：

- 无法使用 `ref`
- 无生命周期方法
- **无法控制组件的重渲染**，因为无法使用 `shouldComponentUpdate` 方法，当组件接受到新的属性时则
  会重渲染 (`React.memo()`是一个**高阶组件**，用于函数组件，通过对前后`props`进行**浅比较**，如果前后`props`不一致，该组件将重新渲染，反之，不进行渲染，使用**缓存**中的组件。避免父组件渲染子组件也渲染的性能消耗)

## 对 React 中 Fragment 的理解，它的使用场景是什么？

在 React 中，组件返回的元素**只能**有一个根元素。为了不添加多余的`DOM`节点，我们可以使用`Fragment`标签来
包裹所有的元素，`Fragment`标签不会渲染出任何元素。React 官方对 Fragment 的解释：
::: tip Fragment
React 中的一个常见模式是一个组件返回多个元素。`Fragments` 允许你将子列表分组，而无需向 `DOM` 添加额
外节点。
:::

```js
import React, { Component, Fragment } from 'react'
// 一般形式
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
    </React.Fragment>
  );
}
// 也可以写成以下形式
render() {
  return (
    <>
      <ChildA />
      <ChildB />
    </>
  );
}
```

## React 中可以在 render 访问 refs 吗？为什么？

**不可以**，`render` 阶段 `DOM` 还没有生成，无法获取 `DOM`。`DOM` 的获取需要在 `pre-commit` 阶段和 `commit` 阶
段：

```js
<>
  <span id="name" ref={this.spanRef}>
    {this.state.title}
  </span>
  <span>{this.spanRef.current ? '有值' : '无值'}</span>
</>
```

<img src="/images/react/react2.png" alt="React 中 render" height = "350" align = "center"  />

## 对 React 的插槽(Portals)的理解，如何使用，有哪些使用场景

::: tip React 官方对 `Portals` 的定义：
Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案
:::
`Portals` 是 React 16 提供的官方解决方案，使得组件可以脱离父组件层级挂载在`DOM`树的任何位置。通俗来讲，
就是我们 `render` 一个组件，但这个组件的 `DOM` 结构并不在本组件内。

`Portals`语法如下：( 传送门 )

```js
ReactDOM.createPortal(child, container)
```

- 第一个参数 `child` 是可渲染的 React 子项，比如元素，字符串或者片段等;
- 第二个参数 `container` 是一个 DOM 元素。

  一般情况下，组件的 `render` 函数返回的元素会被挂载在它的父级组件上：

```js
import DemoComponent from './DemoComponent';
render() {
 // DemoComponent元素会被挂载在id为parent的div的元素上
 return (
 <div id="parent">
 <DemoComponent />
 </div>
 );
}
```

然而，有些元素需要被挂载在更高层级的位置。最典型的应用场景：当父组件具有 `overflow: hidden` 或者 `z-index` 的样式设置时，
组件有可能被其他元素遮挡，这时就可以考虑要不要使用 `Portal`使组件的挂载脱离父组件。例如：对话框，模态窗。

```js{4}
import DemoComponent from './DemoComponent';
render() {
 // react会将DemoComponent组件直接挂载在真实的 dom 节点 domNode 上，生命周期还和16版本之前相同。
 return ReactDOM.createPortal(
 <DemoComponent />,
 domNode,
 );
}
```

## 在 React 中如何避免不必要的 render？

React 基于`虚拟 DOM` 和高效 `Diff 算法`的完美配合，实现了对 `DOM 最小粒度`的更新。大多数情况下，React 对
DOM 的渲染效率足以业务日常。但在个别复杂业务场景下，性能问题依然会困扰我们。此时需要采取一些措施来提升运行性能，其很重要的一个方向，就是避免不必要的渲染（`Render`）。这里提下优化的点：

- **shouldComponentUpdate 和 PureComponent**

  在 React 类组件中，可以利用 `shouldComponentUpdate`或者 `PureComponent` 来减少因父组件更新而触发子组
  件的 `render`，从而达到目的。`shouldComponentUpdate` 来决定是否组件是否重新渲染，如果不希望组件重新
  渲染，返回 false 即可。

- **利用高阶组件**

  在函数组件中，并没有 `shouldComponentUpdate` 这个生命周期，可以利用高阶组件，封装一个类似
  `PureComponet` 的功能

- **使用 React.memo**

  `React.memo` 是 React 16.6 新的一个 API，用来**缓存**组件的渲染，避免不必要的更新，其实也是一个高阶组件，
  与 `PureComponent` 十分类似，但不同的是， `React.memo`用于**函数组件**。  
  **函数组件本身没有识别 prop 值的能力，每次父组件更新的时候都相当于是给子组件一个新的 prop 值**

## 对 React-Intl 的理解，它的工作原理？

`React-intl`是雅虎的语言国际化开源项目`FormatJS`的一部分，通过其提供的组件和 API 可以与 ReactJS 绑定。

React-intl 提供了两种使用方法，一种是**引用 React 组件**，另一种是**直接调取 API**，官方更加推荐在 React 项目中使
用前者，只有在无法使用 React 组件的地方，才应该调用框架提供的 API。它提供了一系列的 React 组件，包括数
字格式化、字符串格式化、日期格式化等。

在`React-intl`中，可以配置不同的语言包，他的工作原理就是根据需要，在语言包之间进行切换。

## React 中什么是受控组件和非控组件？

（1）**受控组件**

```tsx
class InputComponent extends React.Component {
  // 声明组件状态
  state = {
    message: 'this is message',
  }
  // 声明事件回调函数
  changeHandler = (e) => {
    this.setState({ message: e.target.value })
  }
  render() {
    return (
      <div>
        {/* 绑定value 绑定事件*/}
        <input value={this.state.message} onChange={this.changeHandler} />
      </div>
    )
  }
}
```

在使用表单来收集用户输入时，例如 `<input>` `<select>` `<textearea>`等元素都要绑定一个 `change`事件，当表单的
状态发生变化，就会触发`onChange`事件，更新组件的`state`。这种组件在 React 中被称为**受控组件**，在受控组件
中，组件渲染出的状态与它的`value`或`checked`属性相对应，react 通过这种方式消除了组件的局部状态，使整个
状态可控。react 官方推荐使用受控表单组件。

受控组件更新 `state` 的流程：

- 可以通过初始 `state` 中设置表单的默认值,将状态数据设置为 input 标签元素的`value`属性的值
- 每当表单的值发生变化时，调用 `onChange` 事件处理器
- 事件处理器通过事件对象 `e` 拿到改变后的状态，并更新组件的 `state`
- 一旦通过 `setState` 方法更新 `state`，就会触发视图的重新渲染，完成表单组件的更新

**受控组件缺陷**：  
表单元素的值都是由 React 组件进行管理，当有多个输入框，或者多个这种组件时，如果想**同时**获取到全部的值
就必须每个都要编写事件处理函数，这会让代码看着很臃肿，所以为了解决这种情况，出现了非受控组件。

（2）**非受控组件**

```tsx
class InputComponent extends React.Component {
  // 使用createRef产生一个存放dom的对象容器
  msgRef = createRef()

  changeHandler = () => {
    console.log(this.msgRef.current.value)
  }

  render() {
    return (
      <div>
        {/* ref绑定 获取真实dom */}
        <input ref={this.msgRef} />
        <button onClick={this.changeHandler}>click</button>
      </div>
    )
  }
}
```

如果一个表单组件没有`value props`（单选和复选按钮对应的是`checked props`）时，就可以称为**非受控组件**。在
非受控组件中，可以使用一个`ref`来从`DOM`获得表单值。而不是为每个状态更新编写一个事件处理程序。

::: tip React 官方的解释：
要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以使用 `ref`来从 `DOM` 节点中获取
表单数据。

因为非受控组件将真实数据储存在 `DOM` 节点中，所以在使用非受控组件时，有时候反而更容易同时集成
React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你
的代码量。否则，你应该使用受控组件。
:::
例如，下面的代码在非受控组件中接收单个属性：

```js{4,8,12}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    alert("A name was submitted: " + this.input.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => (this.input = input)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

**总结**：页面中所有输入类的 `DOM` 如果是**现用现取**的称为非受控组件，而通过 `setState` 将输入的值维护到了 `state`
中，需要时再从 `state` 中取出，这里的数据就受到了 `state` 的控制，称为受控组件。

## React 中 refs 的作用是什么？有哪些应用场景？

`Refs` 提供了一种方式，用于访问在 `render` 方法中创建的 React 元素或 DOM 节点。`Refs` 应该谨慎使用，如下场
景使用 `Refs` 比较适合：

- 处理焦点、文本选择或者媒体的控制
- 触发必要的动画
- 集成第三方 DOM 库

Refs 是使用 `React.createRef()` 方法创建的，通过 `ref` 属性附加到 `React` 元素上。要在整个组件中使
用 `Refs`，需要将 `ref` 在构造函数中分配给其实例属性：

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }
  render() {
    return <div ref={this.myRef} />
  }
}
```

由于**函数组件没有实例**，因此不能在函数组件上直接使用 `ref` ：

```js{11}
function MyFunctionalComponent() {
  return <input />;
}
class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // 这将不会工作！
    return <MyFunctionalComponent ref={this.textInput} />;
  }
}
```

但可以通过闭包的帮助在函数组件内部进行使用 `Refs`：

```js{3,5,11-12}
function CustomTextInput(props) {
  // 这里必须声明 textInput，这样 ref 回调才可以引用它
  let textInput = null;
  function handleClick() {
    textInput.focus();
  }
  return (
    <div>
      <input
        type="text"
        ref={(input) => {
          textInput = input;
        }}
      />
      <input type="button" value="Focus the text input" onClick={handleClick} />
    </div>
  );
}
```

**注意**：

- 不应该过度的使用 `Refs`
- `ref` 的返回值取决于节点的类型：
  - 当 `ref` 属性被用于一个普通的 `HTML` 元素时， `React.createRef()` 将接收底层 `DOM` 元素作为
    它的 `current` 属性以创建 `ref` 。
  - 当 `ref` 属性被用于一个自定义的类组件时， `ref` 对象将接收该组件已挂载的实例作为他的 `current` 。
- 当在父组件中需要访问子组件中的 `ref` 时可使用传递 `Refs` 或回调 `Refs`。

## React 中除了在构造函数中绑定 this，还有别的方式吗？

1. 在构造函数中绑定 `this`

```js{6}
constructor(props){
  super(props);
  this.state={
    msg:'hello world',
  }
  this.getMsg = this.getMsg.bind(this)
}
```

2. 函数定义的时候使用箭头函数

```js{7}
constructor(props){
  super(props);
  this.state={
    msg:'hello world',
  }
  render(){
    <button onClcik={()=>{alert(this.state.msg)}}>点我</button>
  }
}
```

3. 函数调用时使用 `bind` 绑定 `this`

```js{1}
<button onClick={this.getMsg.bind(this)}>点我</button>
```

## React 组件的构造函数有什么作用？它是必须的吗？

构造函数主要用于两个目的：

1. 通过将对象分配给 `this.state` 来初始化本地状态
2. 将事件处理程序方法绑定到实例上

所以，当在 `React class` 中需要设置 `state` 的初始值或者绑定事件时，需要加上**构造函数**，官方 Demo：

```js{3,7}
class LikeButton extends React.Component {
  constructor() {
    super();
    this.state = {
      liked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ liked: !this.state.liked });
  }
  render() {
    const text = this.state.liked ? "liked" : "haven't liked";
    return (
      <div onClick={this.handleClick}>You {text} this. Click to toggle.</div>
    );
  }
}
ReactDOM.render(<LikeButton />, document.getElementById("example"));
```

构造函数用来新建父类的 `this` 对象；子类必须在 `constructor` 方法中调用 `super` 方法；否则新建实例时会报错；因
为子类没有自己的 `this` 对象，而是**继承**父类的 `this` 对象，然后对其进行加工。如果不调用 `super` 方法；子类就得不
到 `this` 对象。

**注意**：

- `constructor ()` 必须配上 `super()`, 如果要在 `constructor` 内部使用 `this.props` 就要 传入 `props` , 否则不用
- JavaScript 中的 `bind` 每次都会返回一个新的函数, 为了性能等考虑, 尽量在 `constructor` 中绑定事件

## React.forwardRef 是什么？它有什么作用？

`React.forwardRef` 会创建一个 React 组件，这个组件能够将其接受的 `ref` 属性**转发**到其组件树下的另一个组件
中。这种技术并不常见，但在以下两种场景中特别有用：

- 转发 `refs` 到 `DOM` 组件
- 在高阶组件中转发 `refs`

## 类组件与函数组件有什么异同？

**相同点**：

**组件**是 React 可复用的最小代码片段，它们会返回要在页面中渲染的 `React` 元素。也正因为 **组件是 React 的最小编码单位**，所以无论是函数组件还是类组件，在使用方式和最终呈现效果上都是完全一致的。  
我们甚至可以将一个类组件改写成函数组件，或者把函数组件改写成一个类组件（虽然并不推荐这种重构行为）。从使用者的角度而言，很难从使用体验上区分两者，而且在现代浏览器中，闭包和类的性能只在极端场景下才会有明显的差别。所以，基本可认为两者作为组件是完全一致的。

**不同点**：

- 它们在开发时的**心智模型**上却存在巨大的差异。类组件是**基于面向对象编程**的，它主打的是`继承`、`生命周期`等核心概念；而函数组件内核是**函数式编程**，主打的是 `immutable`、`没有副作用`、`引用透明`等特点。
- 之前，在使用场景上，如果存在需要使用**生命周期**的组件，那么主推类组件；设计模式上，如果需要使用**继承**，那么主推类组件。  
  但现在由于 React Hooks 的推出，生命周期概念的淡出，函数组件可以完全取代类组件。
  其次继承并不是组件最佳的设计模式，官方更推崇“组合优于继承”的设计概念，所以类组件在这方面的优势也在淡出。
- 性能优化上，类组件主要依靠 `shouldComponentUpdate` 阻断渲染来提升性能，而函数组件依靠 `React.memo` 缓存渲染结果来提升性能。
- 从上手程度而言，类组件更容易上手，从未来趋势上看，由于 React Hooks 的推出，函数组件成了社区未来主推的方案。
- 类组件在**未来时间切片与并发模式**中，由于生命周期带来的复杂度，并不易于优化。而函数组件本身轻量简单，且在 `Hooks` 的基础上提供了比原先更细粒度的逻辑组织与复用，更能适应 React 的未来发展。
