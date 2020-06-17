import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SLink = styled(Link)`
	display: block;
	font-size: 1.25rem;
	font-weight: 300;
	text-decoration: none;

	:hover {
		text-shadow: 1px 1px 1px rgba(150, 150, 150, 0.75);
	}

	@media (max-width: 768px) {
		font-size: 1.5rem;
	}
`;

export default SLink;
