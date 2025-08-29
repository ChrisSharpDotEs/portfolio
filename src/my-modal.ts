import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('my-modal')
export class MyModal extends LitElement {

  @property({ type: Boolean, attribute: 'is-initially-open' })
  isInitiallyOpen = false;

  @state()
  private _isModalVisible = false;

  connectedCallback(): void {
    super.connectedCallback();
    if (this.isInitiallyOpen) {
      this.showModal();
    }
  }

  showModal(): void {
    this._isModalVisible = true;
  }

  hideModal(): void {
    this._isModalVisible = false;
  }

  render() {
    return html`
      ${!this.isInitiallyOpen ? html`<button @click=${this.showModal} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Abrir Modal
      </button>` : html``
      }

      <div class="modal-container bg-gray-800 ${this._isModalVisible ? 'block' : 'hidden'}">
        <div class="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-lg relative">
          <button @click=${this.hideModal} class="btn-close" aria-label="Cerrar modal">&times;</button>
          <h2 class="modal-title">¡Hola desde Santa Cruz de Tenerife!</h2>
          <p class="text-gray-700">
            Este es un modal estilizado con Tailwind CSS. ¡Disfrútalo!
          </p>
          <p class="text-gray-600 mt-2 text-sm">
            Puedes cerrarlo haciendo clic en la 'x' o fuera del modal.
          </p>
        </div>
      </div>
    `;
  }
}