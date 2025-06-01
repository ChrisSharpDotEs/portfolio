import { LitModal, BaseModal } from "./LitComponents.js";

class UIManager {
    constructor(config) {
        if (UIManager.instance) {
            return UIManager.instance;
        }
        UIManager.instance = this;
        this.config = config;
    }
    init() {
        this.config.forEach(metodo => {
            if (typeof this[metodo] === "function") {
                this[metodo]();
            } else {
                console.log(`El método ${metodo} no existe.`);
            }
        })
    }
    navbarToggler() {
        const navbarItems = document.querySelectorAll(".navbar-item");
        if (!navbarItems) return null;
        navbarItems.forEach((item) => {
            item.addEventListener("click", () => {
                navbarItems.forEach((el) => el.classList.remove("active"));
                item.classList.add("active");
            });
        });
    }
    menuHandler() {
        document.querySelectorAll(".menu-button").forEach(item => {
            item.addEventListener('click', () => {
                const mobileMenu = item.parentElement.parentElement.parentElement.querySelector(".mobile-menu");
                if (!item || !mobileMenu) return null;
                if (item.getAttribute('aria-expanded') == "true") {
                    item.setAttribute('aria-expanded', "false");
                    mobileMenu.style.maxHeight = '0';
                } else {
                    item.setAttribute('aria-expanded', "true");
                    mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
                }
            });
        });
    }
    toggler() {
        const toggler = document.querySelector('button[data-tw-toggle="theme"]');
        toggler.addEventListener('click', function () {
            document.documentElement.classList.toggle('dark');
            console.log('clicked');
        })
    }
    accordionHandler() {
        document.querySelectorAll('button[data-accordion]').forEach(item => {
            item.addEventListener('click', () => {
                const content = document.getElementById(item.getAttribute('data-accordion'));
                content.classList.toggle('max-h-0');

                if (content.classList.contains('max-h-0')) {
                    item.setAttribute('aria-expanded', 'false');
                    content.classList.remove('py-2');
                } else {
                    item.setAttribute('aria-expanded', 'true');
                    content.classList.add('py-2');
                }
            });
        });
    }
    sidebarToggler() {
        const min = '5rem';
        const max = '15rem';
        const sidebar = document.getElementById("sidebar");
        const toggleButton = document.getElementById("toggleSidebar");

        if (toggleButton) {
            toggleButton.addEventListener("click", () => {
                const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
                toggleButton.setAttribute("aria-expanded", !isExpanded);

                const size = isExpanded ? min : max;
                sidebar.style.width = size;
                document.querySelectorAll("span.ml-2").forEach((el) => {
                    el.classList.toggle("hidden");
                    isExpanded
                        ? el.classList.replace("md:inline", "md:hidden")
                        : el.classList.replace("md:hidden", "md:inline");
                });
            });
        }
    };
}
class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);

        if (this.modal) {
            this.cerrarModalBtn = this.modal.querySelector('button[data-modal="close"]');
            this.cerrarModal = this.cerrarModal.bind(this);
        } else {
            throw Error("No se encuentra el modal.");
        }
    }
    initOnLoad() {
        this.abrirModal();
        this.handleEvents();
    }
    initButtonModal(abrirModalBtnId) {
        this.abrirModalBtn = document.getElementById(abrirModalBtnId);
        this.abrirModalBtn.addEventListener('click', this.abrirModal);
        this.handleEvents();
    }
    handleEvents() {
        this.cerrarModalBtn.addEventListener('click', this.cerrarModal);
    }
    abrirModal() {
        this.modal.classList.remove('hidden');
    }
    cerrarModal() {
        this.modal.classList.add('hidden');
    }
    manejarClicFueraModal(event) {
        if (event.target === this.modal) {
            this.cerrarModal();
        }
    }
}
class CookieModal extends Modal {
    constructor(modalId) {
        super(modalId);
        this.form = document.getElementById('cookie-modal');
        if (!document.cookie.includes('accepted-cookies')) {
            this.initOnLoad();
        }
    }
    #setCookie(value) {
        const ahora = new Date();
        ahora.setTime(ahora.getTime() + (1 * 60 * 1000));
        const fechaExpiracion = ahora.toUTCString();
        document.cookie = `accepted-cookies=${value};expires=${fechaExpiracion};path=/;SameSite=Lax;`
    }
    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            let formdata = new FormData(this.form);

            let value = [{
                basic: true,
                ga: false
            }];
            this.#setCookie(JSON.stringify(value));

        });

    }
    #cookieManager() {
        const tabs = ['tab1-btn', 'tab2-btn', 'tab3-btn'].map(item => document.getElementById(item));
        const contents = ['tab1-content', 'tab2-content', 'tab3-content'].map(item => document.getElementById(item));

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                contents.forEach(item => item.classList.add('hidden'));
                contents[index].classList.remove('hidden')
            });
        });
    }

}
class CountUp {
    constructor(duration) {
        this.duration = duration;
        this.counted = false;
    }
    static init(duration = 2000) {
        if (document.getElementById('counter-container')) {
            window.addEventListener('scroll', () => {
                const counter = new CountUp(duration);
                const counterElement = document.getElementById('counter-container');

                if (counter.isElementInViewport(counterElement) && !this.counted) {
                    this.counted = true;
                    counter.countUp();
                }
            });
        }
    }
    countUp() {
        document.querySelectorAll('.counter').forEach(item => {
            const start = 0;
            const end = parseInt(item.getAttribute('data-counter'));
            const stepTime = Math.abs(Math.floor(this.duration / end));
            let current = start;

            const timer = setInterval(() => {
                current++;
                item.textContent = current;

                if (current === end) {
                    clearInterval(timer);
                }
            }, stepTime);
        });
    }
    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }
}
class Animate {
    constructor() {
        this.fadeUpElements = document.querySelectorAll('.fade-up');
    }
    checkVisibility() {
        this.fadeUpElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight * 0.75 && !element.classList.contains('active')) {
                element.classList.add('active');
            }
        });
    }
    init() {
        this.checkVisibility();
        window.addEventListener('scroll', () => this.checkVisibility());
    }
}

