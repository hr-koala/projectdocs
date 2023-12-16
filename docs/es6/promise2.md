## 模拟实现 Promise

- Promise 利用三大手段解决回调地狱：
- 1. 回调函数延迟绑定
- 2. 返回值穿透
- 3. 错误冒泡

```js
// 定义三种状态
const PENDING = "PENDING"; // 进行中
const FULFILLED = "FULFILLED"; // 已成功
const REJECTED = "REJECTED"; // 已失败
class NewPromise {
  status: string;
  result: null;
  reason: null;
  resolveCallback: never[];
  rejectCallback: never[];
  static: any;
  constructor(exector: {
    (resolve: any, reject: any): void,
    (resolve: any, reject: any): void,
    (arg0: (value: any) => void, arg1: (value: any) => void): void,
  }) {
    this.status = PENDING; // 初始化状态
    // 将成功、失败结果放在this上，便于then、catch访问
    this.result = null;
    this.reason = null;
    this.resolveCallback = []; // 成功态回调函数队列
    this.rejectCallback = []; // 失败态回调函数队列
    const resolve = (value: any) => {
      if (this.status === PENDING) {
        // 只有进行中状态才能更改状态
        this.status = FULFILLED;
        this.result = value;
        // 成功态函数依次执行
        this.resolveCallback.forEach((callback: any) => callback(this.result));
      }
    };
    const reject = (value: any) => {
      if (this.status === PENDING) {
        // 只有进行中状态才能更改状态
        this.status = REJECTED;
        this.reason = value;
        // 失败态函数依次执行
        this.rejectCallback.forEach((callback: any) => callback(this.reason));
      }
    };
    try {
      // 立即执行exector
      // 把内部的resolve和reject传入executor，用户可调用resolve和reject
      exector(resolve, reject);
    } catch (error) {
      // executor执行出错，将错误内容reject抛出去
      reject(error);
    }
  }
  // then、catch是微任务，这里使用setTimeout模拟
  then(onFULFILLED: any, onREJECTED?: any) {
    // 原理上是当then中传入的不算函数，则这个promise返回上一个promise的值，这就是发生值穿透的原因，
    // 所以只需要对then的两个参数进行设置就行了：
    onFULFILLED = typeof onFULFILLED === "function" ? onFULFILLED : () => {};
    onREJECTED = typeof onREJECTED === "function" ? onREJECTED : () => {};
    const self = this; // 保存this
    return new NewPromise((resolve, reject) => {
      // 实现链式调用
      if (self.status === PENDING) {
        // 状态是PENDING下执行
        // 说明promise内部有异步代码执行，还未改变状态，添加到成功/失败回调任务队列即可
        self.resolveCallback.push(() => {
          try {
            // try捕获错误
            // 模拟微任务
            setTimeout(() => {
              const result = onFULFILLED(self.result);
              // 分两种情况：
              // 1. 回调函数返回值是Promise，执行then操作
              // 2. 如果不是Promise，调用新Promise的resolve函数
              result instanceof NewPromise
                ? result.then(resolve, reject)
                : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });
        self.rejectCallback.push(() => {
          try {
            setTimeout(() => {
              const result = onREJECTED(self.reason);
              result instanceof NewPromise
                ? result.then(resolve, reject)
                : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.status === FULFILLED) {
        // FULFILLED状态下才执行
        setTimeout(() => {
          try {
            const result = onFULFILLED(self.result);
            result instanceof NewPromise
              ? result.then(resolve, reject)
              : resolve(result);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.status === REJECTED) {
        // REJECTED状态下才执行
        setTimeout(() => {
          try {
            const result = onREJECTED(self.reason);
            result instanceof NewPromise
              ? result.then(resolve, reject)
              : resolve(result);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
  }
  // Promise.prototype.catch就是Promise.prototype.then(null, onRejected)的别名
  catch(
    onREJECTED:
      | ((
          // 获取url中的参数
          // 1. 指定参数名称，返回该参数的值 或者 空字符串
          // 2. 不指定参数名称，返回全部的参数对象 或者 {}
          // 3. 如果存在多个同名参数，则返回数组
          arg0: null
          // 2. 不指定参数名称，返回全部的参数对象 或者 {}
          // 3. 如果存在多个同名参数，则返回数组
        ) => any)
      | undefined
  ) {
    return this.then(null, onREJECTED);
  }
  static resolve(value: any) {
    if (value instanceof NewPromise) {
      // 如果是Promise实例，直接返回
      return value;
    } else {
      // 如果不是Promise实例，返回一个新的Promise对象，状态为FULFILLED
      return new NewPromise((resolve, reject) => resolve(value));
    }
  }
  static reject(value: any) {
    return new NewPromise((resolve, reject) => reject(value));
  }

  // 返回一个promise对象，只有当所有promise都成功时返回的promise状态才成功，需要注意的点是：
  // 1.所有的promise状态变为FULFILLED，返回的promise状态才变为FULFILLED。
  // 2.一个promise状态变为REJECTED，返回的promise状态就变为REJECTED。
  // 3.数组成员不一定都是promise，需要使用Promise.resolve()处理。
  static all(promiseArr: any[]) {
    const len = promiseArr.length;
    const values = new Array(len);
    //记录已经成功执行的promise个数
    let count = 0;
    return new NewPromise((resolve, reject) => {
      for (let i = 0; i < len; i++) {
        NewPromise.resolve(promiseArr[i]).then(
          (val: any) => {
            values[i] = val;
            count++;
            if (count === len) resolve(values);
          },
          (err: any) => reject(err)
        );
      }
    });
  }
  static race(promiseArr: any[]) {
    return new NewPromise((resolve, reject) => {
      promiseArr.forEach((p: any) => {
        NewPromise.resolve(p).then(
          (val: any) => resolve(val),
          (err: any) => reject(err)
        );
      });
    });
  }
}

let commitment = new NewPromise((resolve, reject) => {
  resolve("data");
});
commitment.then((res) => {
  console.log(res);
});
```

