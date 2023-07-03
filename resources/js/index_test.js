import "./components/color-picker.js";
import "./components/page-button.js";
import "./components/markdown-description.js";
import "./components/input-field.js";
import "./components/multi-buttons.js";
import "./components/details-group.js";
import "./components/points-viewer.js";
import "./components/rotation-group.js";
import "./components/yaml-editor.js";
import "./components/option-picker.js";
import yaml from "../../node_modules/yaml/browser/index.js"
//import * as SimpleMDE from "../../node_modules/simplemde/src/js/simplemde.js"
//import yaml from 'yaml'
class sideMenu extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
        <aside class="h-full w-full">
          <div class="h-full flex ">
            <button class="open-sidebar btn btn-circle bg-base-200 self-center ml-2 text-primary hover:text-primary-focus focus:outline-none focus:ring-2 focus:ring-white">
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
                      <button type="button" class="close-sidebar rounded-none text-primary hover:text-primary-focus focus:outline-none focus:ring-2 focus:ring-white">
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
                      <div class="flex flex-col relative px-4 sm:px-6 bg-slate-100 mx-4 rounded-none p-4">
                        <div class="text-xl font-medium border-b-2 text-center">
                          YAML Editor
                        </div>
                        <div class="self-end mt-2 w-full">
                          <button name="" class="showXML btn btn-primary rounded-none w-full text-slate-100 hover:text-slate-50 font-bold py-1.5 px-4" >
                            Dateien bearbeiten
                          </button>
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
        
        this.querySelector(".showXML").addEventListener("click", this.showFile.bind(this));
        this.querySelector(".close-sidebar").addEventListener("click", this.closeSidebar.bind(this));
        this.querySelector(".open-sidebar").addEventListener("click", this.openSidebar.bind(this));
        this.simplemde;

    }

    async showFile(event) {
      this.dirHandle = await window.showDirectoryPicker({
        mode: "readwrite",
      });

      
      var contentBar = document.createElement("YAML-EDITOR");
      contentBar.callback = this.createForm.bind(this);
      contentBar.dirHandle = this.dirHandle;

      for await (const [key, value] of this.dirHandle.entries()) {
        const fileData = await value.getFile();
        const file = await fileData.text();
        console.log(file, yaml.parse(file));
        contentBar.createPage(yaml.parse(file), key);
      
      }

      document.body.appendChild(contentBar);
      contentBar.openContent();
      this.closeSidebar();

      return;
      let file = this.querySelector('input[name="yaml-file"]').files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        let contents = e.target.result;

        var contentBar = document.createElement("YAML-EDITOR");
        contentBar.content = yaml.parse(contents);
        document.body.appendChild(contentBar);
        contentBar.openContent();
        this.closeSidebar();

        let output = [];
        this.createForm(contentBar.content, output, [], true);
        document.querySelector("#formInput").append(...output);
        
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
    
    /**
     * Loop Generator
     * @param data 
     * @param prefix 
     */
    *loop(data, excludes, prefix = []) {
        let context = {...data};
        for (const [key, value] of Object.entries(context)) {
            let name = key;
            if (prefix.length > 0) {
                prefix.forEach((item, idx) => {
                    if (idx === 0) {
                        name = item;
                    } else {
                        name += `[${item}]`;
                    }
                });
                name += `[${key}]`;
            }

            if (typeof value === 'object' && value && !excludes.includes(key)) {
                prefix.push(key);
                for (const temp of this.loop(value, excludes, prefix)) {
                    yield temp;
                }
                prefix.pop();
            } else {
                yield [key, name, value];
            }
        }
    }

    /**
     * Build Field Elements
     */
    createForm(content, output, prefix = [], divider = false, color = "bg-base-200") {
      let excludes = ["pages", "siteMap", "meta", "alternatives", "points", "matterport", "locations", "interactables", "rotation", "defaultPage"]
        for (const [key, name, value] of this.loop(content, excludes, prefix)) {
            let inputType = "text";
            if(key === "activeColor"){
              let label = document.createElement('LABEL');
              label.innerHTML = `
                  <span class="font-bold text-lg mb-1 capitalize">
                    ${key}
                  </span>
                  <color-picker value="${value}" name="${name}"></color-picker>
                  `
              output.push(label);
            }
            else if(key === "interactables" || key === "alternatives" || key === "meta" || key === "locations"){
              color = "bg-base-100"
              let labelKey = null;
              if (key === "interactables") {
                labelKey = 'object';
              } else if (key === "alternatives") {
                labelKey = 'title';
              } else if (key === "meta") {
                labelKey = 'label';
              } else if (key === "locations") {
                labelKey = 'title';
                value.forEach((data, idx) => {
                  if(!data.current)
                    data.current = false;
                });
              }
              let detailsGroup = document.createElement('DETAILS-GROUP');
              detailsGroup.label = key;
              detailsGroup.dataset.name = name;
              detailsGroup.color = color;
              detailsGroup.details = value;
              detailsGroup.detailsLabelKey = labelKey;
              detailsGroup.callback = this.createForm.bind(this);
              output.push(detailsGroup);
            }
            else if(key === "points"){
              let detailsGroup = document.createElement('POINTS-VIEWER');
              detailsGroup.label = key;
              detailsGroup.dataset.name = name;
              detailsGroup.color = color;
              detailsGroup.points = value;
              detailsGroup.callback = this.createForm.bind(this);
              output.push(detailsGroup);
            }
            else if(key === "defaultPage"){
              color = "bg-base-200"
              let element = document.createElement('OPTION-PICKER');
              element.label = key;
              element.dataset.name = name;
              element.dataset.value = value;
              element.pages = content.pages;
              element.color = color;
              output.push(element);
            }
            else if(key === "rotation"){
              let rotationGroup = document.createElement('ROTATION-GROUP');
              rotationGroup.className = "w-full";
              rotationGroup.label = key;
              rotationGroup.dataset.name = name;
              rotationGroup.color = color;
              rotationGroup.x = value[0];
              rotationGroup.y = value[1];
              output.push(rotationGroup);
            }
            else if(key === "pages"){
              let element = document.createElement('MULTI-BUTTONS');
              element.buttons = value;
              element.dataset.name = name;
              output.push(element);
            }
            else if(key === "description") {
              let markdownDescription = document.createElement('MARKDOWN-DESCRIPTION');
              markdownDescription.name = name
              markdownDescription.value = value;
              output.push(markdownDescription);
            }
            else if(key === "matterport"){ 
              let element = document.createElement('DIV')
              element.className = `w-full`;

              let heading = document.createElement('SPAN')
              heading.className = `text-lg font-bold mb-0.5 capitalize`;
              heading.innerText = key;
              element.appendChild(heading);

              let temp = [];
              this.createForm(value, temp, [name]);
              element.append(...temp);
              output.push(element);
            }
            else if(key === "siteMap"){
              let element = document.createElement('DIV')
              element.className = `w-full`;

              let heading = document.createElement('SPAN')
              heading.className = `text-lg font-bold mb-0.5 capitalize`;
              heading.innerText = key;
              element.appendChild(heading);

              let temp = [];
              this.createForm(value, temp, [name]);
              element.append(...temp);
              output.push(element);
            }
            else{
              let classList = "textarea"
              let inputField = document.createElement('INPUT-FIELD');

              if(key==="url" || key==="website"){
                inputType = "url";
              }
              else if(key==="image" || key==="logo" || key==="thumbnail" || key==="path"){
                inputType = "file";
                classList = "file-input file-input-primary file-textcolor";
                color = "bg-base-100"
              }
              else if(key==="order"){
                inputType = "number";
              }
              else if(key === "visible" || key === "current"){
                inputType = "checkbox";
                classList = "toggle";
              }
              inputField.name = name;
              inputField.value = value;
              inputField.className = classList;
              inputField.label = key;
              inputField.inputType = inputType;
              inputField.color = color;
              output.push(inputField);
         }
         if(divider){
          output.push(this.createDivider());
         }
        }
      return output
    }
    createDivider() {
      let divider = document.createElement('DIV');
      divider.className = 'divider';
      return divider;
    }
}
customElements.define('side-menu', sideMenu);