# [React 源码解析之 ExpirationTime](https://juejin.cn/post/6844903929004687368)

react17 [Lanu 模型](/react/react_lane) 替代 Expiration Time

## Expiration Time 概念

首先 `Expiration Time` 到底是什么呢？ 根据英文直接翻译可知，**到期时间或者过期时间**。在 React 中到期时间概念又如何理解，我们不妨从它的作用入手理解到底是什么概念。

## Expiration Time 作用

在 React 中，源码位置是在 准备阶段 `updateContainer` 的位置 调用 `computeExpirationForFiber` 计算时间，这里是在准备阶段创建好 React 的更新对象，为后面的后面 React 调度做准备。它代表的是 **任务在未来的哪个时间点上应该被执行**，不然它就过期了。具体可以查看 `react-reconciler` 包中 `ReactFiberExpirationTime.js` 具体的代码内容

总结一下：React 在创建更新的过程 为了后面更新调度的时候，**合理安排更新顺序**，React 会设置一个过期时间（Expiration Time），当 `Expiration-Time` 到了以后，就会强制更新。

## **具体源码内容**

源码因为版本不一样，会有大同小异，这里不做具体分析

```tsx
export function updateContainer(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  callback: ?Function
): ExpirationTime {
  // 获取当前 更新的 Fiber 节点
  const current = container.current;
  // 获取当前的时间
  const currentTime = requestCurrentTime();
  // 计算 ExpirationTime
  const expirationTime = computeExpirationForFiber(currentTime, current);
  return updateContainerAtExpirationTime(
    element,
    container,
    parentComponent,
    expirationTime,
    callback
  );
}
```

## 如何计算 Expiration Time

首先我们看 Expiration Time 代码，这里只是涉及到计算方式

```tsx
import MAX_SIGNED_31_BIT_INT from "./maxSigned31BitInt";

export type ExpirationTime = number;

export const NoWork = 0;
export const Sync = 1;
export const Never = MAX_SIGNED_31_BIT_INT;

const UNIT_SIZE = 10;
const MAGIC_NUMBER_OFFSET = 2;

// 1 个过期时间单位代表 10ms.
export function msToExpirationTime(ms: number): ExpirationTime {
  // 始终添加一个偏移量，这样我们就不会与 NoWork 的幻数发生冲突.
  return ((ms / UNIT_SIZE) | 0) + MAGIC_NUMBER_OFFSET;
}

export function expirationTimeToMs(expirationTime: ExpirationTime): number {
  return (expirationTime - MAGIC_NUMBER_OFFSET) * UNIT_SIZE;
}

function ceiling(num: number, precision: number): number {
  return (((num / precision) | 0) + 1) * precision;
}

// 核心内容
function computeExpirationBucket(
  currentTime,
  expirationInMs,
  bucketSizeMs
): ExpirationTime {
  // currentTime 是当前的时间戳
  return (
    MAGIC_NUMBER_OFFSET +
    ceiling(
      currentTime - MAGIC_NUMBER_OFFSET + expirationInMs / UNIT_SIZE,
      bucketSizeMs / UNIT_SIZE
    )
  );
}

export const LOW_PRIORITY_EXPIRATION = 5000;
export const LOW_PRIORITY_BATCH_SIZE = 250;

// 普通异步类型
export function computeAsyncExpiration(
  currentTime: ExpirationTime
): ExpirationTime {
  return computeExpirationBucket(
    currentTime,
    LOW_PRIORITY_EXPIRATION,
    LOW_PRIORITY_BATCH_SIZE
  );
}

export const HIGH_PRIORITY_EXPIRATION = __DEV__ ? 500 : 150;
export const HIGH_PRIORITY_BATCH_SIZE = 100;

// Interactive 类型
export function computeInteractiveExpiration(currentTime: ExpirationTime) {
  return computeExpirationBucket(
    currentTime,
    HIGH_PRIORITY_EXPIRATION,
    HIGH_PRIORITY_BATCH_SIZE
  );
}
```

代码可以看到两种类型的 `Expiration Time` 一种是 **普通异步**的 一种是 `Interactive` 类型 Interactive 比如说是由事件触发的，那么它的响应优先级会比较高 因为涉及到交互。

## **举例&核心内容**

我们随便拿一个类型举例 `computeExpirationBucket` 中传入 `currentTime 5000 250` 这里涉及到一个方法 `ceiling` 可以理解成取整的方法
最终可以得到 `((((currentTime - 2 + 5000 / 10) / 25) | 0) + 1) \* 25` 其中 25 是 250 / 10, | 0 是取整的作用

