<template>
  <div class="tree-progress">
      <Tree 
        ref="treeContainer"
        orientation="vertical"
        :initData="data"
        :translate="translate"
        :separation="separation"
        pathFunc="straight"
      >
      <template slot-scope="scope">
        <div class="base-node member">
          <div class="photo"><img :src="scope.data.attributes.photo"/></div>
          <div class="describe">
          <p class="name">{{scope.data.name}}</p>
          <p class="title">{{scope.data.attributes.title}}</p>
          </div>
        </div>
      </template>
      </Tree>
  </div>
</template>

<script>
// import Tree from "../components/Tree";
import treeData from "../mock/organization";
export default {
  name: "horizontal",
  data() {
    return {
      data: treeData,
      translate: {
        x: 0,
        y: 0
      },
      separation: { siblings: 1.2, nonSiblings: 1.2 }
    };
  },
  // components: {
  //   Tree
  // },
  methods: {
    setTreeCenter() {
      const dimensions = this.$refs.treeContainer.$el.getBoundingClientRect();
      this.translate = {
        x: dimensions.width / 2,
        y: 100
      };
    },
    handleClick(scope) {
      console.log(scope);
    },
    pathFunc(linkData, start, end) {
      return "M" + end.x + "," + end.y + " " + start.x + "," + start.y;
    }
  },
  mounted() {
    this.setTreeCenter();
  }
};
</script>
