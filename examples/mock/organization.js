const treeData = [{
    name: 'Henry',
    attributes: {
        title: '研发部leader',
        photo: 'http://img.hb.aicdn.com/0788a51b27ba8db84f61d95249725475d5396f20119ac-HVge7P_fw658'
    },
    children: [{
            name: 'JACK',
            attributes: {
                title: '研发总监',
                photo: 'http://img.hb.aicdn.com/0788a51b27ba8db84f61d95249725475d5396f20119ac-HVge7P_fw658'
            },
            children: [{
                    name: 'Jane',
                    attributes: {
                        title: 'web开发',
                        photo: 'http://img.hb.aicdn.com/0e7c6aee0cc058724c8f40ce28794575d4b1e2a412ed8-E76e7h_fw658'
                    },
                },
                {
                    name: 'Bill',
                    attributes: {
                        title: 'ios开发',
                        photo: 'http://img.hb.aicdn.com/0788a51b27ba8db84f61d95249725475d5396f20119ac-HVge7P_fw658'
                    },
                },
                {
                    name: 'John',
                    attributes: {
                        title: 'android开发',
                        photo: 'http://img.hb.aicdn.com/0788a51b27ba8db84f61d95249725475d5396f20119ac-HVge7P_fw658'
                    },
                }
            ]
        },
        {
            name: 'Amy',
            attributes: {
                title: '设计总监',
                photo: 'http://img.hb.aicdn.com/0e7c6aee0cc058724c8f40ce28794575d4b1e2a412ed8-E76e7h_fw658'
            },
            children: [{
                    name: 'Sunny',
                    attributes: {
                        title: 'UI设计师',
                        photo: 'http://img.hb.aicdn.com/0e7c6aee0cc058724c8f40ce28794575d4b1e2a412ed8-E76e7h_fw658'
                    },
                },
                {
                    name: 'Emma',
                    attributes: {
                        title: 'UI设计师',
                        photo: 'http://img.hb.aicdn.com/0e7c6aee0cc058724c8f40ce28794575d4b1e2a412ed8-E76e7h_fw658'
                    },
                },
            ]
        },
        {
            name: 'Julie',
            attributes: {
                title: '产品总监',
                photo: 'http://img.hb.aicdn.com/0e7c6aee0cc058724c8f40ce28794575d4b1e2a412ed8-E76e7h_fw658'
            },
            children: [
                        {
                            name: 'Michael',
                            attributes: {
                                title: '产品经理',
                                photo: 'http://img.hb.aicdn.com/0788a51b27ba8db84f61d95249725475d5396f20119ac-HVge7P_fw658'
                            },
                        },
            ]
        },
    ],
}, ];

export default treeData;