公式的含义是什么呢？

- 前面 `currentTime - 2 + 5000 / 10` 这部分是相对固定的内容 等于说是当前时间 + 498
- 然后 ➗ 25 取整 然后 ➕ 1 再 × 5
- 最后就是 （当前时间 + 498）➗ 25 取整 然后 ➕ 1 再 × 5

当前时间加上 498 然后处以 25 取整再加 1 再乘以 5，需要注意的是这里的 currentTime 是经过 `msToExpirationTime` 处理的，也就是`((now / 10) | 0) + 2`，所以这里的减去 2 可以无视，而除以 10 取整应该是要抹平 10 毫秒内的误差，当然最终要用来计算时间差的时候会调用 `expirationTimeToMs` 恢复回去，但是被取整去掉的 10 毫秒误差肯定是回不去的

简单来说在这里，最终结果是以 25 为单位向上增加的，比如说我们输入 `10002 - 10026` 之间，最终得到的结果都是 10525，但是到了 `10027` 的到的结果就是 `10550`，这就是除以 25 取整的效果。

另外一个要提的就是 `msToExpirationTime` 和 `expirationTimeToMs` 方法，他们是想换转换的关系。这里需要注意有一点非常重要，那就是用来计算 `expirationTime` 的 `currentTime` 是通过 `msToExpirationTime(now)`得到的，也就是预先处理过的，先处以 10 再加了 2 这里的 2 是 `magicNumberOffset`，所以后面计算 `expirationTime` 要减去 2 就可以理解了

## 单元概念

代码

```tsx
export const HIGH_PRIORITY_EXPIRATION = __DEV__ ? 500 : 150;
export const HIGH_PRIORITY_BATCH_SIZE = 100;

export const LOW_PRIORITY_EXPIRATION = 5000;
export const LOW_PRIORITY_BATCH_SIZE = 250;
```

上面提到的 25 就是一个 **时间单元** 在这个时间单元内计算出来的 `Expiration-Time` 都是一样的，React 是 为了在同一个时间单元内更新的内容都是用相同的 Expiration-Time 这样更新会被合并.
假设如果没有单元概念的话，这样每次调用创建更新，都没有优先级顺序，这样就会浪费性能，影响效率了。
这样 Expiration-Time 就有了优先级，方便后续调度更新。

## **小结**

React 这么设计抹相当于抹平了 25ms 内计算过期时间的误差，这样做的目的是为了非常详尽的两次更新得到相同的 `expirationTime`, ，然后在一次更新中完成，相当于一个自动的 `batchedUpdates` 批量更新

以上是 `expirationTime` 的计算方法。

附加内容

在 React 中我们计算 `expirationTime` 要基于当前得时钟时间，一般来说我们只需要获取 `Date.now` 或者 `performance.now` 可以，但是每次获取一下呢比较消耗性能，所以呢 React 设置了 `currentRendererTime` 来记录这个值，用于一些不需要重新计算得场景。

但是在 `ReactFiberScheduler` 中呢又提供了 `currentSchedulerTime` 这个变量，同样也是记录这个值的，我们看一下 `requestCurrentTime` 方法的实现。 这里看注释就知道为什么了，直接返回最近的时间

```tsx
if (isRendering) {
  // We're already rendering. Return the most recently read time.
  return currentSchedulerTime;
}
```

这个 `isRendering` 只有在 `performWorkOnRoot` 的时候才会被设置为 true，而其本身是一个同步的方法，不存在他执行到一半没有设置 `isRendering` 为 false 的时候就跳出，那么什么情况下会在这里出现新的 `requestCurrentTime` 呢？

- 在生命周期方法中调用了 `setState` 方法
- 需要挂起任务的时候

```tsx
if (
  nextFlushedExpirationTime === NoWork ||
  nextFlushedExpirationTime === Never
) {
  // If there's no pending work, or if the pending work is offscreen, we can
  // read the current time without risk of tearing.
  recomputeCurrentRendererTime();
  currentSchedulerTime = currentRendererTime;
  return currentSchedulerTime;
}
```

也就是说在一个`batched`更新中，只有第一次创建更新才会重新计算时间，后面的所有更新都会复用第一次创建更新的时候的时间，这个也是为了**保证在一个批量更新中产生的同类型的更新只会有相同的过期时间**
