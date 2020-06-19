import styled from 'styled-components';

const SVideo = styled.video`
	filter: ${(props) => (props.revealed ? 'grayscale(100%)' : '')};
	max-height: 250px;
	position: relative;
	overflow: hidden;
	box-shadow: ${(props) =>
		props.turn ? '0px 0px 5px 5px rgba(60, 167, 210, 0.6)' : 'none'};

	@media (max-width: 410px) {
		max-height: 200px;
	}
`;

export default SVideo;