## [事件循环(Event Loop)](/javascript/javascript3.md#微任务宏任务)

event loop 它的执行顺序：

- 1. 一开始整个脚本作为一个宏任务执行
- 2. 执行过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列
- 3. 当前宏任务执行完出队，检查微任务列表，有则依次执行，直到全部执行完
- 4. 执行浏览器 UI 线程的渲染工作
- 5. 检查是否有 `Web Worker` 任务，有则执行
- 6. 执行完本轮的宏任务，回到 2，依此循环，直到宏任务和微任务队列都为空

宏任务包括：`script 、setTimeout、setInterval 、setImmediate 、I/O 、UI rendering`。

微任务包括：`MutationObserver、Promise.then()或 catch()、Promise 为基础开发的其它技术，比如 fetch API、V8 的垃圾回收过程、Node 独有的 process.nextTick`。

注意: warning:：在所有任务开始的时候，由于宏任务中包括了 `script`，所以浏览器会先执行一个宏任务，在这个过程中你看到的延迟任务(例如 setTimeout)将被放到下一轮宏任务中来执行。

## promsie 实例题

```js
const promise1 = new Promise((resolve, reject) => {
  console.log("promise1");
});
console.log("1", promise1);
// 从上至下，先遇到new Promise，执行该构造函数中的代码promise1 然后执行同步代码1，此时promise1没有被resolve或者reject，因此状态还是pending
// 'promise1'         '1' Promise{<pending>}

const promise1 = new Promise((resolve, reject) => {
  console.log("1");
  resolve("success");
  console.log("2");
});
promise1.then(() => {
  console.log("3");
});
const promise2 = new Promise((resolve, reject) => {
  console.log("5");
});
promise2.then(() => {
  console.log("6"); //promise2中并没有resolve或者reject 因此promise.then并不会执行，它只有在被改变了状态之后才会执行。
});
console.log("4");
//从上至下，先遇到new Promise，执行其中的同步代码1 再遇到resolve('success')， 将promise1的状态改为了resolved并且将值保存下来 继续执行同步代码2 跳出promise1，往下执行，碰到promise1.then这个微任务，将其加入微任务队列 再遇到promise2，执行其中的同步代码5,此时promise2没有被resolve或者reject，因此状态还是pending, 执行同步代码4 本轮宏任务全部执行完毕，检查微任务队列，发现promise1.then这个微任务且状态为resolved，执行它。
// 1,2,5,4,3

const promise1 = new Promise((resolve, reject) => {
  console.log("promise1");
  resolve("resolve1");
});
const promise2 = promise1.then((res) => {
  console.log(res);
});
console.log("1", promise1);
console.log("2", promise2);
// promise1  , '1' Promise{<resolve>:'resolve1'} , '2' Promise{<pending>} , 'resolve1'

const fn = () =>
  new Promise((resolve, reject) => {
    console.log("1");
    resolve("success");
  });
fn().then((res) => console.log(res));
console.log("start");
// 1 , start , success

const fn = () =>
  new Promise((resolve, reject) => {
    console.log("1");
    resolve("success");
  });
console.log("start");
fn().then((res) => console.log(res));
// start , 1 , success

const promise = new Promise((resolve, reject) => {
  console.log("1");
  setTimeout(() => {
    console.log("timerStart");
    resolve("success");
    console.log("timerEnd");
  });
  console.log("2");
});
promise.then((res) => console.log(res));
console.log("4");
// 1, 2, 4, timerStart, timerEnd, success
// 从上至下，先遇到new Promise，执行该构造函数中的代码1 然后碰到了定时器，将这个定时器中的函数放到下一个宏任务的延迟队列中等待执行 执行同步代码2 跳出promise函数，遇到promise.then，但其状态还是为pending，这里理解为先不执行 执行同步代码4 一轮循环过后，进入第二次宏任务，发现延迟队列中有setTimeout定时器，执行它 首先执行timerStart，然后遇到了resolve，将promise的状态改为resolved且保存结果并将之前的promise.then推入微任务队列 继续执行同步代码timerEnd 宏任务全部执行完毕，查找微任务队列，发现promise.then这个微任务，执行它。
```

