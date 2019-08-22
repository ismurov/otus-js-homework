import { LitElement, html } from 'lit-element';

customElements.define('my-tree', class extends LitElement {
    initialize() {
        this._id = '';
        this._struct = [];
        this._shadow = this.dataset.hasOwnProperty('shadow');
        this._shadowStyleHref = this.dataset.shadowStyleHref || '';
        this.level = 0;

        this.removeAttribute('data-shadow');
        this.removeAttribute('data-shadow-style-href');
        
        super.initialize()
    }
    static get properties() {
        return {
            struct: { type: Object,  attribute: 'data-struct' },
            level: { type: Number,  attribute: 'data-level' }
        };
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-struct' && newValue) {
            const struct = JSON.parse(newValue);
            if (struct.id) {
                this._id = struct.id;
            }
            if (Array.isArray(struct.items)) {
                this._struct = struct.items;
            }
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }
    createRenderRoot() {
        return this._shadow ? super.createRenderRoot() : this ;
    }
    shadowStyle() {
        if (this._shadow && this._shadowStyleHref) {
            return html`<link rel="stylesheet" type="text/css" href=${this._shadowStyleHref}>`;
        }
    }
    buildTree() {
        return html`${this._struct.map(node => {
            if (!node.hasOwnProperty('items')) {
                return html`<my-leaf id=${node.id} data-level=${this.level + 1}></my-leaf>`;
            }
            return html`<my-tree id=${node.id} data-struct='${JSON.stringify(node)}' data-level=${this.level + 1}></my-tree>`;
        })}`;
    }
    render() {
        this.removeAttribute('data-struct');

        // if (this._level > 0) {
        //     this.setAttribute('data-level', this._level);
        // } else {
        //     this.removeAttribute('data-level');
        // }

        if (this._id) {
            this.setAttribute('id', this._id);
        }

        return html`
            ${this.shadowStyle()}
            &#127796;
            ${this.buildTree()}
        `;
    }
});

customElements.define('my-leaf', class extends LitElement {
    render() {
        return html`&#127807;`;
    }
    createRenderRoot() {
        return this;
    }
});