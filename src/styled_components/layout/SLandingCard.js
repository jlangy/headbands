import styled from 'styled-components';
import SCard from './SCard';

const SLandingCard = styled(SCard)`
	width: 45%;
	margin-left: auto;
	margin-right: auto;

	@media (max-width: 768px) {
		width: 80%;
	}
`;

export default SLandingCard;
