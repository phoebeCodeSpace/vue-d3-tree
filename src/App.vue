<template>
  <div id="app">
    <!-- 工具栏 -->
    <div class="tree-toolbar">
      
    </div>
    <!-- 流程图 -->
    <div class="tree-progress">
      <Tree 
        ref="treeContainer"
        :initData="data"
        :translate="translate"
        pathFunc="fish"
      >
      <template slot-scope="scope">
        <div class="base-node" @click="handleClick(scope)">
          <p>{{scope.name}}</p>
        </div>
      </template>
      </Tree>
    </div>

 
    <!-- <div class="well" v-contextmenu:simple>
      click me contextmenu simple
    </div>
    <ContextMenu ref="simple">
      <ContextMenuItem @click="add">新增</ContextMenuItem>
      <ContextMenuItem>编辑</ContextMenuItem>
      <ContextMenuItem>复制</ContextMenuItem>
      <ContextMenuItem divider></ContextMenuItem>
      <ContextMenuItem>删除</ContextMenuItem>
    </ContextMenu> -->
  </div>
</template>

<script>
import './style/index.scss'
import Tree from './components/Tree/Tree'
import ContextMenu from './components/ContextMenu/ContextMenu.vue'
import ContextMenuItem from './components/ContextMenu/ContextMenuItem.vue'
import treeData from './mock/mockData'
export default {
  name: 'app',
  data() {
    return {
      data: treeData,
      translate: {
        x: 0,
        y: 0
      },
    }
  },
  components: {
    Tree,
    ContextMenu,
    ContextMenuItem
  },
  methods: {
    setTreeCenter(){
      const dimensions = this.$refs.treeContainer.$el.getBoundingClientRect()
      this.translate = {
        x: dimensions.width / 2,
        y: 100
      }
    },
    handleClick(scope){
      console.log(scope)
    },
    pathFunc(linkData, start , end){
      return  "M" +
        end.x +
        "," +
        end.y +
        " " +
        start.x +
        "," +
        start.y;
    }
    // renderForeignObjects(createElement,nodeData) {
    //   const self = this;
    //   return createElement('div',{
    //     class: 'base-node',
    //     on: {
    //       contextmenu(e){
    //         e.preventDefault();
    //         self.$refs.ctxMenu.open(e,nodeData);
    //       }
    //     }
    //   },[
    //     createElement('p',{
          
    //     },`聚类：${nodeData.data.prompt[0].tts}`),
    //     createElement('p',{

    //     },`话术：${nodeData.data.prompt[0].tts}`)
    //   ])
    // },
    // onCtxOpen(locals){
    //     this.menuData = locals
    // },
    // add(e, menuData){
    //   console.log(menuData.data.id)
      
    // },
    // remove(e,menuData){
    //   const copyData = [...this.data]
    //   removeData(copyData,menuData.data.id)
    //   this.data = copyData
    // }
  },
  mounted(){
    this.setTreeCenter()
  }
}
</script>
