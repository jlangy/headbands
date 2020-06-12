import styled from 'styled-components';
import SCard from './SCard';

// Contains all video containers
const SVideos = styled(SCard)`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-evenly;
	max-width: 90%;
	max-height: none;
	width: 90%;
	margin: 0 0 1rem 0;
	flex-direction: row;

	@media (max-width: 768px) {
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 100%;
	}
`;

export default SVideos;