function fetchData() {
    customElements.define('edit-modal', BaseModal);

    fetch('public/data/items.json')
        .then(response => response.json())
        .then(data => {
            function createActionButtons(id) {
                return `<button class="">
                        <!-- Icono Editar -->
                        <button class="btn btn-primary bg-teal-400" data-id="edit-${id}">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                                <path d="M21.28 6.4L11.74 15.94C10.79 16.89 7.97 17.33 7.34 16.7C6.71 16.07 7.14 13.25 8.09 12.3L17.64 2.75C18.72 1.67 20.63 2.7 21.28 3.35C21.93 4 22.27 5.31 21.28 6.4Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11 4H6C4.94 4 3.92 4.42 3.17 5.17C2.42 5.92 2 6.94 2 8V18C2 19.06 2.42 20.08 3.17 20.83C3.92 21.58 4.94 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <button class="btn btn-primary bg-red-500" data-id="delete-${id}">
                            <!-- Icono Eliminar -->
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                                <path d="M3 3L6 6M6 6L10 10M6 6V18C6 19.66 7.34 21 9 21H15C16.66 21 18 19.66 18 18M6 6H4M10 10L14 14M10 10V17M14 14L18 18M14 14V17M18 18L21 21M18 6V12.39M18 6H16M18 6H20M16 6L15.46 4.37C15.18 3.55 14.42 3 13.56 3H10.44C9.94 3 9.48 3.19 9.12 3.5M16 6H11.61" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>`;
            }
            function renderTableRows(products) {
                return products.map(item => {
                    const tr = document.createElement('tr');
                    tr.classList.add('odd:bg-white', 'odd:dark:bg-gray-900', 'even:bg-gray-50', 'even:dark:bg-gray-800', 'border-b', 'dark:border-gray-700', 'border-gray-200');

                    Object.values(item).forEach(property => {
                        const td = document.createElement('td');
                        td.classList.add('px-6', 'py-4');
                        td.append(property);
                        tr.append(td);
                    });
                    const td = document.createElement('td');
                    td.classList.add('px-6', 'py-4');

                    td.innerHTML = createActionButtons();
                    tr.appendChild(td);
                    return tr;
                });

            }

            const products = renderTableRows(data);

            const productlist = document.getElementById('product-list');

            productlist.append(...products);

            productlist.querySelectorAll('button').forEach(item => {
                item.addEventListener('click', () => {
                    const id = item.getAttribute('data-id');
                    document.querySelector('edit-modal').open();
                });
            })
        });
}

function init() {
    document.documentElement.classList.toggle('dark');

    new Animate().init();

    CountUp.init(2000);

    try {
        const uiManager = new UIManager(['navbarToggler', 'menuHandler', 'accordionHandler', 'sidebarToggler']);
        uiManager.init();

        customElements.define('lit-modal', LitModal);

        document.querySelector('#main-section')?.classList.add('bg-image');

        if (document.getElementById('product-list')) fetchData();

    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('load', init);