import { LitElement, html } from 'lit';


export class MyTooltip extends LitElement {
  static properties = {
    text: { type: String },
  };

  createRenderRoot() {
    return this;
  }

  render() {
    return html`<div class="tooltip opacity-0">${this.text}</div>`;
  }

  show() {
    const div = this.querySelector('.tooltip');
    if (!div) return;
    div.classList.remove('opacity-0');
    div.classList.add('opacity-80');
  }

  hide() {
    const div = this.querySelector('.tooltip');
    if (!div) return;
    div.classList.remove('opacity-80');
    div.classList.add('opacity-0');
  }
}
customElements.define('my-tooltip', MyTooltip);

export class LitModal extends LitElement {
  static properties = {
    opening: { type: Boolean },
    closing: { type: Boolean },
  };

  constructor() {
    super();
    this.opening = true;
    this.closing = false;
    this.tooltipTimeout;
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

    const tooltip = document.createElement('my-tooltip');
    tooltip.text = 'Pulsa aquí para cerrar';
    button.appendChild(tooltip);
    tooltip.hide();

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        container.classList.remove('animate-popup-bounce');
        void container.offsetWidth;
        container.classList.add('animate-popup-bounce');

        clearTimeout(this.tooltipTimeout);

        tooltip.show();

        this.tooltipTimeout = setTimeout(() => {
          tooltip.hide();
        }, 2500);
      }
    });

    container.append(title, message, button);
    overlay.appendChild(container);

    return overlay;
  }

}
