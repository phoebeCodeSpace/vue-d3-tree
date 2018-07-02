<template>
  <transition name="fade">
    <div v-show="visible"
      class="v-contextmenu-wrap" :style="position">
      <ul>
        <slot></slot>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'VContextMenu',
  provide(){
    return {
      $$contextmenu:this
    }
  },
  data() {
    return {
      position: {
        left: 0,
        top: 0
      },
      visible: false,
      contextmenuId: null
    }
  },
  methods: {
    bindContextmenu({el,contextmenuId}){
      el.addEventListener('contextmenu',this.handleContextmenu)
      this.contextmenuId = contextmenuId
    },
    handleContextmenu(e){
      e.preventDefault();
      console.log(e)
      
      let position = {
        left: e.pageX + 'px',
        top: e.pageY + 'px'
      }
      this.show(position)
    },
    handleBodyClick(e){
      const inSide = this.$el.contains(e.target)    // $$contextmenu区域

      if(!inSide){
        this.hide()
      }
    },
    show(position) {
      this.hideAll()
      this.visible = true
      this.position = position
      document.body.addEventListener('click',this.handleBodyClick)
    },
    hide(){
      this.visible = false     
      document.body.removeEventListener('click',this.handleBodyClick)       
    },
    hideAll(){
      Object.keys(window.$$contextmenu).map(item => {
        window.$$contextmenu[item].hide()
      })      
    },
    getPosition(){
      
    },
    registerContextmenu(){
      if(window.$$contextmenu){
        window.$$contextmenu[this.contextmenuId] = this
      }else{
        window.$$contextmenu = {
          [this.contextmenuId] : this
        }
      }
    }
  },
  mounted(){
    this.registerContextmenu()
  }
}
</script>