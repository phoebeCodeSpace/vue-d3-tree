<template>
  <g 
    :ref="nodeData.data.id"
    :transform="transform"
    :style="initStyle"
    @click="handleClick"
  >
    
  </g> 
</template>

<script>
import { select } from 'd3';
export default {
  name: 'Node',
  props: {
    nodeData: Object,
    nodeSize: Object,
    nodeSvgShape: String,
    nodeSvgShapeAttr: Object,
    transitionDuration: Number,
    orientation: String,
  },
  data() {
    return {
      transform: '',
      initStyle: {
        opacity: 0
      } 
    }
  },
  computed:{
    // transform(){
    //   const x = this.nodeData.x, y = this.nodeData.y;
    //   return this.orientation === 'horizontal' ? `translate(${x},${y})` : `translate(${y},${x})`
    // }
  },
  methods:{
    renderNodeElement(){
      const nodeEl = select(this.$refs[this.nodeData.data.id])
                    .append(this.nodeSvgShape)
      
      Object.entries(this.nodeSvgShapeAttr).forEach(item=>{
        nodeEl.attr(item[0],item[1])
      })
    },
    setTransform(){
      const x = this.nodeData.x, y = this.nodeData.y;
      const transform =  this.orientation === 'horizontal' ? `translate(${x},${y})` : `translate(${y},${x})`
      this.transform = transform
      this.applyTransform(transform);
    },
    applyTransform(transform, opacity=1,done=()=>{}){
      if(this.transitionDuration){
        select(this.$refs[this.nodeData.data.id])
        .transition()
        .duration(this.transitionDuration)
        .attr('transform',transform)
        .attr('style', `opacity: ${opacity}` )
        done()
      }else{
        select(this.$refs[this.nodeData.data.id])
        .attr('transform',transform)
        .attr('style', `opacity: ${opacity}`  )
        done()
      }
    },
    handleClick(e){
      this.$emit('handleNodeToggle',this.nodeData,e)
    }
  },
  mounted(){
    this.renderNodeElement()
    this.setTransform()
    

  }
}
</script>