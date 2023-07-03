class CreateModal extends HTMLElement
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
  }
  onClick(event){

  }
}

window.customElements.define('create-modal', CreateModal);
