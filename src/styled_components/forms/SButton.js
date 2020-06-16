import styled from 'styled-components';

const SButton = styled.button`
	background-color: #3ca7d2;
	color: white;
	padding: 6px;
	border-radius: 3px;
	text-align: center;
	border: none;
	font-size: inherit;
	min-width: 100px;

	:active,
	:focus,
	:focus-within {
		border: none;
		outline: none;
	}

	:hover {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	}
`;

export default SButton;
