<template>
  <div :class="['v-tree__container',{'v-tree--grabbable':zoomable}]"> 
    <svg :ref="svgRef" width="100%" height="100%">
      <transition>
        <g :ref="gRef"
         :transform="`translate(${translate.x},${translate.y}) scale(${scale})`"
        >
      
        <Link v-for="(link,index) in tree.links" :key="index"
          :pathFunc="pathFunc"
          :orientation="orientation"
          :linkData="link"
          :nodeSize="nodeSize"
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
            @handleNodeToggle="handleNodeToggle"/>
        </g>
      </transition>
    </svg>
  </div>
</template>

<script>
import { tree, hierarchy, select, event, zoom } from "d3";
import { uniqueId } from "@/utils/assist";
import { assignProperties } from "@/utils/dataHelper";
import * as props from "@/utils/propsValidate";
import Link from "./Link";
import Node from "./Node";
export default {
  name: "tree",
  provide() {
    return {
      $$tree: this
    };
  },
  components: {
    Link,
    Node
  },
  props: props.treeProps,
  data() {
    return {
      viewPort: {
        width: 1000,
        height: 500
      },
      svgRef: uniqueId(),
      gRef: uniqueId(),
      data: assignProperties(this.initData),
      nodes: [],
      links: []
    };
  },
  computed: {
    treemap() {
      // tree layout
      const { x, y } = this.nodeSize;
      const treemap = tree()
        .size([this.viewPort.width, this.viewPort.height])
        .nodeSize(this.orientation === "horizontal" ? [y, x] : [x, y])
        .separation(
          (a, b) =>
            a.parent.data.id == b.parent.data.id
              ? this.separation.siblings
              : this.separation.nonSiblings
        );
      return treemap;
    },
    root() {
      const root = hierarchy(
        this.data[0],
        d => (d._collapsed ? null : d._children)
      );
      return root;
    },
    tree() {
      const treeData = this.treemap(this.root);
      const nodes = treeData.descendants();
      nodes.forEach(function(d) {
        d.y = d.depth * 180;
      });
      const links = treeData.descendants().slice(1);
      nodes.forEach(node => {
        node.y = node.y * this.deepFactor;
      });
      return { nodes, links };
    }
  },
  watch: {
    initData(val) {
      this.data = assignProperties(val);
    }
  },
  methods: {
    bindZoomListener() {
      const svg = select(this.$refs[this.svgRef]);
      const g = select(this.$refs[this.gRef]);

      if (this.zoomable) {
        svg.call(
          zoom()
            .scaleExtent([this.scaleExtent.min, this.scaleExtent.max])
            .on("zoom", () => {
              const [lastX, lastY] = [this.translate.x, this.translate.y];
              const { x, y, k } = event.transform;
              g.attr(
                "transform",
                `translate(${lastX + x},${lastY + y}) scale(${k})`
              );
            })
        );
      }
    },
    setInitialTreeDepth(nodeSet, initialDepth) {
      nodeSet.forEach(n => {
        n._collapsed = n.depth >= initialDepth;
      });
    },
    handleNodeToggle(node) {
      const data = [...this.data];
      const targetNode = this.findNodeById(node.data.id, data)[0];
      if (this.collapsible) {
        targetNode._collapsed
          ? this.expandNode(targetNode)
          : this.collapseNode(targetNode);
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
    expandNode(node) {
      node._collapsed = false;
      node.children = node._children;
    },
    collapseNode(node) {
      node._collapsed = true;
      node.children = null;
      if (node._children && node._children.length > 0) {
        node._children.forEach(child => {
          this.collapseNode(child);
        });
      }
    },
    findNodeById(nodeId, nodeSet, hits = []) {
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
    update() {}
  },
  mounted() {
    this.bindZoomListener();
    const { width, height } = this.$refs[this.svgRef].getBoundingClientRect();
    this.viewPort = {
      width,
      height
    };
    // console.log(this.viewPort)
  }
};
</script>