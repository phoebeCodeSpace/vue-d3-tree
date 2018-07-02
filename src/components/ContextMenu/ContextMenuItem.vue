<template>
  <li v-if="divider" class="v-contextmenu-item--divider" />
  <li v-else :class="['v-contextmenu-item', { 'v-contextmenu-item--disabled' : disabled }]" @click="handleClick"
  >
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'VContextMenuItem',
  inject: ['$$contextmenu'],
  props: {
    divider: Boolean,
    disabled: Boolean
  },
  methods: {
    handleClick(e) {
      this.$emit('click', this, e)
      this.$$contextmenu.hide()
    }
  },
}
</script>