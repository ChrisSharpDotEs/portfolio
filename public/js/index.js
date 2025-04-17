function countUp(duration) {
    if (document.querySelectorAll('.counter').length > 0) {
        document.querySelectorAll('.counter').forEach(item => {
            const start = 0;
            const end = parseInt(item.getAttribute('data-counter'));
            const stepTime = Math.abs(Math.floor(duration / end));
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
}
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}
function handleScroll() {

    if (isElementInViewport(counterElement) && !counted) {
        counted = true;
        countUp(2000);
    }
}
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

const counterElement = document.getElementById('counter-container');
let counted = false;

if (counterElement) {
    window.addEventListener('scroll', handleScroll);
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
});