```js
setTimeout(() => {
  console.log("timer1");
  setTimeout(() => {
    console.log("timer3");
  }, 0);
}, 0);
setTimeout(() => {
  console.log("timer2");
}, 0);
console.log("start");
// 执行结果： 'start', 'timer1',  'timer2',  'timer3'
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(() => {
    console.log("promise");
  });
}, 0);
setTimeout(() => {
  console.log("timer2");
}, 0);
console.log("start");
// 执行结果：'start', 'timer1',   'promise', 'timer2'
// 这两个例子，看着好像只是把第一个定时器中的内容换了一下而已。一个是为定时器timer3，一个是为Promise.then 但是如果是定时器timer3的话，它会在timer2后执行，而Promise.then却是在timer2之前执行。你可以这样理解，Promise.then是微任务，它会被加入到本轮中的微任务列表，而定时器timer3是宏任务，它会被加入到下一轮的宏任务中。
```

```js
Promise.resolve().then(() => {
  console.log("promise1");
  let timer2 = setTimeout(() => {
    console.log("timer2");
  }, 0);
});
let timer1 = setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(() => {
    console.log("promise2");
  });
}, 0);
console.log("start");
// start, promise1, timer1, promise2, timer2

const promise1 = new Promise((resolve, reject) => {
  let timer1 = setTimeout(() => {
    resolve("success");
    console.log("timer1");
  }, 1000);
  console.log("promise1里的内容");
});
let promise2 = promise1.then(() => {
  throw new Error("error!!!");
});
console.log("promise1", promise1);
console.log("promise2", promise2);
let timer2 = setTimeout(() => {
  console.log("timer2");
  console.log("promise1", promise1);
  console.log("promise2", promise2);
}, 2000);
// promise1里的内容 , promise1 Promise{<pending>} , promise2 Promise{<pending>} ,timer1 , Uncaught (in promise) Error: error!!! , timer2 , promise1 Promise{<resolved>:'success'} , promise2 Promise{<rejected>:Error:error!!!}
```

#### 总结：

- Promise 的状态一经改变就不能再改变。
- .then 和.catch 都会返回一个新的 Promise。
- catch 不管被连接到哪里，都能捕获上层未捕捉过的错误。
- 在 Promise 中，返回任意一个非 promise 的值都会被包裹成 promise 对象，例如 return 2 会被包装为 return Promise.resolve(2)。
- Promise 的 .then 或者 .catch 可以被调用多次, 但如果 Promise 内部的状态一经改变，并且有了一个值，那么后续每次调用.then 或者.catch 的时候都会直接拿到该值。
- .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获。
- .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。
- .then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传。
- .then 方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，再某些时候你可以认为 catch 是.then 第二个参数的简便写法。
- .finally 方法也是返回一个 Promise，他在 Promise 结束的时候，无论结果为 resolved 还是 rejected，都会执行里面的回调函数。

