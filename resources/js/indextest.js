
function showImage(index) {
    images.forEach((img, i) => {
        if (i === index) {
            img.classList.add('active');
        } else {
            img.classList.remove('active');
        }
    });
}
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}
function checkVisibility() {
    fadeUpElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.75 && !element.classList.contains('active')) {
            element.classList.add('active');
        }
    });
}

const images = document.querySelectorAll('.fade-in-out');
let currentIndex = 0;

setInterval(nextImage, 5000);

const fadeUpElements = document.querySelectorAll('.fade-up');


window.addEventListener('scroll', checkVisibility);
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeModal');

if (modal) {
    window.addEventListener('DOMContentLoaded', () => {
        modal.classList.remove('hidden');
        closeBtn.focus();
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    });
}

window.addEventListener('load', () => {
    //checkVisibility();
    const ctx = document.getElementById('gananciasMensuales').getContext('2d');

    const gananciasPorMes = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
            label: 'Ganancias ($)',
            data: [1500, 1800, 1200, 2000, 2200, 1900, 2500, 2100, 1600, 2300, 2600, 2400],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

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
});