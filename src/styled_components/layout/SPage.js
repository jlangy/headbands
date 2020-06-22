import styled from 'styled-components';

const SPage = styled.main`
	min-height: calc(100vh - 4rem - 4vh);
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	background-color: #3ca7d2;
	box-shadow: inset 0 0 4px 4px rgba(0, 0, 0, 0.3);

	@media (max-width: 768px) {
		flex-direction: column;
		justify-content: start;
	}
`;

export default SPage;
