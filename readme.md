# tree

## 功能

### Tree 功能

- [×] tree orientation
- [×] tree collapsible

### Node 功能

- [×] 自定义节点样式
- [×] 控制节点间距离（父子节点、兄弟节点） deepFactor / separation

### Link 功能

- [×] 可选择link连接样式 straight 直角 / diagonal 曲线 / 
- [ ] 可自定义link连接样式 pathFunc

## 参数

orientation： 方向 / horizontal 、vertical / vertical
nodeSize： node 节点大小
translate： 偏移量

## 使用方法

``` bash
  # method 1: template
  <Tree
    ref="treeContainer"
    :initData="data"
    :translate="translate"
  >
  <template slot-scope="scope">
    <div>
      <p>{{scope}}</p>
    </div>
  </template>
</Tree>
```