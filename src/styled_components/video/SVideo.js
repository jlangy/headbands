import styled from 'styled-components';

const SVideo = styled.video`
	filter: ${(props) => (props.revealed ? 'grayscale(100%)' : '')};
`;

export default SVideo;
