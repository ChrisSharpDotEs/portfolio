import { LitElement, html } from 'lit';

export class LitModal extends LitElement {
    static properties = {
        abierto: { type: Boolean },
        cerrando: { type: Boolean },
    };

    constructor() {
        super();
        this.abierto = false;
        this.cerrando = false;
    }

    createRenderRoot() {
        return this;
    }

    abrir() {
        this.abierto = true;
        this.cerrando = false;
    }

    cerrar() {
        this.cerrando = true;
        setTimeout(() => {
            this.abierto = false;
            this.cerrando = false;
        }, 300);
    }

    render() {
        return html`
      <button class="bg-blue-600 text-white px-4 py-2 rounded" @click=${this.abrir}>
        Abrir Modal
      </button>

      ${this.abierto ? html`
            <div class="fixed inset-0 bg-[#69728463] backdrop-blur-sm flex items-center justify-center z-50">
              <div class="bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full text-center
                ${this.cerrando ? 'animate-fade-scale-out' : 'animate-popup-bounce'}">
                <h2 class="text-2xl font-semibold mb-2 text-green-600">
                  ¡Éxito!
                </h2>
                <p class="mb-4 text-gray-700">
                  Operación completada correctamente.
                </p>

                <svg
                    class="mx-auto mb-4 w-20 h-20"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <circle cx="24" cy="24" r="22" fill="#D1FAE5" /> <!-- green-100 -->

                    <!-- Check animado -->
                    <path
                        d="M16 24l6 6 12-12"
                        fill="none"
                        stroke="#10B981"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-dasharray="36"
                        stroke-dashoffset="36"
                        style="animation: drawCheck 0.4s ease forwards"
                    />
                </svg>

                <style>
                    @keyframes drawCheck {
                        to {
                            stroke-dashoffset: 0;
                        }
                    }
                </style>

                <button
                  class="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  @click=${this.cerrar}>
                  Cerrar
                </button>
              </div>
            </div>` : ''}`;
    }
}
