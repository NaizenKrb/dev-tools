class OptionPicker extends HTMLElement
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
        label.className = "flex flex-col"
        
        let span = document.createElement('SPAN');
        span.className = "text-lg font-semibold mb-1 capitalize"
        span.innerText = this.label;
        
        let input = document.createElement('SELECT');
        input.name = this.dataset.name;
        input.addEventListener('change', (ev) => {
            if (input.querySelector(`option[selected]`)) {
                input.querySelector(`option[selected]`).removeAttribute('selected');
            }
            input.querySelector(`option[value="${input.value}"]`).setAttribute('selected', '');
            console.log(input.querySelector(`option[selected]`), input.value);
        });
        
        Object.entries(this.pages).forEach(([key, value]) => {
            let option = document.createElement('OPTION');
            if (key === this.dataset.value) {
                option.setAttribute('selected', '');
            }
            option.value = key;
            option.innerText = key;
            input.appendChild(option);
        });
        input.className = `select rounded-none ${this.color} border border-gray-300 bg-white px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-blue-500`

        label.appendChild(span);
        label.appendChild(input);

        this.appendChild(label);
    }
    onClick(event){

    }
}

window.customElements.define('option-picker', OptionPicker);