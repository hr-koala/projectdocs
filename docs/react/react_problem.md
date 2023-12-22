# React 常见问题点(一)

## hooks 、useEffect、 useLayoutEffect

`React Hooks` 是 React 16.8 引入的一组函数，用于**让函数组件拥有类组件的状态管理和生命周期方法**的能力。其中，`useEffect` 和 `useLayoutEffect` 是两个用于 _处理副作用_（如数据获取、订阅、手动 DOM 操作等）的钩子，而 `useMemo` 和 `useCallback` 则用于优化性能。

**_useEffect_** :
`useEffect` 是 React 提供的用于在函数组件中处理副作用的 Hook。它在组件渲染后执行，可以用于处理诸如数据获取、订阅、DOM 操作等副作用任务。useEffect 接受两个参数：**一个函数**和**一个依赖数组**。

```tsx{3-6}
function Bar(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // 在组件渲染后执行的副作用代码
    document.title = `Count: ${count}`;
  }, [count]); // 仅在 count 改变时执行
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
export default Bar;
```

**_useLayoutEffect_** :
`useLayoutEffect` 与 useEffect 类似，但它会在 **DOM 更新之后、浏览器 layout 之前**执行。这使得它更适合一些需要立即操作 DOM `的情况。useLayoutEffect` 的使用方式与 useEffect 相同，只是它会更快地执行副作用代码。

```tsx{4,9,11}
function Bar(props) {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    // DOM 更新之后、浏览器 layout 之前执行
    function updateWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateWidth);
    updateWidth(); // 确保在渲染前更新宽度
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [width]);
  return <div>Window width: {width}</div>;
}
// useLayoutEffect 用于监听窗口大小的变化，并实时更新 width 变量
```

需要注意的是，由于 `useLayoutEffect` 可能会对性能造成影响，因此建议仅在确实需要 **同步 DOM** 操作的情况下使用它，否则使用 useEffect 更合适。 React 文档建议，如果不需要立即执行的 DOM 操作，应首选使用 useEffect。

## React 组件优化

React 组件优化是一项重要的任务，可以提高应用程序的性能和用户体验。以下是一些常见的 React 组件优化技巧：

- 1. **使用函数组件和 React Hooks**：
  - 函数组件通常比类组件具有更好的性能，因为它们更轻量化。
  - 使用 React Hooks（如 `useState`、`useEffect`、`useMemo`）来管理组件的状态和副作用，以减少不必要的渲染。
- 2. **避免不必要的渲染**：
  - 使用 `shouldComponentUpdate` 方法或 `React.memo` 高阶组件来防止不必要的组件渲染。
  - 使用 `PureComponent` 或 `React.memo` 来避免在 props 或 state 没有变化时触发的渲染。
- 3. **使用 React 的异步更新机制**：
  - 使用 `setState` 的回调函数或者 `useEffect` 来确保在组件状态更新后进行相应的操作，而不会触发额外的渲染。
- 4. **避免内联函数**：
  - 避免在渲染方法中创建内联函数，因为它们可能会导致不必要的函数重复创建。可以将这些函数提升到组件的构造函数或使用 `useCallback` 来进行优化。
- 5. **分割大型组件**：
  - 如果一个组件变得过于复杂，可以将其**拆分**成多个小型组件，每个组件专注于特定的任务。
- 6. **使用列表的 key 属性**：
  - 在渲染列表时，为每个列表项提供**唯一的** key 属性，以帮助 React 更有效地管理列表项的更新。
- 7. **懒加载组件**：
  - 使用 React 的懒加载功能（如 `React.lazy` 和 `Suspense`）来按需加载组件，以减少初始加载时的资源占用。
- 8. **使用 Memoization**：
  - 使用 `useMemo` 或 `React.memo` 来记忆组件的渲染结果，以避免不必要的计算。
- 9. **性能分析工具**：
  - 使用 `React DevTools` 或其他性能分析工具来识别组件渲染的瓶颈，并找出性能问题的根本原因。
- 10. **服务器端渲染（SSR）**：
  - 对于需要更快的初始加载时间的应用程序，考虑使用服务器端渲染来提供更快的首次渲染。
