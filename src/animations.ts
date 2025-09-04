const startAnimations = function () {
    const fadeElements = document.querySelectorAll('.fade-in');
    const scaleElements = document.querySelectorAll('.scale-up');

    const allAnimatedElements = [...fadeElements, ...scaleElements];

    const observer = new IntersectionObserver((entries) => {
        console.log(entries);
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('fade-in')) {
                    entry.target.classList.add('is-visible');
                } else if (entry.target.classList.contains('scale-up')) {
                    entry.target.classList.add('scale-is-visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    allAnimatedElements.forEach(element => {
        observer.observe(element);
    });

    const header = document.querySelector('header');

    function handleScroll() {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);
}

export { startAnimations };