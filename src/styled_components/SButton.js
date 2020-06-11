import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SLink = styled(Link)`
	width: 96%;
	background-color: #3ca7d2;
	color: white;
	padding: 2%;
	border-radius: 3px;
	text-align: center;

	:hover {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	}

	> button {
		width: 100%;
		height: 100%;
		color: inherit;
		background: inherit;
		border: none;
		font-size: inherit;

		:active,
		:focus,
		:focus-within {
			border: none;
			outline: none;
		}
	}
`;

const SButton = ({ label, to, onClick }) => {
	return (
		<SLink to={to}>
			<button onClick={onClick}>{label}</button>
		</SLink>
	);
};

export default SButton;
