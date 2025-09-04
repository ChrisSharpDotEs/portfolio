import { css } from 'lit';

export const styles = css`
.spinner {
    width: 48px;
    height: 48px;
    border: 6px solid #e0e0e0;
    border-top: 6px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 2rem auto;
}

.show {
    display: block;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
.dots {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-family: sans-serif;
    padding: 2rem;
}

.dot {
    width: 8px;
    height: 8px;
    margin: 0 4px;
    background-color: #333;
    border-radius: 50%;
    animation: bounce 1.5s infinite ease-in-out;
}

.dot:nth-child(1) {
    animation-delay: 0s;
}

.dot:nth-child(2) {
    animation-delay: 0.2s;
}

.dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes bounce {
    0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.3;
    }
    40% {
    transform: scale(1);
    opacity: 1;
    }
}  
`;