import styled from 'styled-components';

// Contains video svg element
const SVideoLabel = styled.div`
	position: absolute;
	height: 40px;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(255, 255, 255, 0.7);
	text-align: center;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.25rem 1rem;
	text-transform: capitalize;

	> * {
		color: #222;
		font-size: 1rem;
	}
`;

export default SVideoLabel;
