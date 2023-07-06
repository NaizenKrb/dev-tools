
class InputField extends HTMLElement{
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
    get value() {
        if (this.inputType !== 'file' || !this.querySelector('input')) {
            return this.getAttribute('value');
        } else {
            let value = this.querySelector('input').value;
            if (value instanceof File && value.size > 0) {
                return value;
            } else {
                return this.querySelector('input').dataset.oldValue;
            }
        }
    }
    set value(value) {
        if (!value || value === false || value === null) {
            this.removeAttribute('value');
        } else {
            this.setAttribute('value', value);
        }
        if (this.querySelector('input')) {
            this.querySelector('input').value = (value || '');
        }
    }
    /**
     * Magic Getter / Setter
     */
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
            let hidden = document.createElement('INPUT');
            hidden.name = this.name;
            hidden.type = 'hidden';
            hidden.value = this.value || '';
            label.appendChild(hidden);
            input.dataset.oldValue = this.value;
        }
        else if(this.inputType == 'checkbox'){;
            if(this.value == 'true'){
                input.checked = true;
            }
            else{
                input.checked = false;
                input.dataset.oldValue = false;
            }
        }

        if(this.inputType !== 'file'){
            input.value = this.value || '';
        }

        if(this.inputType == 'checkbox'){
            input.className = this.className;
        }
        else{
            input.className = this.className + ' ' + this.color + ' ' + 'rounded-none';
        }
        label.appendChild(span);
        label.appendChild(input);
        this.appendChild(label);
    }
    onClick(event){
    }
}
window.customElements.define('input-field', InputField);