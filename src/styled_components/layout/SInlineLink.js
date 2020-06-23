import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SInlineLink = styled(Link)`
	display: block;
	font-size: 1.25rem;
	font-weight: 300;
	font-family: 'Lobster', Georgia, Times, serif;
	display: inline;
	text-decoration: underline;

	:hover {
		text-shadow: 1px 1px 1px rgba(150, 150, 150, 0.75);
	}
`;

export default SInlineLink;
