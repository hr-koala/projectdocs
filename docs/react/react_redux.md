# Redux

## 1. 对 Redux 的理解，主要解决什么问题

React 是**视图层框架**。Redux 是一个用来**管理数据状态**和 UI 状态的 JavaScript 应用工具。随着 JavaScript 单页应用（SPA）开发日趋复杂， JavaScript 需要管理比任何时候都要多的 `state`（状态）， Redux 就是降低管理难度的。
（Redux 支持 React、Angular、jQuery 甚至纯 JavaScript）。

在 React 中，UI 以组件的形式来搭建，组件之间可以嵌套组合。但 React 中组件间通信的**数据流是单向的**，顶层组件可以通过 `props` 属性向下层组件传递数据，而下层组件不能向上层组件传递数据，兄弟组件之间同样不能。
这样简单的**单向数据流**支撑起了 React 中的数据可控性。

当项目越来越大的时候，管理数据的事件或回调函数将越来越多，也将越来越不好管理。管理不断变化的 `state` 非常困难。如果一个 model 的变化会引起另一个 model 变化，那么当 view 变化时，就可能引起对应 model 以及另一个 model 的变化，依次地，可能会引起另一个 view 的变化。直至你搞不清楚到底发生了什么。<br/>
`state` 在什么时候，由于什么原因，如何变化已然不受控制。 当系统变得错综复杂的时候，想重现问题或者添加新功能就会变得举步维艰。如果这还不够糟糕，考虑一些来自前端开发领域的新需求，如更新调优、服务端渲染、路由跳转前请求数据等。`state` 的管理在大项目中相当复杂。

Redux 提供了一个叫 `store` 的统一仓储库，组件通过 `dispatch` 将 `state` 直接传入 `store`，不用通过其他的组件。
并且组件通过 `subscribe` 从 `store` 获取到 `state` 的改变。使用了 Redux，所有的组件都可以从 `store` 中获取到所需的 state，他们也能从 `store` 获取到 state 的改变。这比组件之间互相传递数据清晰明朗的多。

**主要解决的问题**：<br/>
单纯的 Redux 只是一个**状态机**，是没有 UI 呈现的，`react-redux` 作用是将 Redux 的状态机和 React 的 UI 呈现绑定在一起，当你 **`dispatch` `action` 改变 `state`** 的时候，会自动更新页面。

## 2. Redux 原理及工作流程

（1）**原理**
Redux 源码主要分为以下几个模块文件

- `compose.js` 提供从右到左进行函数式编程
- `createStore.js` 提供作为生成唯一 store 的函数
- `combineReducers.js` 提供合并多个 reducer 的函数，保证 store 的唯一性
- `bindActionCreators.js` 可以让开发者在不直接接触 dispacth 的前提下进行更改 state 的操作
- `applyMiddleware.js` 这个方法通过中间件来增强 dispatch 的功能

```tsx
const actionTypes = {
  ADD: "ADD",
  CHANGEINFO: "CHANGEINFO",
};
const initState = {
  info: "初始化",
};
export default function initReducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.CHANGEINFO:
      return {
        ...state,
        info: action.preload.info || "",
      };
    default:
      return { ...state };
  }
}

export default function createStore(reducer, initialState, middleFunc) {
  if (initialState && typeof initialState === "function") {
    middleFunc = initialState;
    initialState = undefined;
  }
  let currentState = initialState;
  const listeners = [];
  if (middleFunc && typeof middleFunc === "function") {
    // 封装dispatch
    return middleFunc(createStore)(reducer, initialState);
  }
  const getState = () => {
    return currentState;
  };
  const dispatch = (action) => {
    currentState = reducer(currentState, action);
    listeners.forEach((listener) => {
      listener();
    });
  };
  const subscribe = (listener) => {
    listeners.push(listener);
  };
  return {
    getState,
    dispatch,
    subscribe,
  };
}
```

（2）**工作流程**

