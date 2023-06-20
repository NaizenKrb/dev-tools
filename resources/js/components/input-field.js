
class InputField extends HTMLElement
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
    get label() {
        return this.getAttribute('label');
    }
    set label(value) {
        if (!value || value === false || value === null) {
            this.removeAttribute('label');
        } else {
            this.setAttribute('label', value);
        }
    }
    get className() {
        return this.getAttribute('class-list');
    }
    set className(value) {
        if (!value || value === false || value === null) {
            this.removeAttribute('class-list');
        } else {
            this.setAttribute('class-list', value);
        }
    }
    get color() {
        return this.getAttribute('color');
    }
    set color(value) {
        if (!value || value === false || value === null) {
            this.removeAttribute('color');
        } else {
            this.setAttribute('color', value);
        }
    }
    get inputType() {
        return this.getAttribute('input-type');
    }
    set inputType(value) {
        if (!value || value === false || value === null) {
            this.removeAttribute('input-type');
        } else {
            this.setAttribute('input-type', value);
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
      let label = document.createElement('LABEL');
      label.className = 'flex flex-col';

      let span = document.createElement('SPAN');
      span.className = 'text-lg font-semibold mb-1 capitalize';
      span.innerText = this.label;


      let input = document.createElement('INPUT');
      input.name = this.name;
      input.type = this.inputType || 'text';

      if(this.inputType == 'file'){
        this.value = '';
      }
      input.value = this.value || '';
      input.className = this.className + ' ' + this.color + ' rounded';

      label.appendChild(span);
      label.appendChild(input);

      this.appendChild(label);
    }
    onClick(event){

    }
}


window.customElements.define('input-field', InputField);
