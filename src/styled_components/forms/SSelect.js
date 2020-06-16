import styled from 'styled-components';

const SSelect = styled.select`
	display: flex;
	background: #f1f2f1;
	font-family: inherit;
	width: 100%;
	padding: 2%;
	border: none;
	border-radius: 3px;
	box-shadow: inset 0 4px 8px 0 rgba(0, 0, 0, 0.2);

	:active,
	:focus,
	:focus-within {
		border: none;
		outline: none;
	}

	option {
		font-family: inherit;
		background: transparent;

		:hover,
		:focus-within,
		:focus {
			background: transparent;
			border: none;
			outline: none;
		}
	}
`;

export default SSelect;
