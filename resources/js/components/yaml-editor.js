class yamlEditor extends HTMLElement {
    constructor() {
        super();

        this.formInput = document.createElement('DIV');
        this.formInput.id = "formInput";
        this.formInput.className = "flex flex-col px-4 text-slate-600 transition-all relative h-full w-full overflow-hidden";

        this.headerButton = document.createElement('BUTTON');
        this.headerButton.type = 'button';
        this.headerButton.className = "flex items-center gap-2 text-slate-600 hover:text-slate-800"
        this.headerButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="text-xl font-semibold text-center leading-6" id="slide-over-title">YAML EDITOR</span>
        `;

        this.closeContentButton = document.createElement('BUTTON');
        this.closeContentButton.type = 'button';
        this.closeContentButton.className = "close-contentbar rounded-md text-slate-600 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-white";
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
            <button class="open-contentbar btn btn-circle bg-base-200 self-center mr-2 text-primary hover:text-primary-focus focus:outline-none focus:ring-2 focus:ring-white">
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
                    <div class="flex h-full flex-col overflow-y-scroll bg-white">
                      <!-- HEADER -->
                      <header class="p-4 sticky top-0 z-40 bg-white flex items-center justify-between border-b-2">
                      </header>
                      <div id="yamlForm" class="pt-4">
                      </div>
                      <div class="sticky bottom-0 mt-4 z-40 bg-white">
                        <div class="divider m-0 p-0 h-0"></div>
                        <div class="flex justify-around border-slate-300 w-full p-4">
                          <button type="button" class="exitForm btn text-lg capitalize font-bold bg-slate-200  text-slate-600 px-4 py-2 border-0 rounded-full hover:bg-slate-300 hover:text-slate-900">schließen</button>
                          <button type="submit" class="saveButton btn text-lg capitalize font-bold bg-primary text-slate-100 px-4 py-2 border-0 rounded-full hover:bg-primary-focus hover:text-slate-50">Speichern</button>
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
        console.log("1")
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
      let active = false
      

      if(key.startsWith("page-")) {
        let points = form.pop();
        const subPage = document.createElement("DIV");
        subPage.id = key + "-points";
        subPage.className = "slide-page inactive transition-all duration-500"
        subPage.append(points);
        this.formInput.append(subPage);
      }
      else if(key.startsWith("config")) {
        active = true
      }
      const page = document.createElement("FORM");
      page.id = key;
      page.className = "slide-page transition-all duration-500 " + (active ? "active" : "inactive") + " ";
      page.append(...form);
      this.formInput.append(page);
      console.log("2");

      this.headerButton.querySelector("span").innerText = "YAML EDITOR";
      this.headerButton.value = "config.yaml";
    }
    switchPage(to, key) {
      if(to.startsWith("page-")) {
        console.log("3");
        this.headerButton.value = to;
        this.headerButton.querySelector("span").innerText = "PAGE EDITOR";
        this.headerButton.setAttribute("last-value", to);

        this.headerButton.addEventListener("click", () => {
          this.switchPage(this.headerButton.value, this.headerButton.getAttribute("last-value"));
        });

        const page = document.getElementById(to);
        const points = document.querySelector("#" + key + "-points");

        page.classList.remove("inactive");
        page.classList.add("active");
        
        let configPage = document.getElementById("config.yaml");
        configPage.classList.add("leftInactive");
        configPage.classList.remove("active");

        return;
      }
      else if(to.startsWith("config")) {
        console.log("4");
        this.headerButton.value = "config.yaml";
        this.headerButton.querySelector("span").innerText = "YAML EDITOR";
      
        const page = document.getElementById(lastTo);

        page.classList.remove("inactive");
        page.classList.add("active");

        let conifgPage = document.getElementById(to);
        conifgPage.classList.remove("leftInactive");
        conifgPage.classList.add("active");

        return;
      }
      console.log(to, key)
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
    submitForm(event) {
        event.preventDefault();

        var description = document.querySelector("#description");
        if (description) {
            sideMenu.simplemde.toTextArea();
        }

        var fileInput = document.querySelector('input[name="yaml-file"]');
        var fileName = fileInput.files[0].name;

        var form = document.querySelector("#yamlForm");
        var data = serializeForm(form);
        var blob = new Blob([yaml.stringify(data)], {type: "text/yaml;charset=utf-8"});
        var url = document.createElement("A");
        url.href = URL.createObjectURL(blob);
        url.download = fileName;
        url.click();

        this.closeContent();
    }
} 
customElements.define('yaml-editor', yamlEditor);