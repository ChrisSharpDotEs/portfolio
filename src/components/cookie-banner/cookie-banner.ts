import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { cookieBannerStyles } from './cookie-banner-styles' assert { type: 'ts'};

@customElement('cookie-banner')
export class CookieBanner extends LitElement {
	@state() private accepted = false;

	static styles = cookieBannerStyles;

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
      <div class="blur-overlay">
        <div class="footer-banner">
          Este sitio utiliza cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra 
          <a href="/politica-de-cookies">Política de Cookies</a> y 
          <a href="/politica-de-privacidad">Política de Privacidad</a>.
			<button @click=${this._acceptCookies} class="btn">
          		Aceptar
        	</button>
        </div>
 
      </div>
    `;
	}
}
