import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SLink = styled(Link)`
	width: 100%;
	color: white;
	border-radius: 3px;
	text-align: center;

	:hover {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	}

	> button {
		width: 100%;
	}
`;

const Button = styled.button`
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

// Makes a link if you add a to prop
const SButton = ({ label, to, onClick }) => {
	return to !== undefined ? (
		<SLink to={to}>
			<Button onClick={onClick}>{label}</Button>
		</SLink>
	) : (
		<Button onClick={onClick}>{label}</Button>
	);
};

export default SButton;
