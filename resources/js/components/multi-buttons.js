import yaml from "../../../node_modules/yaml/browser/index.js"
class MultiButtons extends HTMLElement{
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
      this.simpleMDE = new SimpleMDE({content: this.querySelector('textarea')});
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
    let element = document.createElement('DIV');
    element.className = `w-full`;

    let innerElement = document.createElement('DIV');
    innerElement.className = `flex flex-col`;
    element.appendChild(innerElement);

    let span = document.createElement('SPAN');
    span.className = `font-bold text-lg mb-1 capitalize`;
    span.innerText = this.dataset.name;
    innerElement.appendChild(span);
    
    let buttonElement = document.createElement('DIV');
    buttonElement.className = `grid grid-cols-2 gap-2`;
    innerElement.appendChild(buttonElement);

    Object.entries(this.buttons).forEach(([key, value]) => {
      let button = document.createElement('PAGE-BUTTON');
      let hidden = document.createElement('INPUT');
      hidden.type = 'hidden';
      hidden.name = this.dataset.name + `[${key}]`;
      hidden.value = value;
      buttonElement.appendChild(hidden);

      button.type = 'button';
      button.dataset.name = key;
      button.dataset.value = value;
      button.onClick = (() => {
        const editor = this.closest('yaml-editor');
        editor.switchPage.call(editor, value, key);
      });
      buttonElement.appendChild(button);
    });
    let addButton = document.createElement('BUTTON');
    addButton.type = 'button';
    addButton.className = `addPage flex btn btn-primary w-fit min-h-fit h-fit justify-start p-0 rounded-none mt-2 hover:bg-primary-focus`;
    addButton.innerHTML = `
      <div class=" p-2 flex items-center justify-between text-slate-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
        </svg>
        <div class="font-bold ml-2 text-sm">
          Add Page
        </div>
      </div>
      `
    element.appendChild(addButton);

    let dialog = document.createElement('DIALOG');
    dialog.className = 'modal h-screen w-screen z-50 rounded-none';
    dialog.dataset.name = this.dataset.name;

    let dialogBox = document.createElement('DIV');
    dialogBox.className = 'modal-box rounded-md p-5 max-w-3xl';
    dialog.appendChild(dialogBox);

    let head = document.createElement('H3');
    head.className = 'text-lg font-bold';
    head.innerText = `Add Page`;
    dialogBox.appendChild(head);

    let content = document.createElement('form');
    content.className = 'py-4';
    content.name = 'pageForm';
    content.innerText = `Add ${this.dataset.name} to the list`;
    content.innerHTML = `
      <label class="flex flex-col">
        <span class="text-lg font-semibold mb-1 capitalize">
          id
        </span>
        <input name="id" type="text" class="textarea bg-base-200 rounded-none">
      </label>

      <label class="flex flex-col">
        <span class="text-lg font-semibold mb-1 capitalize">
          key
        </span>
        <input name="key" type="text" class="textarea bg-base-200 rounded-none">
      </label>

      <label class="flex flex-col">
        <span class="text-lg font-semibold mb-1 capitalize">
          order
        </span>
        <input name="order" type="number" class="textarea bg-base-200 rounded-none">
      </label>
      <label class="flex flex-col">
        <span class="text-lg font-semibold mb-1 capitalize">
          visible
        </span>
        <input name="visible" type="checkbox" value="true" class="toggle">
      </label>
      <label class="flex flex-col">
        <span class="text-lg font-semibold mb-1 capitalize">
          title
        </span>
        <input name="title" type="text" class="textarea bg-base-200 rounded-none">
      </label>
      <label class="flex flex-col">
        <span class="text-lg font-semibold mb-1 capitalize">
          description
        </span>
        <textarea name="description" class="description textarea bg-base-200 rounded-none"></textarea>
      </label>
      <div class="mb-2">
        <button type="button" class="addInteractable btn btn-primary rounded-full hover:bg-primary-focus text-slate-100 font-bold">
          <div class=" p-2 flex items-center justify-between text-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
            </svg>
            <div class="font-bold ml-2 text-sm">
              Add alternatives
            </div>
          </div>
        </button>
      </div>
      <div class="mb-2">
        <button type="button" class="addPoint btn btn-primary rounded-full hover:bg-primary-focus text-slate-100 font-bold">
          <div class=" p-2 flex items-center justify-between text-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
            </svg>
            <div class="font-bold ml-2 text-sm">
              Add Points
            </div>
          </div>
        </button>
      </div>
    `;
    dialogBox.appendChild(content);
    let actions = document.createElement('DIV');
    actions.className = 'modal-action';
    dialogBox.appendChild(actions);

    let cancelButton = document.createElement('BUTTON');
    cancelButton.className = 'btn btn-slate-300 text-slate-600 rounded-full hover:bg-slae-300 hover:text-slate-900  font-bold';
    cancelButton.type = 'button';
    cancelButton.innerText = 'Cancel';
    cancelButton.addEventListener('click', (event) => {
      event.preventDefault();
      dialog.close();
    });
    let submitButton = document.createElement('BUTTON');
    submitButton.className = 'btn btn-primary rounded-full hover:bg-primary-focus text-slate-100 font-bold';
    submitButton.type = 'submit';
    submitButton.name = 'submit';
    submitButton.innerText = 'Submit';
    
    submitButton.addEventListener('click', (event) => {
      this.submitForm();
    });

    actions.appendChild(submitButton);
    actions.appendChild(cancelButton);

    addButton.addEventListener('click', (event) => {
        event.preventDefault();
        dialog.showModal();
    });
    element.appendChild(dialog);
    this.appendChild(element);
  }
  createForm(){
  }
  async submitForm(event){
   
    let form = this.querySelector('[name="pageForm"]');
    let data = new FormData(form);
    let object = {};
    data.forEach((value, key) => {
      if(key === 'description'){
        object[key] = this.simpleMDE.value();
      }
      else{
        object[key] = value
      }
    });

    let key = 'page-'+ object.id + '.yaml';
    let stringData = yaml.stringify(object);
   
    const fileHandle = await this.dirHandle.getFileHandle(key, {
      create: true 
    });
    const stream = await fileHandle.createWritable();
    await stream.write(stringData);
    await stream.close();
    this.querySelector('dialog').close();    
  }

}
window.customElements.define('multi-buttons', MultiButtons);