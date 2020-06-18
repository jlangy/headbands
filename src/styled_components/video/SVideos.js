import styled from 'styled-components';
import SCard from '../layout/SCard';

const SVideos = styled(SCard)`
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	max-height: none;
	max-width: none;
	width: 90%;
	margin: 2rem auto 0 auto;
	padding: 2.5%;

	@media (max-width: 768px) {
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 90%;
		padding: 1rem 0 2rem 0;
	}
`;

export default SVideos;
