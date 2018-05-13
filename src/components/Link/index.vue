<template>
  <path
    class="vue-tree-link-base"
    :d="linkPath"
    :style = "initStyle"
    :ref="`link-${linkData.data.id}`"
  />
</template>

<script>
import { select } from 'd3';

export default {
  name: 'Link',
  props: {
    linkData: Object,
    transitionDuration: Number
  },
  data() {
    return {
      initStyle: {
        opacity: 0
      }
    }
  },
  computed: {
    linkPath(){
      const d = this.linkData;
      const path = 
      "M" + d.x + "," + d.y
      + "C" + d.x + "," + (d.y + d.parent.y) / 2
      + " " + d.parent.x + "," + (d.y + d.parent.y) / 2
      + " " + d.parent.x + "," + d.parent.y;
      return path;
    }
  },
  methods: {
    applyOpacity(opacity = 1) {
      if(this.transitionDuration){
        select(this.$refs[`link-${this.linkData.data.id}`])
        .transition()
        .duration(this.transitionDuration)
        .style('opacity', opacity)
      }else{
        select(this.$refs[`link-${this.linkData.data.id}`])
        .style('opacity', opacity)
      }
    }
  },
  mounted(){
    this.applyOpacity()
  },
  // beforeUpdate () {
  //   this.applyOpacity()
  // },
  beforeDestroy () {
    this.applyOpacity(0)
  }
}
</script>