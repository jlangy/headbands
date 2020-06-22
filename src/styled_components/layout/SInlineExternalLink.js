import styled from 'styled-components';

const SInlineExternalLink = styled.a`
	display: block;
	font-size: 1.25rem;
	font-weight: 300;
	text-decoration: none;
	font-family: 'Lobster', Georgia, Times, serif;
	display: inline;
	text-decoration: underline;

	:hover {
		text-shadow: 1px 1px 1px rgba(150, 150, 150, 0.75);
	}
`;

export default SInlineExternalLink;
