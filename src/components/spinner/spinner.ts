import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { styles } from './spinner-styles' assert { type: 'ts'};

@customElement('load-spinner')
export class CookieBanner extends LitElement {
    @state() private __visible = true;

    static styles = styles;

    show() {
        this.__visible = true;
    }
    hide() {
        this.__visible = false;
    }

    render() {
        return html`
        <div class="${this.__visible ? 'show' : ''}">
            <div class="spinner"></div>
            <div class="dots">
                <span class="dot">.</span>
                <span class="dot">.</span>
                <span class="dot">.</span>
            </div>
        </div>`;
    }
}
