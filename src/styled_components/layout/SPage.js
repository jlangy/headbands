import styled from 'styled-components';

const SPage = styled.main`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;

	@media (max-width: 768px) {
		flex-direction: column;
		justify-content: start;
	}
`;

export default SPage;
