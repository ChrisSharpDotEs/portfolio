import { css } from 'lit';

export const cookieBannerStyles = css`
.blur-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 5;
}

.footer-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1rem 2rem;
    text-align: center;
    font-family: sans-serif;
    font-size: 1rem;
    z-index: 5;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.footer-banner {
    background-color: #f0f0f0;
    color: #333;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

/* Estilos base para enlaces */
a {
    color: #0066cc;
    text-decoration: none;
    transition: color 0.3s ease, text-decoration 0.3s ease;
}

/* Hover y foco */
a:hover,
a:focus {
    color: #004999;
    text-decoration: underline;
}

/* Enlace visitado */
a:visited {
    color: #551a8b;
}

a:active {
    color: #cc0000;
}

.btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-family: sans-serif;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background-color: #0078d4;
    color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn:hover {
    background-color: #005fa3;
    transform: scale(1.05);
}

.btn:active {
    background-color: #004a80;
    transform: scale(0.98);
}

@media (prefers-color-scheme: dark) {
    a {
        color: #66b2ff;
    }

    a:hover,
    a:focus {
        color: #3399ff;
    }

    a:visited {
        color: #c18aff;
    }

    a:active {
        color: #ff6666;
    }
}

/* Modo oscuro */
@media (prefers-color-scheme: dark) {
    .btn {
        background-color: #3399ff;
        color: #ffffff;
        box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
    }

    .btn:hover {
        background-color: #1a80e0;
    }

    .btn:active {
        background-color: #1060b0;
    }
}

@media (prefers-color-scheme: dark) {
    .footer-banner {
        background-color: #1e1e1e;
        color: #f0f0f0;
        box-shadow: 0 -2px 8px rgba(255, 255, 255, 0.05);
    }
}`;