- `const store= createStore（fn）`生成数据;
- `action`: {type: Symble('action01), payload:'payload' }定义行为;
- `dispatch 发起 action`：store.dispatch(doSomething('action001'));
- `reducer`：处理 action，返回新的 state;

通俗点解释：

- 首先，用户（通过 `View`）发出 `Action`，发出方式就用到了 `dispatch` 方法
- 然后，`Store` 自动调用 `Reducer`，并且传入两个参数：当前 `State` 和收到的 `Action`，`Reducer` 会返回新的 `State`
- `State`—旦有变化，`Store` 就会调用监听函数，来更新 `View`

以 `store` 为核心，可以把它看成数据存储中心，但是他要更改数据的时候不能直接修改，数据修改更新的角色由 `Reducers` 来担任，**store 只做存储，中间人**，当 `Reducers` 的更新完成以后会通过 `store` 的**订阅**来通知 react component，
组件把新的状态重新获取渲染，组件中也能主动发送 `action`，创建 `action` 后这个动作是不会执行的，所以要 `dispatch` 这个 `action`，让 `store` 通过 `reducers` 去做更新 React Component 就是 react 的每个组件。

## 3. Redux 中异步的请求怎么处理

可以在 componentDidmount 中直接进⾏请求⽆须借助 redux。但是在⼀定规模的项⽬中,上述⽅法很难进⾏异步流的管理,通常情况下我们会借助 redux 的异步中间件进⾏异步处理。redux 异步流中间件其实有很多，当下主流的异步中间件有两种 `redux-thunk`、`redux-saga`。

（1）**使用 `react-thunk` 中间件**

redux-thunk 优点:

- **体积⼩**: redux-thunk 的实现⽅式很简单,只有不到 20 ⾏代码
- **使⽤简单**: redux-thunk 没有引⼊像 `redux-saga` 或者 `redux-observable` 额外的范式,上⼿简单

redux-thunk 缺陷:

- **样板代码过多**: 与 redux 本身⼀样,通常⼀个请求需要⼤量的代码,⽽且很多都是重复性质的
- **耦合严重**: 异步操作与 redux 的 action 偶合在⼀起,不⽅便管理
- **功能孱弱**: 有⼀些实际开发中常⽤的功能需要⾃⼰进⾏封装

使用步骤：

- **配置中间件**，在 store 的创建中配置

```tsx
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";
// 设置调试工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
// 设置中间件
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducer, enhancer);
export default store;
```

- 添加一个返回函数的 `actionCreator`，将异步请求逻辑放在里面

```tsx
/**
 发送get请求，并生成相应action，更新store的函数
 @param url {string} 请求地址
 @param func {function} 真正需要生成的action对应的actionCreator
 @return {function}
*/
// dispatch为自动接收的store.dispatch函数
export const getHttpAction = (url, func) => (dispatch) => {
  axios.get(url).then(function (res) {
    const action = func(res.data);
    dispatch(action);
  });
};
```

- 生成 action，并发送 action

```tsx
componentDidMount(){
 var action = getHttpAction('/getData', getInitTodoItemAction)
 // 发送函数类型的action时，该action的函数体会自动执行
 store.dispatch(action)
}
```

（2）**使用 redux-saga 中间件**

`redux-saga` 优点:

- **异步解耦**: 异步操作被被转移到单独 `saga.js` 中，不再是掺杂在 `action.js` 或 `component.js` 中
- **action 摆脱 thunk function**: dispatch 的参数依然是⼀个纯粹的 `action (FSA)`，⽽不是充满 “⿊魔法” thunk function
- **异常处理**: 受益于 generator function 的 `saga` 实现，代码异常/请求失败 都可以直接通过 `try/catch` 语法直接捕获处理
- **功能强⼤**: redux-saga 提供了⼤量的 `Saga` 辅助函数和 `Effect` 创建器供开发者使⽤,开发者⽆须封装或者简单封装即可使⽤
- **灵活**: redux-saga 可以将多个 `Saga` 可以串⾏/并⾏组合起来,形成⼀个⾮常实⽤的异步 flow
- **易测试**，提供了各种 `case` 的测试⽅案，包括 mock task，分⽀覆盖等等

`redux-saga` 缺陷:

- 额外的学习成本: redux-saga 不仅在使⽤难以理解的 `generator function`,⽽且有数⼗个 API,学习成本远超 redux-thunk,最重要的是你的额外学习成本是只服务于这个库的,与 `redux-observable` 不同,`redux-observable` 虽然也有额外学习成本但是背后是 `rxjs` 和⼀整套思想
- 体积庞⼤: 体积略⼤,代码近 2000 ⾏，min 版 25KB 左右
- 功能过剩: 实际上并发控制等功能很难⽤到,但是我们依然需要引⼊这些代码
- ts ⽀持不友好: `yield` ⽆法返回 TS 类型

`redux-saga` 可以捕获 action，然后执行一个函数，那么可以把异步代码放在这个函数中，使用步骤如下：

- 配置中间件

```tsx{7,9,11,12}
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga'
import TodoListSaga from './sagas'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose
const sagaMiddleware = createSagaMiddleware()
const enhancer = composeEnhancers(
 applyMiddleware(sagaMiddleware)
);
const store = createStore(reducer, enhancer);
sagaMiddleware.run(TodoListSaga)
export default store;
```

- 将异步请求放在 sagas.js 中

```tsx
import { takeEvery, put } from "redux-saga/effects";
import { initTodoList } from "./actionCreator";
import { GET_INIT_ITEM } from "./actionTypes";
import axios from "axios";
function* func() {
  try {
    // 可以获取异步返回数据
    const res = yield axios.get("/getData");
    const action = initTodoList(res.data);
    // 将action发送到reducer
    yield put(action);
  } catch (e) {
    console.log("网络请求失败");
  }
}
function* mySaga() {
  // 自动捕获GET_INIT_ITEM类型的action，并执行func
  yield takeEvery(GET_INIT_ITEM, func);
}
export default mySaga;
```

- 发送 action

```tsx
componentDidMount(){
 const action = getInitTodoItemAction()
   store.dispatch(action)
}
```

## 4. Redux 怎么实现属性传递，介绍下原理

react-redux 数据传输 ∶ `view-->action-->reducer-->store-->view`。看下点击事件的数据是如何通过 redux 传到 view 上：

- `view` 上的 AddClick 事件通过`mapDispatchToProps` 把数据传到`action` ---> click:()=>dispatch(ADD)
- `action` 的 ADD 传到`reducer`上
- `reducer`传到`store`上 `const store = createStore(reducer)`;
- `store`再通过 `mapStateToProps` 映射穿到 view 上`text:State.text`

  代码示例 ∶

```tsx{2036,38,43,49,51}
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
class App extends React.Component {
  render() {
    let { text, click, clickR } = this.props;
    return (
      <div>
        <div>数据:已有人{text}</div>
        <div onClick={click}>加人</div>
        <div onClick={clickR}>减人</div>
      </div>
    );
  }
}
const initialState = {
  text: 5,
};
const reducer = function (state, action) {
  switch (action.type) {
    case "ADD":
      return { text: state.text + 1 };
    case "REMOVE":
      return { text: state.text - 1 };
    default:
      return initialState;
  }
};
let ADD = {
  type: "ADD",
};
let Remove = {
  type: "REMOVE",
};
const store = createStore(reducer);

let mapStateToProps = function (state) {
  return {
    text: state.text,
  };
};
let mapDispatchToProps = function (dispatch) {
  return {
    click: () => dispatch(ADD),
    clickR: () => dispatch(Remove),
  };
};
const App1 = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(
  <Provider store={store}>
    <App1></App1>
  </Provider>,
  document.getElementById("root")
);
```

## 5. Redux 中间件是什么？接受几个参数？柯里化函数两端的参数具体是什么？

Redux 的中间件提供的是位于 `action` 被发起之后，到达 `reducer` 之前的**扩展点**，换而言之，原本 view -→> action -> reducer -> store 的数据流加上中间件后变成了 view -> action -> `middleware` -> reducer -> store ，在这一环节可以做一些"副作用"的操作，如**异步请求、打印日志**等。

`applyMiddleware` 源码：

```tsx{9-11,14,16}
export default function applyMiddleware(...middlewares) {
  return (createStore) =>
    (...args) => {
      // 利用传入的 createStore 和 reducer 和创建一个 store
      const store = createStore(...args);
      let dispatch = () => {
        throw new Error();
      };
      const middlewareAPI = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args),
      };
      // 让每个 middleware 带着 middlewareAPI 这个参数分别执行一遍
      const chain = middlewares.map((middleware) => middleware(middlewareAPI));
      // 接着 compose 将 chain 中的所有匿名函数，组装成一个新的函数，即新的 dispatch
      dispatch = compose(...chain)(store.dispatch);
      return {
        ...store,
        dispatch,
      };
    };
}
```

从 applyMiddleware 中可以看出 ∶

- redux 中间件接受一个**对象**作为参数，对象的参数上有两个字段 `dispatch` 和 `getState`，分别代表着 Redux Store 上的两个同名函数。
- 柯里化函数两端一个是 `middlewares`，一个是 `store.dispatch`

## 6. Redux 请求中间件如何处理并发

**使用 `redux-Saga`**

`redux-saga` 是一个管理 redux 应用异步操作的中间件，用于代替 redux-thunk 的。
它通过创建 `Sagas` 将所有异步操作逻辑存放在一个地方进行集中处理，以此将 react 中的同步操作与异步操作区分开来，以便于后期的管理与维护。 <br/>
redux-saga 如何处理并发：

- `takeEvery`
  可以让多个 saga 任务并行被 fork 执行。

```tsx{5,6}
import { fork, take } from "redux-saga/effects";
const takeEvery = (pattern, saga, ...args) =>
  fork(function* () {
    while (true) {
      const action = yield take(pattern);
      yield fork(saga, ...args.concat(action));
    }
  });
```

- `takeLatest`
  `takeLatest` **不允许多个 saga 任务并行地执行**。一旦接收到新的发起的 `action`，它就会取消前面所有 fork 过的任务（如果这些任务还在执行的话）。<br/>
  在处理 AJAX 请求的时候，**如果只希望获取最后那个请求的响应**， `takeLatest` 就会非常有用。

```tsx{7-9}
import { cancel, fork, take } from "redux-saga/effects";
const takeLatest = (pattern, saga, ...args) =>
  fork(function* () {
    let lastTask;
    while (true) {
      const action = yield take(pattern);
      if (lastTask) {
        yield cancel(lastTask); // 如果任务已经结束，则 cancel 为空操作
      }
      lastTask = yield fork(saga, ...args.concat(action));
    }
  });
```

## 7. Redux 状态管理器和变量挂载到 window 中有什么区别

两者都是存储数据以供后期使用。但是 **Redux 状态更改可回溯——`Time travel`**，数据多了的时候可以很清晰的知道改动在哪里发生，完整的提供了一套状态管理模式。

随着 JavaScript 单页应用开发日趋复杂，JavaScript 需要管理比任何时候都要多的 `state` （**状态**）。 <br/>
这些 state 可能包括服务器响应、缓存数据、本地生成尚未持久化到服务器的数据，也包括 UI 状态，如激活的路由，被选中的标签，是否显示加载动效或者分页器等等。

管理不断变化的 state 非常困难。如果一个 model 的变化会引起另一个 model 变化，那么当 view 变化时，就可能引起对应 model 以及另一个 model 的变化，依次地，可能会引起另一个 view 的变化。直至你搞不清楚到底发生了什么。<br/>
`state` 在什么时候，由于什么原因，如何变化已然不受控制。 当系统变得错综复杂的时候，想重现问题或者添加新功能就会变得举步维艰。<br/>
如果这还不够糟糕，考虑一些来自前端开发领域的新需求，如更新调优、服务端渲染、路由跳转前请求数据等等。前端开发者正在经受前所未有的复杂性，难道就这么放弃了吗?当然不是。

这里的复杂性很大程度上来自于：我们总是将两个难以理清的概念混淆在一起：**变化和异步**。 可以称它们为曼妥思和可乐。如果把二者分开，能做的很好，但混到一起，就变得一团糟。<br/>
一些库如 React 视图在视图层禁止异步和直接操作 DOM 来解决这个问题。美中不足的是，React 依旧把处理 state 中数据的问题留给了你。
`Redux`就是为了帮你解决这个问题。

## 8. [MobX](https://cn.mobx.js.org/) 和 redux 有什么区别？

（1）共同点

- 为了解决状态管理混乱，无法有效同步的问题**统一维护管理应用状态**;
- 某一状态**只有一个可信数据来源**（通常命名为 `store`，指状态容器）;
- 操作更新状态方式统一，并且可控（通常以 `action` 方式提供更新状态的途径）;
- 支持将 `store` 与 `React` 组件连接，如 `react-redux`，`mobx-react`;

（2）区别

- Redux 更多的是遵循 `Flux` 模式的一种实现，是一个 JavaScript 库，它关注点主要是以下几方面 ∶
  - **Action**∶ 一个 JavaScript 对象，描述动作相关信息，主要包含 type 属性和 payload 属性 ∶
    - `type`∶ action 类型;
    - `payload`∶ 负载数据;
  - **Reducer**∶ 定义应用状态如何响应不同动作（action），如何更新状态;
  - **Store**∶ 管理 action 和 reducer 及其关系的对象，主要提供以下功能 ∶
    - 维护应用状态并支持访问状态(`getState()`);
    - 支持监听 action 的分发，更新状态(`dispatch(action)`);
    - 支持订阅 store 的变更(`subscribe(listener)`);
  - **异步流** ∶ 由于 **Redux 所有对 store 状态的变更，都应该通过 action 触发**，异步任务（通常都是业务或获取数据任务）也不例外，而为了不将业务或数据相关的任务混入 React 组件中，就需要使用其他框架配合管理异步任务流程，如 `redux-thunk`，`redux-saga` 等;

[MobX](https://cn.mobx.js.org/) 是一个**透明函数响应式编程**的状态管理库，它使得状态管理简单可伸缩 ∶

- `Action`∶ 定义改变状态的动作函数，包括如何变更状态;
- `Store`∶ 集中管理模块状态（State）和动作(action)
- `Derivation`（衍生）∶ 从应用状态中派生而出，且没有任何其他影响的数据

**对比总结**：

- redux 将数据保存在**单一的 store** 中; mobx 将数据保存在**分散的多个 store** 中
- redux 使用 `plain object` 保存数据，需要手动处理变化后的操作; mobx 适用 `observable` 保存数据，数据变化后自动处理响应的操作
- redux 使用**不可变状态**，这意味着状态是**只读**的，不能直接去修改它，而是应该返回一个新的状态，同时使用纯函数; mobx 中的状态是**可变的**，可以直接对其进行修改
- mobx 相对来说比较简单，在其中有很多的抽象，mobx 更多的使用**面向对象的编程思维**; redux 会比较复杂，因为其中的**函数式编程思想**掌握起来不是那么容易，同时需要借助一系列的中间件来处理异步和副作用
- mobx 中有更多的**抽象和封装**，调试会比较困难，同时结果也难以预测; 而 redux 提供**能够进行时间回溯的开发工具**，同时其纯函数以及更少的抽象，让调试变得更加的容易

## 9. Redux 和 Vuex 有什么区别，它们的共同思想

（1）**Redux 和 Vuex 区别**

- Vuex 改进了 Redux 中的 `Action` 和 `Reducer` 函数，**以 `mutations` 变化函数取代 `Reducer`**，无需 switch，只需在对应的 mutation 函数里改变 state 值即可
- Vuex 由于 Vue 自动重新渲染的特性，**无需订阅重新渲染函数**，只要生成新的 State 即可
- Vuex 数据流的顺序是 ∶View 调用 store.commit 提交对应的请求到 Store 中对应的 mutation 函数->store 改变（**vue 检测到数据变化自动渲染**）

通俗点理解就是，vuex 弱化 `dispatch`，**通过 `commit` 进行 `store` 状态的一次更变**；
取消了 `action` 概念，不必传入特定的 action 形式进行指定变更；
弱化 `reducer`，**基于 `commit` 参数直接对数据进行转变**，使得框架更加简易;

（2）**共同思想**

- 单—的数据源
- 变化可以预测

本质上 ∶ redux 与 vuex 都是对 mvvm 思想的服务，**将数据从视图中抽离的一种方案**。

## 10. Redux 中间件是怎么拿到 store 和 action? 然后怎么处理?

redux 中间件本质就是一个**函数柯里化**。`redux applyMiddleware Api` 源码中每个 middleware 接受 `2` 个参数，
Store 的 `getState` 函数和 `dispatch` 函数，分别获得 `store` 和 `action`，最终返回一个函数。<br/>
该函数会被传入 next 的下一个 `middleware` 的 `dispatch` 方法，并返回一个接收 `action` 的新函数，这个函数可以直接调用 `next（action）`，或者在其他需要的时刻调用，甚至根本不去调用它。<br/>
调用链中最后一个 `middleware` 会接受真实的`store` 的 `dispatch` 方法作为 `next` 参数，并借此结束调用链。所以，<br/>
`middleware` 的函数签名是`({ getState,dispatch })=> next => action`。

## 11. Redux 中的 connect 有什么作用

connect 负责连接 React 和 Redux

（1）**获取 state**

connect 通过 `context` 获取 `Provider` 中的 `store`，通过 `store.getState()` 获取整个 store tree 上所有 state

（2）**包装原组件**

将 state 和 action **通过 `props` 的方式传入到原组件内部** `wrapWithConnect` 返回—个 ReactComponent 对象 `Connect`，
Connect 重 新 render 外部传入的原组件 `WrappedComponent` ，并把 connect 中传入的 `mapStateToProps`，`mapDispatchToProps` 与组件上原有的 `props` **合并**后，通过属性的方式传给 `WrappedComponent`

（3）**监听 store tree 变化**

connect 缓存了 `store tree` 中 state 的状态，通过当前 state 状态 和变更前 state 状态进行比较，从而确定是否调用 `this.setState()` 方法触发 Connect 及其子组件的重新渲染
