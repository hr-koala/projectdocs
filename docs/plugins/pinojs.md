## 掌握日志记录：深入了解 Pino

https://blog.csdn.net/qq_42880714/article/details/134452707

掌握日志记录：深入了解 Pino
日志用于查找系统漏洞、执行测试、跟踪和分析应用程序。除了这些优点之外，它们的成本也可能很高，并且会减慢我们的应用程序的速度。因此，我们应该选择一个合适的日志包并明智地使用它。

在选择日志包时，我们必须注意以下功能：

必须支持日志级别。
必须能够格式化数据。
必须支持写入多个目的地。
必须能够编辑数据
必须快速完成所有这些工作，以避免增加应用程序的成本

因此，pino 将是最好的选择。让我们深入研究一下 pino。

Pino 安装

```js
npm i pino pino-pretty
```

让我们创建一个名为 logger.js 的文件

```js
const pino = require("pino");

class Pino {
  static instance;
  constructor() {
    if (!Pino.instance) {
      Pino.instance = new pino();
    }
    return Pino.instance;
  }
}
const logger = new Pino();
logger.info("first log attempt");
```

在此代码中，我们使用单例模式创建了一个名为 Pino 的类，并进行了第一个日志操作。使用 node logger.js 命令运行此文件后，我们将看到此结果：

```js
{ "level" : 30 , "time" : 1699623758139 , "pid" : 162629 , "hostname" : "shipentegra-ThinkBook-15-G3-ACL" , "msg" : "first log attempt" }
```

pino 使用我们的消息和一些元数据创建了一个 JSON。

logger[logLevel]([mergingObject],[message])

日志级别
日志级别用于标识重要性级别和分组操作。Pino 有 6 个日志级别，如下所述，默认日志级别是 info。Pino 打印日志值高于当前日志级别的日志。因此，Pino 不会打印 trace 和 debug 级别

| Level | Value |
| ----- | ----- |
| fatal | 60    |
| error | 50    |
| warn  | 40    |
| info  | 30    |
| debug | 20    |
| trace | 10    |

运行代码：

```js
logger.fatal('fatal log')
logger.error('error log')
logger.warn('warn log')
logger.info('info log')
logger.debug('debug log')
logger.trace('trace log')
// 结果：
{"level":60,"time":1699728817433,"pid":44107,"hostname":"shipentegra-ThinkBook-15-G3-ACL","msg":"fatal log"}
{"level":50,"time":1699728817436,"pid":44107,"hostname":"shipentegra-ThinkBook-15-G3-ACL","msg":"error log"}
{"level":40,"time":1699728817436,"pid":44107,"hostname":"shipentegra-ThinkBook-15-G3-ACL","msg":"warn log"}
{"level":30,"time":1699728817436,"pid":44107,"hostname":"shipentegra-ThinkBook-15-G3-ACL","msg":"info log"}
```

trace 和 debug 日志没有被打印。level 选项用于决定日志级别。

我们还可以使用 customLevels 选项添加自定义级别，并使用 useOnlyCustomLevels 选项禁用所有默认级别。

```js
const pino = require("pino");
class Pino {
  static instance;
  constructor() {
    if (!Pino.instance) {
      Pino.instance = new pino({
        transport: {
          target: "pino-pretty",
        },
        customLevels: {
          urgent: 100,
        },
      });
    }
    return Pino.instance;
  }
}
const logger = new Pino();
logger.urgent("urgent log");
```

Pino-Pretty
在开发过程中，我们可以使用 pino-pretty 来美化我们的日志。

```js
Pino.instance = new pino({
  transport: {
    target: "pino-pretty",
  },
});
```

当文件运行时，结果将是：

20:42:37.180] INFO (32813): example of pino-pretty

格式化元数据
默认情况下，hostname 和 pid 将添加到所有日志中。要修改这些键或添加新键，可以使用 bindings 字段。此外，可以使用 level 选项修改 level 值。此外，使用 timestamp 选项，我们可以删除 time 或修改时间格式：

```js
{
  "level": 30,
  "time": 1699811309472,
  "pid": 36483,
  "hostname": "shipentegra-ThinkBook-15-G3-ACL",
  "msg": "example of pino-pretty"
}
```

我们删除了 hostname 键并修改了级别和时间键，所以结果将是：

