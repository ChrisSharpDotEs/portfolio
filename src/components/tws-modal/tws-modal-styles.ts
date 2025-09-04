import { css } from 'lit';
export const modalStyles = css`
:host {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: none;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 5;
}

:host([open]) {
	display: flex;
}

.modal-content {
	background: white;
	padding: 2rem;
	border-radius: 8px;
	max-width: 600px;
	width: 90%;
	opacity: 0;
	transform: scale(0.9);
	transition: all 0.3s ease;
}

.fadeIn {
	opacity: 0;
	transform: scale(0.8);
	animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
	from {
		transform: scale(0.8);
		opacity: 0;
	}
	to {
		transform: scale(1);
		opacity: 1;
	}
}
@media (prefers-color-scheme: dark) {
	.modal-content {
		background-color: #1c2a2e;
	}
`;