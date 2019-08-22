const treeStruct = JSON.stringify({
    "id": "tree",
    "items": [{
        "id": 1,
        items: [{
            "id": 2
        }, {
            "id": 3
        }]
    }, {
        "id": 4,
        items: [{
            "id": 5
        }, {
            "id": 6
        }, {
            "id": 7
        }, {
            "id": 8,
            "items": [{
                "id": 9
            }]
        }]
    }, {
        "id": 10
    }, {
        "id": 11
    }]
});
setTimeout(() => {
    const elem = document.querySelector('#tree');
    elem.setAttribute('data-struct', treeStruct);
    elem.insertAdjacentHTML('beforebegin', `<p><code>data-struct='${treeStruct}</code></p>`);
    document.querySelector('#tree-wait').remove();
}, 2000);
setTimeout(() => {
    const elem = document.querySelector('#tree-shadow');
    elem.setAttribute('data-struct', treeStruct);
    elem.insertAdjacentHTML('beforebegin', `<p><code>data-struct='${treeStruct}</code></p>`);
    document.querySelector('#tree-shadow-wait').remove();
}, 2000);