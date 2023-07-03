
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

        let button = document.createElement('BUTTON');
        button.type = 'button';
        button.className = `btn w-full min-h-fit h-fit justify-start p-0 capitalize text-start rounded-none`;
        button.addEventListener('click', this.onClick.bind(this));
        button.value = this.dataset.value;

        let span = document.createElement('SPAN');
        span.className = `p-2 font-bold text-base text-slate-600`;
        span.innerText = this.dataset.name;

        button.appendChild(span);
       

        this.appendChild(button);
    }
}

window.customElements.define('page-button', PageButton);
