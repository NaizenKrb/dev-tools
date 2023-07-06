class PointsViewer extends HTMLElement{
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
        label.className = 'flex flex-col';

        let span = document.createElement('SPAN');
        span.className = 'font-bold text-lg mb-1 capitalize';
        span.innerText = this.label;
        label.appendChild(span);
        
        let contentDiv = document.createElement('DIV');
        contentDiv.className = 'flex flex-col';
        label.appendChild(contentDiv);

        Object.entries(this.points).forEach(([key, value]) => {
            let input = document.createElement('INPUT-FIELD');
            input.className = 'w-full textarea rounded-none mb-2';
            input.color = "bg-base-200";

            input.label = key;
            input.name = this.dataset.name + `[${key}][title]`;
            input.value = value.title;
            label.appendChild(input);
            contentDiv.appendChild(input);
            let innerDiv = document.createElement('DIV');
            innerDiv.className = 'divide-y-2 rounded-none overflow-hidden my-4';
            contentDiv.appendChild(innerDiv);
    
            value.children.forEach((data, idx) => {
                let details = document.createElement('DETAILS');
                details.className = 'collapse collapse-arrow bg-base-200 rounded-none';
                innerDiv.appendChild(details);

                let summary = document.createElement('SUMMARY');
                summary.className = 'collapse-title text-xl font-medium';
                summary.innerText = data.title || 'Undefined';
                details.appendChild(summary);

                let content = document.createElement('DIV');
                content.className = 'collapse-content';
                content.append(...this.callback(data, [], [this.dataset.name, key, "children", idx], false, "bg-base-100"));
                details.appendChild(content);
          });
        });
        let button = document.createElement('BUTTON');
        button.className = 'addPoints flex btn btn-primary w-fit min-h-fit h-fit justify-start p-0 rounded-none mt-2 hover:bg-primary-focus';
        button.type = 'button';
        button.dataset.name = this.dataset.name;
        button.innerHTML = 
            `
            <div class=" p-2 flex items-center justify-between text-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
                </svg>
                <div class="font-bold ml-2 text-sm">
                    Add ${this.label}
                </div>
            </div>
            `;

        let dialog = document.createElement('DIALOG');
        dialog.className = 'modal h-screen w-screen z-50 rounded-none';
        dialog.dataset.name = this.dataset.name;

        let dialogBox = document.createElement('DIV');
        dialogBox.className = 'modal-box p-5 max-w-3xl';
        dialog.appendChild(dialogBox);

        let head = document.createElement('H3');
        head.className = 'text-lg font-bold';
        head.innerText = `Add ${this.label}`;
        dialogBox.appendChild(head);

        let content = document.createElement('P');
        content.className = 'py-4';
        content.innerText = `Add ${this.label} to the list`;
        dialogBox.appendChild(content);

        let actions = document.createElement('DIV');
        actions.className = 'modal-action';
        dialogBox.appendChild(actions);

        let cancelButton = document.createElement('BUTTON');
        cancelButton.className = 'btn rounded-full';
        cancelButton.type = 'button';
        cancelButton.innerText = 'Cancel';
        cancelButton.addEventListener('click', (event) => {
            event.preventDefault();
            dialog.close();
        });
        actions.appendChild(cancelButton);
        label.appendChild(dialog);
        button.addEventListener('click', (event) => {
            event.preventDefault();
            dialog.showModal();
        });
        label.appendChild(button);
        this.appendChild(label);       
    }
    onClick(event){
    }
}
window.customElements.define('points-viewer', PointsViewer);