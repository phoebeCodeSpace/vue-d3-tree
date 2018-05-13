const treeData = [{
    name: 'Top Level',
    attributes: {
        keyA: 'val A',
        keyB: 'val B',
        keyC: 'val C',
    },
    children: [{
            name: 'Level 2: A',
            attributes: {
                keyA: 'val A',
                keyB: 'val B',
                keyC: 'val C',
            },
            children: [{
                    name: 'Son of A',
                    attributes: {
                        keyA: 'val A',
                        keyB: 'val B',
                        keyC: 'val C',
                    },
                },
                {
                    name: 'Daughter of A',
                    attributes: {
                        keyA: 'val A',
                        keyB: 'val B',
                        keyC: 'val C',
                    },
                },
                {
                    name: 'Son of A',
                },
                {
                    name: 'Daughter of A',
                },
            ],
        },
        {
            name: 'Level 2: B',
            children: [{
                    name: 'Son of B',
                },
                {
                    name: 'Daughter of B',
                },
            ],
        },
    ],
}, ];

export default treeData;