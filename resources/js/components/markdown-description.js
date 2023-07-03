
class MarkdownDescription extends HTMLElement
{

    static formAssociated = true;

    /**
     * Observed Attributes
     */
    static get observedAttributes() {
        return [
            'value',
            'name'
        ];
    }

    /**
     * Create a new ColorPicker HTMLElement
     */
    constructor() {
        super();

        this._internals = this.attachInternals();
        this._internals.setFormValue(this.getAttribute('value') || '');
    }

    get form() {
        return this._internals.form;
    }

    get type() {
        return 'textarea';
    }

    get name() {
        return this.getAttribute('name');
    }

    set name(value) {
        value === false ? this.removeAttribute('name') : this.setAttribute('name', value)
    }

    get value() {
        return this.getAttribute('value');
    }

    set value(value) {
        this.setAttribute('value', value || '');
    }

    get validity() {
        return this._internals.validity;
    }

    get validationMessage() {
        return this._internals.validationMessage;
    }

    get willValidate() {
        return this._internals.willValidate;
    }

    checkValidity() {
        return this._internals.checkValidity();
    }

    reportValidity() {
        return this._internals.reportValidity();
    }

    /**
     * Toggle Attribute Helper
     */
    toggleCustomAttribute(name, value) {
        if (!value) {
            this.removeAttribute(name);
        } else {
            this.setAttribute(name, value === true ? '' : value);
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
            this._internals.setFormValue(newValue);
        }
    }

    /**
     * Connected Callback
     */
    connectedCallback() {
        if (!this.hasAttribute('tabindex')) {
            this.setAttribute('tabindex', 0);
        }
        this._internals.setFormValue(this);
        this._internals.setValidity({});

        this.render();

        this.simpleMDE = new SimpleMDE({element: this.querySelector('textarea')});
        this.simpleMDE.codemirror.on('change', () => {
            this.setAttribute('value', this.simpleMDE.value());
        });
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

      let input = document.createElement('textarea');
      input.className = 'description textarea bg-base-200 rounded-none';
      input.innerHTML = this.value;

      label.appendChild(span);
      label.appendChild(input);
      element.appendChild(label);

      this.appendChild(element);
    }
    onClick(event){

    }
}


window.customElements.define('markdown-description', MarkdownDescription);
