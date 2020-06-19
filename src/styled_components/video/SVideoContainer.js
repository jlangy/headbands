import styled from 'styled-components';

const SVideoContainer = styled.div`
	max-width: 320px;
	max-height: 250px;
	margin: 1rem 0;
	position: relative;
	overflow: hidden;
	border-radius: 5px;
	box-shadow: ${(props) =>
		props.turn ? '0 0 10px 10px rgba(60,167,210, 0.5)' : 'none'};

	@media (max-width: 410px) {
		max-width: 256px;
		max-height: 200px;
		box-shadow: ${(props) =>
			props.turn ? '0 0 5px 5px rgba(60,167,210, 0.5)' : 'none'};
	}
`;

export default SVideoContainer;
