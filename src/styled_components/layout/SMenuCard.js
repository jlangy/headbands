import styled from 'styled-components';
import SCard from './SCard';

const SMenuCard = styled(SCard)`
	padding: 2.5%;
	width: 90%;
	justify-content: space-evenly;
	max-height: none;
	max-width: none;
	margin: 2rem auto 2rem auto;

	@media (max-width: 768px) {
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 85%;
		padding: 2.5%;
	}
`;

export default SMenuCard;
