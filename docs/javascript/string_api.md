## javascript 字符串常用 api 使用汇总

- charAt / charCodeAt / fromCharCode
  按照索引获取单个字符

```js
const str = "qwertyuiop";
str.charAt(0); //  获取str字符串的第一个字符,同str[0]
str.charCodeAt(0); // 获取str字符串的第一个字符并转换成Unicode编码
String.fromCharCode(97); // 把Unicode编码97转换成字符串
```

- concat / repeat
  字符串拼接方法

```js
const str = "qwertyuiop";
str.concat("asd"); // 拼接字符串，并返回新的字符串
str.repeat(2); // 返回重复的几次字符串
```

- startsWith、endsWith、includes、indexOf、lastIndexOf
  判断字符串是否包含某字符或字符串

```js
const str = "qwertyuiop";
str.startWith("qwe"); // 判断字符串str开头是否是 qwe   返回 boolean值 true / false
str.startWith("we", 2); // 判断字符串str开头是否是 we,从索引为2的位置算起
str.endsWith("iop"); // 判断字符串str结尾是否是 iop   返回 boolean值 true / false
str.endsWith("io", 9); // 判断字符串str结尾是否是 io, 字符串长度截取到9位
str.includes("ty"); // 判断字符串str中是否有 ty 字符串
str.indexOf("we"); // 获取字符 we 到字符串str的位置第一个索引位置
str.lastIndexOf("we"); // 获取字符 we 到字符串str的位置最后一个索引位置
```

- slice、substr、substring
  字符串切割

```js
const str = "abcdefghijklmnopqrstuvwxyz";
str.slice(1, 5); //  获取字符串str的1-5的字符串  bcde (4)
str.substr(1, 5); //获取从字符串str的1位置开始取5个字符  bcdef (5)
str.substring(1, 5); //获取字符串str的1-5的字符串  bcde (4)

// 看着substring和slice一样的，其实是不一样的，substring第二个参数只能填大于第一个参数和小于字符串长度，小于0则取0，大于总长度则取总长度， 最终会从参数的最小位置到最大位置获取字符串，如果两个参数相等，则返回空字符
str.substring(1, -1); // b
str.substring(2, -1); // ab
str.substring(1, 999); // bcdefghijklmnopqrstuvwxyz

// slice则不会自动调换参数位置，而且如果参数为负数，则会从后面倒数，如果第一个参数的位置大于了第二个参数的位置，则返回空字符串，这里的大于是不管正负最终的结果

str.slice(-3, -1); // xy
str.slice(23, -1); // xy
str.slice(-1, -3); //
```

- trim
  去除字符串两边的空白字符

```js
const str = " abc def g ";
str.trim();
```

- search 按照字符获取索引
- split 把字符串分割为子字符串数组
- big 字体变大
- small 字体缩小
- bold 字体加粗
- italics 斜体
- fixed 固定定位
- strike 加删除线
- fontcolor 字体颜色
- fontsize 字体大小
- sub 下标
- sup 上标
- link 链接
- blink 闪动文本 (不能用于 IE,Chrome,或者 Safari)

```js
const str = "qwertyuiop";
str.search("we"); // 1
str.split("ty"); // ['qwer','uiop']
str.small();
str.bold();
str.italics();
str.fixed();
str.strike();
str.fontcolor("green");
str.fontsize(6);
str.sub();
str.sup();
str.link("http://www.baidu.com");
str.blink();
```

- match() 查找找到一个或多个正则表达式的匹配。
- replace() 在字符串中查找匹配的子串，并替换与正则表达式匹配的子串。
- replaceAll() 在字符串中查找匹配的子串，并替换与正则表达式匹配的所有子串。
- toLowerCase() 把字符串转换为小写。
- toUpperCase() 把字符串转换为大写。

```js
const str = "abcabcd";
str.match(/bc|cd/g);
str.replace("b", "B");
str.replaceAll("b", "B");
str.toLowerCase();
str.toUpperCase();
```
