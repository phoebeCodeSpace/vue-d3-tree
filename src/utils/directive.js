const contextmenu = {
    inserted(el, binding, vnode) {
        const $$contextmenu = vnode.context.$refs[binding.arg]
        $$contextmenu.bindContextmenu({
          el,
          contextmenuId: binding.arg
        })
    }
  } 
export {
  contextmenu
}