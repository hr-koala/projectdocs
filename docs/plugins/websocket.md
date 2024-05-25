# WebSocket
当一个Web应用程序需要实现实时双向通信时，传统的 HTTP 协议并不是最佳选择，因为HTTP是一个请求/响应协议，它的工作方式是客户端发送一个请求给服务器，服务器然后响应该请求，并发送一个响应给客户端。这种模式通常是单向的，客户端只能发起请求，而服务器只能响应请求。这意味着，客户端无法在不发出新请求的情况下接收来自服务器的新数据。

WebSocket 协议就是为了解决这个问题而产生的，它可以在客户端和服务器之间建立持久的连接，以便实现双向通信。在建立连接之后，客户端和服务器可以随时发送消息，而不需要通过HTTP请求/响应的方式进行通信。此外，WebSocket还支持二进制数据的传输，这使得它更加灵活，可以用于许多不同的应用程序场景。

WebSocket协议的工作方式如下：

1. 客户端向服务器发起一个WebSocket握手请求。这个请求与HTTP请求非常相似，但包含了一些附加的头部信息，以表示这是一个WebSocket请求。
2. 服务器对该请求进行响应，包含一个状态码和一些头部信息。这个响应是HTTP响应，但同样包含了一些附加的头部信息，以表示这是一个WebSocket响应。
3. 客户端和服务器之间的连接现在已经建立，并且可以进行双向通信了。客户端和服务器都可以随时发送消息，这些消息会被封装为WebSocket帧并通过WebSocket连接进行传输。
        
需要注意的是，WebSocket协议与传统的HTTP协议不同，因为它不是基于请求/响应模式的。这意味着，一旦连接建立，客户端和服务器就可以随时发送消息，而不需要等待对方先发出请求。此外，WebSocket协议还支持心跳包机制，可以检测连接是否还处于活动状态。

总之，WebSocket协议提供了一种高效、可靠、灵活的方式来实现Web应用程序之间的实时双向通信。它是一个强大的工具，可以用于许多不同的应用程序场景，包括在线游戏、实时聊天、数据传输和多人协作等等。

前端使用WebSocket通常需要使用浏览器提供的WebSocket API，该API可以通过JavaScript代码与WebSocket服务器建立连接，并在连接建立后进行数据传输。

### 1. 创建WebSocket 实例

```ts
// let ws = new WebSocket(url,[protocol1,protocol2,...]); protocol 指定了可接受的子协议
// websocket 默认使用 ws:// 协议，如果要使用 wss:// 协议，需要使用 https:// 协议
let ws = new WebSocket("ws://localhost:8080/ws");
```
websocket 属性：
::: tip
binaryType: "blob"      //返回websocket连接所传输二进制数据的类型，如果传输的是Blob类型的数据,则为"blob"，如果传输的是Arraybuffer类型的数据，则为"arraybuffer"
bufferedAmount: 0　　　　//为只读属性，用于返回已经被send()方法放入队列中但还没有被发送到网络中的数据的字节数。
extensions: ""
onclose: ƒ ()　　　　　　//连接关闭时触发
onerror: ƒ ()　　　　　　//通信发生错误时触发
onmessage: ƒ (e)　　　   //客户端接收服务端数据时触发,e为接受的数据对象
onopen: ƒ ()　　　　　　 //连接建立时触发
protocol: ""　　　　　　 //用于返回服务器端选中的子协议的名字；这是一个在创建websocket对象时，在参数protocols中指定的字符串。
readyState: 1　　　　　　//返回值为当前websocket的链接状态
url: "ws://1xx.xxx.xxx.xxx:8080/ws"    //返回值为当构造函数创建WebSocket实例对象时URL的绝对路径。
:::

3. websocket属性之readyState

