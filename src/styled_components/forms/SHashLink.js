import styled from 'styled-components';
import { NavHashLink as Link } from 'react-router-hash-link';

const SHashLink = styled(Link)`
	width: 100%;
	border-radius: 3px;
  text-align: center;
  font-size: 1.25rem;

	:hover {
		text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
	}
`;

export default SHashLink;
