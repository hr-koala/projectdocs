# TypeORM 框架

1. 安装 TypeORM:
   npm install typeorm --save

2. 需要安装依赖模块 reflect-metadata :
   npm install reflect-metadata --save
3. 在应用里全局引用一下:
   比如在 app.ts 的入口处 require("reflect-metadata")

4. 你可能需要安装 node 类型：
   npm install @types/node --save

5. 安装数据库驱动:

- MySQL 或 MariaDB
  npm install mysql --save

- PostgreSQL
  npm install pg --save

- SQLite
  npm install sqlite3 --save

- Microsoft SQL Server
  npm install mssql --save

- sql.js
  npm install sql.js --save

- Oracle (experimental)
  npm install oracledb --save
  可以根据你的数据库选择安装上面的任意一个.

```js
// https://juejin.cn/post/6844903920578330631
// 全局安装TypeORM：
npm install typeorm -g
// 到新项目的目录并运行该命令：
typeorm init --name MyProject --database mysql
```

## TypeORM 框架中的 Find 查询中的基础选项和进阶选项

- select - 指定要查询的实体对象的属性

如果省略 select 属性，则默认查询所有实体对象的所有属性

```js
import { createConnection } from "typeorm"
import { User } from "./entity/User"

// 创建数据库
createConnection().then(async (connection) => {
  // 获取数据库中的数据
  const userRepository = connection.Repository(User)
  // 查询User表中名为 firstName 和 lastName 列的数据，并返回
  userRepository.find({ select: ["firstName", "lastName"] })
})
```

- relations - 查询结果中包含的关联实体对象

在返回的结果中，包含关联的实体对象（返回的是整个实体对象）

```js
import { createConnection } from "typeorm"
import { User } from "./entity/User"

// 创建数据库
createConnection().then(async (connection) => {
  // 获取数据库中的数据
  const userRepository = connection.Repository(User)
  // 查询与主实体对象（User）关联的`profile`、`photos`和`videos`实体对象
  userRepository.find({ relations: ["profile", "photos", "videos"] })
})
```

如果需要在查询时，同时想加载关联的实体对象和它们的属性，用外连接 leftJoinAndSelect()方法或内连接 innerJoinAndSelect()方法，就会在结果中得到关联表对象的值。

- join - 指定关联实体对象的查询方式

alias 属性指定主实体对象的别名 <br/>
leftJoinAndSelect 属性是一个对象，用于指定要查询的关联实体对象及其属性 <br/>

```js
import { createConnection } from "typeorm"
import { User } from "./entity/User"

// 创建数据库
createConnection().then(async (connection) => {
  // 获取数据库中的数据
  const userRepository = connection.Repository(User)

  userRepository.find({
    join: {
      alias: "user",
      leftJoinAndSelect: {
        profile: "user.profile",
        photo: "user.photos",
        video: "user.videos",
      },
    },
  })
})
```

alias 属性的值为 user，表示查询的是 userRepository 所管理的实体对象。leftJoinAndSelect 属性是一个包含 profile、photo 和 video 属性的对象，每个属性都表示要查询的关联实体对象及其在查询结果中的别名。例如，"user.profile"表示查询与 user 实体对象关联的 profile 实体对象，并将其在查询结果中的别名设置为 profile。

- where -查询实体的简单条件

where 的值是一个包含一个或多个查询条件的数组，每个条件可以是一个简单的对象，也可以是一个包含运算符的对象，还可以使用逻辑运算符和括号来组合多个条件。

```js
// 查询 firstName 为 Timber 同时 lastName 为 Saw 的数据
userRepository.find({ where: { firstName: "Timber", lastName: "Saw" } })
```

查询嵌入实体列应该根据定义它的层次结构来完成

```js
// 查询属性中的属性值，符合条件的数据
userRepository.find({ where: { name: { first: "Timber", last: "Saw" } } })
```

使用 OR 运算符查询

