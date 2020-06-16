import styled from 'styled-components';
import SCard from './SCard';

const SMenuCard = styled(SCard)`
	padding: 1rem 0;
	width: 90%;
	max-width: 90%;
	justify-content: space-evenly;

	@media (max-width: 768px) {
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 100%;
	}
`;

export default SMenuCard;