{ "level" : "info(30)" , "time" : "2023-11-12T18:02:57.315Z" , "pid" : 44768 , "msg" : "hi world" }

子日志
它用于将公共数据传输到它自己创建的所有日志中。

让我们创建一个名为 getUser 的函数，该函数将获取一个 id 值并控制用户。我们可以使用 child 方法来传递公共数据，而不是向每个日志操作添加角色和 id。

```js
const getUser = (id) => {
    const child = logger.child({ id,role:"admin" });

    if (id > 10) {
        child.info('user found')
    } else {
        child.info('user not found')
    }
}

getUser(1)
// 结果将是：
{"level":30,"time":1699812520213,"pid":48074,"hostname":"shipentegra-ThinkBook-15-G3-ACL","id":1,"role":"admin","msg":"user not found"}
```

错误信息
当错误传递给 Pino 时，它会准确地序列化错误并将数据放入“err”键中。

```js
logger.error(new Error('Something went wrong'))
// 结果将是：

{
  "level": 50,
  "time": 1699699745847,
  "pid": 32206,
  "hostname": "shipentegra-ThinkBook-15-G3-ACL",
  "err": {
    "type": "Error",
    "message": "Something went wrong",
    "stack": "Error: Something went wrong\n    at Object.<anonymous> (/home/shipentegra/works/pod-worker/logger.js:22:14)\n    at Module._compile (node:internal/modules/cjs/loader:1103:14)\n    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1155:10)\n    at Module.load (node:internal/modules/cjs/loader:981:32)\n    at Function.Module._load (node:internal/modules/cjs/loader:822:12)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:77:12)\n    at node:internal/main/run_main_module:17:47"
  },
  "msg": "Something went wrong"
}
```

传输
传输功能用于将日志写入文件或将其传输到 Redis 或 MySQL 中。Pino 有两种不同的传输方式：

pino.transport：这是默认的传输选项。它利用工作线程来避免阻塞主线程，从而使用此选项可以更快地执行代码。然而，这会给服务器带来额外的成本，因为日志数据必须从主线程传输到工作线程
pino.destionation：是在主线程中进行日志操作的遗留解决方案。除了复杂的日志操作之外，建议使用它。

```js
   Pino.instance = new  pino (pino.transport ( {
        target : 'pino/file' ,
        options : {
            destination : join (__dirname, 'logs/dev.log' ),
        },
    })
```

在上面的代码中，我们使用 pino.transport 方法将日志写入 logs/dev.log 文件。然而，当我们运行代码时，出现了错误，因为默认情况下，Pino 假定日志目录存在。为了避免此错误，我们可以手动创建目录或使用 mkdir 允许 Pino 创建目录的选项。

完成之后我们就可以看到日志顺利写入到 dev.log 文件中。

每次运行代码时，我们都会看到日志被添加到日志文件的末尾。要在启动项目时删除旧日志并从头开始写入日志，我们可以使用 append:false 选项。

我们可以创建两个不同的文件，分别称为“所有日志”和“错误日志”，将所有日志添加到“所有日志”文件中：

```js
Pino.instance = new pino(
  pino.transport({
    targets: [
      {
        target: "pino/file",
        options: {
          mkdir: true,
          destination: join(__dirname, "logs/allLogs"),
        },
      },
      {
        target: "pino/file",
        level: "error",
        options: {
          mkdir: true,
          destination: join(__dirname, "logs/errorLogs"),
        },
      },
    ],
  })
);
```

使用此代码，所有日志将写入所有日志文件，而致命和错误日志将写入错误日志文件。

日志编辑
Pino 使用 fast-redact 包标记敏感数据，以提供安全性。

```js
Pino.instance = new pino({
    redact: ['access_token', 'secret_token', 'password','stores[*].access_token']
})

logger.info({
    password:"cibilex",
    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ",
    user: {
        password:"cibilex"
    },
    stores:[
        {
            access_token:"storeAccessToken"
        }
    ]
})

// 运行上述代码采样时，结果将是：

{ “级别” ：30 ，“时间” ：1699705824035 ，“pid” ：31614 ，“主机名” ：“shipentegra-ThinkBook-15-G3-ACL” ，“密码” ：“[已编辑]” ，“access_token” ：“ [已编辑]" , "stores" : [ { "access_token" : "[已编辑]" } ] }
```

就这样，我们了解了 Pino 的大部分功能。
