import styled from 'styled-components';

const SHostButtons = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 0 1rem;
	width: 90%;
	max-width: 800px;

	@media (max-width: 768px) {
		flex-direction: column;
		justify-content: start;
		align-items: flex-start;
		width: 100%;
		padding: 0;
	}
`;

export default SHostButtons;
