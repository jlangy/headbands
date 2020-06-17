import styled from 'styled-components';

const SInput = styled.input`
	display: flex;
	background: #f1f2f1;
	font-family: inherit;
	width: 96%;
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

	&[type='submit'] {
		width: 96%;
		background-color: #3ca7d2;
		color: white;
		padding: 2%;
		border-radius: 3px;
		text-align: center;
		box-shadow: none;

		:hover {
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		}
	}
`;

export default SInput;