```js
const promise = new Promise((resolve, reject) => {
  resolve("success1");
  reject("error");
  resolve("success2");
});
promise
  .then((res) => {
    console.log("then", res);
  })
  .catch((err) => console.log("catch", err));
// then success1
// 构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用 。验证了第一个结论，Promise的状态一经改变就不能再改变

const promise = new Promise((resolve, reject) => {
  reject("error");
  resolve("success2");
});
promise
  .then((res) => {
    console.log("then1:", res);
  })
  .then((res) => {
    console.log("then2:", res);
  })
  .catch((err) => console.log("catch1:", err))
  .then((res) => {
    console.log("then3:", res);
  });
// catch1 error , then undefined
// 验证了第三个结论，catch不管被连接到哪里，都能捕获上层未捕捉过的错误。
// 至于then3也会被执行，那是因为catch()也会返回一个Promise，且由于这个Promise没有返回值，所以打印出来的是undefined。

Promise.resolve(1).then(res=>{
  console.log('then1:'res)
  return 2
}).catch(err=>{
  return 3
}).then(res=>console.log('then2',res))
// then1:1 , then2:2
// Promise可以链式调用，不过promise 每次调用 .then 或者 .catch 都会返回一个新的 promise，从而实现了链式调用, 它并不像一般我们任务的链式调用一样return this。上面的输出结果之所以依次打印出1和2，那是因为resolve(1)之后走的是第一个then方法，并没有走catch里，所以第二个then中的res得到的实际上是第一个then的返回值。且return 2会被包装成resolve(2)。

Promise.resolve(1).then(res=>{console.log(res)}).catch(err=>{
  return 3
}).then(res=>{
  console.log(res)
})
// 1 , undefined
// .then执行成功后必然返回一个新的Promise，不论有没有return 新值，都会执行下一个.then，默认参数为undefined。

Promise.reject(1).then(res=>{
  console.log(res)
  return 2
}).catch(err=>{
  console.log(err)
  return 3
}).then(res=>{
  console.log(res)
})
// 1 , 3
```

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("timer");
    resolve("success");
  }, 1000);
});
const start = Date.now();
promise.then((res) => {
  console.log(res, Date.now() - start);
});
promise.then((res) => {
  console.log(res, Date.now() - start);
});
// timer , success 1006 , success 1006
// Promise 的 .then 或者 .catch 可以被调用多次，但这里 Promise 构造函数只执行一次。或者说 promise 内部状态一经改变，并且有了一个值，那么后续每次调用 .then 或者 .catch 都会直接拿到该值。

Promise.resolve()
  .then(() => {
    return new Error("error!!!");
  })
  .then((res) => {
    console.log("then: ", res);
  })
  .catch((err) => {
    console.log("catch: ", err);
  });
// "then: " "Error: error!!!"
```

```js
const promise = Promise.resolve().then(() => {
  return promise;
});
promise.catch(console.err);
// .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。
// 因此结果会报错： Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>

Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);
// 1

Promise.reject("err!!!")
  .then(
    (res) => {
      console.log("success", res);
    },
    (err) => {
      console.log("error", err);
    }
  )
  .catch((err) => {
    console.log("catch", err);
  });
// 'error' 'error!!!'

Promise.reject("error!!!")
  .then((res) => {
    console.log("success", res);
  })
  .catch((err) => {
    console.log("catch", err);
  });
// 'catch' 'error!!!'

Promise.reject("err!!!")
  .then(
    (res) => {
      console.log("success", res);
    },
    (err) => {
      console.log("error", err);
    }
  )
  .then((err) => {
    console.log(1);
  });
// 'error' 'error!!!'  ,  1
```

- 接着来看看.finally()，这个功能一般不太用在面试中，不过如果碰到了你也应该知道该如何处理。其实你只要记住它三个很重要的知识点就可以了：
  .finally()方法不管 Promise 对象最后的状态如何都会执行 .finally()方法的回调函数不接受任何的参数，也就是说你在.finally()函数中是没法知道 Promise 最终的状态是 resolved 还是 rejected 的 它最终返回的默认会是一个上一次的 Promise 对象值，不过如果抛出的是一个异常则返回异常的 Promise 对象。

来看看这个简单的例子:chestnut:：

```js
Promise.resolve("1")
  .then((res) => {
    console.log(res);
  })
  .finally(() => {
    console.log("finally");
  });
