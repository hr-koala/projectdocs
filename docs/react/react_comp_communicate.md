# React 组件通信

React 组件间通信常见的几种情况:

- 父组件向子组件通信
- 子组件向父组件通信
- 跨级组件通信
- 非嵌套关系的组件通信

## 1. 父子组件的通信方式？

- 父组件向子组件通信：父组件通过 `props` 向子组件传递需要的信息。**props 是只读对象（readonly）**
- 子组件向父组件通信：: `props+回调`的方式。

```ts{7,13,19-20}
// 父组件 Parent
const Parent = () => {
  const getMsg = (msg) => {
    console.log(msg);
  };
  return <Child name="react" callback={getMsg}></Child>;
};
// 子组件: Child
const Child = (props) => {
  const cb = (msg) => {
    return () => {
      props.callback(msg); // 获取父组件传递的callback属性值
    };
  };
  return (
    <p>
      {props.name}
      <button onClick={cb("你好!")}>你好</button>
    </p>
  );
};
```

## 2. 跨级组件的通信方式？

父组件向子组件的子组件通信，向更深层子组件通信：

- 使用 `props`，利用中间组件层层传递,但是如果父组件结构较深，那么中间每一层组件都要去传递 props，增
  加了复杂度，并且这些 `props` 并不是中间组件自己需要的。
- 使用 `context`，`context` 相当于一个大容器，可以把要通信的内容放在这个容器中，这样不管嵌套多深，都可
  以随意取用，对于跨越多层的全局数据可以使用 `context` 实现。

```ts{3,8-14,30-33}
// context 方式实现跨级组件通信
// Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据
const BatteryContext = React.createContext(); // 创建一个Context
// 子组件的子组件
class GrandChild extends Component {
  render() {
    return (
      // Consumer(消费者)容器，可以获取从顶层传递的context
      <BatteryContext.Consumer>
      {/* 以函数的方式使用context */}
        {(color) => (
          <h1 style={{ color: color }}>我是红色的:{color}</h1>
        )}
      </BatteryContext.Consumer>
    );
  }
}
// 子组件
const Child = () => {
  return <GrandChild />;
};
// 父组件
class Parent extends Component {
  state = {
    color: "red",
  };
  render() {
    const { color } = this.state;
    return (
      // Provider(生产者)共享容器,在顶层传入value
      <BatteryContext.Provider value={color}>
        <Child />
      </BatteryContext.Provider>
    );
  }
}
```

## 3. 非嵌套关系组件的通信方式？

即没有任何包含关系的组件，包括兄弟组件以及不在同一个父级中的非兄弟组件。

- 可以使用自定义事件通信（**发布订阅模式**）
- 可以通过 `redux` 等进行全局状态管理（mobx / redux / zustand）
- 如果是兄弟组件通信，可以找到这两个兄弟节点共同的父节点, 结合父子间通信方式进行通信。

```ts{4-5,21-23,25-27,43-46}
// 使用自定义事件通信（发布订阅模式）
// 需要一个 events 依赖来做发布订阅动作
// npm install events --save    // event.tsx
import { EventEmitter } from "events";
export default new EventEmitter();
//
const App = (props) => {
  return (
    <div className="app">
      <Foo /> // 兄弟组件 Foo
      <Content /> // 兄弟组件 Content
    </div>
  );
};

import emitter from "./event";
const Foo = (props) => {
  // 初始化 state, 相当于 class 组件中的 this.state = {fooName: ""}
  const [fooName, setFooName] = React.useState("");
  // 监听 setFooName 事件的回调函数
  const setFooNameCallback = (name) => {
    setFooName(name);
  };
  // 类似于类组件中的 componentDidMount
  useEffect(() => {
    emitter.addListener("setFooName", setFooNameCallback);
  }, []);
  // 类似于类组价中 componentWillUnmout
  useEffect(() => {
    // 组件卸载移除监听
    return () => {
      emitter.removeListener("setFooName", setFooNameCallback);
    };
  });
  return (
    <div className="foo">{fooName}</div>
  );
};

import emitter from "./event";
const Content = (props) => {
  // 类似于类组件中的 componentDidMount
  useEffect(() => {
    // 触发 setFooName 事件，向订阅者传值；
    emitter.emit("setFooName", "kobe");
  }, []);
  return (
    <div className="content"> </div>
  );
};
// 事件总线（Event Bus）：事件总线是一种发布-订阅模式的实现，允许不直接相关的组件通过中央事件总线进行通信。
```

## 4. 如何解决 props 层级过深的问题

- 使用 `Context API`：提供一种组件之间的状态共享，而不必通过显式组件树逐层传递 props；
- 使用 `Redux` 等状态库。

## 5. 组件通信的方式有哪些

1. **⽗组件向⼦组件通讯**: ⽗组件可以向⼦组件通过传 `props` 的⽅式，向⼦组件进⾏通讯
2. **⼦组件向⽗组件通讯**: `props+回调`的⽅式，⽗组件向⼦组件传递 props 进⾏通讯，此 props 为作⽤域为⽗组
   件⾃身的函数，⼦组件调⽤该函数，将⼦组件想要传递的信息，作为参数，传递到⽗组件的作⽤域中
3. **兄弟组件通信**: 找到这两个兄弟节点共同的⽗节点,结合上⾯两种⽅式由⽗节点转发信息进⾏通信
4. **跨层级通信**: `Context` 设计⽬的是为了共享那些对于⼀个组件树⽽⾔是“全局”的数据，例如当前认证的⽤
   户、主题或⾸选语⾔，对于跨越多层的全局数据通过 `Context` 通信再适合不过
5. **[发布订阅模式](#3-非嵌套关系组件的通信方式)**: 发布者发布事件，订阅者监听事件并做出反应,我们可以通过引⼊ `event` 模块进⾏通信
6. **全局状态管理⼯具**: 借助 `Redux` 或者 `Mobx` 等全局状态管理⼯具进⾏通信,这种⼯具会维护⼀个全局状态中⼼
   `Store`,并根据不同的事件产⽣新的状态
