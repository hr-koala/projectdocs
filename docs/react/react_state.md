# React 数据管理

## React setState 调用的原理

React 在实现`setState`异步采用**批量更新**操作(避免频繁的`re-render`)，使用一个**队列**把他存起来，每次进来一个 `setState`，就进行入队操作，等时机成熟，把 `state` 的值做合并，**[** 最后只针对最新的 `state` 值走一次更新流程。**]**

![React setState 调用的原理](/images/react/react3.png)

具体的执行过程如下（源码级解析）：

- 首先调用了 `setState` 入口函数，入口函数在这里就是充当一个分发器的角色，根据入参的不同，将其分发到不同的功能函数中去；

```ts{2,4}
ReactComponent.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, "setState");
  }
};
```

- `enqueueSetState` 方法将新的 `state` 放进组件的状态**队**列里，并调用 `enqueueUpdate` 来处理将要更新的实例对象；

```ts{3,6}
enqueueSetState: function (publicInstance, partialState) {
 // 根据 this 拿到对应的组件实例
 var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');
 // 这个 queue 对应的就是一个组件实例的 state 数组
 var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue =[])
 queue.push(partialState);
 // enqueueUpdate 用来处理当前的组件实例
 enqueueUpdate(internalInstance);
}
```

- 在 `enqueueUpdate` 方法中引出了一个关键的对象—— `batchingStrategy` ，该对象所具备的 `isBatchingUpdates` 属性直接决定了当下是要走更新流程，还是应该排队等待；如果轮到执行，就调用 `batchedUpdates` 方法来直接发起更新流程。由此可以推测， `batchingStrategy` 或许正是 React 内部专门用于管控批量更新的对象。

```js{4,6}
function enqueueUpdate(component) {
  ensureInjected();
  // 注意这一句是问题的关键，isBatchingUpdates标识着当前是否处于批量创建/更新组件的阶段
  if (!batchingStrategy.isBatchingUpdates) {
    // 若当前没有处于批量创建/更新组件的阶段，则立即更新组件
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }
  // 否则，先把组件塞入 dirtyComponents 队列里，让它“再等等”
  dirtyComponents.push(component);
  if (component._updateBatchNumber == null) {
    component._updateBatchNumber = updateBatchNumber + 1;
  }
}
```

**注意**： `batchingStrategy` 对象可以理解为“**锁管理器**”。这里的“锁”，是指 React 全局唯一的 `isBatchingUpdates` 变量， `isBatchingUpdates` 的初始值是 `false` ，意味着“当前并未进行任何批量更新操作”。每当 React 调用 `batchedUpdate` 去执行更新动作时，会先把这个锁给“锁上”（置为 `true` ），表明“现在正处于批量更新过程中”。当锁被“锁上”的时候，任何需要更新的组件都只能暂时进入 `dirtyComponents` 里排队等候下一次的批量更新，而不能随意“插队”。此处体现的“**任务锁**”的思想，是 React 面对大量状态仍然能够实现**有序分批**处理的基石。

锁是指 React 全局唯一的 `isBatchingUpdates` 变量

### 如何在如上异步环境下，继续开启批量更新模式呢？

`React-Dom` 中提供了批量更新方法 `unstable_batchedUpdates`，可以去手动批量更新，可以将上述 `setTimeout` 里面的内容做如下修改:

```ts{2,5}
import ReactDOM from "react-dom";
const { unstable_batchedUpdates } = ReactDOM;

setTimeout(() => {
  unstable_batchedUpdates(() => {
    this.setState({ number: this.state.count + 1 });
    console.log(this.state.count);
    this.setState({ number: this.state.count + 1 });
    console.log(this.state.count);
    this.setState({ number: this.state.numbercount + 1 });
    console.log(this.state.count);
  });
});
```