- 11. **使用组件级别的代码拆分**：
  - 使用动态导入（Dynamic Import）来按需加载组件，以减少初始包大小。
- 12. **使用 Memo 组件**：
  - 如果组件有昂贵的计算成本或者渲染成本，可以考虑使用 `React.memo` 或 `useMemo` 来缓存组件的输出。
- 13. **避免不必要的全局状态**：
  - 避免在全局状态中存储不必要的数据，只在需要的组件中共享状态。
- 14. **组件的拆分和组合**：
  - 将复杂的组件拆分为多个小组件，并使用组件的组合来构建界面。
- 15. **使用 [React Profiler](https://zh-hans.react.dev/reference/react/Profiler)**：
  - `React Profiler` 是 React DevTools 的一部分，可用于分析组件的渲染性能，找出哪些组件渲染时间较长。

React 组件优化是一个持续改进的过程，需要根据具体的应用和性能需求来调整和优化。始终使用性能分析工具来帮助确定优化的地方，并在实际测试中验证性能的改善。

## 高阶组件

高阶组件（Higher-Order Component，`HOC`）是一种在 React 中用于复用组件逻辑的高级技术。它本质上**是一个函数，接受一个组件作为参数并返回一个新的组件**。高阶组件在 React 应用中非常有用，因为它可以帮助你在不修改原始组件的情况下添加或修改功能。
以下是高阶组件的一些常见用法和示例：

- 1. **添加新的 Props**：<br/>
     高阶组件可以接受一些数据，并将其作为 props 传递给包装的组件。这可以用于向组件注入一些共享的数据或配置信息。

```tsx{2,5,11}
const withUserData = (WrappedComponent) => {
  const userData = { name: "John", age: 30 };
  return (props) => <WrappedComponent {...props} userData={userData} />;
};
const UserComponent = ({ userData }) => (
  <div>
    <p>Name: {userData.name}</p>
    <p>Age: {userData.age}</p>
  </div>
);
const UserComponentWithUserData = withUserData(UserComponent);
```

- 2. **条件渲染**：<br/>
     高阶组件可以根据一些条件来决定是否渲染包装组件。这可以用于创建**权限控制**的组件。

```tsx{4,11}
const withAuthorization = (WrappedComponent, allowedRoles) => {
  // Check user's role here
  const userRole = "admin";
  return userRole === allowedRoles ? (
    <WrappedComponent />
  ) : (
    <div>Access Denied</div>
  );
};
const AdminDashboard = () => <div>Admin Dashboard</div>;
const ProtectedAdminDashboard = withAuthorization(AdminDashboard, "admin");
```

- 3. **包装组件生命周期方法**：<br/>
     高阶组件可以包装组件的生命周期方法，以添加额外的行为或副作用。

```tsx{2-4}
const withLogger = (WrappedComponent) => {
  return class extends React.Component {
    componentDidMount() {
      console.log("Component did mount");
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};
const MyComponent = () => <div>Hello, World!</div>;
const MyComponentWithLogger = withLogger(MyComponent);
```

- 4. **状态管理**：<br/>
     高阶组件可以用于管理某些状态，将状态传递给包装的组件或在需要时进行更新。

```tsx{2-8,14-15}
const withCounter = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { count: 0 };
    }
    increment = () => {
      this.setState({ count: this.state.count + 1 });
    };
    render() {
      return (
        <WrappedComponent
          {...this.props}
          count={this.state.count}
          increment={this.increment}
        />
      );
    }
  };
};
const CounterComponent = ({ count, increment }) => (
  <div>
    <p>Count: {count}</p>
    <button onClick={increment}>Increment</button>
  </div>
);
const CounterComponentWithCounter = withCounter(CounterComponent);
```

高阶组件是一种强大的工具，可以帮助你在 React 中实现复杂的功能和逻辑复用。但要小心不要滥用它们，以免导致代码变得复杂难以维护。通常，建议在需要**复用组件逻辑时使用高阶组件**，而在其他情况下优先考虑使用 React Hooks。
