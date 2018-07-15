import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import horizontal from './views/horizontal.vue'
import vertical from './views/vertical.vue'
import Tree from '../src'
import './index.scss'
Vue.use(VueRouter)
Vue.use(Tree)
Vue.config.productionTip = false

const routes = [{
        path: '/horizontal',
        component: horizontal
    },
    {
        path: '/vertical',
        component: vertical
    },
    {
        path: '*',
        redirect: '/horizontal'
    }

]

const router = new VueRouter({
    routes
})


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')