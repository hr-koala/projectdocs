# flow chart

## 画布 Graph

```tsx
const data = {
  nodes: [
    {
      id: "node1",
      x: 0,
      y: 0,
      width: 100,
      height: 50,
      shape: "rect",
      label: "react", // 使用 rect 渲染
      attrs: {
        body: {
          // body 是选择器名称，选中的是 rect 元素
          stroke: "#8f8f8f",
          strokeWidth: 1,
          fill: "#fff",
          rx: 6,
          ry: 6,
        },
      },
    },
    { id: "node2", x: 200, y: 200, width: 100, height: 50 },
  ],
  edges: [
    {
      shape: "edge",
      source: "node1", // String，必须，起始节点 id
      target: "node2",
      label: "x6",
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
        },
      },
    },
  ],
}
let graph
onMounted(() => {
  graph = new Graph({
    container: document.getElementById("flowChart") as HTMLElement,
    width: 1000,
    heigth: 1000,
    background: { color: "#F2F7FA" },
    grid: { size: 10, visible: true }, // 网格
    panning: { enabled: true }, // 画布平移
  })(graph as Graph).fromJSON(chartData)
})
graph.zoom() // 获取缩放级别
graph.zoom(0.2) // 在原来缩放级别上增加 0.2
graph.zoom(-0.2) // 在原来缩放级别上减少 0.2
graph.translate(80, 40)
graph.isPannable() // 画布是否可以平移
graph.enablePanning() // 启用画布平移
graph.disablePanning() // 禁止画布平移
graph.togglePanning() // 切换画布平移状态
graph.centerContent()
graph.toSVG(
  (dataUri: string) => {
    // 下载
    DataUri.downloadDataUri(DataUri.svgToDataUrl(dataUri), "chart.svg")
  },
  {
    // preserveDimensions?: boolean | Size
    // viewBox?: Rectangle.RectangleLike
    // copyStyles?: boolean
    // stylesheet?: string
    // serializeImages?: boolean
    // beforeSerialize?: (this: Graph, svg: SVGSVGElement) => any
  }
)
graph.toPNG(
  (dataUri: string) => {
    // 下载
    DataUri.downloadDataUri(dataUri, "chart.png")
  },
  {
    // width?: number
    // height?: number
    // backgroundColor?: string
    // padding?: NumberExt.SideOptions
    // quality?: number
  }
)
graph.dispose() //销毁画布
```

## 基类 Cell

<!-- delete / undo / redo / copy / cut / paste / savePNG / saveSVG / print / toJSON -->

```tsx

```
