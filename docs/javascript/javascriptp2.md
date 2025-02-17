## 随机数组

```js
// 打乱数组内元素顺序
function rd(arr) {
  let ind,len=arr.length - 1;
  for (let point = arr.length - 1; point >= 0; point--) {
    ind = Math.floor(Math.random() * point);
    [(arr[ind], arr[point])] = [arr[point], arr[ind]];
  }
  return arr;
}
console.log(rd([1, 3, 5, "poi", 2, 4, 6, 7, 9, 8]));
```

## 普通函数 VS 箭头函数

- 普通函数：函数声明，函数表达式，有 new 和原型，有 argments, super，new.target，this 动态，修改 this call / apply / bind
- 箭头函数：只有函数表达式，没有 new 和原型，无 arguments，无 super, 无 new.target，thisthis 一般是全局或上一层，不可修改 this

## console.log(['1', '2', '3'].map(parseInt)) // [ 1, NaN, NaN ]

```ts
[1, 2, 3, 4, 5].map(console.log);
// 上面的代码等于
[1, 2, 3, 4, 5].map((val, index, array) => console.log(val, index, array));
```
当给 map() 传入一个方法时，对于每次迭代，都会有三个参数传入方法：`currentValue`,`currentIndex`,和全部`array`。这就是为什么每次迭代都会输出全部三个实体内容。

```js
// ParseInt 接受两个参数：string 和 radix。如果 radix 没有提供，默认值就是 10
parseInt('11');                => 11
parseInt('11', 2);             => 3
parseInt('11', 16);            => 17
parseInt('11', undefined);     => 11 (没有 radix)
parseInt('11', 0);             => 11 (没有 radix)  // 0 是假值，所以 radix 基数取值为 10

["1", "2", "3"].map(parseInt) // [ 1, NaN, NaN ]

["1", "2", "3"].map((item, index, array)=> parseInt(item, index));
// 0.1+0.2 =/= 0.3 // 符号位(1位) 指数位(11位)  有效数(52位)
// 0.1的二进制 0.10011 * 2^(-4)  无限循环
// 0.2的二进制

["1", "2", "3","4", "5", "6","7", "8", "9","10", "11","12", "13"].map(parseInt) // [ 1, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 9, 11, 13, 15 ]
```

## 冒泡排序

::: details 冒泡排序

```js
function bubbleSort(arr) {
  const len = arr.length - 1;
  for (const i = 0; i < len; i++) {
    for (const j = 0; j < len - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
```

:::
::: details 递归深拷贝

```js
function extend(origin, deep) {
  const newObj = origin instanceof Array ? [] : {};
  for (const key in origin) {
    newObj[key] =
      !!deep && typeof origin[key] === "object" && origin[key] !== null
        ? extend(origin[key], deep)
        : origin[key];
  }
  return newObj;
}
```

::: details IntersectionObserver

```js
let callback = (entries) => {
  console.log(entries);
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const image = entry.target;
      const data_src = image.getAttribute("data-src");
      image.setAttribute("src", data_src);
      observer.unobserve(image);
    }
  });
};
// IntersectionObserver ? API
let observer = new IntersectionObserver(callback);
// observer.observe(DOM)
images.forEach((image) => {
  observer.observe(image);
});
```

:::
