import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SLink = styled(Link)`
	max-width: 100%;
	margin: 0;
`;

const SButton = ({ label, to }) => {
	return <SLink to={to}>{label}</SLink>;
};

export default SButton;
