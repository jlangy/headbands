import styled from 'styled-components';
import SCard from './SCard';

const SMenuCard = styled(SCard)`
	padding: 2.5%;
	width: 85%;
	justify-content: space-evenly;
	max-height: none;
	max-width: 800px;

	@media (max-width: 768px) {
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 85%;
		padding: 2.5%;
	}
`;

export default SMenuCard;
