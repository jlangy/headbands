import styled from 'styled-components';

const SHostButtons = styled.aside`
	display: flex;
	justify-content: space-evenly;
	padding: 0 1rem;
	width: 30%;

	@media (max-width: 768px) {
		flex-direction: column;
		justify-content: start;
		align-items: flex-start;
	}
`;

export default SHostButtons;
