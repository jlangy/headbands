import styled from 'styled-components';

const SHostButtons = styled.aside`
	display: flex;
	justify-content: space-evenly;
	padding: 0 1rem;
	min-width: 50%;

	@media (max-width: 768px) {
		flex-direction: column;
		justify-content: start;
		align-items: flex-start;
		width: 100%;
		padding: 0;
	}
`;

export default SHostButtons;
