# TypeORM 框架中的 Connection 数据库连接池

## 什么是 Connection

调用 Connection 的 connect 方法，就建立连接池设置，使用 createConnection 函数设置连接，调用 close 时会断开连接（关闭池中的所有连接）

## 创建连接数据库

最简单和最常用的方法是使用 createConnection 和 createConnections 函数

## createConnection 函数创建并连接数据库

```js
// 引入typeORM框架提供的方法
import { createConnection, Connection } from "typeorm";
// 建立连接数据库
const connection = await createConnection({
  // 数据库类型，比如mysql、postgres等
  type: "mysql",
  // 数据库的主机名或IP地址
  host: "localhost",
  // 数据库的端口号，默认为3306
  port: 3306,
  // 数据库的用户名
  username: "root",
  // 数据库的密码
  password: "123456",
  // 数据库的数据库名
  database: "user",
  // 数据库的实体类(告诉创建的连接，有哪些实体)
  entities：[__dirname + '/entity/*.ts'],
  // 是否自动创建数据库的表和列
  synchronize: false,
  // 数据库迁移是否已经执行
  migrationsRun: false,
  // 数据库的迁移
  migrations: [__dirname + '/entity/*.ts']
  // 是否打印日志
  logging："表达式为true打印，反之不打印"，
  // 还可以进行日志打印选项
  logging：["query", "error"]，
});
```

注意：synchronize 在开发使用时可以为 true,但是上线后必须为 false，因为会覆盖表的数据

#### logging 的配置选项：

- query - 记录所有查询。
- error - 记录所有失败的查询和错误。
- schema - 记录架构构建过程。
- warn - 记录内部 orm 警告。
- info - 记录内部 orm 信息性消息。
- log - 记录内部 orm 日志消息。

#### 迁移：

一旦上线生产环境，你将需要将模型更改同步到数据库中。 通常在数据库中获取数据后，使用 synchronize：true 进行生产模式同步是不安全的。 因此这时候使用迁移，可以解决此类问题。

迁移用于更新数据库架构并将新更改应用于现有数据库

## createConnections 函数创建并连接数据库

在创建的数组里面，有多个对象，每个对象连接不同的数据库

```js
import { createConnections, Connection } from "typeorm";

const connections = await createConnections([
  {
    name: "default",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
  },
  {
    name: "test2-connection",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test2",
  },
]);
```

## 使用连接数据库

### getConnection（）方法

创建连接后，可以使用 getConnection 方法从应用程序中的任何位置使用它

方法一、

```js
import { getConnection } from "typeorm";

// 可以在调用createConnection后使用并解析
// 不同的连接必须具有不同的名称。默认情况下，如果未指定连接名称，则为 default
const connection = getConnection();

// 如果你有多个连接，则可以按名称获取连接（名称就是name属性值）
const secondConnection = getConnection("test2-connection");
```

方法二、

```js
import { getConnection } from "typeorm";
import { User } from "../entity/User";

// 处理用户相关的请求
export class UserController {
  // 表示该方法用于处理`/users`的GET请求
  @Get("/users")
  // 用于获取所有用户的数据
  getAll() {
    // 这行代码的含义是查询数据库中 User 表中的所有数据
    return getConnection().manager.find(User);
  }
}
```

分析：

调用 typeorm 库中的 getConnection 方法获取数据库连接对象，然后使用 manager 方法创建一个操作数据库的管理器，最后使用 find 方法查询 User 表中的所有数据，并返回查询结果

### getRepository()和 getManager()方法

```js
import { getManager, getRepository } from "typeorm";
import { User } from "../entity/User";

export class UserController {
  @Get("/users")
  getAll() {
    // 查询数据库中 User 表中的所有数据，并返回查询结果
    return getManager().find(User);
  }

  @Get("/users/:id")
  // 用于获取指定 id 的用户数据
  //使用了 @Param 装饰器将路由参数 id 注入到方法中的 userId 参数中
  getAll(@Param("id") userId: number) {
    // 查询数据库中 User 表中指定 （id为1和敏子为张三） 的用户数据，并返回查询结果
    return getRepository(User).findOne({
      userId: 1,
      name: "张三",
    });
  }
}
```

return getManager().find(User); 调用 typeorm 库中的 getManager 方法获取数据库连接对象，然后使用 find 方法查询 User 表中的所有数据，并返回查询结果。

return getRepository(User).findOne(userId); 调用 typeorm 库中的 getRepository 方法获取 User 实体类的仓库对象，然后使用 findOne 方法查询指定（id 为 1 和敏子为张三）的用户数据，并返回查询结果。

### (特殊情况)单个连接中使用多个数据库

使用数据库的目的是，查询表中的数据，数据就是每个表中的实体，在构建实体的时候，就要指定存储在那个数据库中，想看懂是怎么使用多个数据的，就先要知道实体是什么？实体怎么构建的？实体怎么指定存储数据库的？

不想创建多个连接，但是想在一个连接中使用多个数据库，则可以指定使用的每个实体的数据库名称

```js
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ database: "secondDB" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
```

```js
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ database: "thirdDB" })
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
}
```

user 实体将在 secondDB 数据库内创建，Photo 实体则在 thirdDB 数据库内

获取数据库中的数据

```js
const users = await connection
    // 创建一个查询构建器
    .createQueryBuilder()
    // 选择需要查询的列
    .select()
    // 指定查询的表，即 User 表，同时起了一个别名 user
    .from(User, "user")
    // 添加一个查询的表，即 Photo 表，起一个别名 photo
    .addFrom(Photo, "photo")
    // 查询条件,表示需要查询`Photo`表中的`userId`列和`User`表中的`id`列相等的数据
    .where("photo.userId = user.id")
    // 添加查询条件,表示需要查询`Photo`表中的`firstName`列中为 张三 的数据
    .andWhere("photo.firstName = :id"，{ id："张三" })
    // 获取所有符合条件的结果集合，返回一个`Promise`对象
    .getMany(); // userId因其跨数据库请求而不是外键

// 补充： getOne()方法表示只获取一条满足查询条件的数据，返回一个Promise对象
```

#### (特殊情况)单个连接中使用多个模式

schema 用于指定数据库中实体的所属模式（Schema），它是一种将数据库对象划分为多个独立组的方式，这样可以在同一个数据库实例中创建多个独立的组，每个组中的对象相互独立，不会相互干扰。在多租户应用程序中，可以使用模式来实现租户的分离，避免数据冲突

```js
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// 这个实体存储在secondDB数据库中，并且属于名为 public 的模式
@Entity({ database: "secondDB", schema: "public" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
```
