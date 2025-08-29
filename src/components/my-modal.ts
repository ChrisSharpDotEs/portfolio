// src/my-modal.ts
import { customElement, state } from 'lit/decorators.js';
import { LitElement, html, css, unsafeCSS } from 'lit';
import tailwindStyles from './tailwind.global.css?inline';

// Correctly import the CSS file as a module.
// The `?inline` query tells Vite to load the file content as a string.
// The syntax below is crucial and is the correct way to import.

@customElement('my-modal')
export class MyModal extends LitElement {
  static styles = unsafeCSS(tailwindStyles);

  @state()
  private _isModalVisible = false;

  private _showModal() {
    this._isModalVisible = true;
  }

  private _hideModal() {
    this._isModalVisible = false;
  }
  render() {
    return html`
    <button 
      @click=${this._showModal} 
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Abrir Modal
    </button>
    <div class="${this._isModalVisible ? 'fixed inset-0 flex items-center justify-center bg-black/50 z-50' : 'hidden'}">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button 
          @click=${this._hideModal} 
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold">
          &times;
        </button>
      </div>
    </div>
  `;
  }
}