Promise.resolve("2")
  .finally(() => {
    console.log("finally2");
    return "我是finally2返回的值";
  })
  .then((res) => {
    console.log("finally2后面的then函数", res);
  });
//打印结果为： '1' , 'finally2' , 'finally' , 'finally2 后面的 then 函数' '2'
```

这两个 Promise 的.finally 都会执行，且就算 finally2 返回了新的值，它后面的 then()函数接收到的结果却还是'2'

至于为什么 finally2 的打印要在 finally 前面，请看下一个例子中的解析。
不过在此之前让我们再来确认一下，finally 中要是抛出的是一个异常是怎样的：

```js
Promise.resolve("1")
  .finally(() => {
    console.log("finally1");
    throw new Error("我是finally中抛出的异常");
  })
  .then((res) => {
    console.log("finally后面的then函数", res);
  })
  .catch((err) => {
    console.log("捕获错误", err);
  });
// 执行结果为：'finally1' , '捕获错误' Error: 我是finally中抛出的异常
```

但是如果改为 return new Error('我是 finally 中抛出的异常')，打印出来的就是'finally 后面的 then 函数 1'

OK，:ok_hand:，让我们来看一个比较难的例子:chestnut:：

```js
function promise1() {
  let p = new Promise((resolve) => {
    console.log("promise1");
    resolve("1");
  });
  return p;
}
function promise2() {
  return new Promise((resolve, reject) => {
    reject("error");
  });
}
promise1()
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
  .finally(() => console.log("finally1"));

promise2()
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
  .finally(() => console.log("finally2"));
```

执行过程：首先定义了两个函数 promise1 和 promise2，先不管接着往下看。
promise1 函数先被调用了，然后执行里面 new Promise 的同步代码打印出 promise1
之后遇到了 resolve(1)，将 p 的状态改为了 resolved 并将结果保存下来。
此时 promise1 内的函数内容已经执行完了，跳出该函数
碰到了 promise1().then()，由于 promise1 的状态已经发生了改变且为 resolved 因此将 promise1().then()这条微任务加入本轮的微任务列表(这是第一个微任务)
这时候要注意了，代码并不会接着往链式调用的下面走，也就是不会先将.finally 加入微任务列表，那是因为.then 本身就是一个微任务，它链式后面的内容必须得等当前这个微任务执行完才会执行，因此这里我们先不管.finally()
再往下走碰到了 promise2()函数，其中返回的 new Promise 中并没有同步代码需要执行，所以执行 reject('error')的时候将 promise2 函数中的 Promise 的状态变为了 rejected
跳出 promise2 函数，遇到了 promise2().catch()，将其加入当前的微任务队列(这是第二个微任务)，且链式调用后面的内容得等该任务执行完后才执行，和.then()一样。
OK， 本轮的宏任务全部执行完了，来看看微任务列表，存在 promise1().then()，执行它，打印出 1，然后遇到了.finally()这个微任务将它加入微任务列表(这是第三个微任务)等待执行
再执行 promise2().catch()打印出 error，执行完后将 finally2 加入微任务加入微任务列表(这是第四个微任务)
OK， 本轮又全部执行完了，但是微任务列表还有两个新的微任务没有执行完，因此依次执行 finally1 和 finally2。结果： 'promise1' , '1' , 'error' , 'finally1' , 'finally2'

在这道题中其实能拓展的东西挺多的，之前没有提到，那就是你可以理解为`**链式调用**后面的内容需要等前一个调用执行完才会执行`。就像是这里的 finally()会等 promise1().then()执行完才会将 finally()加入微任务队列，其实如果这道题中你把 finally()换成是 then()也是这样的:

```js
function promise1() {
  let p = new Promise((resolve) => {
    console.log("promise1");
    resolve("1");
  });
  return p;
}
function promise2() {
  return new Promise((resolve, reject) => {
    reject("error");
  });
}
promise1()
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
  .then(() => console.log("finally1"));

