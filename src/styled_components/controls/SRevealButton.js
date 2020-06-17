import styled from 'styled-components';

const SRevealButton = styled.button`
	color: ${(props) => (props.disabled ? '#777' : '#222')};
	background-color: ${(props) => (props.disabled ? '#ddd' : 'white')};
	padding: 6px;
	border-radius: 3px;
	text-align: center;
	border: none;
	font-size: inherit;
	font-family: inherit;

	:active,
	:focus,
	:focus-within {
		border: none;
		outline: none;
	}

	:hover {
		box-shadow: ${(props) =>
			props.disabled ? 'none' : '0 4px 8px 0 rgba(0, 0, 0, 0.2)'};
	}
`;

export default SRevealButton;
