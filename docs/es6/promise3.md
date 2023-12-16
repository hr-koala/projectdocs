---
title: promise 典型题
---

## 使用 Promise 实现每隔 1 秒输出 1,2,3

```js
const arr = [1, 2, 3];
let result = arr.reduce(
  (p, x) =>
    p.then(() => new Promise((r) => setTimeout(() => r(console.log(x)), 1000))),
  Promise.resolve()
);
```

## 使用 Promise 实现红绿灯交替重复亮

红灯 3 秒亮一次，黄灯 2 秒亮一次，绿灯 1 秒亮一次；如何让三个灯不断交替重复亮灯？（用 Promise 实现）三个亮灯函数已经存在：

```js
function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}
const light = function (timer, cb) {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timer);
  });
};
const step = function () {
  Promise.resolve()
    .then(() => {
      return light(3000, red);
    })
    .then(() => {
      return light(2000, green);
    })
    .then(() => {
      return light(1000, yellow);
    })
    .then(() => {
      return step();
    });
};

step();
```

## 实现 mergePromise 函数

实现 mergePromise 函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组 data 中。
**思路：**

- 定义一个数组 data 用于保存所有异步操作的结果
- 初始化一个 const promise = Promise.resolve()，然后循环遍历数组，在 promise 后面添加执行 ajax 任务，同时要将添加的结果重新赋值到 promise 上。

```js
const time = (timer) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timer);
  });
};
const ajax1 = () =>
  time(2000).then(() => {
    console.log(1);
    return 1;
  });
const ajax2 = () =>
  time(1000).then(() => {
    console.log(2);
    return 2;
  });
const ajax3 = () =>
  time(1000).then(() => {
    console.log(3);
    return 3;
  });

function mergePromise(ajaxArray) {
  // 存放每个ajax的结果
  const data = [];
  let promise = Promise.resolve();
  ajaxArray.forEach((ajax) => {
    // 第一次的then为了用来调用ajax
    // 第二次的then是为了获取ajax的结果
    promise = promise.then(ajax).then((res) => {
      data.push(res);
      return data; // 把每次的结果返回
    });
  });
  // 最后得到的promise它的值就是data
  return promise;
}

mergePromise([ajax1, ajax2, ajax3]).then((data) => {
  console.log("done");
  console.log(data); // data 为 [1, 2, 3]
});
```

## 封装一个异步加载图片的方法

```js
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function() {
      console.log("一张图片加载完成");
      resolve(img);
    };
    img.onerror = function() {
    	reject(new Error('Could not load image at' + url));
    };
    img.src = url;
  });
```

## 限制异步操作的并发个数并尽可能快的完成全部

有 8 个图片资源的 url，已经存储在数组 urls 中。
urls 类似于['https://image1.png', 'https://image2.png', ....]
而且已经有一个函数 function loadImg，输入一个 url 链接，返回一个 Promise，该 Promise 在图片下载完成的时候 resolve，下载失败则 reject。
但有一个要求，任何时刻同时下载的链接数量不可以超过 3 个。  
请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。

既然题目的要求是保证每次并发请求的数量为 3，那么我们可以先请求 urls 中的前面三个(下标为 0,1,2)，并且请求的时候使用 Promise.race()来同时请求，三个中有一个先完成了(例如下标为 1 的图片)，我们就把这个当前数组中已经完成的那一项(第 1 项)换成还没有请求的那一项(urls 中下标为 3)。  
直到 urls 已经遍历完了，然后将最后三个没有完成的请求(也就是状态没有改变的 Promise)用 Promise.all()来加载它们。  
不多说，流程图都给你画好了，你可以结合流程图再来看代码。
![图标](/images/es6/promise2.png)

```js
function limitLoad(urls, handler, limit) {
  let sequence = [].concat(urls); // 复制urls
  // 这一步是为了初始化 promises 这个"容器"
  let promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      // 返回下标是为了知道数组中是哪一项最先完成
      return index;
    });
  });
  // 注意这里要将整个变量过程返回，这样得到的就是一个Promise，可以在外面链式调用
  return sequence
    .reduce((pCollect, url) => {
      return pCollect
        .then(() => {
          return Promise.race(promises); // 返回已经完成的下标
        })
        .then((fastestIndex) => {
          // 获取到已经完成的下标
          // 将"容器"内已经完成的那一项替换
          promises[fastestIndex] = handler(url).then(() => {
            return fastestIndex; // 要继续将这个下标返回，以便下一次变量
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }, Promise.resolve()) // 初始化传入
    .then(() => {
      // 最后三个用.all来调用
      return Promise.all(promises);
    });
}
limitLoad(urls, loadImg, 3)
  .then((res) => {
    console.log("图片全部加载完毕");
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

另一种方案： 将这个数组每 3 个 url 一组创建成一个二维数组
然后用 Promise.all()每次加载一组 url（也就是并发 3 个），这一组加载完再加载下一组。

```js
function limitLoad(urls, handler, limit) {
  const data = []; // 存储所有的加载结果
  let p = Promise.resolve();
  const handleUrls = (urls) => {
    // 这个函数是为了生成3个url为一组的二维数组
    const doubleDim = [];
    const len = Math.ceil(urls.length / limit); // Math.ceil(8 / 3) = 3
    console.log(len); // 3, 表示二维数组的长度为3
    for (let i = 0; i < len; i++) {
      doubleDim.push(urls.slice(i * limit, (i + 1) * limit));
    }
    return doubleDim;
  };
  const ajaxImage = (urlCollect) => {
    // 将一组字符串url 转换为一个加载图片的数组
    console.log(urlCollect);
    return urlCollect.map((url) => handler(url));
  };
  const doubleDim = handleUrls(urls); // 得到3个url为一组的二维数组
  doubleDim.forEach((urlCollect) => {
    p = p
      .then(() => Promise.all(ajaxImage(urlCollect)))
      .then((res) => {
        data.push(...res); // 将每次的结果展开，并存储到data中 (res为：[img, img, img])
        return data;
      });
  });
  return p;
}
limitLoad(urls, loadImg, 3).then((res) => {
  console.log(res); // 最终得到的是长度为8的img数组: [img, img, img, ...]
  res.forEach((img) => {
    document.body.appendChild(img);
  });
});
```
