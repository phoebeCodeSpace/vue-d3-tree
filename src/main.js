import Vue from 'vue'
import App from './App.vue'
import {contextmenu} from './utils/directive'

Vue.config.productionTip = false

Vue.directive('contextmenu', contextmenu)

new Vue({
  render: h => h(App)
}).$mount('#app')
