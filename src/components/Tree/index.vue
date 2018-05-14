<template>
  <div :class="['vue-tree-container',{'vue-tree-grabbable':zoomable}]"
  >  
    <svg :ref="svgRef" width="100%" height="100%">
      <transition>
        <g :ref="gRef"
         :transform="`translate(${translate.x},${translate.y}) scale(${scale})`"
        >
      
        <Link v-for="(link,index) in tree.links" :key="index"
          :orientation="orientation"
          :linkData="link"
          :transitionDuration="transitionDuration"
        />

        <Node v-for="node in tree.nodes" :key="node.data.id"
            :nodeData="node"
            :nodeSize="nodeSize"
            :transitionDuration="transitionDuration"
            :orientation="orientation"
            :nodeSvgShape="nodeSvgShape"
            :nodeSvgShapeAttr="nodeSvgShapeAttr"
            :allowForeignObjects="allowForeignObjects"
            :renderForeignObjects="renderForeignObjects"
            @handleNodeToggle="handleNodeToggle"
        />

        </g>
      </transition>
    </svg>
  </div>
</template>

<script>
import uuid from 'uuid'
import { tree , hierarchy, select ,event, zoom } from 'd3'
import { oneOf, typeOf } from '@/utils/assist'
import { assignProperties } from '@/utils/dataHelper'
import Link from '../Link'
import Node from '../Node'
export default {
  name: 'tree',
  components:{
    Link,
    Node
  },
  props: {
    initData: {
      type: Array,
      required: true
    },
    orientation: {
      type: String,
      default: 'horizontal',
      validator(value){
        return oneOf(value, ['horizontal', 'vertical'])
      }
    },
    collapsible: {
      type: Boolean,
      default: true
    },
    nodeSvgShape: {
      type: String,
      default: 'circle'
    },
    nodeSvgShapeAttr: {
      type: Object,
      default(){
        return {
          r: 10
        }
      }
    },
    pathFunc: {
      type: Function
    },
    nodeSize: {
      type: Object,
      default(){
        return{
         x: 200,
         y: 100         
        }
      }
    },
    separation:{
      type: Object,
      default(){
        return {
          siblings: 2,
          nonSiblings: 1
        }
      }
    },
    zoomable: {
      type: Boolean,
      default: true
    },
    zoom: 1,
    scaleExtent:{
      type: Object,
      default(){
        return { min: 0.1, max: 1 }
      }
    },
    translate: {
      type: Object,
      default(){
        return {
          x: 0,
          y: 0
        }
      },
      validator(value){
        return typeOf(value.x) === 'number' && typeOf(value.y) === 'number'
      }
    },
    scale: {
      type: Number,
      default: 1
    },
    transitionDuration: {
      type : Number,
      default: 500
    },
    allowForeignObjects: Boolean,
    renderForeignObjects: {
      type: Function,
      default () {
          return '';
      }
    }
  },
  data() {
    return {
      svgRef: uuid.v4(),
      gRef: uuid.v4(),
      data: assignProperties(this.initData),
      nodes: [],
      links: []
    }
  },
  computed:{
    treemap(){    // tree layout
      const {x,y} = this.nodeSize;
      const treemap = 
        tree()
        .nodeSize(this.orientation === 'horizontal' ? [y, x] : [x, y])
        .separation((a, b) => 
          (a.parent.data.id == b.parent.data.id ? this.separation.siblings : this.separation.nonSiblings))
      return treemap;
    },
    root(){
      const root = 
        hierarchy(this.data[0], (d) => (d._collapsed ? null : d._children))
      return root
    },
    tree(){
      const treeData = this.treemap(this.root);
      const nodes = treeData.descendants();
      nodes.forEach(function(d){ d.y = d.depth * 180});
      const links = treeData.descendants().slice(1);
      return {nodes,links}
    }
  },
  watch:{
    initData(val){
      this.data = assignProperties(val)
    }
  },
  methods: {
    bindZoomListener(){
      const svg = select(this.$refs[this.svgRef]);
      const g = select(this.$refs[this.gRef]);

      if(this.zoomable){
        svg.call(
            zoom()
            .scaleExtent([this.scaleExtent.min, this.scaleExtent.max])
            .on('zoom', () => {
              const [lastX,lastY] = [this.translate.x, this.translate.y]
              const {x,y,k} = event.transform;
              g.attr('transform', `translate(${lastX + x},${lastY + y}) scale(${k})`);
            })
        )
      }
    },
    setInitialTreeDepth(nodeSet, initialDepth) {
      nodeSet.forEach(n => {
        n._collapsed = n.depth >= initialDepth;
      });
    },
    handleNodeToggle(node) {
      const data = [...this.data];
      const targetNode = this.findNodeById(node.data.id,data)[0]
      if(this.collapsible){
        targetNode._collapsed ? this.expandNode(targetNode) : this.collapseNode(targetNode);
        this.data = data;
      }
      // if (this.props.collapsible && !this.state.isTransitioning) {
        

        
        // this.setState({ data, isTransitioning: true }, () => this.handleOnClickCb(targetNode, evt));
        // Await transitionDuration + 10 ms before unlocking node toggling again
        // setTimeout(
        //   () => this.setState({ isTransitioning: false }),
        //   this.props.transitionDuration + 10,
        // );
        // this.internalState.targetNode = targetNode;
      // } 
      // else {
      //   this.handleOnClickCb(targetNode, evt);
      // }
    },
    expandNode(node){
       node._collapsed = false;
    },
    collapseNode(node){
      node._collapsed = true;
      if (node._children && node._children.length > 0) {
        node._children.forEach(child => {
          this.collapseNode(child);
        });
      }
    },
    findNodeById(nodeId,nodeSet,hits=[]){
      if (hits.length > 0) {
        return hits;
      }
      hits = hits.concat(nodeSet.filter(node => node.id === nodeId));

      nodeSet.forEach(node => {
        if (node._children && node._children.length > 0) {
          hits = this.findNodeById(nodeId, node._children, hits);
          return hits;
        }
        return hits;
      });

      return hits;
    },
    update(){
      
    }
  },
  mounted(){
    this.bindZoomListener()
    console.log(this.root)
  }
}
</script>