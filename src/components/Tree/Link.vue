<template>
  <path
    class="v-tree__link-base"
    :d="linkPath"
    :style = "initStyle"
    :ref="`link-${linkData.data.id}`"
  />
</template>

<script>
import { select } from "d3";
export default {
  name: "Link",
  props: [
    "pathFunc",
    "orientation",
    "nodeSize",
    "linkData",
    "transitionDuration"
  ],
  data() {
    return {
      initStyle: {
        opacity: 0
      }
    };
  },
  computed: {
    startPoint() {
      const d = this.linkData;
      let start = {};
      if (this.orientation === "horizontal") {
        start = {
          x: d.parent.y + this.nodeSize.x / 2,
          y: d.parent.x
        };
      } else {
        start = {
          x: d.parent.x,
          y: d.parent.y + this.nodeSize.y / 2
        };
      }
      return start;
    },
    endPoint() {
      const d = this.linkData;
      let end = {};
      if (this.orientation === "horizontal") {
        end = {
          x: d.y - this.nodeSize.x / 2,
          y: d.x
        };
      } else {
        end = {
          x: d.x,
          y: d.y - this.nodeSize.y / 2
        };
      }
      return end;
    },
    other() {
      let path = ''
      const [sx, sy] = [this.startPoint.x, this.startPoint.y]
      const [px, py] = [this.endPoint.x, this.endPoint.y]
      let factor = 0
      let dx = parseInt(px - sx)
      let dy = parseInt(py - sy)
      if (this.orientation === "vertical") {
        if (dx > 10) {
          factor = 1
        }
        if (dx < -10) {
          factor = -1
        }
        const dt = (py - sy) / 2        
        path =
        'M' + sx + ',' + sy +
        'Q' + sx + ',' + (sy + dt ) +
        ' ' + (sx + dt * factor) + ',' + (sy + dt) +
        'L' + (px - dt * factor) + ',' + (sy + dt) +
        'Q' + (px) + ',' + (sy + dt ) +
        ' ' + px + ',' + py
      }
      if (this.orientation === "horizontal") {
        if (dy > 10) {
          factor = 1
        }
        if (dy < -10) {
          factor = -1
        }
        const dt = (px - sx) / 2
        path =
        'M' + sx + ',' + sy +
        'Q' + (px - dt) + ',' + sy +
        ' ' + (px - dt)+ ',' + (sy + dt * factor) +
        'L' + (px - dt) + ',' + (py - dt * factor) +
        'Q' + (px - dt ) + ',' + py +
        ' ' + px + ',' + py
      }
      return path
    },
    // straight
    straight() {
      let path = "";
      const centerY = (this.endPoint.y + this.startPoint.y) / 2;
      const centerX = (this.endPoint.x + this.startPoint.x) / 2;
      if (this.orientation === "vertical") {
        path =
          "M" +
          this.endPoint.x +
          "," +
          this.endPoint.y +
          " " +
          this.endPoint.x +
          "," +
          centerY +
          " " +
          this.startPoint.x +
          "," +
          centerY +
          " " +
          this.startPoint.x +
          "," +
          this.startPoint.y;
      }
      if (this.orientation === "horizontal") {
        path =
          "M" +
          this.endPoint.x +
          "," +
          this.endPoint.y +
          " " +
          centerX +
          "," +
          this.endPoint.y +
          " " +
          centerX +
          "," +
          this.startPoint.y +
          " " +
          this.startPoint.x +
          "," +
          this.startPoint.y;
      }
      return path;
    },
    // diagonal
    diagonal() {
      const path =
        "M" +
        this.endPoint.x +
        "," +
        this.endPoint.y +
        "C" +
        this.endPoint.x +
        "," +
        (this.endPoint.y + this.startPoint.y) / 2 +
        " " +
        this.startPoint.x +
        "," +
        (this.endPoint.y + this.startPoint.y) / 2 +
        " " +
        this.startPoint.x +
        "," +
        this.startPoint.y;
      return path;
    },
    // 
    linkPath() {
      return this[this.pathFunc]
    }
  },
  methods: {
    applyOpacity(opacity = 1) {
      if (this.transitionDuration) {
        select(this.$refs[`link-${this.linkData.data.id}`])
          .transition()
          .duration(this.transitionDuration)
          .style("opacity", opacity);
      } else {
        select(this.$refs[`link-${this.linkData.data.id}`]).style(
          "opacity",
          opacity
        );
      }
    }
  },
  mounted() {
    this.applyOpacity();
  },
  // beforeUpdate () {
  //   this.applyOpacity()
  // },
  beforeDestroy() {
    this.applyOpacity(0);
  }
};
</script>