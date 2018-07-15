import Tree from './components/Tree.vue'
import Node from './components/Node.vue'
import Link from './components/Link.vue'
import './style/tree.scss'

const install = (Vue) => {
    Vue.component(Tree.name, Tree)
    Vue.component(Node.name, Node)
    Vue.component(Link.name, Link)
}

export {
    Tree,
    Node,
    Link,
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
}