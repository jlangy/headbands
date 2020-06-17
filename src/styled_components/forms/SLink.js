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

export default SLink;
