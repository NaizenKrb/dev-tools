
class MarkdownDescription extends HTMLElement
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
      let element = document.createElement('div');
      element.className = 'w-full'

      let label = document.createElement('label');
      label.className = 'flex flex-col';

      let span = document.createElement('span');
      span.className = 'font-bold text-lg mb-1 capitalize';
      span.innerText = this.name;

      let input = document.createElement('input');
      input.className = 'textarea bg-base-200 rounded';
      input.type = 'text';
      input.id = 'description'
      input.value = this.value || '';

      label.appendChild(span);
      label.appendChild(input);
      element.appendChild(label);

      this.appendChild(element);
    }
    onClick(event){

    }
}


window.customElements.define('markdown-description', MarkdownDescription);
