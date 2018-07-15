export default {
    name: 'ForeignObjectElement',
    inject: ['$$tree'],
    props: {
        nodeData: Object,
        renderForeignObjects: Function
    },
    /**
     * @see {@link https://cn.vuejs.org/v2/guide/render-function.html#%E6%8F%92%E6%A7%BD}
     */
    created() {
        if (this.$$tree.$scopedSlots) {
          const $node = this.$options.parent
          const nodeData = $node.$options.propsData.nodeData
          this.$options.render = h => h('div', [
            this.$$tree.$scopedSlots.default(nodeData)
          ])
        }
    }
}