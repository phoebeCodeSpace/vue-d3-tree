import Vue from 'vue'

const ForeignObjectElement = Vue.component('ForeignObjectElement', {
    render(createElement) {
        return this.renderForeignObjects(createElement, this.nodeData)
    },
    props: {
        nodeData: Object,
        renderForeignObjects: Function
    }
})


export default ForeignObjectElement