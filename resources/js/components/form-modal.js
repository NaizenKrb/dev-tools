class FormModal extends HTMLElement{
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
    let modal = document.createElement('DIALOG');
    modal.className = `modal h-screenn w-screen z-50 rounded-none`;
    modal.dataset.name = this.dataset.name;

    let modalBox = document.createElement('DIV');
    modalBox.className = `modal-box rounded-md p-5 max-w-3xl`;
    modal.appendChild(modalBox);

    let modalHeader = document.createElement('H3');
    modalHeader.className = `text-lg font-bold`;
    modalHeader.innerText = `Add ${this.dataset.name}`;
    modalBox.appendChild(modalHeader);

    let modalContent = document.createElement('FORM');
    modalContent.className = 'py-4';
    modalContent.innerText = `Add ${this.dataset.name} to the list`;
    modalContent.innerHTML = `
      <div>
        Test
      </div>
    `
    modalBox.appendChild(modalContent);

    let modalActions = document.createElement('DIV');
    modalActions.className = 'modal-action';
    modalBox.appendChild(modalActions);

    let cancelButton = document.createElement('BUTTON');
    cancelButton.className = 'btn btn-slate-300 text-slate-600 rounded-full hover:bg-slae-300 hover:text-slate-900  font-bold';
    cancelButton.type = 'button';
    cancelButton.innerText = 'Cancel';
    cancelButton.addEventListener('click', (event) => {
      event.preventDefault();
      modal.close();
    });
    
    modalActions.appendChild(cancelButton);

    






  }
  onClick(event){
  }
}

window.customElements.define('form-modal', FormModal);
