# setState 的 “前世今生”

![setState](/images/react/react6.png)

## React setState 调用原理

### **16.x 版本之前**

React 16.0 版本之前，React 中的 setState 调用原理涉及到一些重要的概念，包括**虚拟 DOM** (`Virtual DOM`)、**调度** (`Reconcile`) 和 (`Transaction`)。在这个版本之前，React 使用了一种称为“**合并**（merge）”的策略来处理 setState 的更新。

以下是在 React 16.0 版本之前 setState 的调用原理的主要步骤：

1. **触发 `setState`**： 当组件通过调用 setState 来请求更新状态时，React 会将新的状态数据**合并**到组件的状态队列中，而不会立即执行更新。
2. **生成虚拟 DOM**： React 将根据组件的新状态数据生成一个新的虚拟 DOM 树。这个虚拟 DOM 树是一个轻量级的 **JavaScript 对象**表示，它反映了组件的预期输出。
3. **比较虚拟 DOM**： React 会将新生成的虚拟 DOM 树与先前的虚拟 DOM 树进行比较，以确定需要进行的实际 DOM 更新。
4. **计算差异**： 在比较虚拟 DOM 树时，React 会计算出两棵树之间的差异（称为变化集合或变更集合）。这些差异表示需要对实际 DOM 进行的最小更改，以使其与新的虚拟 DOM 树保持一致。
5. **更新实际 DOM**： 最后，React 将根据计算出的差异集合来更新实际 DOM。这个过程通常会批量处理多个 DOM 更新，以提高性能。

React 16.0 版本之前的 setState 调用原理是通过**合并新状态**、**生成虚拟 DOM**、**比较虚拟 DOM 并计算差异**，最终将变更应用于实际 DOM 来实现组件更新。这个过程被称为**调度过程**，它使 React 能够高效地管理组件的状态和界面更新。

然而，React 16.0 版本之后引入了一种更快速的调度算法，称为 `Fiber`，它在内部实现上有一些重要的变化，以进一步提高性能和交互性。

### **16.x 版本之后**

React 16.0 版本之后，React 引入了一种称为 `Fiber` 的新的**调度算法**，以改进性能和交互性，并且 setState 的调用原理也经历了一些重要的变化。以下是 React 16.0 版本之后 setState 的调用原理的主要步骤：

1. **触发 setState**： 当组件通过调用 `setState` 来请求更新状态时，React 不再立即执行状态更新。相反，它**将更新请求存储在内部数据结构中**，然后继续执行后续任务。
2. **进入调度阶段**： 在 React 内部，存在一个称为 `Fiber 树`的数据结构，它代表了组件树的结构。React 将开始一个称为调度（Reconciliation）的阶段，该阶段**负责处理状态更新和重新渲染**。
3. **生成 Fiber 树**： React 创建一个新的 `Fiber` 树，该树反映了组件的预期输出。这个 Fiber 树与虚拟 DOM 有些相似，但它**是一种更高效的数据结构，用于描述组件树的结构**。
4. **比较 `Fiber` 树**： React 将新生成的 Fiber 树与上一次的 Fiber 树进行比较，以确定需要进行的实际 DOM 更新。
5. **计算差异**： 在比较 Fiber 树时，React Fiber 算法会计算出两棵树之间的差异（称为变化集合或变更集合）。这些差异表示需要对实际 DOM 进行的最小更改，以使其与新的 Fiber 树保持一致。
6. **构建更新队列**： React 将计算出的差异转换为更新队列，该队列包含需要更新的组件和 DOM 节点。
7. **优先级调度**： 一个重要的变化是 **Fiber 算法引入了任务优先级调度**。React 可以根据任务的优先级来安排更新，以确保更重要的任务能够更快地执行，从而提高性能和交互性。[React Expiration Time](/react/react_expiration_time)
8. **更新实际 DOM**： 最后，React 将根据更新队列中的任务，以适当的顺序更新实际 DOM。这个过程通常会批量处理多个 DOM 更新，以提高性能。

React 16.0 版本之后，setState 的调用原理经历了一些变化，包括使用 `Fiber 树`、**任务优先级调度**等，以提高性能和交互性。这个新的调度算法使 React 能够更有效地管理组件的状态和界面更新，并更好地响应用户交互。这些变化使得 React 可以更好地处理大型应用程序和复杂的用户界面。

