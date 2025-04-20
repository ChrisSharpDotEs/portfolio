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
}
class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);

        if (this.modal) {
            this.cerrarModalBtn = this.modal.querySelector('button[data-modal="close"');
            this.abrirModal = this.abrirModal.bind(this);
            this.cerrarModal = this.cerrarModal.bind(this);
            this.manejarClicFueraModal = this.manejarClicFueraModal.bind(this);
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
        window.addEventListener('click', this.manejarClicFueraModal);
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
    }
    #setCookie() {
        const ahora = new Date();
        ahora.setTime(ahora.getTime() + (1 * 60 * 1000));
        const fechaExpiracion = ahora.toUTCString();
        document.cookie = `accepted-cookies=false;expires=${fechaExpiracion};path=/;SameSite=Lax;`
    }
    init() {
        if (!document.cookie.includes('accepted-cookies')) {
            this.#setCookie();
            this.initOnLoad();
        }
        this.#cookieManager();
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
        window.addEventListener('scroll', () => {
            const counter = new CountUp(duration);
            const counterElement = document.getElementById('counter-container');

            if (counter.isElementInViewport(counterElement) && !this.counted) {
                this.counted = true;
                counter.countUp();
            }
        });
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
        if (document.getElementById('miModal')) {
            const miModal = new CookieModal('miModal');
            miModal.init();
        }

        const uiManager = new UIManager(['navbarToggler', 'menuHandler', 'accordionHandler']);
        uiManager.init();

    } catch (error) {
        console.log(error);
    }

    const gananciasPorMes = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
            label: 'Ganancias ($)',
            data: [1500, 1800, 1200, 2000, 2200, 1900, 2500, 2100, 1600, 2300, 2600, 2400],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };
    try {
        const gananciasChart = new Chart(ctx, {
            type: 'line',
            data: gananciasPorMes,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function (value, index, values) {
                                return '$' + value;
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (context.parsed.y !== null) {
                                    label += ': $' + context.parsed.y;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.log(error);
    }

    try {
        var app = new Vue({
            el: '#example',
            data: {
                name: 'Vue.js'
            },
            methods: {
                toggle: function (el) {
                    console.log('click')
                    document.querySelectorAll('div[data-vue="content"]').forEach(item => {
                        item.classList.add('hidden');
                    });
                    document.getElementById(el).classList.remove('hidden');
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('load', init);