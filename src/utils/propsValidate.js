import {
    oneOf,
    typeOf
} from '@/utils/assist'


export const treeProps = {
        initData: {
            type: Array,
            required: true
        },
        orientation: {
            type: String,
            // default: 'horizontal',
            default: 'vertical',
            validator(value) {
                return oneOf(value, ['horizontal', 'vertical'])
            }
        },
        // distanceXFactor: {
        //   type: Number,
        //   default: 1
        // },
        deepFactor: {
          type: Number,
          default: 1.3
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
            default () {
                return {
                    r: 10
                }
            }
        },
        pathFunc: {
            default: 'diagonal'
        },
        nodeSize: {
            type: Object,
            default () {
                return {
                    x: 200,
                    y: 80
                }
            }
        },
        separation: {
            type: Object,
            default () {
                return {
                    siblings: 1,
                    nonSiblings: 1
                }
            }
        },
        zoomable: {
            type: Boolean,
            default: true
        },
        zoom: 1,
        scaleExtent: {
            type: Object,
            default () {
                return {
                    min: 0.1,
                    max: 1
                }
            }
        },
        translate: {
            type: Object,
            default () {
                return {
                    x: 0,
                    y: 0
                }
            },
            validator(value) {
                return typeOf(value.x) === 'number' && typeOf(value.y) === 'number'
            }
        },
        scale: {
            type: Number,
            default: 1
        },
        transitionDuration: {
            type: Number,
            default: 500
        },
        allowForeignObjects: Boolean,
        renderForeignObjects: {
            type: Function,
            default () {
                return '';
            }
        }
    }
