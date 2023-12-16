## D3.js

`D3` 近年来一直是 JavaScript 最重要的数据可视化库之一，在创建者 Mike Bostock 的维护下，前景依然无量，至少现在没有能打的:

- D3 与众多其他库的区别在于无限定制的能力（直接操作 SVG）。
- 它的底层 `API` 提供对原生 `SVG` 元素的直接控制，但它也带来了高学习曲线的成本。
- 我们将把 D3 和 Vue 结合在一起 - 使用 Vue 的动态数据绑定，清晰的语法和模块化结构，可以充分发挥 D3 的最佳性能。

如何使用 D3.js 选择和操作 DOM 元素。该库在操作 DOM 方面实际上非常强大

```js
// index.js
d3.select();
d3.selectAll();

d3.select("h1")
  .style("color", "red")
  .attr("class", "heading")
  .text("Updated h1 tag");

d3.select("body").append("p").text("First Paragraph");
d3.select("body").append("p").text("Second Paragraph");
d3.select("body").append("p").text("Third Paragraph");

d3.selectAll("p").style("");
```

#### 创建一个简单的柱状图

```js
// 数据集
let dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
// 定义svg图形宽高，以及柱状图间距
let svgWidth = 500,
  svgHeight = 300,
  barPadding = 5;
// 通过图形计算每个柱状宽度
let barWidth = svgWidth / dataset.length;

// 绘制图形
let svg = d3.select("svg").attr("width", svgWidth).attr("height", svgHeight);

// rect，长方形
// 文档：http://www.w3school.com.cn/svg/svg_rect.asp

let barChart = svg
  .selectAll("rect")
  .data(dataset) //绑定数组
  .enter() // 指定选择集的enter部分
  .append("rect") // 添加足够数量的矩形
  .attr("y", (d) => svgHeight - d) // d为数据集每一项的值, 取y坐标
  .attr("height", (d) => d) // 设定高度
  .attr("width", barWidth - barPadding) // 设定宽度
  .attr("transform", (d, i) => {
    let translate = [barWidth * i, 0];
    return "translate(" + translate + ")";
  }); // 实际是计算每一项值的x坐标
```

#### 在图形上方显示数值

这时就需要在上述代码中创建 svg 的 text 文本

```js
let text = svg
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text((d) => d)
  .attr("y", (d, i) => svgHeight - d - 2)
  .attr("x", (d, i) => barWidth * i)
  .attr("fill", "#A64C38");
```

#### scales: 比例尺函数

##### d3.scaleLinear()，线性比例尺

使用 d3.scaleLinear()创造一个线性比例尺，其中：

- domain()是输入域
- range()是输出域
- 相当于将 domain 中的数据集映射到 range 的数据集中。

```js
let scale = d3.scaleLinear().domain([1, 5]).range([0, 100]);
```

```js
let dataset = [1, 2, 3, 4, 5];

let svgWidth = 500,
  svgHeight = 300,
  barPadding = 5;
let barWidth = svgWidth / dataset.length;

let svg = d3.select("svg").attr("width", svgWidth).attr("height", svgHeight);

let yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([0, svgHeight]);

let barChart = svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("y", (d) => svgHeight - yScale(d))
  .attr("height", (d) => yScale(d))
  .attr("width", barWidth - barPadding)
  .attr("transform", (d, i) => {
    let translate = [barWidth * i, 0];
    return "translate(" + translate + ")";
  });
```

#### Axes：轴

轴是任何图表的组成部分，本例子中将会用到上面讲到的比例尺函数。

```js
let data = [80, 100, 56, 120, 180, 30, 40, 120, 160];

let svgWidth = 500,
  svgHeight = 300;

let svg = d3.select("svg").attr("width", svgWidth).attr("height", svgHeight);

// 首先是拿最大值构建x轴坐标
let xScale = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, svgWidth]);

// 接下来是反转值，用作y轴坐标。
let yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([svgHeight, 0]);

// 横轴的API使用
let x_axis = d3.axisBottom().scale(xScale);

// 纵轴的API使用
let y_axis = d3.axisLeft().scale(yScale);

// 在svg中提供了如g元素这样的将多个元素组织在一起的元素。
// 由g元素编组在一起的可以设置相同的颜色，可以进行坐标变换等，类似于Vue中的 <template>

svg.append("g").attr("transform", "translate(50, 10)").call(y_axis);

let xAxisTranslate = svgHeight - 20;

svg
  .append("g")
  .attr("transform", "translate(50, " + xAxisTranslate + ")")
  .call(x_axis);
```