readyState返回当前websocket的链接状态，共有4种。可根据具体项目的需求来利用此状态，写对应的需求。
::: tip
CONNECTING：值为0，表示正在连接。
OPEN：      值为1，表示连接成功，可以通信了。
CLOSING：   值为2，表示连接正在关闭。
CLOSED：    值为3，表示连接已经关闭，或者打开连接失败。
:::

4. websocket的方法

`ws.send()` ：使用连接发送数据，可以发送你想要发送的各种类型数据，如Blob对象、ArrayBuffer 对象、基本或复杂的数据类型等；如：
```ts
ws.send('消息');
//发送对象需要格式转换，接受数据同理
ws.send(JSON.stringify(data));
```
`ws.close()` :关闭连接，用户可以主动调取此方法，来关闭连接。

### 封装websocket
```ts
// socket.js
import Vue from 'vue'
import { Message } from 'element-ui'
let v = new Vue()
v.$message = Message;
let webSocket = null;
let isConnect = false; //连接状态
let globalCallback = function(e){ console.log(e) };//定义外部接收数据的回调函数
let reConnectNum = 0;//重连次数

let websocketUrl =  process.env.VUE_APP_API_WEBSOCKET_URL;

//心跳设置
let heartCheck = {
    heartbeatData:{
        DevID:{
            value:Vue.ls.get('devid')
        },
        DevHeart:{
            value:"1"
        }   
    },//心跳包
    timeout: 60 * 1000, //每段时间发送一次心跳包 这里设置为60s
    heartbeat: null, //延时发送消息对象（启动心跳新建这个对象，收到消息后重置对象）
    start: function () {
        this.heartbeat = setInterval(()=>{
            if (isConnect){
                webSocketSend(this.heartbeatData);
            }else{
                this.clear();
            }
        }, this.timeout);
    },
    reset: function () {
        clearInterval(this.heartbeat);
        this.start();
    },
    clear:function(){
        clearInterval(this.heartbeat);
    }
}

//初始化websocket
function initWebSocket(callback) {
    //此callback为在其他地方调用时定义的接收socket数据的函数
    if(callback){
        if(typeof callback == 'function'){
            globalCallback = callback     
        }else{
            throw new Error("callback is not a function")
        }
    }
    if ("WebSocket" in window) {
        webSocket = new WebSocket(websocketUrl);//创建socket对象
    } else {
        Message({
            message: '该浏览器不支持websocket!',
            type: 'warning'
        });
        return
    }
    //打开
    webSocket.onopen = function() {
        webSocketOpen();
    };
    //收信
    webSocket.onmessage = function(e) {
        webSocketOnMessage(e);
    };
    //关闭
    webSocket.onclose = function(e) {
        webSocketOnClose(e);
    };
    //连接发生错误的回调方法
    webSocket.onerror = function(e) {
        webSocketonError(e);
    };
}
//连接socket建立时触发
function webSocketOpen() {
    console.log("WebSocket连接成功");
    //首次握手
    webSocketSend(heartCheck.heartbeatData);
    isConnect = true;
    heartCheck.start();
    reConnectNum = 0;
}
//客户端接收服务端数据时触发,e为接受的数据对象
function webSocketOnMessage(e) {
    console.log("websocket信息:");
    console.log(e.data)
    const data = JSON.parse(e.data);//根据自己的需要对接收到的数据进行格式化
    globalCallback(data);//将data传给在外定义的接收数据的函数，至关重要。
}
//socket关闭时触发
function webSocketOnClose(e){
    heartCheck.clear();
    isConnect = false; //断开后修改标识
    console.log(e)
    console.log('webSocket已经关闭 (code：' + e.code + ')')
    //被动断开，重新连接
    if(e.code == 1006){
        if(reConnectNum < 3){
            initWebSocket();
            ++reConnectNum;
        }else{
            v.$message({
                message: 'websocket连接不上，请刷新页面或联系开发人员!',
                type: 'warning'
            });
        }
    }
}
//连接发生错误的回调方法
function webSocketonError(e){
    heartCheck.clear();
    isConnect = false; //断开后修改标识
    console.log("WebSocket连接发生错误:");
    console.log(e);
}
//发送数据
function webSocketSend(data) {
    webSocket.send(JSON.stringify(data));//在这里根据自己的需要转换数据格式
}
//在其他需要socket地方主动关闭socket
function closeWebSocket(e) {
    webSocket.close();
    heartCheck.clear();
    isConnect = false;
    reConnectNum = 0;
}
//在其他需要socket地方接受数据
function getSock(callback) {
    globalCallback = callback
}
//在其他需要socket地方调用的函数，用来发送数据及接受数据
function sendSock(agentData) {
    //下面的判断主要是考虑到socket连接可能中断或者其他的因素，可以重新发送此条消息。
    switch (webSocket.readyState) {
        //CONNECTING：值为0，表示正在连接。
        case webSocket.CONNECTING:
            setTimeout(function() {
                sendSock(agentData, callback);
            }, 1000);
        break;
        //OPEN：值为1，表示连接成功，可以通信了。
        case webSocket.OPEN:
            webSocketSend(agentData);
        break;
        //CLOSING：值为2，表示连接正在关闭。
        case webSocket.CLOSING:
            setTimeout(function() {
                sendSock(agentData, callback);
            }, 1000);
        break;
        //CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
        case webSocket.CLOSED:
        // do something
        break;
        default:
        // this never happens
        break;
    }
}
export default {
  initWebSocket,
  closeWebSocket,
  sendSock,
  getSock
};

// 使用此socket.js
// 1、引入
import Vue from 'vue'
import socketApi from "./utils/socket";//找到封装的socket.js文件
Vue.prototype.socketApi = socketApi;//将其挂在原型上，这样 $socketApi就在所有的 Vue 实例中可用了。
// page
<template></template>
<script>
export default {
	mounted(){
	   // 建立socket连接， 并设置socket信息返回接受函数   
	   this.$socketApi.initWebSocket(this.getsocketResult);
	},
	beforeDestroy(){
	   this.$socketApi.closeWebSocket();
	},
	methods:{
	   // socket信息返回接受函数
	   getsocketResult(data) {
	     console.log(data);
	   },
	   //发送socket信息
	   websocketSend(data) {
	     this.$socketApi.sendSock(data);
	   }
	}
}
</script>
<style></style>
```

