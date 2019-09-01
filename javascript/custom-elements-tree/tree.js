// my-tree and my-leaf
customElements.define('my-tree', class extends HTMLElement {
    constructor() {
        super();
        this._init = false;
        this._shadow = false;
        this._struct = {};
        this._level = 0;
        this._shadowStyleHref = '';
    }
    static get observedAttributes() {
        return ['data-struct'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-struct') {
            if (newValue && this._init) {
                if (this.updateStruct(newValue)) {
                    this.render();
                }
            }
        }
    }
    connectedCallback() {
        this._shadow = this.dataset.hasOwnProperty('shadow');
        if (this._shadow) {
            this.attachShadow({
                mode: 'open'
            });
        }

        this._level = +this.dataset.level || this._level;

        if (this.dataset.struct) {
            this.updateStruct(this.dataset.struct);
        }
        
        this._shadowStyleHref = this.dataset.shadowStyleHref || '';

        this._init = true;
        this.render();
    }
    updateStruct(value) {
        try {
            this._struct = JSON.parse(value);
            return true
        } catch (e) {
            console.error(e);
        }
        return false
    }
    render() {
        let html = '';
        if (this._shadow && this._shadowStyleHref) {
            html += `<link rel="stylesheet" type="text/css" href=${this._shadowStyleHref}>`;
        }

        html +=`&#127796;`;

        this.removeAttribute('data-struct');
        this.removeAttribute('data-shadow');
        this.removeAttribute('data-shadow-style-href');

        if (this._struct.id) {
            this.setAttribute('id', this._struct.id);
        }

        if (this._struct.items) {
            for (let i=0; i < this._struct.items.length; i++){
                let node = this._struct.items[i];

                if (!node.hasOwnProperty('items')) {
                    html += `<my-leaf id=${node.id} data-level=${this._level + 1}></my-leaf>`;
                } else {
                    html += `<my-tree data-struct=${JSON.stringify(node)} data-level=${this._level + 1}></my-tree>`;
                }
            }
        }

        if (this._shadow) {
            this.shadowRoot.innerHTML = html;
        } else {
            this.innerHTML = html;
        }
    }
});

customElements.define('my-leaf', class extends HTMLElement {
    connectedCallback() {
        this.innerHTML = "&#127807;";
    }
});