- `setState` 并不是单纯同步/异步的，它的表现会因调用场景的不同而不同：在 React 钩子函数及合成事件中，它表现为异步；而在 `setTimeout`、`setInterval` 等函数中，包括在 `DOM` 原生事件中，它都表现为同步。这种差异，本质上是由 **React 事务机制**和**批量更新机制**的工作方式来决定的。
- `setState` 并非真异步，只是看上去像异步。在源码中，通过 `isBatchingUpdates` 来判断 `setState` 是先存进 `state` 队列还是直接更新，如果值为 `true` 则执行异步操作，为 `false` 则直接更新。
  那么什么情况下 `isBatchingUpdates` 会为 true 呢？在 React 可以控制的地方，就为 `true`，比如在 React `生命周期事件`和`合成事件`中，都会走合并操作，延迟更新的策略。
  但在 React 无法控制的地方，比如`原生事件`，具体就是在 `addEventListener` 、`setTimeout`、`setInterval` 等事件中，就只能同步更新。
  一般认为，做异步设计是为了性能优化、减少渲染次数，React 团队还补充了两点。保持内部一致性。如果将 `state` 改为同步更新，那尽管 `state` 的更新是同步的，但是 `props` 不是。启用并发更新，完成异步渲染。

## React setState 调用之后发生了什么？是同步还是异步？

（1）**React 中 setState 后发生了什么**

在代码中调用 `setState` 函数之后，React 会将传入的参数对象与组件当前的状态**合并**，然后触发调和过程(`Reconciliation`)。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个 UI 界面。

在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。

如果在短时间内频繁 `setState`。React 会将 `state` 的改变**压入栈中**，在合适的时机，批量更新 `state` 和视图，达到提高性能的效果。

（2）**setState 是同步还是异步的**
假如所有 `setState` 是同步的，意味着每执行一次 `setState` 时（有可能一个同步代码中，多次 setState），都重新
`vnode diff + dom` 修改，这对性能来说是极为不好的。如果是异步，则可以把一个同步代码中的多个 setState **合并**成一次组件更新。所以默认是异步的，但是在一些情况下是同步的。

`setState` 并不是单纯同步/异步的，它的表现会因调用场景的不同而不同。在源码中，通过 `isBatchingUpdates`来判断 `setState` 是先存进 `state` 队列还是直接更新，如果值为 `true` 则执行异步操作，为 `false` 则直接更新。

- **异步**：在 React 可以控制的地方，就为 true，比如在 React 生命周期事件和合成事件中，都会走合并操作，延迟更新的策略。
- **同步**：在 React 无法控制的地方，比如原生事件，具体就是在 `addEventListener` 、`setTimeout`、`setInterval` 等事件中，就只能同步更新。

**react18 之后，setState 都为异步**，无论写在什么样的语法环境中。 但可以使用 **_`flushSync`_** 方法 使之变为同步

一般认为，做异步设计是为了性能优化、减少渲染次数：

- `setState` 设计为异步，可以显著的提升性能。如果每次调用 `setState` 都进行一次更新，那么意味着`render` 函数会被频繁调用，界面重新渲染，这样效率是很低的；最好的办法应该是获取到多个更新，之后进行批量更新；
- 如果同步更新了 `state` ，但是还没有执行 `render` 函数，那么 `state` 和 `props` 不能保持同步。 `state` 和 `props` 不能保持一致性，会在开发中产生很多的问题；

## React 中 setState 的第二个参数作用是什么？

`setState` 的第二个参数是一个可选的回调函数。这个回调函数将在组件重新渲染后执行。等价于在 `componentDidUpdate` 生命周期内执行。通常建议使用 `componentDidUpdate` 来代替此方式。在这个回调函数中你可以拿到**更新后** `state` 的值：

```ts
this.setState({
 key1: newState1,
 key2: newState2,
 ...
}, callback) // 第二个参数是 state 更新完成后的回调函数
```

## React 中的 setState 和 replaceState 的区别是什么？

（1）**setState()**

`setState()`用于设置状态对象，其语法如下：

```ts
setState(object nextState[, function callback])
```

- `nextState`，将要设置的新状态，该状态会和当前的 state 合并
- `callback`，可选参数，回调函数。该函数会在 setState 设置成功，且组件重新渲染后调用。

合并 `nextState` 和当前 `state`，并重新渲染组件。`setState` 是 React 事件处理函数中和请求回调函数中触发 UI 更新的主要方法。

