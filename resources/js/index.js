import { LitModal } from "./LitComponents.js";

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

function init() {
    document.documentElement.classList.toggle('dark');

    new Animate().init();

    CountUp.init(2000);

    try {
        const uiManager = new UIManager(['navbarToggler', 'menuHandler', 'accordionHandler', 'sidebarToggler']);
        uiManager.init();

        customElements.define('lit-modal', LitModal);
        
        document.querySelector('.bg-image').style.backgroundImage = "url('../public/img/coffee1.webp')";

    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('load', init);