```js
userRepository.find({
    // 表示查询结果为，满足两个对象条件的其中一个即可
    where: [{ firstName: "Timber", lastName: "Saw" }, { firstName: "Stan", lastName: "Lee" }]
    // 表示要查询`age`大于18的实体对象
    where: { age: MoreThan(18) }
});
```

- order - 选择排序

排序方式有两种：升序（ASC）和降序（DESC） <br/>
order 方法接受一个字符串、对象或数组参数，用于指定排序方式

```js
// 按照`firstName`属性的升序排列查询结果
userRepository.find({ order: "firstName" })

// 按照`firstName`属性的升序和`lastName`属性的降序排列查询结果
userRepository.find({ order: { firstName: "ASC", lastName: "DESC" } })

// 按照`firstName`属性的升序和`lastName`属性的升序排列查询结果
userRepository.find({ order: ["firstName", "lastName"] })
```

- skip - 指定查询结果的起始位置

它的值为一个数字，表示要跳过的记录数，设置为 0 表示从查询结果的第一条记录开始返回结果。

- take - 指定查询结果的数量（分页，设置每一页返回多少）

它的值为一个数字，表示要返回的记录数。设置为 10 表示返回最多 10 条记录。 <br/>
需要注意的是，分页查询时应根据实际情况设置 skip 和 take 属性的值。如果不设置 take 属性，则将返回所有满足条件的记录。如果设置 skip 属性的值大于查询结果的总记录数，则将返回一个空数组。

```js
userRepository.find({
  order: {
    columnName: "ASC",
  },
  skip: 0,
  take: 10,
})
```

- cache -启用或禁用查询结果缓存

```js
userRepository.find({
  // true查询结果缓存，false不缓存
  cache: true,
})
```

TypeORM 提供了许多内置运算符，可用于创建更复杂的查询

- Not - 表示不等于指定值

```js
import { Not } from "typeorm"

// 查询 `Post` 实体对象中 `title` 不等于 `"About"` 的所有记录
const loadedPosts = await connection.getRepository(Post).find({
  title: Not("About"),
})
```

- LessThan - 小于指定值

```js
import { LessThan } from "typeorm"

const loadedPosts = await connection.getRepository(Post).find({
  // 查询 `Post` 实体对象中 `likes` 小于 `10` 的所有记录
  likes: LessThan(10),
})
```

- LessThanOrEqual - 小于等于指定值

```js
import { LessThanOrEqual } from "typeorm"

const loadedPosts = await connection.getRepository(Post).find({
  // 查询 `Post` 实体对象中 `LessThanOrEqual` 小于等于 `10` 的所有记录
  likes: LessThanOrEqual(10),
})
```

- MoreThan - 大于指定值

```js
import { MoreThan } from "typeorm"

const loadedPosts = await connection.getRepository(Post).find({
  // 查询 `Post` 实体对象中 `likes` 大于 `5` 的所有记录
  likes: MoreThan(5),
})
```

- MoreThanOrEqual - 大于等于指定值

```js
import { MoreThanOrEqual } from "typeorm"

const loadedPosts = await connection.getRepository(Post).find({
  // 查询 `Post` 实体对象中 `likes` 大于等于 `5` 的所有记录
  likes: MoreThanOrEqual(5),
})
```

- Equal - 等于指定值

```js
import { Equal } from "typeorm"

const loadedPosts = await connection.getRepository(Post).find({
  // 查询 `Post` 实体对象中 `likes` 等于 `8` 的所有记录
  likes: Equal(8),
})
```

- Like - 指定字符串模式匹配

```js
import { Like } from "typeorm"

const loadedPosts = await connection.getRepository(Post).find({
  // 查询 `Post` 实体对象中 `title` 字符串中包含 `abc` 的所有记录
  title: Like("% abc %"),
})
```

- ILike - 表示指定（忽略字符串的大小写）模式匹配

```js
import { ILike } from "typeorm"

const loadedPosts = await connection.getRepository(Post).find({
  // 查询 `Post` 实体对象中 `title` 字符串中 忽略大小写后 包含 `abc` 的所有记录
  title: ILike("% abc %"),
})
```

