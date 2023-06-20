
class MultiButtons extends HTMLElement
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

      let element = document.createElement('DIV');
      element.className = `w-full`;

      let innerElement = document.createElement('DIV');
      innerElement.className = `flex flex-col`;
      element.appendChild(innerElement);

      let span = document.createElement('SPAN');
      span.className = `font-bold text-lg mb-1 capitalize`;
      span.innerText = this.name;
      innerElement.appendChild(span);
      
      let buttonElement = document.createElement('DIV');
      buttonElement.className = `grid grid-cols-2 gap-2`;
      innerElement.appendChild(buttonElement);

      Object.entries(this.buttons).forEach(([key, value]) => {
        let button = document.createElement('PAGE-BUTTON');
        button.type = 'button';
        button.name = key;
        button.value = value;

        buttonElement.appendChild(button);
      });

      let addButton = document.createElement('BUTTON');
      addButton.type = 'button';
      addButton.className = `addPage flex btn btn-primary w-fit min-h-fit h-fit justify-start p-0 rounded mt-2 hover:bg-primary-focus`;
      addButton.innerHTML = `
            <div class=" p-2 flex items-center justify-between text-slate-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
              </svg>
              <div class="font-bold ml-2 text-sm">
                Add Page
              </div>
            </div>`
      element.appendChild(addButton);

      this.appendChild(element);
    }
    onClick(event){

    }
}

window.customElements.define('multi-buttons', MultiButtons);
