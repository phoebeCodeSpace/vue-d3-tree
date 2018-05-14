import uuid from 'uuid'

const assignProperties = (data) => {
    return data.map(node => {
        node.id = uuid.v4();
        node._collapsed = false;
        if (node.children && node.children.length > 0) {
            node.children = assignProperties(node.children)
            node._children = node.children
        }
        return node;
    })
}

const removeData = (data, id) => {
  if (id === 0) return;     // 不能是root
  data.forEach(node => {
      if (node.id === id) {
          const idx = data.findIndex(item => item.id === id);
          if (node.children) { // 有子元素 升一级
              const children = node.children;
              data.splice(idx, 1, ...children)
          } else {
              data.splice(idx, 1)
          }
          console.log('done')
      } else {
          node.children && removeData(node.children, id)
      }
  })
}

export {
    assignProperties,
    removeData
}