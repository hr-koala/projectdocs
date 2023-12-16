# 在 vue 中使用 SockJS 实现 webSocket 通信

关于实时通信  
实现实时通信,我们通常有三种方法:

- ajax 轮询
  ajax 轮询的原理非常简单,让浏览器每隔几秒就像服务器发送一个请求,询问服务器是否有新的信息.
- http 长轮询
  长轮询的机制和 ajax 轮询差不多,都是采用轮询的方式,不过过去的是阻塞模型(一直打电话,没收到就不挂电话),也就是说,客户端发起链接后,如果没有消息,就一直不返回 response 给客户端.知道有新的消息才返回,返回完之后,客户端再此建立连接,周而复始.
- WebSocket
  WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议.在 WebSocket API 中，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送,不需要繁琐的询问和等待.  
  从上面的介绍很容易看出来,ajax 轮询和长轮询都是非常耗费资源的,ajax 轮询需要服务器有很快的处理速度和资源,http 长轮询需要有很高的并发,也就是同时接待客户的能力.而 WebSocket,只需要经过一次 HTTP 请求,就可以与服务端进行源源不断的消息收发了.

### sockjs-client

sockjs-client 是从 SockJS 中分离出来的用于客户端使用的通信模块.所以我们就直接来看看 SockJS.
SockJS 是一个浏览器的 JavaScript 库,它提供了一个类似于网络的对象,SockJS 提供了一个连贯的,跨浏览器的 JavaScript API,它在浏览器和 Web 服务器之间创建了一个低延迟,全双工,跨域通信通道.
你可能会问,我为什么不直接用原生的 WebSocket 而要使用 SockJS 呢?这得益于 SockJS 的一大特性,一些浏览器中缺少对 WebSocket 的支持,因此，回退选项是必要的，而 Spring 框架提供了基于 SockJS 协议的透明的回退选项。SockJS 提供了浏览器兼容性,优先使用原生的 WebSocket,如果某个浏览器不支持 WebSocket,SockJS 会自动降级为轮询.

### stomjs

STOMP(Simple Text-Orientated Messaging Protocol) 面向消息的简单文本协议;  
WebSocket 是一个消息架构,不强制使用任何特定的消息协议,它依赖于应用层解释消息的含义.
与 HTTP 不同,WebSocket 是处在 TCP 上非常薄的一层,会将字节流转化为文本/二进制消息,因此,对于实际应用来说,WebSocket 的通信形式层级过低,因此，可以在 WebSocket 之上使用 STOMP 协议，来为浏览器 和 server 间的 通信增加适当的消息语义。

### STOMP 与 WebSocket 的关系:

HTTP 协议解决了 web 浏览器发起请求以及 web 服务器响应请求的细节,假设 HTTP 协议不存在,只能使用 TCP 套接字来编写 web 应用,你可能认为这是一件疯狂的事情;
直接使用 WebSocket(SockJS)就很类似于使用 TCP 套接字来编写 web 应用,因为没有高层协议,就需要我们定义应用间发送消息的语义,还需要确保连接的两端都能遵循这些语义;  
同 HTTP 在 TCP 套接字上添加请求-响应模型层一样,STOMP 在 WebSocket 之上提供了一个基于帧的线路格式层,用来定义消息语义.

代码实现

```js
// 安装并引入相关模块
import SockJS from "sockjs-client";
import Stomp from "stompjs";

onMounted(() => {
  initWebSocket();
});
onUnMounted(() => {
  // 页面离开时断开连接,清除定时器
  disconnect();
  clearInterval(timer);
});
function initWebSocket() {
  connection();
  // 断开重连机制,尝试发送消息,捕获异常发生时重连
  timer = setInterval(() => {
    try {
      stompClient.send("test");
    } catch (err) {
      console.log("断线了: " + err);
      connection();
    }
  }, 5000);
}
function connection() {
  // 建立连接对象
  socket = new SockJS("http://xxxxxx:8089/ws"); //连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
  // 获取STOMP子协议的客户端对象
  stompClient = Stomp.over(socket);
  // 定义客户端的认证信息,按需求配置
  let headers = {
    login: "mylogin",
    passcode: "mypasscode",
    // additional header
    "client-id": "my-client-id",
  };
  // 向服务器发起websocket连接
  stompClient.connect(
    headers,
    (frame) => {
      stompClient.subscribe("/topic/chat_msg", (msg) => {
        // 订阅服务端提供的某个topic
        console.log(msg.body); // msg.body存放的是服务端发送给我们的信息
      });
    },
    (err) => {
      // 连接发生错误时的处理函数
      console.log(err);
    }
  );
}
// 断开连接
function disconnect() {
  if (stompClient != null) {
    stompClient.disconnect();
    console.log("Disconnected");
  }
}
```

# sockjs-client(Uncaught ReferenceError: global is not defined at 1235 (browser-crypto.js:3:1)

```js
import * as SockJS from "sockjs-client";

export function socketProvider() {
  return new SockJS("http://localhost:8080/stomp");
}
```

![sockjs-client](/images/plugins/sockjs1.png)

```js
Uncaught ReferenceError: global is not defined
    at node_modules/sockjs-client/lib/utils/browser-crypto.js (browser-crypto.js:3:1)
    at __require2 (chunk-OZI5HTJH.js?v=99c693f2:15:50)
    at node_modules/sockjs-client/lib/utils/random.js (random.js:3:14)
    at __require2 (chunk-OZI5HTJH.js?v=99c693f2:15:50)
    at node_modules/sockjs-client/lib/utils/event.js (event.js:3:14)
    at __require2 (chunk-OZI5HTJH.js?v=99c693f2:15:50)
    at node_modules/sockjs-client/lib/transport/websocket.js (websocket.js:3:13)
    at __require2 (chunk-OZI5HTJH.js?v=99c693f2:15:50)
    at node_modules/sockjs-client/lib/transport-list.js (transport-list.js:5:3)
    at __require2 (chunk-OZI5HTJH.js?v=99c693f2:15:50)
    at node_modules/sockjs-client/lib/entry.js (entry.js:3:21)
    at __require2 (chunk-OZI5HTJH.js?v=99c693f2:15:50)
    at entry.js:10:1
```

#### 这个 global 是 sockjs-client 需要使用的，对于 sockjs-client 来说 global 就是 window。

我们在 index.html 定义 global

- 解决方法 1:

```js
// 在 index.html 中，添加
<script>global = globalThis</script>
// 或
<script>
let global = window; // fix global is undefined in socketjs-client
</script>
```

- 解决方法 2
  改变引入方式，将 import SockJS from ‘sockjs-client’; 改为 import SockJS from ‘sockjs-client/dist/sockjs.min.js’;

```js
//import SockJS from  'sockjs-client';
import SockJS from "sockjs-client/dist/sockjs.min.js";
import Stomp from "stompjs";
```
