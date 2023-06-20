
class PointsViewer extends HTMLElement
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
        contentDiv.className = 'divide-y-2 rounded overflow-hidden';
        label.appendChild(contentDiv);

        Object.entries(this.points).forEach(([key, value]) => {
          let label = document.createElement('LABEL');
          label.className = 'flex flex-col';

          let span = document.createElement('SPAN');
          span.className = 'font-bold text-lg mb-1 capitalize';
          span.innerText = key;
          label.appendChild(span);

          let input = document.createElement('INPUT-FIELD');
          input.className = 'w-full textarea rounded';
          input.color = "bg-base-200";

          input.label = key;
          input.name = this.name + `[${key}][title]`;
          input.value = value.title;
          label.appendChild(input);

          value.children.forEach((data, idx) => {
            let details = document.createElement('DETAILS');
            details.className = 'collapse collapse-arrow bg-base-200 rounded-none';
            contentDiv.appendChild(details);
  
            let summary = document.createElement('SUMMARY');
            summary.className = 'collapse-title text-xl font-medium';
            summary.innerText = data.title || 'Undefined';
            details.appendChild(summary);
  
            let content = document.createElement('DIV');
            content.className = 'collapse-content';
            content.append(...this.callback(data, [], [this.name, key, "children", idx], false, this.color));
            details.appendChild(content);
          });
        });
        let button = document.createElement('BUTTON');
        button.className = 'addPoints flex btn btn-primary w-fit min-h-fit h-fit justify-start p-0 rounded mt-2 hover:bg-primary-focus';
        button.type = 'button';
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
            `
        label.appendChild(button);
        this.appendChild(label);
            
    }
    onClick(event){

    }
}


window.customElements.define('points-viewer', PointsViewer);
