// src/my-modal.ts

import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

// Correctly import the CSS file as a module.
// The `?inline` query tells Vite to load the file content as a string.
// The syntax below is crucial and is the correct way to import.

@customElement('my-modal')
export class MyModal extends LitElement {
  static styles = css`
    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgb(0,0,0);
      background-color: rgba(0,0,0,0.4);
      padding-top: 60px;
    }

    .modal-content {
      background-color: #fefefe;
      margin: 5% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
    }

    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
  `;


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
      <button @click=${this._showModal} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Abrir Modal</button>
      
      <div class="modal ${this._isModalVisible ? 'block' : 'hidden'}">
        <div class="modal-content">
          <button @click=${this._hideModal} class="close">
            &times;
          </button>
          <h2 class="text-2xl font-bold mb-4">¡Hola desde Santa Cruz de Tenerife!</h2>
          <p class="text-gray-700 mb-4">Este es un modal estilizado con Tailwind CSS.</p>
          <button @click=${this._hideModal} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right">Cerrar</button>
        </div>
      </div>
    `;
  }
}