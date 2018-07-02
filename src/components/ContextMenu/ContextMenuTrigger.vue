<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ContextMenuTrigger',
  props: {
    className: String,
    tagName: String
  },
}
</script>