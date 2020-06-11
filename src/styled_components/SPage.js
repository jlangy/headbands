import styled from 'styled-components';

const SPage = styled.main`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: center;
	}
`;

export default SPage;
