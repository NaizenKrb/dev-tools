
class RotationGroup extends HTMLElement
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
    get x() {
        return this.getAttribute('x');
    }
    set x(value) {
        if (!value || value === false || value === null) {
            this.removeAttribute('x');
        } else {
            this.setAttribute('x', value);
        }
    }
    get y() {
        return this.getAttribute('y');
    }
    set y(value) {
        if (!value || value === false || value === null) {
            this.removeAttribute('y');
        } else {
            this.setAttribute('y', value);
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
      
      let title = document.createElement('SPAN');
      title.className = 'font-bold text-lg mb-1 capitalize';
      title.innerHTML = this.label;
      label.appendChild(title);
    
      let group = document.createElement('DIV');
      group.className = 'grid grid-cols-2 gap-2 w-full mb-1';

      let inputX = document.createElement('INPUT');
      inputX.type = 'text'
      inputX.value = this.x
      inputX.name = this.name + `[0]`
      inputX.className = 'textarea rounded '
      group.appendChild(inputX);

      let inputY = document.createElement('INPUT');
      inputY.type = 'text'
      inputY.value = this.y
      inputY.name = this.name + `[1]`
      inputY.className = 'textarea rounded '
      group.appendChild(inputY);
      
      label.appendChild(group);
      this.appendChild(label);
    }
    onClick(event){

    }
}


window.customElements.define('rotation-group', RotationGroup);
