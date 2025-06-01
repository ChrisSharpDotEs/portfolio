import { LitElement, html, css } from 'lit';

export class MyTooltip extends LitElement {
  createRenderRoot() {
    return this;
  }

  static properties = {
    text: { type: String },
  };

  constructor() {
    super();
    this.text = '';
  }

  render() {
    return html`
      <div class="tooltip opacity-0">
        ${this.text}
      </div>
    `;
  }

  show() {
    this.querySelector('.tooltip')?.classList.remove('opacity-0');
    this.querySelector('.tooltip')?.classList.add('opacity-85');
  }

  hide() {
    this.querySelector('.tooltip')?.classList.remove('opacity-85');
    this.querySelector('.tooltip')?.classList.add('opacity-0');
  }
}

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

  addContent() {
    const content = document.createElement('article');

    const title = document.createElement('h2');
    title.className = 'text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200';
    title.textContent = 'Política de cookies';

    const message = document.createElement('p');
    message.className = 'mb-4 text-gray-700 dark:text-gray-200';
    message.textContent = 'Esta web solo utiliza cookies necesarias para el correcto funcionamiento del sitio. No utilizamos cookies de publicidad ni de uso del sitio.';

    content.append(title, message);
    return content;
  }

  #addButton(type, hasTootlip) {
    const button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.textContent = 'Cerrar';
    button.addEventListener('click', this.close.bind(this));

    if (hasTootlip) {
      const tooltip = document.createElement('my-tooltip');
      tooltip.text = 'Pulsa aquí para cerrar';
      button.style.position = 'relative';
      button.appendChild(tooltip);
    }

    return button;
  }

  #createDomElement() {
    if (!this.opening) return;

    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    const container = document.createElement('div');
    container.className = `bg-white p-6 rounded-lg shadow-2xl max-w-xl w-full dark:bg-gray-800
    ${this.closing ? 'animate-fade-scale-out' : 'animate-popup-bounce'}`;

    const button = this.#addButton('', true);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        container.classList.remove('animate-popup-bounce');

        void container.offsetWidth;

        container.classList.add('animate-popup-bounce');

        const tooltip = document.querySelector('my-tooltip');
        tooltip.show();

        this.tooltipTimeout = setTimeout(() => {
          tooltip.hide();
        }, 2500);
      }
    });

    const content = this.addContent();

    container.append(content, button);

    overlay.appendChild(container);

    return overlay;
  }

}

customElements.define('my-tooltip', MyTooltip);