### 创建简易的 SVG 元素

在这里面，你会创建< rect>，< circle>和< line>元素

```js
let svgWidth = 600,
  svgHeight = 500;
let svg = d3
  .select("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("class", "svg-container");

let line = svg
  .append("line")
  .attr("x1", 100)
  .attr("x2", 500)
  .attr("y1", 50)
  .attr("y2", 50)
  .attr("stroke", "red");

let rect = svg
  .append("rect")
  .attr("x", 100)
  .attr("y", 100)
  .attr("width", 200)
  .attr("height", 100)
  .attr("fill", "#9B95FF");

let circle = svg
  .append("circle")
  .attr("cx", 200)
  .attr("cy", 300)
  .attr("r", 80)
  .attr("fill", "#7CE8D5");
```

#### 创建饼图

```js
let data = [
  { platform: "Android", percentage: 40.11 },
  { platform: "Windows", percentage: 36.69 },
  { platform: "iOS", percentage: 13.06 },
];

let svgWidth = 500,
  svgHeight = 300,
  radius = Math.min(svgWidth, svgHeight) / 2;
let svg = d3.select("svg").attr("width", svgWidth).attr("height", svgHeight);

//Create group element to hold pie chart
let g = svg
  .append("g")
  .attr("transform", "translate(" + radius + "," + radius + ")");

// d3.scaleOrdinal() 序数比例尺
// schemeCategory10, 颜色比例尺
// D3提供了一些颜色比例尺，10就是10种颜色，20就是20种：
let color = d3.scaleOrdinal(d3.schemeCategory10);

let pie = d3.pie().value((d) => d.percentage);

let path = d3.arc().outerRadius(radius).innerRadius(0);

let arc = g.selectAll("arc").data(pie(data)).enter().append("g");

arc
  .append("path")
  .attr("d", path)
  .attr("fill", (d) => color(d.data.percentage));

let label = d3.arc().outerRadius(radius).innerRadius(0);

arc
  .append("text")
  .attr("transform", (d) => `translate(${label.centroid(d)})`)
  .attr("text-anchor", "middle")
  .text((d) => `${d.data.platform}:${d.data.percentage}%`);
```

### 创建折线图

```js
// 外部API,注意日期记得补零
const api =
  "https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-03-31&end=2019-07-01";

/**
 * dom内容加载完毕时，从API中加载数据
 */
document.addEventListener("DOMContentLoaded", function (event) {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      let parsedData = parseData(data);
      drawChart(parsedData);
    })
    .catch((err) => console.log(err));
});

/**
 * 将数据解析为键值对
 */
parseData = (data) => {
  let arr = [];
  for (let i in data.bpi) {
    arr.push({
      date: new Date(i), //date
      value: +data.bpi[i], //convert string to number
    });
  }
  return arr;
};

/**
 * 创建图表
 */
drawChart = (data) => {
  let svgWidth = 600,
    svgHeight = 400;
  let margin = { top: 20, right: 20, bottom: 30, left: 50 };
  let width = svgWidth - margin.left - margin.right;
  let height = svgHeight - margin.top - margin.bottom;

  let svg = d3.select("svg").attr("width", svgWidth).attr("height", svgHeight);

  let g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let x = d3.scaleTime().rangeRound([0, width]);

  let y = d3.scaleLinear().rangeRound([height, 0]);

  let line = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.value));
  x.domain(
    d3.extent(data, function (d) {
      return d.date;
    })
  );
  y.domain(
    d3.extent(data, function (d) {
      return d.value;
    })
  );

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

  g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price ($)");

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
};
```

### Vue 中使用 D3.js 的正确姿势

安装依赖
首先，我们需要为项目安装依赖项。我们可以简单地安装和使用 D3 整库:
`npm i d3`
但在前面讲到，实际上 D3 是几个分库的集合，考虑到项目的优化，我们只安装所需的模块。
`BarChart.vue`:

