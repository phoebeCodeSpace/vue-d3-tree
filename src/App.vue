<template>
  <div id="app">
    <Tree 
      ref="treeContainer"
      :initData="data"
      :nodeSvgShapeAttr="nodeSvgShapeAttr" 
      :translate="translate"
      :allowForeignObjects="true"
      :renderForeignObjects="renderForeignObjects"
      :separation="separation"
      :foreignObjectAttr="foreignObjectAttr"
    />
    <context-menu ref="ctxMenu" @ctx-open="onCtxOpen">
      <li @click="add($event, menuData)">新增</li>
      <li>编辑</li>
      <li @click="remove($event, menuData)">删除</li>
    </context-menu>
  </div>
</template>

<script>
import './style/index.scss'
import Tree from './components/Tree'
import contextMenu from 'vue-context-menu'
import treeData from './mock/mockData'
import { removeData } from './utils/dataHelper'
export default {
  name: 'app',
  data() {
    return {
      data: treeData,
      nodeSize: {
        x: 200,
        height: 100
      },
      nodeSvgShapeAttr: {
        r: 20,
        fill: 'orange'
      },
      translate: {
        x: 0,
        y: 0
      },
      separation:{
        siblings: 4,
        nonSiblings: 3
      },
      foreignObjectAttr: {
        fill: "#ccc"
      }
    }
  },
  components: {
    Tree,
    contextMenu
  },
  methods: {
    renderForeignObjects(createElement,nodeData) {
      const self = this;
      return createElement('div',{
        class: 'base-node',
        on: {
          contextmenu(e){
            e.preventDefault();
            self.$refs.ctxMenu.open(e,nodeData);
          }
        }
      },[
        createElement('p',{
          
        },`聚类：${nodeData.data.name}`),
        createElement('p',{

        },'话术')
      ])
    },
    onCtxOpen(locals){
        this.menuData = locals
    },
    add(e, menuData){
      console.log(menuData.data.id)
      
    },
    remove(e,menuData){
      const copyData = [...this.data]
      removeData(copyData,menuData.data.id)
      this.data = copyData
    }
  },
  mounted(){
    const dimensions = this.$refs.treeContainer.$el.getBoundingClientRect();
    this.translate = {
      x: dimensions.width / 2,
      y: 100
    }
  }
}
</script>
