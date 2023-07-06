
class ColorPicker extends HTMLElement{
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
            if(value.startsWith('0x')) {
                value = value.slice(2);
                value = '#' + value;
            }
            this.setAttribute('value', value);
        }
    }
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
            this.value = newValue;
          if (typeof this.inputText !== 'undefined') {
            this.inputText.value = this.value;
          }
          if (typeof this.inputText !== 'undefined') {
            this.inputColor.value = this.value;
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
        inputGroup.className = `flex h-fit w-fit textarea bg-base-200 p-0 items-center rounded-none ${this.classNames}`;

        let inputText = this.inputText = document.createElement('INPUT');
        inputText.type = 'text';
        inputText.pattern = "#[0-9A-Fa-f]{6}";
        inputText.value = this.value;
        inputText.name = this.name;
        inputText.className= 'color-text textarea bg-base-200 rounded-none h-full p-2 focus:ring-1';
        inputText.addEventListener('input', this.onChange.bind(this));
        inputGroup.appendChild(inputText);
        
        let div = document.createElement('DIV');
        div.className = 'p-2 flex';
        
        let inputColor = this.inputColor = document.createElement('INPUT');
        inputColor.type = 'color';
        inputColor.id = 'color-picker';
        
        inputColor.value = this.value;
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