## React setState 批量更新过程

上面的内容提到了 批量更新这个概念，那么它是如何进行批量更新的呢？

React 会将多个 setState 调用**合并**为一个单一的更新。如果多个 setState 调用发生在同一个事件处理函数内部，它们会被合并成一个更新。这里同样可以想象得到，利用到的也是队列，将多个调用 setState 事件放到**队列**中，在一定时间范围内多次调用，那么会优化成为 一次 setState 的效果。 <br/>
**事件处理函数自带 `batchedUpdates`** 调用多次 setState 将会开启，batchUpdate 会将多次 setState 合并到一次 React 任务更新中.
<br/>
[关于 batchUpdate](https://juejin.cn/post/7062928241920573453)

下面贴出部分源码

```tsx{9,15,18}
// 1. isBatchingUpdates 状态是如何发生变化的
// 2. previousIsBatchingUpdates 变量会保存之前的 isBatchingUpdates 状态
// 3. 最后 finally 重新赋值到 isBatchingUpdates，然后在一起批量更新

// TODO: Batching should be implemented at the renderer level, not inside
// the reconciler.
function batchedUpdates<A, R>(fn: (a: A) => R, a: A): R {
  // 当前是否 批量更新赋值到 previous 状态上
  const previousIsBatchingUpdates = isBatchingUpdates;
  isBatchingUpdates = true;
  try {
    return fn(a); // 这里调用的是 实际上是 handleClick 方法
  } finally {
    // 将过去上一次更新的 previous 存到全局变量 BatchingUpdates 上
    isBatchingUpdates = previousIsBatchingUpdates;
    // 当不是批量更新 而且不是在渲染阶段，那么 state 的值将会一次更新，调用 performSyncWork
    if (!isBatchingUpdates && !isRendering) {
      performSyncWork(); // 直接同步一起更新 所以这里我们可以
    }
  }
}
```

React 能够在一个更新周期内收集和处理多个 `setState` 调用，从而减少了不必要的重渲染和 DOM 操作，提高了性能。但需要注意的是，这个过程仍然是**同步**的，即在**事件处理函数中的 `setState` 调用会等待事件处理函数执行完成后才会触发更新**。

**setTimeout 中特殊情况**: `setTimeout` 是一个`宏任务`，从内存角度来说，和之前任务不是在同一个栈中。所以执行到这个宏任务的时候，之前的栈中数据已被还原（`isBatchingUpdates` 是初始值 false），所以不是批量更新.

```tsx{6}
// 在 setTimeout 中 强行调用 实现 batchUpdate
import { unstable_batchedUpdates as batchedUpdates } from "react-dom";
handleClick = () => {
  // setTimeout中没有`batchedUpdates`
  setTimeout(() => {
    batchedUpdates(() => this.countNumber());
  }, 0);
};
```

## React setState 第二个参数作用

在 React 中，setState 方法可以接受一个可选的第二个参数，该参数是一个**回调函数**。该回调函数在状态更新并且组件重新渲染完成后被调用。第二个参数的**主要作用是允许你在状态更新完成后执行一些额外的逻辑或操作**。

以下是使用 setState 的第二个参数的一些常见用途：

1. **执行回调操作**： 你可以在第二个参数中传递一个回调函数，用于在状态更新后执行特定的操作。这在需要在状态更新后立即执行某些代码时非常有用。

```tsx
this.setState({ count: this.state.count + 1 }, () => {
  console.log("Count updated:", this.state.count);
});
```

2. **异步操作**： 如果你需要在状态更新后执行异步操作（例如发起网络请求），你可以将这些操作放在第二个参数的回调函数中，以确保它们在组件重新渲染后执行。

```tsx
this.setState({ data: newData }, () => {
  // 在状态更新后执行异步操作
  fetchDataFromServer();
});
```

3. **获取最新状态值**： 你可以使用第二个参数中的回调函数来访问更新后的状态值，而不必依赖于 this.state。这在需要在状态更新后立即使用新状态进行某些计算时非常有用。

```tsx
this.setState({ count: this.state.count + 1 }, () => {
  console.log("Updated count:", this.state.count); // 可以获取最新状态值
});
```

需要**注意**，由于 setState 可能是异步的，React 可能会对多个 setState 调用进行**批处理**，因此状态不一定会立即更新。回调函数中的代码会在状态真正更新并且组件重新渲染后才执行，因此你可以在其中放心地访问最新的状态值。特殊情况是在 `setTimeout` 在各种 宏任务异步函数的回调里面使用 setState.

setState 的**第二个参数允许你在状态更新后执行特定的操作，以满足不同的需求**，例如执行回调、进行异步操作或访问最新的状态值。这是一个有用的特性，可以帮助你更好地控制和处理组件的状态更新。

## `setState` 与 `replaceState` 区别

`setState` 和 `replaceState` 都是 React 组件中用于更新状态的方法，但它们之间存在一些关键的区别：

- `replaceState`：
  - `replaceState` 也是 React 提供的方法之一，用于替换组件的整个状态。
  - 当你调用 replaceState 时，它会**完全替换当前状态，而不是合并状态**。这意味着原有的状态属性将被移除，只有传递给 replaceState 的新状态属性将存在。
  - 由于 replaceState 替换整个状态，因此它通常不建议在大多数情况下使用，因为它可能会导致组件重新渲染，而不仅仅是更新状态。
  ```tsx
  this.replaceState({ count: this.state.count + 1 }); // 替换整个状态
  ```

**总结**：

1. `setState` 用于**部分更新**组件状态，通常是更常见的选择，它会保留原有状态的其他属性。
2. `replaceState` 用于**完全替换**组件状态，通常应该避免在大多数情况下使用，除非你有特殊的需求要替换整个状态。

请注意，在 React 16.0 版本之后，replaceState 方法已经被标记为不推荐使用，而且在函数式组件中不再支持。在新的 React 版本中，更加推荐使用 setState 进行状态更新。

## state 如何注入组件

这里其实是举例说明 State 是如何注入到组件中使用的，在 React 中，你可以通过将状态（`state`）注入到组件中来使状态可用于组件。这通常是**通过将状态作为组件的 `props`（属性）传递给组件来实现的**。以下是如何在 React 中将状态注入组件的基本方法：

1. **将状态作为 Props 传递**： 在父组件中，你可以将状态作为 props 传递给子组件。这将使子组件能够访问和使用父组件的状态。

```tsx
class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Hello from Parent!",
    };
  }
  render() {
    return <ChildComponent message={this.state.message} />;
  }
}

class ChildComponent extends React.Component {
  render() {
    return <div>{this.props.message}</div>;
  }
}
```

2. **使用 Context API**： 如果你需要在组件树的深层嵌套组件之间传递状态而不必一级一级传递，可以使用 React 的` Context API`。Context 允许你**在组件树中共享数据**，使状态注入变得更加方便。

```tsx{2,13,21}
// 创建一个上下文对象
const MyContext = React.createContext();

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Hello from Parent!",
    };
  }
  render() {
    return (
      <MyContext.Provider value={this.state.message}>
        <ChildComponent />
      </MyContext.Provider>
    );
  }
}

class ChildComponent extends React.Component {
  static contextType = MyContext;
  // 或者 const message = useContext(MyContext);

  render() {
    return <div>{this.context}</div>;
  }
}
```

3. **使用第三方状态管理库**： 在大型应用中，你可能会发现使用 React 内置的状态管理方式不足以满足需求。在这种情况下，你可以考虑使用像 `Redux`、`Mobx`、`Recoil` 等第三方状态管理库。这些库允许你在全局或局部存储状态，并通过连接器（connectors）将状态注入到组件中，以便在需要的时候使用。

```tsx{3,11,17}
// 使用 Redux 状态管理库的示例
// 需要使用 react-redux 库来连接 React 组件与 Redux store
import { connect } from "react-redux";

class MyComponent extends React.Component {
  render() {
    return <div>{this.props.message}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
  };
};

export default connect(mapStateToProps)(MyComponent);
```

4. **使用 Hooks**： 如果你在函数式组件中工作，可以使用 React Hooks 来管理状态。useState Hook 可以帮助你在函数组件中定义和使用状态。

```tsx
import React, { useState } from "react";

function MyComponent() {
  const [message, setMessage] = useState("Hello from Hook!");

  return <div>{message}</div>;
}
```

## 从 Reducer 到组件 经历了什么过程

在一个典型的 React 应用中，从 Reducer（Redux 或其他状态管理工具中的 Reducer）到组件之间经历了以下过程：

1. **Reducer 的创建**： 首先，你需要创建一个 Reducer 函数。Reducer 是一个**纯函数**，它接受两个参数：当前状态（state）和一个操作（action），然后返回一个新的状态。Reducer 的作用是根据操作来更新状态，通常使用一个 switch 语句来根据操作的类型执行不同的更新。

```tsx
// 一个简单的 Reducer 示例
const initialState = {
  count: 0,
};

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}
```

2. **Store 的创建**： 接下来，你需要创建一个 `Redux Store`（如果你使用的是 Redux）。Store 是一个包含应用程序状态的容器，它通过 Reducer 来管理状态的变化。

```tsx{1,2}
import { createStore } from "redux";
const store = createStore(counterReducer);
```

3. **组件连接到 Store**： 现在，你需要将 React 组件连接到 Redux Store，以便它们可以访问 Store 中的状态并将其用于渲染。这通常使用 `React-Redux` 库中的 `connect` 函数来实现。

```tsx{1,15,17,21,23-24,28}
import { connect } from "react-redux";

class CounterComponent extends React.Component {
  render() {
    return (
      <div>
        <p>Count: {this.props.count}</p>
        <button onClick={this.props.increment}>Increment</button>
        <button onClick={this.props.decrement}>Decrement</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterComponent);
```

4. **组件使用状态**： 连接到 Redux Store 的组件现在可以**通过 props 访问状态**，并且可以触发操作来更新状态。在上面的示例中，`this.props.count` 包含了从 Redux Store 中获取的计数器的值，而 `this.props.increment` 和 `this.props.decrement` 方法用于分发相应的操作。

5. **操作的分发和 Reducer 的执行**： 当组件触发操作时（例如，点击按钮），操作会分发到 Redux Store 中。Redux Store 会调用 `Reducer` 并传递当前状态和操作。Reducer 会根据操作的类型来更新状态，然后返回一个新的状态。这个新状态会被 `Redux Store` **存储**起来。

6. **状态的更新和重新渲染**： 当状态更新后，与之连接的组件会自动重新渲染。这是因为 **React-Redux 会检测到状态的变化，并将新的状态传递给组件的 props**。这将触发组件的 render 方法，以便它可以使用新的状态来更新界面。

可以看出目的其实是它遵循了单一数据源和单向数据流的原则，使应用程序的状态更加可控和可维护。

很有必要的**补充**

当你使用 Redux 或其他状态管理工具时，**将状态从 Reducer 到组件**的流程是核心的状态管理流程。然而，还有一些进一步的细节和最佳实践，可以帮助你更好地组织和维护你的应用程序：

1. **Action Creators**： 为了更好地组织代码和减少重复，通常会创建 `action creators`。这些是函数，用于**生成操作对象**。例如：

```tsx
function increment() {
  return { type: "INCREMENT" };
}

function decrement() {
  return { type: "DECREMENT" };
}
```

这允许你在组件中调用 increment 和 decrement 函数来分发相应的操作，而不必手动创建操作对象。

2. **分离 Reducer**： 在一个大型应用程序中，将一个庞大的 Reducer 拆分为多个小的 Reducer 可以更好地管理代码。你可以使用 Redux 提供的 `combineReducers` 函数来**合并**多个 Reducer。

```tsx
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
const rootReducer = combineReducers({
  router: routerReducer,
  counter: counterReducer,
  user: userReducer,
  // 更多的 reducer
});
```

3. **中间件**： Redux 支持中间件，它们可以用于处理异步操作、日志记录、路由等。中间件可以扩展 Redux 的功能，使其更强大。

```tsx
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk"; // 异步操作中间件
import { createLogger } from "redux-logger"; // 日志中间件
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
const history = createHistory();
const router = routerMiddleware(history);

const middlewares = [thunk, router];
let devToolsExtension = (f) => f;

if (process.env.NODE_ENV === "development") {
  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);
  if (window.devToolsExtension) {
    devToolsExtension = window.devToolsExtension();
  }
}
const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares), devToolsExtension)
);
```

4. **Selectors**： 使用 selectors 可以帮助你在组件中选择和派生状态的部分，以提供更高级的状态访问接口。这有助于隔离组件与状态结构的细节，使组件更独立和可维护。这个点可以大家学习一下，对于开发很方便

```tsx
const selectCounter = (state) => state.counter;
const selectUser = (state) => state.user;
```

5. **使用 Provider**： 在应用程序的顶层组件上使用 Provider，以便 Redux Store 可以在整个组件树中访问。

```tsx
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

Redux 或其他状态管理工具提供了一种强大的方式来管理应用程序的状态，并使状态在组件之间共享变得更容易。了解这些额外的概念和最佳实践可以帮助你更好地组织和维护你的 React 应用程序的状态管理部分。

```tsx{4-5,15,17,26,27,34,35,37-39}
// stores/index.tsx
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "@/stores/userSlice";
const store = configureStore({
  reducer: combineReducers({ user: userReducer }),
});
export default store;
// stores/userSlice.tsx
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  username: localStorage.getItem("username") || "admin",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserItem(state, action) {
      const { username } = action.payload;
      if (username !== state.username) {
        localStorage.setItem("username", action.payload.username || "");
      }
      Object.assign(state, action.payload);
    },
  },
});
export const { setUserItem } = userSlice.actions;
export default userSlice.reducer;
// Dashboard.tsx
import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "antd";
import { setUserItem } from "@/stores/userSlice";
const Dashboard: FC = () => {
  const { username } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const changeUsername = (val: string) => {
    dispatch(
      setUserItem({
        username: val,
      })
    );
  };
  return (
    <Input
      value={username}
      onChange={(e) => changeUsername(e.target.value)}
    ></Input>
  );
};
export default Dashboard;
```

## state 和 props 之间的区别

React 中，`state` 和 `props` 都是**用于管理和传递数据**的关键概念，但它们之间存在一些重要的区别：

1. **State（状态）**：

- `state` 是**组件内**部管理的数据，用于表示组件的内部状态。
- `state` 是**可变的**，可以在组件的生命周期内随时更新。通过调用 `setState` 方法来更新状态。
- `state` 只能在类组件（`class components`）中使用，因为函数组件（`function components`）之前**没有内置的状态管理机制**。但自 React 16.8 版本引入 Hooks 后，函数组件也可以使用 `useState` 等 Hook 来管理状态。
- `state` 的更新可能是**异步的**，所以不应该依赖于同步更新状态后立即获取最新值。如果需要在状态更新后执行操作，可以使用 `setState` 的回调函数或 `useEffect` 钩子。

```tsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.incrementCount = this.incrementCount.bind(this);
  }
  incrementCount() {
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    return (
      <div>
        Count: {this.state.count}
        <button onclick={() => this.incrementCount} />
      </div>
    );
  }
}
```

2. **Props（属性）**：

- `props` 是**组件之间**传递数据的一种方式，用于从父组件向子组件传递数据。
- `props` 是**不可变的**，子组件不能直接修改从父组件接收到的 props。
- `props` 可以在函数组件和类组件中使用，并且是函数组件的主要输入。
- `props` 是**单向的**，数据从父组件流向子组件，子组件不能直接影响父组件的 props。

```tsx
function ChildComponent(props) {
  return <div>Hello, {props.name}!</div>;
}
function ParentComponent() {
  return <ChildComponent name="Alice" />;
}
```

**总结**：

- state 用于管理组件的内部状态，它是**可变的**，只能在**组件内**部使用。
- props 用于在**组件之间**传递数据，它是**不可变的**，子组件通过 props 接收父组件传递的数据。
- state 和 props 在 React 组件中扮演不同的角色，它们一起帮助你管理组件的数据流和渲染。通常，`state` 用于保存组件自身的状态，而 `props` 用于在组件之间传递数据。