- Between - 表示在指定范围内

```js
import { Between } from "typeorm"

const loadedPosts = await connection.getRepository(Post).find({
  // 查询 `Post` 实体对象中 `math`数值在 1到10 之间的所有记录
  math: Between(1, 10),
})
```

- In - 表示查询属性值，是 In 数组中选项的记录

```js
import { In } from "typeorm"

const loadedPosts = await connection.getRepository(Post).find({
  // 查询 `Post` 实体对象中 `title`属性值为 "About2"和"About3" 的所有记录
  title: In(["About2", "About3"]),
})
```

- Any - 表示查询属性值等于指定数组中任意一个元素的记录

```js
import { Any } from "typeorm"

const loadedPosts = await connection.getRepository(Post).find({
  // 查询 `Post` 实体对象中 `title`属性值为 "About2"或"About3" 的所有记录
  title: Any(["About2", "About3"]),
})
```

- IsNull 表示为空
- NotNull 表示不为空
- Raw 内置运算符可以直接接受 SQL 字符串作为查询条件，可以实现更复杂的查询条件

```js
import { Raw } from "typeorm"

const loadedPosts = await connection.getRepository(Post).find({
  // 查询 `likes` 属性值加 1 等于 4 的所有记录
  likes: Raw("1 + likes = 4"),
})
```

总结性案例：

```js
const queryBuild = db.manager
  .getRepository(user)
  .createQueryBuilder("f")
  // 连接faqAnswers表，别名为 a,将user的tenantIds属性值，传入faqAnswers表
  .leftJoinAndSelect("f.faqAnswers", "a", "a.tenantId in (:...tenantIds)", {
    tenantIds,
  })
  // 连接faqRelations表，取别名为 r
  .leftJoin("f.faqRelations", "r")
  .leftJoin("a.faqLabels", "al")
  // 查询`user`实体类的`id`属性等于`id`
  .where("f.id = :id", { id })
  // 指定查询返回的结果，就是几天表中的 下面的属性
  .select([
    "f.id",
    "f.question",
    "f.validBeginTime",
    "f.validEndTime",
    "f.link",
    "f.status",
    "f.CategoryId",
    "f.tenantId",
    "a.id",
    "a.answer",
    "a.link",
    "a.status",
    "a.FaqId",
    "a.tenantId",
    "al.LabelId",
  ])
const faq: any & Faq = await queryBuild.getOne()
```

1. .getRepository(user) 使用 user 实体类的仓库对象作为查询的起点，返回一个 QueryBuilder 对象。

2. .createQueryBuilder("f") 在 user 实体类的仓库对象上创建一个查询构建器对象，并指定别名为 f。

3. .leftJoinAndSelect("f.faqAnswers", "a", "a.tenantId in (:...tenantIds)", {tenantIds}) 执行一个左连接，连接 user 实体类的 faqAnswers 属性，使用别名 a 表示连接后的结果，"a.tenantId in (:...tenantIds)"表示连接条件，将 tenantIds 中的值作为连接条件的参数传入。

4. .leftJoin("f.faqRelations", "r") 执行一个左连接，连接 user 实体类的 faqRelations 属性，使用别名 r 表示连接后的结果。

5. leftJoin("a.faqLabels", "al") 执行一个左连接，连接 faqAnswers 实体类的 faqLabels 属性，使用别名 al 表示连接后的结果。

6. .where("f.id = :id", { id }) 添加查询条件，查询 user 实体类的 id 属性等于 id。

7. .select([...]) 指定查询的结果集，包含了 Faq 实体类和 faqAnswers 实体类的所有属性，以及 faqLabels 实体类的 LabelId 属性。

8. const fff: any & user = await queryBuild.getOne(); 执行查询并获取查询结果，将查询结果赋值给 fff 变量。getOne()方法表示只获取一条满足查询条件的数据，返回一个 Promise 对象，查询结果的类型为 any & user，即 user 实体类的所有属性加上 any 类型。