（2）**_replaceState()_**

`replaceState()`方法与 `setState()`类似，但是方法**只会保留** `nextState` 中状态，原 state 不在 `nextState` 中的状态都会被
删除。其语法如下：

```ts
replaceState(object nextState[, function callback])
```

- `nextState`，将要设置的新状态，该状态会**替换**当前的 state。
- `callback`，可选参数，回调函数。该函数会在 `replaceState` 设置成功，且组件重新渲染后调用。

**总结**：
`setState` 是修改其中的部分状态，相当于 `Object.assign`，只是**覆盖**，不会减少原来的状态。
而`replaceState` 是完全**替换**原来的状态，相当于赋值，将原来的 state 替换为另一个对象，如果新状态属性减少，那么 state 中就没有这个状态了。

## state 是怎么注入到组件的，从 reducer 到组件经历了什么样的过程

通过 `connect` 和 `mapStateToProps` 将 `state` 注入到组件中：

```ts{1,5,9,12}
import { connect } from "react-redux";
import { setVisibilityFilter } from "@/reducers/Todo/actions";
import Link from "@/containers/Todo/components/Link";
const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  setFilter: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Link);
```

上面代码中，`active` 就是注入到 Link 组件中的状态。 `mapStateToProps(state，ownProps)`中带有两个参数，含义是 ∶

- `state-store` 管理的全局状态对象，所有都组件状态数据都存储在该对象中。
- `ownProps` 组件通过 `props` 传入的参数。

**reducer 到组件经历的过程**：

- `reducer` 对 `action` 对象处理，更新组件状态，并将新的状态值返回 `store`。
- 通过 `connect(mapStateToProps，mapDispatchToProps)(Component)`对组件 Component 进行升级，此时将状态值从 `store` 取出并作为 `props` 参数传递到组件。

**_高阶组件实现源码_** ∶

```ts{19-21,27,30,32}
import React from "react";
import PropTypes from "prop-types";
// 高阶组件 contect
export const connect =
  (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends React.Component {
      // 通过对context调用获取store
      static contextTypes = {
        store: PropTypes.object,
      };
      constructor() {
        super();
        this.state = {
          allProps: {},
        };
      }
      // 第一遍需初始化所有组件初始状态
      componentWillMount() {
        const store = this.context.store;
        this._updateProps();
        store.subscribe(() => this._updateProps()); // 加入_updateProps()至store里的监听事件列表
      }
      // 执行action后更新props，使组件可以更新至最新状态（类似于setState）
      _updateProps() {
        const store = this.context.store;
        let stateProps = mapStateToProps
          ? mapStateToProps(store.getState(), this.props)
          : {}; // 防止 mapStateToProps 没有传入
        let dispatchProps = mapDispatchToProps
          ? mapDispatchToProps(store.dispatch, this.props)
          : {
              dispatch: store.dispatch,
            }; // 防止 mapDispatchToProps 没有传入
        this.setState({
          allProps: {
            ...stateProps,
            ...dispatchProps,
            ...this.props,
          },
        });
      }
      render() {
        return <WrappedComponent {...this.state.allProps} />;
      }
    }
    return Connect;
  };
```

## React 中怎么检验 props？验证 props 的目的是什么？

React 为我们提供了`PropTypes`库来实现 Props 的验证。  
`PropTypes` 是一个 React 内置的库，可以帮助你检查传递给组件的 `props` 是否符合预期。它可以验证 `props` 的类型、是否必须、枚举值等等.  
当我们向`Props`传入的数据无效（向 Props 传入的数据类型和验证的数据类型不符）PropTypes 就会在控制台发出警告信息。它可以避免随着应用越来越复杂从而出现的问题。并且，它还可以让程序变得更易读。
::: tip 预定义的道具 **类型**：  
PropTypes.number | PropTypes.string | PropTypes.array | PropTypes.object | PropTypes.func | PropTypes.node | PropTypes.element | PropTypes.bool | PropTypes.symbol | PropTypes.any
:::

```ts
import PropTypes from "prop-types";
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  gender: PropTypes.oneOf(["male", "female"]),
};
```

