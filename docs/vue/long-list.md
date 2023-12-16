---
title: 长列表
author: htong
date: "2023-8-28"
---

## 1. vue 循环 1000 个列表，每个添加点击事件，怎么优化

在 Vue 中，渲染大量数据时，如果每个列表项都添加点击事件，可能会导致性能问题。为了优化性能，可以采用以下几种方案：  
(1) 利用 Vue 的事件委托机制，将点击事件绑定到父元素上，通过事件对象的 target 属性判断点击的是哪个子元素，从而执行相应的操作。  
这样可以避免为每个子元素都添加点击事件，减少事件绑定的数量。

```html
<template>
  <div>
    <div @click="handleClick">
      <div v-for="item in list" :key="item.id">{{ item.id }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from "vue";
  let list = ref([
    //数据列表
    { id: 1 },
    { id: 2 },...
  ]);
  const handleClick = (event) => {
    console.log(event);
    const target = event.target;
    if (target.tagName === "DIV") {
      // 处理点击事件
    }
  };
</script>
```

(2) 使用 Vue 的虚拟滚动组件，如 `vue-virtual-scroll-list` 或 `vue-virtual-scroll-view`，  
可以实现只渲染可见区域的列表项，从而减少 DOM 操作和事件绑定的数量，提高性能。这种方案需要引入相应的第三方库。  
(3) 新的 css 属性 `content-visibility`，利用这个属性（大概率还得配合 contain-intrinsic-size）就可以实现只渲染当前可视窗口区域内的内容，跳过不在屏幕上的内容渲染。但目前兼容性极差，只能说未来可期~

## [长列表的问题](https://zhuanlan.zhihu.com/p/444778554)

目前看来无限滚动的长列表(微博列表)对用户来说体验是很好的，但是这里会有个问题，当用户滚动的屏数过多时，就会出现页面滑动卡顿、数据渲染较慢、白屏的问题，究其原因是列表项过多，渲染了**大量 dom 节点**。

为了解决上述问题，就引入了一种叫**虚拟列表**的解决方案。

### 虚拟列表的优势

下面就通过两组图示数据来对比下，当滚动大约 10+页时引入了虚拟列表前后的区别：

使用前

- FPS：10
- JS 内存：121MB
- DOM 节点数：46592
  ![虚拟列表](/images/vue/long-list1.png)

使用后

- FPS：40
- JS 内存：102MB
- DOM 节点数：24268
  ![虚拟列表](/images/vue/long-list2.png)

可以看到在引入虚拟列表后，在 **FPS、JS 内存、DOM 节点数**各方面上都有较大程度的提升，而且随着滚动页数的持续增加，其效果会更加显著。

### 虚拟列表的原理

只对可见区域进行渲染，对非可见区域中的数据不渲染或部分渲染的技术，从而达到极高的渲染性能，虚拟列表其实是按需显示的一种实现。

如图示例，其组成一般包含 3 部分：
![虚拟列表的实现](/images/vue/long-list3.png)

1. 可视区：滚动容器元素的视觉可见区域。
2. 列表渲染区：真实渲染列表元素的区域，列表渲染区大于等于可视区。
3. 真实列表区：又叫可滚动区，滚动容器元素的内部内容区域。
   当用户操作滚动列表后：
4. 显示可视区中的元素（item3~item12）
5. 隐藏可视区外中的元素（item3 和 item12 之外的）

视图结构
按照图示，我们先构造如下的视图结构

1. viewport：可视区域的容器
2. list-phantom：容器内的占位，高度为真实列表区域的高度，用于形成滚动条
3. list-area：列表项的渲染区域

```html
<div className="viewport">
  <div className="list-phantom"></div>
  <div className="list-area">
    <!-- item-1 -->
    <!-- item-2 -->
    <!-- item-n -->
  </div>
</div>
```

其核心思路是处理用户滚动时可视区元素的显示和可视区外元素的隐藏

1. startIndex：可视区第一个元素标号（图示中为 3）
2. endIndex：可视区最后一个元素标号（图示中为 12）
3. startOffset：可视区第一个元素的向上偏移量

