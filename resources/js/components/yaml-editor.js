import yaml from "../../../node_modules/yaml/browser/index.js"
class YamlEditor extends HTMLElement {
  constructor() {
    super();
    this.formInput = document.createElement('DIV');
    this.formInput.id = "formInput";
    this.formInput.className = "flex flex-row flex-nowrap text-slate-600 transition-all relative h-full w-full overflow-hidden";

    this.headerButton = document.createElement('BUTTON');
    this.headerButton.type = 'button';
    this.headerButton.className = "flex items-center gap-2 text-slate-600 hover:text-slate-800"
    this.headerButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      <span id="header" class="text-xl font-semibold text-center leading-6" id="slide-over-title">YAML EDITOR</span>
      `;
    this.closeContentButton = document.createElement('BUTTON');
    this.closeContentButton.type = 'button';
    this.closeContentButton.className = "close-contentbar rounded-none text-slate-600 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-white";
    this.closeContentButton.innerHTML = `
      <span class="sr-only">Close panel</span>
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    `;
  }
  connectedCallback() {
    this.innerHTML =
    `
    <div class="h-full w-full self-center">
      <div class="flex h-full">
        <button class="open-contentbar btn btn-circle bg-white self-center mr-2 text-primary hover:text-primary-focus focus:outline-none focus:ring-2 focus:ring-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
        </button>
      </div>
      <div class="contentbar pointer-events-none opacity-100 relative z-50 ease-in-out duration-500 -translate-x-0;" aria-labelledby="slide-over-title " role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity">
        </div>
        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <!-- translate-x-full -->
            <div class="content-slide  pointer-events-none fixed right-0 inset-y-0 flex w-1/3 pl-10 transform transition ease-in-out duration-500 sm:duration-700">
              <div class="pointer-events-auto relative w-full ">
                <div class="scroller flex h-full flex-col overflow-y-scroll bg-white">
                  <!-- HEADER -->
                  <header class="p-4 sticky top-0 z-40 bg-white flex items-center justify-between border-b-2 will-change-auto">
                  </header>
                  <div id="yamlForm" class="flex flex-nowrap flex-row will-change-auto">
                  </div>
                  <div class="sticky bottom-0 mt-4 z-40 bg-white">
                    <div class="divider m-0 p-0 h-0"></div>
                    <div class="flex justify-around border-slate-300 w-full p-4">
                      <button type="button" class="exitForm btn text-lg capitalize font-bold bg-slate-200  text-slate-600 px-4 py-2 border-0 rounded hover:bg-slate-300 hover:text-slate-900">schließen</button>
                      <button type="submit" class="saveButton btn text-lg capitalize font-bold bg-primary text-slate-100 px-4 py-2 border-0 rounded hover:bg-primary-focus hover:text-slate-50">Speichern</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `; 
    this.querySelector('#yamlForm').append(this.formInput);
    this.querySelector('header').append(this.headerButton);
    this.querySelector('header').append(this.closeContentButton);
    let openmodal = document.querySelectorAll('.showXML')
    openmodal.forEach((el) => {
      el.addEventListener('click',(event) => {
        event.preventDefault()
        this.openContent()
      })
    })
    const closeContent = this.querySelectorAll('.close-contentbar')
    for (let i = 0; i < closeContent.length; i++) {
      closeContent[i].addEventListener('click', this.closeContent.bind(this));
    }
    this.querySelector(".saveButton").addEventListener("click", this.submitForm.bind(this));
    this.querySelector(".exitForm").addEventListener("click", this.exitContent.bind(this));
    this.querySelector(".open-contentbar").addEventListener("click", this.openContent.bind(this));
  }
  get content() {
    return this._content;
  }
  set content(value) {
    this._content = value;
  }
  createPage(content, key) {
    const form = this.callback(content, []);
    const page = document.createElement("FORM");
    page.dataset.page = key;
    page.className = "slide-page hidden transition-all duration-500 p-4 basis-full min-w-full";

    if(key.startsWith("page-")) {
      let points = form.pop();
      const subPage = document.createElement("DIV");
      subPage.dataset.page = key + "-points";
      subPage.className = "slide-page hidden transition-all duration-500 p-4 basis-full min-w-full"
      subPage.append(points);

      const pointsButton = document.createElement("BUTTON");
      pointsButton.type = "button";
      pointsButton.className = `flex btn w-fit min-h-fit h-fit justify-start p-0 rounded-none mt-2 hover:bg-primary-focus";`
      pointsButton.innerHTML = `
        <div class="p-2 flex  items-center justify-between text-slate-600">
          <span class="font-bold mr-2 text-sm ">Points</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      `;
      pointsButton.dataset.goTo = key + "-points";
      pointsButton.addEventListener("click", () => {
        this.switchPage(pointsButton.dataset.goTo, key);
      });
      form.push(pointsButton);
      
      page.append(...form);
      this.formInput.append(page);
      this.formInput.append(subPage);
    }
    else if(key.startsWith("config")) {
      page.classList.remove('hidden');
      page.dataset.depth = 0;
      page.append(...form);
      this.formInput.append(page);
      this.currentPage = page;
    }
    this.headerButton.querySelector("span").innerText = "YAML EDITOR";
    this.headerButton.value = "config.yaml";
    this.headerButton.addEventListener('click', () => {
      this.switchPage(this.headerButton.value);
    });
  }
  async switchPage(to, key) {
    const depth = to === 'config.yaml' ? 0 : (to.endsWith('-points') ? 2 : 1);
    const scrollDiv = document.querySelector('.scroller');
    const startPage = this.querySelector('[data-page="config.yaml"]');
    const page = this.querySelector(`[data-page="${to}"]`);
    page.classList.remove('hidden');

    startPage.dataset.depth = depth;
    startPage.style.marginLeft = `-${depth * 100}%`;
    await new Promise(resolve => setTimeout(resolve, 500));

    scrollDiv.scrollTo({ top: 0, behavior: 'smooth' });
    this.headerButton.value = this.currentPage.dataset.page;
    if (depth < 1 && this.currentPage.dataset.page.startsWith("page-")) {
      this.currentPage.classList.add('hidden');
      this.headerButton.querySelector("span").innerText = "YAML EDITOR"
    } else if (depth < 2 && this.currentPage.dataset.page.endsWith("-points")) {
      this.currentPage.classList.add('hidden');
    }
    this.currentPage = page;
    if (depth === 1) {
      this.headerButton.value = 'config.yaml';
      this.headerButton.querySelector("span").innerText = "CONFIG EDITOR"
    }
    if(depth > 1){
      this.headerButton.querySelector("span").innerText = "PAGE EDITOR"
    }
    return;
  }

  getFormContent(key) {
    const formContainer = document.querySelector(`[data-page="${key}"]`);
    const dataPoints = document.querySelector(`[data-page="${key}-points"]`);
    const form = document.createElement('FORM');
    form.append(...Array.from(formContainer.children, (el) => el.cloneNode(true)));
    if(key.startsWith("page-") ) {
      let temp = dataPoints.cloneNode(true);

      form.appendChild(temp);
    }
    var data = new FormData(form);
    var object = {};

    [...data.entries()].forEach(([key, value]) => {
      if (value instanceof File) {
        if (value.size > 0) {
          object[key] = value.name;
        }
      } else {
        if (value === "true") {
          value = true;
        } 
        else if (value === "false") {
          value = false;
        }
        else if (value === "null") {
          value = null;
        }  
        else if(/^\-?[0-9.]+$/.test(value)) {
          if (value.includes(".")) {
            if(!isNaN(parseFloat(value))){
              value = parseFloat(value);
            }
          } 
          else if(!isNaN(parseInt(value))) {
            value = parseInt(value);
          }
        } 
        object[key] = value;
      }
    });
    return serializeForm(object);
  }
  createSidebar() {
    const sideBar = document.createElement("SIDE-MENU");
    document.body.appendChild(sideBar);
  }
  openContent() {
    const contentBar = document.querySelector(".contentbar");
    const contentpanel = document.querySelector(".content-slide");
    contentBar.classList.add("opacity-100");
    contentBar.classList.remove("opacity-0");
    contentpanel.classList.add("-translate-x-0");
    contentpanel.classList.remove("translate-x-full");
  }
  exitContent() {
    this.closeContent();
    setTimeout(() => {
      document.querySelector("YAML-EDITOR").remove();
    }, 500);
  }
  closeContent() {
    const contentBar = document.querySelector(".contentbar");
    const contentpanel = document.querySelector(".content-slide");
    contentBar.classList.add("opacity-0");
    contentBar.classList.remove("opacity-100");
    contentpanel.classList.add("translate-x-full");
    contentpanel.classList.remove("-translate-x-0");
  }
  async submitForm(event) {
    event.preventDefault();
    let keys = [];
    let pages = document.querySelectorAll('[data-page]');
    
    pages.forEach((page) => {
      if(!page.dataset.page.includes("-points")) {
        keys.push(page.dataset.page);
      }
      }
    );
    keys.forEach(async (key) => {
      let data = this.getFormContent(key);
      let stringData = yaml.stringify(data);
      
      const fileHandle = await this.dirHandle.getFileHandle(key, { create: true });
      const stream = await fileHandle.createWritable();
      await stream.write(stringData);
      await stream.close();
    });
    return;
  }
} 
customElements.define('yaml-editor', YamlEditor);

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
  return Array.from(Object.entries(form))
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