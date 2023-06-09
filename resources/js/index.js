import yaml from "../../node_modules/yaml/browser/index.js"
//import SimpleMDE from "../../node_modules/simplemde/src/js/simplemde.js"
//import TextareaMarkdown from 'textarea-markdown'
//import yaml from 'yaml'
class sideMenu extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
        <aside class="h-screen">
            <div class="h-full flex justify-end">
                <button class="open-sidebar btn btn-circle bg-base-200 self-center mr-2 text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                </button>
            </div>
            <div class="sidebar bg-sl pointer-events-none opacity-0 relative z-50 ease-in-out duration-500 -translate-x-full;" aria-labelledby="slide-over-title " role="dialog" aria-modal="true">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity">
                </div>

                <div class="fixed inset-0 overflow-hidden">
                    <div class="absolute inset-0 overflow-hidden">
                        <div class="panel-slide pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 transform transition ease-in-out duration-500 translate-x-full sm:duration-700">
                            <div class="pointer-events-auto relative w-screen max-w-md "">
                                <div class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                    <button type="button" class="close-sidebar rounded-md text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-white">
                                        <span class="sr-only">Close panel</span>
                                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl ">
                                    <div class="px-4 sm:px-6">
                                        <h1 class="text-3xl font-bold leading-6  text-slate-600 text-center " id="slide-over-title">Dev Tools</h1>
                                    </div>
                                    <div class="divider"></div>
                                    <div class="relative px-4 sm:px-6">
                                        <div class="collapse collapse-arrow bg-base-200">
                                            <input type="checkbox" class="w-full"/> 
                                            <div class="collapse-title text-xl font-medium">
                                                YAML Editor
                                            </div>
                                            <div class="collapse-content flex flex-col items-center"> 
                                                <input type="file" name="yaml-file" class="file-input yaml-input w-full self-start mb-4" />
                                                <div class="self-end">
                                                    <button class="showXML btn bg-indigo-500 font-bold text-slate-100 py-1.5 px-4 hover:bg-indigo-700 hover:text-slate-50 mr-2 disabled:bg-indigo-100" disabled>
                                                        Editieren
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
        `;

        this.querySelector(".yaml-input").addEventListener("change", this.toggleShowXML.bind(this));
        this.querySelector(".showXML").addEventListener("click", this.showFile.bind(this));
        this.querySelector(".close-sidebar").addEventListener("click", this.closeSidebar.bind(this));
        this.querySelector(".open-sidebar").addEventListener("click", this.openSidebar.bind(this));
    }
    showFile(event) {
            let file = this.querySelector('input[type="file"]').files[0];
            let reader = new FileReader();
            reader.onload = (e) => {
                let contents = e.target.result;

                var modal = document.createElement("yaml-modal");
                console.log(yaml.parse(contents));
                modal.content = yaml.parse(contents);

                document.body.appendChild(modal);
                modal.openModal();
                this.closeSidebar();

                let output = [];
                this.createForm(modal.content, output);
                document.querySelector("#yamlForm").innerHTML = output.join("");
                var simplemde = new SimpleMDE({ element: document.getElementById("editor") });
                simplemde.value(yaml.parse(contents).description);

            };
            reader.readAsText(file);
        }
    toggleShowXML(event) {
        this.querySelector(".showXML").disabled = event.target.files.length === 0;
    }
    closeSidebar(event) {
        const panel = this.querySelector(".panel-slide");
        const sideBar = this.querySelector(".sidebar");
        sideBar.classList.add("opacity-0");
        sideBar.classList.remove("opacity-100");
        panel.classList.add("translate-x-full");
        panel.classList.remove("translate-x-0");
    }
    openSidebar(event) {
        const sideBar = this.querySelector(".sidebar");
        const panel = this.querySelector(".panel-slide");
        sideBar.classList.add("opacity-100");
        sideBar.classList.remove("opacity-0");
        panel.classList.add("translate-x-0");
        panel.classList.remove("translate-x-full");
    }
    createForm(content, output, prefix = []) {
        Object.entries(content).forEach(([key, value]) => {
            const firstLetter = key.charAt(0).toUpperCase();
            let label = firstLetter + key.slice(1);     
            
            if(typeof value === "object" && value !== null) {
                let output_2 = [];
                prefix.push(key);
                this.createForm(value, output_2, prefix);
                prefix.pop();
                output.push(
                    `
                    <label class="collapse collapse-arrow w-full bg-base-200 my-2">
                        <input type="checkbox" class="w-full" />
                        <div class="collapse-title">
                            ${label}
                        </div>
                        <div class="collapse-content">
                            ${output_2.join("")}
                        </div>
                    </label>
                    `
                )
            } else {
                let temp;
                
                if (prefix.length > 0) {
                    temp = prefix[0];
                    prefix.forEach((key, index) => {
                        if (index > 0) {
                            temp += `[${key}]`;
                        }
                    });
                    temp += `[${key}]`;
                } 
                else {
                    temp = key;
                }
                if(temp === "description") {
                    output.push(
                    `
                    <div class="card w-full bg-base-200 my-2">
                        <div class="card-body">
                            <span class="card-title">${label}</span>
                            <textarea name="${temp}" id="description" class="w-full">${value || ""}</textarea>
                        </div>
                    </div>
                    
                    `
                    )
                    
                    
                } 
                else {
                    output.push(
                    `
                    <label class="collapse collapse-arrow w-full bg-base-200 my-2">
                        <input type="checkbox" class="w-full" />
                        <span class="collapse-title">${label}</span>
                        <div class="collapse-content">
                            <textarea name="${temp}" class="textarea textarea-bordered textarea-sm w-full">${value || ""}</textarea>
                        </div>
                    </label>
                    `
                    )
                }
            }
        });
        
    }
}
customElements.define('side-menu', sideMenu);


class yamlModal extends HTMLElement {
    constructor() {
        super();

    }
    connectedCallback() {
        this.innerHTML =
        `
        <div class="yaml-modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center z-20">
            <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div class="modal-container w-11/12 md:max-w-2xl sm:max-h-[80vh] mx-auto shadow-lg z-50 overflow-y-auto scrollbar">
            <div class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
                <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
                <span class="text-sm">(Esc)</span>
            </div>
            
            <div class="modal-content w-100% bg-white py-4 text-left px-6 border-2 border-slate-300 shadow-sm rounded-md" >
                <div class="flex justify-between items-center pb-4 border-b border-slate-300" >
                    <div class="flex justify-between items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-11 w-11 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                        </svg>
                        <p class="text-2xl text-center font-semibold">Editor</p>
                    </div>
                    <div class="modal-close cursor-pointer z-50 p-1 border border-inherit border-slate-300 rounded-md hover:bg-gray-100">
                        <svg class="fill-current text-semibold" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                        </svg>
                    </div>
                </div>
                
                <!--Body-->
                <form id="yamlForm" method="post" class="py-3 flex flex-col border-opacity-50">
                </form>
                <div class="flex justify-end border-t border-slate-300 pt-4">
                    <button type="submit" class="saveButton btn bg-indigo-500 font-bold text-slate-100 py-1.5 px-4 hover:bg-indigo-700 hover:text-slate-50 mr-2">Speichern</button>
                    <button class="modal-close btn font-bold bg-slate-200  text-slate-600 py-1.5 px-4 hover:bg-slate-300 hover:text-slate-900">Schließen</button>
                </div>
                
            </div>
            </div>
        </div>
        `; 
        let openmodal = document.querySelectorAll('.showXML')
        openmodal.forEach((el) => {
            el.addEventListener('click',(event) => {
                event.preventDefault()
                this.openModal()
            })
        })
        const closemodal = this.querySelectorAll('.modal-close')
        for (let i = 0; i < closemodal.length; i++) {
            closemodal[i].addEventListener('click', this.closeModal.bind(this));

        }
        this.querySelector(".modal-overlay").addEventListener("click", this.openModal.bind(this));
        this.querySelector(".saveButton").addEventListener("click", this.submitForm.bind(this));

        

        document.onkeydown = (evt) => {
            evt = evt || window.event
            let isEscape = false
            if ("key" in evt) {
                isEscape = (evt.key === "Escape" || evt.key === "Esc");
            } else {
                isEscape = (evt.keyCode === 27);
            }
            if (isEscape && document.body.classList.contains('modal-active')) {
                this.closeModal();
            }
            if (isEscape && document.body.classList.contains('overflow-hidden')) {
                this.closeModal();
            }
        };
    }
    get content() {
        return this._content;
    }
    set content(value) {
        this._content = value;
    }
    openModal() {
        const body = document.querySelector('body');
        const modal = document.querySelector('.yaml-modal');
        modal.classList.remove('opacity-0', 'pointer-events-none');
        body.classList.toggle('modal-active');
        body.classList.toggle('overflow-hidden');
    }
    closeModal() {
        const body = document.querySelector('body');
        const modal = document.querySelector('yaml-modal');
        body.classList.remove('modal-active', 'overflow-hidden');
        modal.remove();
    }
    submitForm(event) {
        event.preventDefault();
        var form = document.querySelector("#yamlForm");

        var data = serializeForm(form);
        var blob = new Blob([yaml.stringify(data)], {type: "text/yaml;charset=utf-8"});
        var url = document.createElement("a");
        url.href = URL.createObjectURL(blob);
        url.download = "config.yaml";
        url.click();
    }
} 
customElements.define('yaml-modal', yamlModal);



function update(data, keys, value) {
  if (keys.length === 0) {
    // Leaf node
    return value;
  }

  let key = keys.shift();
  if (!key) {
    data = data || [];
    if (Array.isArray(data)) {
      key = data.length;
    }
  }

  // Try converting key to a numeric value
  let index = +key;
  if (!isNaN(index)) {
    // We have a numeric index, make data a numeric array
    // This will not work if this is a associative array 
    // with numeric keys
    data = data || [];
    key = index;
  }
  
  // If none of the above matched, we have an associative array
  data = data || {};

  let val = update(data[key], keys, value);
  data[key] = val;

  return data;
}

function serializeForm(form) {
  return Array.from((new FormData(form)).entries())
    .reduce((data, [field, value]) => {
      let [_, prefix, keys] = field.match(/^([^\[]+)((?:\[[^\]]*\])*)/);

      if (keys) {
        keys = Array.from(keys.matchAll(/\[([^\]]*)\]/g), m => m[1]);
        value = update(data[prefix], keys, value);
      }
      data[prefix] = value;
      return data;
    }, {});
}