当用户滚动列表时：

1. 计算可视区的 startIndex 和 endIndex
2. 根据 startIndex 和 endIndex 渲染数据
3. 计算 startOffset 偏移量并设置到列表渲染区
4. 列表项高度 itemSize = 100
5. 可视区可显示数量 viewcount = viewport / itemSize
6. 可视区最后一个元素标号 endIndex = startIndex + viewcount

当用户滚动时，逻辑处理如下：

1. 获取可视区滚动距离 scrollTop;
2. 根据 scrollTop 和 itemSize 计算出 startIndex 和 endIndex;

```js
// 获取startIndex
const getStartIndex = (scrollTop) => {
  return Math.floor(scrollTop / itemSize); // 这里可以思考下，为什么要用Math.floor
};
```

3. 根据 startIndex 和 itemSize 计算出 startOffset;
4. 只显示 startIndex 和 endIndex 之间的元素;
5. 设置 list-area 的偏移量为 startOffset;

动态高度的类型(可以在内容渲染完成后，获得其高度)

具体实现:
构造记录列表项位置信息 position 的数组 positions：

1. top: 当前项顶部到列表顶部的距离
2. height: 当前项的高度
3. bottom: 当前项底部到列表顶部的距离
4. index: 当前项的标识

那么计算 startIndex 的逻辑则变为：

```js
// 获取startIndex
const getStartIndex = (scrollTop) => {
  let item = positions.find((i) => i && i.bottom > scrollTop);
  return item.index;
};
```

当有 item 项高度变化后，我们只需要维护这一份 positions 数据即可，从而大大减少了处理起来的复杂度。

以 item-3 项为例，来具体看下当其高度变化后的具体影响

```js
// 高度变化前position信息
{
    index: 3, // 当前列表项的标识
    height: defaultItemSize, // 当前列表项高度（默认初始高度）
    top: index * defaultItemSize, // 当前项顶部到列表顶部的距离
    bottom: (index + 1) * defaultItemSize, //当前项底部到列表顶部的距离
}
// 高度变化后，设变化的高度dHeight = newHeight - oldHeight
{
    index: 3, // 当前列表项的标识
    height: defaultItemSize + dHeight, // 当前列表项高度
    top: index * defaultItemSize, //当前项顶部到列表顶部的距离
    bottom: (index + 1) * defaultItemSize + dHeight, //当前项底部到列表顶部的距离
}
```

主动监听 (ResizeObserver API)

ResizeObserver 可以监听到指定元素的高度的变化，而且是原生浏览器层面的支持，性能方面也是可靠的。

```js
// 监听高度变化
const observe = () => {
  const resizeObserver = new ResizeObserver(() => {
    // 获取当前列表项的高度
    const el = element.current;
    if (el && el.offsetHeight) {
      // 触发高度更新
      measure(index, el.offsetHeight);
    }
  });
  resizeObserver.observe(element.current);

  return () => resizeObserver.disconnect();
};
```

#### 白屏优化

- 方案一：增加缓存区(列表渲染区域要大于可视区)
- 方案二：部分渲染 (对非可见区域中的数据不渲染或部分渲染的技术)
  措施：采用 skeleton 加载骨架屏来代替原有的不渲染部分，这样当滚动过快时，白屏也就替换为了加载屏。

#### 计算优化

首页我们来看下，上一节提到的 positions 数组其实是个标准的按照各项位置升序的有序数组。

而最重要的和调用次数最多的逻辑是计算 startIndex：

```js
// 获取startIndex
const getStartIndex = (scrollTop) => {
  let item = positions.find((i) => i && i.bottom > scrollTop);
  return item.index;
};
// 所有，我们可以采用二分查找法来进行优化，具体二分查找法的实现就不在这里展开了，可查看在线示例。
const getStartIndex = (scrollTop) => {
  // let item = positions.find((i) => i && i.bottom > scrollTop);
  let item = binarySearch(positions, scrollTop);
  return item.index;
};
```

其时间复杂度也从 O(n) 降为 O(logn)；
[实现效果](https://codesandbox.io/p/sandbox/virtuallis4-tyoo9)
