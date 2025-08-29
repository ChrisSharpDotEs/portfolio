import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import tailwindStyles from '../tailwind.global.css?inline';

@customElement('cookie-banner')
export class CookieBanner extends LitElement {
  @state() private accepted = false;

  static styles = unsafeCSS(tailwindStyles);

  private _acceptCookies() {
    this.accepted = true;
    localStorage.setItem('cookiesAccepted', 'true');
  }

  connectedCallback() {
    super.connectedCallback();
    const consent = localStorage.getItem('cookiesAccepted');
    this.accepted = consent === 'true';
  }

  render() {
    if (this.accepted) return html``;

    return html`
      <div class="fixed w-full bottom-0 z-50 flex flex-col md:flex-row items-center justify-between p-4 bg-gray-200 text-zinc-800 text-sm dark:text-zinc-200 dark:bg-gray-800">
        <div class="mb-2 md:mb-0">
          Este sitio utiliza cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra 
          <a href="/politica-de-cookies" class="underline text-blue-400 hover:text-blue-600">Política de Cookies</a> y 
          <a href="/politica-de-privacidad" class="underline text-blue-400 hover:text-blue-600">Política de Privacidad</a>.
        </div>
        <button @click=${this._acceptCookies} class="btn btn-primary">
          Aceptar
        </button>
      </div>
    `;
  }
}
