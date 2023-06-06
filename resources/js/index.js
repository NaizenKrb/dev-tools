import yaml from "../../node_modules/yaml/browser/index.js";
//import yaml from 'yaml'
class sideMenu extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
        <aside class="">
            <div class="relative">
                <button class="open-sidebar rounded-md text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-white">
                    Open Panel
                </button>
            </div>
            <div class="sidebar pointer-events-none opacity-0 relative z-50 ease-in-out duration-500 -translate-x-full;" aria-labelledby="slide-over-title " role="dialog" aria-modal="true">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity">
                </div>

                <div class="fixed inset-0 overflow-hidden">
                    <div class="absolute inset-0 overflow-hidden">
                        <div class="panel-slide pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 transform transition ease-in-out duration-500 translate-x-full sm:duration-700">
                            <div class="pointer-events-auto relative w-screen max-w-md">
                                <div class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                    <button type="button" class="close-sidebar rounded-md text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-white">
                                        <span class="sr-only">Close panel</span>
                                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                    <div class="px-4 sm:px-6">
                                        <h2 class="text-2xl font-semibold leading-6 text-slate-600 text-center " id="slide-over-title">Dev Tools</h2>
                                    </div>
                                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                                        <input type="file" class="" />
                                        <div class="m-3">
                                            <button class="showXML bg-slate-400 hover:bg-slate-500 text-white font-bold py-1.5 px-4 rounded-md" disabled>
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
        </aside>
        `;

        this.querySelector("input").addEventListener("change", this.toggleShowXML.bind(this));
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
                modal.content = yaml.parse(contents);

                document.body.appendChild(modal);
                modal.toggleModal();
                
                this.closeSidebar();

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
}
customElements.define('side-menu', sideMenu);

class yamlModal extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
        <div class="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center z-20">
            <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div class="modal-container w-11/12 md:max-w-md sm:max-h-[80vh] mx-auto shadow-lg z-50 overflow-y-auto scrollbar">
            <div class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
                <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
                <span class="text-sm">(Esc)</span>
            </div>
            <div class="modal-content bg-white py-4 text-left px-6 border-2 border-slate-300 shadow-sm rounded-md" >
                <!--Title-->
                <div class="flex justify-between items-center pb-4 border-b border-slate-300" >
                <div class="flex justify-between items-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-11 w-11 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                    </svg>
                    <p class="text-2xl text-center font-semibold">Editor</p>
                </div>

                <div class="modal-close cursor-pointer z-50 p-1 border border-inherit border-slate-300 rounded-md hover:bg-gray-100 text-netzfactor hover:text-netzfactor-light">
                    <svg class="fill-current text-semibold" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                    </svg>
                </div>
                </div>

                <!--Body-->
                <form id="configForm" class="py-3">
                    <label class="my-3 p-2 border border-slate-300 rounded-md shadow-sm flex flex-col justify-center text-lg font-medium ">
                        <span>"Datei Name"</span>
                        <textarea name="comment" class="shadow-sm border border-slate-200 rounded-md p-1 h-24 resize-none scrollbar" placeholder="Kommentar zum Urlaub"></textarea>
                    </label>
                </form>
                <!--Footer-->
                <div class="flex justify-end border-t border-slate-300 pt-4">
                <button class="addButton bg-netzfactor hover:bg-netzfactor-light text-white font-bold py-1.5 px-4 rounded-md mr-2">Speichern</button>
                <button class="modal-close border-2 border-inherit font-bold py-1.5 px-4 rounded-md text-netzfactor hover:bg-gray-100 hover:text-netzfactor-light">Schließen</button>
                </div>
            </div>
            </div>
        </div>
        `; 
        let openmodal = document.querySelectorAll('.showXML')
        openmodal.forEach((el) => {
            el.addEventListener('click',(event) => {
                event.preventDefault()
                this.toggleModal()
            })
        })
        const closemodal = this.querySelectorAll('.modal-close')
        for (let i = 0; i < closemodal.length; i++) {
            closemodal[i].addEventListener('click', this.toggleModal.bind(this));

        }
        this.querySelector(".modal-overlay").addEventListener("click", this.toggleModal.bind(this));

        document.onkeydown = (evt) => {
            evt = evt || window.event
            let isEscape = false
            if ("key" in evt) {
                isEscape = (evt.key === "Escape" || evt.key === "Esc");
            } else {
                isEscape = (evt.keyCode === 27);
            }
            if (isEscape && document.body.classList.contains('modal-active')) {
                this.toggleModal();
            }
            if (isEscape && document.body.classList.contains('overflow-hidden')) {
                this.toggleModal();
            }
        };
    }
    get content() {
        return this._content;
    }
    set content(value) {
        this._content = value;
    }
    toggleModal() {
        console.log("toggleModal");
        const body = document.querySelector('body');
        const modal = document.querySelector('.modal');
        modal.classList.toggle('opacity-0');
        modal.classList.toggle('pointer-events-none');
        body.classList.toggle('modal-active');
        body.classList.toggle('overflow-hidden');
    }
}
customElements.define('yaml-modal', yamlModal);