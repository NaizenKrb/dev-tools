import yaml from "../../node_modules/yaml/browser/index.js"
//import * as SimpleMDE from "../../node_modules/simplemde/src/js/simplemde.js"
//import yaml from 'yaml'
class sideMenu extends HTMLElement {
    constructor() {
        super();
        console.log("sideMenu");
    }
    connectedCallback() {
        this.innerHTML = `
        <aside class="h-screen w-screen">
            <div class="h-full flex ">
            
                <button class="open-sidebar btn btn-circle bg-base-200 self-center ml-2 text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </button>
            </div>
            <div class="sidebar pointer-events-none opacity-0 relative z-50 ease-in-out duration-500 -translate-x-full;" aria-labelledby="slide-over-title " role="dialog" aria-modal="true">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity">
                </div>

                <div class="fixed inset-0 overflow-hidden">
                    <div class="absolute inset-0 overflow-hidden">
                        <div class="panel-slide pointer-events-none fixed inset-y-0 flex max-w-full pr-10 transform transition ease-in-out duration-500 -translate-x-full sm:duration-700">
                            <div class="pointer-events-auto relative w-screen max-w-md">
                                <div class="absolute right-0 top-0 -mr-8 flex pl-2 pt-4 sm:-mr-10 sm:pl-4">
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
                                                    <button class="showXML btn bg-indigo-500 font-bold text-slate-100 py-1.5 px-4 hover:bg-indigo-700 hover:text-slate-50 mr-1 disabled:bg-indigo-100" disabled>
                                                        Datei bearbeiten
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
        this.simplemde;
    }
    showFile(event) {
            let file = this.querySelector('input[type="file"]').files[0];
            let reader = new FileReader();
            reader.onload = (e) => {
                let contents = e.target.result;

                //var modal = document.createElement("yaml-modal");
                var contentBar = document.createElement("yaml-modal");

                //modal.content = yaml.parse(contents);
                contentBar.content = yaml.parse(contents);

                //document.body.appendChild(modal);
                document.body.appendChild(contentBar);

                //modal.openModal();
                contentBar.openContent();
                this.closeSidebar();

                let output = [];
                //this.createForm(modal.content, output);
                this.createForm(contentBar.content, output);
                document.querySelector("#formInput").innerHTML = output.join("");
                
                this.mde = new SimpleMDE({ element: document.getElementById("description")});;
                sideMenu.simplemde = this.mde;
                
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
        panel.classList.add("-translate-x-full");
        panel.classList.remove("translate-x-0");
    }
    openSidebar(event) {
        const sideBar = this.querySelector(".sidebar");
        const panel = this.querySelector(".panel-slide");
        sideBar.classList.add("opacity-100");
        sideBar.classList.remove("opacity-0");
        panel.classList.add("translate-x-0");
        panel.classList.remove("-translate-x-full");
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
                    <label class="card border-0 w-full bg-base-200 my-2">
                        <div class="card-body">
                            <div class="card-title">
                                ${label}
                            </div>
                            <div class="divide-y-2 my-2 flex flex-row flex-wrap">${output_2.join("")}</div>
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
                    <label class="card w-full bg-base-200 my-2">
                        <div class="card-body">
                            <span class="card-title">${label}</span>
                            <div class="">
                                <textarea name="${temp}" class="textarea textarea-bordered textarea-sm w-full">${value || ""}</textarea>
                            </div>
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
        <div class="contentbar pointer-events-none opacity-0 relative z-50 ease-in-out duration-500 -translate-x-0;" aria-labelledby="slide-over-title " role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity">
            </div>
            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="content-slide pointer-events-none fixed right-0 inset-y-0 flex w-1/3 pl-10 transform transition ease-in-out duration-500 translate-x-full sm:duration-700">
                        <div class="pointer-events-auto relative w-full ">
                            <div class="absolute left-0 top-0 -ml-8 flex pl-2 pt-4 sm:-ml-10 sm:pr-4">
                                <button type="button" class="close-contentbar rounded-md text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-white">
                                    <span class="sr-only">Close panel</span>
                                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl ">
                                <div class="px-4 sm:px-6">
                                    <h1 class="text-3xl font-bold leading-6  text-slate-600 text-center " id="slide-over-title">YAML EDITOR</h1>
                                </div>
                                <div class="divider"></div>
                                <form id="yamlForm" method="post">
                                    <div id="formInput">

                                    </div>
                                </form>
                                <div class="divider"></div>
                                <div class="flex justify-end border-slate-300 pt-4">
                                    <button type="submit" class="saveButton btn bg-indigo-500 font-bold text-slate-100 py-1.5 px-4 hover:bg-indigo-700 hover:text-slate-50 mr-2">Speichern</button>
                                    <button class="modal-close btn font-bold bg-slate-200  text-slate-600 py-1.5 px-4 hover:bg-slate-300 hover:text-slate-900">Schließen</button>
                                </div>
                            </div>
                        </div>
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
    openContent() {
        const contentBar = document.querySelector(".contentbar");
        const contentpanel = document.querySelector(".content-slide");
        contentBar.classList.add("opacity-100");
        contentBar.classList.remove("opacity-0");
        contentpanel.classList.add("-translate-x-0");
        contentpanel.classList.remove("translate-x-full");
    }

    closeContent() {
        const contentBar = document.querySelector(".contentbar");
        const contentpanel = document.querySelector(".content-slide");
        contentBar.classList.add("opacity-0");
        contentBar.classList.remove("opacity-100");
        contentpanel.classList.add("translate-x-full");
        contentpanel.classList.remove("-translate-x-0");
        contentBar.remove();
    }


    animate() {
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

        var description = document.querySelector("#description");
        if (description) {
            sideMenu.simplemde.toTextArea();
        }

        var fileInput = document.querySelector('input[type="file"]');
        var fileName = fileInput.files[0].name;

        var form = document.querySelector("#yamlForm");
        var data = serializeForm(form);
        var blob = new Blob([yaml.stringify(data)], {type: "text/yaml;charset=utf-8"});
        var url = document.createElement("a");
        url.href = URL.createObjectURL(blob);
        url.download = fileName;
        url.click();

        this.closeContent();
        this.closeModal();
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