```ts
  data() {
    return {
          lockReconnect: false,
          ws: null,
    }
 },
methods: {
  join() {
      const Wsurl = `后端WebSocket接口URl`
      this.ws = new WebSocket(Wsurl);
      const self = this;
      this.ws.onopen = function (event) {
        console.log('已经打开连接');
        //心跳检测重置
        self.heartCheckReset()
        self.heartCheckStart()
      };
        this.ws.onmessage = function (event) {
        self.heartCheckReset()
        self.heartCheckStart()
        if (event.data == 'ping' || event.data == '连接成功') return ''
        console.log(event);
        self.getNoticeList()
      };
        this.ws.onclose = function (event) {
        console.log('关闭');
        console.log(event, '关闭');
        self.reconnect()
      };
}，
 //若链接中断30秒后创建新的链接
    reconnect() {
      if (this.lockReconnect) return ''
      this.lockReconnect = true
      setTimeout(() => {
        this.join()
        this.lockReconnect = false
        //若链接中断30秒后创建新的链接
      }, 30000)
    },
    //清空定时器
	heartCheckReset() {
      clearTimeout(this.timeoutObj);
      clearTimeout(this.serverTimeoutObj);
    },
        // 开启定时器
    heartCheckStart() {
      var self = this;
      this.timeoutObj = setTimeout(function () {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        //onmessage拿到返回的心跳就说明连接正常
        self.ws.send("ping");
        self.serverTimeoutObj = setTimeout(function () { //如果超过一定时间还没重置，说明后端主动断开了
          self.ws.close();
        },30000 )
      }, 30000)

    },
}
```