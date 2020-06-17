import styled from 'styled-components';

const SMenuButton = styled.button`
	background-color: #3ca7d2;
	color: white;
	padding: 6px;
	border-radius: 3px;
	text-align: center;
	border: none;
	font-size: inherit;
	margin: 0.5rem auto;
	width: 40%;

	:active,
	:focus,
	:focus-within {
		border: none;
		outline: none;
	}

	:hover {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 768px) {
		width: 100%;
		margin: 0.5rem auto;
	}
`;

export default SMenuButton;
