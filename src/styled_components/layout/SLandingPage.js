import styled from 'styled-components';
import SPage from './SPage';

const SLandingPage = styled(SPage)`
	justify-content: space-evenly;
	flex-direction: row;
	align-items: flex-start;

	@media (max-width: 768px) {
		align-items: center;
	}
`;

export default SLandingPage;
