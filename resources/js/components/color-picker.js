
class ColorPicker extends HTMLElement
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
    get classNames() {
        return this.getAttribute('class-names');
    }
    set classNames(value) {
        if (!value || value === false || value === null) {
            this.removeAttribute('class-names');
        } else {
            this.setAttribute('class-names', value);
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

        if (property === 'value') {
          if (typeof this.inputText !== 'undefined') {
            this.inputText.value = newValue;
          }
          if (typeof this.inputText !== 'undefined') {
            this.inputColor.value = newValue;
          }
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
        let inputGroup = document.createElement('DIV');
        inputGroup.className = `flex h-fit w-fit textarea bg-base-200 p-0 items-center rounded ${this.classNames}`;

        let inputText = this.inputText = document.createElement('INPUT');
        inputText.type = 'text';
        inputText.pattern = "#[0-9A-Fa-f]{6}";
        inputText.value = this.value;
        inputText.className= 'color-text textarea bg-base-200 rounded h-full p-2 focus:ring-1';
        inputText.addEventListener('input', this.onChange.bind(this));
        inputGroup.appendChild(inputText);
        
        let div = document.createElement('DIV');
        div.className = 'p-2 flex';

        let inputColor = this.inputColor = document.createElement('INPUT');
        inputColor.type = 'color';
        inputColor.value = this.value;
        inputColor.id = '#color-picker';
        inputColor.className = 'rounded overflow-hidden colorpick color-input h-8 w-8';
        inputColor.addEventListener('input', this.onChange.bind(this));
        div.appendChild(inputColor)
        inputGroup.appendChild(div);

        this.appendChild(inputGroup);
    }
    onChange(event){
      if(event.target.type ==='text') {
        if(event.target.validity.valid) {
            this.value = event.target.value;
          }
      } else {
        this.value = event.target.value;
      }
    }
}

window.customElements.define('color-picker', ColorPicker);
