export class Accordion {
    constructor() {
        this.accordions = document.querySelectorAll(".accordion-header");
        this.init();
    }

    init() {
        this.accordions.forEach(button => {
            button.addEventListener("click", () => this.toggleAccordion(button));
        });
    }

    toggleAccordion(button) {
        const content = document.getElementById(button.getAttribute("aria-controls"));
        const icon = button.querySelector(".accordion-icon");
        const isOpen = button.getAttribute("aria-expanded") === "true";

        this.accordions.forEach(otherButton => {
            if (otherButton !== button) {
                const otherContent = document.getElementById(otherButton.getAttribute("aria-controls"));
                otherButton.setAttribute("aria-expanded", "false");
                otherContent.style.maxHeight = "0px";
                otherContent.setAttribute("aria-hidden", "true");
                otherButton.querySelector(".accordion-icon").classList.remove("rotate-180");
            }
        });

        button.setAttribute("aria-expanded", !isOpen);
        content.setAttribute("aria-hidden", isOpen);
        icon.classList.toggle("rotate-180");
        content.style.maxHeight = isOpen ? "0px" : content.scrollHeight + "px";
    }
}

window.addEventListener('load', () => {
    new Accordion();
});