**注意**，`PropTypes` 库只在开发环境中运行，并且不应该在生产环境中使用。在生产环境中，你应该确保你的代码不会因为 props 不符合预期而崩溃或出现错误。

当然，如果项目中使用了`TypeScript`，那么就可以不用`PropTypes`来校验，而使用`TypeScript`定义接口来校验 props。
React 中怎么检验 props？验证 props 的目的是什么？

## 在 React 中组件的 props 改变时更新组件的有哪些方法？

在一个组件传入的 props 更新时重新渲染该组件常用的方法是在 `componentWillReceiveProps` 中将新的 `props`更新到组件的`state`中(这种 state 被成为派生状态(Derived State))，从而实现重新渲染。React 16.3 中还引入了一个新的钩子函数 `getDerivedStateFromProps` 来专门实现这一需求。

1. **componentWillReceiveProps**（已废弃）

在 react 的`componentWillReceiveProps(nextProps)`生命周期中，可以在子组件的 render 函数执行前，通过`this.props`获取旧的属性，通过`nextProps`获取新的 props，对比两次 props 是否相同，从而更新子组件自己的 state。

这样的好处是，可以将数据请求放在这里进行执行，需要传的参数则从 `componentWillReceiveProps(nextProps)`中获取。而不必将所有的请求都放在父组件中。于是该请求只会在该组件渲染时才会发出，从而减轻请求负担。

2. **getDerivedStateFromProps**（16.3 引入）

这个生命周期函数是为了替代 `componentWillReceiveProps` 存在的，所以在需要使用 `componentWillReceiveProps` 时，就可以考虑使用 `getDerivedStateFromProps` 来进行替代。

两者的参数是不相同的，而 `getDerivedStateFromProps` 是一个静态函数，也就是这个函数不能通过`this`访问到 class 的属性，也并不推荐直接访问属性。而是应该通过参数提供的`nextProps`以及 `prevState` 来进行判断，根据新传入的 `props` 来映射到 state。

需要注意的是，**如果 props 传入的内容不需要影响到你的 state，那么就需要返回一个 `null`**，这个返回值是必须的，所以尽量将其写到函数的末尾：

```ts{1,4,11}
static getDerivedStateFromProps(nextProps, prevState) {
  const {type} = nextProps;
  // 当传入的type发生变化的时候，更新state
  if (type !== prevState.type) {
    return {
      type,
    };
  }
  // 否则，对于state不进行任何操作
  return null;
}
```

3. 使用 `useEffect` 钩子在组件的 props 更改时更新组件的状态

```ts{7-11}
import { useEffect, useState } from "react";

function Child({ parentCount, setParentCount }) {
  const [childCount, setChildCount] = useState(0);
  // 将要跟踪的所有属性添加到 useEffect 钩子的依赖项数组中
  useEffect(() => {
    setChildCount(parentCount * 2);
    // 注意，如果我们更新一个 prop 的值并且这个 prop 存在于 hook 的依赖数组中，你会导致一个无限的重新渲染循环
    // setParentCount(current => current + 1); // 👇️ 这里将导致无限循环
  }, [parentCount, setParentCount]); // 👈️ 将 props 添加为依赖项
  return (
    <div>
      <button>Child count {childCount}</button>
    </div>
  );
}

export default function Parent() {
  const [parentCount, setParentCount] = useState(0);
  return (
    <div>
      <button onClick={() => setParentCount((current) => current + 1)}>
        Parent count: {parentCount}
      </button>
      <Child parentCount={parentCount} />
    </div>
  );
}
```

每次其依赖项之一发生更改时，都会重新运行 `useEffect` 钩子中的逻辑。

**注意** ，我们传递给 useEffect 钩子的函数也会在初始渲染时调用。

```ts{4-6}
// 如果不想在初始渲染时运行 useEffect 钩子中的逻辑，但仅在特定属性更改时，请使用 ref 在初始渲染时提前返回。
const isFirstRender = useRef(true);
useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    return; // 👈️ 如果第一次渲染，请提前返回
  }
  setChildCount(parentCount * 2);
}, [parentCount]);
```