promise2()
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
  .then(() => console.log("finally2"));
```

### Promise.all()和 Promise.race()的用法。

- .all()的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
- .race()的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。

```js
function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));
  return p;
}
Promise.all([runAsync(1), runAsync(2), runAsync(3)]).then((res) =>
  console.log(res)
);
// 当打开页面的时候，在间隔一秒后，控制台会同时打印出1, 2, 3，还有一个数组[1, 2, 3]。
// 1
// 2
// 3
// [1, 2, 3]
```

所以现在能理解这句话的意思了吗：`有了all，你就可以并行执行多个异步操作，并且在一个回调中处理所有的返回数据`。
.all()后面的.then()里的回调函数接收的就是所有异步操作的结果。  
而且这个结果中数组的顺序和 Promise.all()接收到的数组顺序一致！！！

```js
function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));
  return p;
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  );
  return p;
}
Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
// 1 // 1s后输出
// 3
// 2s后输出
// 2
// Error 2
// 4s后输出
// 4
```

- .race()方法，它只会获取最先执行完成的那个结果，其它的异步任务虽然也会继续进行下去，不过 race 已经不管那些任务的结果了。

```js
function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));
  return p;
}
Promise.race([runAsync(1), runAsync(2), runAsync(3)])
  .then((res) => console.log("result: ", res))
  .catch((err) => console.log(err));
// 1
// 'result: ' 1
// 2
// 3
```

```js
function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));
  return p;
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  );
  return p;
}
Promise.race([runReject(0), runAsync(1), runAsync(2), runAsync(3)])
  .then((res) => console.log("result: ", res))
  .catch((err) => console.log(err));
// 0
// 'Error: 0'
// 1
// 2
// 3
```

**总结**

- Promise.all()的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
- .race()的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。
- Promise.all().then()结果中数组的顺序和 Promise.all()接收到的数组顺序一致。
- all 和 race 传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被 then 的第二个参数或者后面的 catch 捕获；但并不会影响数组中其它的异步任务的执行。

## async/await

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
async1();
console.log("start");
// 'async1 start'
// 'async2'
// 'start'
// 'async1 end'
```

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
  setTimeout(() => {
    console.log("timer1");
  }, 0);
}
async function async2() {
  setTimeout(() => {
    console.log("timer2");
  }, 0);
  console.log("async2");
}
async1();
setTimeout(() => {
  console.log("timer3");
}, 0);
console.log("start");
// 'async1 start'
// 'async2'
// 'start'
// 'async1 end'
// 'timer2'
// 'timer3'
// 'timer1'
```

```js
async function fn() {
  // return await 1234
  // 等同于
  return 123;
}
fn().then((res) => console.log(res));
// 123
```

```js
async function async1() {
  console.log("async1 start");
  await new Promise((resolve) => {
    console.log("promise1");
  });
  console.log("async1 success");
  return "async1 end";
}
console.log("srcipt start");
async1().then((res) => console.log(res));
console.log("srcipt end");
// 'script start'
// 'async1 start'
// 'promise1'
// 'script end'
```

在 async1 中 await 后面的 Promise 是没有返回值的，也就是它的状态始终是 pending 状态，因此相当于一直在 await，await，await 却始终没有响应...  
所以在 await 之后的内容是不会执行的，也包括 async1 后面的 .then。

```js
async function async1() {
  console.log("async1 start");
  await new Promise((resolve) => {
    console.log("promise1");
    resolve("promise resolve");
  });
  console.log("async1 success");
  return "async1 end";
}
console.log("srcipt start");
async1().then((res) => {
  console.log(res);
});
new Promise((resolve) => {
  console.log("promise2");
  setTimeout(() => {
    console.log("timer");
  });
});
// 'script start'
// 'async1 start'
// 'promise1'
// 'promise2'
// 'async1 success'
// 'async1 end'
// 'timer'
```

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");
// 'script start'
// 'async1 start'
// 'async2'
// 'promise1'
// 'script end'
// 'async1 end'
// 'promise2'
// 'setTimeout'
```

