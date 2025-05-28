import { LitElement, html } from 'lit';

export class LitModal extends LitElement {
  static properties = {
    opening: { type: Boolean },
    closing: { type: Boolean },
  };

  constructor() {
    super();
    this.opening = true;
    this.closing = false;
  }

  createRenderRoot() {
    return this;
  }

  open() {
    this.opening = true;
    this.closing = false;
  }

  close() {
    this.closing = true;
    setTimeout(() => {
      this.opening = false;
      this.closing = false;
    }, 300);
  }

  render() {
    return html`
      ${this.opening ? html`${this.#createDomElement()}` : ''}`;
  }

  #createDomElement() {
    if (!this.opening) return;

    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-[#69728463] backdrop-blur-sm flex items-center justify-center z-50';

    const container = document.createElement('div');
    container.className = `bg-white p-6 rounded-lg shadow-2xl max-w-xl w-full dark:bg-gray-800 dark:text-white
      ${this.closing ? 'animate-fade-scale-out' : 'animate-popup-bounce'}`;

    const title = document.createElement('h2');
    title.className = 'text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200';
    title.textContent = 'Política de cookies';

    const message = document.createElement('p');
    message.className = 'mb-4 text-gray-700 dark:text-gray-200';
    message.textContent = 'Esta web solo utiliza cookies necesarias para el correcto funcionamiento del sitio. No utilizamos cookies de publicidad ni de uso del sitio.';

    const button = document.createElement('button');
    button.className = 'mt-2 px-4 py-2 bg-gray-800 hover:bg-gray-400 text-white rounded dark:bg-gray-200 dark:hover:bg-gray-400 dark:text-gray-800';
    button.textContent = 'Cerrar';
    button.addEventListener('click', this.close.bind(this));

    const tooltip = document.createElement('div');
    tooltip.textContent = 'Cierra aqui';
    tooltip.className = 'absolute border-2 border-gray-200 px-2 py-1 bg-orange-800 text-white text-sm rounded opacity-0 transition-opacity duration-300 pointer-events-none';

    button.appendChild(tooltip);

    let tooltipTimeout;

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        container.classList.remove('animate-popup-bounce');
        void container.offsetWidth;
        container.classList.add('animate-popup-bounce');
      }
      tooltip.classList.remove('opacity-0');
      tooltip.classList.add('opacity-80');

      clearTimeout(tooltipTimeout);
      tooltipTimeout = setTimeout(() => {
        tooltip.classList.remove('opacity-80');
        tooltip.classList.add('opacity-0');
      }, 2500);
    });


    container.append(title, message, button);
    overlay.appendChild(container);

    return overlay;
  }

}
