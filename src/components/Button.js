import React from 'react';
import SButton from '../styled_components/forms/SButton';
import SLink from '../styled_components/forms/SLink';

const Button = ({ label, to, onClick }) => {
	return to !== undefined ? (
		<SLink to={to}>
			<SButton onClick={onClick}>{label}</SButton>
		</SLink>
	) : (
		<SButton onClick={onClick}>{label}</SButton>
	);
};

export default Button;
