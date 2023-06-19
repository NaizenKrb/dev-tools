
class PageButton extends HTMLElement
{

    /**
     * Observed Attributes
     */
    static get observedAttributes() {
        return ['value'];
    }

    /**
     * Create a new ColorPicker HTMLElement
     */
    constructor() {
        super();
    }

    /**
     * Magic Getter / Setter
     */
    get value() {
        return this.getAttribute('value');
    }
    set value(value) {
        if (!value || value === false || value === null) {
            this.removeAttribute('value');
        } else {
            this.setAttribute('value', value);
        }
    }

    /**
     * Magic Getter / Setter
     */
    get name() {
        return this.getAttribute('name');
    }
    set name(value) {
        if (!value || value === false || value === null) {
            this.removeAttribute('name');
        } else {
            this.setAttribute('name', value);
        }
    }

    /**
     * Attribute Changed Callback
     * @param {*} property 
     * @param {*} oldValue 
     * @param {*} newValue 
     * @returns 
     */
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) {
            return
        }
    }

    /**
     * Connected Callback
     */
    connectedCallback() {

        this.render();
    }

    /**
     * Disconnected Callback
     */
    disconnectedCallback() {
        
    }

    /**
     * Render Component
     */
    render() {

      let detail = document.createElement('details');
      detail.className = 'collapse collapse-arrow bg-base-200 rounded-none'
      
      let summary = document.createElement('summary');
      summary.className = 'collapse-title text-xl font-medium'
      
      summary.innerHTML = Object.values()[0]; // erster Key im Array)

      detail.appendChild(summary);

      let content = document.createElement('div');
      div.className = 'collapse-content';

      detail.appendChild(content);
    }
    onClick(event){

    }
}


window.customElements.define('page-button', PageButton);
