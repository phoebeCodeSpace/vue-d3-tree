# tree 🌲

⚠️ 兼容性：

- IE 不兼容 [foreignObject](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject)

## 实例

[在线预览](https://phoebecodespace.github.io/vue-d3-tree/)
[动图预览](https://github.com/phoebeCodeSpace/vue-d3-tree/blob/master/examples/assets/demo.gif)

## 实现功能

### Tree 功能

- [x] tree orientation ：horizontal 、vertical
- [x] tree collapsible

### Node 功能

- [x] 自定义节点样式
- [x] 控制节点间距离（父子节点、兄弟节点） deepFactor / separation

### Link 功能

- [x] 可选择link连接样式 straight 直角 / diagonal 曲线 / fish 鱼钩线
- [x] 可自定义link连接样式 pathFunc

## 参数 Props

Props按功能分类：

### Tree

参数 | 说明 | 默认值 | 类型
---|---|---|---
initData | 数据初始值（必填） | `undefined` | Array
orientation | 树的方向，可选值为`horizontal`/`vertical` | `horizontal` | String
collapsible | 是否可折叠 | `true` | Boolean
zoomable | 是否可缩放 | `true` | Boolean
scaleExtent | 缩放区间，设置最大值与最小值 | `{min: 0.1,max: 1}` | Object
scale | 缩放值 | 1 | Number
translate | 位置偏移量 | `{x: 0,y: 0}` | Object
transitionDuration | 动画时间（毫秒） | 500 | Number

### Node

参数 | 说明 | 默认值 | 类型
---|---|---|---
nodeSize： | 节点大小 | `{x: 200,y: 80}` | Object
separation | 节点间距离，`siblings` 控制兄弟节点之间的距离，`nonSiblings` 控制同一父节点非兄弟节点之间的距离，距离为 `nodeSize.x` 的倍数，建议取 **1-2** 之间 | `{siblings: 1.2,nonSiblings: 1.2}` | Object
deepFactor | 节点间距离，控制父子级间的节点距离（⚠️ orientation 为 `horizontal` 时 deepFactor 越大距离越小，，orientation 为 `vertical` 时距离越大距离越大） | Number | 0.65

### Link

参数 | 说明 | 默认值 | 类型
---|---|---|---
pathFunc | 连接样式，可选值为 `straight` 直角 / `diagonal` 曲线 / `fish` 鱼钩线 | `diagonal` 或自定义方法，自定义方法参数 `linkData`、`start`、`end` |  String / Function

## 使用方法

``` bash
  <Tree
    ref="treeContainer"
    :initData="data"
    :translate="translate"
  >
  <template slot-scope="scope">
      <div class="base-node">
        <p>{{scope.name}}</p>
      </div>
  </template>
</Tree>
```

## scope 格式

``` bash
NODE {
  children: [],   # 子节点集合
  data: {},       # 节点数据
  depth:0,        # 节点深度（层级）
  height:1,
  parent:null,    # 节点父级
  x:0,            # 几点坐标x（translate前）
  y:0             # 几点坐标y（translate前）
}
```