```vue
<template>
  <div id="container" class="svg-container" align="center">
    <h1>{{ title }}</h1>
    <svg v-if="redrawToggle === true" :width="svgWidth" :height="svgHeight">
      <g>
        <rect
          v-for="item in data"
          class="bar-positive"
          :key="item[xKey]"
          :x="xScale(item[xKey])"
          :y="yScale(0)"
          :width="xScale.bandwidth()"
          :height="0"
        ></rect>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { scaleLinear, scaleBand } from "d3-scale";
import { max, min } from "d3-array";
import { selectAll } from "d3-selection";
import { transition } from "d3-transition";

export default {
  name: "BarChart",
  props: {
    title: String,
    xKey: String,
    yKey: String,
    data: Array,
  },
  mounted() {
    this.svgWidth = document.getElementById("container").offsetWidth * 0.75;
    this.AddResizeListener();
    this.AnimateLoad();
  },
  data: () => ({
    svgWidth: 0,
    redrawToggle: true,
  }),
  methods: {
    // 绘制柱形
    AnimateLoad() {
      selectAll("rect")
        .data(this.data)
        .transition()
        .delay((d, i) => {
          return i * 150;
        })
        .duration(1000)
        .attr("y", (d) => {
          return this.yScale(d[this.yKey]);
        })
        .attr("height", (d) => {
          return this.svgHeight - this.yScale(d[this.yKey]);
        });
    },
    // 调整窗口大小后300毫秒重新绘制图表
    // 即响应式绘制
    AddResizeListener() {
      window.addEventListener("resize", () => {
        this.$data.redrawToggle = false;
        setTimeout(() => {
          this.$data.redrawToggle = true;
          this.$data.svgWidth =
            document.getElementById("container").offsetWidth * 0.75;
          this.AnimateLoad();
        }, 300);
      });
    },
  },
  computed: {
    dataMax() {
      return max(this.data, (d) => {
        return d[this.yKey];
      });
    },
    dataMin() {
      return min(this.data, (d) => {
        return d[this.yKey];
      });
    },
    xScale() {
      return scaleBand()
        .rangeRound([0, this.svgWidth])
        .padding(0.1)
        .domain(
          this.data.map((d) => {
            return d[this.xKey];
          })
        );
    },
    // 通过线性比例尺自动生成
    yScale() {
      return scaleLinear()
        .rangeRound([this.svgHeight, 0])
        .domain([this.dataMin > 0 ? 0 : this.dataMin, this.dataMax]);
    },
    svgHeight() {
      return this.svgWidth / 1.61803398875; // 黄金比例
    },
  },
};
</script>

<style scoped>
.bar-positive {
  fill: steelblue;
  transition: r 0.2s ease-in-out;
}

.bar-positive:hover {
  fill: brown;
}

.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 1%;
  vertical-align: top;
  overflow: hidden;
}
</style>
```

```vue
// 父组件App.vue获取数据：
<template>
  <div id="app">
    <BarChart
      title="Bar Chart"
      xKey="name"
      yKey="amount"
      :data="barChartData"
    />
  </div>
</template>

<script>
import BarChart from "./components/BarChart.vue";

export default {
  name: "App",
  components: {
    BarChart,
  },
  data: () => ({
    barChartData: [
      { name: "张三", amount: 25 },
      { name: "李四", amount: 40 },
      { name: "老王", amount: 15 },
      { name: "老赖", amount: 9 },
    ],
  }),
};
</script>

<style>
#app {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #282f36;
  margin-top: 30px;
}
</style>
```

yarn run serve 后将会看到：

好像还缺点显示数值，考虑到该图高度是根据比例尺生成，我们调整下 y 坐标：

```js
yScale() {
  return scaleLinear()
    .rangeRound([this.svgHeight, 0])
    .domain([this.dataMin > 0 ? 0 : this.dataMin + 2, this.dataMax + 2]);
},
```

在 AnimateLoad()末尾添加：

```js
selectAll("text").data(this.data).enter();
```

最后在< g>元素中添加：

```js
<text
  v-for="item in data"
  :key="item[xKey].amount"
  :x="xScale(item[xKey]) + 30"
  :y="yScale(item[yKey]) - 2"
  fill="red"
>{{ item[xKey]}} {{ item[yKey]}}
</text>
```
