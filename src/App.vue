<template>
  <div id="app">
    <Tree :initData="data" :nodeSvgShapeAttr="nodeSvgShapeAttr" :translate="translate"/>
  </div>
</template>

<script>
import './style/index.scss'
import Tree from './components/Tree'
import treeData from './mock/mockData'
export default {
  name: 'app',
  data() {
    return {
      data: treeData,
      nodeSvgShapeAttr: {
        r: 20,
        fill: 'orange'
      },
      translate: {
        x: 700,
        y: 30
      }
    }
  },
  components: {
    Tree
  }
}
</script>
