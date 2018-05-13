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

export {
    assignProperties
}