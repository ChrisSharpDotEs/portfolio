// src/my-modal.ts
import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { modalStyles } from './tws-modal-styles' assert { type: 'ts' };
import tailwindcss from '../../tailwind.global.css?inline';

// Correctly import the CSS file as a module.
// The `?inline` query tells Vite to load the file content as a string.
// The syntax below is crucial and is the correct way to import.

@customElement('tws-modal')
export class MyModal extends LitElement {
	@property({ type: String, reflect: true }) effect: 'fade' | 'scale' | 'slide' = 'fade';
	@property({ type: Boolean, reflect: true }) open = false

	@state() analytics = false;
	@state() marketing = false;

	static styles = [modalStyles, unsafeCSS(tailwindcss)];

	toggleAnalytics() {
		this.analytics = !this.analytics;
	}

	toggleMarketing() {
		this.marketing = !this.marketing;
	}

	acceptSelection() {
		console.log('Preferencias guardadas:', {
			necesarias: true,
			analíticas: this.analytics,
			marketing: this.marketing,
		});
		this.open = false;
	}

	rejectAll() {
		this.analytics = false;
		this.marketing = false;
		this.open = false;
	}

	render() {
		return html`
			<div class="modal-content ${this.effect}" role="dialog" aria-modal="true" aria-labelledby="modal-title">
				<h2 id="modal-title" class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Preferencias de Cookies</h2>
				<p class="text-gray-600 dark:text-gray-500 mb-6">
					Usamos cookies para mejorar tu experiencia. Puedes activar o desactivar los siguientes tipos:
				</p>
				<div class="mb-8">
					<label class="inline-flex flex-row-reverse items-center justify-between w-full">
						<input type="checkbox" value="" class="sr-only peer" disabled checked>
						<div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#788aa4ff] dark:peer-checked:bg-[#788aa4ff] cursor-not-allowed"></div>
						<span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Cookies necesarias</span>
					</label>
				</div>
				<div class="mb-8">
					<label class="inline-flex flex-row-reverse items-center justify-between w-full">
						<input type="checkbox" value="" class="sr-only peer" checked>
						<div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600 cursor-pointer"></div>
						<span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Cookies analíticas</span>
					</label>
				</div>
				<div class="mb-12">
					<label class="inline-flex flex-row-reverse items-center justify-between w-full">
						<input type="checkbox" value="" class="sr-only peer">
						<div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600 cursor-pointer"></div>
						<span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Cookies de marketing</span>
					</label>
				</div>
				<div class="flex sm:flex-row flex-col justify-around gap-4">
					<button class="btn btn-secondary" @click=${this.rejectAll}>Rechazar todo</button>
					<button class="btn btn-primary" @click=${this.acceptSelection}>Aceptar selección</button>
				</div>
			</div>`;
	}
}