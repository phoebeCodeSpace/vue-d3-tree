<template>
  <g 
    :ref="nodeData.data.id"
    :transform="transform"
    :style="initStyle"
    @click="handleClick"
  >
    <foreignObject
      :x="-nodeSize.x/2" :y="-nodeSize.y/2"
      :width="nodeSize.x" :height="nodeSize.y"
    >
      <ForeignObjectElement v-if="allowForeignObjects"
        :nodeData="nodeData"
        :renderForeignObjects="renderForeignObjects"
      />
    </foreignObject>
  </g> 
</template>

<script>
import { select, drag ,event} from 'd3';
import ForeignObjectElement from './ForeignObjectElement'
export default {
  name: 'Node',
  components: {
    ForeignObjectElement
  },
  props: {
    nodeData: Object,
    nodeSize: Object,
    nodeSvgShape: String,
    nodeSvgShapeAttr: Object,
    transitionDuration: Number,
    orientation: String,
    allowForeignObjects: Boolean,
    renderForeignObjects: Function
  },
  data() {
    return {
      transform: '',
      initStyle: {
        opacity: 0
      } 
    }
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
      // const [parentX,parentY] = [this.nodeData.parent.x, this.nodeData.parent.y]
      const transform =  this.orientation === 'horizontal' ? `translate(${x},${y})` : `translate(${y},${x})`
      // const parentTransform =  this.orientation === 'horizontal' ? `translate(${parentX},${parentY})` : `translate(${parentY},${parentX})`
      this.applyTransform(transform);
    },
    applyTransform(transform, opacity=1,done=()=>{}){
      const node = select(this.$refs[this.nodeData.data.id]);
      if(this.transitionDuration){
        node
        // .attr('transform',parentTransform)
        // .transition()
        // .duration(this.transitionDuration)
        .attr('transform',transform)
        .attr('style', `opacity: ${opacity}` )
        done()


      }else{
        node
        .attr('transform',transform)
        .attr('style', `opacity: ${opacity}`  )
        done()
      }

      node
      .call(
        drag()
        .on("start", function(d) {
          console.log(d)
            // if (d == root) {
            //     return;
            // }
            // dragStarted = true;
            // nodes = tree.nodes(d);
            // d3.event.sourceEvent.stopPropagation();
            // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it d3.select(this).attr('pointer-events', 'none');
        })
      )
      .on('click', (d)=>{
        if (event.defaultPrevented) return; 
      });
    },
    handleClick(e){
      this.$emit('handleNodeToggle',this.nodeData,e)
    }
  },
  mounted(){
    this.setTransform()
  }
}
</script>