```js
async function testSometing() {
  console.log("执行testSometing");
  return "testSometing";
}

async function testAsync() {
  console.log("执行testAsync");
  return Promise.resolve("hello async");
}

async function test() {
  console.log("test start...");
  const v1 = await testSometing();
  console.log(v1);
  const v2 = await testAsync();
  console.log(v2);
  console.log(v1, v2);
}

test();

var promise = new Promise((resolve) => {
  console.log("promise start...");
  resolve("promise");
});
promise.then((val) => console.log(val));

console.log("test end...");
// 'test start...'
// '执行testSometing'
// 'promise start...'
// 'test end...'
// 'testSometing'
// '执行testAsync'
// 'promise'
// 'hello async'
// 'testSometing' 'hello async'
```

如果在 async 函数中抛出了错误，则终止错误结果，不会继续向下执行。

```js
async function async1() {
  await async2();
  console.log("async1");
  return "async1 success";
}
async function async2() {
  return new Promise((resolve, reject) => {
    console.log("async2");
    reject("error");
  });
}
async1().then((res) => console.log(res));
// 'async2'
// Uncaught (in promise) error
async function async1() {
  console.log("async1");
  throw new Error("error!!!");
  return "async1 success";
}
async1().then((res) => console.log(res));
// 'async1'
// Uncaught (in promise) Error: error!!!
```

如果想要使得错误的地方不影响 async 函数后续的执行的话，可以使用 try catch

```js
async function async1() {
  // try {
  //   await Promise.reject('error!!!')
  // } catch(e) {
  //   console.log(e)
  // }
  // 或者你可以直接在Promise.reject后面跟着一个catch()方法：
  await Promise.reject("error!!!").catch((e) => console.log(e));
  console.log("async1");
  return Promise.resolve("async1 success");
}
async1().then((res) => console.log(res));
console.log("script start");
// 'script start'
// 'error!!!'
// 'async1'
// 'async1 success'
```

## 综合题

```js
const first = () =>
  new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
      console.log(7);
      setTimeout(() => {
        console.log(5);
        resolve(6);
        console.log(p);
      }, 0);
      resolve(1);
    });
    resolve(2);
    p.then((arg) => {
      console.log(arg);
    });
  });
first().then((arg) => {
  console.log(arg);
});
console.log(4);
// 3
// 7
// 4
// 1
// 2
// 5
// Promise{<resolved>: 1}
//resolve(6) 是放在p里的，但是p的状态在之前已经发生过改变了，因此这里就不会再改变，也就是说resolve(6)相当于没任何用处，因此打印出来的p为Promise{<resolved>: 1}
```

```js
const async1 = async () => {
  console.log("async1");
  setTimeout(() => {
    console.log("timer1");
  }, 2000);
  await new Promise((resolve) => {
    console.log("promise1");
  });
  console.log("async1 end");
  return "async1 success";
};
console.log("script start");
async1().then((res) => console.log(res));
console.log("script end");
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then((res) => console.log(res));
setTimeout(() => {
  console.log("timer2");
}, 1000);
// 'script start'
// 'async1'
// 'promise1'
// 'script end'
// 1
// 'timer2'
// 'timer1'
```

**注意点：**

- async 函数中 await 的 new Promise 要是没有返回值的话则不执行后面的内容(类似题 5.5)
- .then 函数中的参数期待的是函数，如果不是函数的话会发生透传(类似题 3.8 )
- 注意定时器的延迟时间

```js
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("resolve3");
    console.log("timer1");
  }, 0);
  resolve("resovle1");
  resolve("resolve2");
})
  .then((res) => {
    console.log(res);
    setTimeout(() => {
      console.log(p1);
    }, 1000);
  })
  .finally((res) => {
    console.log("finally", res);
  });
// 'resolve1'
// 'finally' undefined
// 'timer1'
// Promise{<resolved>: undefined}
```

**注意的点：**

- Promise 的状态一旦改变就无法改变
- finally 不管 Promise 的状态是 resolved 还是 rejected 都会执行，且它的回调函数是接收不到 Promise 的结果的，所以 finally()中的 res 是一个迷惑项。
- 最后一个定时器打印出的 p1 其实是.finally 的返回值，我们知道.finally 的返回值如果在没有抛出错误的情况下默认会是上一个 Promise 的返回值, 而这道题中.finally 上一个 Promise 是.then()，但是这个.then()并没有返回值，所以 p1 打印出来的 Promise 的值会是 undefined，如果你在定时器的下面加上一个 return 1，则值就会变成 1
