import styled from 'styled-components';

// Contains video svg element
const SVideo = styled.div`
	max-width: 320px;
	max-height: 250px;
	margin: 1rem 0;
	position: relative;
	overflow: hidden;
	border-radius: 5px;
	box-shadow: ${(props) =>
		props.turn ? '0px 0px 5px 5px rgba(60, 167, 210, 0.6)' : 'none'};

	@media (max-width: 375px) {
		max-width: 256px;
		max-height: 200px;
	}
`;

export default SVideo;
